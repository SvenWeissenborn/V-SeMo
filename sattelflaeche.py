import io
import math

#Eigenschaften des Ausgangsobjekts
radius = 500

#Eigenschaften des Sektormodells
nRowsInModel = 3
nColumnsInModel = 3

#Abstaende der Sektoren zueinander
sectorDistance_x = 100
sectorDistance_y = 30

#Kameraeinstellungen
startZoom = 1.0
startViewportTransform_4 = 0
startViewportTransform_5 = 0

#Schriftgroesse im Modell
fontSize = 15

#Parameter fuer die Startgeodaeten
startGeodesicsSectors = [2, 2]
#Winkel in Grad
startGeodesicsAngle = [39, 39]
#Startpunkt der Geodaete liegt in der unteren linken Ecke
#Versatz Anteilig der Sektorbreite
startGeodesicsOffset_x = [0.145, 0.42]
#Versatz Anteilig der Sektorhoehe
startGeodesicsOffset_y = [0.56, 0.06]
#Laenge der Geodaete in Pixel
startGeodesicsLength = [70, 70]
#operational bedeutet, dass sie wie eine echte Geodaete behandelt werden
startGeodesicsOperational = ['true', 'true']

#Parameter fuer die Startmarkierungen
startMarksSectors = [2, 3, 8]
startMarksRadius = [5, 5, 5]
startMarksOffset_x = [0.5, 0.5, 0.5]
startMarksOffset_y = [0.5, 0.5, 0.5]

#Parameter fuer die Starttexte
startTextsSectors = [2, 3, 8]
startTextContent = ['M1', 'M2', 'M3']
startTextsOffset_x = [0.4, 0.4, 0.6]
startTextsOffset_y = [0.4, 0.6, 0.4]

def rotationAroundPoint(point_x_tmp, point_y_tmp, sector_angle, sector_center_x, sector_center_y):

    rotatedPoint_x = sector_center_x + (point_x_tmp - sector_center_x) * math.cos(sector_angle * math.pi / 180) - (point_y_tmp - sector_center_y) * math.sin(sector_angle * math.pi / 180)

    rotatedPoint_y = sector_center_y + (point_x_tmp - sector_center_x) * math.sin(sector_angle * math.pi / 180) + (point_y_tmp - sector_center_y) * math.cos(sector_angle * math.pi / 180)

    rotatedPoint = [rotatedPoint_x, rotatedPoint_y]

    return rotatedPoint

