import math


variablenamesSectors = ["sec_name", "sec_fill", "sec_ID", "sec_type", "sec_fontSize", "sec_top","sec_bottom", "sec_height", "sec_width", "sec_offset", "sec_coords", "sec_neighbour_top", "sec_neighbour_right", "sec_neighbour_bottom", "sec_neighbour_left", "sec_posx","sec_posy","sec_angle"  ]

sectorDict = dict(zip(variablenamesSectors,range(len(variablenamesSectors))))


variablenamesGeodesics = ["startSectors", "x_Start", "y_Start", "x_End", "y_End", "startStrokeWidth", "startFill", "startStroke", "startParentSector", "startLineID"]

geodesicDict = dict(zip(variablenamesGeodesics, range(len(variablenamesGeodesics))))


variablenamesMarks = ["markStart_x", "markStart_y", "markStartStrokeWidth", "markStartRadius", "markStartFill", "markStartStroke", "markStartParentSector", "markStartID"]

markDict = dict(zip(variablenamesMarks, range(len(variablenamesMarks))))


variablenamesTexts = ["textStart_x", "textStart_y", "textStartContent", "textStartFontSize", "textStartParentSector", "textStartID", "textStartAngle"]

textDict = dict(zip(variablenamesTexts, range(len(variablenamesTexts))))



def rotationAroundPoint(point_x_tmp, point_y_tmp, sector_angle, sector_center_x, sector_center_y):

    rotatedPoint_x = sector_center_x + (point_x_tmp - sector_center_x) * math.cos(sector_angle * math.pi / 180) - (point_y_tmp - sector_center_y) * math.sin(sector_angle * math.pi / 180)

    rotatedPoint_y = sector_center_y + (point_x_tmp - sector_center_x) * math.sin(sector_angle * math.pi / 180) + (point_y_tmp - sector_center_y) * math.cos(sector_angle * math.pi / 180)

    rotatedPoint = [rotatedPoint_x, rotatedPoint_y]

    return rotatedPoint



