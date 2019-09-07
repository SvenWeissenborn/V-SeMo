import io
import numpy as np
import math
import string

nSektorzeilenVonRing = 3
nSektorspaltenVonRing = 12

schwarzschildradius = 60
dradius = 1.25 * schwarzschildradius

fontSize = 15


# startGeodesicsAngle ist das entscheidende Array für den Startwinkel und die Anzahl der Startgeodäten
# versatz_x versetzt die Geodäten in der x-Richtung vom Mittelpunkt des Sektors weg
# versatz_y liegt zwischen -1 und 1 und sorgt bei gleichen Winkel für parallele Geodäten

versatz_x = 0.4
versatz_y = 0.0
versatz_x_var = 0.0
versatz_y_var = 0.0

startGeodesicsAngle = [45.5, 115]

startGeodesicsSector = 29


def main():

    dphi = (2*math.pi/nSektorspaltenVonRing)


    sector_y_dist = 0.0



    file = io.open("schwarzschildmetrik_zwei_signale.js",'w')

    file.write(
        "let line_colors = ['blue', 'black', 'grey', 'purple', 'orange', 'fuchsia', 'deepskyblue', 'gold', 'silver', 'lightskyblue', 'lightsteelblue', 'greenyellow', 'tomato', 'darkorchid', 'mistyrose', 'salmon'];")
    file.write("\n")

    variablenamesSectors = ["sec_name", "sec_ID", "sec_fill", "sec_fontSize", "sec_top","sec_bottom", "sec_height", "sec_width", "sec_offset", "sec_neighbour_top", "sec_neighbour_right", "sec_neighbour_bottom", "sec_neighbour_left", "sec_posx","sec_posy","sec_angle"  ]
    sectorDict = dict(zip(variablenamesSectors,range(len(variablenamesSectors))))
    anzahlDerSektoren = nSektorzeilenVonRing * nSektorspaltenVonRing

    sectorValues = [[[] for ii in range(anzahlDerSektoren)] for jj in range(len(variablenamesSectors))]



    for ringspalte in range(0, nSektorspaltenVonRing):
        for ringzeile in range(0, nSektorzeilenVonRing):
            offset = dradius * dphi * 0.5
            rad1 = (ringzeile + 1) * dradius
            rad2 = (ringzeile + 2) * dradius
            radial = math.sqrt(rad2 * (rad2 - schwarzschildradius)) + schwarzschildradius * math.log(math.sqrt(rad2 - schwarzschildradius) + math.sqrt(rad2)) - (math.sqrt(rad1 * (rad1 - schwarzschildradius)) + schwarzschildradius * math.log(math.sqrt(rad1 - schwarzschildradius) + math.sqrt(rad1)))
            sector_height = math.sqrt(math.pow(radial, 2) - math.pow(offset, 2))


            if (ringzeile != 0):
                sector_y_dist = sector_height / 2 + sectorValues[sectorDict["sec_height"]][ringzeile-1] / 2 + sector_y_dist +10
            else:
                sector_y_dist = dradius + sector_height/2 +10

            sectorValues[sectorDict["sec_name"]][ringzeile + ringspalte * nSektorzeilenVonRing] = "'%c%d'" % (chr(ringzeile + 97).upper(),(ringspalte+1))
            sectorValues[sectorDict["sec_ID"]][ringzeile + ringspalte * nSektorzeilenVonRing] = ringzeile + ringspalte * (nSektorzeilenVonRing)
            sectorValues[sectorDict["sec_fill"]][ringzeile + ringspalte * nSektorzeilenVonRing] = "'white'"
            sectorValues[sectorDict["sec_fontSize"]][ringzeile + ringspalte * nSektorzeilenVonRing] = fontSize
            sectorValues[sectorDict["sec_top"]][ringzeile + ringspalte * nSektorzeilenVonRing] = (dradius * (ringzeile + 2)) * dphi
            sectorValues[sectorDict["sec_bottom"]][ringzeile + ringspalte * (nSektorzeilenVonRing)] = (dradius * (ringzeile + 1)) * dphi



            sector_width = sectorValues[sectorDict["sec_top"]][ringzeile + ringspalte * (nSektorzeilenVonRing)]


            sectorValues[sectorDict["sec_height"]][ringzeile + ringspalte * (nSektorzeilenVonRing)] = sector_height
            sectorValues[sectorDict["sec_width"]][ringzeile + ringspalte * (nSektorzeilenVonRing)] = sector_width
            sectorValues[sectorDict["sec_offset"]][ringzeile + ringspalte * (nSektorzeilenVonRing)] = offset
            sectorValues[sectorDict["sec_posx"]][ringzeile + ringspalte * (nSektorzeilenVonRing)] = math.sin(ringspalte * dphi) * ( sector_y_dist)
            sectorValues[sectorDict["sec_posy"]][ringzeile + ringspalte * (nSektorzeilenVonRing)] = - math.cos(ringspalte * dphi) * ( sector_y_dist)
            sectorValues[sectorDict["sec_angle"]][ringzeile + ringspalte * (nSektorzeilenVonRing)] = ringspalte * dphi *180/math.pi
            sectorValues[sectorDict["sec_neighbour_top"]][ringzeile + ringspalte * (nSektorzeilenVonRing)] = -1
            sectorValues[sectorDict["sec_neighbour_right"]][ringzeile + ringspalte * (nSektorzeilenVonRing)] = -1
            sectorValues[sectorDict["sec_neighbour_bottom"]][ringzeile + ringspalte * (nSektorzeilenVonRing)] = -1
            sectorValues[sectorDict["sec_neighbour_left"]][ringzeile + ringspalte * (nSektorzeilenVonRing)] = -1

            if (ringzeile == (nSektorzeilenVonRing - 1)):
                sectorValues[sectorDict["sec_neighbour_top"]][ringzeile + ringspalte * (nSektorzeilenVonRing)] = -1
            else:
                sectorValues[sectorDict["sec_neighbour_top"]][ringzeile + ringspalte * (nSektorzeilenVonRing)] = ringzeile + ringspalte * (nSektorzeilenVonRing) + 1

            if (ringspalte == (nSektorspaltenVonRing - 1)):
                sectorValues[sectorDict["sec_neighbour_right"]][ringzeile + ringspalte * (nSektorzeilenVonRing)] = ringzeile
            else:
                sectorValues[sectorDict["sec_neighbour_right"]][ringzeile + ringspalte * (nSektorzeilenVonRing)] = ringzeile + ringspalte * (nSektorzeilenVonRing) + nSektorzeilenVonRing

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





    lengthStartGeodesics = 0.45 * sectorValues[sectorDict["sec_height"]][startGeodesicsSector]

    deltaXStart = - versatz_x_var * sectorValues[sectorDict["sec_height"]][startGeodesicsSector]/2
    deltaYStart = - versatz_y_var * sectorValues[sectorDict["sec_width"]][startGeodesicsSector]/2

    variablenamesGeodesics = ["x_Start", "y_Start", "x_End", "y_End", "startStrokeWidth", "startFill", "startStroke", "startParentSector", "startLineID"]
    geodesicDict = dict(zip(variablenamesGeodesics, range(len(variablenamesGeodesics))))

    geodesicValues = [[[] for ii in range(len(startGeodesicsAngle))] for jj in range(len(variablenamesGeodesics))]

    for startGeodesic in range(0, len(startGeodesicsAngle)):
        geodesicValues[geodesicDict["x_Start"]][startGeodesic] = sectorValues[sectorDict["sec_posx"]][startGeodesicsSector] + deltaXStart * startGeodesic - versatz_x * sectorValues[sectorDict["sec_height"]][startGeodesicsSector]/2
        geodesicValues[geodesicDict["y_Start"]][startGeodesic] = sectorValues[sectorDict["sec_posy"]][startGeodesicsSector] + deltaYStart * startGeodesic - versatz_y * sectorValues[sectorDict["sec_width"]][startGeodesicsSector]/2
        geodesicValues[geodesicDict["x_End"]][startGeodesic] = sectorValues[sectorDict["sec_posx"]][startGeodesicsSector] + deltaXStart + math.sin(startGeodesicsAngle[startGeodesic] * math.pi/180) * lengthStartGeodesics
        geodesicValues[geodesicDict["y_End"]][startGeodesic] = sectorValues[sectorDict["sec_posy"]][startGeodesicsSector] + deltaYStart * startGeodesic + math.cos(startGeodesicsAngle[startGeodesic] * math.pi/180) * lengthStartGeodesics

        geodesicValues[geodesicDict["startParentSector"]][startGeodesic] = "[" + str(startGeodesicsSector) + "," + str(startGeodesic) + "]"
        geodesicValues[geodesicDict["startLineID"]][startGeodesic] = "[" + str(startGeodesic) + "," + str(1) + "]"
        geodesicValues[geodesicDict["startStrokeWidth"]][startGeodesic] = 2

        geodesicValues[geodesicDict["startFill"]][startGeodesic] = "line_colors[" + str(startGeodesic) + "]"
        geodesicValues[geodesicDict["startStroke"]][startGeodesic] = "line_colors[" + str(startGeodesic) + "]"

    for ii in range(0, len(variablenamesGeodesics)):
        file.write(variablenamesGeodesics[ii] + "= [ ")
        for jj in range(0, len(startGeodesicsAngle)):
            file.write(str(geodesicValues[ii][jj]) + ', ')
        file.write("];\n")

    file.write("startSector =" + str(startGeodesicsSector)+";")

    file.close()





if (__name__=="__main__" or __name__=="builtins"):
    main()
    print("done")
