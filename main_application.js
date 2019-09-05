//ACHTUNG!!! SNAPPING UND SETSECTORS MÜSSEN ÜBERARBEITET WERDEN; SIE MÜSSEN DERZEIT JEWEILS ZWEIMAL AUSGEFÜHRT WERDEN UM DIE RICHTIGEN ERGEBNISSE ZU ERHALTEN



//preserveObjectStacking: Reihenfolge der Objekte in z-Richtung wird nicht verändert
let canvas = new fabric.Canvas('canvas',{preserveObjectStacking: true, backgroundColor: '#8ab8d9'});

//Hintergrundbild einfügen
//canvas.setBackgroundImage('background_image.png', canvas.renderAll.bind(canvas));

canvas.rotationCursor = 'col-resize';

//Ausschalten der Gruppenfunktion per "Lasso"
//updateMinions ist für Gruppen implementiert, es fehlt noch die snapping-Funktion für Gruppen
canvas.selection = false;

//updateMinions auf Gruppen erweitert (in dieser Version ausgeschaltet)
canvas.on('selection:created', function(obj){
    if(obj.target.type === 'polygon') return;
    obj.target.lockScalingX = true;
    obj.target.lockScalingY = true;
    obj.target.on('moving', function(){
        this._objects.forEach(function(elem){
            if(elem.type === 'polygon') updateMinions(elem)
        });
    });
    obj.target.on('rotating', function(){
        this._objects.forEach(function(elem){
            if(elem.type === 'polygon')updateMinions(elem)
        });
    });
    obj.target.on('modified', function(){
        this._objects.forEach(function(elem){
            if(elem.type === 'polygon')updateMinions(elem)
        });
    });
});


//Visuelles Signal bei Geodäten verlängern
let arrowheadline = -1;
let startAtMarkPoint = -1;
let arrowhead;

/* Prüfen:  - ob Geodätenende in der Nähe, falls ja -> visuelles Signal
            - der Richtung einer verlängerten Geodäte;
            - ob Linien auf dem Hintergrund statt einem Sektor verlaufen -> visuelles Signal (rote Linie)
  */
canvas.on('mouse:down',function(){
    if(typeof arrowhead != 'undefined') {
        canvas.remove(arrowhead);
    }
});

canvas.on('mouse:move', function (o)
{

    if(selectedTool !== 'paint' && selectedTool !== 'grab') return;

    let color;
    let pointer = canvas.getPointer(o.e);

    //Abstandsprüfung zum Geodätenende -> Pfeil mit Richtung setzen
    if (!isLineStarted) {
        for (let ii = 0; ii < geodesics.length; ii++) {
            if (geodesics[ii].length > 0) {
                let geodesic_end_point = new fabric.Point(geodesics[ii][geodesics[ii].length - 1].calcLinePoints().x2, geodesics[ii][geodesics[ii].length - 1].calcLinePoints().y2);
                geodesic_end_point = fabric.util.transformPoint(geodesic_end_point, geodesics[ii][geodesics[ii].length - 1].calcTransformMatrix());
                let geodesic_start_point = new fabric.Point(geodesics[ii][geodesics[ii].length - 1].calcLinePoints().x1, geodesics[ii][geodesics[ii].length - 1].calcLinePoints().y1);
                geodesic_start_point = fabric.util.transformPoint(geodesic_start_point, geodesics[ii][geodesics[ii].length - 1].calcTransformMatrix());
                let alpha = Math.atan2(geodesic_end_point.y - geodesic_start_point.y, geodesic_end_point.x - geodesic_start_point.x);
                if (distance(pointer, geodesic_end_point) <= snap_radius_line * 1/canvas.getZoom()) {
                    let idx = geodesics[ii][geodesics[ii].length - 1].parentSector;
                    //es kann nur auf nicht überlappenden Sektoren gezeichnet werden
                    if(sectors[idx[0]].trapez.opacity !== 1 ) return;
                    sectors[idx[0]].trapez.hoverCursor = 'crosshair';


                    color = line_colors[ii % line_colors.length];
                    if (arrowheadline < 0) {

                        arrowhead = new fabric.Triangle({
                            width: 10,
                            height: 20,
                            left: geodesic_end_point.x - 5,
                            top: geodesic_end_point.y - 10,
                            fill: color,
                            evented: false,

                        });
                        arrowhead.rotate(alpha * 180 / Math.PI + 90);
                        arrowheadline = ii;
                        //console.log(arrowheadline);
                        canvas.add(arrowhead);
                    }

                } else {
                    if (arrowheadline === ii) {
                        let idx = geodesics[ii][geodesics[ii].length - 1].parentSector;
                        sectors[idx[0]].trapez.hoverCursor = 'grabbing';
                        canvas.remove(arrowhead);
                        arrowheadline = -1;

                    }
                }
                //canvas.renderAll();
            }
        }



        for (let ii = 0; ii < markPoints.length; ii++) {
            let markPointCoords = new fabric.Point(markPoints[ii].left, markPoints[ii].top);
            if (distance(pointer, markPointCoords) <= snap_radius_markPoint * 1/canvas.getZoom()) {

                let idx = markPoints[ii].parentSector;

                if(sectors[idx].trapez.opacity !== 1 ) return;
                if (arrowheadline < 0 && startAtMarkPoint < 0) {
                    startAtMarkPoint = ii;
                    toolChange('paint')

                }

            }else {
                if (startAtMarkPoint === ii) {
                    let idx = markPoints[ii].parentSector;
                    sectors[idx].trapez.hoverCursor = 'grabbing';
                    startAtMarkPoint = -1;
                    toolChange('grab')
                }
            }
        }

        return;
    }

    if( lineContinueAt !== -1){
        color = geodesics[lineContinueAt][0].fill;
    }else{
        color = line_colors[geodesics.length%line_colors.length];
    }


    //Richtung der verlängerten Geodäte annehmen
    pointer = canvas.getPointer(o.e);
    if(lineContinueAt !== -1){
        let segment_end_point = new fabric.Point(geodesics[lineContinueAt][geodesics[lineContinueAt].length-1].calcLinePoints().x2,geodesics[lineContinueAt][geodesics[lineContinueAt].length-1].calcLinePoints().y2);
        segment_end_point = fabric.util.transformPoint(segment_end_point,geodesics[lineContinueAt][geodesics[lineContinueAt].length-1].calcTransformMatrix() );

        let segment_start_point = new fabric.Point(geodesics[lineContinueAt][geodesics[lineContinueAt].length-1].calcLinePoints().x1,geodesics[lineContinueAt][geodesics[lineContinueAt].length-1].calcLinePoints().y1);
        segment_start_point = fabric.util.transformPoint(segment_start_point,geodesics[lineContinueAt][geodesics[lineContinueAt].length-1].calcTransformMatrix() );

        if(Math.abs(segment_end_point.x-segment_start_point.x)>Math.abs(segment_end_point.y-segment_start_point.y)) {
            let alpha = Math.atan2(segment_end_point.y - segment_start_point.y, segment_end_point.x - segment_start_point.x);
            let beta = Math.atan2(pointer.y - line.y1, pointer.x - line.x1);

            if (Math.abs(alpha - beta) <= Math.PI / 36) {
                line.set({x2: pointer.x, y2: (pointer.x - line.x1) * Math.tan(alpha) + line.y1});
            } else {
                line.set({x2: pointer.x, y2: pointer.y});
            }
        }else{
            let alpha = Math.atan2(segment_end_point.x - segment_start_point.x, segment_end_point.y - segment_start_point.y);
            let beta = Math.atan2(pointer.x - line.x1, pointer.y - line.y1);
            if (Math.abs(alpha - beta) <= Math.PI / 36) {
                line.set({x2: (pointer.y - line.y1) * Math.tan(alpha) + line.x1,y2: pointer.y});
            } else {
                line.set({x2: pointer.x, y2: pointer.y});
            }
        }
    }else {
        if(selectedTool == 'paint' || startAtMarkPoint !== -1) {
            line.set({x2: pointer.x, y2: pointer.y});
        }
    }

    if(selectedTool == 'paint' || lineContinueAt !== -1) {
        //Prüfen ob die Linie über einen verbotenen Bereich verläuft
        let xg1 = line.x1;
        let xg2 = line.x2;
        let yg1 = line.y1;
        let yg2 = line.y2;


        canvas.renderAll();
        let lambdas = getSchnittpunktsparameter(sectors, [xg1, yg1, xg2, yg2]);

        if (lambdas.length === 1) {
            line.stroke = color;
            line.fill = color;
            return;
        }
        lambdas.push(1.0);

        let lineOverCanvas = testLocation(lambdas, [xg1, yg1, xg2, yg2]);


        if (lineOverCanvas.every(function (element) {
            return element
        })) {
            line.stroke = color;
            line.fill = color;
        } else {
            line.stroke = 'red';
            line.fill = 'red';
        }

        canvas.renderAll();
    }
});

//Zoomoptionen

canvas.on('mouse:wheel', function(opt) {
    var delta = -opt.e.deltaY;
    var pointer = canvas.getPointer(opt.e);
    var zoom = canvas.getZoom();
    zoom = zoom + (1/delta/5);
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
});


canvas.on('mouse:down', function(opt) {

    let onSector = true;
    if(opt.target == null){ onSector=false}

    var evt = opt.e;
    if (evt.shiftKey === true || onSector == false) {
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
    }
});

canvas.on('mouse:move', function(opt) {
    if (this.isDragging) {
        var e = opt.e;
        this.viewportTransform[4] += e.clientX - this.lastPosX;
        this.viewportTransform[5] += e.clientY - this.lastPosY;
        this.requestRenderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
    }
});
canvas.on('mouse:up', function(opt) {
    this.isDragging = false;
    this.selection = false;
    var zoom = canvas.getZoom();
    canvas.setZoom(zoom)
});


//Abbrechen einer Linie
window.addEventListener('keydown',function(event){
    if(event.key === 'Escape' || event.key === 'Backspace' ){
        if(typeof(line) !== 'undefined'){
            canvas.remove(line);
            isLineStarted = false;
            lineContinueAt = -1;
            canvas.renderAll();
            delete line;
        }
    }

});

//Werkzeugwechsel "Greifen"
window.addEventListener('keydown',function(event){
    if(event.key === 'z'){
            toolChange('paint');
    }
});


window.addEventListener('keydown',function(event){
    if(event.key === 'Delete'){
        toolChange('delete_whole');
    }
});

//Werkzeugwechsel "Greifen"
window.addEventListener('keydown',function(event){
    if(event.key === 'g'){
        toolChange('grab');
    }
});

//Werkzeugwechsel "Zeichnen"
window.addEventListener('keydown',function(event){
    if(event.key === 'd'){
        toolChange('mark');
    }
});

//UnDo
window.addEventListener('keydown',function(event){
    if(event.key === 'r'){
        undoLastLine();
        if(typeof arrowhead != 'undefined') {
            canvas.remove(arrowhead);
            arrowheadline = -1;
        }
    }
});

window.addEventListener('keydown',function(event){
    if(event.key === 'a'){
        continueAllGeodesics();
    }
});

window.addEventListener('keydown',function(event){
    if(event.key === 'c'){
        continueGeodesic();
    }
});

//Sektoren passend zusammensetzen
window.addEventListener('keydown',function(event){
    if(event.key === 's'){
        setSectors(); setSectors();
    }
});

//reset Zoom and Pan
window.addEventListener('keydown',function(event){
    if(event.key === 'l'){
        resetZoomPan();
    }

});



//Button-Funktionen
window.resetSectors = resetSectors;

window.undoLastLine = undoLastLine;


//Globale Variablen
let isLineStarted = false;
let lineContinueAt = -1;
let selectedTool = 'grab';

let scaleFacotor;

if (window.innerWidth < 1000 || window.innerHeight < 1000){
    scaleFacotor = Math.min(window.innerHeight/1000, window.innerWidth/1000)
} else {
    scaleFacotor = Math.min(window.innerHeight/1000, window.innerWidth/1000)
}

let epsilon = 0.0000001;
let snap_radius_sectors = 5 * scaleFacotor;
let snap_radius_line = 15 * scaleFacotor;
let snap_radius_markPoint = 30 * scaleFacotor;

let abortlength = 14 * scaleFacotor;

let cursor;


let paddingFactor = 0.01;


let multiply = fabric.util.multiplyTransformMatrices;
let invert = fabric.util.invertTransform;

let canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight,
};

let scaleRatio;

let sectors = [];

let markPoints = [];


let geodesics = [];



let history = [];


