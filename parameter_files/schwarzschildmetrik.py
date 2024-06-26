import io
import math
import geodesicsTextsMarks as gtm

# modeltype:
# spatial: turnLorentzTransformOn = 0
# spacetime: turnLorentzTransformOn = 1
lorentzTransform = 0

nSektorzeilenVonRing = 3
nSektorspaltenVonRing = 12

nSektorzeilenVonRingSchwarzschild = 3
nSektorzeilenVonRingEuklid = 4

schwarzschildradius = 60
dr = 1.25
dradius = dr * schwarzschildradius

#Kameraeinstellungen
startZoom = 1
startViewportTransform_4 = 0
startViewportTransform_5 = 0

fontSize = 15

lineStrokeWidthWhenNotSelected = 2
lineStrokeWidthWhenSelected = 5

# Parameter fuer die Startgeodaeten
startGeodesicsSectors = [29, 29]
# Winkel in Grad
startGeodesicsAngle = [-112, -112]
# Startpunkt der Geodaete liegt in der unteren linken Ecke
# Versatz Anteilig der Sektorbreite
startGeodesicsOffset_x = [0.5, 0.7]
# Versatz Anteilig der Sektorhoehe
startGeodesicsOffset_y = [1, 1]
# Laenge der Geodaete in Pixel
startGeodesicsLength = [50, 50]
# operational bedeutet, dass sie wie eine echte Geodaete behandelt werden
startGeodesicsOperational = ['true', 'true']

# Parameter fuer die Startmarkierungen
startMarksSectors = [8, 11]
startMarksRadius = [5, 5]
startMarksOffset_x = [0.45, 0.145]
startMarksOffset_y = [0.99, 0.99]

# Parameter fuer die Starttexte
startTextsSectors = []
startTextContent = []
startTextsOffset_x = []
startTextsOffset_y = []

#Parameter fuer die Startvektoren
vectorStartSectors = []
#Winkel in Grad
vectorStartAngle = []
#Startpunkt der Geodaete liegt in der unteren linken Ecke
#Versatz Anteilig der Sektorbreite
vectorStartOffset_x = []
#Versatz Anteilig der Sektorhoehe
vectorStartOffset_y = []
#Laenge der Geodaete in Pixel
vectorStartLength = []
#operational bedeutet, dass sie wie eine echte Geodaete behandelt werden
vectorStartType = []


def rotationAroundPoint(point_x_tmp, point_y_tmp, sector_angle, sector_center_x, sector_center_y):
    rotatedPoint_x = sector_center_x + (point_x_tmp - sector_center_x) * math.cos(sector_angle * math.pi / 180) - (point_y_tmp - sector_center_y) * math.sin(sector_angle * math.pi / 180)

    rotatedPoint_y = sector_center_y + (point_x_tmp - sector_center_x) * math.sin(sector_angle * math.pi / 180) + (point_y_tmp - sector_center_y) * math.cos(sector_angle * math.pi / 180)

    rotatedPoint = [rotatedPoint_x, rotatedPoint_y]

    return rotatedPoint


