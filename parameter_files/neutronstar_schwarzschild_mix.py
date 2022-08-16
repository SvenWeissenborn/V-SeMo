import io
import math
import geodesicsTextsMarks as gtm

# modeltype:
# spatial: turnLorentzTransformOn = 0
# spacetime: turnLorentzTransformOn = 1
lorentzTransform = 0

nSektorzeilenVonRing = 11
nSektorspaltenVonRing = 12

schwarzschildradius = 120
dradius = (0.4) * schwarzschildradius

fontSizeStern = 8
fontSizeAussenraum = 15

lineStrokeWidthWhenNotSelected = 2
lineStrokeWidthWhenSelected = 5

#Kameraeinstellungen
startZoom = 1
startViewportTransform_4 = 0
startViewportTransform_5 = 0

# Parameter fuer die Startgeodaeten
startGeodesicsSectors = [47, 58, 69,]
# Winkel in Grad
startGeodesicsAngle = [90, 140.99, 160]
# Startpunkt der Geodaete liegt in der unteren linken Ecke
# Versatz Anteilig der Sektorbreite
startGeodesicsOffset_x = [0.5, 0.5, 0.3]
# Versatz Anteilig der Sektorhoehe
startGeodesicsOffset_y = [0.0001, 0.0001, 0.0001]
# Laenge der Geodaete in Pixel
startGeodesicsLength = [10, 10, 10]
# operational bedeutet, dass sie wie eine echte Geodaete behandelt werden
startGeodesicsOperational = ['true', 'true', 'true']

# Parameter fuer die Startmarkierungen
startMarksSectors = [43, 47, 58, 69, 80, 124]
startMarksRadius = [5, 5, 5, 5, 5, 5]
startMarksOffset_x = [0.5, 0.5, 0.5, 0.3, 0.75, 0.25]
startMarksOffset_y = [0.5, 0.0001, 0.0001, 0.0001, 0.0001, 0.0001]

# Parameter fuer die Starttexte
startTextsSectors = [43, 43, 47, 58, 69, 80, 124]
startTextContent = ['Karl &\\n  Lisa', 'Karl', 'Lisa', 'Lisa', 'Lisa', 'Lisa', 'Lisa']
startTextsOffset_x = [0.6, 0.58, 0.7, 0.7, 0.5, 0.7, 0.3]
startTextsOffset_y = [0.55, 0.55, 0.2, 0.2, 0.25, 0.25, 0.25]

def rotationAroundPoint(point_x_tmp, point_y_tmp, sector_angle, sector_center_x, sector_center_y):
    rotatedPoint_x = sector_center_x + (point_x_tmp - sector_center_x) * math.cos(sector_angle * math.pi / 180) - (point_y_tmp - sector_center_y) * math.sin(sector_angle * math.pi / 180)

    rotatedPoint_y = sector_center_y + (point_x_tmp - sector_center_x) * math.sin(sector_angle * math.pi / 180) + (point_y_tmp - sector_center_y) * math.cos(sector_angle * math.pi / 180)

    rotatedPoint = [rotatedPoint_x, rotatedPoint_y]

    return rotatedPoint