function continueAllGeodesics() {

    let lambda;
    let alpha = 0.0;
    let kantenIndex = -1;
    let geodesicsIndex = -1;

    let xt1;
    let xt2;
    let yt1;
    let yt2;

    let dxg;
    let dyg;
    let dxt12;
    let dyt12;

    let slopeGeodesic;
    let slopeTrapez;
    let slopeAngle;

    let nextGeodesic_x;
    let nextGeodesic_y;



    for (let ii = 0; ii < geodesics.length; ii++) {
        kantenindex = -1;


        if (geodesics[ii].length > 0) {



            let geodesic_end_point = new fabric.Point(geodesics[ii][geodesics[ii].length - 1].calcLinePoints().x2, geodesics[ii][geodesics[ii].length - 1].calcLinePoints().y2);
            geodesic_end_point = fabric.util.transformPoint(geodesic_end_point, geodesics[ii][geodesics[ii].length - 1].calcTransformMatrix());

            let xg2 = geodesic_end_point.x;
            let yg2 = geodesic_end_point.y;

            let geodesic_start_point = new fabric.Point(geodesics[ii][geodesics[ii].length - 1].calcLinePoints().x1, geodesics[ii][geodesics[ii].length - 1].calcLinePoints().y1);
            geodesic_start_point = fabric.util.transformPoint(geodesic_start_point, geodesics[ii][geodesics[ii].length - 1].calcTransformMatrix());

            let xg1 = geodesic_start_point.x;
            let yg1 = geodesic_start_point.y;

            //Umrechnung der lokalen in globale Koordinaten
            let transformMatrix = sectors[geodesics[ii][geodesics[ii].length - 1].parentSector[0]].trapez.calcTransformMatrix('True');
            let transformedPoints = [{x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}];
            for (let jj = 0; jj < 4; jj++) {
                transformedPoints[jj].x = sectors[geodesics[ii][geodesics[ii].length - 1].parentSector[0]].trapez.points[jj].x - sectors[geodesics[ii][geodesics[ii].length - 1].parentSector[0]].trapez.width / 2;
                transformedPoints[jj].y = sectors[geodesics[ii][geodesics[ii].length - 1].parentSector[0]].trapez.points[jj].y - sectors[geodesics[ii][geodesics[ii].length - 1].parentSector[0]].trapez.height / 2;
                transformedPoints[jj] = fabric.util.transformPoint(transformedPoints[jj], transformMatrix);
            }


            for (let kk = 0; kk < 4; kk++) {

                xt1 =  transformedPoints[kk].x;
                xt2 =  transformedPoints[(kk + 1) % 4].x;
                yt1 =  transformedPoints[kk].y;
                yt2 =  transformedPoints[(kk + 1) % 4].y;

                dxg = xg2 - xg1;
                dyg = yg2 - yg1;
                dxt12 = xt2 - xt1;
                dyt12 = yt2 - yt1;

                slopeGeodesic = dyg / dxg;
                slopeTrapez = dyt12 / dxt12;


                if( dxg > epsilon)
                {
                    alpha = (yg2 - yt1 + (dyg / dxg) * (xt1 - xg2)) / (dyt12 - ((dxt12 * dyg) / dxg));
                    lambda = (xt1 + ((yg2 - yt1 + (dyg / dxg) * (xt1 - xg2)) / (dyt12 - ((dxt12 * dyg) / dxg))) * dxt12 - xg2) / dxg;
                }

                else{
                    alpha = (xg2 - xt1 + (dxg / dyg) * (yt1 - yg2)) / (dxt12 - ((dyt12 * dxg) / dyg));
                    lambda = (yt1 + ((xg2 - xt1 + (dxg / dyg) * (yt1 - yg2)) / (dxt12 - ((dyt12 * dxg) / dyg))) * dyt12 - yg2) / dyg;
                }



                if (lambda > epsilon) {
                    if (alpha >= 0.0 && alpha <= 1.0) {
                        kantenIndex = kk;
                        break;
                    }
                }



            }

            let neighbourSector = sectors[geodesics[ii][geodesics[ii].length - 1].parentSector[0]].neighbourhood[kantenIndex];


            if (kantenIndex >= 0) {
                let lineSegment = new fabric.Line([xg2, yg2, xt1 + alpha * dxt12, yt1 + alpha * dyt12], {
                    strokeWidth: 2 * scaleFacotor,
                    fill: geodesics[ii][0].fill,
                    stroke: geodesics[ii][0].stroke,
                    originX: 'center',
                    originY: 'center',
                    perPixelTargetFind: true,
                    objectCaching: false,
                    hasBorders: false,
                    hasControls: false,
                    evented: false,
                    selectable: false,
                });

                lineSegment.ID = [ii, geodesics[ii].length];
                lineSegment.parentSector = [geodesics[ii][geodesics[ii].length - 1].parentSector[0], sectors[geodesics[ii][geodesics[ii].length - 1].parentSector[0]].lineSegments.length];

                console.log(lineSegment.parentSector);
                let trapezTransform = sectors[geodesics[ii][geodesics[ii].length - 1].parentSector[0]].trapez.calcTransformMatrix('True');
                let invertedtrapezTransform = invert(trapezTransform);
                let desiredTransform = multiply(
                    invertedtrapezTransform,
                    lineSegment.calcTransformMatrix());


                lineSegment.relationship = desiredTransform;

                sectors[lineSegment.parentSector[0]].lineSegments.push(lineSegment);
                let stackIdx = canvas.getObjects().indexOf(sectors[lineSegment.parentSector[0]].ID_text);
                canvas.insertAt(lineSegment,stackIdx);
                geodesics[ii].push(lineSegment);



                //Fortsetzung im nächsten Sektor





                slopeAngle = Math.acos((dxg * dxt12 + dyg * dyt12) / ((Math.sqrt( dxg*dxg + dyg*dyg)) * (Math.sqrt( dxt12*dxt12 + dyt12*dyt12))));


                for (lauf = 0; lauf < 100; lauf++) {
                    if (neighbourSector === -1 || sectors[neighbourSector].fill === '#e2e2e2'){

                        break
                    }

                    //Punkte des Nachbarsektors ermitteln
                    let transformMatrix = sectors[neighbourSector].trapez.calcTransformMatrix('True');
                    let transformedPoints = [{x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}];
                    for (let jj = 0; jj < 4; jj++) {
                        transformedPoints[jj].x = sectors[neighbourSector].trapez.points[jj].x - sectors[neighbourSector].trapez.width / 2;
                        transformedPoints[jj].y = sectors[neighbourSector].trapez.points[jj].y - sectors[neighbourSector].trapez.height / 2;
                        transformedPoints[jj] = fabric.util.transformPoint(transformedPoints[jj], transformMatrix);
                    }

                    //Übergangspunkte übernehmen
                    xt1_uebergang = transformedPoints[(kantenIndex + 3) % 4].x;
                    xt2_uebergang = transformedPoints[(kantenIndex + 2) % 4].x;
                    yt1_uebergang = transformedPoints[(kantenIndex + 3) % 4].y;
                    yt2_uebergang = transformedPoints[(kantenIndex + 2) % 4].y;

                    dxt12_uebergang = xt2_uebergang - xt1_uebergang;
                    dyt12_uebergang = yt2_uebergang - yt1_uebergang;

                    x_kante_uebergang = xt1_uebergang + alpha * dxt12_uebergang;
                    y_kante_uebergang = yt1_uebergang + alpha * dyt12_uebergang;

                    //Übergangsrichtung ermitteln

                    dxg = nextGeodesic_x = dxt12_uebergang * Math.cos(-slopeAngle) - dyt12_uebergang * Math.sin(-slopeAngle);
                    dyg = nextGeodesic_y = dxt12_uebergang * Math.sin(-slopeAngle) + dyt12_uebergang * Math.cos(-slopeAngle);

                    //Schnittpunkte mit den neuen Sektorkanten ermitteln

                    for (let kk = 0; kk < 4; kk++) {

                        xt1 = transformedPoints[kk].x;
                        xt2 = transformedPoints[(kk + 1) % 4].x;
                        yt1 = transformedPoints[kk].y;
                        yt2 = transformedPoints[(kk + 1) % 4].y;

                        dxt12 = xt2 - xt1;
                        dyt12 = yt2 - yt1;


                        if (dxg > epsilon) {
                            alpha_2 = (y_kante_uebergang - yt1 + (dyg / dxg) * (xt1 - x_kante_uebergang)) / (dyt12 - ((dxt12 * dyg) / dxg));
                            lambda_2 = (xt1 + ((y_kante_uebergang - yt1 + (dyg / dxg) * (xt1 - x_kante_uebergang)) / (dyt12 - ((dxt12 * dyg) / dxg))) * dxt12 - x_kante_uebergang) / dxg;
                        }

                        else {
                            alpha_2 = (x_kante_uebergang - xt1 + (dxg / dyg) * (yt1 - y_kante_uebergang)) / (dxt12 - ((dyt12 * dxg) / dyg));
                            lambda_2 = (yt1 + ((x_kante_uebergang - xt1 + (dxg / dyg) * (yt1 - y_kante_uebergang)) / (dxt12 - ((dyt12 * dxg) / dyg))) * dyt12 - y_kante_uebergang) / dyg;
                        }


                        if (lambda_2 > epsilon) {
                            if (alpha_2 >= 0.0 && alpha_2 <= 1.0) {
                                kantenIndex = kk;
                                break;
                            }
                        }
                    }


                    let lineSegmentContinue = new fabric.Line([x_kante_uebergang, y_kante_uebergang, xt1 + alpha_2 * dxt12, yt1 + alpha_2 * dyt12], {
                        strokeWidth: 2 * scaleFacotor,
                        fill: geodesics[ii][0].fill,
                        stroke: geodesics[ii][0].stroke,
                        originX: 'center',
                        originY: 'center',
                        perPixelTargetFind: true,
                        objectCaching: false,
                        hasBorders: false,
                        hasControls: false,
                        evented: false,
                        selectable: false,
                    });

                    lineSegmentContinue.ID = [ii, geodesics[ii].length];
                    lineSegmentContinue.parentSector = [neighbourSector, sectors[neighbourSector].lineSegments.length];
                    trapezTransform = sectors[neighbourSector].trapez.calcTransformMatrix('True');
                    invertedtrapezTransform = invert(trapezTransform);
                    desiredTransform = multiply(invertedtrapezTransform, lineSegmentContinue.calcTransformMatrix());

                    lineSegmentContinue.relationship = desiredTransform;

                    sectors[lineSegmentContinue.parentSector[0]].lineSegments.push(lineSegmentContinue);

                    let stackIdx = 0;
                    //let mittelpunktlineSegment = new fabric.Point(x_kante_uebergang+(xt1 + alpha_2 * dxt12 - x_kante_uebergang)/2,y_kante_uebergang+ (yt1 + alpha_2 * dyt12 - y_kante_uebergang)/2);
                    if(canvas.getObjects().indexOf(sectors[neighbourSector].ID_text) > stackIdx) {
                        stackIdx = canvas.getObjects().indexOf(sectors[neighbourSector].ID_text);

                    }

                    canvas.insertAt(lineSegmentContinue,stackIdx);
                    geodesics[ii].push(lineSegmentContinue);

                    slopeAngle = Math.acos((dxg * dxt12 + dyg * dyt12) / ((Math.sqrt(dxg * dxg + dyg * dyg)) * (Math.sqrt(dxt12 * dxt12 + dyt12 * dyt12))));

                    neighbourSector = sectors[lineSegmentContinue.parentSector[0]].neighbourhood[kantenIndex];


                    alpha = alpha_2
                }

            }






        }

    }
    canvas.renderAll();
}

