let canvas_nav_foot = new fabric.Canvas('canvas_nav_foot',{preserveObjectStacking: true, backgroundColor: 'black'});
//canvas_nav_foot.setBackgroundImage('canvas_2_background.jpg', canvas_nav_foot.renderAll.bind(canvas_nav_foot));


fabric.Image.fromURL('kugel_screen_small.png', function(img) {
    let img1 = img.set({
        left: 500,
        top: 50,
        opacity: 1,
        originX: "center",
        originY: "center",
        perPixelTargetFind: true,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: true,
        selectable: false,
        hoverCursor: "pointer"});
    img1.on('mousedown', function (o) {

        img1.on('mousedown', function (o) {
            window.location = 'kugel.html';
        })

    });
    canvas_nav_foot.add(img1);
});

fabric.Image.fromURL('schwarzschild_screen_small.png', function(img) {
    let img2 = img.set({
        left: 1000,
        top: 50,
        opacity: 1,
        originX: "center",
        originY: "center",
        perPixelTargetFind: true,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: true,
        selectable: false,
        hoverCursor: "pointer"});

    img2.on('mousedown', function (o) {
        window.location = 'schwarzschild.html';
    });
    canvas_nav_foot.add(img2);
});
