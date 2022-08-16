import io
import math
import geodesicsTextsMarks as gtm

# modeltype:
# spatial: turnLorentzTransformOn = 0
# spacetime: turnLorentzTransformOn = 1
lorentzTransform = 0

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

lineStrokeWidthWhenNotSelected = 2
lineStrokeWidthWhenSelected = 5

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
startMarksSectors = [6, 7]
startMarksRadius = [5, 5]
startMarksOffset_x = [0.81, 0.99]
startMarksOffset_y = [0.99, 0.84]

#Parameter fuer die Starttexte
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



    dtheta = (math.pi/9)
    dphi = (math.pi/9)



    file = io.open("sattelflaeche.js",'w')

    file.write( "/*" +"\n"
                "------Parameter-------" + "\n"
                "turnLorentzTransformOn = " + str(lorentzTransform) + "\n"
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

    file.write("let turnLorentzTransformOn =" + str(lorentzTransform) + "\n")

    file.write("\n")

    file.write(
        "let line_colors = ['blue', 'black', 'grey', 'purple', 'orange', 'fuchsia', 'deepskyblue', 'gold', 'silver', 'lightskyblue', 'lightsteelblue', 'greenyellow', 'tomato', 'darkorchid', 'mistyrose', 'salmon'];")
    file.write("\n")
    file.write(
        "let mark_colors = ['grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey'];")
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
    maxsectorwidth = radius * math.cosh(math.pi/6) * math.pi/9
    maxsectorheight = radius * math.pi/9


    sectorValues = [[[] for ii in range(anzahlDerSektoren)] for jj in range(len(variablenamesSectors))]



    for id in range(0, anzahlDerSektoren):
        if (id == 5 or id == 8 ):
            sectorValues[sectorDict["sec_name"]][id] = "'" + str(id + 1)+"." "'"
        else:
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

    gtm.startprocess(file, sectorValues, startGeodesicsSectors, startGeodesicsAngle, startGeodesicsLength,
                 startGeodesicsOffset_x,startGeodesicsOffset_y,
                 startMarksSectors,startMarksOffset_x,startMarksOffset_y,startMarksRadius,
                 startTextsSectors,startTextsOffset_x,startTextsOffset_y, startTextContent)

    file.close()





if (__name__=="__main__" or __name__=="builtins"):
    main()
    print("done_2")
