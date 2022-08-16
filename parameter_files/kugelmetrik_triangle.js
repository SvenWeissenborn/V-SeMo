/*
------Parameter-------
nSectorRowsFromSphere: 9
nSectorColumnsFromSphere: 18
radius: 500
nRowsInModel: 3
nColumnsInModel: 3
sectorDistance_x: 30
sectorDistance_y: 30
startZoom =1.0
startViewportTransform_4 =0
startViewportTransform_5 =0
fontSize: 15
startGeodesicsSectors: []
startGeodesicsAngle: []
startGeodesicsOffset_x: []
startGeodesicsOffset_y: []
startGeodesicsLength: []
startGeodesicsOperational: []
startMarksSectors: [2, 3, 8]
startMarksRadius: [5, 5, 5]
startMarksOffset_x: [0.5, 0.5, 0.5]
startMarksOffset_y: [0.5, 0.5, 0.5]
startTextsSectors: []
startTextContent: []
startTextsOffset_x: []
startTextsOffset_y: []
----------------------
*/

startZoom =1.0
startViewportTransform_4 =0
startViewportTransform_5 =0

let turnLorentzTransformOn =0

let line_colors = ['blue', 'black', 'grey', 'purple', 'orange', 'fuchsia', 'deepskyblue', 'gold', 'silver', 'lightskyblue', 'lightsteelblue', 'greenyellow', 'tomato', 'darkorchid', 'mistyrose', 'salmon'];
let mark_colors = ['grey', 'grey', 'grey', 'grey'];
let lineStrokeWidthWhenNotSelected = 2
let lineStrokeWidthWhenSelected =5
sec_name= [ 1, 2, 3, 4, 5, '6.', 7, 8, '9.', ];
sec_fill= [ 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', ];
sec_ID= [ 0, 1, 2, 3, 4, 5, 6, 7, 8, ];
sec_type= [ [], [], [], [], [], [], [], [], [], ];
sec_fontSize= [ 15, 15, 15, 15, 15, 15, 15, 15, 15, ];
sec_top= [ 151.14994701951812, 171.88137789230134, 171.88137789230134, 151.14994701951812, 171.88137789230134, 171.88137789230134, 151.14994701951812, 171.88137789230134, 171.88137789230134, ];
sec_bottom= [ 171.88137789230134, 171.88137789230134, 151.14994701951815, 171.88137789230134, 171.88137789230134, 151.14994701951815, 171.88137789230134, 171.88137789230134, 151.14994701951815, ];
sec_height= [ 174.22483727116122, 174.53292519943295, 174.22483727116122, 174.22483727116122, 174.53292519943295, 174.22483727116122, 174.22483727116122, 174.53292519943295, 174.22483727116122, ];
sec_width= [ 171.88137789230134, 171.88137789230134, 171.88137789230134, 171.88137789230134, 171.88137789230134, 171.88137789230134, 171.88137789230134, 171.88137789230134, 171.88137789230134, ];
sec_offset= [ -10.36571543639161, 0.0, 10.365715436391596, -10.36571543639161, 0.0, 10.365715436391596, -10.36571543639161, 0.0, 10.365715436391596, ];
sec_coords= [ [10.36571543639161, 0, 161.51566245590973, 0, 171.88137789230134, 174.22483727116122, 0, 174.22483727116122], [0, 0, 171.88137789230134, 0, 171.88137789230134, 174.53292519943295, 0, 174.53292519943295], [0, 0, 171.88137789230134, 0, 161.51566245590976, 174.22483727116122, 10.365715436391596, 174.22483727116122], [10.36571543639161, 0, 161.51566245590973, 0, 171.88137789230134, 174.22483727116122, 0, 174.22483727116122], [0, 0, 171.88137789230134, 0, 171.88137789230134, 174.53292519943295, 0, 174.53292519943295], [0, 0, 171.88137789230134, 0, 161.51566245590976, 174.22483727116122, 10.365715436391596, 174.22483727116122], [10.36571543639161, 0, 161.51566245590973, 0, 171.88137789230134, 174.22483727116122, 0, 174.22483727116122], [0, 0, 171.88137789230134, 0, 171.88137789230134, 174.53292519943295, 0, 174.53292519943295], [0, 0, 171.88137789230134, 0, 161.51566245590976, 174.22483727116122, 10.365715436391596, 174.22483727116122], ];
sec_neighbour_top= [ -1, 0, 1, -1, 3, 4, -1, 6, 7, ];
sec_neighbour_right= [ 3, 4, 5, 6, 7, 8, -1, -1, -1, ];
sec_neighbour_bottom= [ 1, 2, -1, 4, 5, -1, 7, 8, -1, ];
sec_neighbour_left= [ -1, -1, -1, 0, 1, 2, 3, 4, 5, ];
sec_posx= [ -201.88137789230134, -201.88137789230134, -201.88137789230134, 0.0, 0.0, 0.0, 201.88137789230134, 201.88137789230134, 201.88137789230134, ];
sec_posy= [ -202.1124186355806, 2.2664625997164762, 206.3372559067418, -202.1124186355806, 2.2664625997164762, 206.3372559067418, -202.1124186355806, 2.2664625997164762, 206.3372559067418, ];
sec_angle= [ 0, 0, 0, 0, 0, 0, 0, 0, 0, ];
startSectors= [ ];
x_Start= [ ];
y_Start= [ ];
x_End= [ ];
y_End= [ ];
startStrokeWidth= [ ];
startFill= [ ];
startStroke= [ ];
startParentSector= [ ];
startLineID= [ ];
markStart_x= [ -201.88137789230137, 0.0, 201.88137789230134, ];
markStart_y= [ 206.33725590674183, -202.1124186355806, 206.33725590674183, ];
markStartStrokeWidth= [ 2, 2, 2, ];
markStartRadius= [ 5, 5, 5, ];
markStartFill= [ mark_colors[0], mark_colors[1], mark_colors[2], ];
markStartStroke= [ mark_colors[0], mark_colors[1], mark_colors[2], ];
markStartParentSector= [ [2,0], [3,0], [8,0], ];
markStartID= [ [0,1], [1,1], [2,1], ];
textStart_x= [ ];
textStart_y= [ ];
textStartContent= [ ];
textStartFontSize= [ ];
textStartParentSector= [ ];
textStartID= [ ];
textStartAngle= [ ];