function continueGeodesic() {


    let lambda;
    let alpha = 0.0;
    let kantenIndex = -1;
    let geodesicsIndex = -1;

    let xt1;
    let xt2;
    let yt1;
    let yt2;

    let dxg;
    let dyg;
    let dxt12;
    let dyt12;

    let slopeGeodesic;
    let slopeTrapez;
    let slopeAngle;

    let nextGeodesic_x;
    let nextGeodesic_y;


    kantenindex = -1;
    if (typeof arrowheadline === 'undefined') {
        return;
    } else {

        if ( geodesics[arrowheadline].length > 0) {


            let geodesic_end_point = new fabric.Point(geodesics[arrowheadline][geodesics[arrowheadline].length - 1].calcLinePoints().x2, geodesics[arrowheadline][geodesics[arrowheadline].length - 1].calcLinePoints().y2);
            geodesic_end_point = fabric.util.transformPoint(geodesic_end_point, geodesics[arrowheadline][geodesics[arrowheadline].length - 1].calcTransformMatrix());

            let xg2 = geodesic_end_point.x;
            let yg2 = geodesic_end_point.y;

            let geodesic_start_point = new fabric.Point(geodesics[arrowheadline][geodesics[arrowheadline].length - 1].calcLinePoints().x1, geodesics[arrowheadline][geodesics[arrowheadline].length - 1].calcLinePoints().y1);
            geodesic_start_point = fabric.util.transformPoint(geodesic_start_point, geodesics[arrowheadline][geodesics[arrowheadline].length - 1].calcTransformMatrix());

            let xg1 = geodesic_start_point.x;
            let yg1 = geodesic_start_point.y;

            //Umrechnung der lokalen in globale Koordinaten
            let transformMatrix = sectors[geodesics[arrowheadline][geodesics[arrowheadline].length - 1].parentSector[0]].trapez.calcTransformMatrix('True');
            let transformedPoints = [{x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}];
            for (let jj = 0; jj < 4; jj++) {
                transformedPoints[jj].x = sectors[geodesics[arrowheadline][geodesics[arrowheadline].length - 1].parentSector[0]].trapez.points[jj].x - sectors[geodesics[arrowheadline][geodesics[arrowheadline].length - 1].parentSector[0]].trapez.width / 2;
                transformedPoints[jj].y = sectors[geodesics[arrowheadline][geodesics[arrowheadline].length - 1].parentSector[0]].trapez.points[jj].y - sectors[geodesics[arrowheadline][geodesics[arrowheadline].length - 1].parentSector[0]].trapez.height / 2;
                transformedPoints[jj] = fabric.util.transformPoint(transformedPoints[jj], transformMatrix);
            }


            for (let kk = 0; kk < 4; kk++) {

                xt1 = transformedPoints[kk].x;
                xt2 = transformedPoints[(kk + 1) % 4].x;
                yt1 = transformedPoints[kk].y;
                yt2 = transformedPoints[(kk + 1) % 4].y;

                dxg = xg2 - xg1;
                dyg = yg2 - yg1;
                dxt12 = xt2 - xt1;
                dyt12 = yt2 - yt1;

                slopeGeodesic = dyg / dxg;
                slopeTrapez = dyt12 / dxt12;


                if (dxg > epsilon) {
                    alpha = (yg2 - yt1 + (dyg / dxg) * (xt1 - xg2)) / (dyt12 - ((dxt12 * dyg) / dxg));
                    lambda = (xt1 + ((yg2 - yt1 + (dyg / dxg) * (xt1 - xg2)) / (dyt12 - ((dxt12 * dyg) / dxg))) * dxt12 - xg2) / dxg;
                }

                else {
                    alpha = (xg2 - xt1 + (dxg / dyg) * (yt1 - yg2)) / (dxt12 - ((dyt12 * dxg) / dyg));
                    lambda = (yt1 + ((xg2 - xt1 + (dxg / dyg) * (yt1 - yg2)) / (dxt12 - ((dyt12 * dxg) / dyg))) * dyt12 - yg2) / dyg;
                }


                if (lambda > epsilon) {
                    if (alpha >= 0.0 && alpha <= 1.0) {
                        kantenIndex = kk;
                        break;
                    }
                }


            }


            let neighbourSector = sectors[geodesics[arrowheadline][geodesics[arrowheadline].length - 1].parentSector[0]].neighbourhood[kantenIndex];


            if (kantenIndex >= 0) {
                let lineSegment = new fabric.Line([xg2, yg2, xt1 + alpha * dxt12, yt1 + alpha * dyt12], {
                    strokeWidth: 2 * scaleFacotor,
                    fill: geodesics[arrowheadline][0].fill,
                    stroke: geodesics[arrowheadline][0].stroke,
                    originX: 'center',
                    originY: 'center',
                    perPixelTargetFind: true,
                    objectCaching: false,
                    hasBorders: false,
                    hasControls: false,
                    evented: false,
                    selectable: false,
                });

                lineSegment.ID = [arrowheadline, geodesics[arrowheadline].length];
                lineSegment.parentSector = [geodesics[arrowheadline][geodesics[arrowheadline].length - 1].parentSector[0], sectors[geodesics[arrowheadline][geodesics[arrowheadline].length - 1].parentSector[0]].lineSegments.length];

                let trapezTransform = sectors[geodesics[arrowheadline][geodesics[arrowheadline].length - 1].parentSector[0]].trapez.calcTransformMatrix('True');
                let invertedtrapezTransform = invert(trapezTransform);
                let desiredTransform = multiply(
                    invertedtrapezTransform,
                    lineSegment.calcTransformMatrix());


                lineSegment.relationship = desiredTransform;

                sectors[lineSegment.parentSector[0]].lineSegments.push(lineSegment);


                let stackIdx = canvas.getObjects().indexOf(sectors[lineSegment.parentSector[0]].ID_text);
                canvas.insertAt(lineSegment,stackIdx);
                geodesics[arrowheadline].push(lineSegment);


                //Fortsetzung im nächsten Sektor


                slopeAngle = Math.acos((dxg * dxt12 + dyg * dyt12) / ((Math.sqrt(dxg * dxg + dyg * dyg)) * (Math.sqrt(dxt12 * dxt12 + dyt12 * dyt12))));


                for (lauf = 0; lauf < 100; lauf++) {

                    if (neighbourSector === -1  || sectors[neighbourSector].fill === '#e2e2e2') {

                        break
                    }

                    //Punkte des Nachbarsektors ermitteln
                    let transformMatrix = sectors[neighbourSector].trapez.calcTransformMatrix('True');
                    let transformedPoints = [{x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}];
                    for (let jj = 0; jj < 4; jj++) {
                        transformedPoints[jj].x = sectors[neighbourSector].trapez.points[jj].x - sectors[neighbourSector].trapez.width / 2;
                        transformedPoints[jj].y = sectors[neighbourSector].trapez.points[jj].y - sectors[neighbourSector].trapez.height / 2;
                        transformedPoints[jj] = fabric.util.transformPoint(transformedPoints[jj], transformMatrix);
                    }

                    //Übergangspunkte übernehmen
                    xt1_uebergang = transformedPoints[(kantenIndex + 3) % 4].x;
                    xt2_uebergang = transformedPoints[(kantenIndex + 2) % 4].x;
                    yt1_uebergang = transformedPoints[(kantenIndex + 3) % 4].y;
                    yt2_uebergang = transformedPoints[(kantenIndex + 2) % 4].y;

                    dxt12_uebergang = xt2_uebergang - xt1_uebergang;
                    dyt12_uebergang = yt2_uebergang - yt1_uebergang;

                    x_kante_uebergang = xt1_uebergang + alpha * dxt12_uebergang;
                    y_kante_uebergang = yt1_uebergang + alpha * dyt12_uebergang;

                    //Übergangsrichtung ermitteln

                    dxg = nextGeodesic_x = dxt12_uebergang * Math.cos(-slopeAngle) - dyt12_uebergang * Math.sin(-slopeAngle);
                    dyg = nextGeodesic_y = dxt12_uebergang * Math.sin(-slopeAngle) + dyt12_uebergang * Math.cos(-slopeAngle);

                    //Schnittpunkte mit den neuen Sektorkanten ermitteln

                    for (let kk = 0; kk < 4; kk++) {

                        xt1 = transformedPoints[kk].x;
                        xt2 = transformedPoints[(kk + 1) % 4].x;
                        yt1 = transformedPoints[kk].y;
                        yt2 = transformedPoints[(kk + 1) % 4].y;

                        dxt12 = xt2 - xt1;
                        dyt12 = yt2 - yt1;


                        if (dxg > epsilon) {
                            alpha_2 = (y_kante_uebergang - yt1 + (dyg / dxg) * (xt1 - x_kante_uebergang)) / (dyt12 - ((dxt12 * dyg) / dxg));
                            lambda_2 = (xt1 + ((y_kante_uebergang - yt1 + (dyg / dxg) * (xt1 - x_kante_uebergang)) / (dyt12 - ((dxt12 * dyg) / dxg))) * dxt12 - x_kante_uebergang) / dxg;
                        }

                        else {
                            alpha_2 = (x_kante_uebergang - xt1 + (dxg / dyg) * (yt1 - y_kante_uebergang)) / (dxt12 - ((dyt12 * dxg) / dyg));
                            lambda_2 = (yt1 + ((x_kante_uebergang - xt1 + (dxg / dyg) * (yt1 - y_kante_uebergang)) / (dxt12 - ((dyt12 * dxg) / dyg))) * dyt12 - y_kante_uebergang) / dyg;
                        }


                        if (lambda_2 > epsilon) {
                            if (alpha_2 >= 0.0 && alpha_2 <= 1.0) {
                                kantenIndex = kk;
                                break;
                            }
                        }
                    }


                    let lineSegmentContinue = new fabric.Line([x_kante_uebergang, y_kante_uebergang, xt1 + alpha_2 * dxt12, yt1 + alpha_2 * dyt12], {
                        strokeWidth: 2 * scaleFacotor,
                        fill: geodesics[arrowheadline][0].fill,
                        stroke: geodesics[arrowheadline][0].stroke,
                        originX: 'center',
                        originY: 'center',
                        perPixelTargetFind: true,
                        objectCaching: false,
                        hasBorders: false,
                        hasControls: false,
                        evented: false,
                        selectable: false,
                    });

                    lineSegmentContinue.ID = [arrowheadline, geodesics[arrowheadline].length];
                    lineSegmentContinue.parentSector = [neighbourSector, sectors[neighbourSector].lineSegments.length];
                    trapezTransform = sectors[neighbourSector].trapez.calcTransformMatrix('True');
                    invertedtrapezTransform = invert(trapezTransform);
                    desiredTransform = multiply(invertedtrapezTransform, lineSegmentContinue.calcTransformMatrix());

                    lineSegmentContinue.relationship = desiredTransform;

                    sectors[lineSegmentContinue.parentSector[0]].lineSegments.push(lineSegmentContinue);


                    let stackIdx = 0;

                    if(canvas.getObjects().indexOf(sectors[neighbourSector].ID_text) > stackIdx) {
                        stackIdx = canvas.getObjects().indexOf(sectors[neighbourSector].ID_text)
                    }

                    canvas.insertAt(lineSegmentContinue,stackIdx);
                    geodesics[arrowheadline].push(lineSegmentContinue);


                    slopeAngle = Math.acos((dxg * dxt12 + dyg * dyt12) / ((Math.sqrt(dxg * dxg + dyg * dyg)) * (Math.sqrt(dxt12 * dxt12 + dyt12 * dyt12))));


                    neighbourSector = sectors[lineSegmentContinue.parentSector[0]].neighbourhood[kantenIndex];


                    alpha = alpha_2
                }

            }


        }

    }
}


function distance(punkt1, punkt2) {
    return Math.sqrt(Math.pow((punkt2.x - punkt1.x), 2) + Math.pow((punkt2.y - punkt1.y), 2));
}

function fitResponsiveCanvas() {

    // canvas container dimensions
    let containerSize = {
        width: document.getElementById('canvas-container').offsetWidth,
        height: document.getElementById('canvas-container').offsetHeight
    };
    scaleRatio = Math.min(containerSize.width / canvasSize.width, containerSize.height / canvasSize.height);
    canvas.setWidth(containerSize.width);
    canvas.setHeight(containerSize.height * 0.92);
    canvas_buttons.setWidth(containerSize.width);
    canvas_buttons.setHeight(containerSize.height * 0.08);
    //set canvas zoom aspect
    canvas.setZoom(scaleRatio);
    canvas_buttons.setZoom(scaleRatio);
}


