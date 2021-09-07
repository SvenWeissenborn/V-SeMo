startZoom =1.0
startViewportTransform_4 =0
startViewportTransform_5 =0

/*
------Parameter-------
radius: 500
nRowsInModel: 3
nColumnsInModel: 3
sectorDistance_x: 100
sectorDistance_y: 30
startZoom =1.0
startViewportTransform_4 =0
startViewportTransform_5 =0
fontSize: 15
startGeodesicsSectors: [2, 2]
startGeodesicsAngle: [39, 39]
startGeodesicsOffset_x: [0.145, 0.42]
startGeodesicsOffset_y: [0.56, 0.06]
startGeodesicsLength: [70, 70]
startGeodesicsOperational: ['true', 'true']
startMarksSectors: [6, 7]
startMarksRadius: [5, 5]
startMarksOffset_x: [0.81, 0.99]
startMarksOffset_y: [0.99, 0.84]
startTextsSectors: []
startTextContent: []
startTextsOffset_x: []
startTextsOffset_y: []
----------------------
*/

let line_colors = ['blue', 'black', 'grey', 'purple', 'orange', 'fuchsia', 'deepskyblue', 'gold', 'silver', 'lightskyblue', 'lightsteelblue', 'greenyellow', 'tomato', 'darkorchid', 'mistyrose', 'salmon'];
let mark_colors = ['grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey'];
let lineStrokeWidthWhenNotSelected = 2
let lineStrokeWidthWhenSelected =5
sec_name= [ 1, 2, 3, 4, 5, '6.', 7, 8, '9.', ];
sec_fill= [ 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', ];
sec_ID= [ 0, 1, 2, 3, 4, 5, 6, 7, 8, ];
sec_type= [ [], [], [], [], [], [], [], [], [], ];
sec_fontSize= [ 15, 15, 15, 15, 15, 15, 15, 15, 15, ];
sec_top= [ 199.00912960195936, 177.19796853025045, 177.19796853025045, 199.00912960195936, 177.19796853025045, 177.19796853025045, 199.00912960195936, 177.19796853025045, 177.19796853025045, ];
sec_bottom= [ 177.19796853025045, 177.19796853025045, 199.00912960195936, 177.19796853025045, 177.19796853025045, 199.00912960195936, 177.19796853025045, 177.19796853025045, 199.00912960195936, ];
sec_height= [ 174.19187780102394, 174.53292519943295, 174.19187780102394, 174.19187780102394, 174.53292519943295, 174.19187780102394, 174.19187780102394, 174.53292519943295, 174.19187780102394, ];
sec_width= [ 199.00912960195936, 177.19796853025045, 177.19796853025045, 199.00912960195936, 177.19796853025045, 177.19796853025045, 199.00912960195936, 177.19796853025045, 177.19796853025045, ];
sec_offset= [ 10.905580535854455, 0.0, -10.905580535854455, 10.905580535854455, 0.0, -10.905580535854455, 10.905580535854455, 0.0, -10.905580535854455, ];
sec_coords= [ [0, 0, 199.00912960195936, 0, 188.1035490661049, 174.19187780102394, 10.905580535854455, 174.19187780102394], [0, 0, 177.19796853025045, 0, 177.19796853025045, 174.53292519943295, 0, 174.53292519943295], [10.905580535854455, 0, 188.1035490661049, 0, 199.00912960195936, 174.19187780102394, 0, 174.19187780102394], [0, 0, 199.00912960195936, 0, 188.1035490661049, 174.19187780102394, 10.905580535854455, 174.19187780102394], [0, 0, 177.19796853025045, 0, 177.19796853025045, 174.53292519943295, 0, 174.53292519943295], [10.905580535854455, 0, 188.1035490661049, 0, 199.00912960195936, 174.19187780102394, 0, 174.19187780102394], [0, 0, 199.00912960195936, 0, 188.1035490661049, 174.19187780102394, 10.905580535854455, 174.19187780102394], [0, 0, 177.19796853025045, 0, 177.19796853025045, 174.53292519943295, 0, 174.53292519943295], [10.905580535854455, 0, 188.1035490661049, 0, 199.00912960195936, 174.19187780102394, 0, 174.19187780102394], ];
sec_neighbour_top= [ -1, 0, 1, -1, 3, 4, -1, 6, 7, ];
sec_neighbour_right= [ 3, 4, 5, 6, 7, 8, -1, -1, -1, ];
sec_neighbour_bottom= [ 1, 2, -1, 4, 5, -1, 7, 8, -1, ];
sec_neighbour_left= [ -1, -1, -1, 0, 1, 2, 3, 4, 5, ];
sec_posx= [ -229.00912960195936, -229.00912960195936, -229.00912960195936, 0.0, 0.0, 0.0, 229.00912960195936, 229.00912960195936, 229.00912960195936, ];
sec_posy= [ -204.53292519943295, 0.0, 204.53292519943295, -204.53292519943295, 0.0, 204.53292519943295, -204.53292519943295, 0.0, 204.53292519943295, ];
sec_angle= [ 0, 0, 0, 0, 0, 0, 0, 0, 0, ];
startSectors= [ 2, 2, ];
x_Start= [ -291.91440843019825, -243.18496708437937, ];
y_Start= [ 194.08141253137148, 281.1773514318835, ];
x_End= [ -237.51419112821029, -188.7847497823914, ];
y_End= [ 150.02898515788286, 237.12492405839487, ];
startStrokeWidth= [ 2, 2, ];
startFill= [ line_colors[0], line_colors[1], ];
startStroke= [ line_colors[0], line_colors[1], ];
startParentSector= [ [2,0], [2,1], ];
startLineID= [ [0,1], [1,1], ];
markStart_x= [ 290.7019597785668, 315.8361341817821, ];
markStart_y= [ -289.88694532193466, -59.34119456780721, ];
markStartStrokeWidth= [ 2, 2, ];
markStartRadius= [ 5, 5, ];
markStartFill= [ mark_colors[0], mark_colors[1], ];
markStartStroke= [ mark_colors[0], mark_colors[1], ];
markStartParentSector= [ [6,0], [7,0], ];
markStartID= [ [0,1], [1,1], ];
textStart_x= [ ];
textStart_y= [ ];
textStartContent= [ ];
textStartFontSize= [ ];
textStartParentSector= [ ];
textStartID= [ ];
textStartAngle= [ ];
