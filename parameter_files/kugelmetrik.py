import io
import math
import geodesicsTextsMarks as gtm

# Einteilung der Kugeloberfläche
nSectorRowsFromSphere = 9
nSectorColumnsFromSphere = 18

#Eigenschaften des Ausgangsobjekts
radius = 500

#Eigenschaften des Sektormodells
nRowsInModel = 3
nColumnsInModel = 3

#Abstaende der Sektoren zueinander
sectorDistance_x = 30
sectorDistance_y = 30

#Kameraeinstellungen
startZoom = 1.0
startViewportTransform_4 = 0
startViewportTransform_5 = 0

#Schriftgroesse im Modell
fontSize = 15

lineStrokeWidthWhenNotSelected = 2
lineStrokeWidthWhenSelected = 5

#Parameter fuer die Startgeodaeten
startGeodesicsSectors = [2, 2]
#Winkel in Grad
startGeodesicsAngle = [40, 40]
#Startpunkt der Geodaete liegt in der unteren linken Ecke
#Versatz Anteilig der Sektorbreite
startGeodesicsOffset_x = [0.1, 0.35]
#Versatz Anteilig der Sektorhoehe
startGeodesicsOffset_y = [0.55, 0.05]
#Laenge der Geodaete in Pixel
startGeodesicsLength = [80, 80]
#operational bedeutet, dass sie wie eine echte Geodaete behandelt werden
startGeodesicsOperational = []

#Parameter fuer die Startmarkierungen
startMarksSectors = [2, 6]
startMarksRadius = [5, 5,]
startMarksOffset_x = [0.8, 0.2, ]
startMarksOffset_y = [0.2, 0.4, ]

#Parameter fuer die Starttexte
startTextsSectors = [2, 6]
startTextContent = ['P1', 'P2']
startTextsOffset_x = [0.85, 0.25]
startTextsOffset_y = [0.1, 0.5]





