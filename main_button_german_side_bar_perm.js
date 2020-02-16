let canvas_side_bar_perm = new fabric.Canvas('canvas_side_bar_perm',{preserveObjectStacking: true,  });

canvas_side_bar_perm.selection = false;

let win_width = window.innerWidth;
let win_height = window.innerHeight *0.08;
let screenFactor = win_width/1920;
let buttonfactor = 0.6;
//let buttonwidth = buttonfactor * win_width;
//let buttonheight = win_height * 0.5;
let buttondist = 25;
let textSize = win_width * 0.01 * screenFactor;
let dist_to_top = 25;

function changeGeodesicWidth(targetWidth){
    chosenGeodesicGlobalID = -1;
    for (let ii = 0; ii < geodesics.length; ii++) {

        for (let jj = 0; jj < geodesics[ii].length; jj++) {
            geodesics[ii][jj].strokeWidth = 2;
        }
    }
}



canvas_side_bar_perm.on('mouse:down', function(opt) {

    if (dist_to_top + 10 * (136 * buttonfactor * screenFactor + buttondist) < window.innerHeight) {
        return
    }

    let onSector = true;
    if(opt.target == null){ onSector=false}

    var evt = opt.e;
    let e =opt.e;
    let XCoord;
    let YCoord;
    let touch = e.touches;
    if ( onSector === false) {

        if (typeof touch !== 'undefined' ) {
            XCoord = touch[0].clientX;
            YCoord = touch[0].clientY;
        }else {
            XCoord = e.clientX;
            YCoord = e.clientY;
        }

        this.isDragging = true;
        //this.selection = false;
        this.lastPosX = XCoord;
        this.lastPosY = YCoord;
        console.log(this.viewportTransform[5])
    }
});

canvas_side_bar_perm.on('mouse:move', function(opt) {
    if (shiftPressed === true) return;
    if (this.isDragging) {
        if (this.viewportTransform[5] < -300){
            this.viewportTransform[5] = -300
        }
        if (this.viewportTransform[5] > 0){
            this.viewportTransform[5] = 0
        }else{
        var e = opt.e;
        let XCoord;
        let YCoord;
        let touch = e.touches;


        if (typeof touch !== 'undefined' ) {
            XCoord = touch[0].clientX;
            YCoord = touch[0].clientY;
        }else {
            XCoord = e.clientX;
            YCoord = e.clientY;
        }


        //this.viewportTransform[4] += XCoord - this.lastPosX;
        this.viewportTransform[5] += YCoord - this.lastPosY;

        this.requestRenderAll();
        this.lastPosX = XCoord;
        this.lastPosY = YCoord;

        }
    }

});

canvas_side_bar_perm.on('mouse:up', function(opt) {

    if (shiftPressed === true) return;
    this.isDragging = false;
    //this.selection = false;
    canvas_side_bar_perm.forEachObject(function(o) {
        o.setCoords();
    });
    canvas_side_bar_perm.renderAll();
});



fabric.Image.fromURL('back.png', function(img) {
    let back = img.set({
        left: 50,
        top: dist_to_top + 0 * 136 * buttonfactor * screenFactor ,
        opacity: 1,
        originX: "center",
        originY: "top",
        //perPixelTargetFind: true,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: true,
        selectable: false,
        scaleX: buttonfactor * screenFactor,
        scaleY: buttonfactor * screenFactor,
        hoverCursor: "pointer"});

    back.on('mousedown', function (o) {
        window.location = 'german.html';
    });
    canvas_side_bar_perm.add(back);
});

let fullscreen;
fabric.Image.fromURL('fullscreen.png', function(img) {
    fullscreen = img.set({
        left: 50,
        top: dist_to_top + 1 * (136 * buttonfactor * screenFactor + buttondist),
        opacity: 1,
        originX: "center",
        originY: "top",
        perPixelTargetFind: true,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: true,
        selectable: false,
        scaleX: buttonfactor * screenFactor,
        scaleY: buttonfactor * screenFactor,
        hoverCursor: "pointer"});

    fullscreen.on('mousedown', function (o) {
        let elem = document.getElementById("canvas-overAll");

        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            fullscreen.opacity = 0;
            exitFullscreen.opacity = 1;

        } else {
            if (document.fullscreenElement) {
                document.exitFullscreen();
                exitFullscreen.opacity = 0;
                fullscreen.opacity = 1;

            }
        }
    });

    canvas_side_bar_perm.add(fullscreen);
});

