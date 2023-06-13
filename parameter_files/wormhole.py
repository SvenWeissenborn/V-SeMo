import io
import math
import geodesicsTextsMarks as gtm

# modeltype:
# spatial: turnLorentzTransformOn = 0
# spacetime: turnLorentzTransformOn = 1
lorentzTransform = 0

# Einteilung der Kugeloberfläche
nSectorRowsFromWormHole = 3
nSectorColumnsFromWhormhole = 8

#Eigenschaften des Ausgangsobjekts
lmin = - 20/3
lmax = 20/3
schlundradius = 2
scaleFactor = 30

#Eigenschaften des Sektormodells
nRowsInModel = 3
nColumnsInModel = 8

#Abstaende der Sektoren zueinander
sectorDistance_x = 50
sectorDistance_y = 10

#Kameraeinstellungen
startZoom = 1
startViewportTransform_4 = 0
startViewportTransform_5 = 0

#Schriftgroesse im Modell
fontSize = 15

lineStrokeWidthWhenNotSelected = 4
lineStrokeWidthWhenSelected = 8

#Parameter fuer die Startgeodaeten
startGeodesicsSectors = []
#Winkel in Grad
startGeodesicsAngle = []
#Startpunkt der Geodaete liegt in der unteren linken Ecke
#Versatz Anteilig der Sektorbreite
startGeodesicsOffset_x = []
#Versatz Anteilig der Sektorhoehe
startGeodesicsOffset_y = []
#Laenge der Geodaete in Pixel
startGeodesicsLength = []
#operational bedeutet, dass sie wie eine echte Geodaete behandelt werden
startGeodesicsOperational = []

#Parameter fuer die Startmarkierungen
startMarksSectors = [int(phii*nRowsInModel*nColumnsInModel/4 + nRowsInModel-1-rii*(nRowsInModel-1)/2)
                     for phii in range(4) for rii in range(3)]
startMarksRadius = [5] * 12
startMarksOffset_x = [0.5] * 12
startMarksOffset_y = [0.9, 0.5, 0.1] * 4

#Parameter fuer die Starttexte
startTextsSectors = []
startTextContent = []
startTextsOffset_x = []
startTextsOffset_y = []





