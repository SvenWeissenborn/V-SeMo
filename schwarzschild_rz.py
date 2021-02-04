import io
import math


nRowsInModel = 8
nColumnsInModel = 2

radius = 120
delta_r = 1.25
delta_t = 1.25
sectorDistance_x = 20
sectorDistance_y = 30

fontSize = 15

start_x = 150
start_y = 150

#Kameraeinstellungen
startZoom = 0.8
startViewportTransform_4 = -200
startViewportTransform_5 = -350

#startGeodesicsAngle: 180 Grad fuer Geodaeten, die senkrecht nach oben verlaufen
#startGeodesicsAngle: 135 Grad fuer Geodaeten im 45 Grad Winkel (Licht)
#startGeodesicsOffset_x: Versatz entlang der Raumachse (wenn startGeodesicsOffset_y = 0)
#startGeodesicsOffset_y: Versatz entlang der Zeitachse (wenn startGeodesicsOffset_x = 0)

startGeodesicsSectors = [7, 7]

startGeodesicsAngle = [135, 135]

startGeodesicsOffset_x = [0, 0]

startGeodesicsOffset_y = [10, 40]

startGeodesicsOperational = ['true', 'true']

def main():

    file = io.open("schwarzschild_rz_redshift.js",'w')

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
                "startGeodesicsAngle: " + str(startGeodesicsAngle) + "\n"    
                "startGeodesicsOffset_x: " + str(startGeodesicsOffset_x) + "\n"
                "startGeodesicsOffset_y: " + str(startGeodesicsOffset_y) + "\n"  
                "startGeodesicsOperational: " + str(startGeodesicsOperational) + "\n" 
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
        "line_colors = ['blue', 'black', 'grey', 'purple', 'orange', 'fuchsia', 'deepskyblue', 'gold', 'silver', 'lightskyblue', 'lightsteelblue', 'greenyellow', 'tomato', 'darkorchid', 'mistyrose', 'salmon'];")
    file.write("\n")

    variablenamesSectors = ["sec_name", "sec_ID",  "sec_fill", "sec_type", "sec_fontSize", "sec_width", "sec_height", "sec_timeEdgeLeft", "sec_timeEdgeRight", "spaceEdge", "sec_coords", "sec_neighbour_top", "sec_neighbour_right", "sec_neighbour_bottom", "sec_neighbour_left", "sec_posx", "sec_posy", "sec_angle"]
    sectorDict = dict(zip(variablenamesSectors,range(len(variablenamesSectors))))
    anzahlDerSektoren = nRowsInModel * nColumnsInModel



    #sectorValues = np.zeros((len(variablenamesSectors),anzahlDerSektoren))
    sectorValues = [[[] for ii in range(anzahlDerSektoren)] for jj in range(len(variablenamesSectors))]



    for id in range(0, anzahlDerSektoren):
        sectorValues[sectorDict["sec_ID"]][id] = id
        sectorValues[sectorDict["sec_fontSize"]][id] = fontSize
    for zeile in range(0, nRowsInModel):

        for ii in range(0, nColumnsInModel):
            print("zeile", zeile)
            print("Sektor", zeile + ii * nRowsInModel)

            #Für die x-Position des Sektors wird die Sektorhöhe des alten Sektors verwendet.
            #Für die y-Position des Sektors wird die Hälfte der Differenz der zeitartigen Sektorkanten benötigt.
            # -> Diese Berechnung folgt weiter unten
            sectorValues[sectorDict["sec_name"]][zeile + ii * nRowsInModel] = "'%c%d'" % (chr(ii + 97).upper(),(nRowsInModel-zeile))
            if (ii == 0):
                sectorValues[sectorDict["sec_posx"]][zeile + ii * nRowsInModel] = start_x
            else:
                sectorValues[sectorDict["sec_posx"]][zeile + ii * nRowsInModel] = sectorValues[sectorDict["sec_posx"]][zeile + (ii - 1) * nRowsInModel] + sectorwidth + sectorDistance_x

            sectorValues[sectorDict["sec_angle"]][zeile + ii * nRowsInModel] = 0

            timeEdgeLeft = math.sqrt(1 - (1 / ((ii + 1) * delta_r))) * delta_t * radius

            timeEdgeRight = math.sqrt(1 - (1 / ((ii + 2) * delta_r))) * delta_t * radius

            spaceEdge =  math.sqrt(1 / ( 1 - (1 / (((( ii + 1 ) + ( ii + 2 )) / 2) * delta_r)))) * delta_r * radius

            sectorValues[sectorDict["sec_fill"]][zeile + ii * nRowsInModel] = "'white'"

            offset_y = (timeEdgeRight - timeEdgeLeft) / 2

            sectorwidth = math.sqrt( math.pow(spaceEdge, 2) + math.pow(offset_y, 2))

            sectorValues[sectorDict["sec_width"]][zeile + ii * nRowsInModel] = sectorwidth
            sectorValues[sectorDict["sec_height"]][zeile + ii * nRowsInModel] = max(timeEdgeLeft, timeEdgeRight)
            sectorValues[sectorDict["sec_timeEdgeLeft"]][zeile + ii * nRowsInModel] = timeEdgeLeft
            sectorValues[sectorDict["sec_timeEdgeRight"]][zeile + ii * nRowsInModel] = timeEdgeRight
            sectorValues[sectorDict["spaceEdge"]][zeile + ii * nRowsInModel] = spaceEdge

            sectorValues[sectorDict["sec_coords"]][zeile + ii * nRowsInModel] = ([0,
                                                                               - timeEdgeLeft,
                                                                               sectorwidth,
                                                                               - timeEdgeLeft - offset_y,
                                                                               sectorwidth,
                                                                               offset_y,
                                                                               0,
                                                                               0])



            if (zeile == 0):
               sectorValues[sectorDict["sec_neighbour_top"]][zeile + ii * nRowsInModel] = - 1
            else:
               sectorValues[sectorDict["sec_neighbour_top"]][zeile + ii * nRowsInModel] = (zeile + ii * nRowsInModel)- 1

            if (ii == nColumnsInModel - 1):
               sectorValues[sectorDict["sec_neighbour_right"]][zeile + ii * nRowsInModel] = -1
            else:
               sectorValues[sectorDict["sec_neighbour_right"]][zeile + ii * nRowsInModel] = zeile + (ii + 1) * nRowsInModel

            if (zeile == nRowsInModel - 1):
               sectorValues[sectorDict["sec_neighbour_bottom"]][zeile + ii * nRowsInModel] = - 1
            else:
               sectorValues[sectorDict["sec_neighbour_bottom"]][zeile + ii * nRowsInModel] = (zeile + ii * nRowsInModel) + 1

            if (ii == 0):
               sectorValues[sectorDict["sec_neighbour_left"]][zeile + ii * nRowsInModel] = -1
            else:
               sectorValues[sectorDict["sec_neighbour_left"]][zeile + ii * nRowsInModel] = zeile + (ii - 1) * nRowsInModel
            print("nachbar_links", sectorValues[sectorDict["sec_neighbour_left"]][zeile + ii * nRowsInModel])

            if (zeile == 0):
                if (ii == 0):
                    sectorValues[sectorDict["sec_posy"]][zeile + ii * nRowsInModel] = start_y
                else:
                    sectorValues[sectorDict["sec_posy"]][zeile + ii * nRowsInModel] = sectorValues[sectorDict["sec_posy"]][zeile + (ii - 1) * nRowsInModel] + offset_y
            else:
                if (ii == 0):
                    sectorValues[sectorDict["sec_posy"]][zeile + ii * nRowsInModel] = start_y + zeile * (timeEdgeRight + sectorDistance_y)
                else:
                    sectorValues[sectorDict["sec_posy"]][zeile + ii * nRowsInModel] = sectorValues[sectorDict["sec_posy"]][zeile + (ii - 1) * nRowsInModel] + offset_y


    for ii in range(0,len(variablenamesSectors)):
        file.write(variablenamesSectors[ii]+"= [ ")
        for jj in range(0,anzahlDerSektoren):
            file.write(str( sectorValues[ii][jj])+', ')
        file.write("];\n")

    lengthStartGeodesics = 40

    variablenamesGeodesics = ["startSectors", "x_Start", "y_Start", "x_End", "y_End", "startStrokeWidth", "startFill", "startStroke","startParentSector", "startLineID", "startGeodesicOperational"]
    geodesicDict = dict(zip(variablenamesGeodesics, range(len(variablenamesGeodesics))))

    geodesicValues = [[[] for ii in range(len(startGeodesicsSectors))] for jj in range(len(variablenamesGeodesics))]

    for startGeodesic in range(0, len(startGeodesicsSectors)):
        print(startGeodesic)
        geodesicValues[geodesicDict["startSectors"]][startGeodesic] = startGeodesicsSectors[startGeodesic]

        offset_y = (sectorValues[sectorDict["sec_timeEdgeLeft"]][startGeodesicsSectors[startGeodesic]] - sectorValues[sectorDict["sec_timeEdgeRight"]][startGeodesicsSectors[startGeodesic]]) / 2

        geodesicValues[geodesicDict["x_Start"]][startGeodesic] = sectorValues[sectorDict["sec_posx"]][startGeodesicsSectors[startGeodesic]] + startGeodesicsOffset_x[startGeodesic] * sectorValues[sectorDict["sec_width"]][startGeodesicsSectors[startGeodesic]]

        if (offset_y < 0.0):
            geodesicValues[geodesicDict["y_Start"]][startGeodesic] = sectorValues[sectorDict["sec_posy"]][startGeodesicsSectors[startGeodesic]] + offset_y - startGeodesicsOffset_y[startGeodesic] - offset_y * startGeodesicsOffset_x[startGeodesic]
        else:
            geodesicValues[geodesicDict["y_Start"]][startGeodesic] = sectorValues[sectorDict["sec_posy"]][startGeodesicsSectors[startGeodesic]] - startGeodesicsOffset_y[startGeodesic] - offset_y * startGeodesicsOffset_x[startGeodesic]

        geodesicValues[geodesicDict["x_End"]][startGeodesic] = sectorValues[sectorDict["sec_posx"]][startGeodesicsSectors[startGeodesic]] + math.sin(startGeodesicsAngle[startGeodesic] * math.pi / 180) * lengthStartGeodesics + startGeodesicsOffset_x[startGeodesic] * sectorValues[sectorDict["sec_width"]][startGeodesicsSectors[startGeodesic]]
        if (offset_y < 0.0):
            geodesicValues[geodesicDict["y_End"]][startGeodesic] = sectorValues[sectorDict["sec_posy"]][startGeodesicsSectors[startGeodesic]] + math.cos(startGeodesicsAngle[startGeodesic] * math.pi / 180) * lengthStartGeodesics + offset_y - startGeodesicsOffset_y[startGeodesic] - offset_y * startGeodesicsOffset_x[startGeodesic]
        else:
            geodesicValues[geodesicDict["y_End"]][startGeodesic] = sectorValues[sectorDict["sec_posy"]][startGeodesicsSectors[startGeodesic]] + math.cos(startGeodesicsAngle[startGeodesic] * math.pi / 180) * lengthStartGeodesics - startGeodesicsOffset_y[startGeodesic] - offset_y * startGeodesicsOffset_x[startGeodesic]
        ParentID2 = 0
        if (startGeodesic == 0):
            geodesicValues[geodesicDict["startParentSector"]][startGeodesic] = "[" + str(startGeodesicsSectors[startGeodesic]) + "," + str(0) + "]"
        else:
            if (startGeodesicsSectors[startGeodesic] == startGeodesicsSectors[startGeodesic -1] ):
                ParentID2 = ParentID2 + 1
                geodesicValues[geodesicDict["startParentSector"]][startGeodesic] = "[" + str(startGeodesicsSectors[startGeodesic]) + "," + str(ParentID2) + "]"
            else:
                ParentID2 = 0
                geodesicValues[geodesicDict["startParentSector"]][startGeodesic] = "[" + str(startGeodesicsSectors[startGeodesic]) + "," + str(ParentID2) + "]"

        geodesicValues[geodesicDict["startLineID"]][startGeodesic] = "[" + str(startGeodesic) + "," + str(1) + "]"
        geodesicValues[geodesicDict["startStrokeWidth"]][startGeodesic] = 2

        geodesicValues[geodesicDict["startFill"]][startGeodesic] = "line_colors[" + str(startGeodesic) + "]"
        geodesicValues[geodesicDict["startStroke"]][startGeodesic] = "line_colors[" + str(startGeodesic) + "]"
        geodesicValues[geodesicDict["startGeodesicOperational"]][startGeodesic] = startGeodesicsOperational[startGeodesic]

    for ii in range(0, len(variablenamesGeodesics)):
        file.write(variablenamesGeodesics[ii] + "= [ ")
        for jj in range(0, len(startGeodesicsAngle)):
            file.write(str(geodesicValues[ii][jj]) + ', ')
        file.write("];\n")


    file.close()





if (__name__=="__main__" or __name__=="builtins"):
    main()
    print("done_2")