def main():

    dphi = (2*math.pi/nSektorspaltenVonRing)






    file = io.open("neutronstar_schwarzschild_mix_chapter_1.js",'w')

    file.write( "/*" +"\n"
            "------Parameter-------" +"\n"
            "turnLorentzTransformOn = " + str(lorentzTransform) + "\n"
            "nSektorzeilenVonRing: " + str(nSektorzeilenVonRing) +"\n"
            "nSektorspaltenVonRing: " + str(nSektorspaltenVonRing) +"\n"
            "schwarzschildradius: " + str(schwarzschildradius) +"\n"
            "dradius: " + str(dradius) + "\n"
            "startZoom =" + str(startZoom) + "\n"
            "startViewportTransform_4 =" + str(startViewportTransform_4) + "\n"
            "startViewportTransform_5 =" + str(startViewportTransform_5) + "\n"
            "fontSizeStern: " + str(fontSizeStern) + "\n"    
            "fontSizeStern: " + str(fontSizeAussenraum) + "\n" 
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
        "let line_colors = ['blue', 'blue', 'blue', 'black', 'purple', 'orange', 'fuchsia', 'deepskyblue', 'gold', 'silver', 'lightskyblue', 'lightsteelblue', 'greenyellow', 'tomato', 'darkorchid', 'mistyrose', 'salmon'];")
    file.write("\n")
    file.write(
        "let mark_colors = ['grey', 'green', 'green', 'green', 'green', 'green'];")
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

            rad1 = (ringzeile ) * dradius
            rad2 = (ringzeile + 1) * dradius
            radmid = (rad2 + rad1)/2
            if(ringzeile < 3):
                radial = math.sqrt(1 / (1 - 0.125 * math.pow((radmid / schwarzschildradius),2))) * dradius
                offset = dradius * math.sin(dphi * 0.5)
                sectorValues[sectorDict["sec_fill"]][ringzeile + ringspalte * nSektorzeilenVonRing] = "'#e2e2e2'"
                sectorValues[sectorDict["sec_fontSize"]][ringzeile + ringspalte * nSektorzeilenVonRing] = fontSizeStern
            else:
                radial = math.sqrt(math.pow((1 - (schwarzschildradius/radmid)), (-1))) * dradius
                offset = dradius * math.sin(dphi * 0.5)
                sectorValues[sectorDict["sec_fill"]][ringzeile + ringspalte * nSektorzeilenVonRing] = "'white'"
                sectorValues[sectorDict["sec_fontSize"]][ringzeile + ringspalte * nSektorzeilenVonRing] = fontSizeAussenraum


            # "Die integrale Form von Schwarzschild" radial = math.sqrt(rad2 * (rad2 - schwarzschildradius)) + schwarzschildradius * math.log(math.sqrt(rad2 - schwarzschildradius) + math.sqrt(rad2)) - (math.sqrt(rad1 * (rad1 - schwarzschildradius)) + schwarzschildradius * math.log(math.sqrt(rad1 - schwarzschildradius) + math.sqrt(rad1)))
            sector_height = math.sqrt(math.pow(radial, 2) - math.pow(offset, 2))


            if (ringzeile != 0):
                sector_y_dist = sector_height / 2 + sectorValues[sectorDict["sec_height"]][ringzeile-1] / 2 + sector_y_dist + 10
            else:
                sector_y_dist = 20 + sector_height/2

            sectorValues[sectorDict["sec_name"]][ringzeile + ringspalte * nSektorzeilenVonRing] = "'%c%d'" % (chr(ringzeile + 97).upper(),(ringspalte+1))
            sectorValues[sectorDict["sec_ID"]][ringzeile + ringspalte * nSektorzeilenVonRing] = ringzeile + ringspalte * (nSektorzeilenVonRing)
            sectorValues[sectorDict["sec_top"]][ringzeile + ringspalte * nSektorzeilenVonRing] = (dradius * (ringzeile + 1)) * 2 * math.sin(dphi * 0.5)
            sectorValues[sectorDict["sec_bottom"]][ringzeile + ringspalte * (nSektorzeilenVonRing)] = (dradius * (ringzeile )) * 2 * math.sin(dphi * 0.5)



            sector_width = sectorValues[sectorDict["sec_top"]][ringzeile + ringspalte * (nSektorzeilenVonRing)]


            sectorValues[sectorDict["sec_height"]][ringzeile + ringspalte * (nSektorzeilenVonRing)] = sector_height
            sectorValues[sectorDict["sec_width"]][ringzeile + ringspalte * (nSektorzeilenVonRing)] = sector_width
            sectorValues[sectorDict["sec_offset"]][ringzeile + ringspalte * (nSektorzeilenVonRing)] = offset
            sectorValues[sectorDict["sec_coords"]][ringzeile + ringspalte * nSektorzeilenVonRing] = ([-min(0, offset),
                                                                                          0,
                                                                                          sectorValues[sectorDict["sec_top"]][ringzeile + ringspalte * nSektorzeilenVonRing] - min(0, offset),
                                                                                          0,
                                                                                          sectorValues[sectorDict["sec_bottom"]][ringzeile + ringspalte * nSektorzeilenVonRing] + max(0, offset),
                                                                                          sectorValues[sectorDict["sec_height"]][ringzeile + ringspalte * nSektorzeilenVonRing],
                                                                                          max(0, offset),
                                                                                          sectorValues[sectorDict["sec_height"]][ringzeile + ringspalte * nSektorzeilenVonRing]])


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


    gtm.startprocess(file, sectorValues, startGeodesicsSectors, startGeodesicsAngle, startGeodesicsLength,
                 startGeodesicsOffset_x,startGeodesicsOffset_y,
                 startMarksSectors,startMarksOffset_x,startMarksOffset_y,startMarksRadius,
                 startTextsSectors,startTextsOffset_x,startTextsOffset_y, startTextContent)


    file.close()





if (__name__=="__main__" or __name__=="builtins"):
    main()
    print("done")