def main():


    dphi = (2*math.pi/nSectorColumnsFromWhormhole)

    if (nRowsInModel > nSectorRowsFromWormHole):
        print("Achtung nRowsInModel ist größer als nSectorRowsFromSphere")
        return -1

    if (nColumnsInModel > nSectorColumnsFromWhormhole):
        print("Achtung nColumnsInModel ist größer als nSectorColumnsFromSphere")
        return -2

    if (nSectorRowsFromWormHole % 2 != nRowsInModel % 2):
        print("Achtung nSectorRowsFromSphere und nRowsInModel müssen gerade oder ungerade sein")
        return -3


    zeilestart = math.floor((nSectorRowsFromWormHole-nRowsInModel)/2)
    zeileende = nSectorRowsFromWormHole-round((nSectorRowsFromWormHole-nRowsInModel)/2)

    print(zeilestart)
    maxSectorWidth = math.sqrt( ( math.pow(schlundradius, 2) + math.pow(lmin + zeilestart * 4/3 * schlundradius, 2) ) * math.pow(dphi, 2)) * scaleFactor
    print(maxSectorWidth)
    file = io.open("wormhole_circ_3_8.js",'w')

    file.write( "/*" +"\n"
                "------Parameter-------" + "\n"
                "turnLorentzTransformOn = " + str(lorentzTransform) + "\n"
                "nSectorRowsFromWormHole: " + str(nSectorRowsFromWormHole) + "\n"
                "nSectorColumnsFromWhormhole: " + str(nSectorColumnsFromWhormhole) + "\n"
                "schlundradius: " + str(schlundradius) + "\n"
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

    file.write("let turnLorentzTransformOn =" + str(lorentzTransform) + "\n")

    file.write("\n")

    file.write(
        "let line_colors = ['blue', 'black', 'grey', 'purple', 'orange', 'fuchsia', 'deepskyblue', 'gold', 'silver', 'lightskyblue', 'lightsteelblue', 'greenyellow', 'tomato', 'darkorchid', 'mistyrose', 'salmon'];")
    file.write("\n")
    file.write(
        "let mark_colors = ['yellow', 'red', 'blue', 'yellow', 'red', 'blue','yellow', 'red', 'blue','yellow', 'red', 'blue',];")
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

            deltaL = (lmax-lmin)/nRowsInModel
            actualL = lmin + zeile * deltaL
            nextL = lmin + (zeile + 1) * deltaL

            sectorValues[sectorDict["sec_bottom"]][jj + ii * (zeileende - zeilestart)] = math.sqrt( ( math.pow(schlundradius, 2) + math.pow(actualL, 2) ) * math.pow(dphi, 2)) * scaleFactor

            sectorValues[sectorDict["sec_top"]][jj + ii * (zeileende - zeilestart)] = math.sqrt( ( math.pow(schlundradius, 2) + math.pow(nextL, 2) ) * math.pow(dphi, 2)) * scaleFactor

            offset = (sectorValues[sectorDict["sec_top"]][jj + ii * (zeileende - zeilestart)] - sectorValues[sectorDict["sec_bottom"]][jj + ii * (zeileende - zeilestart)])/2

            sector_width = max(sectorValues[sectorDict["sec_top"]][jj + ii * (zeileende - zeilestart)],sectorValues[sectorDict["sec_bottom"]][jj + ii * (zeileende - zeilestart)])

            sector_height = math.sqrt(math.pow(2 * schlundradius  * scaleFactor, 2) - math.pow(offset, 2))

            sectorValues[sectorDict["sec_height"]][jj + ii * (zeileende - zeilestart)] = sector_height

            sectorValues[sectorDict["sec_width"]][jj + ii * (zeileende - zeilestart)] = sector_width

            if(zeile != 0):
                sector_y_dist = sector_height + sectorDistance_y + sector_y_dist_before
            else:
                sector_y_dist = 140 + sector_height + sectorDistance_y

            sectorValues[sectorDict["sec_offset"]][jj + ii * (zeileende - zeilestart)] = offset

            sectorValues[sectorDict["sec_coords"]][jj + ii * (zeileende - zeilestart)] = ([-min(0, offset),
                                                                                          0,
                                                                                          sectorValues[sectorDict["sec_top"]][jj + ii * (zeileende - zeilestart)] - min(0, offset),
                                                                                          0,
                                                                                          sectorValues[sectorDict["sec_bottom"]][jj + ii * (zeileende - zeilestart)] + max(0, offset),
                                                                                          sectorValues[sectorDict["sec_height"]][jj + ii * (zeileende - zeilestart)],
                                                                                          max(0, offset),
                                                                                          sectorValues[sectorDict["sec_height"]][jj + ii * (zeileende - zeilestart)]])

            print(jj)

            sectorValues[sectorDict["sec_posx"]][jj + ii * (zeileende - zeilestart)] = math.sin(ii * dphi) * ( sector_y_dist)

            sectorValues[sectorDict["sec_posy"]][jj + ii * (zeileende - zeilestart)] = - math.cos(ii * dphi) * ( sector_y_dist)

            sectorValues[sectorDict["sec_angle"]][jj + ii * (zeileende - zeilestart)] = ii * dphi *180/math.pi #+ 180

            if (zeile == round((nSectorRowsFromWormHole-nRowsInModel) / 2)):
                sectorValues[sectorDict["sec_neighbour_bottom"]][jj + ii * (zeileende - zeilestart)] = -1
            else:
                sectorValues[sectorDict["sec_neighbour_bottom"]][jj + ii * (zeileende - zeilestart)] = zeile + nRowsInModel * ii - round((nSectorRowsFromWormHole-nRowsInModel) / 2) - 1

            if (ii == (nColumnsInModel - 1)):
                if(nSectorColumnsFromWhormhole == nColumnsInModel):
                    sectorValues[sectorDict["sec_neighbour_right"]][jj + ii * (zeileende - zeilestart)] = - (zeilestart - zeile)
                else:
                    sectorValues[sectorDict["sec_neighbour_right"]][jj + ii * (zeileende - zeilestart)] = -1
            else:
                sectorValues[sectorDict["sec_neighbour_right"]][jj + ii * (zeileende - zeilestart)] = zeile + nRowsInModel * ii - round((nSectorRowsFromWormHole - nRowsInModel) / 2) + nRowsInModel

            if (zeile == (nSectorRowsFromWormHole-round((nSectorRowsFromWormHole-nRowsInModel) / 2))-1):
                sectorValues[sectorDict["sec_neighbour_top"]][jj + ii * (zeileende - zeilestart)] = -1
            else:
                sectorValues[sectorDict["sec_neighbour_top"]][jj + ii * (zeileende - zeilestart)] = zeile + nRowsInModel * ii - round((nSectorRowsFromWormHole - nRowsInModel) / 2) +1

            if (ii == 0):
                if (nSectorColumnsFromWhormhole == nColumnsInModel):
                    sectorValues[sectorDict["sec_neighbour_left"]][jj + ii * (zeileende - zeilestart)] = nRowsInModel * nSectorColumnsFromWhormhole - nRowsInModel -( zeilestart - zeile)
                else:
                    sectorValues[sectorDict["sec_neighbour_left"]][jj + ii * (zeileende - zeilestart)] = -1
            else:
                sectorValues[sectorDict["sec_neighbour_left"]][jj + ii * (zeileende - zeilestart)] = zeile + nRowsInModel * ii - round((nSectorRowsFromWormHole-nRowsInModel) / 2) - nRowsInModel

        jj = jj + 1
        sector_y_dist_before = sector_y_dist

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