let exitFullscreen;
fabric.Image.fromURL('exit_fullscreen.png', function(img) {
    exitFullscreen = img.set({
        left: 50,
        top: dist_to_top + 1 * (136 * buttonfactor * screenFactor + buttondist),
        opacity: 0,
        originX: "center",
        originY: "top",
        perPixelTargetFind: true,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: true,
        selectable: false,
        scaleX: buttonfactor * screenFactor,
        scaleY: buttonfactor * screenFactor,
        hoverCursor: "pointer"});

    exitFullscreen.on('mousedown', function (o) {
        let elem = document.getElementById("canvas-overAll");




        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            fullscreen.opacity = 0;
            exitFullscreen.opacity = 1;

        } else {
            if (document.fullscreenElement) {
                document.exitFullscreen();
                exitFullscreen.opacity = 0;
                fullscreen.opacity = 1;

            }
        }

    });

    canvas_side_bar_perm.add(exitFullscreen);
});


fabric.Image.fromURL('restart.png', function(img) {
    let reset = img.set({
        left: 50 ,
        top: dist_to_top + 2 * (136 * buttonfactor * screenFactor + buttondist),
        opacity: 1,
        originX: "center",
        originY: "top",
        //perPixelTargetFind: true,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: true,
        selectable: false,
        scaleX: buttonfactor * screenFactor,
        scaleY: buttonfactor * screenFactor,
        hoverCursor: "pointer"});

    reset.on('mousedown', function (o) {
        showGeodesicButtons(false);
        removeLines();
    });
    canvas_side_bar_perm.add(reset);
});

fabric.Image.fromURL('reset.png', function(img) {
    let reset = img.set({
        left: 50,
        top: dist_to_top + 3 * (136 * buttonfactor * screenFactor + buttondist),
        opacity: 1,
        originX: "center",
        originY: "top",
        //perPixelTargetFind: true,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: true,
        selectable: false,
        scaleX: buttonfactor * screenFactor,
        scaleY: buttonfactor * screenFactor,
        hoverCursor: "pointer"});

    reset.on('mousedown', function (o) {
        changeGeodesicWidth(2);
        showGeodesicButtons(false);
        resetSectors();
    });
    canvas_side_bar_perm.add(reset);
});

/*
fabric.Image.fromURL('grab.png', function(img) {
    let grab = img.set({
        left: 50,
        top: 3 * (136 * buttonfactor * screenFactor + buttondist),
        opacity: 1,
        originX: "center",
        originY: "top",
        //perPixelTargetFind: true,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: true,
        selectable: false,
        scaleX: buttonfactor * screenFactor,
        scaleY: buttonfactor * screenFactor,
        hoverCursor: "pointer"});

    grab.on('mousedown', function (o) {
        showGeodesicButtons(false);
        toolChange('grab');

        let side_bar_for_change = document.getElementById("container_side_bar_temp");
        side_bar_for_change.style.zIndex = 0;

    });

    canvas_side_bar_perm.add(grab);
});
*/

let undo;
fabric.Image.fromURL('undo.png', function(img) {
    undo = img.set({
        left: 50,
        top: dist_to_top + 4 * (136 * buttonfactor * screenFactor + buttondist),
        opacity: 1,
        originX: "center",
        originY: "top",
        //perPixelTargetFind: true,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: true,
        selectable: false,
        scaleX: buttonfactor * screenFactor,
        scaleY: buttonfactor * screenFactor,
        hoverCursor: "pointer"});

    undo.on('mousedown', function (o) {
        undoLastLine();
        changeGeodesicWidth(2);
        showGeodesicButtons(false);
        toolChange('grab');

        let side_bar_for_change = document.getElementById("container_side_bar_temp");
        side_bar_for_change.style.zIndex = 0;

    });

    canvas_side_bar_perm.add(undo);
});

