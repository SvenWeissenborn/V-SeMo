import io
import numpy as np
import math


zeilenanzahl = 3
spaltenanzahl = 3
radius = 500
sectorabstand_x = 100
sectorabstand_y = 30

fontSize = 15

anzahlStartGeodesics = 2

startGeodesicsSectors = [2, 2]

startMarksSectors = []
startMarkRadius = [3]

startTextsSectors = []
startTextContent = ['P1', 'P2']
text_dist_from_mid_y = [0.5, -0.9]

def main():



    dtheta = (math.pi/9)
    dphi = (math.pi/9)





    sector_y_dist = 0.0



    file = io.open("sattelflaeche.js",'w')
    file.write( "/*" +"\n"
                "------Parameter-------" +"\n"
                "zeilenanzahl: " + str(zeilenanzahl) +"\n"
                "spaltenanzahl: " + str(spaltenanzahl) +"\n"
                "radius: " + str(radius) +"\n"
                "sectorabstand_x: " + str(sectorabstand_x) + "\n"
                "sectorabstand_y: " + str(sectorabstand_y) + "\n"                                                        
                "fontSize: " + str(fontSize) +"\n"
                "startGeodesicsSectors: " + str(startGeodesicsSectors) + "\n"     
                "startMarksSectors: " + str(startMarksSectors) + "\n"
                "startMarkRadius: " + str(startMarkRadius) + "\n"
                "startMarksSectors: " + str(startMarksSectors) + "\n"
                "startMarkRadius: " + str(startMarkRadius) + "\n"
                "startTextsSectors: " + str(startTextsSectors) + "\n"
                "startTextContent: " + str(startTextContent) + "\n"
                "text_dist_from_mid_y: " + str(text_dist_from_mid_y) + "\n"
                "----------------------"
                + "\n"
                  "*/"
                )

    file.write("\n")
    file.write("\n")
    file.write(
        "let line_colors = ['blue', 'black', 'grey', 'purple', 'orange', 'fuchsia', 'deepskyblue', 'gold', 'silver', 'lightskyblue', 'lightsteelblue', 'greenyellow', 'tomato', 'darkorchid', 'mistyrose', 'salmon'];")
    file.write("\n")
    file.write(
        "let mark_colors = ['grey'];")
    file.write("\n")

    variablenamesSectors = ["sec_name", "sec_ID", "sec_fill", "sec_fontSize", "sec_top", "sec_bottom", "sec_height", "sec_width", "sec_offset", "sec_neighbour_top", "sec_neighbour_right", "sec_neighbour_bottom", "sec_neighbour_left", "sec_posx", "sec_posy", "sec_angle"]
    sectorDict = dict(zip(variablenamesSectors,range(len(variablenamesSectors))))
    anzahlDerSektoren = zeilenanzahl * spaltenanzahl
    maxsectorwidth = radius * math.cosh(math.pi/6) * math.pi/9
    maxsectorheight = radius * math.pi/9


    #sectorValues = np.zeros((len(variablenamesSectors),anzahlDerSektoren))
    sectorValues = [[[] for ii in range(anzahlDerSektoren)] for jj in range(len(variablenamesSectors))]



    for id in range(0, anzahlDerSektoren):
        sectorValues[sectorDict["sec_name"]][id] = id + 1
        sectorValues[sectorDict["sec_ID"]][id] = id
        sectorValues[sectorDict["sec_fill"]][id] = "'white'"
        sectorValues[sectorDict["sec_fontSize"]][id] = fontSize

    jj = 0

    for zeile in range(0, zeilenanzahl):

        for ii in range(0, spaltenanzahl):
            print(jj + ii * zeilenanzahl)
            sectorValues[sectorDict["sec_top"]][jj + ii * zeilenanzahl] = radius*math.cosh(-math.pi/6 + (zeile) * dtheta) * dphi
            sectorValues[sectorDict["sec_bottom"]][jj + ii * zeilenanzahl] = radius * math.cosh(-math.pi/6 + (zeile +1) * dtheta) * dphi
            offset = (sectorValues[sectorDict["sec_top"]][jj + ii * zeilenanzahl] - sectorValues[sectorDict["sec_bottom"]][jj + ii * zeilenanzahl])/2
            sector_width = max(sectorValues[sectorDict["sec_top"]][jj + ii * zeilenanzahl],sectorValues[5][jj + ii * zeilenanzahl])
            sector_height = math.sqrt(math.pow(radius, 2) * math.pow(dtheta, 2) - math.pow(offset, 2))
            sectorValues[sectorDict["sec_height"]][jj + ii * zeilenanzahl] = sector_height
            sectorValues[sectorDict["sec_width"]][jj + ii * zeilenanzahl] = sector_width
            sector_y_dist = sector_height + sectorabstand_y
            sectorValues[sectorDict["sec_offset"]][jj + ii * zeilenanzahl] = offset
            sectorValues[sectorDict["sec_posx"]][jj + ii * zeilenanzahl] = (ii * maxsectorwidth +((ii-1) * sectorabstand_x)) - maxsectorwidth
            sectorValues[sectorDict["sec_posy"]][jj + ii * zeilenanzahl] = (jj * maxsectorheight +((jj-1) * sectorabstand_y)) - maxsectorheight
            sectorValues[sectorDict["sec_angle"]][jj + ii * zeilenanzahl] = 0

            if (zeile == 0):
               sectorValues[sectorDict["sec_neighbour_top"]][jj + ii * zeilenanzahl] = - 1
            else:
               sectorValues[sectorDict["sec_neighbour_top"]][jj + ii * zeilenanzahl] = (jj + ii * zeilenanzahl)- 1

            if (ii == 2):
               sectorValues[sectorDict["sec_neighbour_right"]][jj + ii * zeilenanzahl] = -1
            else:
               sectorValues[sectorDict["sec_neighbour_right"]][jj + ii * zeilenanzahl] = jj + ii * zeilenanzahl + spaltenanzahl

            if (zeile == 2):
               sectorValues[sectorDict["sec_neighbour_bottom"]][jj + ii * zeilenanzahl] = - 1
            else:
               sectorValues[sectorDict["sec_neighbour_bottom"]][jj + ii * zeilenanzahl] = (jj + ii * zeilenanzahl) + 1

            if (ii == 0):
               sectorValues[sectorDict["sec_neighbour_left"]][jj + ii * zeilenanzahl] = -1
            else:
               sectorValues[sectorDict["sec_neighbour_left"]][jj + ii * zeilenanzahl] = (jj + ii * zeilenanzahl) - 3



        jj=jj+1


    for ii in range(0,len(variablenamesSectors)):
        file.write(variablenamesSectors[ii]+"= [ ")
        for jj in range(0,anzahlDerSektoren):
            file.write(str( sectorValues[ii][jj])+', ')
        file.write("];\n")



    variablenamesGeodesics = ["startSectors", "x_Start", "y_Start", "x_End", "y_End", "startStrokeWidth", "startFill", "startStroke", "startParentSector", "startLineID"]
    geodesicDict = dict(zip(variablenamesGeodesics, range(len(variablenamesGeodesics))))

    geodesicValues = [[[] for ii in range(anzahlStartGeodesics)] for jj in range(len(variablenamesGeodesics))]

    for startGeodesic in range(0, anzahlStartGeodesics):
        geodesicValues[geodesicDict["startSectors"]][startGeodesic] = startGeodesicsSectors[startGeodesic]
        geodesicValues[geodesicDict["x_Start"]][startGeodesic] = sectorValues[sectorDict["sec_posx"]][startGeodesicsSectors[startGeodesic]] + 0.3 * startGeodesic * sectorValues[sectorDict["sec_width"]][startGeodesicsSectors[startGeodesic]] - 70
        geodesicValues[geodesicDict["y_Start"]][startGeodesic] = sectorValues[sectorDict["sec_posy"]][startGeodesicsSectors[startGeodesic]] + 0.5 * startGeodesic * sectorValues[sectorDict["sec_height"]][startGeodesicsSectors[startGeodesic]] -10
        geodesicValues[geodesicDict["x_End"]][startGeodesic] = sectorValues[sectorDict["sec_posx"]][startGeodesicsSectors[startGeodesic]] + 0.3 * startGeodesic * sectorValues[sectorDict["sec_width"]][startGeodesicsSectors[startGeodesic]]   -  20
        geodesicValues[geodesicDict["y_End"]][startGeodesic] = sectorValues[sectorDict["sec_posy"]][startGeodesicsSectors[startGeodesic]] + 0.5 * startGeodesic * sectorValues[sectorDict["sec_height"]][startGeodesicsSectors[startGeodesic]] -  50

        geodesicValues[geodesicDict["startParentSector"]][startGeodesic] = "["+str(startGeodesicsSectors[startGeodesic])+","+str(startGeodesic)+"]"
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


    variablenamesTexts = ["textStart_x", "textStart_y", "textStartContent", "textStartFontSize", "textStartParentSector", "textStartID", "textStartAngle"]
    textDict = dict(zip(variablenamesTexts, range(len(variablenamesTexts))))

    textValues = [[[] for ii in range(len(startTextsSectors))] for jj in range(len(variablenamesTexts))]

    for startText in range(0, len(startTextsSectors)):

        sector_height = sectorValues[sectorDict["sec_height"]][startTextsSectors[startText]]
        sector_angle = sectorValues[sectorDict["sec_angle"]][startTextsSectors[startText]]
        textValues[textDict["textStart_x"]][startText] = sectorValues[sectorDict["sec_posx"]][startTextsSectors[startText]] - 2 * (sector_height/2 * text_dist_from_mid_y[startText]) * math.sin(sector_angle * 0.5 * math.pi/180) * math.cos(sector_angle * 0.5 * math.pi/180)
        textValues[textDict["textStart_y"]][startText] = sectorValues[sectorDict["sec_posy"]][startTextsSectors[startText]] + sector_height/2 * text_dist_from_mid_y[startText] - 0.000001 - 2 * (sector_height/2 * text_dist_from_mid_y[startText]) * math.pow(math.sin(sector_angle * 0.5 * math.pi/180), 2) +15
        if (startText == 0):
            textValues[textDict["textStartParentSector"]][startText] = "[" + str(startTextsSectors[startText]) + "," + str(0) + "]"
        else:
            positionInSector = 0
            if (startTextsSectors[startText] == startTextsSectors[startText - 1]):
                positionInSector += 1
                textValues[textDict["textStartParentSector"]][startText] = "[" + str(startTextsSectors[startText]) + "," + str(positionInSector) + "]"
            else:
                positionInSector = 0
                textValues[textDict["textStartParentSector"]][startText] = "[" + str(startTextsSectors[startText]) + "," + str(positionInSector) + "]"

        textValues[textDict["textStartID"]][startText] = "[" + str(startText) + "]"
        textValues[textDict["textStartFontSize"]][startText] = 15
        textValues[textDict["textStartContent"]][startText] = "'" + startTextContent[startText] + "'"
        textValues[textDict["textStartAngle"]][startText] = 0

    for ii in range(0, len(variablenamesTexts)):
        file.write(variablenamesTexts[ii] + "= [ ")
        for jj in range(0, len(startTextsSectors)):
            file.write(str(textValues[ii][jj]) + ', ')
        file.write("];\n")

    file.write("startSector ="+str(zeilenanzahl-1)+";")

    file.close()





if (__name__=="__main__" or __name__=="builtins"):
    main()
    print("done_2")