//Selbst definierte Trapez-Konstruktor-Funktion
//Erstellen der Sektorflächen
function initializeSectors() //keine Argumente
{
    if (typeof this.trapez !== 'undefined') {
        canvas.remove(this.trapez); //sollte ein Sektor zwei Trapeze erzeugen, wird der erste gelöscht
    }

    //Berechnung der Koordinaten der Eckpunkte des Polygons



    let x0 = -Math.min(0,this.offset_x);
    let y0 = 0;
    let x1 = this.sector_top - Math.min(0, this.offset_x );
    let y1 = 0;
    let x2 = this.sector_bottom + Math.max(0,this.offset_x); //+ offset_x;
    let y2 = this.sector_height;
    let x3 = Math.max(0,this.offset_x);
    let y3 = this.sector_height;

    this.trapez = new fabric.Polygon //Anlegen des Polygons (noch nicht geaddet), unter 'trapez' abgespeichert
    (
        [   {x: x0, y: y0},
            {x: x1, y: y1},
            {x: x2, y: y2},
            {x: x3, y: y3},
        ],

        {
            originX: 'center',
            originY: 'center',
            left: this.pos_x, //Koordinaten der linken oberen Ecke der Boundingbox
            top: this.pos_y,
            angle: this.sector_angle,
            fill: this.fill,
            strokeWidth: 1 * scaleFacotor,
            stroke: '#666',
            perPixelTargetFind: true,
            hasControls: true,
            hasBorders: false,
            objectCaching: false,
            lockMovementX: false,
            lockMovementY: false,
            lockScalingX: true,
            lockScalingY: true,
            cornerSize: 30,

        });

    this.trapez.setControlsVisibility({
        //    mtr: false,
        tl: false,
        mt: false,
        tr: false,

        mr: false,
        ml: false,

        bl: false,
        mb: false,
        br: false,
    });

    //Rotationskontrolle: Icon und Position werden verändert
    fabric.Polygon.prototype._drawControl  = function(control, ctx, methodName, left, top) {
        if (!this.isControlVisible(control)) {
            return;
        }
        let SelectedIconImage = new Image();
        let size = this.cornerSize;
        /*  fabric.isVML() ||*/
        this.transparentCorners || ctx.clearRect(left, top, size, size);
        if(control === 'mtr')
        {
            SelectedIconImage.src = 'rotate.png';
        }else {
            ctx[methodName](left, top, size, size);
        }

        if (control === 'mtr') {
            try {
                ctx.drawImage(SelectedIconImage, left, top, 30, 30);
            } catch (e) {
                ctx[methodName](left, top, size, size);
            }
        }
    };
    this.trapez.rotatingPointOffset = 15;


    //Zeiger, der wieder auf die Parentalsektor zeigt
    this.trapez.parent = this;

    this.trapez.aussenkreisradius = Math.sqrt( Math.pow(this.sector_width/2, 2) + Math.pow(this.sector_height/2, 2));

    this.ID_text = new fabric.Text("" + (this.name), {
        fontSize: 5 * scaleFacotor,
        originX: 'center',
        originY: 'center',
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        selectable: false,
        evented: false,
        left: this.pos_x , //Koordinaten der linken oberen Ecke der Boundingbox
        top: this.pos_y ,
        angle: this.sector_angle,
//        angle: this.sector_angle
    });


    //Berechnung der relativen Position von Objekten im lokalen Koordinatensystem der Parentalsektoren
    //wichtig für updateMinions
    let trapezTransform = this.trapez.calcTransformMatrix();
    let invertedtrapezTransform = invert(trapezTransform);
    let desiredTransform = multiply(
        invertedtrapezTransform,
        this.ID_text.calcTransformMatrix());

    this.ID_text.relationship = desiredTransform;

    this.trapez.on('moving',function(){snapping(this); updateMinions(this)});
    this.trapez.on('rotating',function(){updateMinions(this)});
    this.trapez.on('modified',function(){snapping(this);snapping(this);updateMinions(this); for (let ii = 0; ii < sectors.length; ii++){ overlapControll(sectors[ii].trapez)}});

    //Setzen/Verlängern einer Linie; nur zulässig auf Trapezen
    this.trapez.on('mousedown', function (o) {

        if(selectedTool !== 'paint' && selectedTool !== 'grab' && selectedTool !== 'mark' || this.opacity !== 1) return;
        let color;
            color = line_colors[geodesics.length % line_colors.length];
            if (!isLineStarted) {
                let pointer = canvas.getPointer(o.e);
                let points = [pointer.x, pointer.y, pointer.x, pointer.y];
                if (arrowheadline !== -1){
                    if (geodesics[arrowheadline].length>0) {
                        let geodesic_end_point = new fabric.Point(geodesics[arrowheadline][geodesics[arrowheadline].length - 1].calcLinePoints().x2, geodesics[arrowheadline][geodesics[arrowheadline].length - 1].calcLinePoints().y2);
                        geodesic_end_point = fabric.util.transformPoint(geodesic_end_point, geodesics[arrowheadline][geodesics[arrowheadline].length - 1].calcTransformMatrix());
                        points = [geodesic_end_point.x, geodesic_end_point.y, pointer.x, pointer.y];
                        lineContinueAt = arrowheadline;
                        color = geodesics[lineContinueAt][0].fill;
                    }
                }

                if (startAtMarkPoint !== -1){
                    points = [markPoints[startAtMarkPoint].left, markPoints[startAtMarkPoint].top, pointer.x, pointer.y]
                }
                if (selectedTool == 'grab' && lineContinueAt !== -1){
                    this.lockMovementX = true;
                    this.lockMovementY = true;
                    this.hasControls = false;
                    //this.evented = false;
                }
                if (selectedTool == 'paint' || lineContinueAt !== -1 ) {
                    isLineStarted = true;
                    line = new fabric.Line(points, {
                        strokeWidth: 2 * scaleFacotor,
                        stroke: color,
                        fill: color,
                        originX: 'center',
                        originY: 'center',
                        perPixelTargetFind: true,
                        objectCaching: false,
                        hasBorders: false,
                        hasControls: false,
                        evented: false
                    });

                    canvas.add(line);

                    line.bringToFront();

                    canvas.renderAll();
                }

                if (selectedTool == 'mark') {
                    mark = new fabric.Circle({
                        originX: 'center',
                        originY: 'center',
                        left: pointer.x,
                        top: pointer.y,
                        radius: 3,
                        stroke: 'black',
                        strokeWidth: 0,
                        fill: 'black',
                        perPixelTargetFind: true,
                        hasBorders: false,
                        objectCaching: false,
                        selectable: false,
                        lockMovementX: true,
                        lockMovementY: true,
                        lockScalingX: true,
                        lockScalingY: true,
                        evented: false,
                        hoverCursor: 'crosshair',
                    });

                    let stackIdx = 0;
                    for (ii = 0; ii < sectors.length; ii++){
                        if(sectorContainsPoint(sectors[ii].trapez, pointer)){
                            console.log(sectors[ii].ID);
                            if(canvas.getObjects().indexOf(sectors[ii].ID_text) > stackIdx) {
                                stackIdx =canvas.getObjects().indexOf(sectors[ii].ID_text);
                                mark.parentSector = sectors[ii].ID;
                            }
                        }
                    }

                    let trapezTransform = sectors[mark.parentSector].trapez.calcTransformMatrix();
                    let invertedtrapezTransform = invert(trapezTransform);
                    let desiredTransform = multiply(
                        invertedtrapezTransform,
                        mark.calcTransformMatrix());


                    mark.relationship = desiredTransform;

                    sectors[mark.parentSector].markCircles.push(mark);

                    canvas.insertAt(mark,stackIdx);

                    markPoints.push(mark);

                    canvas.renderAll();

                    toolChange('grab')
                }

        }
    });


    //Beenden von Linien; nur auf Trapezen möglich
    this.trapez.on('mouseup', function (o) {
        if (arrowheadline !== -1) {
            arrowheadline = -1;
        }
        if(selectedTool !== 'paint' && selectedTool !== 'mark' && lineContinueAt == -1  ) {
            return;
        }

        let immediatehistory =[];
        let color;
        if( lineContinueAt !== -1){
            color = geodesics[lineContinueAt][0].fill;

            //startsector beweglich machen
            let idx = geodesics[lineContinueAt][geodesics[lineContinueAt].length-1].parentSector;
            sectors[idx[0]].trapez.lockMovementX = false;
            sectors[idx[0]].trapez.lockMovementY = false;
            sectors[idx[0]].trapez.evented = true;
            sectors[idx[0]].trapez.hasControls = true;
            sectors[idx[0]].trapez.hoverCursor = 'grabbing';


        }else {
            color = line_colors[geodesics.length % line_colors.length];
        }

        if(isLineStarted) {
            isLineStarted= false;
            line.setCoords(); //Alle Änderungen der Member sollen übernommen werden
            canvas.renderAll();
            xg1 = line.x1;
            xg2 = line.x2;
            yg1 = line.y1;
            yg2 = line.y2;

            if(distance(new fabric.Point(xg1,yg1),new fabric.Point(xg2,yg2)) <= abortlength){
                canvas.remove(line);
                lineContinueAt = -1;
                return;
            }

            //Splitting der Linie in Liniensegmente an den Sektorkanten
            let lambdas = getSchnittpunktsparameter(sectors,[xg1,yg1,xg2,yg2]);

            canvas.remove(line);
            let linestart_x= line.x1;
            let linestart_y= line.y1;

            let geodesic = [];
            lambdas.push(1.0);
            for(let ii = 1; ii<lambdas.length; ii++) {
                let lineend_x = xg1 + lambdas[ii] * (xg2 - xg1);
                let lineend_y = yg1 + lambdas[ii] * (yg2 - yg1);
                if(Math.abs(lineend_x-linestart_x)>epsilon || Math.abs(lineend_y-linestart_y)>epsilon) {
                    let lineSegment = new fabric.Line([linestart_x, linestart_y, lineend_x, lineend_y], {
                        strokeWidth: 2 * scaleFacotor,
                        fill: color,
                        stroke: color,
                        originX: 'center',
                        originY: 'center',
                        perPixelTargetFind: true,
                        objectCaching: false,
                        hasBorders: false,
                        hasControls: false,
                        evented: false,
                        selectable: false,
                    });

                    if (lineContinueAt !== -1) {
                        lineSegment.ID = [lineContinueAt, geodesics[lineContinueAt].length]
                    }else{
                        lineSegment.ID = [geodesics.length, geodesic.length];
                    }
                    let stackIdx = 0;
                    for (let jj = sectors.length-1 ; jj >= 0 ; jj--){
                        let mittelpunktlineSegment = new fabric.Point(linestart_x+(lineend_x - linestart_x)/2,linestart_y+ (lineend_y - linestart_y)/2);

                        if(sectorContainsPoint(sectors[jj].trapez, mittelpunktlineSegment)){
                            if(canvas.getObjects().indexOf(sectors[jj].ID_text) > stackIdx) {
                                stackIdx =canvas.getObjects().indexOf(sectors[jj].ID_text);
                                lineSegment.parentSector = [jj, sectors[jj].lineSegments.length];
                            }
                        }
                    }



                    //Wenn Liniensegment nicht auf Trapez
                    if(typeof(lineSegment.parentSector)==='undefined'){
                        canvas.add(lineSegment);
                        lineSegment.sendToBack();
                        lineSegment.opacity = 0.5;
                        lineSegment.parentSector = [-1,-1];
                        lineSegment.relationship = [];

                    }else{

                        let trapezTransform = sectors[lineSegment.parentSector[0]].trapez.calcTransformMatrix();
                        let invertedtrapezTransform = invert(trapezTransform);
                        let desiredTransform = multiply(
                            invertedtrapezTransform,
                            lineSegment.calcTransformMatrix());


                        lineSegment.relationship = desiredTransform;

                        sectors[lineSegment.parentSector[0]].lineSegments.push(lineSegment);

//                        let stackIndex = canvas.getObjects().indexOf(sectors[lineSegment.parentSector[0]].ID_text);

                        canvas.insertAt(lineSegment,stackIdx);
                    }
                    if (lineContinueAt !== -1){
                        geodesics[lineContinueAt].push(lineSegment)
                    } else {geodesic.push(lineSegment);}
                    immediatehistory.push(lineSegment.ID)
                }

                linestart_x = lineend_x;
                linestart_y = lineend_y;
            }

            if (lineContinueAt === -1){
                geodesics.push(geodesic)}

            lineContinueAt = -1;


            history.push(immediatehistory);

            canvas.renderAll();
            toolChange('grab')
        }

    });

    canvas.add(this.trapez);
    canvas.add(this.ID_text);
}



function getSchnittpunktsparameter(sectors,[xg1,yg1,xg2,yg2]) {

    let lambda;
    let alpha;

    let xt1;
    let xt2;
    let yt1;
    let yt2;

    // Geradengleichung der Linie und die der Sektorkante gleichsetzen
    //Orientierung der Sektorkante durch Reihenfolge der Eckpunkte: left-top -> right-top -> right-bottom -> left-bottom


    let lambdas = [0.0];
    for(let ii = 0; ii < sectors.length; ii++) {
        let object = sectors[ii].trapez;

        //Umrechnung der lokalen in globale Koordinaten
        let transformMatrix = sectors[ii].trapez.calcTransformMatrix('True');
        let transformedPoints = [{x:0.0,y:0.0},{x:0.0,y:0.0},{x:0.0,y:0.0},{x:0.0,y:0.0}];
        for(let jj = 0; jj < 4; jj++){
            transformedPoints[jj].x = sectors[ii].trapez.points[jj].x - sectors[ii].trapez.width/2;
            transformedPoints[jj].y = sectors[ii].trapez.points[jj].y - sectors[ii].trapez.height/2;
            transformedPoints[jj] = fabric.util.transformPoint(transformedPoints[jj],transformMatrix);
        }

        for (let kk = 0; kk < 4; kk++) {


            xt1 =  transformedPoints[kk].x;
            xt2 =  transformedPoints[(kk + 1) % 4].x;
            yt1 =  transformedPoints[kk].y;
            yt2 =  transformedPoints[(kk + 1) % 4].y;


            let dxg = xg2 - xg1;
            let dyg = yg2 - yg1;
            let dxt12 = xt2 - xt1;
            let dyt12 = yt2 - yt1;


            if( dxg > epsilon)
            {
                alpha = (yg1 - yt1 + (dyg / dxg) * (xt1 - xg1)) / (dyt12 - ((dxt12 * dyg) / dxg));
                lambda = (xt1 + ((yg1 - yt1 + (dyg / dxg) * (xt1 - xg1)) / (dyt12 - ((dxt12 * dyg) / dxg))) * dxt12 - xg1) / dxg;

            }

            else{
                alpha = (xg1 - xt1 + (dxg / dyg) * (yt1 - yg1)) / (dxt12 - ((dyt12 * dxg) / dyg));
                lambda = (yt1 + ((xg1 - xt1 + (dxg / dyg) * (yt1 - yg1)) / (dxt12 - ((dyt12 * dxg) / dyg))) * dyt12 - yg1) / dyg;

            }


            if (epsilon <= lambda && lambda <= 1 && epsilon <= alpha && alpha <= 1) {
                lambdas.push(lambda);

            }
        }
    }
    if(lambdas.length > 1){lambdas =  lambdas.sort(function(a, b) {return a - b;});}
    return lambdas;
}