let add
fabric.Image.fromURL('add.png', function(img) {
     add = img.set({
        left: 50,
        top:  dist_to_top + 5 * (136 * buttonfactor * screenFactor + buttondist),
        opacity: 1,
        originX: "center",
        originY: "top",
        //perPixelTargetFind: true,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: true,
        selectable: false,
        scaleX: buttonfactor * screenFactor,
        scaleY: buttonfactor * screenFactor,
        hoverCursor: "pointer"});

    add.on('mousedown', function (o) {
        changeGeodesicWidth(2);
        showGeodesicButtons(false);
        toolChange('paint');
    });
    canvas_side_bar_perm.add(add);
});



canvas_side_bar_perm.on('mouse:over', function(e) {
    if (e.target == null){
        return
    }
    e.target.set('fill', '#FFFC1C');
    canvas_side_bar_perm.renderAll();
});

canvas_side_bar_perm.on('mouse:out', function(e) {
    if (e.target == null){
        return
    }
    if (e.target.isPressed == false) e.target.set('fill', '#e5e5e0');
    canvas_side_bar_perm.renderAll();
});

function showGeodesicButtons(geodesicButtonsVisibleToSet) {
    if (geodesicButtonsVisibleToSet == true) {

        geodesicButtonsvisible = true;

        autocomplete.set('opacity', 1);
        direction.set('opacity', 1);
        set_sectors.set('opacity', 1);
        delete_whole.set('opacity', 1);


    }else {

        geodesicButtonsvisible = false;

        autocomplete.set('opacity', 0);
        direction.set('opacity', 0);
        set_sectors.set('opacity', 0);
        delete_whole.set('opacity', 0);

    }
    moveDirectionButtons(false);
    canvas_side_bar_perm.renderAll()

}

function moveDirectionButtons(visibleToSet){

    if (visibleToSet == true) {
        visible = true;
        set_sectors.set('top', dist_to_top + 9 * (136 * buttonfactor * screenFactor + buttondist));
        set_sectors.setCoords();

        delete_whole.set('top', dist_to_top + 10 * (136 * buttonfactor * screenFactor + buttondist));
        delete_whole.setCoords();

        change_direction_counterclock_high.set('opacity', 1);
        change_direction_clockwise_high.set('opacity', 1);
        change_direction_counterclock_low.set('opacity', 1);
        change_direction_clockwise_low.set('opacity', 1)

    } else {
        visible = false;
        set_sectors.set('top', dist_to_top + 8 * (136 * buttonfactor * screenFactor + buttondist));
        set_sectors.setCoords();
        delete_whole.set('top', dist_to_top + 9 * (136 * buttonfactor * screenFactor + buttondist));
        delete_whole.setCoords();

        change_direction_counterclock_high.set('opacity', 0);
        change_direction_clockwise_high.set('opacity', 0);
        change_direction_counterclock_low.set('opacity', 0);
        change_direction_clockwise_low.set('opacity', 0)
    }
}

let autocomplete;
fabric.Image.fromURL('autocomplete.png', function(img) {
    autocomplete = img.set({
        left: 50,
        top: dist_to_top + 6 * (136 * buttonfactor * screenFactor + buttondist),
        opacity: 0,
        originX: "center",
        originY: "top",
        perPixelTargetFind: true,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: true,
        selectable: false,
        scaleX: buttonfactor * screenFactor,
        scaleY: buttonfactor * screenFactor,
        hoverCursor: "pointer"});

    autocomplete.on('mousedown', function (o) {
        continueGeodesic(chosenGeodesicGlobalID);
        toolChange('grab');

        moveDirectionButtons(false);
    });
    canvas_side_bar_perm.add(autocomplete);
});


let direction;
let visible = false;

fabric.Image.fromURL('direction.png', function(img) {
    direction = img.set({
        left: 50,
        top: dist_to_top + 7 * (136 * buttonfactor * screenFactor + buttondist),
        opacity: 0,
        originX: "center",
        originY: "top",
        perPixelTargetFind: true,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: true,
        selectable: false,
        scaleX: buttonfactor * screenFactor,
        scaleY: buttonfactor * screenFactor,
        hoverCursor: "pointer"});

    direction.on('mousedown', function (o) {

        if (visible == true) {
            moveDirectionButtons(false)
        }else moveDirectionButtons(true)

    });
    canvas_side_bar_perm.add(direction);
});

