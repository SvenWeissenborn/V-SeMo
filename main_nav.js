let canvas_nav = new fabric.Canvas('canvas_nav',{preserveObjectStacking: true, backgroundColor: "black"});
let win_width = window.innerWidth;
let win_height = window.innerHeight;
let screenFactor;

if (window.innerWidth < 1800 || window.innerHeight < 800){
    screenFactor = Math.min(window.innerHeight/1000, window.innerWidth/1800)
} else {
    screenFactor = Math.min(window.innerHeight/800, window.innerWidth/1800)
}

canvas_nav.rotationCursor = 'col-resize';

canvas_nav.selection = false;


canvas_nav.on('mouse:over', function(e) {
    e.target.set('opacity', 0.5);
    canvas_nav.renderAll();
});

canvas_nav.on('mouse:out', function(e) {
    e.target.set('opacity', 1);
    canvas_nav.renderAll();
});

let text_sim_1 = new fabric.Text("Simulation 1", {
    fontSize: 40 * screenFactor,
    stroke: "white",
    fill: "white",
    left: win_width/6,
    top: win_height/2 - 300 * screenFactor,
    originX: "center",
    originY: "center",
    perPixelTargetFind: true,
    objectCaching: false,
    hasBorders: false,
    hasControls: false,
    evented: false,
    selectable: false,
});
canvas_nav.add(text_sim_1);

fabric.Image.fromURL('kugel_screen.png', function(img) {
    let img1 = img.set({
        left: win_width/6,
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
        scaleX: screenFactor,
        scaleY: screenFactor,
        hoverCursor: "pointer"});


        img1.on('mousedown', function (o) {
            window.location = 'kugel.html';
        });

    canvas_nav.add(img1);
});

let text_sim_2 = new fabric.Text("Simulation 2", {
    fontSize: 40 * screenFactor,
    stroke: "white",
    fill: "white",
    left: 3 * win_width/6,
    top: win_height/2 - 300 * screenFactor,
    originX: "center",
    originY: "center",
    perPixelTargetFind: true,
    objectCaching: false,
    hasBorders: false,
    hasControls: false,
    evented: false,
    selectable: false,
});
canvas_nav.add(text_sim_2);

fabric.Image.fromURL('schwarzschild_screen_parallel.png', function(img) {
    let img2 = img.set({
        left: 3 * win_width/6,
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
        scaleX: screenFactor,
        scaleY: screenFactor,
        hoverCursor: "pointer"});


    img2.on('mousedown', function (o) {
        window.location = 'schwarzschild_parallel.html';
    });
    canvas_nav.add(img2);
});

let text_sim_3 = new fabric.Text("Simulation 3", {
    fontSize: 40 * screenFactor,
    stroke: "white",
    fill: "white",
    left: 5 * win_width/6,
    top: win_height/2 - 300 * screenFactor,
    originX: "center",
    originY: "center",
    perPixelTargetFind: true,
    objectCaching: false,
    hasBorders: false,
    hasControls: false,
    evented: false,
    selectable: false,
});
canvas_nav.add(text_sim_3);

fabric.Image.fromURL('schwarzschild_screen_parallel.png', function(img) {
    let img3 = img.set({
        left: 5* win_width/6,
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
        scaleX: screenFactor,
        scaleY: screenFactor,
        hoverCursor: "pointer"});



    img3.on('mousedown', function (o) {
        window.location = 'schwarzschild_parallel.html';
    });
    canvas_nav.add(img3);
});

let text_sim_4 = new fabric.Text("Simulation 4", {
    fontSize: 40 * screenFactor,
    stroke: "white",
    fill: "white",
    left: 5 * win_width/6,
    top: win_height/2 - 300 * screenFactor,
    originX: "center",
    originY: "center",
    perPixelTargetFind: true,
    objectCaching: false,
    hasBorders: false,
    hasControls: false,
    evented: false,
    selectable: false,
});
canvas_nav.add(text_sim_4);

fabric.Image.fromURL('schwarzschild_screen_zwei_signale.png', function(img) {
    let img4 = img.set({
        left: 5* win_width/6,
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
        scaleX: screenFactor,
        scaleY: screenFactor,
        hoverCursor: "pointer"});



    img4.on('mousedown', function (o) {
        window.location = 'schwarzschild_zwei_signale.html';
    });
    canvas_nav.add(img3);
});