function getSchnittpunktsparameterPadding(sectors,[xg1,yg1,xg2,yg2]) {

    let lambda;
    let alpha;

    let xt1;
    let xt2;
    let yt1;
    let yt2;

    // Geradengleichung der Linie und die der Sektorkante gleichsetzen
    //Orientierung der Sektorkante durch Reihenfolge der Eckpunkte: left-top -> right-top -> right-bottom -> left-bottom


    let lambdas = [0.0];
    for(let ii = 0; ii < sectors.length; ii++) {
        let object = sectors[ii].trapez;

        //Umrechnung der lokalen in globale Koordinaten
        let transformMatrix = sectors[ii].trapez.calcTransformMatrix('True');
        let transformedPoints = [{x:0.0,y:0.0},{x:0.0,y:0.0},{x:0.0,y:0.0},{x:0.0,y:0.0}];
        for(let jj = 0; jj < 4; jj++){
            transformedPoints[jj].x = sectors[ii].trapez.points[jj].x - sectors[ii].trapez.width/2;
            transformedPoints[jj].y = sectors[ii].trapez.points[jj].y - sectors[ii].trapez.height/2;
            transformedPoints[jj] = fabric.util.transformPoint(transformedPoints[jj],transformMatrix);
        }

        //Die folgenden Zeilen versetzen die zu verwendenden Eckpunkte des Trapzes nach Innen (bilden eines Padding)
        //Verhindert das fälsche overlapping
        transformedPoints[0].x = transformedPoints[0].x + paddingFactor * (transformedPoints[2].x-transformedPoints[0].x);
        transformedPoints[0].y = transformedPoints[0].y + paddingFactor * (transformedPoints[2].y-transformedPoints[0].y);

        transformedPoints[2].x = transformedPoints[2].x - paddingFactor * (transformedPoints[2].x-transformedPoints[0].x);
        transformedPoints[2].y = transformedPoints[2].y - paddingFactor * (transformedPoints[2].y-transformedPoints[0].y);

        transformedPoints[1].x = transformedPoints[1].x + paddingFactor * (transformedPoints[3].x-transformedPoints[1].x);
        transformedPoints[1].y = transformedPoints[1].y + paddingFactor * (transformedPoints[3].y-transformedPoints[1].y);

        transformedPoints[3].x = transformedPoints[3].x - paddingFactor * (transformedPoints[3].x-transformedPoints[1].x);
        transformedPoints[3].y = transformedPoints[3].y - paddingFactor * (transformedPoints[3].y-transformedPoints[1].y);


        for (let kk = 0; kk < 4; kk++) {


            xt1 =  transformedPoints[kk].x;
            xt2 =  transformedPoints[(kk + 1) % 4].x;
            yt1 =  transformedPoints[kk].y;
            yt2 =  transformedPoints[(kk + 1) % 4].y;


            let dxg = xg2 - xg1;
            let dyg = yg2 - yg1;
            let dxt12 = xt2 - xt1;
            let dyt12 = yt2 - yt1;


            if( dxg > epsilon)
            {
                alpha = (yg1 - yt1 + (dyg / dxg) * (xt1 - xg1)) / (dyt12 - ((dxt12 * dyg) / dxg));
                lambda = (xt1 + ((yg1 - yt1 + (dyg / dxg) * (xt1 - xg1)) / (dyt12 - ((dxt12 * dyg) / dxg))) * dxt12 - xg1) / dxg;

            }

            else{
                alpha = (xg1 - xt1 + (dxg / dyg) * (yt1 - yg1)) / (dxt12 - ((dyt12 * dxg) / dyg));
                lambda = (yt1 + ((xg1 - xt1 + (dxg / dyg) * (yt1 - yg1)) / (dxt12 - ((dyt12 * dxg) / dyg))) * dyt12 - yg1) / dyg;

            }


            if (epsilon <= lambda && lambda <= 1 && epsilon <= alpha && alpha <= 1) {
                lambdas.push(lambda);
            }
        }
    }
    if(lambdas.length > 1){lambdas =  lambdas.sort(function(a, b) {return a - b;});}
    return lambdas;
}


function getMittelpunktsabstand(trapez) {
    let midpointSectorMoved = new fabric.Point(trapez.left, trapez.top);
    let midpointSectorStatic;
    let distanceMidPoints;
    for (let ii = 0; ii < 4; ii++) {
        let sec_idx = trapez.parent.neighbourhood[ii];


        if (sec_idx > -1) {
            midpointSectorStatic = new fabric.Point(sectors[sec_idx].trapez.left, sectors[sec_idx].trapez.top);
            distanceMidPoints = distance(midpointSectorMoved, midpointSectorStatic);
        }
    }
}

function overlapControll(trapez) {
    let transformMatrix = trapez.calcTransformMatrix('True');
    let transformedPoints = [{x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}];
    let overlap = false;
    let paddingOverlap = false;
    for (let ii = 0; ii < 4; ii++) {
        transformedPoints[ii].x = trapez.points[ii].x - trapez.width / 2;
        transformedPoints[ii].y = trapez.points[ii].y - trapez.height / 2;
        transformedPoints[ii] = fabric.util.transformPoint(transformedPoints[ii], transformMatrix);
    }

    for (let ii = 0; ii < 4; ii++) {
        xg1 = transformedPoints[ii].x;
        xg2 = transformedPoints[(ii + 1) % 4].x;
        yg1 = transformedPoints[ii].y;
        yg2 = transformedPoints[(ii + 1) % 4].y;

        let kantenMittelpunkt = new fabric.Point(xg1 + (xg2 - xg1) / 2, yg1 + (yg2 - yg1) / 2);

        overlapParameter = getSchnittpunktsparameterPadding(sectors, [xg1, yg1, xg2, yg2]);

        for (let jj = 0; jj < overlapParameter.length; jj++)
            if (overlapParameter[jj] > 0.1 && overlapParameter[jj] < 0.979999999999999999999) {
                overlap = true;
            }

        for (let jj = 0; jj < sectors.length; jj++) {

            if(jj == trapez.parent.ID) {
                continue
            }
            else {
                if(paddingContainsPoint(sectors[jj].trapez, kantenMittelpunkt)){
                    paddingOverlap = true;
                }
            }
        }

    }

    if (overlap == true || paddingOverlap == true) {
        //trapez.fill = 'red';
        trapez.opacity = 0.5;
    }
    if (overlap == false && paddingOverlap == false) {
        //trapez.fill = 'white';
        trapez.opacity = 1.0;
    }

}

function positionSectors() {
    for (let ii = 0; ii < sectors.length; ii++){
        sectors[ii].trapez.top = sectors[ii].pos_y;
        sectors[ii].trapez.left = sectors[ii].pos_x;
        sectors[ii].trapez.rotate(sectors[ii].sector_angle);
       // sectors[ii].trapez.angle = ;
        updateMinions(sectors[ii].trapez);
    }
}

//Reset-Button der Geodäten; ordnet zudem die Sektoren in ihrer Startposition wieder an
function removeLines() {
    geodesics = [];
    for( let ii=0;ii<sectors.length;ii++){
        sectors[ii].lineSegments = [];
    }

    let objects = canvas.getObjects('line');
    for (let ii=0; ii<objects.length;ii++) {
        canvas.remove(objects[ii]);
    }
    resetSectors();
    startGeodesics();
    canvas.renderAll()
}


//Reset-Button-Sectors
function resetSectors() {

    canvas.discardActiveObject();
    canvas.renderAll();
    for (let rr = 0; rr < sectors.length; rr++){
        sectors[rr].trapez.left = sec_posx[rr] * scaleFacotor + window.innerWidth/2;
        sectors[rr].trapez.top = sec_posy[rr] * scaleFacotor + (window.innerHeight - window.innerHeight*0.08)/2;
        sectors[rr].trapez.setCoords();
        sectors[rr].trapez.angle = sec_angle[rr];
        overlapControll(sectors[rr].trapez);
        updateMinions(sectors[rr].trapez);
        updateMinions(sectors[rr].trapez);


    }
    for (let rr = 0; rr < sectors.length; rr++){
        snapping(sectors[rr].trapez);
        overlapControll(sectors[rr].trapez);

    }
    canvas.renderAll();
}

function resetZoomPan(){
    canvas.setZoom( scaleRatio);
    canvas.viewportTransform[4]= 0;
    canvas.viewportTransform[5]= 0;
}


//Anlegen der Sector-Klasse
function Sector() {
    this.trapez; //Anlegen der Variablen trapez, undefiniert, um mehr als eines anlegen zu können

    this.sector_top ;
    this.sector_bottom;
    this.offset_x;
    this.pos_x;
    this.pos_y;
    this.sector_height;
    this.sector_width;
    this.sector_angle;
    this.name;
    this.ID;
    this.fill;

    this.init = initializeSectors; // das Objekt Sektor bekommt die Methode 'initializeSectors' mitgegeben, keine Klammern


    this.lineSegments = [];
    this.markCircles = [];

    this.ID_text;
    //Nachbarschaftsbeziehung (Indizes der benachbarten Sektoren; top, right , bottom, left)
    this.neighbourhood = [-1,-1,-1,-1];
    this.snapStatus = [0,0,0,0];
    this.overlapStatus = [0,0,0,0];
}




function sectorContainsPoint(trapez,segmentMittelpunkt) {
    let isPointInsideSectors = false;
    //
    if (trapez.containsPoint(segmentMittelpunkt, undefined, 'absolute: false' )) {
        //Nach Überprüfen der bounding box prüfen ob tatsächlich innerhalb des Polygons
        //Dazu berechnen der relativen Position (links-/rechtsorientiert zu den Sektorkanten)
        //Wenn zu allen Kanten rechtsorientiert (d. h. beta > 0) dann innerhalb des Polygons
        isPointInsideSectors = true;
        let transformMatrix = trapez.calcTransformMatrix('True');
        let transformedPoints = [{x:0.0,y:0.0},{x:0.0,y:0.0},{x:0.0,y:0.0},{x:0.0,y:0.0}];
        for(let ll=0;ll<4;ll++){
            transformedPoints[ll].x = trapez.points[ll].x - trapez.width/2;
            transformedPoints[ll].y = trapez.points[ll].y - trapez.height/2;
            transformedPoints[ll] = fabric.util.transformPoint(transformedPoints[ll],transformMatrix);
        }
        for (let kk = 0; kk < 4; kk++) {



            let xt1 =  transformedPoints[kk].x;
            let xt2 =  transformedPoints[(kk + 1) % 4].x;
            let yt1 =  transformedPoints[kk].y;
            let yt2 =  transformedPoints[(kk + 1) % 4].y;


            let dxt12 = xt2 - xt1;
            let dyt12 = yt2 - yt1;


            let dxw = xt1 - xt2;
            let dyw = yt2 - yt1;
            let xp = segmentMittelpunkt.x;
            let yp = segmentMittelpunkt.y;


            let beta;
            if (Math.abs(dyw) > epsilon) {

                let gamma = (yp - yt1 + ((xt1 - xp) * dxw) / dyw) / (dyt12 - (dxt12 * dxw) / dyw);
                beta = ((xt1 - xp) / dyw) + (dxt12 / dyw) * gamma;
            }

            else {
                let gamma = (xp - xt1 + ((yt1 - yp) * dyw) / dxw) / (dxt12 - (dyt12 * dyw) / dxw);
                beta = ((yt1 - yp) / dxw) + (dyt12 / dxw) * gamma;
            }
            if (beta < 0.0){
                isPointInsideSectors = false;
            }

        }

    }
    return isPointInsideSectors;
}

