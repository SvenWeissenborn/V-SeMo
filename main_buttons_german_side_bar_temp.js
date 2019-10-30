let canvas_side_bar_temp = new fabric.Canvas('canvas_side_bar_temp',{preserveObjectStacking: true, });

canvas_side_bar_temp.selection = false;



/*

let button_1 = new fabric.Rect({
    left: 40 * screenFactor,
    top: 140 * screenFactor,
    fill: '#ffef17',
    width: 45 * screenFactor,
    height: 30 * screenFactor,
    rx: 4 * screenFactor,
    ry: 4 * screenFactor,
    perPixelTargetFind: true,
    objectCaching: false,
    hasBorders: false,
    hasControls: false,
    evented: false,
    selectable: false,
    hoverCursor: "pointer",
    originX: 'center',
    originY: 'center',
});
button_1.isPressed = true;

let text_1 = new fabric.Text("1°", {
    fontSize: textSize,
    fontFamily: 'Helvetica',
    fill: '#000000',
    left: 40 * screenFactor,
    top: 140 * screenFactor,
    perPixelTargetFind: false,
    objectCaching: false,
    hasBorders: false,
    hasControls: false,
    evented: false,
    selectable: false,
    originX: 'center',
    originY: 'center',
});


canvas_side_bar_temp.add(button_1, text_1);
//canvas_buttons.renderAll();




button_1.on('mousedown', function(e) {

    button_1.set('evented', false);
    button_2.set('evented', true);

    button_1.set('fill', '#ffef17');
    button_2.set('fill', '#e5e5e0');

    text_1.set('fill', '#000000');
    text_2.set('fill', '#7f8082');

    button_1.isPressed = true;
    button_2.isPressed = false;

    rotationAngle = Math.PI/180;
});

let button_2 = new fabric.Rect({
    left: 90 * screenFactor,
    top: 140 * screenFactor,
    fill: '#e5e5e0',
    width: 45 * screenFactor,
    height: 30 * screenFactor,
    rx: 4 * screenFactor,
    ry: 4 * screenFactor,
    perPixelTargetFind: true,
    objectCaching: false,
    hasBorders: false,
    hasControls: false,
    evented: true,
    selectable: false,
    hoverCursor: "pointer",
    originX: 'center',
    originY: 'center',
});
button_2.isPressed = false;


let text_2 = new fabric.Text("0.1°", {
    fontSize: textSize,
    fontFamily: 'Helvetica',
    left: 90 * screenFactor,
    fill: '#7f8082',
    top: 140 * screenFactor,
    perPixelTargetFind: false,
    objectCaching: false,
    hasBorders: false,
    hasControls: false,
    evented: false,
    selectable: false,
    originX: 'center',
    originY: 'center',
    });


canvas_side_bar_temp.add(button_2, text_2);
//canvas_buttons.renderAll();




button_2.on('mousedown', function(e) {

    button_1.set('evented', true);
    button_2.set('evented', false);

    button_1.set('fill', '#e5e5e0');
    button_2.set('fill', '#ffef17');

    text_1.set('fill', '#7f8082');
    text_2.set('fill', '#000000');

    button_1.isPressed = false;
    button_2.isPressed = true;

    rotationAngle = (Math.PI/180)/10;

});



fabric.Image.fromURL('button_change_direction_clockwise.png', function(img) {
    let change_direction_clockwise = img.set({
        left: 0.01 * win_width,
        top: 165* screenFactor,
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

    change_direction_clockwise.on('mousedown', function (event) {
        changeDirectionAndContinue('clockwise', chosenGeodesicGlobalID);
        timeout = setInterval(function (event){changeDirectionAndContinue('clockwise', chosenGeodesicGlobalID);}, 150);
        toolChange('grab');
        return false;
    });

    change_direction_clockwise.on('mouseout', function () {
        clearInterval(timeout);
        toolChange('grab')
    });

    change_direction_clockwise.on('mouseup', function () {
        clearInterval(timeout);
        toolChange('grab');
    });

    canvas_side_bar_temp.add(change_direction_clockwise);
});

*/


