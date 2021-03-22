/*
------Parameter-------
radius: 100
nRowsInModel: 7
nColumnsInModel: 4
sectorDistance_x: 500
sectorDistance_y: 10
startZoom =0.6
startViewportTransform_4 =-200
startViewportTransform_5 =600
fontSize: 15
startGeodesicsSectors: [0, 21, 2, 2]
startGeodesicsAngle: [180, 180, 135, 135]
startGeodesicsOffset_x: [0.502, 0.502, 0.502, 0.502]
startGeodesicsOffset_y: [10, 10, 40, 70]
startGeodesicsOperational: ['false', 'false', 'true', 'true']
----------------------
*/

startZoom =0.6
startViewportTransform_4 =-200
startViewportTransform_5 =600

line_colors = ['grey', 'grey', 'blue', 'black', 'orange', 'fuchsia', 'deepskyblue', 'gold', 'silver', 'lightskyblue', 'lightsteelblue', 'greenyellow', 'tomato', 'darkorchid', 'mistyrose', 'salmon'];
sec_name= [ 'A7', 'A6', 'A5', 'A4', 'A3', 'A2', 'A1', 'B7', 'B6', 'B5', 'B4', 'B3', 'B2', 'B1', 'C7', 'C6', 'C5', 'C4', 'C3', 'C2', 'C1', 'D7', 'D6', 'D5', 'D4', 'D3', 'D2', 'D1', ];
sec_ID= [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, ];
sec_fill= [ 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', ];
sec_type= [ [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], ];
sec_fontSize= [ 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, ];
sec_width= [ 57.14285714285714, 114.28571428571428, 171.42857142857142, 228.57142857142856, 285.7142857142857, 342.85714285714283, 400.0, 57.14285714285714, 114.28571428571428, 171.42857142857142, 228.57142857142856, 285.7142857142857, 342.85714285714283, 400.0, 57.14285714285714, 114.28571428571428, 171.42857142857142, 228.57142857142856, 285.7142857142857, 342.85714285714283, 400.0, 57.14285714285714, 114.28571428571428, 171.42857142857142, 228.57142857142856, 285.7142857142857, 342.85714285714283, 400.0, ];
sec_height= [ 197.9486637221574, 197.9486637221574, 197.9486637221574, 197.9486637221574, 197.9486637221574, 197.94866372215742, 197.9486637221574, 197.9486637221574, 197.9486637221574, 197.9486637221574, 197.9486637221574, 197.9486637221574, 197.94866372215742, 197.9486637221574, 197.9486637221574, 197.9486637221574, 197.9486637221574, 197.9486637221574, 197.9486637221574, 197.94866372215742, 197.9486637221574, 197.9486637221574, 197.9486637221574, 197.9486637221574, 197.9486637221574, 197.9486637221574, 197.94866372215742, 197.9486637221574, ];
sec_timeEdgeLeft= [ 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, ];
sec_timeEdgeRight= [ 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, ];
spaceEdgeBottom= [ 0.0, 57.14285714285714, 114.28571428571428, 171.42857142857142, 228.57142857142856, 285.7142857142857, 342.85714285714283, 0.0, 57.14285714285714, 114.28571428571428, 171.42857142857142, 228.57142857142856, 285.7142857142857, 342.85714285714283, 0.0, 57.14285714285714, 114.28571428571428, 171.42857142857142, 228.57142857142856, 285.7142857142857, 342.85714285714283, 0.0, 57.14285714285714, 114.28571428571428, 171.42857142857142, 228.57142857142856, 285.7142857142857, 342.85714285714283, ];
spaceEdgeTop= [ 57.14285714285714, 114.28571428571428, 171.42857142857142, 228.57142857142856, 285.7142857142857, 342.85714285714283, 400.0, 57.14285714285714, 114.28571428571428, 171.42857142857142, 228.57142857142856, 285.7142857142857, 342.85714285714283, 400.0, 57.14285714285714, 114.28571428571428, 171.42857142857142, 228.57142857142856, 285.7142857142857, 342.85714285714283, 400.0, 57.14285714285714, 114.28571428571428, 171.42857142857142, 228.57142857142856, 285.7142857142857, 342.85714285714283, 400.0, ];
sec_coords= [ [-28.57142857142857, -197.9486637221574, 28.57142857142857, -197.9486637221574, 0.0, 0, 0, 0], [-28.57142857142857, -197.9486637221574, 85.71428571428571, -197.9486637221574, 57.14285714285714, 0, 0, 0], [-28.57142857142857, -197.9486637221574, 142.85714285714283, -197.9486637221574, 114.28571428571428, 0, 0, 0], [-28.57142857142857, -197.9486637221574, 200.0, -197.9486637221574, 171.42857142857142, 0, 0, 0], [-28.571428571428584, -197.9486637221574, 257.1428571428571, -197.9486637221574, 228.57142857142856, 0, 0, 0], [-28.571428571428555, -197.94866372215742, 314.2857142857143, -197.94866372215742, 285.7142857142857, 0, 0, 0], [-28.571428571428584, -197.9486637221574, 371.42857142857144, -197.9486637221574, 342.85714285714283, 0, 0, 0], [-28.57142857142857, -197.9486637221574, 28.57142857142857, -197.9486637221574, 0.0, 0, 0, 0], [-28.57142857142857, -197.9486637221574, 85.71428571428571, -197.9486637221574, 57.14285714285714, 0, 0, 0], [-28.57142857142857, -197.9486637221574, 142.85714285714283, -197.9486637221574, 114.28571428571428, 0, 0, 0], [-28.57142857142857, -197.9486637221574, 200.0, -197.9486637221574, 171.42857142857142, 0, 0, 0], [-28.571428571428584, -197.9486637221574, 257.1428571428571, -197.9486637221574, 228.57142857142856, 0, 0, 0], [-28.571428571428555, -197.94866372215742, 314.2857142857143, -197.94866372215742, 285.7142857142857, 0, 0, 0], [-28.571428571428584, -197.9486637221574, 371.42857142857144, -197.9486637221574, 342.85714285714283, 0, 0, 0], [-28.57142857142857, -197.9486637221574, 28.57142857142857, -197.9486637221574, 0.0, 0, 0, 0], [-28.57142857142857, -197.9486637221574, 85.71428571428571, -197.9486637221574, 57.14285714285714, 0, 0, 0], [-28.57142857142857, -197.9486637221574, 142.85714285714283, -197.9486637221574, 114.28571428571428, 0, 0, 0], [-28.57142857142857, -197.9486637221574, 200.0, -197.9486637221574, 171.42857142857142, 0, 0, 0], [-28.571428571428584, -197.9486637221574, 257.1428571428571, -197.9486637221574, 228.57142857142856, 0, 0, 0], [-28.571428571428555, -197.94866372215742, 314.2857142857143, -197.94866372215742, 285.7142857142857, 0, 0, 0], [-28.571428571428584, -197.9486637221574, 371.42857142857144, -197.9486637221574, 342.85714285714283, 0, 0, 0], [-28.57142857142857, -197.9486637221574, 28.57142857142857, -197.9486637221574, 0.0, 0, 0, 0], [-28.57142857142857, -197.9486637221574, 85.71428571428571, -197.9486637221574, 57.14285714285714, 0, 0, 0], [-28.57142857142857, -197.9486637221574, 142.85714285714283, -197.9486637221574, 114.28571428571428, 0, 0, 0], [-28.57142857142857, -197.9486637221574, 200.0, -197.9486637221574, 171.42857142857142, 0, 0, 0], [-28.571428571428584, -197.9486637221574, 257.1428571428571, -197.9486637221574, 228.57142857142856, 0, 0, 0], [-28.571428571428555, -197.94866372215742, 314.2857142857143, -197.94866372215742, 285.7142857142857, 0, 0, 0], [-28.571428571428584, -197.9486637221574, 371.42857142857144, -197.9486637221574, 342.85714285714283, 0, 0, 0], ];
sec_neighbour_top= [ 1, 2, 3, 4, 5, 6, -1, 8, 9, 10, 11, 12, 13, -1, 15, 16, 17, 18, 19, 20, -1, 22, 23, 24, 25, 26, 27, -1, ];
sec_neighbour_right= [ 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, -1, -1, -1, -1, -1, -1, -1, ];
sec_neighbour_bottom= [ -1, 0, 1, 2, 3, 4, 5, -1, 7, 8, 9, 10, 11, 12, -1, 14, 15, 16, 17, 18, 19, -1, 21, 22, 23, 24, 25, 26, ];
sec_neighbour_left= [ -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ];
sec_posx= [ 150, 121.42857142857143, 92.85714285714286, 64.28571428571429, 35.71428571428572, 7.142857142857139, -21.428571428571416, 650, 621.4285714285714, 592.8571428571429, 564.2857142857143, 535.7142857142858, 507.1428571428571, 478.57142857142856, 1150, 1121.4285714285716, 1092.857142857143, 1064.2857142857142, 1035.7142857142858, 1007.1428571428571, 978.5714285714286, 1650, 1621.4285714285716, 1592.857142857143, 1564.2857142857142, 1535.7142857142858, 1507.142857142857, 1478.5714285714284, ];
sec_posy= [ 150, -60, -270, -480, -690, -900, -1110, 150.0, -60.0, -270.0, -480.0, -690.0, -900.0, -1110.0, 150.0, -60.0, -270.0, -480.0, -690.0, -900.0, -1110.0, 150.0, -60.0, -270.0, -480.0, -690.0, -900.0, -1110.0, ];
sec_angle= [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ];
startSectors= [ 0, 21, 2, 2, ];
x_Start= [ 178.68571428571428, 1678.6857142857143, 178.9142857142857, 178.9142857142857, ];
y_Start= [ 140.0, 140.0, -310.0, -340.0, ];
x_End= [ 178.68571428571428, 1678.6857142857143, 207.1985569617476, 207.1985569617476, ];
y_End= [ 100.0, 100.0, -338.2842712474619, -368.2842712474619, ];
startStrokeWidth= [ 2, 2, 2, 2, ];
startFill= [ line_colors[0], line_colors[1], line_colors[2], line_colors[3], ];
startStroke= [ line_colors[0], line_colors[1], line_colors[2], line_colors[3], ];
startParentSector= [ [0,0], [21,0], [2,0], [2,1], ];
startLineID= [ [0,1], [1,1], [2,1], [3,1], ];
startGeodesicOperational= [ false, false, true, true, ];
