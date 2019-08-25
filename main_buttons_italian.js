let canvas_buttons = new fabric.Canvas('canvas_buttons',{preserveObjectStacking: true, backgroundColor: '#8ab8d9'} );
//canvas_buttons.setBackgroundImage('canvas_2_background.jpg', canvas_buttons.renderAll.bind(canvas_buttons));


let win_width = window.innerWidth;
let win_height = window.innerHeight *0.08;
let screenFactor = win_width/1920;
let buttonfactor = 0.14;
let buttonwidth = buttonfactor * win_width;
let buttonheight = win_height * 0.5;
let buttondist = (win_width - 6* buttonwidth)/12;
let textSize = win_width * 0.01;



canvas_buttons.on('mouse:over', function(e) {
    if (e.target == null){
        return
    }
    e.target.set('fill', '#1e90ff');
    canvas_buttons.renderAll();
});

canvas_buttons.on('mouse:out', function(e) {
    if (e.target == null){
        return
    }
    e.target.set('fill', '#e5e5e0');
    canvas_buttons.renderAll();
});




let button_1 = new fabric.Rect({
    left: 1 * buttondist,
    top: win_height /2,
    fill: '#e5e5e0',
    width: buttonwidth,
    height: buttonheight,
    rx: 10 * screenFactor,
    ry: 10 * screenFactor,
    perPixelTargetFind: true,
    objectCaching: false,
    hasBorders: false,
    hasControls: false,
    evented: true,
    selectable: false,
    hoverCursor: "pointer",
    originX: 'left',
    originY: 'center',
});

let text_1 = new fabric.Text("Cancella tutte le geodetiche", {
    fontSize: textSize,
    fontFamily: 'Helvetica',
    left: 1 * buttondist + buttonwidth/2 ,
    top: win_height /2,
    perPixelTargetFind: false,
    objectCaching: false,
    hasBorders: false,
    hasControls: false,
    evented: false,
    selectable: false,
    originX: 'center',
    originY: 'center',
});


canvas_buttons.add(button_1, text_1);
//canvas_buttons.renderAll();




button_1.on('mousedown', function(e) {
    // e.target should be the circle
    resetLines();
});

let button_2 = new fabric.Rect({
    left: 2 * buttondist + buttonwidth,
    top: win_height /2,
    fill: '#e5e5e0',
    width: buttonwidth,
    height: buttonheight,
    rx: 10 * screenFactor,
    ry: 10 * screenFactor,
    perPixelTargetFind: true,
    objectCaching: false,
    hasBorders: false,
    hasControls: false,
    evented: true,
    selectable: false,
    hoverCursor: "pointer",
    originX: 'left',
    originY: 'center',
});

let text_2 = new fabric.Text("Riposiziona settori", {
    fontSize: textSize,
    fontFamily: 'Helvetica',
    left: 2 * buttondist + buttonwidth/2 + buttonwidth,
    top: win_height /2,
    perPixelTargetFind: false,
    objectCaching: false,
    hasBorders: false,
    hasControls: false,
    evented: false,
    selectable: false,
    originX: 'center',
    originY: 'center',

});


canvas_buttons.add(button_2, text_2);
//canvas_buttons.renderAll();



button_2.on('mousedown', function(e) {
    // e.target should be the circle
    resetSectors();
});

let button_3 = new fabric.Rect({
    left: 3 * buttondist + 2 * buttonwidth,
    top: win_height /2,
    fill: '#e5e5e0',
    width: buttonwidth,
    height: buttonheight,
    rx: 10 * screenFactor,
    ry: 10 * screenFactor,
    perPixelTargetFind: true,
    objectCaching: false,
    hasBorders: false,
    hasControls: false,
    evented: true,
    selectable: false,
    hoverCursor: "pointer",
    originX: 'left',
    originY: 'center',
});

let text_3 = new fabric.Text("Trascina/Estendi [G]", {
    fontSize: textSize,
    fontFamily: 'Helvetica',
    left: 3 * buttondist + buttonwidth/2 + 2 * buttonwidth,
    top: win_height /2,
    perPixelTargetFind: false,
    objectCaching: false,
    hasBorders: false,
    hasControls: false,
    evented: false,
    selectable: false,
    originX: 'center',
    originY: 'center',
});


canvas_buttons.add(button_3, text_3);
//canvas_buttons.renderAll();



button_3.on('mousedown', function(e) {
    // e.target should be the circle
    toolChange('grab');
});