let timeout;
let scalefactorclockbutton = 0.3;
let buttondist_local = 10 * screenFactor;

let change_direction_counterclock_high;
fabric.Image.fromURL('button_change_direction_counterclock_high.png', function(img) {
    change_direction_counterclock_high = img.set({
        left: 50 - 5 *screenFactor,
        top: dist_to_top + 8 * (136 * buttonfactor * screenFactor + buttondist),
        originX: "right",
        originY: "top",
        perPixelTargetFind: true,
        opacity: 0,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: true,
        selectable: false,
        scaleX: scalefactorclockbutton * screenFactor,
        scaleY: scalefactorclockbutton * screenFactor,
        hoverCursor: "pointer"});

    change_direction_counterclock_high.on('mousedown', function (event) {
        changeDirectionAndContinue('counterclockwise', Math.PI/180, chosenGeodesicGlobalID);
        timeout = setInterval(function (event){changeDirectionAndContinue('counterclockwise', Math.PI/180, chosenGeodesicGlobalID);}, 150);
        toolChange('grab');
        arrowheadline = -1;
        return false;
    });

    change_direction_counterclock_high.on('mouseout', function () {
        clearInterval(timeout);
        drawDragPoint(chosenGeodesicGlobalID);
        toolChange('grab');
    });

    change_direction_counterclock_high.on('mouseup', function () {
        clearInterval(timeout);
        drawDragPoint(chosenGeodesicGlobalID);
        toolChange('grab');
    });

    canvas_side_bar_perm.add(change_direction_counterclock_high);
});

let change_direction_clockwise_high;
fabric.Image.fromURL('button_change_direction_clockwise_high.png', function(img) {
    change_direction_clockwise_high = img.set({
        left: 50 + 5 *screenFactor,
        top: dist_to_top + 8 * (136 * buttonfactor * screenFactor + buttondist),
        originX: "left",
        originY: "top",
        perPixelTargetFind: true,
        opacity: 0,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: true,
        selectable: false,
        scaleX: scalefactorclockbutton * screenFactor,
        scaleY: scalefactorclockbutton * screenFactor,
        hoverCursor: "pointer"});

    change_direction_clockwise_high.on('mousedown', function (event) {
        changeDirectionAndContinue('clockwise', Math.PI/180, chosenGeodesicGlobalID);
        timeout = setInterval(function (event){changeDirectionAndContinue('clockwise', Math.PI/180, chosenGeodesicGlobalID);}, 150);
        toolChange('grab');
        arrowheadline = -1;
        return false;
    });

    change_direction_clockwise_high.on('mouseout', function () {
        clearInterval(timeout);
        drawDragPoint(chosenGeodesicGlobalID);
        toolChange('grab')
    });

    change_direction_clockwise_high.on('mouseup', function () {
        clearInterval(timeout);
        drawDragPoint(chosenGeodesicGlobalID)
        toolChange('grab');
    });

    canvas_side_bar_perm.add(change_direction_clockwise_high);
});
let change_direction_counterclock_low;
fabric.Image.fromURL('button_change_direction_counterclock_low.png', function(img) {
    change_direction_counterclock_low = img.set({
        left: 50 - 5 *screenFactor,
        top: dist_to_top + 8 * (136 * buttonfactor * screenFactor + buttondist) + 136 *scalefactorclockbutton * screenFactor + 10 *screenFactor,
        originX: "right",
        originY: "top",
        perPixelTargetFind: true,
        opacity: 0,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: true,
        selectable: false,
        scaleX: scalefactorclockbutton * screenFactor,
        scaleY: scalefactorclockbutton * screenFactor,
        hoverCursor: "pointer"});

    change_direction_counterclock_low.on('mousedown', function (event) {
        changeDirectionAndContinue('counterclockwise', Math.PI/180 * 0.1 , chosenGeodesicGlobalID);
        timeout = setInterval(function (event){changeDirectionAndContinue('counterclockwise', Math.PI/180 * 0.1, chosenGeodesicGlobalID);}, 150);
        toolChange('grab');
        arrowheadline = -1;
        return false;
    });

    change_direction_counterclock_low.on('mouseout', function () {
        clearInterval(timeout);
        drawDragPoint(chosenGeodesicGlobalID)
        toolChange('grab')
    });

    change_direction_counterclock_low.on('mouseup', function () {
        clearInterval(timeout);
        drawDragPoint(chosenGeodesicGlobalID)
        toolChange('grab');
    });

    canvas_side_bar_perm.add(change_direction_counterclock_low);
});