function setSectors() {

    //resetSectors();

    //Idee: Cursor über Geodätenende bewegen: Ähnlich zur automatischen Vervollständigung soll die Geodäte von Sektor zu Sektor verlaufen
    //dabei sollen die entsprechenden Kanten ermittelt werden. An diesen Kanten sollen die Sektoren anschließend zusammenschnappen

    let lambda;
    let alpha = 0.0;
    let kantenIndex = -1;
    let geodesicsIndex = -1;

    let xt1;
    let xt2;
    let yt1;
    let yt2;

    let dxg;
    let dyg;
    let dxt12;
    let dyt12;

    let slopeGeodesic;
    let slopeTrapez;
    let slopeAngle;

    let nextGeodesic_x;
    let nextGeodesic_y;

    let point_1_local;
    let point_2_local;


    kantenindex = -1;

    if (typeof arrowheadline === 'undefined') {
        return;
    }else {

        if ( geodesics[arrowheadline].length > 0) {


            let geodesic_end_point = new fabric.Point(geodesics[arrowheadline][0].calcLinePoints().x2, geodesics[arrowheadline][0].calcLinePoints().y2);
            geodesic_end_point = fabric.util.transformPoint(geodesic_end_point, geodesics[arrowheadline][0].calcTransformMatrix());

            let xg2 = geodesic_end_point.x;
            let yg2 = geodesic_end_point.y;

            let geodesic_start_point = new fabric.Point(geodesics[arrowheadline][0].calcLinePoints().x1, geodesics[arrowheadline][0].calcLinePoints().y1);
            geodesic_start_point = fabric.util.transformPoint(geodesic_start_point, geodesics[arrowheadline][0].calcTransformMatrix());

            let xg1 = geodesic_start_point.x;
            let yg1 = geodesic_start_point.y;

            //Umrechnung der lokalen in globale Koordinaten
            let transformMatrix = sectors[geodesics[arrowheadline][0].parentSector[0]].trapez.calcTransformMatrix('True');
            let transformedPoints = [{x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}];
            for (let jj = 0; jj < 4; jj++) {
                transformedPoints[jj].x = sectors[geodesics[arrowheadline][0].parentSector[0]].trapez.points[jj].x - sectors[geodesics[arrowheadline][0].parentSector[0]].trapez.width / 2;
                transformedPoints[jj].y = sectors[geodesics[arrowheadline][0].parentSector[0]].trapez.points[jj].y - sectors[geodesics[arrowheadline][0].parentSector[0]].trapez.height / 2;
                transformedPoints[jj] = fabric.util.transformPoint(transformedPoints[jj], transformMatrix);
            }




            for (let kk = 0; kk < 4; kk++) {

                xt1 = transformedPoints[kk].x;
                xt2 = transformedPoints[(kk + 1) % 4].x;
                yt1 = transformedPoints[kk].y;
                yt2 = transformedPoints[(kk + 1) % 4].y;

                dxg = xg2 - xg1;
                dyg = yg2 - yg1;
                dxt12 = xt2 - xt1;
                dyt12 = yt2 - yt1;

                slopeGeodesic = dyg / dxg;
                slopeTrapez = dyt12 / dxt12;


                if (dxg > epsilon) {
                    alpha = (yg2 - yt1 + (dyg / dxg) * (xt1 - xg2)) / (dyt12 - ((dxt12 * dyg) / dxg));
                    lambda = (xt1 + ((yg2 - yt1 + (dyg / dxg) * (xt1 - xg2)) / (dyt12 - ((dxt12 * dyg) / dxg))) * dxt12 - xg2) / dxg;
                }

                else {
                    alpha = (xg2 - xt1 + (dxg / dyg) * (yt1 - yg2)) / (dxt12 - ((dyt12 * dxg) / dyg));
                    lambda = (yt1 + ((xg2 - xt1 + (dxg / dyg) * (yt1 - yg2)) / (dxt12 - ((dyt12 * dxg) / dyg))) * dyt12 - yg2) / dyg;
                }


                if (lambda > epsilon) {
                    if (alpha >= 0.0 && alpha <= 1.0) {
                        kantenIndex = kk;
                        break;
                    }
                }


            }



            let neighbourSector = sectors[geodesics[arrowheadline][0].parentSector[0]].neighbourhood[kantenIndex];


            if (kantenIndex >= 0) {





                //Fortsetzung im nächsten Sektor


                slopeAngle = Math.acos((dxg * dxt12 + dyg * dyt12) / ((Math.sqrt(dxg * dxg + dyg * dyg)) * (Math.sqrt(dxt12 * dxt12 + dyt12 * dyt12))));


                for (lauf = 0; lauf < 100; lauf++) {

                    if (neighbourSector === -1) {

                        break
                    }



                    //Punkte des Nachbarsektors ermitteln
                    let transformMatrix = sectors[neighbourSector].trapez.calcTransformMatrix('True');
                    let transformedPoints = [{x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}];
                    for (let jj = 0; jj < 4; jj++) {
                        transformedPoints[jj].x = sectors[neighbourSector].trapez.points[jj].x - sectors[neighbourSector].trapez.width / 2;
                        transformedPoints[jj].y = sectors[neighbourSector].trapez.points[jj].y - sectors[neighbourSector].trapez.height / 2;
                        transformedPoints[jj] = fabric.util.transformPoint(transformedPoints[jj], transformMatrix);
                    }

                    point_1_local = new fabric.Point(sectors[neighbourSector].trapez.points[(kantenIndex + 3) % 4].x - sectors[neighbourSector].trapez.width / 2,
                        sectors[neighbourSector].trapez.points[(kantenIndex + 3) % 4].y - sectors[neighbourSector].trapez.height / 2);

                    point_2_local = new fabric.Point(sectors[neighbourSector].trapez.points[(kantenIndex + 2) % 4].x - sectors[neighbourSector].trapez.width / 2,
                        sectors[neighbourSector].trapez.points[(kantenIndex + 2) % 4].y - sectors[neighbourSector].trapez.height / 2);

                    //console.log(sectors[neighbourSector].ID, transformedPoints);

                    //Übergangspunkte übernehmen
                    xt1_uebergang = transformedPoints[(kantenIndex + 3) % 4].x;
                    xt2_uebergang = transformedPoints[(kantenIndex + 2) % 4].x;
                    yt1_uebergang = transformedPoints[(kantenIndex + 3) % 4].y;
                    yt2_uebergang = transformedPoints[(kantenIndex + 2) % 4].y;

                    dxt12_uebergang = xt2_uebergang - xt1_uebergang;
                    dyt12_uebergang = yt2_uebergang - yt1_uebergang;

                    x_kante_uebergang = xt1_uebergang + alpha * dxt12_uebergang;
                    y_kante_uebergang = yt1_uebergang + alpha * dyt12_uebergang;

                    //Übergangsrichtung ermitteln

                    dxg = nextGeodesic_x = dxt12_uebergang * Math.cos(-slopeAngle) - dyt12_uebergang * Math.sin(-slopeAngle);
                    dyg = nextGeodesic_y = dxt12_uebergang * Math.sin(-slopeAngle) + dyt12_uebergang * Math.cos(-slopeAngle);




                    //Noch: Eingefügte Kreise und Linien helfen die notwendigen Wege und entfernungen zu finden
                    /*
                    canvas.add(new fabric.Line([xt1, yt1, xt1_uebergang, yt1_uebergang], { stroke: 'black'}));
                    canvas.add(new fabric.Line([xt2, yt2, xt2_uebergang, yt2_uebergang], { stroke: 'black'}));

                    canvas.add(new fabric.Circle({ radius: 5, fill: 'yellow', top: yt1_uebergang, left: xt1_uebergang , originY: 'center', originX: 'center'}));
                    canvas.add(new fabric.Circle({ radius: 5, fill: 'yellow', top: yt2_uebergang, left: xt2_uebergang , originY: 'center', originX: 'center'}));

                    canvas.add(new fabric.Circle({ radius: 5, fill: '#f55', top: yt1, left: xt1 , originY: 'center', originX: 'center'}));
                    canvas.add(new fabric.Circle({ radius: 5, fill: '#f55', top: yt2, left: xt2 , originY: 'center', originX: 'center'}));
                    */

                    //point_1/2 gehören zum zu setzenden Trapez ()
                    //point_a/b gehören zum unbewegten Trapez

                    point_1 = new fabric.Point(xt1_uebergang, yt1_uebergang);
                    point_2 = new fabric.Point(xt2_uebergang, yt2_uebergang);
                    point_a = new fabric.Point(xt1, yt1);
                    point_b = new fabric.Point(xt2, yt2);

                    //canvas.add(new fabric.Circle({ radius: 5, fill: 'yellow', top: point_1.y, left: point_1.x , originY: 'center', originX: 'center'}));
                    //canvas.add(new fabric.Circle({ radius: 5, fill: 'yellow', top: point_2.y, left: point_2.x , originY: 'center', originX: 'center'}));

                    //canvas.add(new fabric.Circle({ radius: 5, fill: 'red', top: point_a.y, left: point_a.x , originY: 'center', originX: 'center'}));
                    //canvas.add(new fabric.Circle({ radius: 5, fill: 'red', top: point_b.y, left: point_b.x , originY: 'center', originX: 'center'}));

                    //canvas.add(new fabric.Circle({ radius: 5, fill: 'yellow', top: point_1.y, left: point_1.x , originY: 'center', originX: 'center'}));
                    //canvas.add(new fabric.Circle({ radius: 5, fill: 'yellow', top: point_2.y, left: point_2.x , originY: 'center', originX: 'center'}));


                    dist_1a = distance(point_1, point_a);
                    dist_2b = distance(point_2, point_b);




                    //Bestimmung des kleineren Abstands -> legt den Translation und Rotation fest
                    if (dist_1a <= dist_2b) {
                        // Rotation und Translation zu Punkt a des ruhenden Sektors, d.h. Startpunkt der Snap-Kante
                        translation = new fabric.Point(point_a.x - point_1.x, point_a.y - point_1.y);
                        let kathete = distance(point_a, point_b);
                        let gegenkath = distance(new fabric.Point(point_2.x + translation.x, point_2.y + translation.y), point_b);
                        alpha = -Math.acos((2 * Math.pow(kathete, 2) - Math.pow(gegenkath, 2)) / (2 * Math.pow(kathete, 2)));
                        if (Math.atan2(point_2.y - point_1.y, point_2.x - point_1.x) < Math.atan2(point_b.y - point_a.y, point_b.x - point_a.x)) {
                            alpha = -alpha;
                        }

                        let angle2 = Math.atan2(point_1_local.y, point_1_local.x);
                        angle3 = (2 * angle2 - alpha - Math.PI) / 2.0;
                        let pdist_sq = Math.pow(point_1_local.x, 2) + Math.pow(point_1_local.y, 2);
                        displacement = Math.sqrt(2 * pdist_sq * (1 - Math.cos(-alpha)));


                    } else if (dist_1a > dist_2b) {
                        // Rotation und Translation zu Punkt b des ruhenden Sektors, d.h. Endpunkt der Snap-Kante
                        translation = new fabric.Point(point_b.x - point_2.x, point_b.y - point_2.y);
                        let kathete = distance(point_a, point_b);
                        let gegenkath = distance(new fabric.Point(point_1.x + translation.x, point_1.y + translation.y), point_a);
                        alpha = Math.acos((2 * Math.pow(kathete, 2) - Math.pow(gegenkath, 2)) / (2 * Math.pow(kathete, 2)));
                        if (Math.atan2(point_1.y - point_2.y, point_1.x - point_2.x) > Math.atan2(point_a.y - point_b.y, point_a.x - point_b.x)) {
                            alpha = -alpha;
                        }

                        let angle2 = Math.atan2(point_2_local.y, point_2_local.x);
                        angle3 = (2 * angle2 + alpha - Math.PI) / 2.0;
                        let pdist_sq = Math.pow(point_2_local.x, 2) + Math.pow(point_2_local.y, 2);
                        displacement = Math.sqrt(2 * pdist_sq * (1 - Math.cos(alpha)));

                    }

                    sectors[neighbourSector].trapez.left += displacement * Math.sin(angle3) + translation.x;
                    sectors[neighbourSector].trapez.top += displacement * Math.cos(angle3) + translation.y;
                    sectors[neighbourSector].trapez.rotate(sectors[neighbourSector].trapez.angle + alpha / Math.PI * 180);



                    //console.log('nachbar:', neighbourSector);

                    /*

                    let dist_xt1_und_xt1_uebergang = xt1 - xt1_uebergang;
                    let dist_yt1_und_yt1_uebergang = yt1 - yt1_uebergang;
                    let dist_xt2_und_xt2_uebergang = xt2 - xt2_uebergang;
                    let dist_yt2_und_yt2_uebergang = yt2 - yt2_uebergang;




                    let dist_x_max;
                    let dist_y_max;

                    if (Math.abs(dist_xt1_und_xt1_uebergang) > Math.abs(dist_xt2_und_xt2_uebergang)) {
                        dist_x_max = dist_xt1_und_xt1_uebergang;
                        dist_y_max = dist_yt1_und_yt1_uebergang;
                        //console.log('xt1', dist_x_max)
                    }else {
                        dist_x_max = dist_xt2_und_xt2_uebergang;
                        dist_y_max = dist_yt2_und_yt2_uebergang;
                        //console.log('xt2', dist_x_max)

                    }


                    if (Math.abs(dist_yt1_und_yt1_uebergang) > Math.abs(dist_yt2_und_yt2_uebergang)) {
                        dist_y_max = dist_yt1_und_yt1_uebergang;
                        //console.log('yt1', dist_y_max)
                    }else {
                        dist_y_max = dist_yt2_und_yt2_uebergang;
                        //console.log('yt2', dist_y_max)
                    }


                    //console.log('left Sektor:', neighbourSector + 1, sectors[neighbourSector].trapez.left);
                    //console.log('top Sektor:', neighbourSector + 1, sectors[neighbourSector].trapez.top);

                    sectors[neighbourSector].trapez.left += dist_x_max;
                    sectors[neighbourSector].trapez.top += dist_y_max;

                    */



                    updateMinions(sectors[neighbourSector].trapez);


                   //snapping(sectors[neighbourSector].trapez);


                    sectors[neighbourSector].trapez.setCoords();



                    //Schnittpunkte mit den neuen Sektorkanten ermitteln


                    for (let kk = 0; kk < 4; kk++) {

                        xt1 = transformedPoints[kk].x;
                        xt2 = transformedPoints[(kk + 1) % 4].x;
                        yt1 = transformedPoints[kk].y;
                        yt2 = transformedPoints[(kk + 1) % 4].y;

                        dxt12 = xt2 - xt1;
                        dyt12 = yt2 - yt1;


                        if (dxg > epsilon) {
                            alpha_2 = (y_kante_uebergang - yt1 + (dyg / dxg) * (xt1 - x_kante_uebergang)) / (dyt12 - ((dxt12 * dyg) / dxg));
                            lambda_2 = (xt1 + ((y_kante_uebergang - yt1 + (dyg / dxg) * (xt1 - x_kante_uebergang)) / (dyt12 - ((dxt12 * dyg) / dxg))) * dxt12 - x_kante_uebergang) / dxg;
                        }

                        else {
                            alpha_2 = (x_kante_uebergang - xt1 + (dxg / dyg) * (yt1 - y_kante_uebergang)) / (dxt12 - ((dyt12 * dxg) / dyg));
                            lambda_2 = (yt1 + ((x_kante_uebergang - xt1 + (dxg / dyg) * (yt1 - y_kante_uebergang)) / (dxt12 - ((dyt12 * dxg) / dyg))) * dyt12 - y_kante_uebergang) / dyg;
                        }


                        if (lambda_2 > epsilon) {
                            if (alpha_2 >= 0.0 && alpha_2 <= 1.0) {
                                kantenIndex = kk;
                                break;
                            }
                        }
                    }



                    slopeAngle = Math.acos((dxg * dxt12 + dyg * dyt12) / ((Math.sqrt(dxg * dxg + dyg * dyg)) * (Math.sqrt(dxt12 * dxt12 + dyt12 * dyt12))));

                    //canvas.add(new fabric.Circle({ radius: 5, fill: 'green', top: yt1, left: xt1 , originY: 'center', originX: 'center'}));
                    //canvas.add(new fabric.Circle({ radius: 5, fill: 'green', top: yt2, left: xt2 , originY: 'center', originX: 'center'}));






                    console.log("nächste Iteration",lauf+1);
                    transformMatrix = sectors[neighbourSector].trapez.calcTransformMatrix('True');
                    transformedPoints = [{x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}];
                    for (let jj = 0; jj < 4; jj++) {
                        transformedPoints[jj].x = sectors[neighbourSector].trapez.points[jj].x - sectors[neighbourSector].trapez.width / 2;
                        transformedPoints[jj].y = sectors[neighbourSector].trapez.points[jj].y - sectors[neighbourSector].trapez.height / 2;
                        transformedPoints[jj] = fabric.util.transformPoint(transformedPoints[jj], transformMatrix);
                    }

                    xt1 = transformedPoints[kantenIndex].x;
                    xt2 = transformedPoints[(kantenIndex + 1) % 4].x;
                    yt1 = transformedPoints[kantenIndex].y;
                    yt2 = transformedPoints[(kantenIndex + 1) % 4].y;




                    neighbourSector = sectors[neighbourSector].neighbourhood[kantenIndex];


                    alpha = alpha_2;





                }

            }


        }

    }
}

