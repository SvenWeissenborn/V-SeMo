let canvas_side_bar_perm = new fabric.Canvas('canvas_side_bar_perm',{preserveObjectStacking: true, });

let canvas_side_bar_perm_right_bottom = new fabric.Canvas('canvas_side_bar_perm_right_bottom',{preserveObjectStacking: true, });

let canvas_side_bar_perm_right_top = new fabric.Canvas('canvas_side_bar_perm_right_top',{preserveObjectStacking: true, });


canvas_side_bar_perm.selection = false;
canvas_side_bar_perm_right_top.selection = false;
canvas_side_bar_perm_right_bottom.selection = false;

let win_width = window.innerWidth;
let win_height = window.innerHeight *0.08;
let screenFactor = win_width/1920;
let buttonfactor = 0.14;
let buttonwidth = buttonfactor * win_width;
let buttonheight = win_height * 0.5;
let buttondist = (win_width - 6* buttonwidth)/12;
let textSize = win_width * 0.01 * screenFactor;

fabric.Image.fromURL('visemo_logo.png', function(img) {
    let logo = img.set({
        left: 20 * screenFactor,
        top: 0.1 * win_height,
        opacity: 1,
        originX: "left",
        originY: "top",
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
        window.location = 'german.html';
    });
    canvas_side_bar_perm_right_top.add(logo);
});

fabric.Image.fromURL('home.png', function(img) {
    let home = img.set({
        left: 80 * screenFactor,
        top: 0.115 * win_height ,
        opacity: 1,
        originX: "left",
        originY: "top",
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
        window.location = 'german.html';
    });
    canvas_side_bar_perm_right_top.add(home);
});



fabric.Image.fromURL('button_grab.png', function(img) {
    let grab = img.set({
        left: 0.01 * win_width,
        top: 15* screenFactor,
        opacity: 1,
        originX: "left",
        originY: "top",
        perPixelTargetFind: true,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: true,
        selectable: false,
        scaleX: 0.4 * screenFactor,
        scaleY: 0.4 * screenFactor,
        hoverCursor: "pointer"});

    grab.on('mousedown', function (o) {
        toolChange('grab');

        let side_bar_for_change = document.getElementById("container_side_bar_temp");
        side_bar_for_change.style.zIndex = 0;

    });

    canvas_side_bar_perm.add(grab);
});

fabric.Image.fromURL('button_add_new_geodesic.png', function(img) {
    let add_newgeodesic = img.set({
        left: 0.01 * win_width,
        top: 130* screenFactor,
        opacity: 1,
        originX: "left",
        originY: "top",
        perPixelTargetFind: true,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: true,
        selectable: false,
        scaleX: 0.4 * screenFactor,
        scaleY: 0.4 * screenFactor,
        hoverCursor: "pointer"});

    add_newgeodesic.on('mousedown', function (o) {
        toolChange('paint');
    });
    canvas_side_bar_perm.add(add_newgeodesic);
});

fabric.Image.fromURL('button_reset_sectors.png', function(img) {
    let reset_sectors = img.set({
        left: 0.01 * win_width,
        top: 245* screenFactor,
        opacity: 1,
        originX: "left",
        originY: "top",
        perPixelTargetFind: true,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: true,
        selectable: false,
        scaleX: 0.4 * screenFactor,
        scaleY: 0.4 * screenFactor,
        hoverCursor: "pointer"});

    reset_sectors.on('mousedown', function (o) {
        resetSectors();
    });
    canvas_side_bar_perm.add(reset_sectors);
});

fabric.Image.fromURL('button_delete_last_part.png', function(img) {
    let delete_last_part = img.set({
        left: 0.01 * win_width,
        top: 360* screenFactor,
        opacity: 1,
        originX: "left",
        originY: "top",
        perPixelTargetFind: true,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: true,
        selectable: false,
        scaleX: 0.4 * screenFactor,
        scaleY: 0.4 * screenFactor,
        hoverCursor: "pointer"});

    delete_last_part.on('mousedown', function (o) {
        toolChange('delete');
    });
    canvas_side_bar_perm.add(delete_last_part);
});

fabric.Image.fromURL('button_reset_everything.png', function(img) {
    let reset_everything = img.set({
        left: 0 ,
        top: 0,
        opacity: 1,
        originX: "left",
        originY: "top",
        perPixelTargetFind: true,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: true,
        selectable: false,
        scaleX: 0.4 * screenFactor,
        scaleY: 0.4 * screenFactor,
        hoverCursor: "pointer"});

    reset_everything.on('mousedown', function (o) {
        changeZIndexOf_canvas_side_bar_temp(0);
        removeLines();
    });
    canvas_side_bar_perm_right_bottom.add(reset_everything);
});