def main():



    dtheta = (math.pi/9)
    dphi = (math.pi/9)



    file = io.open("sattelflaeche.js",'w')

    file.write(
        "startZoom =" + str(startZoom) + "\n"
        "startViewportTransform_4 =" + str(startViewportTransform_4) + "\n"
        "startViewportTransform_5 =" + str(startViewportTransform_5) + "\n"
    )
    file.write("\n")

    file.write( "/*" +"\n"
"------Parameter-------" + "\n"
                "radius: " + str(radius) + "\n"
                "nRowsInModel: " + str(nRowsInModel) + "\n"
                "nColumnsInModel: " + str(nColumnsInModel) + "\n"                                                        
                "sectorDistance_x: " + str(sectorDistance_x) + "\n"
                "sectorDistance_y: " + str(sectorDistance_y) + "\n"
                "startZoom =" + str(startZoom) + "\n"
                "startViewportTransform_4 =" + str(startViewportTransform_4) + "\n"
                "startViewportTransform_5 =" + str(startViewportTransform_5) + "\n"
                "fontSize: " + str(fontSize) + "\n"
                "startGeodesicsSectors: " + str(startGeodesicsSectors) + "\n"  
                "startMarksSectors: " + str(startMarksSectors) + "\n"
                "startMarksRadius: " + str(startMarksRadius) + "\n"
                "startMarksOffset_x: " + str(startMarksOffset_x) + "\n"
                "startMarksOffset_y: " + str(startMarksOffset_y) + "\n"                                               
                "startTextsSectors: " + str(startTextsSectors) + "\n"
                "startTextContent: " + str(startTextContent) + "\n"
                "startTextsOffset_x: " + str(startTextsOffset_x) + "\n"
                "startTextsOffset_y: " + str(startTextsOffset_y) + "\n"
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

    variablenamesSectors = ["sec_name", "sec_fill", "sec_ID", "sec_type", "sec_fontSize", "sec_top","sec_bottom", "sec_height", "sec_width", "sec_offset", "sec_coords", "sec_neighbour_top", "sec_neighbour_right", "sec_neighbour_bottom", "sec_neighbour_left", "sec_posx","sec_posy","sec_angle"  ]
    sectorDict = dict(zip(variablenamesSectors,range(len(variablenamesSectors))))
    anzahlDerSektoren = nRowsInModel * nColumnsInModel
    maxsectorwidth = radius * math.cosh(math.pi/6) * math.pi/9
    maxsectorheight = radius * math.pi/9


    sectorValues = [[[] for ii in range(anzahlDerSektoren)] for jj in range(len(variablenamesSectors))]



    for id in range(0, anzahlDerSektoren):
        sectorValues[sectorDict["sec_name"]][id] = id + 1
        sectorValues[sectorDict["sec_ID"]][id] = id
        sectorValues[sectorDict["sec_fill"]][id] = "'white'"
        sectorValues[sectorDict["sec_fontSize"]][id] = fontSize

    jj = 0

    for zeile in range(0, nRowsInModel):

        for ii in range(0, nColumnsInModel):

            sectorValues[sectorDict["sec_top"]][jj + ii * nRowsInModel] = radius*math.cosh(-math.pi/6 + (zeile) * dtheta) * dphi

            sectorValues[sectorDict["sec_bottom"]][jj + ii * nRowsInModel] = radius * math.cosh(-math.pi/6 + (zeile +1) * dtheta) * dphi

            offset = (sectorValues[sectorDict["sec_top"]][jj + ii * nRowsInModel] - sectorValues[sectorDict["sec_bottom"]][jj + ii * nRowsInModel])/2

            sector_width = max(sectorValues[sectorDict["sec_top"]][jj + ii * nRowsInModel],sectorValues[5][jj + ii * nRowsInModel])

            sector_height = math.sqrt(math.pow(radius, 2) * math.pow(dtheta, 2) - math.pow(offset, 2))

            sectorValues[sectorDict["sec_height"]][jj + ii * nRowsInModel] = sector_height

            sectorValues[sectorDict["sec_width"]][jj + ii * nRowsInModel] = sector_width

            sector_y_dist = sector_height + sectorDistance_y

            sectorValues[sectorDict["sec_offset"]][jj + ii * nRowsInModel] = offset

            sectorValues[sectorDict["sec_coords"]][jj + ii * nRowsInModel] = ([-min(0, offset),
                                                                                          0,
                                                                                          sectorValues[sectorDict["sec_top"]][jj + ii * nRowsInModel] - min(0, offset),
                                                                                          0,
                                                                                          sectorValues[sectorDict["sec_bottom"]][jj + ii * nRowsInModel] + max(0, offset),
                                                                                          sectorValues[sectorDict["sec_height"]][jj + ii * nRowsInModel],
                                                                                          max(0, offset),
                                                                                          sectorValues[sectorDict["sec_height"]][jj + ii * nRowsInModel]])


            sectorValues[sectorDict["sec_posx"]][jj + ii * nRowsInModel] = (ii * maxsectorwidth +((ii-1) * sectorDistance_y)) - maxsectorwidth

            sectorValues[sectorDict["sec_posy"]][jj + ii * nRowsInModel] = (jj * maxsectorheight +((jj-1) * sectorDistance_y)) - maxsectorheight

            sectorValues[sectorDict["sec_angle"]][jj + ii * nRowsInModel] = 0

            if (zeile == 0):
               sectorValues[sectorDict["sec_neighbour_top"]][jj + ii * nRowsInModel] = - 1
            else:
               sectorValues[sectorDict["sec_neighbour_top"]][jj + ii * nRowsInModel] = (jj + ii * nRowsInModel)- 1

            if (ii == 2):
               sectorValues[sectorDict["sec_neighbour_right"]][jj + ii * nRowsInModel] = -1
            else:
               sectorValues[sectorDict["sec_neighbour_right"]][jj + ii * nRowsInModel] = jj + ii * nRowsInModel + nColumnsInModel

            if (zeile == 2):
               sectorValues[sectorDict["sec_neighbour_bottom"]][jj + ii * nRowsInModel] = - 1
            else:
               sectorValues[sectorDict["sec_neighbour_bottom"]][jj + ii * nRowsInModel] = (jj + ii * nRowsInModel) + 1

            if (ii == 0):
               sectorValues[sectorDict["sec_neighbour_left"]][jj + ii * nRowsInModel] = -1
            else:
               sectorValues[sectorDict["sec_neighbour_left"]][jj + ii * nRowsInModel] = (jj + ii * nRowsInModel) - 3



        jj=jj+1


    for ii in range(0,len(variablenamesSectors)):
        file.write(variablenamesSectors[ii]+"= [ ")
        for jj in range(0,anzahlDerSektoren):
            file.write(str( sectorValues[ii][jj])+', ')
        file.write("];\n")

    variablenamesGeodesics = ["startSectors", "x_Start", "y_Start", "x_End", "y_End", "startStrokeWidth", "startFill", "startStroke", "startParentSector", "startLineID"]
    geodesicDict = dict(zip(variablenamesGeodesics, range(len(variablenamesGeodesics))))

    geodesicValues = [[[] for ii in range(len(startGeodesicsSectors))] for jj in range(len(variablenamesGeodesics))]

    for startGeodesic in range(0, len(startGeodesicsSectors)):
        geodesicValues[geodesicDict["startSectors"]][startGeodesic] = startGeodesicsSectors[startGeodesic]

        sector_angle = sectorValues[sectorDict["sec_angle"]][startGeodesicsSectors[startGeodesic]]

        sector_width = sectorValues[sectorDict["sec_width"]][startGeodesicsSectors[startGeodesic]]

        sector_height = sectorValues[sectorDict["sec_height"]][startGeodesicsSectors[startGeodesic]]

        sector_center_x = sectorValues[sectorDict["sec_posx"]][startGeodesicsSectors[startGeodesic]]

        sector_center_y = sectorValues[sectorDict["sec_posy"]][startGeodesicsSectors[startGeodesic]]

        geodesicStart_x_tmp = sector_center_x - sector_width / 2 + startGeodesicsOffset_x[startGeodesic] * sector_width

        geodesicStart_y_tmp = sector_center_y + sector_height / 2 - startGeodesicsOffset_y[
            startGeodesic] * sector_height

        geodesicEnd_x_tmp = geodesicStart_x_tmp + math.cos(- startGeodesicsAngle[startGeodesic] * math.pi / 180) * \
                            startGeodesicsLength[startGeodesic]

        geodesicEnd_y_tmp = geodesicStart_y_tmp + math.sin(- startGeodesicsAngle[startGeodesic] * math.pi / 180) * \
                            startGeodesicsLength[startGeodesic]

        geodesicStartPoint = rotationAroundPoint(geodesicStart_x_tmp, geodesicStart_y_tmp, sector_angle,
                                                 sector_center_x, sector_center_y)

        geodesicEndPoint = rotationAroundPoint(geodesicEnd_x_tmp, geodesicEnd_y_tmp, sector_angle, sector_center_x,
                                               sector_center_y)

        geodesicValues[geodesicDict["x_Start"]][startGeodesic] = geodesicStartPoint[0]

        geodesicValues[geodesicDict["y_Start"]][startGeodesic] = geodesicStartPoint[1]

        geodesicValues[geodesicDict["x_End"]][startGeodesic] = geodesicEndPoint[0]

        geodesicValues[geodesicDict["y_End"]][startGeodesic] = geodesicEndPoint[1]

        geodesicValues[geodesicDict["startParentSector"]][startGeodesic] = "[" + str(
            startGeodesicsSectors[startGeodesic]) + "," + str(startGeodesic) + "]"

        geodesicValues[geodesicDict["startLineID"]][startGeodesic] = "[" + str(startGeodesic) + "," + str(1) + "]"

        geodesicValues[geodesicDict["startStrokeWidth"]][startGeodesic] = 2

        geodesicValues[geodesicDict["startFill"]][startGeodesic] = "line_colors[" + str(startGeodesic) + "]"

        geodesicValues[geodesicDict["startStroke"]][startGeodesic] = "line_colors[" + str(startGeodesic) + "]"

    for ii in range(0, len(variablenamesGeodesics)):
        file.write(variablenamesGeodesics[ii] + "= [ ")
        for jj in range(0, len(startGeodesicsSectors)):
            file.write(str(geodesicValues[ii][jj]) + ', ')
        file.write("];\n")

    variablenamesMarks = ["markStart_x", "markStart_y", "markStartStrokeWidth", "markStartRadius", "markStartFill",
                          "markStartStroke", "markStartParentSector", "markStartID"]

    markDict = dict(zip(variablenamesMarks, range(len(variablenamesMarks))))

    markValues = [[[] for ii in range(len(startMarksSectors))] for jj in range(len(variablenamesMarks))]

    for startMark in range(0, len(startMarksSectors)):

        sector_angle = sectorValues[sectorDict["sec_angle"]][startMarksSectors[startMark]]

        sector_width = sectorValues[sectorDict["sec_width"]][startMarksSectors[startMark]]

        sector_height = sectorValues[sectorDict["sec_height"]][startMarksSectors[startMark]]

        sector_center_x = sectorValues[sectorDict["sec_posx"]][startMarksSectors[startMark]]

        sector_center_y = sectorValues[sectorDict["sec_posy"]][startMarksSectors[startMark]]

        markStart_x_tmp = sector_center_x - sector_width / 2 + startMarksOffset_x[startMark] * sector_width

        markStart_y_tmp = sector_center_y + sector_height / 2 - startMarksOffset_y[startMark] * sector_height

        markStartPoint = rotationAroundPoint(markStart_x_tmp, markStart_y_tmp, sector_angle, sector_center_x,
                                             sector_center_y)

        markValues[markDict["markStart_x"]][startMark] = markStartPoint[0]

        markValues[markDict["markStart_y"]][startMark] = markStartPoint[1]

        markNumberInSector = 0

        if (startMark > 0):
            if (len(startMarksSectors) > 0):
                for jj in range(0, startMark):
                    if (startMarksSectors[jj] == startMarksSectors[startMark]):
                        markNumberInSector += 1

        markValues[markDict["markStartParentSector"]][startMark] = "[" + str(startMarksSectors[startMark]) + "," + str(
            markNumberInSector) + "]"

        markValues[markDict["markStartID"]][startMark] = "[" + str(startMark) + "," + str(1) + "]"

        markValues[markDict["markStartStrokeWidth"]][startMark] = 2

        markValues[markDict["markStartRadius"]][startMark] = startMarksRadius[startMark]

        markValues[markDict["markStartFill"]][startMark] = "mark_colors[" + str(startMark) + "]"

        markValues[markDict["markStartStroke"]][startMark] = "mark_colors[" + str(startMark) + "]"

    for ii in range(0, len(variablenamesMarks)):
        file.write(variablenamesMarks[ii] + "= [ ")
        for jj in range(0, len(startMarksSectors)):
            file.write(str(markValues[ii][jj]) + ', ')
        file.write("];\n")

    variablenamesTexts = ["textStart_x", "textStart_y", "textStartContent", "textStartFontSize",
                          "textStartParentSector", "textStartID", "textStartAngle"]

    textDict = dict(zip(variablenamesTexts, range(len(variablenamesTexts))))

    textValues = [[[] for ii in range(len(startTextsSectors))] for jj in range(len(variablenamesTexts))]

    for startText in range(0, len(startTextsSectors)):

        sector_angle = sectorValues[sectorDict["sec_angle"]][startTextsSectors[startText]]

        sector_width = sectorValues[sectorDict["sec_width"]][startTextsSectors[startText]]

        sector_height = sectorValues[sectorDict["sec_height"]][startTextsSectors[startText]]

        sector_center_x = sectorValues[sectorDict["sec_posx"]][startTextsSectors[startText]]

        sector_center_y = sectorValues[sectorDict["sec_posy"]][startTextsSectors[startText]]

        textStart_x_tmp = sector_center_x - sector_width / 2 + startTextsOffset_x[startText] * sector_width

        textStart_y_tmp = sector_center_y + sector_height / 2 - startTextsOffset_y[startText] * sector_height

        textStartPoint = rotationAroundPoint(textStart_x_tmp, textStart_y_tmp, sector_angle, sector_center_x,
                                             sector_center_y)

        textValues[textDict["textStart_x"]][startText] = textStartPoint[0]

        textValues[textDict["textStart_y"]][startText] = textStartPoint[1]

        textNumberInSector = 0

        if (startText > 0):
            if (len(startTextsSectors) > 0):
                for jj in range(0, startMark):
                    if (startTextsSectors[jj] == startTextsSectors[startText]):
                        textNumberInSector += 1

        textValues[textDict["textStartParentSector"]][startText] = "[" + str(startTextsSectors[startText]) + "," + str(
            textNumberInSector) + "]"

        textValues[textDict["textStartID"]][startText] = "[" + str(startText) + "]"

        textValues[textDict["textStartFontSize"]][startText] = 15

        textValues[textDict["textStartContent"]][startText] = "'" + startTextContent[startText] + "'"

        textValues[textDict["textStartAngle"]][startText] = 0

    for ii in range(0, len(variablenamesTexts)):
        file.write(variablenamesTexts[ii] + "= [ ")
        for jj in range(0, len(startTextsSectors)):
            file.write(str(textValues[ii][jj]) + ', ')
        file.write("];\n")

    file.close()





if (__name__=="__main__" or __name__=="builtins"):
    main()
    print("done_2")
