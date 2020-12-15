/*
------Parameter-------
nSektorzeilenVonKugel: 9
nSektorspaltenVonKugel: 18
zeilenanzahl: 3
spaltenanzahl: 3
radius_sphere: 500
sectorabstand_x: 30
sectorabstand_y: 30
fontSize: 15
startGeodesicsSectors: [2, 2]
startMarksSectors: [2, 3, 8]
startMarkRadius: [5, 5, 5]
startTextsSectors: []
startTextContent: ['P1', 'P2']
text_dist_from_mid_y: [0.5, -0.9]
----------------------
*/

let line_colors = ['blue', 'black', 'grey', 'purple', 'orange', 'fuchsia', 'deepskyblue', 'gold', 'silver', 'lightskyblue', 'lightsteelblue', 'greenyellow', 'tomato', 'darkorchid', 'mistyrose', 'salmon'];
let mark_colors = ['grey', 'grey', 'grey'];
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
sec_neighbour_top= [ -1, 0, 1, -1, 3, 4, -1, 6, 7, ];
sec_neighbour_right= [ 3, 4, 5, 6, 7, 8, -1, -1, -1, ];
sec_neighbour_bottom= [ 1, 2, -1, 4, 5, -1, 7, 8, -1, ];
sec_neighbour_left= [ -1, -1, -1, 0, 1, 2, 3, 4, 5, ];
sec_posx= [ -201.88137789230134, -201.88137789230134, -201.88137789230134, 0.0, 0.0, 0.0, 201.88137789230134, 201.88137789230134, 201.88137789230134, ];
sec_posy= [ -202.1124186355806, 2.2664625997164762, 206.3372559067418, -202.1124186355806, 2.2664625997164762, 206.3372559067418, -202.1124186355806, 2.2664625997164762, 206.3372559067418, ];
sec_angle= [ 0, 0, 0, 0, 0, 0, 0, 0, 0, ];
startSectors= [ 2, 2, ];
x_Start= [ -271.8813778923013, -220.31696452461094, ];
y_Start= [ 196.3372559067418, 283.44967454232244, ];
x_End= [ -221.88137789230134, -170.31696452461094, ];
y_End= [ 156.3372559067418, 243.44967454232244, ];
startStrokeWidth= [ 2, 2, ];
startFill= [ line_colors[0], line_colors[1], ];
startStroke= [ line_colors[0], line_colors[1], ];
startParentSector= [ [2,0], [2,1], ];
startLineID= [ [0,1], [1,1], ];
markStart_x= [ -201.88137789230134, 0.0, 201.88137789230134, ];
markStart_y= [ 206.3372559067418, -202.1124186355806, 206.3372559067418, ];
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