let change_direction_clockwise_low;
fabric.Image.fromURL('button_change_direction_clockwise_low.png', function(img) {
    change_direction_clockwise_low = img.set({
        left: 50 + 5 *screenFactor,
        top: dist_to_top + 8 * (136 * buttonfactor * screenFactor + buttondist) + 136 *scalefactorclockbutton * screenFactor + 10 *screenFactor,
        originX: "left",
        originY: "top",
        perPixelTargetFind: true,
        opacity: 0,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: true,
        selectable: false,
        scaleX: scalefactorclockbutton * screenFactor,
        scaleY: scalefactorclockbutton * screenFactor,
        hoverCursor: "pointer"});

    change_direction_clockwise_low.on('mousedown', function (event) {
        changeDirectionAndContinue('clockwise', Math.PI/180 * 0.1, chosenGeodesicGlobalID);
        timeout = setInterval(function (event){changeDirectionAndContinue('clockwise', Math.PI/180 * 0.1, chosenGeodesicGlobalID);}, 150);
        toolChange('grab');
        arrowheadline = -1;
        return false;
    });

    change_direction_clockwise_low.on('mouseout', function () {
        clearInterval(timeout);
        drawDragPoint(chosenGeodesicGlobalID)
        toolChange('grab')
    });

    change_direction_clockwise_low.on('mouseup', function () {
        clearInterval(timeout);
        drawDragPoint(chosenGeodesicGlobalID)
        toolChange('grab');
    });

    canvas_side_bar_perm.add(change_direction_clockwise_low);
});

let set_sectors;
fabric.Image.fromURL('set_sectors.png', function(img) {
    set_sectors = img.set({
        left: 50,
        top: dist_to_top + 8 * (136 * buttonfactor * screenFactor + buttondist),
        opacity: 0,
        originX: "center",
        originY: "top",
        perPixelTargetFind: true,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: true,
        selectable: false,
        scaleX: buttonfactor * screenFactor,
        scaleY: buttonfactor * screenFactor,
        hoverCursor: "pointer"});

    set_sectors.on('mousedown', function (o) {
        setSectors(chosenGeodesicGlobalID);
        toolChange('grab');
        arrowheadline = -1;
        moveDirectionButtons(false);
    });
    canvas_side_bar_perm.add(set_sectors);
});

let delete_whole;
fabric.Image.fromURL('delete.png', function(img) {
    delete_whole = img.set({
        left: 50,
        top: dist_to_top + 9 * (136 * buttonfactor * screenFactor + buttondist),
        opacity: 0,
        originX: "center",
        originY: "top",
        perPixelTargetFind: true,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: true,
        selectable: false,
        scaleX: buttonfactor * screenFactor,
        scaleY: buttonfactor * screenFactor,
        hoverCursor: "pointer"});

    delete_whole.on('mousedown', function (o) {
        deleteWholeGeodesic(chosenGeodesicGlobalID);
        toolChange('grab');
        arrowheadline = -1;
        moveDirectionButtons(false);
    });
    canvas_side_bar_perm.add(delete_whole);
});


console.log(dist_to_top + 9 * (136 * buttonfactor * screenFactor + buttondist))
console.log(window.innerHeight)
/*
fabric.Image.fromURL('delete_last.png', function(img) {
    let delete_last_part = img.set({
        left: 0.01 * win_width,
        top: 360* screenFactor,
        opacity: 1,
        originX: "left",
        originY: "top",
        //perPixelTargetFind: true,
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
*/