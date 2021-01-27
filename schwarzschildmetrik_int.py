import io
import math


nSektorzeilenVonRing = 15
nSektorspaltenVonRing = 12

nSektorzeilenVonRingSchwarzschild = 3
nSektorzeilenVonRingEuklid = 3

schwarzschildradius = 60
dr = 1.25
dradius = dr * schwarzschildradius

#Kameraeinstellungen
startZoom = 1
startViewportTransform_4 = 0
startViewportTransform_5 = 0

fontSize = 15

# Parameter fuer die Startgeodaeten
startGeodesicsSectors = []
# Winkel in Grad
startGeodesicsAngle = []
# Startpunkt der Geodaete liegt in der unteren linken Ecke
# Versatz Anteilig der Sektorbreite
startGeodesicsOffset_x = []
# Versatz Anteilig der Sektorhoehe
startGeodesicsOffset_y = []
# Laenge der Geodaete in Pixel
startGeodesicsLength = []
# operational bedeutet, dass sie wie eine echte Geodaete behandelt werden
startGeodesicsOperational = []

# Parameter fuer die Startmarkierungen
startMarksSectors = []
startMarksRadius = []
startMarksOffset_x = []
startMarksOffset_y = []

# Parameter fuer die Starttexte
startTextsSectors = []
startTextContent = []
startTextsOffset_x = []
startTextsOffset_y = []


def rotationAroundPoint(point_x_tmp, point_y_tmp, sector_angle, sector_center_x, sector_center_y):
    rotatedPoint_x = sector_center_x + (point_x_tmp - sector_center_x) * math.cos(sector_angle * math.pi / 180) - (point_y_tmp - sector_center_y) * math.sin(sector_angle * math.pi / 180)

    rotatedPoint_y = sector_center_y + (point_x_tmp - sector_center_x) * math.sin(sector_angle * math.pi / 180) + (point_y_tmp - sector_center_y) * math.cos(sector_angle * math.pi / 180)

    rotatedPoint = [rotatedPoint_x, rotatedPoint_y]

    return rotatedPoint