let button_4 = new fabric.Rect({
    left: 4 * buttondist + 3 * buttonwidth,
    top: win_height /2,
    fill: '#e5e5e0',
    width: buttonwidth,
    height: buttonheight,
    rx: 10 * screenFactor,
    ry: 10 * screenFactor,
    perPixelTargetFind: true,
    objectCaching: false,
    hasBorders: false,
    hasControls: false,
    evented: true,
    selectable: false,
    hoverCursor: "pointer",
    originX: 'left',
    originY: 'center',
});

let text_4 = new fabric.Text("Nuova geodetica [Z]", {
    fontSize: textSize,
    fontFamily: 'Helvetica',
    left: 4 * buttondist + buttonwidth/2 + 3 * buttonwidth,
    top: win_height /2,
    perPixelTargetFind: false,
    objectCaching: false,
    hasBorders: false,
    hasControls: false,
    evented: false,
    selectable: false,
    originX: 'center',
    originY: 'center',
});


canvas_buttons.add(button_4, text_4);
//canvas_buttons.renderAll();



button_4.on('mousedown', function(e) {
    // e.target should be the circle
    toolChange('paint');
});

let button_5 = new fabric.Rect({
    left: 5 * buttondist + 4 * buttonwidth,
    top: win_height /2,
    fill: '#e5e5e0',
    width: buttonwidth,
    height: buttonheight,
    rx: 10 * screenFactor,
    ry: 10 * screenFactor,
    perPixelTargetFind: true,
    objectCaching: false,
    hasBorders: false,
    hasControls: false,
    evented: true,
    selectable: false,
    hoverCursor: "pointer",
    originX: 'left',
    originY: 'center',
});

let text_5 = new fabric.Text("Geodetica: Annulla [R]", {
    fontSize: textSize,
    fontFamily: 'Helvetica',
    left: 5 * buttondist + buttonwidth/2 + 4 * buttonwidth,
    top: win_height /2,
    perPixelTargetFind: false,
    objectCaching: false,
    hasBorders: false,
    hasControls: false,
    evented: false,
    selectable: false,
    originX: 'center',
    originY: 'center',
});


canvas_buttons.add(button_5, text_5);
//canvas_buttons.renderAll();



button_5.on('mousedown', function(e) {
    // e.target should be the circle
    undoLastLine();
});

let button_6 = new fabric.Rect({
    left: 6 * buttondist + 5 * buttonwidth,
    top: win_height /2,
    fill: '#e5e5e0',
    width: buttonwidth,
    height: buttonheight,
    rx: 10 * screenFactor,
    ry: 10 * screenFactor,
    perPixelTargetFind: true,
    objectCaching: false,
    hasBorders: false,
    hasControls: false,
    evented: true,
    selectable: false,
    hoverCursor: "pointer",
    originX: 'left',
    originY: 'center',
});

let text_6 = new fabric.Text("Rimuovi elemento di geodetica", {
    fontSize: textSize,
    fontFamily: 'Helvetica',
    left: 6 * buttondist + buttonwidth/2 + 5 * buttonwidth,
    top: win_height /2,
    perPixelTargetFind: false,
    objectCaching: false,
    hasBorders: false,
    hasControls: false,
    evented: false,
    selectable: false,
    originX: 'center',
    originY: 'center',
});


canvas_buttons.add(button_6, text_6);
//canvas_buttons.renderAll();



button_6.on('mousedown', function(e) {
    // e.target should be the circle
    toolChange('delete');
});

fabric.Image.fromURL('visemo_logo.png', function(img) {
    let logo = img.set({
        left: innerWidth - 100 * screenFactor,
        top: win_height/2,
        opacity: 1,
        originX: "center",
        originY: "center",
        perPixelTargetFind: true,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: true,
        selectable: false,
        scaleX: 0.8 * screenFactor,
        scaleY: 0.8 * screenFactor,
        hoverCursor: "pointer"});

    logo.on('mousedown', function (o) {
        window.location = 'italian.html';
    });
    canvas_buttons.add(logo);
});

fabric.Image.fromURL('home.png', function(img) {
    let home = img.set({
        left: win_width - 30 * screenFactor,
        top: win_height/2 ,
        opacity: 1,
        originX: "right",
        originY: "center",
        perPixelTargetFind: true,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: true,
        selectable: false,
        scaleX: 0.7 * screenFactor,
        scaleY: 0.7 * screenFactor,
        hoverCursor: "pointer"});

    home.on('mousedown', function (o) {
        window.location = 'italian.html';
    });
    canvas_buttons.add(home);
});