def main():

    dphi = (2*math.pi/nSektorspaltenVonRing)


    sector_y_dist = 10.0



    file = io.open("schwarzschildmetrik_parallel.js",'w')
    #file = io.open("schwarzschildmetrik_big_model.js", 'w')
    #file = io.open("schwarzschildmetrik_eine.js", 'w')
    #file = io.open("schwarzschildmetrik_zwei_signale.js", 'w')

    file.write( "/*" +"\n"
                "------Parameter-------" +"\n"
                "turnLorentzTransformOn = " + str(lorentzTransform) + "\n"
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
        "startZoom =" + str(startZoom) + "\n"
        "startViewportTransform_4 =" + str(startViewportTransform_4) + "\n"
        "startViewportTransform_5 =" + str(startViewportTransform_5) + "\n"
    )
    file.write("\n")

    file.write("let turnLorentzTransformOn =" + str(lorentzTransform) + "\n")

    file.write("\n")

    file.write(
        "let line_colors = [ 'black', 'blue', 'grey', 'purple', 'orange', 'fuchsia', 'deepskyblue', 'gold', 'silver', 'lightskyblue', 'lightsteelblue', 'greenyellow', 'tomato', 'darkorchid', 'mistyrose', 'salmon'];")
    file.write("\n")
    file.write(
        "let mark_colors = ['grey', 'grey', 'grey'];")
    file.write("\n")
    file.write(
        "let lineStrokeWidthWhenNotSelected = " + str(lineStrokeWidthWhenNotSelected)
    )
    file.write("\n")
    file.write(
        "let lineStrokeWidthWhenSelected =" + str(lineStrokeWidthWhenSelected)
    )
    file.write("\n")
    variablenamesSectors = ["sec_name", "sec_fill", "sec_ID", "sec_type", "sec_fontSize", "sec_top","sec_bottom", "sec_height", "sec_width", "sec_offset", "sec_coords", "sec_neighbour_top", "sec_neighbour_right", "sec_neighbour_bottom", "sec_neighbour_left", "sec_posx","sec_posy","sec_angle"  ]
    sectorDict = dict(zip(variablenamesSectors,range(len(variablenamesSectors))))
    anzahlDerSektoren = nSektorzeilenVonRing * nSektorspaltenVonRing

    sectorValues = [[[] for ii in range(anzahlDerSektoren)] for jj in range(len(variablenamesSectors))]



    for ringspalte in range(0, nSektorspaltenVonRing):
        for ringzeile in range(0, nSektorzeilenVonRing):

            rad1 = 1.25 * schwarzschildradius + (ringzeile) * dradius
            rad2 = 1.25 * schwarzschildradius + (ringzeile + 1) * dradius

            wichtungsfaktor = 0.0

            if(ringzeile < nSektorzeilenVonRingSchwarzschild):
                wichtungsfaktorBottom = 0.0
                wichtungsfaktorTop = 0.0
                wichtungsfaktorRadial = 0.0
            elif(ringzeile < nSektorzeilenVonRing - nSektorzeilenVonRingEuklid):
                if(ringzeile == nSektorzeilenVonRingSchwarzschild):
                    wichtungsfaktorBottom = 0.0
                else:
                    wichtungsfaktorBottom = (ringzeile - 1 - nSektorzeilenVonRingEuklid) * 1 / (nSektorzeilenVonRing - (nSektorzeilenVonRingSchwarzschild + nSektorzeilenVonRingEuklid))
                if(ringzeile == nSektorzeilenVonRing - nSektorzeilenVonRingEuklid - 1):
                    wichtungsfaktorTop = 1.0
                else:
                    wichtungsfaktorTop = (ringzeile - nSektorzeilenVonRingEuklid) * 1 / (nSektorzeilenVonRing - (nSektorzeilenVonRingSchwarzschild + nSektorzeilenVonRingEuklid))
                wichtungsfaktorRadial = (ringzeile - nSektorzeilenVonRingEuklid) * 1 / (nSektorzeilenVonRing - (nSektorzeilenVonRingSchwarzschild -1 + nSektorzeilenVonRingEuklid))
            elif(ringzeile >= nSektorzeilenVonRing - nSektorzeilenVonRingEuklid):
                #if (ringzeile == nSektorzeilenVonRing - nSektorzeilenVonRingEuklid):
                    #wichtungsfaktorBottom = (ringzeile - 1 - nSektorzeilenVonRingSchwarzschild) * 1 / (nSektorzeilenVonRing - (nSektorzeilenVonRingSchwarzschild + nSektorzeilenVonRingEuklid))
                #else:
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

            print("Ringzeile" + str(ringzeile))
            print(str(lengthSchwarzschildBottom - lengthEuklidBottom))
            print(str(1 - lengthEuklidBottom / lengthSchwarzschildBottom))
            print(str(lengthSchwarzschildTop - lengthEuklidTop))
            print(str(1 - lengthEuklidTop / lengthSchwarzschildTop))
            print("difference radialSchwarzschild radialEuklidisch " + str(radialSchwarzschild - radialEuklidisch))
            print("mistake " + str(1 - radialEuklidisch / radialSchwarzschild))

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
                sector_y_dist = sector_height / 2 + sectorValues[sectorDict["sec_height"]][ringzeile-1] / 2 + sector_y_dist + 20
            else:
                sector_y_dist = dradius + sector_height/2 + 30

            if(ringzeile + 97 < (26 +97)):
                sectorValues[sectorDict["sec_name"]][ringzeile + ringspalte * nSektorzeilenVonRing] = "'%c%d'" % (chr(ringzeile + 97).upper(), (ringspalte + 1))
            else:
                sectorValues[sectorDict["sec_name"]][ringzeile + ringspalte * nSektorzeilenVonRing] = "'%c%c%d'" % (chr(ringzeile//26 - 1 + 97).upper(), chr(ringzeile%26 + 97).upper(), (ringspalte + 1))

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

    gtm.startprocess(file, sectorValues, startGeodesicsSectors, startGeodesicsAngle, startGeodesicsLength,
                 startGeodesicsOffset_x,startGeodesicsOffset_y,
                 startMarksSectors,startMarksOffset_x,startMarksOffset_y,startMarksRadius,
                 startTextsSectors,startTextsOffset_x,startTextsOffset_y, startTextContent,
                 vectorStartSectors,vectorStartAngle, vectorStartLength,
                 vectorStartOffset_x, vectorStartOffset_y)

    file.close()


if (__name__=="__main__" or __name__=="builtins"):
    main()
    print("done")