def main():


    dtheta = (math.pi/nSectorRowsFromSphere)
    dphi = (2*math.pi/nSectorColumnsFromSphere)

    maxSectorWidth = radius * dphi * math.sin(dtheta * math.floor(nSectorRowsFromSphere/2))

    if (nRowsInModel > nSectorRowsFromSphere):
        print("Achtung nRowsInModel ist größer als nSectorRowsFromSphere")
        return -1

    if (nColumnsInModel > nSectorColumnsFromSphere):
        print("Achtung nColumnsInModel ist größer als nSectorColumnsFromSphere")
        return -2

    if (nSectorRowsFromSphere % 2 != nRowsInModel % 2):
        print("Achtung nSectorRowsFromSphere und nRowsInModel müssen gerade oder ungerade sein")
        return -3


    zeilestart = math.floor((nSectorRowsFromSphere-nRowsInModel)/2)
    zeileende = nSectorRowsFromSphere-round((nSectorRowsFromSphere-nRowsInModel)/2)

    file = io.open("kugelmetrik.js",'w')

    file.write( "/*" +"\n"
                "------Parameter-------" + "\n"
                "nSectorRowsFromSphere: " + str(nSectorRowsFromSphere) + "\n"
                "nSectorColumnsFromSphere: " + str(nSectorColumnsFromSphere) + "\n"
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

    file.write(
        "let line_colors = ['blue', 'black', 'grey', 'purple', 'orange', 'fuchsia', 'deepskyblue', 'gold', 'silver', 'lightskyblue', 'lightsteelblue', 'greenyellow', 'tomato', 'darkorchid', 'mistyrose', 'salmon'];")
    file.write("\n")
    file.write(
        "let mark_colors = ['grey', 'grey', 'grey', 'grey'];")
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

    anzahlDerSektoren = nRowsInModel * nColumnsInModel

    #sectorValues = np.zeros((len(variablenamesSectors),anzahlDerSektoren))
    sectorValues = [[[] for ii in range(anzahlDerSektoren)] for jj in range(len(variablenamesSectors))]

    jj =0

    for id in range(0, anzahlDerSektoren):
        if (id == 5 or id == 8 ):
            sectorValues[sectorDict["sec_name"]][id] = "'" + str(id + 1)+"." "'"
        else:
            sectorValues[sectorDict["sec_name"]][id] = id + 1
        sectorValues[sectorDict["sec_ID"]][id] = id
        # Bei Bedarf muss die Fläche dazu genommen werden: Wichtig, "sec_fill" muss der Liste variablenamesSectors hinzugefügt werden!!!
        sectorValues[sectorDict["sec_fill"]][id] = "'white'"
        sectorValues[sectorDict["sec_fontSize"]][id] = fontSize

    for zeile in range(zeilestart, zeileende):
        for ii in range(0,nColumnsInModel):
            sectorValues[sectorDict["sec_top"]][jj + ii * (zeileende - zeilestart)] = radius*math.sin((zeile) * dtheta) * dphi

            sectorValues[sectorDict["sec_bottom"]][jj + ii * (zeileende - zeilestart)] = radius * math.sin((zeile +1) * dtheta) * dphi

            offset = (sectorValues[sectorDict["sec_top"]][jj + ii * (zeileende - zeilestart)] - sectorValues[sectorDict["sec_bottom"]][jj + ii * (zeileende - zeilestart)])/2

            sector_width = max(sectorValues[sectorDict["sec_top"]][jj + ii * (zeileende - zeilestart)],sectorValues[sectorDict["sec_bottom"]][jj + ii * (zeileende - zeilestart)])

            sector_height = math.sqrt(math.pow(radius, 2) * math.pow(dtheta, 2) - math.pow(offset, 2))

            sectorValues[sectorDict["sec_height"]][jj + ii * (zeileende - zeilestart)] = sector_height

            sectorValues[sectorDict["sec_width"]][jj + ii * (zeileende - zeilestart)] = sector_width

            sector_y_dist = sector_height + sectorDistance_y

            sectorValues[sectorDict["sec_offset"]][jj + ii * (zeileende - zeilestart)] = offset

            sectorValues[sectorDict["sec_coords"]][jj + ii * (zeileende - zeilestart)] = ([-min(0, offset),
                                                                                          0,
                                                                                          sectorValues[sectorDict["sec_top"]][jj + ii * (zeileende - zeilestart)] - min(0, offset),
                                                                                          0,
                                                                                          sectorValues[sectorDict["sec_bottom"]][jj + ii * (zeileende - zeilestart)] + max(0, offset),
                                                                                          sectorValues[sectorDict["sec_height"]][jj + ii * (zeileende - zeilestart)],
                                                                                          max(0, offset),
                                                                                          sectorValues[sectorDict["sec_height"]][jj + ii * (zeileende - zeilestart)]])

            sectorValues[sectorDict["sec_posx"]][jj + ii * (zeileende - zeilestart)] = (ii - nColumnsInModel * 0.5 + 0.5) * (sectorDistance_x + maxSectorWidth) + (maxSectorWidth - sector_width) / 2

            sectorValues[sectorDict["sec_posy"]][jj + ii * (zeileende - zeilestart)] = (zeile - (nRowsInModel + 0.5)) * sector_y_dist - 100

            sectorValues[sectorDict["sec_angle"]][jj + ii * (zeileende - zeilestart)] = 0

            if (zeile == round((nSectorRowsFromSphere-nRowsInModel) / 2)):
                sectorValues[sectorDict["sec_neighbour_top"]][jj + ii * (zeileende - zeilestart)] = -1
            else:
                sectorValues[sectorDict["sec_neighbour_top"]][jj + ii * (zeileende - zeilestart)] = zeile + nRowsInModel * ii - round((nSectorRowsFromSphere-nRowsInModel) / 2) - 1

            if (ii == (nColumnsInModel-1)):
                sectorValues[sectorDict["sec_neighbour_right"]][jj + ii * (zeileende - zeilestart)] = -1
            else:
                sectorValues[sectorDict["sec_neighbour_right"]][jj + ii * (zeileende - zeilestart)] = zeile + nRowsInModel * ii - round((nSectorRowsFromSphere-nRowsInModel) / 2) + nRowsInModel

            if (zeile == (nSectorRowsFromSphere-round((nSectorRowsFromSphere-nRowsInModel) / 2))-1):
                sectorValues[sectorDict["sec_neighbour_bottom"]][jj + ii * (zeileende - zeilestart)] = -1
            else:
                sectorValues[sectorDict["sec_neighbour_bottom"]][jj + ii * (zeileende - zeilestart)] = zeile + nRowsInModel * ii - round((nSectorRowsFromSphere-nRowsInModel) / 2) +1

            if (ii == 0):
                sectorValues[sectorDict["sec_neighbour_left"]][jj + ii * (zeileende - zeilestart)] = -1
            else:
                sectorValues[sectorDict["sec_neighbour_left"]][jj + ii * (zeileende - zeilestart)] = zeile + nRowsInModel * ii - round((nSectorRowsFromSphere-nRowsInModel) / 2) - nRowsInModel

        jj = jj + 1


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
    print("done_2")