def main():

    dphi = (2*math.pi/nSektorspaltenVonRing)


    sector_y_dist = 0.0



    file = io.open("schwarzschildmetrik_big_model.js",'w')
    #file = io.open("schwarzschildmetrik_big_model.js", 'w')
    #file = io.open("schwarzschildmetrik_eine.js", 'w')

    file.write(
        "startZoom =" + str(startZoom) + "\n"
        "startViewportTransform_4 =" + str(startViewportTransform_4) + "\n"
        "startViewportTransform_5 =" + str(startViewportTransform_5) + "\n"
    )
    file.write("\n")

    file.write( "/*" +"\n"
                "------Parameter-------" +"\n"
                "nSektorzeilenVonRing: " + str(nSektorzeilenVonRing) +"\n"
                "nSektorspaltenVonRing: " + str(nSektorspaltenVonRing) +"\n"
                "nSektorzeilenVonRingSchwarzschild: " + str(nSektorzeilenVonRingSchwarzschild) +"\n"
                "nSektorzeilenVonRingEuklid: " + str(nSektorzeilenVonRingEuklid) +"\n"
                "schwarzschildradius: " + str(schwarzschildradius) +"\n"
                "dradius: " + str(dr) + " * " +str(schwarzschildradius) + "\n"
                "startZoom =" + str(startZoom) + "\n"
                "startViewportTransform_4 =" + str(startViewportTransform_4) + "\n"
                "startViewportTransform_5 =" + str(startViewportTransform_5) + "\n"
                "fontSize: " + str(fontSize) + "\n"                                                        
                "startGeodesicsSectors: " + str(startGeodesicsSectors) + "\n"  
                "startGeodesicsAngle: " + str(startGeodesicsAngle) + "\n"    
                "startGeodesicsOffset_x: " + str(startGeodesicsOffset_x) + "\n"
                "startGeodesicsOffset_y: " + str(startGeodesicsOffset_y) + "\n"  
                "startGeodesicsLength: " + str(startGeodesicsLength) + "\n"   
                "startGeodesicsOperational: " + str(startGeodesicsOperational) + "\n"                                                         
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
        "let mark_colors = ['grey', 'grey', 'grey'];")
    file.write("\n")

    variablenamesSectors = ["sec_name", "sec_fill", "sec_ID", "sec_type", "sec_fontSize", "sec_top","sec_bottom", "sec_height", "sec_width", "sec_offset", "sec_coords", "sec_neighbour_top", "sec_neighbour_right", "sec_neighbour_bottom", "sec_neighbour_left", "sec_posx","sec_posy","sec_angle"  ]
    sectorDict = dict(zip(variablenamesSectors,range(len(variablenamesSectors))))
    anzahlDerSektoren = nSektorzeilenVonRing * nSektorspaltenVonRing

    sectorValues = [[[] for ii in range(anzahlDerSektoren)] for jj in range(len(variablenamesSectors))]



    for ringspalte in range(0, nSektorspaltenVonRing):
        for ringzeile in range(0, nSektorzeilenVonRing):

            rad1 = (ringzeile + 1) * dradius
            rad2 = (ringzeile + 2) * dradius

            wichtungsfaktor = 0.0

            if(ringzeile < nSektorzeilenVonRingSchwarzschild):
                wichtungsfaktorBottom = 0.0
                wichtungsfaktorTop = 0.0
                wichtungsfaktorRadial = 0.0
            elif(ringzeile < nSektorzeilenVonRing - nSektorzeilenVonRingEuklid):
                if(ringzeile == nSektorzeilenVonRingSchwarzschild):
                    wichtungsfaktorBottom = 0.0
                else:
                    wichtungsfaktorBottom = (ringzeile - 1 - nSektorzeilenVonRingSchwarzschild) * 1 / (nSektorzeilenVonRing - (nSektorzeilenVonRingSchwarzschild + nSektorzeilenVonRingEuklid))
                wichtungsfaktorTop = (ringzeile - nSektorzeilenVonRingEuklid) * 1 / (nSektorzeilenVonRing - (nSektorzeilenVonRingSchwarzschild + nSektorzeilenVonRingEuklid))
                wichtungsfaktorRadial = (ringzeile - nSektorzeilenVonRingEuklid) * 1 / (nSektorzeilenVonRing - (nSektorzeilenVonRingSchwarzschild -1 + nSektorzeilenVonRingEuklid))
            elif(ringzeile >= nSektorzeilenVonRing - nSektorzeilenVonRingEuklid):
                if (ringzeile == nSektorzeilenVonRing - nSektorzeilenVonRingEuklid):
                    wichtungsfaktorBottom = (ringzeile - 1 - nSektorzeilenVonRingSchwarzschild) * 1 / (nSektorzeilenVonRing - (nSektorzeilenVonRingSchwarzschild + nSektorzeilenVonRingEuklid))
                else:
                    wichtungsfaktorBottom = 1.0
                wichtungsfaktorTop = 1.0
                wichtungsfaktorRadial = 1.0

            print("zzzzzzzzzzz")
            print("WB: " + str(wichtungsfaktorBottom))
            print("WT: " + str(wichtungsfaktorTop))
            print("WR: "+ str(wichtungsfaktorRadial))


            lengthSchwarzschildBottom = rad1 * dphi
            lengthSchwarzschildTop = rad2 * dphi
            lengthEuklidBottom = rad1 * 2 * math.sin(dphi / 2)
            lengthEuklidTop = rad2 * 2 * math.sin(dphi / 2)

            print("SB: "+ str(lengthSchwarzschildBottom))
            print("ST: "+ str(lengthSchwarzschildTop))
            print("EB: "+ str(lengthEuklidBottom))
            print("ET: "+ str(lengthEuklidTop))

            lengthBottomMid = (1 - wichtungsfaktorBottom) * lengthSchwarzschildBottom + wichtungsfaktorBottom * lengthEuklidBottom
            lengthTopMid = (1 - wichtungsfaktorTop) * lengthSchwarzschildTop + wichtungsfaktorTop * lengthEuklidTop

            print("MB: " + str(lengthBottomMid))
            print("MT: " + str(lengthTopMid))

            radialSchwarzschild = math.sqrt(rad2 * (rad2 - schwarzschildradius)) + schwarzschildradius * math.log(math.sqrt(rad2 - schwarzschildradius) + math.sqrt(rad2)) - (math.sqrt(rad1 * (rad1 - schwarzschildradius)) + schwarzschildradius * math.log(math.sqrt(rad1 - schwarzschildradius) + math.sqrt(rad1)))
            radialEuklidisch = dradius

            if(ringzeile < nSektorzeilenVonRingSchwarzschild):
                radial = radialSchwarzschild
            elif(ringzeile < nSektorzeilenVonRing - nSektorzeilenVonRingEuklid):
                radial = (1 - wichtungsfaktorRadial) * radialSchwarzschild + wichtungsfaktorRadial * radialEuklidisch
            elif(ringzeile >= nSektorzeilenVonRing - nSektorzeilenVonRingEuklid):
                radial = radialEuklidisch
            #offset = dradius * dphi * 0.5
            offset = abs(lengthTopMid - lengthBottomMid) / 2
            sector_height = math.sqrt(math.pow(radial, 2) - math.pow(offset, 2))


            if (ringzeile != 0):
                sector_y_dist = sector_height / 2 + sectorValues[sectorDict["sec_height"]][ringzeile-1] / 2 + sector_y_dist + 30
            else:
                sector_y_dist = dradius + sector_height/2 + 30

            sectorValues[sectorDict["sec_name"]][ringzeile + ringspalte * nSektorzeilenVonRing] = "'%c%d'" % (chr(ringzeile + 97).upper(),(ringspalte+1))
            sectorValues[sectorDict["sec_ID"]][ringzeile + ringspalte * nSektorzeilenVonRing] = ringzeile + ringspalte * (nSektorzeilenVonRing)

            if (ringzeile >= nSektorzeilenVonRing - nSektorzeilenVonRingEuklid):
                sectorValues[sectorDict["sec_type"]][ringzeile + ringspalte * nSektorzeilenVonRing] = "'euklid'"
            else:
                sectorValues[sectorDict["sec_type"]][ringzeile + ringspalte * nSektorzeilenVonRing] = "'noneuklid'"

            sectorValues[sectorDict["sec_fill"]][ringzeile + ringspalte * nSektorzeilenVonRing] = "'white'"
            sectorValues[sectorDict["sec_fontSize"]][ringzeile + ringspalte * nSektorzeilenVonRing] = fontSize
            sectorValues[sectorDict["sec_top"]][ringzeile + ringspalte * nSektorzeilenVonRing] = lengthTopMid #(dradius * (ringzeile + 2)) * dphi
            sectorValues[sectorDict["sec_bottom"]][ringzeile + ringspalte * nSektorzeilenVonRing] = lengthBottomMid #(dradius * (ringzeile + 1)) * dphi



            sector_width = sectorValues[sectorDict["sec_top"]][ringzeile + ringspalte * nSektorzeilenVonRing]


            sectorValues[sectorDict["sec_height"]][ringzeile + ringspalte * nSektorzeilenVonRing] = sector_height

            sectorValues[sectorDict["sec_width"]][ringzeile + ringspalte * nSektorzeilenVonRing] = sector_width

            sectorValues[sectorDict["sec_offset"]][ringzeile + ringspalte * nSektorzeilenVonRing] = offset

            sectorValues[sectorDict["sec_coords"]][ringzeile + ringspalte * nSektorzeilenVonRing] = ([-min(0, offset),
                                                                                          0,
                                                                                          sectorValues[sectorDict["sec_top"]][ringzeile + ringspalte * nSektorzeilenVonRing] - min(0, offset),
                                                                                          0,
                                                                                          sectorValues[sectorDict["sec_bottom"]][ringzeile + ringspalte * nSektorzeilenVonRing] + max(0, offset),
                                                                                          sectorValues[sectorDict["sec_height"]][ringzeile + ringspalte * nSektorzeilenVonRing],
                                                                                          max(0, offset),
                                                                                          sectorValues[sectorDict["sec_height"]][ringzeile + ringspalte * nSektorzeilenVonRing]])


            sectorValues[sectorDict["sec_posx"]][ringzeile + ringspalte * nSektorzeilenVonRing] = math.sin(ringspalte * dphi) * ( sector_y_dist)

            sectorValues[sectorDict["sec_posy"]][ringzeile + ringspalte * nSektorzeilenVonRing] = - math.cos(ringspalte * dphi) * ( sector_y_dist)

            sectorValues[sectorDict["sec_angle"]][ringzeile + ringspalte * nSektorzeilenVonRing] = ringspalte * dphi *180/math.pi

            sectorValues[sectorDict["sec_neighbour_top"]][ringzeile + ringspalte * nSektorzeilenVonRing] = -1

            sectorValues[sectorDict["sec_neighbour_right"]][ringzeile + ringspalte * nSektorzeilenVonRing] = -1

            sectorValues[sectorDict["sec_neighbour_bottom"]][ringzeile + ringspalte * nSektorzeilenVonRing] = -1

            sectorValues[sectorDict["sec_neighbour_left"]][ringzeile + ringspalte * nSektorzeilenVonRing] = -1

            if (ringzeile == (nSektorzeilenVonRing - 1)):
                sectorValues[sectorDict["sec_neighbour_top"]][ringzeile + ringspalte * nSektorzeilenVonRing] = -1
            else:
                sectorValues[sectorDict["sec_neighbour_top"]][ringzeile + ringspalte * nSektorzeilenVonRing] = ringzeile + ringspalte * (nSektorzeilenVonRing) + 1

            if (ringspalte == (nSektorspaltenVonRing - 1)):
                sectorValues[sectorDict["sec_neighbour_right"]][ringzeile + ringspalte * nSektorzeilenVonRing] = ringzeile
            else:
                sectorValues[sectorDict["sec_neighbour_right"]][ringzeile + ringspalte * nSektorzeilenVonRing] = ringzeile + ringspalte * (nSektorzeilenVonRing) + nSektorzeilenVonRing

            if (ringzeile == 0):
                sectorValues[sectorDict["sec_neighbour_bottom"]][ringzeile + ringspalte * (nSektorzeilenVonRing)] = -1
            else:
                sectorValues[sectorDict["sec_neighbour_bottom"]][ringzeile + ringspalte * (nSektorzeilenVonRing)] = ringzeile + ringspalte * (nSektorzeilenVonRing) -1

            if (ringspalte == 0):
                sectorValues[sectorDict["sec_neighbour_left"]][ringzeile + ringspalte * (nSektorzeilenVonRing)] = nSektorspaltenVonRing * nSektorzeilenVonRing - nSektorzeilenVonRing + ringzeile
            else:
                sectorValues[sectorDict["sec_neighbour_left"]][ringzeile + ringspalte * (nSektorzeilenVonRing)] = ringzeile + ringspalte * (nSektorzeilenVonRing) - nSektorzeilenVonRing








    for ii in range(0,len(variablenamesSectors)):
        file.write(variablenamesSectors[ii]+"= [ ")
        for jj in range(0,anzahlDerSektoren):
            file.write(str( sectorValues[ii][jj])+', ')
        file.write("];\n")

    variablenamesGeodesics = ["startSectors", "x_Start", "y_Start", "x_End", "y_End", "startStrokeWidth", "startFill",
                              "startStroke", "startParentSector", "startLineID"]
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
    print("done")