def startprocess(file, sectorValues, startGeodesicsSectors, startGeodesicsAngle, startGeodesicsLength,
                 startGeodesicsOffset_x,startGeodesicsOffset_y,
                 startMarksSectors,startMarksOffset_x,startMarksOffset_y,startMarksRadius,
                 startTextsSectors,startTextsOffset_x,startTextsOffset_y, startTextContent):

    geodesicValues = [[[] for ii in range(len(startGeodesicsSectors))] for jj in range(len(variablenamesGeodesics))]

    for startGeodesic in range(0, len(startGeodesicsSectors)):
        geodesicValues[geodesicDict["startSectors"]][startGeodesic] = startGeodesicsSectors[startGeodesic]

        sector_angle = sectorValues[sectorDict["sec_angle"]][startGeodesicsSectors[startGeodesic]]

        sector_width = sectorValues[sectorDict["sec_width"]][startGeodesicsSectors[startGeodesic]]

        sector_height = sectorValues[sectorDict["sec_height"]][startGeodesicsSectors[startGeodesic]]

        sector_center_x = sectorValues[sectorDict["sec_posx"]][startGeodesicsSectors[startGeodesic]]

        sector_center_y = sectorValues[sectorDict["sec_posy"]][startGeodesicsSectors[startGeodesic]]

        geodesicStart_x_tmp = sector_center_x - sector_width / 2 + startGeodesicsOffset_x[startGeodesic] * sector_width

        geodesicStart_y_tmp = sector_center_y + sector_height / 2 - startGeodesicsOffset_y[startGeodesic] * sector_height

        geodesicEnd_x_tmp = geodesicStart_x_tmp + math.cos( - startGeodesicsAngle[startGeodesic] * math.pi / 180) * startGeodesicsLength[startGeodesic]

        geodesicEnd_y_tmp = geodesicStart_y_tmp + math.sin( - startGeodesicsAngle[startGeodesic] * math.pi / 180) * startGeodesicsLength[startGeodesic]

        geodesicStartPoint = rotationAroundPoint(geodesicStart_x_tmp, geodesicStart_y_tmp, sector_angle, sector_center_x, sector_center_y)

        geodesicEndPoint = rotationAroundPoint(geodesicEnd_x_tmp, geodesicEnd_y_tmp, sector_angle, sector_center_x, sector_center_y)

        geodesicValues[geodesicDict["x_Start"]][startGeodesic] = geodesicStartPoint[0]

        geodesicValues[geodesicDict["y_Start"]][startGeodesic] = geodesicStartPoint[1]

        geodesicValues[geodesicDict["x_End"]][startGeodesic] = geodesicEndPoint[0]

        geodesicValues[geodesicDict["y_End"]][startGeodesic] = geodesicEndPoint[1]

        geodesicNumberInSector = 0

        if (startGeodesic > 0):
            if (len(startGeodesicsSectors) > 0):
                for jj in range(0, startGeodesic):
                    if (startGeodesicsSectors[jj] == startGeodesicsSectors[startGeodesic]):
                        geodesicNumberInSector += 1

        geodesicValues[geodesicDict["startParentSector"]][startGeodesic] = "[" + str(startGeodesicsSectors[startGeodesic]) + "," + str(geodesicNumberInSector) + "]"

        #geodesicValues[geodesicDict["startParentSector"]][startGeodesic] = "["+str(startGeodesicsSectors[startGeodesic])+","+str(startGeodesic)+"]"

        geodesicValues[geodesicDict["startLineID"]][startGeodesic] = "["+str(startGeodesic)+","+str(1)+"]"

        geodesicValues[geodesicDict["startStrokeWidth"]][startGeodesic] = 2

        geodesicValues[geodesicDict["startFill"]][startGeodesic] = "line_colors["+str(startGeodesic)+"]"

        geodesicValues[geodesicDict["startStroke"]][startGeodesic] = "line_colors["+str(startGeodesic)+"]"


    for ii in range(0, len(variablenamesGeodesics)):
        file.write(variablenamesGeodesics[ii] + "= [ ")
        for jj in range(0, len(startGeodesicsSectors)):
            file.write(str(geodesicValues[ii][jj]) + ', ')
        file.write("];\n")


    markValues = [[[] for ii in range(len(startMarksSectors))] for jj in range(len(variablenamesMarks))]

    for startMark in range(0, len(startMarksSectors)):

        sector_angle = sectorValues[sectorDict["sec_angle"]][startMarksSectors[startMark]]

        sector_width = sectorValues[sectorDict["sec_width"]][startMarksSectors[startMark]]

        sector_height = sectorValues[sectorDict["sec_height"]][startMarksSectors[startMark]]

        sector_center_x = sectorValues[sectorDict["sec_posx"]][startMarksSectors[startMark]]

        sector_center_y = sectorValues[sectorDict["sec_posy"]][startMarksSectors[startMark]]

        markStart_x_tmp = sector_center_x - sector_width / 2 + startMarksOffset_x[startMark] * sector_width

        markStart_y_tmp = sector_center_y + sector_height / 2 - startMarksOffset_y[startMark] * sector_height

        markStartPoint = rotationAroundPoint(markStart_x_tmp, markStart_y_tmp, sector_angle, sector_center_x, sector_center_y)

        markValues[markDict["markStart_x"]][startMark] = markStartPoint[0]

        markValues[markDict["markStart_y"]][startMark] = markStartPoint[1]

        markNumberInSector = 0

        if (startMark > 0):
            if (len(startMarksSectors) > 0):
                for jj in range(0, startMark):
                    if(startMarksSectors[jj] == startMarksSectors[startMark]):
                        markNumberInSector +=1


        markValues[markDict["markStartParentSector"]][startMark] = "[" + str(startMarksSectors[startMark]) + "," + str(markNumberInSector) + "]"

        markValues[markDict["markStartID"]][startMark] = "[" + str(startMark) + "]"

        markValues[markDict["markStartStrokeWidth"]][startMark] = 2

        markValues[markDict["markStartRadius"]][startMark] = startMarksRadius[startMark]

        markValues[markDict["markStartFill"]][startMark] = "mark_colors[" + str(startMark) + "]"

        markValues[markDict["markStartStroke"]][startMark] = "mark_colors[" + str(startMark) + "]"

    for ii in range(0, len(variablenamesMarks)):
        file.write(variablenamesMarks[ii] + "= [ ")
        for jj in range(0, len(startMarksSectors)):
            file.write(str(markValues[ii][jj]) + ', ')
        file.write("];\n")



    textValues = [[[] for ii in range(len(startTextsSectors))] for jj in range(len(variablenamesTexts))]

    for startText in range(0, len(startTextsSectors)):

        sector_angle = sectorValues[sectorDict["sec_angle"]][startTextsSectors[startText]]

        sector_width = sectorValues[sectorDict["sec_width"]][startTextsSectors[startText]]

        sector_height = sectorValues[sectorDict["sec_height"]][startTextsSectors[startText]]

        sector_center_x = sectorValues[sectorDict["sec_posx"]][startTextsSectors[startText]]

        sector_center_y = sectorValues[sectorDict["sec_posy"]][startTextsSectors[startText]]

        textStart_x_tmp = sector_center_x - sector_width / 2 + startTextsOffset_x[startText] * sector_width

        textStart_y_tmp = sector_center_y + sector_height / 2 - startTextsOffset_y[startText] * sector_height

        textStartPoint = rotationAroundPoint(textStart_x_tmp, textStart_y_tmp, sector_angle, sector_center_x, sector_center_y)

        textValues[textDict["textStart_x"]][startText] = textStartPoint[0]

        textValues[textDict["textStart_y"]][startText] = textStartPoint[1]

        textNumberInSector = 0

        if (startText > 0):
            if (len(startTextsSectors) > 0):
                for jj in range(0, startText):
                    if (startTextsSectors[jj] == startTextsSectors[startText]):
                        textNumberInSector += 1

        textValues[textDict["textStartParentSector"]][startText] = "[" + str(startTextsSectors[startText]) + "," + str(textNumberInSector) + "]"

        textValues[textDict["textStartID"]][startText] = "[" + str(startText) + "]"

        textValues[textDict["textStartFontSize"]][startText] = 15

        textValues[textDict["textStartContent"]][startText] = "'" + startTextContent[startText] + "'"

        textValues[textDict["textStartAngle"]][startText] = 0

    for ii in range(0, len(variablenamesTexts)):
        file.write(variablenamesTexts[ii] + "= [ ")
        for jj in range(0, len(startTextsSectors)):
            file.write(str(textValues[ii][jj]) + ', ')
        file.write("];\n")