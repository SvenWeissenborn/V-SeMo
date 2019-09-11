import io
import numpy as np
import math

nSektorzeilenVonKugel = 9
nSektorspaltenVonKugel = 18
zeilenanzahl = 3
spaltenanzahl = 3
radius_sphere = 500
sectorabstand_x = 100
sectorabstand_y = 30

fontSize = 15

anzahlStartGeodesics = 2

startMarksSectors = []
startMarkRadius = [3]

def main():



    dtheta = (math.pi/nSektorzeilenVonKugel)
    dphi = (2*math.pi/nSektorspaltenVonKugel)
    maxSecBreite = radius_sphere * dphi * math.sin(dtheta * math.floor(nSektorzeilenVonKugel/2))

    if (zeilenanzahl > nSektorzeilenVonKugel):
        print("Achtung zeilenanzahl ist größer als nSektorzeilenVonKugel")
        return -1

    if (spaltenanzahl > nSektorspaltenVonKugel):
        print("Achtung spaltenanzahl ist größer als nSektorspaltenVonKugel")
        return -2

    if (nSektorzeilenVonKugel % 2 != zeilenanzahl % 2):
        print("Achtung nSektorZeilenVonKugel und zeilenanzahl müssen gerade oder ungerade sein")
        return -3


    sector_y_dist = 0.0

    zeilestart = math.floor((nSektorzeilenVonKugel-zeilenanzahl)/2)
    zeileende = nSektorzeilenVonKugel-round((nSektorzeilenVonKugel-zeilenanzahl)/2)

    file = io.open("kugelmetrik.js",'w')

    file.write(
        "let line_colors = ['blue', 'black', 'grey', 'purple', 'orange', 'fuchsia', 'deepskyblue', 'gold', 'silver', 'lightskyblue', 'lightsteelblue', 'greenyellow', 'tomato', 'darkorchid', 'mistyrose', 'salmon'];")
    file.write("\n")
    file.write(
        "let mark_colors = ['grey'];")
    file.write("\n")

    variablenamesSectors = ["sec_name", "sec_ID", "sec_fontSize", "sec_top","sec_bottom", "sec_height", "sec_width", "sec_offset", "sec_neighbour_top", "sec_neighbour_right", "sec_neighbour_bottom", "sec_neighbour_left", "sec_posx","sec_posy","sec_angle"  ]
    sectorDict = dict(zip(variablenamesSectors,range(len(variablenamesSectors))))
    anzahlDerSektoren = zeilenanzahl * spaltenanzahl



    #sectorValues = np.zeros((len(variablenamesSectors),anzahlDerSektoren))
    sectorValues = [[[] for ii in range(anzahlDerSektoren)] for jj in range(len(variablenamesSectors))]

    jj =0

    for id in range(0, anzahlDerSektoren):
        sectorValues[sectorDict["sec_name"]][id] = id + 1
        sectorValues[sectorDict["sec_ID"]][id] = id
        # Bei Bedarf muss die Fläche dazu genommen werden: Wichtig, "sec_fill" muss der Liste variablenamesSectors hinzugefügt werden!!!
        # sectorValues[sectorDict["sec_fill"]][id] = "'white'"
        sectorValues[sectorDict["sec_fontSize"]][id] = fontSize

    for zeile in range(zeilestart, zeileende):
        for ii in range(0,spaltenanzahl):
            sectorValues[sectorDict["sec_top"]][jj + ii * (zeileende - zeilestart)] = radius_sphere*math.sin((zeile) * dtheta) * dphi
            sectorValues[sectorDict["sec_bottom"]][jj + ii * (zeileende - zeilestart)] = radius_sphere * math.sin((zeile +1) * dtheta) * dphi
            offset = (sectorValues[sectorDict["sec_top"]][jj + ii * (zeileende - zeilestart)] - sectorValues[sectorDict["sec_bottom"]][jj + ii * (zeileende - zeilestart)])/2
            sector_width = max(sectorValues[sectorDict["sec_top"]][jj + ii * (zeileende - zeilestart)],sectorValues[sectorDict["sec_bottom"]][jj + ii * (zeileende - zeilestart)])
            sector_height = math.sqrt(math.pow(radius_sphere, 2) * math.pow(dtheta, 2) - math.pow(offset, 2))
            sectorValues[sectorDict["sec_height"]][jj + ii * (zeileende - zeilestart)] = sector_height
            sectorValues[sectorDict["sec_width"]][jj + ii * (zeileende - zeilestart)] = sector_width
            sector_y_dist = sector_height + sectorabstand_y
            sectorValues[sectorDict["sec_offset"]][jj + ii * (zeileende - zeilestart)] = offset
            sectorValues[sectorDict["sec_posx"]][jj + ii * (zeileende - zeilestart)] = (ii - spaltenanzahl * 0.5 + 0.5) * (sectorabstand_x+maxSecBreite) + (maxSecBreite - sector_width)/2
            sectorValues[sectorDict["sec_posy"]][jj + ii * (zeileende - zeilestart)] = (zeile - (zeilenanzahl+0.5)) * sector_y_dist -100
            sectorValues[sectorDict["sec_angle"]][jj + ii * (zeileende - zeilestart)] = 0

            if (zeile == round((nSektorzeilenVonKugel-zeilenanzahl) / 2)):
                sectorValues[sectorDict["sec_neighbour_top"]][jj + ii * (zeileende - zeilestart)] = -1
            else:
                sectorValues[sectorDict["sec_neighbour_top"]][jj + ii * (zeileende - zeilestart)] = zeile + zeilenanzahl * ii - round((nSektorzeilenVonKugel-zeilenanzahl) / 2)-1

            if (ii == (spaltenanzahl-1)):
                sectorValues[sectorDict["sec_neighbour_right"]][jj + ii * (zeileende - zeilestart)] = -1
            else:
                sectorValues[sectorDict["sec_neighbour_right"]][jj + ii * (zeileende - zeilestart)] = zeile + zeilenanzahl * ii - round((nSektorzeilenVonKugel-zeilenanzahl) / 2) + zeilenanzahl

            if (zeile == (nSektorzeilenVonKugel-round((nSektorzeilenVonKugel-zeilenanzahl) / 2))-1):
                sectorValues[sectorDict["sec_neighbour_bottom"]][jj + ii * (zeileende - zeilestart)] = -1
            else:
                sectorValues[sectorDict["sec_neighbour_bottom"]][jj + ii * (zeileende - zeilestart)] = zeile + zeilenanzahl * ii - round((nSektorzeilenVonKugel-zeilenanzahl) / 2) +1

            if (ii == 0):
                sectorValues[sectorDict["sec_neighbour_left"]][jj + ii * (zeileende - zeilestart)] = -1
            else:
                sectorValues[sectorDict["sec_neighbour_left"]][jj + ii * (zeileende - zeilestart)] = zeile + zeilenanzahl * ii - round((nSektorzeilenVonKugel-zeilenanzahl) / 2) - zeilenanzahl



        jj=jj+1


    for ii in range(0,len(variablenamesSectors)):
        file.write(variablenamesSectors[ii]+"= [ ")
        for jj in range(0,anzahlDerSektoren):
            file.write(str( sectorValues[ii][jj])+', ')
        file.write("];\n")



    variablenamesGeodesics = ["x_Start", "y_Start", "x_End", "y_End", "startStrokeWidth", "startFill", "startStroke", "startParentSector", "startLineID"]
    geodesicDict = dict(zip(variablenamesGeodesics, range(len(variablenamesGeodesics))))

    geodesicValues = [[[] for ii in range(anzahlStartGeodesics)] for jj in range(len(variablenamesGeodesics))]

    for startGeodesic in range(0, anzahlStartGeodesics):
        geodesicValues[geodesicDict["x_Start"]][startGeodesic] = sectorValues[sectorDict["sec_posx"]][zeilenanzahl - 1] + 0.3 * startGeodesic * sectorValues[sectorDict["sec_width"]][zeilenanzahl - 1] - 70
        geodesicValues[geodesicDict["y_Start"]][startGeodesic] = sectorValues[sectorDict["sec_posy"]][zeilenanzahl - 1] + 0.5 * startGeodesic * sectorValues[sectorDict["sec_height"]][zeilenanzahl - 1] -10
        geodesicValues[geodesicDict["x_End"]][startGeodesic] = sectorValues[sectorDict["sec_posx"]][zeilenanzahl - 1] + 0.3 * startGeodesic * sectorValues[sectorDict["sec_width"]][zeilenanzahl - 1]   -  20
        geodesicValues[geodesicDict["y_End"]][startGeodesic] = sectorValues[sectorDict["sec_posy"]][zeilenanzahl - 1] + 0.5 * startGeodesic * sectorValues[sectorDict["sec_height"]][zeilenanzahl - 1] -  50

        geodesicValues[geodesicDict["startParentSector"]][startGeodesic] = "["+str(zeilenanzahl - 1)+","+str(startGeodesic)+"]"
        geodesicValues[geodesicDict["startLineID"]][startGeodesic] = "["+str(startGeodesic)+","+str(1)+"]"
        geodesicValues[geodesicDict["startStrokeWidth"]][startGeodesic] = 2

        geodesicValues[geodesicDict["startFill"]][startGeodesic] = "line_colors["+str(startGeodesic)+"]"
        geodesicValues[geodesicDict["startStroke"]][startGeodesic] = "line_colors["+str(startGeodesic)+"]"

    for ii in range(0,len(variablenamesGeodesics)):
        file.write(variablenamesGeodesics[ii]+"= [ ")
        for jj in range(0,anzahlStartGeodesics):
            file.write(str( geodesicValues[ii][jj])+', ')
        file.write("];\n")

    variablenamesMarks = ["markStart_x", "markStart_y", "markStartStrokeWidth", "markStartRadius", "markStartFill",
                          "markStartStroke", "markStartParentSector", "markStartID"]
    markDict = dict(zip(variablenamesMarks, range(len(variablenamesMarks))))

    markValues = [[[] for ii in range(len(startMarksSectors))] for jj in range(len(variablenamesMarks))]

    for startMark in range(0, len(startMarksSectors)):
        markValues[markDict["markStart_x"]][startMark] = sectorValues[sectorDict["sec_posx"]][startMarksSectors[startMark]]
        markValues[markDict["markStart_y"]][startMark] = sectorValues[sectorDict["sec_posy"]][startMarksSectors[startMark]] + sectorValues[sectorDict["sec_height"]][startMarksSectors[startMark]] / 2

        markValues[markDict["markStartParentSector"]][startMark] = "[" + str(startMarksSectors[startMark]) + "," + str(startMark) + "]"
        markValues[markDict["markStartID"]][startMark] = "[" + str(startMark) + "," + str(1) + "]"
        markValues[markDict["markStartStrokeWidth"]][startMark] = 2
        markValues[markDict["markStartRadius"]][startMark] = startMarkRadius[startMark]
        markValues[markDict["markStartFill"]][startMark] = "mark_colors[" + str(startMark) + "]"
        markValues[markDict["markStartStroke"]][startMark] = "mark_colors[" + str(startMark) + "]"

    for ii in range(0, len(variablenamesMarks)):
        file.write(variablenamesMarks[ii] + "= [ ")
        for jj in range(0, len(startMarksSectors)):
            file.write(str(markValues[ii][jj]) + ', ')
        file.write("];\n")

    file.write("startSector ="+str(zeilenanzahl-1)+";")

    file.close()





if (__name__=="__main__" or __name__=="builtins"):
    main()
    print("done_2")