function paddingContainsPoint(trapez,segmentMittelpunkt) {
    let isPointInsideSectors = false;
    //
    if (trapez.containsPoint(segmentMittelpunkt, undefined, 'absolute: false' )) {
        //Nach Überprüfen der bounding box prüfen ob tatsächlich innerhalb des Polygons
        //Dazu berechnen der relativen Position (links-/rechtsorientiert zu den Sektorkanten)
        //Wenn zu allen Kanten rechtsorientiert (d. h. beta > 0) dann innerhalb des Polygons
        isPointInsideSectors = true;
        let transformMatrix = trapez.calcTransformMatrix('True');
        let transformedPoints = [{x:0.0,y:0.0},{x:0.0,y:0.0},{x:0.0,y:0.0},{x:0.0,y:0.0}];
        for(let ll=0;ll<4;ll++){
            transformedPoints[ll].x = trapez.points[ll].x - trapez.width/2;
            transformedPoints[ll].y = trapez.points[ll].y - trapez.height/2;
            transformedPoints[ll] = fabric.util.transformPoint(transformedPoints[ll],transformMatrix);
        }

        //Die folgenden Zeilen versetzen die zu verwendenden Eckpunkte des Trapzes nach Innen (bilden eines Padding)
        transformedPoints[0].x = transformedPoints[0].x + paddingFactor * (transformedPoints[2].x-transformedPoints[0].x);
        transformedPoints[0].y = transformedPoints[0].y + paddingFactor * (transformedPoints[2].y-transformedPoints[0].y);

        transformedPoints[2].x = transformedPoints[2].x - paddingFactor * (transformedPoints[2].x-transformedPoints[0].x);
        transformedPoints[2].y = transformedPoints[2].y - paddingFactor * (transformedPoints[2].y-transformedPoints[0].y);

        transformedPoints[1].x = transformedPoints[1].x + paddingFactor * (transformedPoints[3].x-transformedPoints[1].x);
        transformedPoints[1].y = transformedPoints[1].y + paddingFactor * (transformedPoints[3].y-transformedPoints[1].y);

        transformedPoints[3].x = transformedPoints[3].x - paddingFactor * (transformedPoints[3].x-transformedPoints[1].x);
        transformedPoints[3].y = transformedPoints[3].y - paddingFactor * (transformedPoints[3].y-transformedPoints[1].y);




        for (let kk = 0; kk < 4; kk++) {

            let xt1 =  transformedPoints[kk].x;
            let xt2 =  transformedPoints[(kk + 1) % 4].x;
            let yt1 =  transformedPoints[kk].y;
            let yt2 =  transformedPoints[(kk + 1) % 4].y;

            /*let object = new fabric.Circle({
                radius: 5,
                fill: 'blue',
                left: xt1,
                top: yt1,
                originX: 'center',
                originY: 'center'
            });
            canvas.add(object);

            let object2 = new fabric.Circle({
                radius: 5,
                fill: 'red',
                left: xt2,
                top: yt2,
                originX: 'center',
                originY: 'center'
            });
            canvas.add(object2); */



            let dxt12 = xt2 - xt1;
            let dyt12 = yt2 - yt1;


            let dxw = xt1 - xt2;
            let dyw = yt2 - yt1;
            let xp = segmentMittelpunkt.x;
            let yp = segmentMittelpunkt.y;


            let beta;
            if (Math.abs(dyw) > epsilon) {

                let gamma = (yp - yt1 + ((xt1 - xp) * dxw) / dyw) / (dyt12 - (dxt12 * dxw) / dyw);
                beta = ((xt1 - xp) / dyw) + (dxt12 / dyw) * gamma;
            }

            else {
                let gamma = (xp - xt1 + ((yt1 - yp) * dyw) / dxw) / (dxt12 - (dyt12 * dyw) / dxw);
                beta = ((yt1 - yp) / dxw) + (dyt12 / dxw) * gamma;
            }

            if (beta < 0.0){
                isPointInsideSectors = false;
            }

            xt1 =  transformedPoints[kk].x;
            xt2 =  transformedPoints[(kk + 1) % 4].x;
            yt1 =  transformedPoints[kk].y;
            yt2 =  transformedPoints[(kk + 1) % 4].y;

        }

    }
    return isPointInsideSectors;
}



//snapping prüft für alle gültigen Nachbarn den Abstand bestimmter Eckpunktpaare
// -> falls kleiner als Snap_radius_sector entsprechende Translation und Rotation
function snapping(trapez) {
    for (let ii = 0; ii < 4; ii++){
        let midpointSectorMoved = new fabric.Point(trapez.left, trapez.top);
        let midpointSectorStatic;
        let distanceMidPoints;
        let dist_1a;
        let dist_2b;

        let sec_idx = trapez.parent.neighbourhood[ii];
        if(sec_idx > -1){
            midpointSectorStatic = new fabric.Point(sectors[sec_idx].trapez.left, sectors[sec_idx].trapez.top);
            distanceMidPoints = distance(midpointSectorMoved, midpointSectorStatic);

            let transformMatrix;
            let point_1_local;
            let point_2_local;
            let point_1;
            let point_2;
            let point_a;
            let point_b;


            if(distanceMidPoints <= trapez.aussenkreisradius + sectors[sec_idx].trapez.aussenkreisradius) {

                transformMatrix = trapez.calcTransformMatrix();
                //point_1/2 gehören zum bewegten Trapez
                point_1_local = new fabric.Point(trapez.points[ii].x - trapez.width / 2,
                    trapez.points[ii].y - trapez.height / 2);

                point_2_local = new fabric.Point(trapez.points[(ii + 1) % 4].x - trapez.width / 2,
                    trapez.points[(ii + 1) % 4].y - trapez.height / 2);

                point_1 = fabric.util.transformPoint(point_1_local, transformMatrix);

                point_2 = fabric.util.transformPoint(point_2_local, transformMatrix);

                transformMatrix = sectors[sec_idx].trapez.calcTransformMatrix();

                //point_a/b gehören zum unbewegten Trapez (der zu überprüfenden Nachbarn)
                point_a = new fabric.Point(sectors[sec_idx].trapez.points[(ii + 3) % 4].x - sectors[sec_idx].trapez.width / 2,
                    sectors[sec_idx].trapez.points[(ii + 3) % 4].y - sectors[sec_idx].trapez.height / 2);

                point_b = new fabric.Point(sectors[sec_idx].trapez.points[(ii + 2) % 4].x - sectors[sec_idx].trapez.width / 2,
                    sectors[sec_idx].trapez.points[(ii + 2) % 4].y - sectors[sec_idx].trapez.height / 2);

                point_a = fabric.util.transformPoint(point_a, transformMatrix);
                point_b = fabric.util.transformPoint(point_b, transformMatrix);

                dist_1a = distance(point_1, point_a);
                dist_2b = distance(point_2, point_b);
            }else{
                dist_1a = snap_radius_sectors +1;
                dist_2b = snap_radius_sectors +1;
            }

            let translation;
            let alpha;
            let angle3;
            let displacement;

            if (dist_1a < snap_radius_sectors && dist_2b < snap_radius_sectors) {
                //Bestimmung des kleineren Abstands -> legt den Translation und Rotation fest
                if (dist_1a <= dist_2b) {
                    // Rotation und Translation zu Punkt a des ruhenden Sektors, d.h. Startpunkt der Snap-Kante
                    translation = new fabric.Point(point_a.x - point_1.x, point_a.y - point_1.y);
                    let kathete = distance(point_a, point_b);
                    let gegenkath = distance(new fabric.Point(point_2.x + translation.x, point_2.y + translation.y), point_b);
                    alpha = -Math.acos((2 * Math.pow(kathete, 2) - Math.pow(gegenkath, 2)) / (2 * Math.pow(kathete, 2)));
                    if (Math.atan2(point_2.y - point_1.y, point_2.x - point_1.x) < Math.atan2(point_b.y - point_a.y, point_b.x - point_a.x)) {
                        alpha = -alpha;
                    }

                    let angle2 = Math.atan2(point_1_local.y, point_1_local.x);
                    angle3 = (2 * angle2 - alpha - Math.PI) / 2.0;
                    let pdist_sq = Math.pow(point_1_local.x, 2) + Math.pow(point_1_local.y, 2);
                    displacement = Math.sqrt(2 * pdist_sq * (1 - Math.cos(-alpha)));


                } else if (dist_1a > dist_2b) {
                    // Rotation und Translation zu Punkt b des ruhenden Sektors, d.h. Endpunkt der Snap-Kante
                    translation = new fabric.Point(point_b.x - point_2.x, point_b.y - point_2.y);
                    let kathete = distance(point_a, point_b);
                    let gegenkath = distance(new fabric.Point(point_1.x + translation.x, point_1.y + translation.y), point_a);
                    alpha = Math.acos((2 * Math.pow(kathete, 2) - Math.pow(gegenkath, 2)) / (2 * Math.pow(kathete, 2)));
                    if (Math.atan2(point_1.y - point_2.y, point_1.x - point_2.x) > Math.atan2(point_a.y - point_b.y, point_a.x - point_b.x)) {
                        alpha = -alpha;
                    }

                    let angle2 = Math.atan2(point_2_local.y, point_2_local.x);
                    angle3 = (2 * angle2 + alpha - Math.PI) / 2.0;
                    let pdist_sq = Math.pow(point_2_local.x, 2) + Math.pow(point_2_local.y, 2);
                    displacement = Math.sqrt(2 * pdist_sq * (1 - Math.cos(alpha)));

                }

                trapez.left += displacement * Math.sin(angle3) + translation.x;
                trapez.top += displacement * Math.cos(angle3) + translation.y;
                trapez.rotate(trapez.angle + alpha / Math.PI * 180);


                for (let jj = 0; jj < 4; jj++) {
                    if (sectors[sec_idx].neighbourhood[jj] === trapez.parent.ID) {
                        sectors[sec_idx].snapStatus[jj] = 1;
                    }
                }
                trapez.parent.snapStatus[ii] = 1;
                sectors[sec_idx].trapez.stroke = 'green';
                trapez.stroke = 'green';


            } else {
                for (let jj = 0; jj < 4; jj++) {
                    if (sectors[sec_idx].neighbourhood[jj] === trapez.parent.ID) {

                        sectors[sec_idx].snapStatus[jj] = 0;

                    }
                }
                trapez.parent.snapStatus[ii] = 0;

                if (sectors[sec_idx].snapStatus.every(function (element) {
                    return element === 0;
                })) {
                    sectors[sec_idx].trapez.stroke = '#666';
                }
                if (trapez.parent.snapStatus.every(function (element) {
                    return element === 0;
                })) {
                    trapez.stroke = '#666';
                }
            }



            trapez.setCoords();
            //canvas.renderAll();
        }
    }
}


//Achtung! Die Liniensegmente der Startgeodäten können nicht gelöscht werden, weil sie keine gültige ID tragen
function startGeodesics(){
    let sec = sectors[startSector];


    for (let ii = 0; ii < x_Start.length; ii++) {
        let line = new fabric.Line([x_Start[ii] * scaleFacotor + window.innerWidth/2, y_Start[ii] * scaleFacotor + (window.innerHeight-window.innerHeight*0.08)/2 , x_End[ii] * scaleFacotor + window.innerWidth/2, y_End[ii] * scaleFacotor + (window.innerHeight-window.innerHeight*0.08)/2 ], {
            strokeWidth: startStrokeWidth[ii] * scaleFacotor,
            fill: startFill[ii],
            stroke: startStroke[ii],
            originX: 'center',
            originY: 'center',
            perPixelTargetFind: true,
            objectCaching: false,
            hasBorders: false,
            hasControls: false,
            evented: false,
            selectable: false,
        });
        line.parentSector = startParentSector[ii];
        line.ID = startLineID[ii];
        let trapezTransform = sec.trapez.calcTransformMatrix();
        let invertedtrapezTransform = invert(trapezTransform);
        let desiredTransform = multiply(
            invertedtrapezTransform,
            line.calcTransformMatrix());


        line.relationship = desiredTransform;

        sec.lineSegments.push(line);
        geodesics.push([line]);
        let stackidx = canvas.getObjects().indexOf(sectors[line.parentSector[0]].ID_text);
        canvas.insertAt(line, stackidx);


    }
}

//Bestimmt die Sektorzugehörigkeit der Liniensegmente einer Geodäte über Mittelpunkte
function testLocation(lambdas, [xg1,yg1,xg2,yg2]) {

    let lineOverCanvas = [true];
    for(let ii = 1; ii < lambdas.length-1; ii++)
    {
        if (Math.abs(lambdas[ii] - lambdas[ii + 1])>epsilon){
            let lambdaMittelwert = (lambdas[ii] + lambdas[ii+1])/2;


            let segmentMittelpunkt = new fabric.Point((xg1 + lambdaMittelwert * (xg2 - xg1)),(yg1 + lambdaMittelwert * (yg2 - yg1)));


            let isPointInsideSectors = false;

            for(let jj = 0; jj < sectors.length; jj++){
                isPointInsideSectors = sectorContainsPoint(sectors[jj].trapez,segmentMittelpunkt);
                if (isPointInsideSectors) {
                    break;
                }
            }

            lineOverCanvas.push(isPointInsideSectors);

            segmentMittelpunkt = null;
        }
    }
    return lineOverCanvas;
}




//Werkzeugsänderung über die Button der Internetseite
function toolChange(argument) {
    //selectedTool = document.getElementById("tool").value;
    canvas.discardActiveObject();
    canvas.renderAll();

    selectedTool = argument;
    if (selectedTool !== 'delete') {
        for (let ii = 0; ii < geodesics.length; ii++) {

            for (let jj = 0; jj< geodesics[ii].length; jj++){
                geodesics[ii][jj].evented = false;
                geodesics[ii][jj].strokeWidth = 2 * scaleFacotor;
            }
        }

        for (let ii = 0; ii < sectors.length; ii++) {
            if (selectedTool === 'paint' || selectedTool === 'mark') {
                cursor = 'crosshair';
                sectors[ii].trapez.evented = true;
                sectors[ii].trapez.hasControls = false;
                sectors[ii].trapez.lockMovementX = true;
                sectors[ii].trapez.lockMovementY = true;

            } else {
                cursor = 'grabbing';
                sectors[ii].trapez.evented = true;
                sectors[ii].trapez.hasControls = true;
                sectors[ii].trapez.lockMovementX = false;
                sectors[ii].trapez.lockMovementY = false;
            }
            sectors[ii].trapez.hoverCursor = cursor;
            }

        if (selectedTool === 'delete_whole') {
            cursor = 'not-allowed';

            for (let ii = 0; ii < sectors.length; ii++) {
                sectors[ii].trapez.evented = false;
            }

            for (let ii = 0; ii < geodesics.length; ii++) {

                for (let jj = 0; jj < geodesics[ii].length; jj++) {
                    geodesics[ii][jj].evented = true;
                    geodesics[ii][jj].hoverCursor = 'pointer';
                    geodesics[ii][jj].strokeWidth = 5 * scaleFacotor;

                    if (typeof(geodesics[ii][jj].__eventListeners)=== 'undefined') {
                        geodesics[ii][jj].on('mousedown', function () {
                            if (this.ID[0] >= 0) {

                                let geodesicToDeleteGlobalID = this.ID[0];


                                //kk laeuft durch alle Teilstuecke der Geodaete hindurch
                                for (let kk = geodesics[geodesicToDeleteGlobalID].length -1; kk >= 0; kk--) {

                                    let entryToSplice_tmp = sectors[geodesics[geodesicToDeleteGlobalID][kk].parentSector[0]].lineSegments[geodesics[geodesicToDeleteGlobalID][kk].parentSector[1]].parentSector[1]
                                    sectors[geodesics[geodesicToDeleteGlobalID][kk].parentSector[0]].lineSegments.splice(sectors[geodesics[geodesicToDeleteGlobalID][kk].parentSector[0]].lineSegments[geodesics[geodesicToDeleteGlobalID][kk].parentSector[1]].parentSector[1], 1)

                                    for (let ll = 0; ll < sectors[geodesics[geodesicToDeleteGlobalID][kk].parentSector[0]].lineSegments.length; ll++){


                                        if (entryToSplice_tmp < sectors[geodesics[geodesicToDeleteGlobalID][kk].parentSector[0]].lineSegments[ll].parentSector[1]){
                                            sectors[geodesics[geodesicToDeleteGlobalID][kk].parentSector[0]].lineSegments[ll].parentSector[1] -=1
                                        }
                                    }
                                    let lineSegment = geodesics[geodesicToDeleteGlobalID][kk];
                                    canvas.remove(lineSegment)
                                }
                                geodesics[geodesicToDeleteGlobalID] = [];

                            }

                        })
                    }
                }
            }
        }
    }else {
        cursor = 'not-allowed';

        for (let ii = 0; ii < sectors.length; ii++) {
                sectors[ii].trapez.evented = false;
            }

        for (let ii = 0; ii< geodesics.length; ii++) {

            for (let jj = 0; jj < geodesics[ii].length; jj++){
                geodesics[ii][jj].evented = true;
                geodesics[ii][jj].hoverCursor = cursor;
                geodesics[ii][jj].strokeWidth = 2 * scaleFacotor;
            }
            if (geodesics[ii].length > 0) {
                geodesics[ii][geodesics[ii].length - 1].hoverCursor = 'pointer';
                geodesics[ii][geodesics[ii].length - 1].evented = true;
                geodesics[ii][geodesics[ii].length - 1].strokeWidth = 5 * scaleFacotor;
                if (typeof(geodesics[ii][geodesics[ii].length - 1].__eventListeners)=== 'undefined') {
                    geodesics[ii][geodesics[ii].length - 1].on('mousedown', function () {
                        if (this.ID[0] >= 0) {
                            geodesics[this.ID[0]].splice(this.ID[1], 1);
                            if (this.ID[1] === 0) {
                                geodesics[this.ID[0]] = [];
                            }
                            if (this.parentSector[0] >= 0) {
                                sectors[this.parentSector[0]].lineSegments.splice(this.parentSector[1], 1);
                            }
                            canvas.remove(this);
                        }

                        toolChange(selectedTool);
                    })
                }

            }
        }
    }
    canvas.renderAll()
}



//Zuletzt gesetzte Linie wird gelöscht
function undoLastLine(){
    if (history.length<= 0){return}
    let immediatehistory = history.pop();

    for (let jj = 0; jj < immediatehistory.length; jj++) {
        let lineID = immediatehistory[immediatehistory.length - 1 - jj];
        let lineSegment = geodesics[lineID[0]][lineID[1]];
        if(typeof(lineSegment)!=='undefined') {
            let secID = lineSegment.parentSector;
            if (secID[0] >= 0) {
                sectors[secID[0]].lineSegments.splice(secID[1], 1);
            }
            geodesics[lineID[0]].splice(lineID[1], 1);
            if (lineID[1] === 0) {
                geodesics[lineID[0]] = [];
            }
            canvas.remove(lineSegment);
        }
    }
    //if (history.length<= 0){removeLines()}

    canvas.renderAll();
}

//Mitbewegen von untergeordneten Objekten (zugehörig zu einem Parentalsektor)
function updateMinions(boss) {
    boss.bringToFront();
    if (boss.parent.ID_text.relationship) {
        boss.parent.ID_text.bringToFront();

        let relationship = boss.parent.ID_text.relationship;

        let newTransform = multiply(
            boss.calcTransformMatrix(),
            relationship
        );

        let options;
        options = fabric.util.qrDecompose(newTransform);


        boss.parent.ID_text.set({
            flipX: false,
            flipY: false,
        });

        boss.parent.ID_text.setPositionByOrigin(
            {x: options.translateX, y: options.translateY},
            'center',
            'center'
        );

        boss.parent.ID_text.set(options);
        boss.parent.ID_text.setCoords();
    }

    for (let ii = 0; ii < boss.parent.lineSegments.length; ii++) {
        let segment = boss.parent.lineSegments[ii];
        if (segment.relationship) {
            segment.bringToFront();
            let relationship = segment.relationship;
            let newTransform = multiply(
                boss.calcTransformMatrix(),
                relationship
            );
            let options;
            options = fabric.util.qrDecompose(newTransform);
            segment.set({
                flipX: false,
                flipY: false,
            });
            segment.setPositionByOrigin(
                {x: options.translateX, y: options.translateY},
                'center',
                'center'
            );
            segment.set(options);
            segment.setCoords();
        }
    }

    for (let ii = 0; ii < boss.parent.markCircles.length; ii++) {
        let markPoint = boss.parent.markCircles[ii];
        if (markPoint.relationship) {
            markPoint.bringToFront();
            let relationship = markPoint.relationship;
            let newTransform = multiply(
                boss.calcTransformMatrix(),
                relationship
            );
            let options;
            options = fabric.util.qrDecompose(newTransform);
            markPoint.set({
                flipX: false,
                flipY: false,
            });
            markPoint.setPositionByOrigin(
                {x: options.translateX, y: options.translateY},
                'center',
                'center'
            );
            markPoint.set(options);
            markPoint.setCoords();
        }
    }
}










/*********************************** MAIN ***********************************/

//***************************Sektoren entsprechend der Metrik anlegen********************************
// Für Programmierung sec.name = ii, ansonsten sec.name = sec_name[ii]

for (let ii = 0; ii < sec_name.length; ii ++){
    let sec = new Sector();
    sec.name = ii;
    //sec.name = sec_name[ii];
    sec.ID = sec_ID[ii];
    sec.pos_x = sec_posx[ii] * scaleFacotor + window.innerWidth/2;
    sec.pos_y = sec_posy[ii] * scaleFacotor + (window.innerHeight - window.innerHeight*0.08)/2;
    sec.sector_height = sec_height[ii] * scaleFacotor;
    sec.sector_bottom = sec_bottom[ii] * scaleFacotor;
    sec.sector_top = sec_top[ii] * scaleFacotor ;
    sec.sector_angle = sec_angle[ii];
    sec.offset_x = sec_offset[ii] * scaleFacotor;
    sec.sector_width = sec_width[ii] *scaleFacotor;
    sec.neighbourhood = [sec_neighbour_top[ii],sec_neighbour_right[ii],sec_neighbour_bottom[ii],sec_neighbour_left[ii]];
    sec.fill = sec_fill[ii];
    sec.init();
    sectors.push(sec);
}




fitResponsiveCanvas();

positionSectors();

startGeodesics();

toolChange(selectedTool);



canvas.renderAll();





//--------------------Ausschuss-----------------------

//verworfene Idee zur Rotation

/*function rotateAtPivot(object,angle,pivot){
    let point = new fabric.Point(pivot.x-object.width/2.0,pivot.y-object.height/2);
    angle2 = Math.atan2(point.y,point.x);
    angle3 = (2*angle2+angle-Math.PI)/2.0;
    pdist_sq = Math.pow(point.x, 2) + Math.pow(point.y, 2);
    displacement = Math.sqrt(2 * pdist_sq * (1- Math.cos(angle)));
    object.set({transformMatrix:[
            Math.cos(angle),
            Math.sin(angle),
            -Math.sin(angle),
            Math.cos(angle),
            displacement * Math.cos(angle3),
            displacement * Math.sin(angle3)
        ]});
}*/

