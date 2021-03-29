//ACHTUNG!!! SNAPPING UND SETSECTORS MÜSSEN ÜBERARBEITET WERDEN; SIE MÜSSEN DERZEIT JEWEILS ZWEIMAL AUSGEFÜHRT WERDEN UM DIE RICHTIGEN ERGEBNISSE ZU ERHALTEN



//preserveObjectStacking: Reihenfolge der Objekte in z-Richtung wird nicht verändert
let canvas = new fabric.Canvas('canvas',{preserveObjectStacking: true, backgroundColor: '#8ab8d9'});

//Hintergrundbild einfügen
//canvas.setBackgroundImage('background_image.png', canvas.renderAll.bind(canvas));

canvas.rotationCursor = 'col-resize';

//Ausschalten der Gruppenfunktion per "Lasso"
//updateMinions ist für Gruppen implementiert, es fehlt noch die snappingToChosen-Funktion für Gruppen
canvas.selection = false;

let shiftPressed = false;

canvas.on('selection:created', function(obj){

    obj.target.setControlsVisibility({
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

    obj.target.lockScalingX = true;
    obj.target.lockScalingY = true;
    obj.target.on('moving', function(){
        if ( this._objects == undefined){return}
        this._objects.forEach(function(elem){
            if(elem.type === 'polygon') updateMinions(elem)
        });
    });
    obj.target.on('rotating', function(){
        if ( this._objects == undefined){return}
        this._objects.forEach(function(elem){
            if(elem.type === 'polygon')updateMinions(elem)
        });
    });
    obj.target.on('modified', function(){
        if ( this._objects == undefined){return}
        this._objects.forEach(function(elem){
            if(elem.type === 'polygon')updateMinions(elem)
        });
    });
});

//updateMinions auf Gruppen erweitert (in dieser Version ausgeschaltet)
canvas.on('selection:updated', function(obj){

    obj.target.setControlsVisibility({
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
    obj.target.lockScalingX = true;
    obj.target.lockScalingY = true;
    obj.target.on('moving', function(){
        if ( this._objects == undefined){return}
        this._objects.forEach(function(elem){
            if(elem.type === 'polygon') updateMinions(elem)
        });
    });
    obj.target.on('rotating', function(){
        if ( this._objects == undefined){return}
        this._objects.forEach(function(elem){
            if(elem.type === 'polygon')updateMinions(elem)
        });
    });
    obj.target.on('modified', function(){
        if ( this._objects == undefined){return}
        this._objects.forEach(function(elem){
            if(elem.type === 'polygon')updateMinions(elem)
        });
    });
});




let startAtMarkPoint = -1;
let pointer;
let snap_radius_end_to_start = 10;
let actualSector;

/* Prüfen:  - der Richtung einer verlängerten Geodäte;
            - ob Linien auf dem Hintergrund statt einem Sektor verlaufen -> visuelles Signal (rote Linie)
  */



canvas.on('mouse:move', function (o) {



    if (selectedTool !== 'paint' && selectedTool !== 'grab') return;

    let color;
    pointer = canvas.getPointer(o.e);

    //Abstandsprüfung zum Geodätenende -> Pfeil mit Richtung setzen


    if (!isLineStarted) {
        return;
    }

    if (lineContinueAt !== -1) {
        color = lines[lineContinueAt][0].stroke;
    } else {
        color = line_colors[lines.length % line_colors.length];
    }


    //Richtung der verlängerten Geodäte annehmen

    pointer = canvas.getPointer(o.e);

    if (lineTypeToDraw == 'geodesic') {
        if (lineContinueAt !== -1) {
            let segment_end_point = new fabric.Point(lines[lineContinueAt][lines[lineContinueAt].length - 1].calcLinePoints().x2, lines[lineContinueAt][lines[lineContinueAt].length - 1].calcLinePoints().y2);
            segment_end_point = fabric.util.transformPoint(segment_end_point, lines[lineContinueAt][lines[lineContinueAt].length - 1].calcTransformMatrix());

            let segment_start_point = new fabric.Point(lines[lineContinueAt][lines[lineContinueAt].length - 1].calcLinePoints().x1, lines[lineContinueAt][lines[lineContinueAt].length - 1].calcLinePoints().y1);
            segment_start_point = fabric.util.transformPoint(segment_start_point, lines[lineContinueAt][lines[lineContinueAt].length - 1].calcTransformMatrix());

            if (Math.abs(segment_end_point.x - segment_start_point.x) > Math.abs(segment_end_point.y - segment_start_point.y)) {
                let alpha = Math.atan2(segment_end_point.y - segment_start_point.y, segment_end_point.x - segment_start_point.x);
                let beta = Math.atan2(pointer.y - line.y1, pointer.x - line.x1);

                if (alpha - beta >= Math.PI){
                    beta = - beta
                }

                //Richtung der restlichen Geodäte
                if (Math.abs(alpha - beta) <= Math.PI / 36) {
                    line.set({x2: pointer.x, y2: (pointer.x - line.x1) * Math.tan(alpha) + line.y1});
                } else {

                    //Wenn der Der Geodreieck-Empty-Button sichtbar ist

                    if (geodesicToGeodreieckCalc()) {
                        geodesicToGeodreieck();
                    } else if (geodesicToStartCalc()) {
                        geodesicToStart();

                    } else {
                        let geodesicNearToMark = geodesicToMarkCalc();

                        if (geodesicNearToMark[0]) {
                            geodesicToMark(geodesicNearToMark[1]);
                        } else {

                            //Linienende sitzt am Cursor
                            line.set({x2: pointer.x, y2: pointer.y})
                        }
                    }
                    ;
                }
            } else {
                let alpha = Math.atan2(segment_end_point.x - segment_start_point.x, segment_end_point.y - segment_start_point.y);
                let beta = Math.atan2(pointer.x - line.x1, pointer.y - line.y1);

                if (alpha - beta >= Math.PI){
                    beta = - beta
                }

                if (Math.abs(alpha - beta) <= Math.PI / 36 /* Hier bin ich nicht sicher, ob das rein muss || Math.abs(alpha + beta) <= Math.PI / 36*/) {
                    line.set({x2: (pointer.y - line.y1) * Math.tan(alpha) + line.x1, y2: pointer.y});
                } else {

                    //Wenn der Der Geodreieck-Empty-Button sichtbar ist

                    if (geodesicToGeodreieckCalc()) {
                        geodesicToGeodreieck();
                    } else if (geodesicToStartCalc()) {
                        geodesicToStart();

                    } else {
                        let geodesicNearToMark = geodesicToMarkCalc();

                        if (geodesicNearToMark[0]) {
                            geodesicToMark(geodesicNearToMark[1]);
                        } else {

                            //Linienende sitzt am Cursor
                            line.set({x2: pointer.x, y2: pointer.y})
                        }
                    }
                    ;
                }

            }
        } else {
            if (selectedTool == 'paint' || startAtMarkPoint !== -1) {

                //WICHTIG DIE ABFRAGE LAEUFT UEBER DIE SICHTBARKEIT DES BUTTONS!!! AENDERN!!! DIES IST NICHT GUT

                if (geodesicToGeodreieckCalc()) {
                    geodesicToGeodreieck();
                } else {
                    let geodesicNearToMark = geodesicToMarkCalc();

                    if (geodesicNearToMark[0]) {
                        geodesicToMark(geodesicNearToMark[1]);
                    } else {

                        //Linienende sitzt am Cursor
                        line.set({x2: pointer.x, y2: pointer.y})
                    }
                }
                ;
            }
        }

    }

    if (lineTypeToDraw == 'geodesic'){

        if (selectedTool == 'paint' || lineContinueAt !== -1) {
            //Prüfen ob die Linie über einen verbotenen Bereich verläuft
            let xg1 = line.x1;
            let xg2 = line.x2;
            let yg1 = line.y1;
            let yg2 = line.y2;

            canvas.renderAll();
            let schnittpunktsparameters = getSchnittpunktsparameters(sectors, [xg1, yg1, xg2, yg2]);
            let lambdas = [];
            for (let ii = 0; ii < schnittpunktsparameters.length; ii++) {
                lambdas.push(schnittpunktsparameters[ii][0])
            }


            //let lineOverTheseSectors = schnittpunktsparameter[1];
            //let lineOverTheseEdges = schnittpunktsparameter[2];
            line.stroke = color;
            line.fill = color;

            for (let ii = 0; ii < schnittpunktsparameters.length; ii++) {
                if (sectors[schnittpunktsparameters[ii][1]].snapStatus[schnittpunktsparameters[ii][2]] == 0) {
                    line.stroke = 'red';
                    line.fill = 'red';
                }
            }


            //TODO autoSetOnDraw muss endlich fertig gestellt werden
            if (autoSetOnDraw == "1") {

                let trapezPointsAsGlobalCoords = getTrapezPointsAsGlobalCoords(sectors[actualSector].trapez)

                for (let kk = 0; kk < 4; kk++) {

                    xt1 = trapezPointsAsGlobalCoords[kk].x;
                    xt2 = trapezPointsAsGlobalCoords[(kk + 1) % 4].x;
                    yt1 = trapezPointsAsGlobalCoords[kk].y;
                    yt2 = trapezPointsAsGlobalCoords[(kk + 1) % 4].y;

                    let dxg_tmp = xg2 - xg1;
                    let dyg_tmp = yg2 - yg1;

                    dxg = dxg_tmp;
                    dyg = dyg_tmp;

                    dxt12 = xt2 - xt1;
                    dyt12 = yt2 - yt1;

                    slopeGeodesic = dyg / dxg;
                    slopeTrapez = dyt12 / dxt12;


                    if (dxg > epsilon) {
                        alpha = (yg1 - yt1 + (dyg / dxg) * (xt1 - xg1)) / (dyt12 - ((dxt12 * dyg) / dxg));
                        lambda = (xt1 + ((yg1 - yt1 + (dyg / dxg) * (xt1 - xg1)) / (dyt12 - ((dxt12 * dyg) / dxg))) * dxt12 - xg1) / dxg;
                    } else {
                        alpha = (xg1 - xt1 + (dxg / dyg) * (yt1 - yg1)) / (dxt12 - ((dyt12 * dxg) / dyg));
                        lambda = (yt1 + ((xg1 - xt1 + (dxg / dyg) * (yt1 - yg1)) / (dxt12 - ((dyt12 * dxg) / dyg))) * dyt12 - yg1) / dyg;
                    }

                    if (lambda > epsilon) {
                        if (lambda > 0.0 && lambda <= 1.0 && alpha > 0.0 && alpha <= 1.0) {

                            kantenIndex = kk;

                            break;
                        }
                    }

                }


                let staticSector = sectors[actualSector].ID;
                let neighbourSector = sectors[actualSector].neighbourhood[kantenIndex];


                if (neighbourSector === -1 || sectors[neighbourSector].fill === '#e2e2e2') {

                    return
                }

                if (textured !== "1") {
                    for (let ll = 0; ll < 4; ll++) {

                        let sec_idx = sectors[staticSector].neighbourhood[ll];

                        if (sectors[staticSector].snapEdges[ll] !== 0) {
                            let edgeToRemove = sectors[staticSector].snapEdges[ll];
                            canvas.remove(edgeToRemove);
                            sectors[staticSector].snapEdges[ll] = [0];

                        }

                        if (sec_idx > -1) {

                            if (sectors[sec_idx].snapEdges[(ll + 2) % 4] !== 0) {
                                let edgeToRemove = sectors[sec_idx].snapEdges[(ll + 2) % 4];
                                canvas.remove(edgeToRemove);
                                sectors[sec_idx].snapEdges[(ll + 2) % 4] = [0];

                            }
                        }
                    }
                }
                //Punkte des Nachbarsektors ermitteln
                let neighbourTrapezPointsAsGlobalCoords = getTrapezPointsAsGlobalCoords(sectors[neighbourSector].trapez)


                //Übergangspunkte übernehmen
                xt1_uebergang = neighbourTrapezPointsAsGlobalCoords[(kantenIndex + 2) % 4].x;
                xt2_uebergang = neighbourTrapezPointsAsGlobalCoords[(kantenIndex + 3) % 4].x;
                yt1_uebergang = neighbourTrapezPointsAsGlobalCoords[(kantenIndex + 2) % 4].y;
                yt2_uebergang = neighbourTrapezPointsAsGlobalCoords[(kantenIndex + 3) % 4].y;


                point_1 = new fabric.Point(xt1_uebergang, yt1_uebergang);
                point_2 = new fabric.Point(xt2_uebergang, yt2_uebergang);
                point_a = new fabric.Point(xt2, yt2);
                point_b = new fabric.Point(xt1, yt1);

                dist_1a = distance(point_1, point_a);
                dist_2b = distance(point_2, point_b);


                // Steigung der Kante des ruhenden/ausgehenden Sektors im lokalen Koordinatensysten
                dxs_tmp = sectors[staticSector].trapez.points[kantenIndex].x - sectors[staticSector].trapez.points[(kantenIndex + 1) % 4].x
                dys_tmp = sectors[staticSector].trapez.points[kantenIndex].y - sectors[staticSector].trapez.points[(kantenIndex + 1) % 4].y
                if (Math.abs(dys_tmp) > epsilon) {
                    gamma_static = Math.atan(dxs_tmp / dys_tmp);
                } else {
                    gamma_static = 0.0
                }
                dxs_tmp = sectors[neighbourSector].trapez.points[(kantenIndex + 2) % 4].x - sectors[neighbourSector].trapez.points[(kantenIndex + 3) % 4].x
                dys_tmp = sectors[neighbourSector].trapez.points[(kantenIndex + 2) % 4].y - sectors[neighbourSector].trapez.points[(kantenIndex + 3) % 4].y
                if (Math.abs(dys_tmp) > epsilon) {
                    gamma_neighbour = Math.atan(dxs_tmp / dys_tmp);
                } else {
                    gamma_neighbour = 0.0
                }


                sectors[neighbourSector].trapez.angle = sectors[staticSector].trapez.angle - gamma_static / Math.PI * 180 + gamma_neighbour / Math.PI * 180;
                sectors[neighbourSector].trapez.setCoords();

                transformMatrix = sectors[neighbourSector].trapez.calcTransformMatrix();

                point_1_local = new fabric.Point(sectors[neighbourSector].trapez.points[(kantenIndex + 2) % 4].x - sectors[neighbourSector].trapez.width / 2,
                    sectors[neighbourSector].trapez.points[(kantenIndex + 2) % 4].y - sectors[neighbourSector].trapez.height / 2);
                point_1 = fabric.util.transformPoint(point_1_local, transformMatrix);

                sectors[neighbourSector].trapez.left += point_a.x - point_1.x;
                sectors[neighbourSector].trapez.top += point_a.y - point_1.y;


                updateMinions(sectors[neighbourSector].trapez);

                sectors[neighbourSector].trapez.setCoords();

                if (textured == "1") {
                    snapping(sectors[neighbourSector].trapez);
                } else {
                    snappingToChosen(sectors[neighbourSector].trapez, staticSector);
                }

                for (let kk = 0; kk < 4; kk++) {

                    let sec_idx = sectors[staticSector].neighbourhood[kk];


                    if (sectors[staticSector].snapStatus[kk] !== 0) {


                        transformMatrix = sectors[staticSector].trapez.calcTransformMatrix();
                        //point_1/2 gehören zum bewegten Trapez
                        point_1_local = new fabric.Point(sectors[staticSector].trapez.points[kk].x - sectors[staticSector].trapez.width / 2,
                            sectors[staticSector].trapez.points[kk].y - sectors[staticSector].trapez.height / 2);

                        point_2_local = new fabric.Point(sectors[staticSector].trapez.points[(kk + 1) % 4].x - sectors[staticSector].trapez.width / 2,
                            sectors[staticSector].trapez.points[(kk + 1) % 4].y - sectors[staticSector].trapez.height / 2);

                        point_1 = fabric.util.transformPoint(point_1_local, transformMatrix);

                        point_2 = fabric.util.transformPoint(point_2_local, transformMatrix);

                        let stack_idx_of_clicked_sector = canvas.getObjects().indexOf(this);

                        let edge = new fabric.Line([point_1.x, point_1.y, point_2.x, point_2.y,], {
                            strokeWidth: 1,
                            fill: edgeColor,
                            stroke: edgeColor,
                            originX: 'center',
                            originY: 'center',
                            perPixelTargetFind: true,
                            objectCaching: false,
                            hasBorders: false,
                            hasControls: false,
                            evented: false,
                            selectable: false,
                        });

                        edge.ID = kk;

                        canvas.insertAt(edge, stack_idx_of_clicked_sector + 1);

                        edge.bringToFront();
                        sectors[staticSector].snapEdges[kk] = edge;

                        //-----------IDEE UM DIE DRAGPOINTS NACH VORNE ZU HOLEN------------------
                        for (let ll = 0; ll < sectors[sec_idx].lineSegments.length; ll++) {
                            if (sectors[sec_idx].lineSegments[ll].dragPoint !== undefined) {
                                canvas.bringToFront(sectors[sec_idx].lineSegments[ll].dragPoint)
                            }
                        }
                    }


                }

                line.bringToFront()
            }

            canvas.renderAll();
        }
    }

    if (lineTypeToDraw == 'polyline') {

        if (isLineStarted == true){

            let geodesicNearToMark = geodesicToMarkCalc();

            if (geodesicNearToMark[0]) {
                pathCoord = geodesicToMark(geodesicNearToMark[1]);
            } else {
                pathCoord = {x: pointer.x, y: pointer.y};
            }

            polyline.points.push(pathCoord);

            xp1 = polyline.points[polyline.points.length - 2].x
            yp1 = polyline.points[polyline.points.length - 2].y
            xp2 = polyline.points[polyline.points.length - 1].x
            yp2 = polyline.points[polyline.points.length - 1].y

            let schnittpunktsparameters = getSchnittpunktsparameters(sectors, [xp1, yp1, xp2, yp2]);
            let lambdas = [];
            for (let ii = 0; ii < schnittpunktsparameters.length; ii++) {
                lambdas.push(schnittpunktsparameters[ii][0])
            }

            for (let ii = 0; ii < schnittpunktsparameters.length; ii++) {
                if (sectors[schnittpunktsparameters[ii][1]].snapStatus[schnittpunktsparameters[ii][2]] == 0) {
                    polyline.stroke = 'red';

                }
            }

            canvas.renderAll();
        }

    }

});

//Zoomoptionen

let pausePanning = false;

//var el = document.getElementById("canvas-wrap");
let ham = new Hammer(canvas.upperCanvasEl, {
    domEvents: true
});

let validPinch = false;
ham.get('pinch').set({ enable: true });


let zoomStartScale
let zoomCenter
ham.on('pinchstart', function (ev) {
    validPinch = true;

    zoomCenter = ev.center;
    zoomStartScale = canvas.getZoom();

    //canvas.discardActiveObject()
    if (canvas.getActiveObject() !== undefined){
        if(canvas.getActiveObject() !== null){
            isItTimeToSnap(sectors[canvas.getActiveObject().parent.ID].trapez)
            if (sectorToSnap > -1){
                snapInitialSectorToTargetSector(canvas.getActiveObject().parent.ID, sectorToSnap)
            }

            drawSnapEdges(canvas.getActiveObject().parent.ID)
        }

    }
    canvas.discardActiveObject()
    canvas.renderAll()
    for (let ii = 0; ii < sectors.length; ii++){
        sectors[ii].trapez.selectable = false;
        sectors[ii].trapez.lockMovementX = true;
        sectors[ii].trapez.lockMovementY = true;
        sectors[ii].trapez.lockRotation = true;
    }

    geodreieck.selectable = false;
    geodreieck.lockMovementX = true;
    geodreieck.lockMovementY = true;
    geodreieck.lockRotation = true;



});

ham.on('pinchin', function (ev) {
    if (validPinch) {
        let delta = zoomStartScale * ev.scale;
        canvas.zoomToPoint(zoomCenter, delta)
    }
});

ham.on('pinchout', function (ev) {
    if (validPinch) {
        canvas.discardActiveObject();
        let delta = zoomStartScale * ev.scale;
        canvas.zoomToPoint(zoomCenter, delta)
    }
});

ham.on('pinchend', function (ev) {
    validPinch = false;
    for (let ii = 0; ii < sectors.length; ii++){
        sectors[ii].trapez.selectable = true
        sectors[ii].trapez.lockMovementX = false;
        sectors[ii].trapez.lockMovementY = false;
        sectors[ii].trapez.lockRotation = false;
    }
    geodreieck.selectable = true;
    geodreieck.lockMovementX = false;
    geodreieck.lockMovementY = false;
    geodreieck.lockRotation = false;

    canvas.renderAll()
});

canvas.on('mouse:wheel', function(opt) {
    var delta = -opt.e.deltaY;
    var zoom = canvas.getZoom();
    if (delta < 0.0){
        zoom = zoom * 0.95;
    } else{
        zoom = zoom / 0.95;
    }
    if (zoom > 20) zoom = 20;
    if (zoom < 0.1) zoom = 0.1;
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();

    /*
    for (let ii = lines.length - 1; ii >= 0; ii--) {
        if(lines[ii][lines[ii].length-1] !== undefined) {
            lines[ii][lines[ii].length - 1].dragPoint.padding = dragPointPadding * 1 / zoom;
        }
    }
    */
});

canvas.on('mouse:down', function(opt) {
    if (shiftPressed === true) return;
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

    }
});

canvas.on('mouse:move', function(opt) {
    if (shiftPressed === true) return;
    if (this.isDragging) {
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


        this.viewportTransform[4] += XCoord - this.lastPosX;
        this.viewportTransform[5] += YCoord - this.lastPosY;

        this.requestRenderAll();
        this.lastPosX = XCoord;
        this.lastPosY = YCoord;
    }
});

canvas.on('mouse:up', function(opt) {

    if (shiftPressed === true) return;
    this.isDragging = false;
    //this.selection = false;
    var zoom = canvas.getZoom();
    canvas.setZoom(zoom);

    if (selectedTool !== 'paint' && selectedTool !== 'mark' && lineContinueAt == -1) {
        return;
    }

    if (lineTypeToDraw == 'geodesic'){
        let immediatehistory = [0];
        let color;
        let lineStrokeWidth;

        if (lineContinueAt !== -1) {
            color = lines[lineContinueAt][0].stroke;
            lineStrokeWidth = lines[lineContinueAt][0].strokeWidth;

            //startsector beweglich machen
            let idx = lines[lineContinueAt][lines[lineContinueAt].length - 1].parentSector;
            sectors[idx[0]].trapez.lockMovementX = false;
            sectors[idx[0]].trapez.lockMovementY = false;
            sectors[idx[0]].trapez.evented = true;
            sectors[idx[0]].trapez.hasControls = true;
            sectors[idx[0]].trapez.hoverCursor = 'grabbing';


        } else {
            color = line_colors[lines.length % line_colors.length];
            lineStrokeWidth = lineStrokeWidthWhenSelected;
        }

        if (isLineStarted) {

            isLineStarted = false;
            startAtMarkPoint = -1;
            line.setCoords(); //Alle Änderungen der Member sollen übernommen werden
            canvas.renderAll();
            xg1 = line.x1;
            xg2 = line.x2;
            yg1 = line.y1;
            yg2 = line.y2;
            let zoom = canvas.getZoom();

            if (distance(new fabric.Point(xg1, yg1), new fabric.Point(xg2, yg2)) < abortlength) {
                canvas.remove(line);
                lineContinueAt = -1;
                lineTypeToDraw = ""
                return;
            }

            if (lineContinueAt !== -1) {
                canvas.remove(lines[lineContinueAt][lines[lineContinueAt].length - 1].dragPoint);
                delete lines[lineContinueAt][lines[lineContinueAt].length - 1].dragPoint;
            }
            //Splitting der Linie in Liniensegmente an den Sektorkanten

            let schnittpunktsparameters = getSchnittpunktsparameters(sectors, [xg1, yg1, xg2, yg2]);

            let lambdas = [0];

            if (schnittpunktsparameters.length > 0) {
                //lambdas.push(schnittpunktsparameters[0][0])

                for (let ii = 0; ii < schnittpunktsparameters.length; ii++) {

                    if (sectors[schnittpunktsparameters[ii][1]].snapStatus[schnittpunktsparameters[ii][2]] !== 0) {
                        lambdas.push(schnittpunktsparameters[ii][0])
                        if (ii == schnittpunktsparameters.length - 1) {

                            lambdas.push(1.0);
                        }
                    } else {
                        lambdas.push(schnittpunktsparameters[ii][0])
                        break
                    }
                }
            } else {

                lambdas.push(1.0);
            }

            canvas.remove(line);
            let lineStart_x = line.x1;
            let lineStart_y = line.y1;

            let lineEnd_x;
            let lineEnd_y;


            let lineSegment
            let geodesic = [];
            let parentSectorID;

            for (let ii = 1; ii < lambdas.length; ii++) {

                lineEnd_x = xg1 + lambdas[ii] * (xg2 - xg1);
                lineEnd_y = yg1 + lambdas[ii] * (yg2 - yg1);

                let mittelpunktlineSegment = new fabric.Point(lineStart_x + (lineEnd_x - lineStart_x) / 2, lineStart_y + (lineEnd_y - lineStart_y) / 2);

                parentSectorID = getParentSectorOfPoint(mittelpunktlineSegment)

                if (Math.abs(lineEnd_x - lineStart_x) > epsilon || Math.abs(lineEnd_y - lineStart_y) > epsilon) {
                    lineSegment = drawLineSegment(color, lineStrokeWidth, parentSectorID, lineStart_x, lineStart_y, lineEnd_x, lineEnd_y)

                    if (lineContinueAt !== -1) {
                        lineSegment.ID = [lineContinueAt, lines[lineContinueAt].length]
                    } else {
                        lineSegment.ID = [lines.length, geodesic.length];
                    }

                    if (lineContinueAt !== -1) {
                        lines[lineContinueAt].push(lineSegment)
                    } else {
                        geodesic.push(lineSegment);
                    }

                    immediatehistory.push(lineSegment.ID);
                }
                lineStart_x = lineEnd_x;
                lineStart_y = lineEnd_y;
            }

            history.push(immediatehistory);


            if (lineSegment === undefined) {
                lineSegment = lines[lineContinueAt][lines[lineContinueAt].length - 1];
            }


            if (lineContinueAt === -1) {
                lines.push(geodesic)
            }

            lineContinueAt = -1;

            drawDragPoint(lineSegment.ID[0]);
            chosenLineGlobalID = lineSegment.ID[0];
        }

        canvas.renderAll();
        toolChange('grab')

    }

    if (lineTypeToDraw == 'polyline'){
        let immediatehistory = [0];
        let color;
        let lineStrokeWidth;

        if (lineContinueAt !== -1) {
            color = lines[lineContinueAt][0].stroke;
            lineStrokeWidth = lines[lineContinueAt][0].strokeWidth;

            if (lines[lineContinueAt][lines[lineContinueAt].length - 1].parentSector[0] !== -1){
                //startsector beweglich machen
                let idx = lines[lineContinueAt][lines[lineContinueAt].length - 1].parentSector;
                sectors[idx[0]].trapez.lockMovementX = false;
                sectors[idx[0]].trapez.lockMovementY = false;
                sectors[idx[0]].trapez.evented = true;
                sectors[idx[0]].trapez.hasControls = true;
                sectors[idx[0]].trapez.hoverCursor = 'grabbing';
            }

        } else {
            color = line_colors[lines.length % line_colors.length];
            lineStrokeWidth = lineStrokeWidthWhenSelected;
        }

        isLineStarted = false;

        if (polyline.abortFromBeginning == true){
            canvas.remove(polyline)
            pathCoords = [];
            lineContinueAt = -1;
            return
        }

        if (lineContinueAt !== -1) {
            canvas.remove(lines[lineContinueAt][lines[lineContinueAt].length - 1].dragPoint);
            delete lines[lineContinueAt][lines[lineContinueAt].length - 1].dragPoint;
        }

        canvas.remove(polyline)



        pathCoords.splice(1, 1)

        if (pathCoords[1] == undefined) {
            pathCoords = [];
            return
        }

        let polylineSegments = [];

        let polylineCutParameter = [];

        for (let ii = 0; ii < pathCoords.length - 1; ii ++){

            let schnittpunktsParameter = getSchnittpunktsparameters(sectors, [pathCoords[ii].x, pathCoords[ii].y, pathCoords[ii + 1].x, pathCoords[ii + 1].y])
            if (schnittpunktsParameter.length > 0){

                for (let jj = 0; jj < schnittpunktsParameter.length; jj++) {

                    let lambda = schnittpunktsParameter[jj][0]
                    let necessarySectorsAreSnapped = true
                    if(sectors[schnittpunktsParameter[jj][1]].snapStatus[schnittpunktsParameter[jj][2]] == 0){
                        necessarySectorsAreSnapped = false
                    }
                    let cutParameter = [ii, lambda, necessarySectorsAreSnapped]
                    polylineCutParameter.push(cutParameter)
                }

            }

        }

        if (polylineCutParameter.length > 0){
            for (let jj = 1; jj < polylineCutParameter.length; jj++) {
                if (Math.abs(polylineCutParameter[jj - 1][1] - polylineCutParameter[jj][1]) < epsilon) {
                    polylineCutParameter.splice(jj, 1)
                }
            }
        }

        let polylineSegment;

        if (polylineCutParameter.length > 0){

            for (let ii = 0; ii < polylineCutParameter.length + 1; ii++){
                let polylineSegmentCoords
                let parentSectorID;


                if (ii == 0){

                    dxg = pathCoords[polylineCutParameter[ii][0] + 1].x - pathCoords[polylineCutParameter[ii][0]].x
                    dyg = pathCoords[polylineCutParameter[ii][0] + 1].y - pathCoords[polylineCutParameter[ii][0]].y

                    polylineSegmentCoords = pathCoords.slice(0, polylineCutParameter[ii][0] + 1)
                    polylineSegmentCoords.push({x: pathCoords[polylineCutParameter[ii][0]].x + polylineCutParameter[ii][1] * dxg, y: pathCoords[polylineCutParameter[ii][0]].y + polylineCutParameter[ii][1] * dyg})

                    dxg_betweenPoints = polylineSegmentCoords[Math.round(polylineSegmentCoords.length / 2)].x - polylineSegmentCoords[Math.round(polylineSegmentCoords.length / 2) - 1].x
                    dyg_betweenPoints = polylineSegmentCoords[Math.round(polylineSegmentCoords.length / 2)].y - polylineSegmentCoords[Math.round(polylineSegmentCoords.length / 2) - 1].y

                    pointBetweenPathCoords_x = polylineSegmentCoords[Math.round(polylineSegmentCoords.length / 2) - 1].x + 0.5 * dxg_betweenPoints
                    pointBetweenPathCoords_y = polylineSegmentCoords[Math.round(polylineSegmentCoords.length / 2) - 1].y + 0.5 * dxg_betweenPoints

                    let pointBetweenPathCoords = new fabric.Point(pointBetweenPathCoords_x, pointBetweenPathCoords_y)

                    //Es kann vorkommen, dass Geodäten an den Kanten abbrechen und das dann zu Stücken führt, die am selben Punkt
                    //starten und Enden. Das wird hier verhindert

                    if (polylineSegmentCoords.length == 2){
                        if (Math.abs(polylineSegmentCoords[0].x - polylineSegmentCoords[1].x) < epsilon && Math.abs(polylineSegmentCoords[0].y - polylineSegmentCoords[1].y) < epsilon){
                            continue
                        }
                    }

                    parentSectorID = getParentSectorOfPoint(pointBetweenPathCoords)

                    //canvas.add(new fabric.Circle({ radius: 5, fill: '#f55', left: polylineSegmentCoords[Math.round(polylineSegmentCoords.length / 2)].x , top: polylineSegmentCoords[Math.round(polylineSegmentCoords.length / 2)].y, originX: 'center', originY: 'center' }));

                    polylineSegment = drawPolylineSegment(color, lineStrokeWidth, parentSectorID, polylineSegmentCoords)

                    if (lineContinueAt !== -1) {
                        polylineSegment.ID = [lineContinueAt, lines[lineContinueAt].length]
                    } else {
                        polylineSegment.ID = [lines.length, polylineSegments.length];
                    }

                    if (lineContinueAt !== -1) {
                        lines[lineContinueAt].push(polylineSegment)
                    } else {
                        polylineSegments.push(polylineSegment);
                    }

                    immediatehistory.push(polylineSegment.ID);

                    if (polylineCutParameter[ii][2] == false){
                        break
                    }

                }

                if(ii > 0 && ii < polylineCutParameter.length){

                    polylineSegmentCoords = pathCoords.slice(polylineCutParameter[ii - 1][0] + 1, polylineCutParameter[ii][0] + 1);

                    dxg = pathCoords[polylineCutParameter[ii - 1][0] + 1].x - pathCoords[polylineCutParameter[ii - 1][0]].x
                    dyg = pathCoords[polylineCutParameter[ii - 1][0] + 1].y - pathCoords[polylineCutParameter[ii - 1][0]].y
                    polylineSegmentCoords.unshift({x: pathCoords[polylineCutParameter[ii - 1][0]].x + polylineCutParameter[ii - 1][1] * dxg, y: pathCoords[polylineCutParameter[ii - 1][0]].y + polylineCutParameter[ii - 1][1] * dyg})

                    dxg = pathCoords[polylineCutParameter[ii][0] + 1].x - pathCoords[polylineCutParameter[ii][0]].x
                    dyg = pathCoords[polylineCutParameter[ii][0] + 1].y - pathCoords[polylineCutParameter[ii][0]].y
                    polylineSegmentCoords.push({x: pathCoords[polylineCutParameter[ii][0]].x + polylineCutParameter[ii][1] * dxg, y: pathCoords[polylineCutParameter[ii][0]].y + polylineCutParameter[ii][1] * dyg})

                    dxg_betweenPoints = polylineSegmentCoords[Math.round(polylineSegmentCoords.length / 2)].x - polylineSegmentCoords[Math.round(polylineSegmentCoords.length / 2) - 1].x
                    dyg_betweenPoints = polylineSegmentCoords[Math.round(polylineSegmentCoords.length / 2)].y - polylineSegmentCoords[Math.round(polylineSegmentCoords.length / 2) - 1].y

                    pointBetweenPathCoords_x = polylineSegmentCoords[Math.round(polylineSegmentCoords.length / 2) - 1].x + 0.5 * dxg_betweenPoints
                    pointBetweenPathCoords_y = polylineSegmentCoords[Math.round(polylineSegmentCoords.length / 2) - 1].y + 0.5 * dxg_betweenPoints

                    let pointBetweenPathCoords = new fabric.Point(pointBetweenPathCoords_x, pointBetweenPathCoords_y)


                    parentSectorID = getParentSectorOfPoint(pointBetweenPathCoords)

                    polylineSegment = drawPolylineSegment(color, lineStrokeWidth, parentSectorID, polylineSegmentCoords)

                    if (lineContinueAt !== -1) {
                        polylineSegment.ID = [lineContinueAt, lines[lineContinueAt].length]
                    } else {
                        polylineSegment.ID = [lines.length, polylineSegments.length];
                    }

                    if (lineContinueAt !== -1) {
                        lines[lineContinueAt].push(polylineSegment)
                    } else {
                        polylineSegments.push(polylineSegment);
                    }

                    immediatehistory.push(polylineSegment.ID);

                    if (polylineCutParameter[ii][2] == false){
                        break
                    }

                }

                if(ii == polylineCutParameter.length){


                    dxg = pathCoords[polylineCutParameter[ii - 1][0] + 1].x - pathCoords[polylineCutParameter[ii - 1][0]].x
                    dyg = pathCoords[polylineCutParameter[ii - 1][0] + 1].y - pathCoords[polylineCutParameter[ii - 1][0]].y

                    polylineSegmentCoords = pathCoords.slice(polylineCutParameter[ii - 1][0] + 1, pathCoords.length - 1);
                    polylineSegmentCoords.unshift({x: pathCoords[polylineCutParameter[ii - 1][0]].x + polylineCutParameter[ii - 1][1] * dxg, y: pathCoords[polylineCutParameter[ii - 1][0]].y + polylineCutParameter[ii - 1][1] * dyg})

                    //canvas.add(new fabric.Circle({ radius: 5, fill: 'yellow', left: polylineSegmentCoords[Math.round(polylineSegmentCoords.length / 2)].x , top: polylineSegmentCoords[Math.round(polylineSegmentCoords.length / 2)].y, originX: 'center', originY: 'center' }));

                    dxg_betweenPoints = polylineSegmentCoords[Math.round(polylineSegmentCoords.length / 2)].x - polylineSegmentCoords[Math.round(polylineSegmentCoords.length / 2) - 1].x
                    dyg_betweenPoints = polylineSegmentCoords[Math.round(polylineSegmentCoords.length / 2)].y - polylineSegmentCoords[Math.round(polylineSegmentCoords.length / 2) - 1].y

                    pointBetweenPathCoords_x = polylineSegmentCoords[Math.round(polylineSegmentCoords.length / 2) - 1].x + 0.5 * dxg_betweenPoints
                    pointBetweenPathCoords_y = polylineSegmentCoords[Math.round(polylineSegmentCoords.length / 2) - 1].y + 0.5 * dxg_betweenPoints

                    let pointBetweenPathCoords = new fabric.Point(pointBetweenPathCoords_x, pointBetweenPathCoords_y)


                    parentSectorID = getParentSectorOfPoint(pointBetweenPathCoords)

                    polylineSegment = drawPolylineSegment(color, lineStrokeWidth, parentSectorID, polylineSegmentCoords)

                    if (lineContinueAt !== -1) {
                        polylineSegment.ID = [lineContinueAt, lines[lineContinueAt].length]
                    } else {
                        polylineSegment.ID = [lines.length, polylineSegments.length];
                    }

                    if (lineContinueAt !== -1) {
                        lines[lineContinueAt].push(polylineSegment)
                    } else {
                        polylineSegments.push(polylineSegment);
                    }

                    immediatehistory.push(polylineSegment.ID);

                    if (polylineCutParameter[ii - 1][2] == false){
                        break
                    }

                }
            }

        }else{
            parentSectorID = getParentSectorOfPoint(pathCoords[Math.round(pathCoords.length / 2)])
            polylineSegment = drawPolylineSegment(color, lineStrokeWidth, parentSectorID, pathCoords)

            if (lineContinueAt !== -1) {
                polylineSegment.ID = [lineContinueAt, lines[lineContinueAt].length]
            } else {
                polylineSegment.ID = [lines.length, polylineSegments.length];
            }

            if (lineContinueAt !== -1) {
                lines[lineContinueAt].push(polylineSegment)
            } else {
                polylineSegments.push(polylineSegment);
            }

            immediatehistory.push(polylineSegment.ID);
        }

        if (lineContinueAt === -1){
            lines.push(polylineSegments)
        }

        lineContinueAt = -1;

        drawDragPoint(polylineSegment.ID[0]);

        history.push(immediatehistory)

        chosenLineGlobalID = polylineSegment.ID[0];

        pathCoords = [];

        toolChange('grab')
    }

    lineTypeToDraw = ""
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

window.addEventListener('keydown',function(event){
    if(event.key === 'Shift'){

        canvas.selection = true;
        shiftPressed = true;

    }
});

window.addEventListener('keyup',function(event){
    if(event.key === 'Shift'){
        canvas.selection = false;
        shiftPressed = false;

    }
});

//Werkzeugwechsel "Zeichnen"
window.addEventListener('keydown',function(event){
    if(event.key === 'z'){
            toolChange('paint');
    }
});

//Werkzeugwechsel "Greifen"
window.addEventListener('keydown',function(event){
    if(event.key === 'g'){
        toolChange('grab');

    }
});

//Werkzeugwechsel "Markierung setzen"
window.addEventListener('keydown',function(event){
    if(event.key === 'b'){
        toolChange('mark');

    }
});

window.addEventListener('keydown',function(event){
    if(event.key === 'Delete'){
        deleteWholeGeodesic(chosenLineGlobalID);

    }
});

window.addEventListener('keydown',function(event){
    if(event.key === 'c'){
        continueGeodesic(chosenLineGlobalID);
        toolChange('grab');

    }
});


window.addEventListener('keydown',function(event){
    if(event.key === 'l'){
        setSectorsToCenter();
    }

});


//Sektoren passend zusammensetzen
window.addEventListener('keydown',function(event){
    if(event.key === 's'){
        autoSetSectorsAlongGeodesic(chosenLineGlobalID);
        if (chosenLineGlobalID !== -1) {
            for (let ii = 0; ii < sectors.length; ii++) {
                if (turnOverlapControllOn == "1"){
                    overlapControll(sectors[ii].trapez);
                }
            }
        }
        toolChange('grab');

    }
});

window.addEventListener('keydown',function(event){
    if(event.key === 'ArrowLeft' ){
        changeDirectionAndContinue('counterclockwise', Math.PI/180, chosenLineGlobalID);
        toolChange('grab');

    }
});


window.addEventListener('keydown',function(event){
    if(event.key === 'ArrowRight'){
        changeDirectionAndContinue('clockwise', Math.PI/180, chosenLineGlobalID);
        toolChange('grab');

    }
});

//UnDo
window.addEventListener('keydown',function(event){
    if(event.key === 'r'){
        undoLastAction();

    }
});

window.addEventListener('keydown',function(event){
    if(event.key === 'a'){
        for (let ii = 0; ii < lines.length; ii++) {
            continueGeodesic(lines[ii][lines[ii].length-1].ID[0])
        }
        toolChange('grab');

    }
});

window.addEventListener('keydown',function(event){
    if(event.key === 'k'){
        setOuterSectorsToCircle()

    }
});


//reset Zoom and Pan
window.addEventListener('keydown',function(event){
    if(event.key === '1'){
        canvas.setZoom( 0.12 );
        canvas.viewportTransform[4]= 800;
        canvas.viewportTransform[5]= 480;
    }

});

window.addEventListener('keydown',function(event){
    if(event.key === '2'){
        canvas.setZoom( 0.175 );
        canvas.viewportTransform[4]= 700;
        canvas.viewportTransform[5]= 640;
    }

});

window.addEventListener('keydown',function(event){
    if(event.key === '3'){
        canvas.setZoom( 1.5 );
        canvas.viewportTransform[4]= -500;
        canvas.viewportTransform[5]= -200;
    }

});

//Button-Funktionen
window.resetSectors = resetSectors;

window.undoLastAction = undoLastAction;

let scaleFacotor;

if (window.innerWidth < 1000 || window.innerHeight < 1000){
    scaleFacotor = Math.min(window.innerHeight/1000, window.innerWidth/1000)
} else {
    scaleFacotor = Math.min(window.innerHeight/1000, window.innerWidth/1000)
}

/*
//-----------------Instructional Overlay---------------------------------
let instructional_overlay_language = 'instructional_overlay.png';

if(language == "english"){
    instructional_overlay_language = 'instructional_overlay_en.png'
}

let instructional_overlay;
fabric.Image.fromURL(instructional_overlay_language, function(img) {
    instructional_overlay = img.set({
        opacity: 1,
        originX: "center",
        originY: "center",
        perPixelTargetFind: true,
        lockMovementX: 'true',
        lockMovementY: 'true',
        objectCaching: false,
        hasBorders: false,
        hasControls: true,
        transparentCorners: true,
        cornerSize: 40,
        angle: 0,
        evented: true,
        selectable: true,
        scaleX: scaleFacotor * 0.9,
        scaleY: scaleFacotor * 0.9,
        hoverCursor: "pointer"});

    instructional_overlay.setControlsVisibility({
        tl: false,
        mt: false,
        tr: false,

        mr: false,
        ml: false,

        bl: false,
        mb: false,
        br: false,
    });

    instructional_overlay.on('mousedown', function (o) {
        canvas.remove(instructional_overlay);
        exitHelp.opacity = 0.0;
        canvas_side_tools_right.renderAll()
    });

});
*/

//-----------------Geodreieck--------------------------------
let geodreieckIsClicked = false;
let geodreieck;


let geodreieckStartAngle;
let geodreieckSnapAngle;
let geodreieckScale;

if (turnLorentzTransformOn == "1"){
    geodreieckSnapAngle = 15
    geodreieckStartAngle = 90
    geodreieckScale = 0.0585
}else{
    geodreieckSnapAngle = 0.1
    geodreieckStartAngle = 0
    geodreieckScale = 0.12
}
fabric.Image.fromURL('geodreieck.png', function(img) {
    geodreieck = img.set({
        opacity: 1,
        originX: "center",
        originY: "bottom",
        perPixelTargetFind: true,
        objectCaching: false,
        hasBorders: false,
        hasControls: true,
        transparentCorners: true,
        cornerSize: 40,
        angle: geodreieckStartAngle,
        evented: true,
        selectable: true,
        centeredRotation: false,
        scaleX: geodreieckScale ,
        scaleY: geodreieckScale ,
        hoverCursor: "pointer"});

    geodreieck.on('mousedown', function (o) {
        canvas.bringToFront(geodreieck);
    });



    geodreieck.setControlsVisibility({
        tl: false,
        mt: false,
        tr: false,

        mr: false,
        ml: false,

        bl: false,
        mb: false,
        br: false,
    });

    geodreieck.snapAngle = geodreieckSnapAngle;

    geodreieck.on('moving',function(){geodreieckRotate(this); geodreieckMove(this)});
    geodreieck.on('rotating',function(){geodreieckRotate(this); geodreieckMove(this)});

    geodreieck.on('mousedown', function () {geodreieckIsClicked = true;});
    geodreieck.on('mouseup', function () {geodreieckIsClicked = false;})

});





//-----------------Geodreieck Ende---------------------------------



//Globale Variablen
let isLineStarted = false;
let lineContinueAt = -1;
let selectedTool = 'grab';

let epsilon = 0.0000001;
let snap_radius_sectors = 8;
let snap_radius_line = 15;
let snap_radius_markPoint = 15;

let snap_geodreieck_on_mark = 5;

let edgeColor
//let edgeColor = '#ccc';
//let edgeColor = '#666';
//let edgeColor = '#FFFFFF';

if (textured == "1"){
    if (textureColored == "1"){
        edgeColor = '';
    }else {
        edgeColor = '#ccc';
    }
}else{
    edgeColor = '#FFFFFF';
}

let abortlength = 20;

let dragPointRadius = 5;
let dragPointPadding = 15;

let lineStrokeWidthWhenSelected = 5;

let cursor;

let pathCoords = [];

let paddingFactor = 0.00001;


let multiply = fabric.util.multiplyTransformMatrices;
let invert = fabric.util.invertTransform;

canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight,
};

let scaleRatio;

let snap_radius_slider = 10 * scaleFacotor;

let startOpacity = 0.9

let sectors = [];

let markPoints = [];

let texts = [];

let vertexAngleParts = [];

let lines = [];

let chosenLineGlobalID = -1;

let history = [];

let verticesVisible = false;

let toCalcSectorArea = false;

let deficitAngleVisualizeGroup = new fabric.Group;

let deficitAngleVisualizeGroupOpacity = 0.5

let longEdgeLineLengthFactor = 1.6

let lineTypeToDraw;

let slider_max = 100;

let sectorToSnap = -1;

let snappingToChosenDistance = 1;


function autoSetSectorsAlongGeodesic(chosenGeodesicToSetSectors) {


    if (chosenGeodesicToSetSectors == -1){
        return
    }

    //resetSectors();

    //Idee: Ähnlich zur automatischen Vervollständigung soll die Geodäte von Sektor zu Sektor verlaufen
    //dabei sollen die entsprechenden Kanten ermittelt werden. An diesen Kanten sollen die Sektoren anschließend zusammenschnappen

    let alpha = 0.0;
    let kantenIndex = -1;

    let xt1;
    let xt2;
    let yt1;
    let yt2;

    let dxg;
    let dyg;
    let dxt12;
    let dyt12;


    kantenindex = -1;

    if (typeof chosenGeodesicToSetSectors === 'undefined') {
        return;
    }else {

        if ( lines[chosenGeodesicToSetSectors].length > 0) {


            let geodesic_end_point = new fabric.Point(lines[chosenGeodesicToSetSectors][0].calcLinePoints().x2, lines[chosenGeodesicToSetSectors][0].calcLinePoints().y2);
            geodesic_end_point = fabric.util.transformPoint(geodesic_end_point, lines[chosenGeodesicToSetSectors][0].calcTransformMatrix());

            let xg2 = geodesic_end_point.x;
            let yg2 = geodesic_end_point.y;

            let geodesic_start_point = new fabric.Point(lines[chosenGeodesicToSetSectors][0].calcLinePoints().x1, lines[chosenGeodesicToSetSectors][0].calcLinePoints().y1);
            geodesic_start_point = fabric.util.transformPoint(geodesic_start_point, lines[chosenGeodesicToSetSectors][0].calcTransformMatrix());

            let xg1 = geodesic_start_point.x;
            let yg1 = geodesic_start_point.y;

            let dxg_tmp = xg2 - xg1;
            let dyg_tmp = yg2 - yg1;

            dxg = dxg_tmp * 0.1;
            dyg = dyg_tmp * 0.1;

            //Umrechnung der lokalen in globale Koordinaten

            let trapezPointsAsGlobalCoords = getTrapezPointsAsGlobalCoords(sectors[lines[chosenGeodesicToSetSectors][0].parentSector[0]].trapez);

            //Bestimmen der Kantenparameter des InitialSektors
            let kantenParameter = getKantenParameter(lines[chosenGeodesicToSetSectors][0].parentSector[0], xg1, yg1, dxg, dyg)

            let alpha = kantenParameter[0];
            let lambda = kantenParameter[1];
            let kantenIndex = kantenParameter[2];

            //Bestimmen der Kantepunkte des InitialSektors, die die Geodäte schneiden würde (relevant für die Steigungsberechnung für Rapidity)

            xt1 = trapezPointsAsGlobalCoords[kantenIndex].x;
            xt2 = trapezPointsAsGlobalCoords[(kantenIndex + 1) % 4].x;
            yt1 = trapezPointsAsGlobalCoords[kantenIndex].y;
            yt2 = trapezPointsAsGlobalCoords[(kantenIndex + 1) % 4].y;

            let rapid_sum;

            //der statische Sektor ist der InitialSektor
            //der Nachbarsektor ergibt sich aus Nachbarschaftsbeziehung des InitalSektors unter Eingabe des vorher bestimmten KantenIndexes

            let staticSector = lines[chosenGeodesicToSetSectors][0].parentSector[0];
            let neighbourSector = sectors[lines[chosenGeodesicToSetSectors][0].parentSector[0]].neighbourhood[kantenIndex];

            let immediatehistory =[1]

            //Fortsetzung im nächsten Sektor

            for (lauf = 0; lauf < 100; lauf++) {

                if (neighbourSector === -1 || sectors[neighbourSector].trapez.opacity !== startOpacity) {
                    drawDragPoint(chosenGeodesicToSetSectors);
                    break
                }
                if (goThroughStar !== "1"){
                    if (sectors[neighbourSector].fill === '#e2e2e2') {
                        drawDragPoint(chosenGeodesicToSetSectors);
                        break
                    }
                }

                sectorParameterOnMousedown = getSectorParameterOnMousedown(sectors[neighbourSector].ID)
                immediatehistory.push(sectorParameterOnMousedown)

                removeSnapEdges(staticSector);

                //drawOrientationCirc('blue', x_kante_uebergang, y_kante_uebergang)

                if (turnLorentzTransformOn == "1"){

                    let neighbourTrapezPointsAsGlobalCoords = getTrapezPointsAsGlobalCoords(sectors[neighbourSector].trapez)

                    //Übergangspunkte übernehmen
                    xt1_uebergang = neighbourTrapezPointsAsGlobalCoords[(kantenIndex + 3) % 4].x;
                    xt2_uebergang = neighbourTrapezPointsAsGlobalCoords[(kantenIndex + 2) % 4].x;
                    yt1_uebergang = neighbourTrapezPointsAsGlobalCoords[(kantenIndex + 3) % 4].y;
                    yt2_uebergang = neighbourTrapezPointsAsGlobalCoords[(kantenIndex + 2) % 4].y;

                    dxt12_uebergang = xt2_uebergang - xt1_uebergang;
                    dyt12_uebergang = yt2_uebergang - yt1_uebergang;

                    x_kante_uebergang = xt1_uebergang + alpha * dxt12_uebergang;
                    y_kante_uebergang = yt1_uebergang + alpha * dyt12_uebergang;

                    let rapid_base;

                    if (Math.abs(xt1 - xt2) > Math.abs(yt1 - yt2)) {

                            rapid_base = Math.atanh((yt2 - yt1) / (xt2 - xt1))
                    } else {
                            rapid_base = Math.atanh((xt2 - xt1) / (yt2 - yt1))
                        }




                    let rapid_target;

                    if (Math.abs(xt1_uebergang - xt2_uebergang) > Math.abs(yt1_uebergang - yt2_uebergang)) {

                            rapid_target = Math.atanh((yt2_uebergang - yt1_uebergang) / (xt2_uebergang - xt1_uebergang))
                    } else {
                            rapid_target = Math.atanh((xt2_uebergang - xt1_uebergang) / (yt2_uebergang - yt1_uebergang))
                        }




                    rapid_sum = rapid_base - rapid_target;



                    sectors[neighbourSector].rapidity += rapid_sum;


                    let dist_inv_min_x_old = Math.min(sectors[neighbourSector].trapez.points[0].x, sectors[neighbourSector].trapez.points[1].x, sectors[neighbourSector].trapez.points[2].x, sectors[neighbourSector].trapez.points[3].x);
                    let dist_inv_max_y_old = Math.max(sectors[neighbourSector].trapez.points[0].y, sectors[neighbourSector].trapez.points[1].y, sectors[neighbourSector].trapez.points[2].y, sectors[neighbourSector].trapez.points[3].y);

                    lorentzTransform(sectors[neighbourSector].rapidity, sectors[neighbourSector].trapez)

                    reinitialiseSector(dist_inv_min_x_old, dist_inv_max_y_old, neighbourSector)

                    neighbourTrapezPointsAsGlobalCoords = getTrapezPointsAsGlobalCoords(sectors[neighbourSector].trapez)

                    //Übergangspunkte übernehmen
                    xt1_uebergang = neighbourTrapezPointsAsGlobalCoords[(kantenIndex + 3) % 4].x;
                    xt2_uebergang = neighbourTrapezPointsAsGlobalCoords[(kantenIndex + 2) % 4].x;
                    yt1_uebergang = neighbourTrapezPointsAsGlobalCoords[(kantenIndex + 3) % 4].y;
                    yt2_uebergang = neighbourTrapezPointsAsGlobalCoords[(kantenIndex + 2) % 4].y;

                    dxt12_uebergang = xt2_uebergang - xt1_uebergang;
                    dyt12_uebergang = yt2_uebergang - yt1_uebergang;

                    x_kante_uebergang = xt1_uebergang + alpha * dxt12_uebergang;
                    y_kante_uebergang = yt1_uebergang + alpha * dyt12_uebergang;

                    //sectors[neighbourSector].trapez.set('left', lastLeft + dist_inv_min_x_new - dist_inv_min_x_old).setCoords();
                    //sectors[neighbourSector].trapez.set('top', lastTop + dist_inv_min_y_new - dist_inv_max_y_old).setCoords();

                    //-----------------------------------------------

                    translateInitialSectorToTargetSector(neighbourSector, staticSector);

                }else{

                    //Heransnappen des NachbarSektors an den statischen Sektor (dies ist nur im ersten Durchlauf der InitialSektor)

                    rotateSectorToAlignAngle(neighbourSector, staticSector);

                    translateInitialSectorToTargetSector(neighbourSector, staticSector);
                }


                changeSnapStatus(staticSector);
                changeSnapStatus(neighbourSector);

                drawSnapEdges(staticSector);
                drawSnapEdges(neighbourSector);



                //Übergangsrichtung ermitteln



                neighbourTrapezPointsAsGlobalCoords = getTrapezPointsAsGlobalCoords(sectors[neighbourSector].trapez)

                //Übergangspunkte übernehmen
                xt1_uebergang = neighbourTrapezPointsAsGlobalCoords[(kantenIndex + 3) % 4].x;
                xt2_uebergang = neighbourTrapezPointsAsGlobalCoords[(kantenIndex + 2) % 4].x;
                yt1_uebergang = neighbourTrapezPointsAsGlobalCoords[(kantenIndex + 3) % 4].y;
                yt2_uebergang = neighbourTrapezPointsAsGlobalCoords[(kantenIndex + 2) % 4].y;

                dxt12_uebergang = xt2_uebergang - xt1_uebergang;
                dyt12_uebergang = yt2_uebergang - yt1_uebergang;

                x_kante_uebergang = xt1_uebergang + alpha * dxt12_uebergang;
                y_kante_uebergang = yt1_uebergang + alpha * dyt12_uebergang;

                kantenParameter = getKantenParameter(neighbourSector, x_kante_uebergang, y_kante_uebergang, dxg, dyg)

                kantenIndex = kantenParameter[2]

                neighbourTrapezPointsAsGlobalCoords = getTrapezPointsAsGlobalCoords(sectors[neighbourSector].trapez)

                xt1 = neighbourTrapezPointsAsGlobalCoords[kantenIndex].x;
                xt2 = neighbourTrapezPointsAsGlobalCoords[(kantenIndex + 1) % 4].x;
                yt1 = neighbourTrapezPointsAsGlobalCoords[kantenIndex].y;
                yt2 = neighbourTrapezPointsAsGlobalCoords[(kantenIndex + 1) % 4].y;

                dxt12 = xt2 - xt1;
                dyt12 = yt2 - yt1;


                staticSector = neighbourSector;

                neighbourSector = sectors[neighbourSector].neighbourhood[kantenIndex];

                alpha = kantenParameter[0];



            }

            history.push(immediatehistory)


        }

    }
}

function calcSectorArea() {
    if (toCalcSectorArea !== true){
        toCalcSectorArea = true
        showSectorAreaInfobox(true)
    }else {
        toCalcSectorArea = false
        showSectorAreaInfobox(false)
    }
}

function changeDirectionAndContinue(rotationdirection, rotationAngle, chosenGeodesicTochangeDirection) {
    if (chosenLineGlobalID == -1) {
        return
    }

    if (lines[chosenGeodesicTochangeDirection][lines[chosenGeodesicTochangeDirection].length - 1].lineType !== 'geodesic') {
        return
    }

    let segment_end_point = new fabric.Point(lines[chosenGeodesicTochangeDirection][0].calcLinePoints().x2, lines[chosenGeodesicTochangeDirection][0].calcLinePoints().y2);
    segment_end_point = fabric.util.transformPoint(segment_end_point,lines[chosenGeodesicTochangeDirection][0].calcTransformMatrix() );

    let geodesic_start_point = new fabric.Point(lines[chosenGeodesicTochangeDirection][0].calcLinePoints().x1, lines[chosenGeodesicTochangeDirection][0].calcLinePoints().y1);
    geodesic_start_point = fabric.util.transformPoint(geodesic_start_point, lines[chosenGeodesicTochangeDirection][0].calcTransformMatrix());

    let xg1 = geodesic_start_point.x;
    let yg1 = geodesic_start_point.y;
    let xg2 = segment_end_point.x;
    let yg2 = segment_end_point.y;

    let dxg;
    let dyg;

    let dxg_tmp = xg2 - xg1;
    let dyg_tmp = yg2 - yg1;

    // Die Richtungsaenderung bewirkt automatisch eine Veraenderung in der Laenge des Richtungsvektors.
    // Obwohl das urspruengliche Endstueck der Geodaete auf der Kante lag, muss deshalb der Richtungsvektor nicht verkürzt werden.

    //Drehen der Geodätenrichtung:
    if (rotationdirection == 'clockwise') {
        dxg = dxg_tmp * Math.cos(rotationAngle) - dyg_tmp * Math.sin(rotationAngle);
        dyg = dxg_tmp * Math.sin(rotationAngle) + dyg_tmp * Math.cos(rotationAngle);
    } else {
        dxg = dxg_tmp * Math.cos(- rotationAngle) - dyg_tmp * Math.sin(- rotationAngle);
        dyg = dxg_tmp * Math.sin(- rotationAngle) + dyg_tmp * Math.cos(- rotationAngle);
    }

    //Bestimmen des Schnittpunktes des neuen Geodätenstücks mit der Sektorkante

    let kantenParameter = getKantenParameter(lines[chosenGeodesicTochangeDirection][0].parentSector[0], xg1, yg1, dxg, dyg)
    let lambda = kantenParameter[1];

    let lineSegmentToChangeDirection

    let lineSegmentColor = lines[chosenGeodesicTochangeDirection][0].fill
    let lineSegmentStrokeWidth = lines[chosenGeodesicTochangeDirection][0].strokeWidth
    let parentSectorID = lines[chosenGeodesicTochangeDirection][0].parentSector[0]
    let lineStart_x = geodesic_start_point.x;
    let lineStart_y = geodesic_start_point.y;
    let lineEnd_x = geodesic_start_point.x + dxg * lambda;
    let lineEnd_y = geodesic_start_point.y + dyg * lambda;

    deleteWholeGeodesic(chosenGeodesicTochangeDirection)

    if(Math.abs(lineEnd_x - lineStart_x) > epsilon || Math.abs(lineEnd_y - lineStart_y) > epsilon) {

        lineSegmentToChangeDirection = drawLineSegment(lineSegmentColor, lineSegmentStrokeWidth, parentSectorID, lineStart_x, lineStart_y, lineEnd_x, lineEnd_y)

        lineSegmentToChangeDirection.ID = [chosenGeodesicTochangeDirection, lines[chosenGeodesicTochangeDirection].length];

        lines[chosenGeodesicTochangeDirection].push(lineSegmentToChangeDirection);

    }

    //Verlängerung der Geodäte bis zum Rand des Modells
    continueGeodesic(chosenGeodesicTochangeDirection)

    history[history.length - 1].splice(1, 0, lineSegmentToChangeDirection.ID)

    history.push([3, 2])

    if (showExerciseBox == "1"){
        checkSlideCondition();
        checkCheckBoxCondition();
    }
}

function changeRelationShipAfterTransform(initialSectorTrapez, rapid_sum){
    let trapezPointsAsGlobalCoords = getTrapezPointsAsGlobalCoords(initialSectorTrapez)

    let midpoint_boundingbox_before_global = new fabric.Point(initialSectorTrapez.left + initialSectorTrapez.width/2 , initialSectorTrapez.top - initialSectorTrapez.height/2 );

    initialSectorTrapez.parent.ID_text.set('left', initialSectorTrapez.parent.ID_text.start_pos_BL_text_x * Math.cosh(rapid_sum) + initialSectorTrapez.parent.ID_text.start_pos_BL_text_y * Math.sinh(rapid_sum) + trapezPointsAsGlobalCoords[3].x);
    initialSectorTrapez.parent.ID_text.set('top', initialSectorTrapez.parent.ID_text.start_pos_BL_text_x * Math.sinh(rapid_sum) + initialSectorTrapez.parent.ID_text.start_pos_BL_text_y * Math.cosh(rapid_sum) + trapezPointsAsGlobalCoords[3].y);

    initialSectorTrapez.parent.ID_text.relationship[4] = initialSectorTrapez.parent.ID_text.left - midpoint_boundingbox_before_global.x - 1;
    initialSectorTrapez.parent.ID_text.relationship[5] = initialSectorTrapez.parent.ID_text.top - midpoint_boundingbox_before_global.y + 1;

    for (let jj = 0; jj < initialSectorTrapez.parent.ticks.length; jj++) {
        let tick_start_point_calc = new fabric.Point(
            initialSectorTrapez.parent.ticks[jj].start_point_BL.x * Math.cosh(rapid_sum) + initialSectorTrapez.parent.ticks[jj].start_point_BL.y * Math.sinh(rapid_sum) + trapezPointsAsGlobalCoords[3].x,
            initialSectorTrapez.parent.ticks[jj].start_point_BL.x * Math.sinh(rapid_sum) + initialSectorTrapez.parent.ticks[jj].start_point_BL.y * Math.cosh(rapid_sum) + trapezPointsAsGlobalCoords[3].y
        );
        let tick_end_point_calc = new fabric.Point(
            initialSectorTrapez.parent.ticks[jj].end_point_BL.x * Math.cosh(rapid_sum) + initialSectorTrapez.parent.ticks[jj].end_point_BL.y * Math.sinh(rapid_sum) + trapezPointsAsGlobalCoords[3].x,
            initialSectorTrapez.parent.ticks[jj].end_point_BL.x * Math.sinh(rapid_sum) + initialSectorTrapez.parent.ticks[jj].end_point_BL.y * Math.cosh(rapid_sum) + trapezPointsAsGlobalCoords[3].y
        );

        let tick_transformed_mid_point = new fabric.Point(
            tick_start_point_calc.x + (tick_end_point_calc.x - tick_start_point_calc.x) * 0.5,
            tick_start_point_calc.y + (tick_end_point_calc.y - tick_start_point_calc.y) * 0.5,
        );

        initialSectorTrapez.parent.ticks[jj].relationship[4] = tick_transformed_mid_point.x - midpoint_boundingbox_before_global.x - 0.5;

        initialSectorTrapez.parent.ticks[jj].relationship[5] =  tick_transformed_mid_point.y - midpoint_boundingbox_before_global.y + 0.5;
    }

    for (let jj = 0; jj < initialSectorTrapez.parent.lineSegments.length; jj++) {

        if (initialSectorTrapez.parent.lineSegments[jj].lineType == "geodesic") {
            let geodesic_start_point_calc = new fabric.Point(
                initialSectorTrapez.parent.lineSegments[jj].start_point_BL.x * Math.cosh(rapid_sum) + initialSectorTrapez.parent.lineSegments[jj].start_point_BL.y * Math.sinh(rapid_sum) + trapezPointsAsGlobalCoords[3].x,
                initialSectorTrapez.parent.lineSegments[jj].start_point_BL.x * Math.sinh(rapid_sum) + initialSectorTrapez.parent.lineSegments[jj].start_point_BL.y * Math.cosh(rapid_sum) + trapezPointsAsGlobalCoords[3].y
            );
            let geodesic_end_point_calc = new fabric.Point(
                initialSectorTrapez.parent.lineSegments[jj].end_point_BL.x * Math.cosh(rapid_sum) + initialSectorTrapez.parent.lineSegments[jj].end_point_BL.y * Math.sinh(rapid_sum) + trapezPointsAsGlobalCoords[3].x,
                initialSectorTrapez.parent.lineSegments[jj].end_point_BL.x * Math.sinh(rapid_sum) + initialSectorTrapez.parent.lineSegments[jj].end_point_BL.y * Math.cosh(rapid_sum) + trapezPointsAsGlobalCoords[3].y
            );

            let geodesic_transformed_mid_point = new fabric.Point(
                geodesic_start_point_calc.x + (geodesic_end_point_calc.x - geodesic_start_point_calc.x) * 0.5,
                geodesic_start_point_calc.y + (geodesic_end_point_calc.y - geodesic_start_point_calc.y) * 0.5,
            );

            initialSectorTrapez.parent.lineSegments[jj].relationship[4] = geodesic_transformed_mid_point.x - midpoint_boundingbox_before_global.x - 0.5;

            initialSectorTrapez.parent.lineSegments[jj].relationship[5] =  geodesic_transformed_mid_point.y - midpoint_boundingbox_before_global.y + 0.5;
        }


        if (initialSectorTrapez.parent.lineSegments[jj].lineType == "polyline"){

            initialSectorTrapez.parent.lineSegments[jj].set('left', initialSectorTrapez.parent.lineSegments[jj].polylineMidPoint_BL.x * Math.cosh(rapid_sum) + initialSectorTrapez.parent.lineSegments[jj].polylineMidPoint_BL.y * Math.sinh(rapid_sum) + trapezPointsAsGlobalCoords[3].x);
            initialSectorTrapez.parent.lineSegments[jj].set('top', initialSectorTrapez.parent.lineSegments[jj].polylineMidPoint_BL.x * Math.sinh(rapid_sum) + initialSectorTrapez.parent.lineSegments[jj].polylineMidPoint_BL.y * Math.cosh(rapid_sum) + trapezPointsAsGlobalCoords[3].y);

            initialSectorTrapez.parent.lineSegments[jj].relationship[4] = initialSectorTrapez.parent.lineSegments[jj].left - midpoint_boundingbox_before_global.x;

            initialSectorTrapez.parent.lineSegments[jj].relationship[5] = initialSectorTrapez.parent.lineSegments[jj].top - midpoint_boundingbox_before_global.y + 1;
        }

        if (initialSectorTrapez.parent.lineSegments[jj].dragPoint !== undefined) {

            dragPoint_transformed_mid_point = new fabric.Point(
                initialSectorTrapez.parent.lineSegments[jj].dragPoint.start_pos_BL_dragPoint_x * Math.cosh(rapid_sum) + initialSectorTrapez.parent.lineSegments[jj].dragPoint.start_pos_BL_dragPoint_y * Math.sinh(rapid_sum) + trapezPointsAsGlobalCoords[3].x,
                initialSectorTrapez.parent.lineSegments[jj].dragPoint.start_pos_BL_dragPoint_x * Math.sinh(rapid_sum) + initialSectorTrapez.parent.lineSegments[jj].dragPoint.start_pos_BL_dragPoint_y * Math.cosh(rapid_sum) + trapezPointsAsGlobalCoords[3].y
            );

            initialSectorTrapez.parent.lineSegments[jj].dragPoint.relationship[4] = dragPoint_transformed_mid_point.x - midpoint_boundingbox_before_global.x - 0.5;
            initialSectorTrapez.parent.lineSegments[jj].dragPoint.relationship[5] = dragPoint_transformed_mid_point.y - midpoint_boundingbox_before_global.y + 0.5;

        }
    }
}

function changeSnapStatus(initialSectorID) {
    for (let ii = 0; ii < 4; ii++){
        if (sectors[initialSectorID].neighbourhood[ii] > -1) {
            let edgePoints = getPointsOfOppositeEdges(initialSectorID, sectors[initialSectorID].neighbourhood[ii]);

            let point_1 = edgePoints[0];
            let point_2 = edgePoints[1];

            let point_a = edgePoints[2];
            let point_b = edgePoints[3];

            let dist_1a = distance(point_1, point_a);
            let dist_2b = distance(point_2, point_b);

            if (dist_1a < epsilon && dist_2b < epsilon) {
                sectors[initialSectorID].snapStatus[ii] = 1;
                sectors[sectors[initialSectorID].neighbourhood[ii]].snapStatus[(ii + 2) % 4] = 1;
            } else {
                sectors[initialSectorID].snapStatus[ii] = 0;
                sectors[sectors[initialSectorID].neighbourhood[ii]].snapStatus[(ii + 2) % 4] = 0;
            }
        }
    }

}

function continueGeodesic(geodesicToContinue) {

    if (lines[geodesicToContinue][lines[geodesicToContinue].length - 1].lineType !== 'geodesic') {
        return
    }

    let xt1;
    let xt2;
    let yt1;
    let yt2;

    let dxt12;
    let dyt12;

    let slopeAngle;

    let immediatehistory =[0];

    kantenindex = -1;

    if (typeof geodesicToContinue === 'undefined' || geodesicToContinue == -1) {
        return;
    } else {

        if ( lines[geodesicToContinue].length > 0) {


            if(lines[geodesicToContinue][lines[geodesicToContinue].length-1].dragPoint !== undefined){

                canvas.remove(lines[geodesicToContinue][lines[geodesicToContinue].length - 1].dragPoint);
                delete lines[geodesicToContinue][lines[geodesicToContinue].length - 1].dragPoint;

            }

            let geodesic_end_point = new fabric.Point(lines[geodesicToContinue][lines[geodesicToContinue].length - 1].calcLinePoints().x2, lines[geodesicToContinue][lines[geodesicToContinue].length - 1].calcLinePoints().y2);
            geodesic_end_point = fabric.util.transformPoint(geodesic_end_point, lines[geodesicToContinue][lines[geodesicToContinue].length - 1].calcTransformMatrix());

            let xg2 = geodesic_end_point.x;
            let yg2 = geodesic_end_point.y;

            let geodesic_start_point = new fabric.Point(lines[geodesicToContinue][lines[geodesicToContinue].length - 1].calcLinePoints().x1, lines[geodesicToContinue][lines[geodesicToContinue].length - 1].calcLinePoints().y1);
            geodesic_start_point = fabric.util.transformPoint(geodesic_start_point, lines[geodesicToContinue][lines[geodesicToContinue].length - 1].calcTransformMatrix());

            let xg1 = geodesic_start_point.x;
            let yg1 = geodesic_start_point.y;

            let dxg_tmp = xg2 - xg1;
            let dyg_tmp = yg2 - yg1;

            let dxg = dxg_tmp * 0.1;
            let dyg = dyg_tmp * 0.1;

            let trapezPointsAsGlobalCoords = getTrapezPointsAsGlobalCoords(sectors[lines[geodesicToContinue][lines[geodesicToContinue].length - 1].parentSector[0]].trapez);

            let kantenParameter = getKantenParameter(lines[geodesicToContinue][lines[geodesicToContinue].length - 1].parentSector[0], xg1, yg1, dxg, dyg)

            let alpha = kantenParameter[0];
            let lambda = kantenParameter[1];
            let kantenIndex = kantenParameter[2];

            xt1 = trapezPointsAsGlobalCoords[kantenIndex].x;
            xt2 = trapezPointsAsGlobalCoords[(kantenIndex + 1) % 4].x;
            yt1 = trapezPointsAsGlobalCoords[kantenIndex].y;
            yt2 = trapezPointsAsGlobalCoords[(kantenIndex + 1) % 4].y;

            dxt12 = xt2 - xt1;
            dyt12 = yt2 - yt1;

            let neighbourSectorID = sectors[lines[geodesicToContinue][lines[geodesicToContinue].length - 1].parentSector[0]].neighbourhood[kantenIndex];

            let lineSegmentColor = lines[geodesicToContinue][lines[geodesicToContinue].length-1].fill

            let lineSegmentStrokeWidth = lines[geodesicToContinue][lines[geodesicToContinue].length-1].strokeWidth;

            let parentSectorID = lines[geodesicToContinue][lines[geodesicToContinue].length-1].parentSector[0]

            let lineSegmentContinue;

            let lineStart_x = xg2;
            let lineStart_y = yg2;
            let lineEnd_x = xt1 + dxt12 * alpha;
            let lineEnd_y = yt1 + dyt12 * alpha;

            if(Math.abs(lineEnd_x - lineStart_x) > epsilon || Math.abs(lineEnd_y - lineStart_y) > epsilon) {

                lineSegmentContinue = drawLineSegment(lineSegmentColor, lineSegmentStrokeWidth, parentSectorID, lineStart_x, lineStart_y, lineEnd_x, lineEnd_y);

                lineSegmentContinue.ID = [geodesicToContinue, lines[geodesicToContinue].length];

                lines[geodesicToContinue].push(lineSegmentContinue);

                immediatehistory.push(lineSegmentContinue.ID);
            }

            /*
            lines[geodesicToContinue][lines[geodesicToContinue].length - 1].set({x1: geodesic_start_point.x, y1: geodesic_start_point.y});

            lines[geodesicToContinue][lines[geodesicToContinue].length - 1].set({x2: geodesic_start_point.x + dxg * lambda, y2: geodesic_start_point.y + dyg * lambda});

            //WICHTIG: WARUM DIESE EINSTELLUNG FUNKTIONIERT VERSTEHE ICH NICHT!!!
            //Damit das zu setzende Geodätenstück nicht falsch gedreht wird, muss der Winkel eingestellt werden
            lines[geodesicToContinue][lines[geodesicToContinue].length - 1].set({angle: 0});


            lines[geodesicToContinue][lines[geodesicToContinue].length - 1].setCoords();

            */

            if (turnLorentzTransformOn == "1"){

                getStartAndEndPointCoordsBeforeLorentztransform(lines[geodesicToContinue][lines[geodesicToContinue].length - 1])

            }

            //lines[geodesicToContinue][lines[geodesicToContinue].length - 1].relationship = getRelationship(lines[geodesicToContinue][lines[geodesicToContinue].length - 1], lines[geodesicToContinue][lines[geodesicToContinue].length - 1].parentSector[0]);


            //Fortsetzung im nächsten Sektor

            if (turnLorentzTransformOn !== "1"){
                slopeAngle = Math.acos((dxg * dxt12 + dyg * dyt12) / ((Math.sqrt(dxg * dxg + dyg * dyg)) * (Math.sqrt(dxt12 * dxt12 + dyt12 * dyt12))));
            }

            for (lauf = 0; lauf < 100; lauf++) {

                if (neighbourSectorID === -1 || sectors[neighbourSectorID].trapez.opacity !== startOpacity) {
                    drawDragPoint(geodesicToContinue);
                    break
                }
                if (goThroughStar !== "1"){
                    if (sectors[neighbourSectorID].fill === '#e2e2e2') {
                        drawDragPoint(geodesicToContinue);
                        break
                    }
                }


                let neighbourTrapezPointsAsGlobalCoords = getTrapezPointsAsGlobalCoords(sectors[neighbourSectorID].trapez)

                //Übergangspunkte übernehmen
                xt1_uebergang = neighbourTrapezPointsAsGlobalCoords[(kantenIndex + 3) % 4].x;
                xt2_uebergang = neighbourTrapezPointsAsGlobalCoords[(kantenIndex + 2) % 4].x;
                yt1_uebergang = neighbourTrapezPointsAsGlobalCoords[(kantenIndex + 3) % 4].y;
                yt2_uebergang = neighbourTrapezPointsAsGlobalCoords[(kantenIndex + 2) % 4].y;

                dxt12_uebergang = xt2_uebergang - xt1_uebergang;
                dyt12_uebergang = yt2_uebergang - yt1_uebergang;

                x_kante_uebergang = xt1_uebergang + alpha * dxt12_uebergang;
                y_kante_uebergang = yt1_uebergang + alpha * dyt12_uebergang;

                //Übergangsrichtung ermitteln

                if (turnLorentzTransformOn == "1"){
                    let rapid_base;
                    if (Math.abs(xt1 - xt2) > Math.abs(yt1 - yt2)) {
                            rapid_base = Math.atanh((yt2 - yt1) / (xt2 - xt1))
                    }else {
                            rapid_base = Math.atanh( (xt2 - xt1) / (yt2 - yt1 ) )
                        }


                    let rapid_target;

                    if (Math.abs(xt1_uebergang - xt2_uebergang) > Math.abs(yt1_uebergang - yt2_uebergang) ){

                            rapid_target = Math.atanh((yt2_uebergang - yt1_uebergang) / (xt2_uebergang - xt1_uebergang))
                    }else {
                            rapid_target = Math.atanh( (xt2_uebergang - xt1_uebergang) / (yt2_uebergang - yt1_uebergang))
                    }


                    let rapid_sum = rapid_base - rapid_target;

                    dxg_tmp = dxg;
                    dyg_tmp = dyg;

                    if (lines[geodesicToContinue].operational !== false) {
                        dxg = Math.cosh(-rapid_sum) * dxg_tmp + Math.sinh(-rapid_sum) * dyg_tmp;
                        dyg = Math.sinh(-rapid_sum) * dxg_tmp + Math.cosh(-rapid_sum) * dyg_tmp;
                    }else{

                        dxg = Math.cosh(-sectors[neighbourSectorID].rapidity) * dxg_tmp + Math.sinh(-sectors[neighbourSectorID].rapidity) * dyg_tmp;
                        dyg = Math.sinh(-sectors[neighbourSectorID].rapidity) * dxg_tmp + Math.cosh(-sectors[neighbourSectorID].rapidity) * dyg_tmp;
                    }
                }else{
                    dxg  = dxt12_uebergang * Math.cos(-slopeAngle) - dyt12_uebergang * Math.sin(-slopeAngle);
                    dyg  = dxt12_uebergang * Math.sin(-slopeAngle) + dyt12_uebergang * Math.cos(-slopeAngle);

                }


                //Schnittpunkte mit den neuen Sektorkanten ermitteln

                kantenParameter = getKantenParameter(neighbourSectorID, x_kante_uebergang, y_kante_uebergang, dxg, dyg)

                alpha_2 = kantenParameter[0];
                lambda = kantenParameter[1];
                kantenIndex = kantenParameter[2];

                xt1 = neighbourTrapezPointsAsGlobalCoords[kantenIndex].x;
                xt2 = neighbourTrapezPointsAsGlobalCoords[(kantenIndex + 1) % 4].x;
                yt1 = neighbourTrapezPointsAsGlobalCoords[kantenIndex].y;
                yt2 = neighbourTrapezPointsAsGlobalCoords[(kantenIndex + 1) % 4].y;

                dxt12 = xt2 - xt1;
                dyt12 = yt2 - yt1;

                lineSegmentColor = lines[geodesicToContinue][0].fill;
                lineSegmentStrokeWidth = lines[geodesicToContinue][0].strokeWidth
                parentSectorID = neighbourSectorID;

                lineStart_x = x_kante_uebergang;
                lineStart_y = y_kante_uebergang;
                lineEnd_x = xt1 + alpha_2 * dxt12;
                lineEnd_y = yt1 + alpha_2 * dyt12;

                if(Math.abs(lineEnd_x - lineStart_x) > epsilon || Math.abs(lineEnd_y - lineStart_y) > epsilon) {

                    lineSegmentContinue = drawLineSegment(lineSegmentColor, lineSegmentStrokeWidth, parentSectorID, lineStart_x, lineStart_y, lineEnd_x, lineEnd_y);

                    lineSegmentContinue.ID = [geodesicToContinue, lines[geodesicToContinue].length];

                    lines[geodesicToContinue].push(lineSegmentContinue);

                    immediatehistory.push(lineSegmentContinue.ID);
                }


                if (turnLorentzTransformOn == "1"){
                    getStartAndEndPointCoordsBeforeLorentztransform(lineSegmentContinue)
                }

                if (turnLorentzTransformOn !== "1"){
                    slopeAngle = Math.acos((dxg * dxt12 + dyg * dyt12) / ((Math.sqrt(dxg * dxg + dyg * dyg)) * (Math.sqrt(dxt12 * dxt12 + dyt12 * dyt12))));
                }



                neighbourSectorID = sectors[lineSegmentContinue.parentSector[0]].neighbourhood[kantenIndex];


                alpha = alpha_2
            }
        }

    }

    history.push(immediatehistory);


}

function deleteWholeGeodesic(geodesicToDelete) {

    let immediatehistory = [2, geodesicToDelete];

    for (let ii = lines[geodesicToDelete].length - 1; ii >= 0; ii--) {

        if(lines[geodesicToDelete][ii].parentSector[0] !== -1) {

            let entryToSplice_tmp = sectors[lines[geodesicToDelete][ii].parentSector[0]].lineSegments[lines[geodesicToDelete][ii].parentSector[1]].parentSector[1]

            sectors[lines[geodesicToDelete][ii].parentSector[0]].lineSegments.splice(sectors[lines[geodesicToDelete][ii].parentSector[0]].lineSegments[lines[geodesicToDelete][ii].parentSector[1]].parentSector[1], 1)

            for (let jj = 0; jj < sectors[lines[geodesicToDelete][ii].parentSector[0]].lineSegments.length; jj++) {

                if (entryToSplice_tmp < sectors[lines[geodesicToDelete][ii].parentSector[0]].lineSegments[jj].parentSector[1]) {

                    sectors[lines[geodesicToDelete][ii].parentSector[0]].lineSegments[jj].parentSector[1] -= 1

                }

            }
        }

        let lineSegment = lines[geodesicToDelete][ii];

        if(lines[geodesicToDelete][lines[geodesicToDelete].length-1].dragPoint!==undefined){
            canvas.remove(lines[geodesicToDelete][lines[geodesicToDelete].length-1].dragPoint);
            delete lines[geodesicToDelete][lines[geodesicToDelete].length-1].dragPoint;

        }

        if (lineSegment.lineType == 'geodesic'){
            let geodesic_start_point = new fabric.Point(lineSegment.calcLinePoints().x1, lineSegment.calcLinePoints().y1);
            geodesic_start_point = fabric.util.transformPoint(geodesic_start_point, lineSegment.calcTransformMatrix());

            let xg1 = geodesic_start_point.x;
            let yg1 = geodesic_start_point.y;

            let geodesic_end_point = new fabric.Point(lineSegment.calcLinePoints().x2, lineSegment.calcLinePoints().y2);
            geodesic_end_point = fabric.util.transformPoint(geodesic_end_point, lineSegment.calcTransformMatrix());

            let xg2 = geodesic_end_point.x;
            let yg2 = geodesic_end_point.y;

            lineSegmentParameter = [lineSegment.lineType, lineSegment.stroke, lineSegment.strokeWidth, lineSegment.parentSector[0], xg1, yg1, xg2, yg2]

            immediatehistory.push(lineSegmentParameter);
        }

        if (lineSegment.lineType == 'polyline'){

            lineSegment.points = getPolylinePointsImGlobalCoords(lineSegment);

            lineSegmentParameter = [lineSegment.lineType, lineSegment.stroke, lineSegment.strokeWidth, lineSegment.parentSector[0], lineSegment.points]

            immediatehistory.push(lineSegmentParameter);
        }



        canvas.remove(lineSegment)

    }

    history.push(immediatehistory)

    lines[geodesicToDelete] = [];


}

function distance(punkt1, punkt2) {
    return Math.sqrt(Math.pow((punkt2.x - punkt1.x), 2) + Math.pow((punkt2.y - punkt1.y), 2));
}

function distancePointStraightLine(point_x, point_y, point_line_x, point_line_y, direction_x, direction_y) {

    return Math.abs(((point_x - point_line_x) * direction_y - (point_y - point_line_y) * direction_x) / Math.sqrt(direction_x * direction_x + direction_y * direction_y))

}

function drawAngleArc(initialSectorID, initialArcID_onSector, deficitAngleRad){

    let point_1 = sectors[initialSectorID].trapez.points[initialArcID_onSector];
    let point_2 = sectors[initialSectorID].trapez.points[(initialArcID_onSector +3) % 4 ];

    let dx = point_2.x - point_1.x;
    let dy = point_2.y - point_1.y;

    let angleToRotate = sectors[initialSectorID].trapez.angle + toDegree(Math.atan2(dy, dx))
    let initialTrapezPointsAsGlobalCoords = getTrapezPointsAsGlobalCoords(sectors[initialSectorID].trapez);
    let arcRadius = sectors[initialSectorID].trapez.height * 1.2

    let startAngle;
    let endAngle;


    if (deficitAngleRad < 0){
        startAngle = deficitAngleRad;
        endAngle = 0;
    }else{
        startAngle = 0;
        endAngle = deficitAngleRad;
    }

    let arc = new fabric.Circle({
        radius: arcRadius,
        left: initialTrapezPointsAsGlobalCoords[initialArcID_onSector].x,
        top: initialTrapezPointsAsGlobalCoords[initialArcID_onSector].y,
        angle: angleToRotate,
        startAngle: startAngle,
        endAngle: endAngle,
        stroke: 'red',
        strokeWidth: 2,
        fill: '',
        originY:'center',
        originX:'center',
        objectCaching: false,
        lockMovementX: false,
        lockMovementY: false,
        lockScalingX: true,
        lockScalingY: true,
        selectable: true,
        hoverCursor: 'pointer',
        perPixelTargetFind: true,
        opacity: deficitAngleVisualizeGroupOpacity,
    });

    canvas.add(arc);
    deficitAngleVisualizeGroup.add(arc)
}

function drawDragPoint(lineToGivePoint) {

    if (typeof lineToGivePoint === 'undefined' || lineToGivePoint == -1) {
        return;
    }
    if (lines[lineToGivePoint][lines[lineToGivePoint].length-1] == undefined){
        return
    }
    if(lines[lineToGivePoint][lines[lineToGivePoint].length-1].dragPoint !== undefined){
        canvas.remove(lines[lineToGivePoint][lines[lineToGivePoint].length - 1].dragPoint);
        delete lines[lineToGivePoint][lines[lineToGivePoint].length - 1].dragPoint;
    }

    let lineSegment = lines[lineToGivePoint][lines[lineToGivePoint].length - 1];

    let line_end_point;

    if(lines[lineToGivePoint][lines[lineToGivePoint].length - 1].lineType == 'geodesic') {
        line_end_point = new fabric.Point(lineSegment.calcLinePoints().x2, lineSegment.calcLinePoints().y2);
        line_end_point = fabric.util.transformPoint(line_end_point, lineSegment.calcTransformMatrix());

    }

    if (lines[lineToGivePoint][lines[lineToGivePoint].length - 1].lineType == 'polyline') {

        /*
        ACHTUNG!!!
        Die Punkte der polyline werden in globalen Koordinaten angegeben.
        Hier funktioniert die Funktion lineSegment.calcLinePoints() nicht.
        Um die aktuelle Position von Punkten im globalen Koordinatensystem zu bekommen,
        kann nicht die selbe Methode wie fuer einfache Linien angewandt werden.
        Loesung:    Punkte der Linie nehmen und davon das .pathOffset abziehen
                    anschließend die Transformation wie gewohnt anwenden.
        */

        line_end_point_x = lines[lineToGivePoint][lines[lineToGivePoint].length - 1].points[lines[lineToGivePoint][lines[lineToGivePoint].length - 1].points.length - 1].x
        line_end_point_y = lines[lineToGivePoint][lines[lineToGivePoint].length - 1].points[lines[lineToGivePoint][lines[lineToGivePoint].length - 1].points.length - 1].y
        line_end_point_x -= lines[lineToGivePoint][lines[lineToGivePoint].length - 1].pathOffset.x;
        line_end_point_y -= lines[lineToGivePoint][lines[lineToGivePoint].length - 1].pathOffset.y;
        line_end_point = new fabric.Point(line_end_point_x, line_end_point_y);

        line_end_point = fabric.util.transformPoint(line_end_point, lineSegment.calcTransformMatrix());
    }

    let dragPointOpacity = 1.0;

    if (buildTicks == "1"){
        dragPointOpacity = 0.5
    }

    lineSegment.dragPoint = new fabric.Circle({
        originX: 'center',
        originY: 'center',
        left: line_end_point.x,
        top: line_end_point.y,
        radius: dragPointRadius,
        stroke: 'black',
        strokeWidth: 2,
        fill: lineSegment.stroke,
        perPixelTargetFind: false,
        hasBorders: false,
        padding: 5,
        objectCaching: false,
        selectable: false,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        evented: true,
        hoverCursor: 'crosshair',
        opacity: dragPointOpacity,
    });

    lineSegment.dragPoint.on('mousedown',function(o){

        let dragPointPoint = new fabric.Point(this.left, this. top);
        for (let kk = 0; kk < sectors.length; kk++){
            if(sectorContainsPoint(sectors[kk].trapez, dragPointPoint)){
                if (sectors[kk].ID !== lineSegment.parentSector[0]){
                    let stackIdx = canvas.getObjects().indexOf(sectors[kk].ID_text)
                    if (stackIdx > canvas.getObjects().indexOf(sectors[lineSegment.parentSector[0]].ID_text)){
                        return

                    }
                }
            }

        }


        showSectorAreaInfobox(false);
        showDeficitAngleInfobox(false);
        showVertices(false);

        chosenLineGlobalID = lineSegment.ID[0];
        showGeodesicButtons(true);

        if (autoSetOnDraw == "1") {
            sectors[lineSegment.parentSector[0]].trapez.bringToFront();
            updateMinions(sectors[lineSegment.parentSector[0]].trapez)
        }

        for (let kk = 0; kk < lines.length; kk++){
            for (let ll = 0; ll < lines[kk].length; ll++)
                lines[kk][ll].strokeWidth = 2 ;
        }

        for (let kk = lines[chosenLineGlobalID].length - 1; kk >= 0; kk--) {
            lines[chosenLineGlobalID][kk].strokeWidth = lineStrokeWidthWhenSelected ;
        }

        let pointer = canvas.getPointer(o.e);
        let points = [pointer.x, pointer.y, pointer.x, pointer.y];
        if (lines[lineSegment.ID[0]].length > 0) {
            points = [this.left, this.top, pointer.x, pointer.y];
            lineContinueAt = lineSegment.ID[0];
            color = lines[lineContinueAt][0].stroke;
        }

        isLineStarted = true;

        if (lines[chosenLineGlobalID][lines[chosenLineGlobalID].length - 1].lineType == 'geodesic') {

            lineTypeToDraw = 'geodesic';

            line = new fabric.Line(points, {
                strokeWidth: lineStrokeWidthWhenSelected,
                stroke: color,
                fill: color,
                originX: 'center',
                originY: 'center',
                perPixelTargetFind: true,
                objectCaching: false,
                hasBorders: false,
                hasControls: false,
                evented: true
            });

            canvas.add(line);

            line.bringToFront();

            canvas.renderAll();
        }

        if (lines[chosenLineGlobalID][lines[chosenLineGlobalID].length - 1].lineType == 'polyline'){

            lineTypeToDraw = 'polyline';

            pathCoords.push({x: points[0], y: points[1]});
            pathCoords.push({x: points[2], y: points[3]});

            let schnittpunktsparameters = getSchnittpunktsparameters(sectors, [points[0], points[1], points[2], points[3]])

            polyline = new fabric.Polyline(pathCoords, {
                stroke: color,
                fill: '',
                strokeWidth: lineStrokeWidthWhenSelected,
                //perPixelTargetFind: true,
                objectCaching: false,
                hasBorders: false,
                hasControls: false,
                evented: false,
                selectable: false,
            });

            polyline.abortFromBeginning = false;

            if(schnittpunktsparameters.length > 0){
                if (sectors[schnittpunktsparameters[0][1]].snapStatus[schnittpunktsparameters[0][2]] == 0) {
                    polyline.stroke = 'red';
                    polyline.abortFromBeginning = true
                }
            }

            canvas.add(polyline);

            polyline.bringToFront();

            canvas.renderAll();
        }



    });

    if (lineSegment.parentSector[0] !== -1){
        lineSegment.dragPoint.relationship = getRelationship(lineSegment.dragPoint, lineSegment.parentSector[0]);
    }


    if (turnLorentzTransformOn == "1"){
        if (lineSegment.lineType == "geodesic"){
            lineSegment.dragPoint.start_pos_BL_dragPoint_x = lineSegment.end_point_BL.x;
            lineSegment.dragPoint.start_pos_BL_dragPoint_y = lineSegment.end_point_BL.y;
        }
        if (lineSegment.lineType == "polyline"){
            lineSegment.dragPoint.start_pos_BL_dragPoint_x = lineSegment.points_BL[lineSegment.points_BL.length -1].x;
            lineSegment.dragPoint.start_pos_BL_dragPoint_y = lineSegment.points_BL[lineSegment.points_BL.length -1].y;
        }
    }

    canvas.add(lineSegment.dragPoint);
}

function drawLineSegment(color, lineStrokeWidth, parentSectorID, lineStart_x, lineStart_y, lineEnd_x, lineEnd_y){

    let lineSegment;

    lineSegment = new fabric.Line([lineStart_x, lineStart_y, lineEnd_x, lineEnd_y], {
        strokeWidth: lineStrokeWidth,
        fill: color,
        stroke: color,
        originX: 'center',
        originY: 'center',
        perPixelTargetFind: true,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: true,
        selectable: false,
    });

    stackIdx = canvas.getObjects().indexOf(sectors[parentSectorID].ID_text);
    lineSegment.parentSector = [parentSectorID, sectors[parentSectorID].lineSegments.length];

    lineSegment.relationship = getRelationship(lineSegment, lineSegment.parentSector[0]);

    lineSegment.lineType = 'geodesic';

    sectors[lineSegment.parentSector[0]].lineSegments.push(lineSegment);

    if (turnLorentzTransformOn == "1"){
        getStartAndEndPointCoordsBeforeLorentztransform(lineSegment)
    }


    canvas.insertAt(lineSegment, stackIdx);

    /*
    if (lineEndIsOverCanvas === false) {
        lineContinueAt = -1;
        return
    }
    */
    /*
                        //Wenn Liniensegment nicht auf Trapez
                        if(typeof(lineSegment.parentSector)==='undefined'){
                            canvas.add(lineSegment);
                            lineSegment.sendToBack();
                            lineSegment.opacity = 0.5;
                            lineSegment.parentSector = [-1,-1];
                            lineSegment.relationship = [];


                        }else{


                        }
    */

    return lineSegment
}

function drawLongEdgeLine(initialSectorID, initialArcID_onSector, constructClockwise){
    let initialTrapezPointsAsGlobalCoords = getTrapezPointsAsGlobalCoords(sectors[initialSectorID].trapez);

    let countUpOrDown
    if (constructClockwise == true){
        countUpOrDown = 1
    }else{countUpOrDown = 3}



    let point_1 = initialTrapezPointsAsGlobalCoords[initialArcID_onSector];
    let point_2 = initialTrapezPointsAsGlobalCoords[(initialArcID_onSector + countUpOrDown) % 4];

    let dx = point_2.x - point_1.x;
    let dy = point_2.y - point_1.y;

    let stack_idx_initialSectorID = canvas.getObjects().indexOf(sectors[initialSectorID].trapez);

    let longEdge = new fabric.Line([point_1.x, point_1.y, point_1.x + longEdgeLineLengthFactor * dx, point_1.y + longEdgeLineLengthFactor * dy], {
        strokeWidth: 2,
        fill: 'red',
        stroke: 'red',
        originX: 'center',
        originY: 'center',
        perPixelTargetFind: true,
        objectCaching: false,
        hasBorders: false,
        hasControls: false,
        evented: false,
        selectable: false,
        opacity: deficitAngleVisualizeGroupOpacity,
    });

    canvas.insertAt(longEdge, stack_idx_initialSectorID + 1);
    longEdge.bringToFront()
    deficitAngleVisualizeGroup.add(longEdge)
}

function drawOrientationCirc(color, pos_x, pos_y){
    canvas.add(new fabric.Circle({ radius: 5, originX: 'center', originY: 'center', fill: color, left: pos_x, top:  pos_y}));
}

function drawPolylineSegment(color, polylineStrokeWidth, parentSectorID, polylineSegmentCoords){

    let polylineSegment;

    polylineSegment = new fabric.Polyline(polylineSegmentCoords,
        {
            stroke: color,
            fill: '',
            strokeWidth: polylineStrokeWidth,
            perPixelTargetFind: true,
            originX: 'center',
            originY: 'center',
            objectCaching: false,
            hasBorders: false,
            hasControls: false,
            evented: false,
            selectable: false,
        }
    );

    polylineSegment.lineType = 'polyline'

    if (parentSectorID === -1 || parentSectorID === undefined ) {
        canvas.add(polylineSegment);
        polylineSegment.opacity = 0.5;
        polylineSegment.parentSector = [-1, -1];
        polylineSegment.relationship = [];


    }else{
        stackIdx = canvas.getObjects().indexOf(sectors[parentSectorID].ID_text);
        polylineSegment.parentSector = [parentSectorID, sectors[parentSectorID].lineSegments.length];

        polylineSegment.relationship = getRelationship(polylineSegment, polylineSegment.parentSector[0]);

        sectors[polylineSegment.parentSector[0]].lineSegments.push(polylineSegment);

        if (turnLorentzTransformOn == "1"){
            getPolylinePathCoordsBeforeLorentztransform(polylineSegment)
            let polylineMidPoint = {x: polylineSegment.left - 0.5, y: polylineSegment.top - 0.5}
            polylineSegment.polylineMidPoint_BL = getPointCoordsBeforeLorentztransform(polylineMidPoint, sectors[polylineSegment.parentSector[0]].trapez)
        }


        canvas.insertAt(polylineSegment, stackIdx);
    }






    //Wenn Liniensegment nicht auf Trapez



    return polylineSegment
}

function drawSector(x0, y0, x1, y1, x2, y2, x3, y3) {
    if (typeof this.trapez !== 'undefined') {
        canvas.remove(this.trapez); //sollte ein Sektor zwei Trapeze erzeugen, wird der erste gelöscht
    }

    let sectorEdgeColor;

    let originXToSet;
    let originYToSet;

    if (turnLorentzTransformOn == "1"){
        originXToSet =  'left';
        originYToSet = 'bottom';
        lockRotationToSet = true;
    }else{
        originXToSet =  'center';
        originYToSet = 'center';
        lockRotationToSet = false;
    }

    if (textured !== "1" ){sectorEdgeColor = '#666'} else{sectorEdgeColor = '#666'}

    this.trapez = new fabric.Polygon //Anlegen des Polygons (noch nicht geaddet), unter 'trapez' abgespeichert
    (
        [   {x: x0, y: y0},
            {x: x1, y: y1},
            {x: x2, y: y2},
            {x: x3, y: y3},
        ],

        {
            originX: originXToSet,
            originY: originYToSet,
            left: this.pos_x, //Koordinaten der linken oberen Ecke der Boundingbox
            top: this.pos_y,
            angle: this.sector_angle,
            fill: this.fill,
            strokeWidth: 1,
            stroke: sectorEdgeColor,
            perPixelTargetFind: true,
            hasControls: true,
            hasBorders: false,
            objectCaching: false,
            lockMovementX: false,
            lockMovementY: false,
            lockScalingX: true,
            lockScalingY: true,
            lockRotation: lockRotationToSet,
            cornerSize: 30,
            opacity: startOpacity,

        });

    /*
        this.trapez.setShadow({  color: 'rgba(0,0,0,0.2)',
            blur: 10,
            offsetX: 5,
            offsetY: 0
        });
    */
    this.trapez.x_offset = Math.min(x0,x1,x2,x3) + 0.5;
    this.trapez.y_offset = Math.min(y0,y1,y2,y3) + 0.5;

    let showRotationControll;
    if (turnLorentzTransformOn == "1"){
        showRotationControll = false;
    }else{
        showRotationControll = true;
    }

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

        mtr : showRotationControll,
    });

    //Zeiger, der wieder auf die Parentalsektor zeigt
    this.trapez.parent = this;

    this.trapez.aussenkreisradius = Math.sqrt( Math.pow(this.sector_width/2, 2) + Math.pow(this.sector_height/2, 2));

    let textPos_x;
    let textPos_y;

    if (turnLorentzTransformOn == "1"){
        textPos_x = this.pos_x + this.sector_width/2;
        textPos_y = this.pos_y - this.sector_height/2;
    }else{
        textPos_x = this.pos_x;
        textPos_y = this.pos_y;
    }

    this.ID_text = new fabric.Text("" + (this.name), {
        fontSize: this.fontSize,
        originX: 'center',
        originY: 'center',
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        selectable: false,
        evented: false,
        left: textPos_x,
        top: textPos_y,
        angle: this.sector_angle,
    });


    //Berechnung der relativen Position von Objekten im lokalen Koordinatensystem der Parentalsektoren
    //wichtig für updateMinions
    let trapezTransform = this.trapez.calcTransformMatrix();
    let invertedtrapezTransform = invert(trapezTransform);
    let desiredTransform = multiply(
        invertedtrapezTransform,
        this.ID_text.calcTransformMatrix());

    this.ID_text.relationship = desiredTransform;

    let trapezPointsAsGlobalCoords = getTrapezPointsAsGlobalCoords(this.trapez)

    if (turnLorentzTransformOn == "1"){
        this.ID_text.start_pos_BL_text_x = this.ID_text.left - trapezPointsAsGlobalCoords[3].x;
        this.ID_text.start_pos_BL_text_y = this.ID_text.top - trapezPointsAsGlobalCoords[3].y;
    }

    this.trapez.on('moving',function(){
        removeSnapEdges(this.parent.ID);
        isItTimeToSnap(this);
        updateMinions(this);
        removeDeficitAngleVisualize();
    });

    this.trapez.on('rotating',function(){
        removeSnapEdges(this.parent.ID);
        isItTimeToSnap(this);
        updateMinions(this);
        removeDeficitAngleVisualize();
    });

    this.trapez.on('modified',function(){
        removeSnapEdges(this.parent.ID);
        isItTimeToSnap(this);
        updateMinions(this);
        removeDeficitAngleVisualize();
    });


    this.trapez.on('selected', function () {
        if (turnLorentzTransformOn == "1"){

            for(let ii = 0; ii < this.parent.slider.length; ii++){
                this.parent.slider[ii].opacity = 1.00;
                //canvas.sendToBack(this.parent.slider[ii]);
                canvas.bringToFront(this.parent.slider[ii]);
                canvas.bringToFront(this.parent.slider[0]);
                //this.parent.slider[0].opacity =0.80;
            }
        }


    });

    this.trapez.on('deselected', function () {
        if (turnLorentzTransformOn == "1") {
            for (let ii = 0; ii < this.parent.slider.length; ii++) {
                this.parent.slider[ii].opacity = 0.00;
            }
        }
    });


    let rapidity_before_something;
    let rapidity_after_something;
    let dist_inv_min_x_old;
    let dist_inv_max_y_old;

    let immediatehistory = [1];
    let sectorParameterOnMousedown = [];
    let sectorParameterOnMouseup = [];

    //Setzen/Verlängern einer Linie; nur zulässig auf Trapezen
    this.trapez.on('mousedown', function (o) {

        showGeodesicButtons(false);

        if (turnLorentzTransformOn == "1"){

            rapidity_before_something = this.parent.rapidity;

            dist_inv_min_x_old = Math.min(this.points[0].x, this.points[1].x, this.points[2].x, this.points[3].x);
            dist_inv_max_y_old = Math.max(this.points[0].y, this.points[1].y, this.points[2].y, this.points[3].y);
        }

        for (let kk = 0; kk < lines.length; kk++){
            for (let ll = 0; ll < lines[kk].length; ll++)
                lines[kk][ll].strokeWidth = 2 ;
        }


        chosenLineGlobalID = -1;

        if(selectedTool !== 'paint' && selectedTool !== 'grab' && selectedTool !== 'mark') return;

        // Mögliche Lösung um die angeklickten Sektoren nach vorne zu holen
        this.bringToFront()
        updateMinions(this)
        drawSnapEdges(this.parent.ID)
        geodreieck.bringToFront();
        //----------------


        let color;
        color = line_colors[lines.length % line_colors.length];
        if (!isLineStarted) {
            let pointer = canvas.getPointer(o.e);
            let points = [pointer.x, pointer.y, pointer.x, pointer.y];

            /*
            if (startAtMarkPoint !== -1){
                points = [markPoints[startAtMarkPoint].left, markPoints[startAtMarkPoint].top, pointer.x, pointer.y]
            }
            */

            if (selectedTool == 'grab' && lineContinueAt !== -1){
                this.lockMovementX = true;
                this.lockMovementY = true;
                this.hasControls = false;
                //this.evented = false;
            }
            if (selectedTool == 'paint' || lineContinueAt !== -1) {
                isLineStarted = true;

                showGeodesicButtons(true);

                if ( startStrokeWidth[0] == undefined){
                    startStrokeWidth[0] = 2
                }

                if (lineTypeToDraw == 'geodesic'){
                    line = new fabric.Line(points, {
                        strokeWidth: startStrokeWidth[0],
                        stroke: color,
                        fill: color,
                        originX: 'center',
                        originY: 'center',
                        perPixelTargetFind: true,
                        objectCaching: false,
                        hasBorders: false,
                        hasControls: false,
                        evented: true
                    });

                    canvas.add(line);

                    line.bringToFront();

                    canvas.renderAll();
                }
                if (lineTypeToDraw == 'polyline'){

                    pathCoords.push({x: points[0], y: points[1]});
                    pathCoords.push({x: points[2], y: points[3]});
                    polyline = new fabric.Polyline(pathCoords, {
                        stroke: color,
                        fill: '',
                        strokeWidth: 2,
                        perPixelTargetFind: true,
                        originX: 'center',
                        originY: 'center',
                        objectCaching: false,
                        hasBorders: false,
                        hasControls: false,
                        evented: false,
                        selectable: false,
                    });

                    polyline.abortFromBeginning = false;

                    canvas.add(polyline);

                    polyline.bringToFront();

                    canvas.renderAll();
                }

            }

            /*
                            if (selectedTool == 'mark') {
                                mark = new fabric.Circle({
                                    originX: 'center',
                                    originY: 'center',
                                    left: pointer.x,
                                    top: pointer.y,
                                    radius: 3,
                                    stroke: 'black',
                                    strokeWidth: 0,
                                    fill: 'grey',
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
                                        if(canvas.getObjects().indexOf(sectors[ii].ID_text) > stackIdx) {
                                            stackIdx =canvas.getObjects().indexOf(sectors[ii].ID_text);
                                            mark.parentSector = [sectors[ii].ID, -1];
                                        }
                                    }
                                }

                                let trapezTransform = sectors[mark.parentSector[0]].trapez.calcTransformMatrix();
                                let invertedtrapezTransform = invert(trapezTransform);
                                let desiredTransform = multiply(
                                    invertedtrapezTransform,
                                    mark.calcTransformMatrix());


                                mark.relationship = desiredTransform;

                                mark.parentSector[1] = sectors[mark.parentSector[0]].markCircles.length;

                                sectors[mark.parentSector[0]].markCircles.push(mark);

                                canvas.insertAt(mark,stackIdx);

                                markPoints.push(mark);

                                canvas.renderAll();

                                toolChange('grab')
                            }
                            */
        }


        sectorParameterOnMousedown = getSectorParameterOnMousedown(this.parent.ID)
    });



    this.trapez.on('mouseup', function (o) {

        if (turnLorentzTransformOn == "1"){

            rapidity_after_something = this.parent.rapidity;

            //Der Sektor muss reinitialisiert werden, wenn die Maus losgelassen wird, jedoch nur, wenn sich an den Rapiditäten etwas getan hat.
            //Sonst wird die Boundingbox nicht aktualisiert
            //WICHTIG: Dies muss unabhängig vom Snapping passieren.
            //Dennoch müssen spätere Kriterien erfüllt und abgearbeitet werden.
            //Hierzu zählen das Setzen der entsprechenden Snap-Edges und das zurücksetzen der Färbung auf den Grundzustand

            if (Math.abs(rapidity_after_something - rapidity_before_something) > epsilon) {

                reinitialiseSector(dist_inv_min_x_old, dist_inv_max_y_old, this.parent.ID)

            }
        }


        if (textured == "1") {
            //nur drawSnapEdges weil der Sektor hier ja schon gesnappt sein sollte
            drawSnapEdges(this.parent.ID)
        }else {
            if (selectedTool === 'grab') {
                if (sectorToSnap > -1) {
                    snapInitialSectorToTargetSector(this.parent.ID, sectorToSnap);
                }
                drawSnapEdges(this.parent.ID)
            }
        }

        //overlapControll nach dem Loslassen des Sektors funktioniert auch nach rotieren
        if (turnOverlapControllOn == "1") {
            for (let ii = 0; ii < sectors.length; ii++) {
                overlapControll(sectors[ii].trapez)
            }
        }



        if (toCalcSectorArea == true & selectedTool == 'grab'){

            if (showAreaSector == "earth") {
                let sectorTop = distance(this.points[0], this.points[1]) * 12.742;
                let sectorBottom = distance(this.points[2], this.points[3]) * 12.742;

                let sectorArea = 0.5 * (sectorTop + sectorBottom) * this.parent.sector_height * 12.742;
                let sectorArea4Dec = sectorArea.toFixed(1);
                let infoboxAreaTextByLanguageOnClick = "Sektorfläche:";
                if (language == "english") {
                    infoboxAreaTextByLanguageOnClick = "sector area:"
                }
                infoboxAreaText.set('text', infoboxAreaTextByLanguageOnClick + "\n" + sectorArea4Dec.toString() + " " + "km²");

                canvas_side_bar_perm.renderAll()
            }

            if (showAreaSector == "globe"){
                let sectorTop = distance(this.points[0], this.points[1]) * 0.03;
                let sectorBottom = distance(this.points[2], this.points[3]) * 0.03;

                let sectorArea = 0.5 * (sectorTop + sectorBottom) * this.parent.sector_height * 0.03;
                let sectorArea4Dec = sectorArea.toFixed(4)
                let infoboxAreaTextByLanguageOnClick = "Sektorfläche:";
                if (language == "english") {
                    infoboxAreaTextByLanguageOnClick = "sector area:"
                }
                infoboxAreaText.set('text', infoboxAreaTextByLanguageOnClick + "\n" + sectorArea4Dec.toString() + " " + "cm²");

                canvas_side_bar_perm.renderAll()
            }

        }

        sectorParameterOnMouseup = getSectorParameterOnMouseup(this.parent.ID);

        if (sectorParameterOnMousedown.length > 0){
            if (sectorParameterOnMousedown[0] === sectorParameterOnMouseup[0]){
                if (turnLorentzTransformOn == "1") {
                    if (sectorParameterOnMousedown[2] !== sectorParameterOnMouseup[2] || sectorParameterOnMousedown[3] !== sectorParameterOnMouseup[3] || sectorParameterOnMousedown[4] !== sectorParameterOnMouseup[4] || sectorParameterOnMousedown[5] !== sectorParameterOnMouseup[5]){
                        immediatehistory.push(sectorParameterOnMousedown);
                        sectorParameterOnMousedown = [];
                        history.push(immediatehistory);

                        immediatehistory = [1]
                    }
                }else{
                    if (sectorParameterOnMousedown[2] !== sectorParameterOnMouseup[2] || sectorParameterOnMousedown[3] !== sectorParameterOnMouseup[3] || sectorParameterOnMousedown[4] !== sectorParameterOnMouseup[4]){
                        immediatehistory.push(sectorParameterOnMousedown);
                        sectorParameterOnMousedown = [];
                        history.push(immediatehistory);

                        immediatehistory = [1]
                    }
                }

            }
        }


    });


    canvas.add(this.trapez);
    canvas.add(this.ID_text);
}

function drawSlider(pos_x, pos_y) {

    this.slider = [];

    let temporary;





    temporary = new fabric.Rect
    (
        {
            left: pos_x,
            top: pos_y,
            fill: 'white',
            width: 20,
            height: 40,
            stroke: '#848484',
            strokeWidth: 2,
            perPixelTargetFind: true,
            hasControls: false,
            hasBorders: false,
            objectCaching: false,
            lockMovementX: true,
            lockMovementY: false,
            opacity: 0.00,
            originX: 'center',
            originY: 'center',

        }
    );

    temporary.parent = this;
    this.slider.push(temporary);

    temporary = new fabric.Line
    ([pos_x, pos_y + slider_max, pos_x, pos_y - slider_max],
        {

            fill: '#585858',
            stroke: '#585858',
            strokeWidth: 3,
            selectable: false,
            evented: false,
            opacity: 0.00,
            originX: 'center',
            originY: 'center',
        }
    );
    temporary.parent = this;
    this.slider.push(temporary);

    temporary = new fabric.Line
    ([pos_x - 5, pos_y , pos_x + 5, pos_y],
        {

            fill: '#585858',
            stroke: '#585858',
            strokeWidth: 3,
            selectable: false,
            evented: false,
            opacity: 0.00,
            originX: 'center',
            originY: 'center',
        }
    );
    temporary.parent = this;
    this.slider.push(temporary);

    temporary = new fabric.Line
    ([pos_x - 5, pos_y + slider_max, pos_x + 5, pos_y + slider_max],
        {

            fill: '#585858',
            stroke: '#585858',
            strokeWidth: 3,
            selectable: false,
            evented: false,
            opacity: 0.00,
            originX: 'center',
            originY: 'center',
        }
    );
    temporary.parent = this;
    this.slider.push(temporary);


    temporary = new fabric.Line
    ([pos_x - 5, pos_y - slider_max, pos_x + 5, pos_y - slider_max],
        {

            fill: '#585858',
            stroke: '#585858',
            strokeWidth: 3,
            selectable: false,
            evented: false,
            opacity: 0.00,
            originX: 'center',
            originY: 'center',
        }
    );
    temporary.parent = this;
    this.slider.push(temporary);

    for(let ii = 0; ii < this.slider.length; ii++){
        canvas.add(this.slider[ii]);

    }
    canvas.bringToFront(this.slider[0]);

    //Anlegen der Variablen für die Koordinaten des neuen Sektors

    let xn0 ;
    let yn0 ;

    let xn1 ;
    let yn1 ;

    let xn2 ;
    let yn2 ;

    let xn3 ;
    let yn3 ;

    let transformMatrix;
    let transformedPoints = [{x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}];




    //Berechnen der Sektorkoordinaten beim Klicken auf den Regler
    /*
    this.slider[0].on('mousedown', function f() {
        transformMatrix = this.parent.trapez.calcTransformMatrix('True');
        transformedPoints = [{x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}];
        for (let ll = 0; ll < 4; ll++) {
            transformedPoints[ll].x = this.parent.trapez.points[ll].x - this.parent.trapez.width / 2.0 -this.parent.trapez.x_offset ;
            transformedPoints[ll].y = this.parent.trapez.points[ll].y - this.parent.trapez.height / 2.0 -this.parent.trapez.y_offset;
            transformedPoints[ll] = fabric.util.transformPoint(transformedPoints[ll], transformMatrix);
            transformedPoints[ll].x -= 0.5;
            transformedPoints[ll].y -= 0.5;

        }
    });
    */


    let dist_inv_min_x_old;
    let dist_inv_max_y_old;

    let immediatehistory = [1];
    let sectorParameterOnMousedown = [];
    let sectorParameterOnMouseup = [];

    this.slider[0].on('mousedown', function(o) {

        sectorParameterOnMousedown = getSectorParameterOnMousedown(this.parent.ID)

        this.opacity = 0.8;
        dist_inv_min_x_old = Math.min(this.parent.trapez.points[0].x, this.parent.trapez.points[1].x, this.parent.trapez.points[2].x, this.parent.trapez.points[3].x);
        dist_inv_max_y_old = Math.max(this.parent.trapez.points[0].y, this.parent.trapez.points[1].y, this.parent.trapez.points[2].y, this.parent.trapez.points[3].y);

    });

    //Wird der Regler bewegt, so passiert die Transformation
    this.slider[0].on('moving', function(o) {

        removeSnapEdges(this.parent.ID);
        changeSnapStatus(this.parent.ID);

        if(this.top > this.parent.slider[1].top + slider_max){
            this.set('top' , this.parent.slider[1].top + slider_max).setCoords();
        }

        if(this.top < this.parent.slider[1].top - slider_max){
            this.set('top' , this.parent.slider[1].top - slider_max).setCoords();
        }

        //Einrasten des Sliders auf Null

        let pointer = canvas.getPointer(o.e);

        if (Math.abs(pointer.y - this.parent.slider[1].top) < snap_radius_slider) {
            this.set('top' , this.parent.slider[1].top).setCoords();}

        let lastValueSlider = 0.00;
        let startValueSlider;
        startValueSlider = this.top - this.parent.slider[1].top ;

        //Die Rapidität wird wie üblich mit theta abgekürzt

        let theta = (startValueSlider - lastValueSlider) / slider_max; // '-' damit der Sektor nach oben verscheert wird
        this.parent.rapidity = theta;


        lorentzTransform(theta, this.parent.trapez);


    });


    this.slider[0].on('mouseup',function() {
        this.opacity = 1.0

        sectorParameterOnMouseup = getSectorParameterOnMouseup(this.parent.ID)


        if (sectorParameterOnMousedown.length > 0){

            if (sectorParameterOnMousedown[5] !== sectorParameterOnMouseup[5]){

                immediatehistory.push(sectorParameterOnMousedown);
                sectorParameterOnMousedown = [];
                history.push(immediatehistory);

                immediatehistory = [1]
            }
        }

        reinitialiseSector(dist_inv_min_x_old, dist_inv_max_y_old, this.parent.ID)

    });


    this.slider[0].on('deselected', function () {
        for(let ii = 0; ii < this.parent.slider.length; ii++){
            this.parent.slider[ii].opacity = 0.00;
        }
    });
    this.slider[0].on('selected', function () {
        for(let ii = 0; ii < this.parent.slider.length; ii++){
            this.parent.slider[ii].opacity = 1.00;
            //this.parent.slider[0].opacity =0.80;
        }
        canvas.bringToFront(this);
    });



    //Berechnung der relativen Position von Objekten im lokalen Koordinatensystem der Parentalsektoren
    //wichtig für updateMinions
    let trapezTransform = this.trapez.calcTransformMatrix();
    let invertedtrapezTransform = invert(trapezTransform);
    let desiredTransform;
    for (let ii = 0; ii < this.slider.length; ii++){
        desiredTransform = multiply(
            invertedtrapezTransform,
            this.slider[ii].calcTransformMatrix());

        this.slider[ii].relationship = desiredTransform;
    }

}

function drawSnapEdges(initialSectorID) {
    for (let ii = 0; ii < 4; ii++) {

        if (sectors[initialSectorID].neighbourhood[ii] > -1) {

            let neighbourSectorID = sectors[initialSectorID].neighbourhood[ii];


            if (sectors[initialSectorID].snapEdges[ii] !== 0) {

                let edgeToRemove = sectors[initialSectorID].snapEdges[ii];
                canvas.remove(edgeToRemove);
                sectors[initialSectorID].snapEdges[ii] = [0];

            }


            if (sectors[initialSectorID].snapStatus[ii] !== 0) {

                //-----------IDEE UM DIE DRAGPOINTS NACH VORNE ZU HOLEN------------------
                for (let jj = 0; jj < sectors[neighbourSectorID].lineSegments.length; jj++) {
                    if (sectors[neighbourSectorID].lineSegments[jj].dragPoint !== undefined) {
                        canvas.bringToFront(sectors[neighbourSectorID].lineSegments[jj].dragPoint)
                    }
                }

                if (buildTicks == "1") return

                let initialTrapezPointsAsGlobalCoords = getTrapezPointsAsGlobalCoords(sectors[initialSectorID].trapez);

                let point_1 = initialTrapezPointsAsGlobalCoords[ii];
                let point_2 = initialTrapezPointsAsGlobalCoords[(ii + 1) % 4];

                let stack_idx_initialSectorID = canvas.getObjects().indexOf(sectors[initialSectorID].trapez);

                let strokeDashArray

                if (textured !== "1"){
                    strokeDashArray = [5, 5]
                }else{
                    strokeDashArray = [0, 0]
                }

                let offsetToAdd = 0

                if (turnLorentzTransformOn == "1"){
                    offsetToAdd = 0.5
                }

                let edge = new fabric.Line(
                    [point_1.x + offsetToAdd, point_1.y + offsetToAdd, point_2.x + offsetToAdd, point_2.y + offsetToAdd], {
                    strokeWidth: 1,
                    strokeDashArray: strokeDashArray,
                    fill: edgeColor,
                    stroke: edgeColor,
                    originX: 'center',
                    originY: 'center',
                    perPixelTargetFind: true,
                    objectCaching: false,
                    hasBorders: false,
                    hasControls: false,
                    evented: false,
                    selectable: false,
                    opacity: startOpacity,
                });

                edge.ID = ii;

                canvas.insertAt(edge, stack_idx_initialSectorID + 1);
                //edge.bringToFront();
                sectors[initialSectorID].snapEdges[ii] = edge;
            }

        }

    }
}

let tick_dist = 10
let tick_length = 3

function drawTicks(trapez){

    for (let ii = 0; ii < 4; ii++) {

        //Wichtig! Das Erstellen der Markierungen muss ausgelagert werden.
        // Ziel ist, dass diese einfach Lorentztransformiert werden und nicht jedes Mal neu initialisiert werden
        //FALSCH --> Durch das neu initialisieren werden sie ja bereits passend lorentztransformiert ;-)
        //WICHTIG! Trotzdem müssen sie mit lorentztransformiert werden!!!



        //console.log(this.trapez.points);
        let directions = [
            [3, 0],
            [0, 1],
            [2, 1],
            [3, 2]
        ];

        dist_corners = distance(trapez.points[directions[ii][0]], trapez.points[directions[ii][1]]);



        let dx = (trapez.points[directions[ii][1]].x - trapez.points[directions[ii][0]].x);
        let dy = (trapez.points[directions[ii][1]].y - trapez.points[directions[ii][0]].y);
        let dx_normiert = dx/ dist_corners;
        let dy_normiert = dy/ dist_corners;




        for (let jj = 1; jj < 100; jj++){

            //console.log(jj);
            if (Math.sqrt( Math.pow((dx_normiert * tick_dist * jj),2) + Math.pow((dy_normiert * tick_dist * jj),2)) >= dist_corners){
                break
            }

            let temporary_offset;
            if (trapez.points[2].y > 0){
                temporary_offset = trapez.points[2].y + 0.5
            } else {
                temporary_offset = 0
            }

            let tickPoint_0

            if (turnLorentzTransformOn == "1"){
                tickPoint_0 = [
                    trapez.points[directions[ii][0]].x + 0.5 + dx_normiert * tick_dist * jj + trapez.left ,
                    trapez.points[directions[ii][0]].y - 0.5 + dy_normiert * tick_dist * jj + trapez.top - temporary_offset
                ];
            }else{
                tickPoint_0 = [
                    trapez.points[directions[ii][0]].x + 0.5 + dx_normiert * tick_dist * jj + trapez.left - trapez.width/2 - 1,
                    trapez.points[directions[ii][0]].y - 0.5 + dy_normiert * tick_dist * jj + trapez.top - temporary_offset + trapez.height/2 + 1
                ];
            }


            let tickPoint_1;

            if (ii == 0 || ii == 1) {
                tickPoint_1 = [
                    tickPoint_0[0] - dy_normiert * tick_length,
                    tickPoint_0[1] + dx_normiert * tick_length
                ];
            }else {
                tickPoint_1 = [
                    tickPoint_0[0] + dy_normiert * tick_length,
                    tickPoint_0[1] - dx_normiert * tick_length
                ];
            }


            let   tick = new fabric.Line(
                    [tickPoint_0[0], tickPoint_0[1], tickPoint_1[0], tickPoint_1[1]] ,
                    {
                        fill: '#666',
                        stroke: '#666',
                        strokeWidth: 1,
                        evented: false,
                        objectCaching: false,
                        lockMovementX: false,
                        lockMovementY: false,
                        lockScalingX: true,
                        lockScalingY: true,
                        selectable: false,

                    }
                );

            tick.parentSector = [trapez.parent.ID, trapez.parent.ticks.length];

            tick.relationship = getRelationship(tick, tick.parentSector[0])

            trapez.parent.ticks.push(tick);

            if (turnLorentzTransformOn == "1"){
                getStartAndEndPointCoordsBeforeLorentztransform(tick)
            }

            canvas.add(tick);


        }

    }

}

function drawVertices() {


        for (let ii = 0; ii < sectors.length; ii++){

            let trapezPointsAsGlobalCoords = getTrapezPointsAsGlobalCoords(sectors[ii].trapez);

            for (let jj = 0; jj < 4; jj++) {

                let point_a = trapezPointsAsGlobalCoords[(jj + 1) % 4];
                let point_b = trapezPointsAsGlobalCoords[jj];
                let point_c = trapezPointsAsGlobalCoords[(jj + 3) % 4];

                let vec_ba_x = point_a.x - point_b.x;
                let vec_ba_y = point_a.y - point_b.y;

                let vec_bc_x = point_c.x - point_b.x;
                let vec_bc_y = point_c.y - point_b.y;

                let cornerAngle;

                cornerAngle = Math.acos((vec_ba_x * vec_bc_x + vec_ba_y * vec_bc_y) / (Math.sqrt(vec_ba_x * vec_ba_x + vec_ba_y * vec_ba_y) * Math.sqrt(vec_bc_x * vec_bc_x + vec_bc_y * vec_bc_y)))

                let strokeColooooor = ['red', 'blue', 'green', 'yellow'];

                let arc = new fabric.Circle({
                    radius: 8,
                    left: trapezPointsAsGlobalCoords[jj].x,
                    top: trapezPointsAsGlobalCoords[jj].y,
                    angle: 0 + 90 * jj + sectors[ii].trapez.angle - (jj % 2) * (toDegree(cornerAngle) - 90),
                    startAngle:0,
                    endAngle: cornerAngle,
                    stroke: '#575656',//strokeColooooor[jj],
                    strokeWidth: 16,
                    fill: '',
                    originY:'center',
                    originX:'center',
                    objectCaching: false,
                    lockMovementX: true,
                    lockMovementY: true,
                    lockScalingX: true,
                    lockScalingY: true,
                    selectable: false,
                    hoverCursor: 'pointer',
                    perPixelTargetFind: true,
                    opacity: 0.0,
                });

                canvas.add(arc);


                arc.relationship = getRelationship(arc, sectors[ii].ID)

                arc.parentSector = sectors[ii].ID;
                arc.ID_on_sector = jj;

                sectors[ii].cornerArcs.push(arc);
                vertexAngleParts.push(arc);
                arc.ID_in_global = vertexAngleParts.length-1
                canvas.renderAll();



                arc.on('mouseup', function (o) {



                    let currentArcID = this.ID_on_sector;
                    let pickedSectorID = this.parentSector;
                    let nextSector = sectors[this.parentSector].neighbourhood[currentArcID];

                    let cornerAngleSum = this.endAngle;

                    let sectorsToSnap = [pickedSectorID];

                    for (let kk = 0; kk < 3; kk++){

                        if (nextSector > -1){

                            sectorsToSnap.push(nextSector)
                            //currentArcID im naechsten Sektor ermitteln
                            currentArcID = (currentArcID + 3) % 4;

                            cornerAngleSum += sectors[nextSector].cornerArcs[currentArcID].endAngle;

                            nextSector = sectors[nextSector].neighbourhood[currentArcID];

                        }else{
                            sectorsToSnap = [];
                            return
                        }
                    }


                    let deficitAngleRad = 2 * Math.PI - cornerAngleSum

                    let deficitAngleDeg = 360 - toDegree(cornerAngleSum)

                    if (sectorsToSnap.length > 0){
                        for (let kk = 0; kk < 3; kk++){

                            snapInitialSectorToTargetSector(sectorsToSnap[kk + 1], sectorsToSnap[kk]);

                        }

                        for (let kk = 0; kk < 4; kk++){
                            removeSnapEdges(sectorsToSnap[kk])
                            changeSnapStatus(sectorsToSnap[kk])
                            drawSnapEdges(sectorsToSnap[kk])

                        }

                    }

                    if (turnOverlapControllOn == "1") {
                        for (let kk = 0; kk < sectors.length; kk++) {
                            overlapControll(sectors[kk].trapez)
                        }
                    }

                    removeDeficitAngleVisualize()

                    drawLongEdgeLine(sectorsToSnap[0], this.ID_on_sector, false)

                    drawLongEdgeLine(sectorsToSnap[sectorsToSnap.length - 1], (this.ID_on_sector + 1) % 4, true)

                    drawAngleArc(sectorsToSnap[0],this.ID_on_sector , deficitAngleRad)

                    //drawDeficitAngleVisualizePolygon(sectorsToSnap, this.ID_on_sector, deficitAngleRad)

                    let deficitAngleDeg4Dec = deficitAngleDeg.toFixed(4)
                    let infoboxDeficitAngleTextByLanguageOnClick = "Defizitwinkel:";
                    if (language == "english"){
                        infoboxDeficitAngleTextByLanguageOnClick = "deficit angle:"
                    }
                    infoboxDeficitAngleText.set('text', infoboxDeficitAngleTextByLanguageOnClick+"\n"+ deficitAngleDeg4Dec.toString() + "°")
                    canvas_side_bar_perm.renderAll()


                })


            }
        }


}

function fitResponsiveCanvas() {


    // canvas container dimensions
    let containerSize = {
        width: document.getElementById('canvas-overAll').offsetWidth,
        height: document.getElementById('canvas-overAll').offsetHeight
    };

    scaleRatio = Math.min(containerSize.width / canvasSize.width, containerSize.height / canvasSize.height);

    canvas_side_bar_perm.setWidth(100 * scaleRatio);
    canvas_side_bar_perm.setHeight(containerSize.height);

    canvas_side_tools_right.setWidth(300 * scaleRatio);
    canvas_side_tools_right.setHeight(80 * scaleRatio);

    if (showExerciseBox == "1"){
        canvas_exercise_box.setWidth(330 * scaleRatio);
        canvas_exercise_box.setHeight(200 * scaleRatio);
    }


    canvas.setWidth(containerSize.width * 1);
    canvas.setHeight(containerSize.height * 1);



    canvas.setZoom(scaleRatio);
    canvas_side_bar_perm.setZoom(scaleRatio);
    canvas_side_tools_right.setZoom(scaleRatio);
    if (showExerciseBox == "1") {
        canvas_exercise_box.setZoom(scaleRatio);
    }
    setZoomPan()

    if (!document.fullscreenElement) {
        if (fullscreen == undefined || exitFullscreen == undefined){
            return
        }
        exitFullscreen.opacity = 0;
        fullscreen.opacity = 1;
    }else {
        exitFullscreen.opacity = 1;
        fullscreen.opacity = 0;
    }

}

function geodesicToGeodreieck(){
    let geodreieckWdithHalf = geodreieck.width / 2 * 0.12;


    //gEL1 = geodreieckEdgeLocal1
    //gEL2 = geodreieckEdgeLocal2
    let gEL1 = new fabric.Point(geodreieck.left - geodreieckWdithHalf, geodreieck.top);
    let gEL2 = new fabric.Point(geodreieck.left + geodreieckWdithHalf, geodreieck.top);

    let translation_x = geodreieck.left;
    let translation_y = geodreieck.top;

    let geodreieckEdgePoint1 = new fabric.Point(Math.cos(geodreieck.angle * Math.PI / 180) * (gEL1.x - translation_x) - Math.sin(geodreieck.angle * Math.PI / 180) * (gEL1.y - translation_y) + translation_x, Math.sin(geodreieck.angle * Math.PI / 180) * (gEL1.x - translation_x) + Math.cos(geodreieck.angle * Math.PI / 180) * (gEL1.y - translation_y) + translation_y)
    let geodreieckEdgePoint2 = new fabric.Point(Math.cos(geodreieck.angle * Math.PI / 180) * (gEL2.x - translation_x) - Math.sin(geodreieck.angle * Math.PI / 180) * (gEL2.y - translation_y) + translation_x, Math.sin(geodreieck.angle * Math.PI / 180) * (gEL2.x - translation_x) + Math.cos(geodreieck.angle * Math.PI / 180) * (gEL2.y - translation_y) + translation_y)


    if (Math.abs(geodreieck.angle - 90) < epsilon){
        line.set({x2: line.x1, y2: pointer.y})
    }
    if (Math.abs(geodreieck.angle - 90) > epsilon){
        if(Math.abs(geodreieckEdgePoint2.x - geodreieckEdgePoint1.x) > Math.abs(geodreieckEdgePoint2.y - geodreieckEdgePoint1.y)) {
            line.set({x2: pointer.x, y2: (pointer.x - line.x1) * Math.tan((geodreieck.angle) * Math.PI / 180) + line.y1});
        }else{
            line.set({x2: (pointer.y - line.y1) * Math.tan((- geodreieck.angle  + 90) * Math.PI / 180) + line.x1, y2: pointer.y});
        }
    }

}

function geodesicToGeodreieckCalc(){



    if(button_dreieck_empty.opacity == 0){
        return false
    }

    let geodreieckWdithHalf = geodreieck.width / 2 * 0.12;
    let geodreieckHeightHalf = geodreieck.height / 2 * 0.12;
    let geodreieckMidPoint = new fabric.Point(geodreieck.left, geodreieck.top);

    //gEL1 = geodreieckEdgeLocal1
    //gEL2 = geodreieckEdgeLocal2
    let gEL1 = new fabric.Point(geodreieck.left - geodreieckWdithHalf, geodreieck.top);
    let gEL2 = new fabric.Point(geodreieck.left + geodreieckWdithHalf, geodreieck.top);

    let translation_x = geodreieck.left;
    let translation_y = geodreieck.top;


    // x = cos(geodreieckWinkel) * abstandPunktMittelpunkt + geodreieck.left
    // y = sin(geodreieckWinkel) * abstandPunktMittelpunkt + geodreieck.top

    //let geodreieckEdgeMidPoint = new fabric.Point(geodreieck.left + Math.cos((geodreieck.angle + 90) * Math.PI / 180) * geodreieckHeightHalf, geodreieck.top + Math.sin((geodreieck.angle + 90) * Math.PI / 180) * geodreieckHeightHalf);
    let geodreieckEdgeMidPoint = new fabric.Point(geodreieck.left, geodreieck.top)

    let xg1 = line.x1;
    let yg1 = line.y1;
    let xg2 = pointer.x;
    let yg2 = pointer.y;

    let delta_x = xg2 - xg1;
    let delta_y = yg2 - yg1;

    let geodreieckEdgePoint1 = new fabric.Point(Math.cos(geodreieck.angle * Math.PI / 180) * (gEL1.x - translation_x) - Math.sin(geodreieck.angle * Math.PI / 180) * (gEL1.y - translation_y) + translation_x, Math.sin(geodreieck.angle * Math.PI / 180) * (gEL1.x - translation_x) + Math.cos(geodreieck.angle * Math.PI / 180) * (gEL1.y - translation_y) + translation_y)
    let geodreieckEdgePoint2 = new fabric.Point(Math.cos(geodreieck.angle * Math.PI / 180) * (gEL2.x - translation_x) - Math.sin(geodreieck.angle * Math.PI / 180) * (gEL2.y - translation_y) + translation_x, Math.sin(geodreieck.angle * Math.PI / 180) * (gEL2.x - translation_x) + Math.cos(geodreieck.angle * Math.PI / 180) * (gEL2.y - translation_y) + translation_y)

    let deltaGeodreieck_x = geodreieckEdgePoint2.x - geodreieckEdgePoint1.x;
    let deltaGeodreieck_y = geodreieckEdgePoint2.y - geodreieckEdgePoint1.y;

    //atan2 bruacht zwei Argumente die eingegeben werden muessen. In diesem Fall die Differenzen der Koordinaten.
    let geodesicAngle = Math.atan2(delta_y, delta_x) * 180 / Math.PI;

    let lineStartPoint = new fabric.Point(line.x1, line.y1);

    let angleDifference = Math.abs((geodesicAngle - geodreieck.angle ) - Math.round((geodesicAngle - geodreieck.angle )/ 180) * 180)

    if (distancePointStraightLine(lineStartPoint.x, lineStartPoint.y, geodreieckEdgePoint1.x, geodreieckEdgePoint1.y, deltaGeodreieck_x, deltaGeodreieck_y) < 5 & angleDifference < 20) {

        return true
    }else{
        return false
    }
}

function geodesicToMark(markNumber) {
    let markPointCoords = new fabric.Point(markPoints[markNumber].left, markPoints[markNumber].top);
    if (lineTypeToDraw == "geodesic"){
        line.set({x2: markPointCoords.x, y2: markPointCoords.y})
    }else{return markPointCoords}

}

function geodesicToMarkCalc() {

    if (markPoints.length > 0) {
        for (let ii = 0; ii < markPoints.length; ii++) {
            let markPointCoords = new fabric.Point(markPoints[ii].left, markPoints[ii].top);
            if (distance(markPointCoords, pointer) < 10) {
                return [true, ii];
            }
        }

    }

    return [false, ]
}

function geodesicToStart(){

    let geodesic_begin_point = new fabric.Point(lines[lineContinueAt][0].calcLinePoints().x1,lines[lineContinueAt][0].calcLinePoints().y1);
    geodesic_begin_point = fabric.util.transformPoint(geodesic_begin_point, lines[lineContinueAt][0].calcTransformMatrix() );

    line.set({x2: geodesic_begin_point.x, y2: geodesic_begin_point.y})
}

function geodesicToStartCalc(){

    let geodesic_begin_point = new fabric.Point(lines[lineContinueAt][0].calcLinePoints().x1,lines[lineContinueAt][0].calcLinePoints().y1);
    geodesic_begin_point = fabric.util.transformPoint(geodesic_begin_point, lines[lineContinueAt][0].calcTransformMatrix() );

    if (distance(geodesic_begin_point, pointer) < 5) {
        return true
    }

    return false

}

function geodreieckMove(geodreieckToMove){

    for (let ii = 0; ii < lines.length; ii++){
        if (lines[ii][lines[ii].length-1] !== undefined){

            let dragPointCoords = new fabric.Point(lines[ii][lines[ii].length-1].dragPoint.left, lines[ii][lines[ii].length-1].dragPoint.top);
            let geodreieckMidKante = new fabric.Point(geodreieck.left, geodreieck.top);
            if (distance(dragPointCoords, geodreieckMidKante) < snap_geodreieck_on_mark) {

                dist_x = dragPointCoords.x - geodreieckMidKante.x;
                dist_y = dragPointCoords.y - geodreieckMidKante.y;

                geodreieckToMove.left += dist_x;
                geodreieckToMove.top += dist_y
            }
        }
    }

    if (markPoints.length < 1){
        return
    }

    for (let ii = 0; ii < markPoints.length; ii++) {
        let markPointCoords = new fabric.Point(markPoints[ii].left, markPoints[ii].top);
        let geodreieckMidKante = new fabric.Point(geodreieck.left, geodreieck.top);
        if (distance(markPointCoords, geodreieckMidKante) < snap_geodreieck_on_mark) {

            dist_x = markPointCoords.x - geodreieckMidKante.x;
            dist_y = markPointCoords.y - geodreieckMidKante.y;

            geodreieckToMove.left += dist_x;
            geodreieckToMove.top += dist_y
        }
    }

}

function geodreieckRotate(geodreieckToRotate){

    let geodreieckWdithHalf = geodreieckToRotate.width / 2 * 0.12;
    let geodreieckHeightHalf = geodreieckToRotate.height / 2 * 0.12;
    let geodreieckMidPoint = new fabric.Point(geodreieckToRotate.left, geodreieckToRotate.top);

    //gEL1 = geodreieckEdgeLocal1
    //gEL2 = geodreieckEdgeLocal2
    let gEL1 = new fabric.Point(geodreieckToRotate.left - geodreieckWdithHalf, geodreieckToRotate.top);
    let gEL2 = new fabric.Point(geodreieckToRotate.left + geodreieckWdithHalf, geodreieckToRotate.top);

    let translation_x = geodreieckToRotate.left;
    let translation_y = geodreieckToRotate.top;


    // x = cos(geodreieckWinkel) * abstandPunktMittelpunkt + geodreieck.left
    // y = sin(geodreieckWinkel) * abstandPunktMittelpunkt + geodreieck.top

    //let geodreieckEdgeMidPoint = new fabric.Point(geodreieckToRotate.left + Math.cos((geodreieck.angle + 90) * Math.PI / 180) * geodreieckHeightHalf, geodreieckToRotate.top + Math.sin((geodreieck.angle + 90) * Math.PI / 180) * geodreieckHeightHalf);
    let geodreieckEdgeMidPoint = new fabric.Point(geodreieckToRotate.left, geodreieckToRotate.top)

    let geodreieckEdgePoint1 = new fabric.Point(Math.cos(geodreieck.angle * Math.PI / 180) * (gEL1.x - translation_x) - Math.sin(geodreieck.angle * Math.PI / 180) * (gEL1.y - translation_y) + translation_x, Math.sin(geodreieck.angle * Math.PI / 180) * (gEL1.x - translation_x) + Math.cos(geodreieck.angle * Math.PI / 180) * (gEL1.y - translation_y) + translation_y);
    let geodreieckEdgePoint2 = new fabric.Point(Math.cos(geodreieck.angle * Math.PI / 180) * (gEL2.x - translation_x) - Math.sin(geodreieck.angle * Math.PI / 180) * (gEL2.y - translation_y) + translation_x, Math.sin(geodreieck.angle * Math.PI / 180) * (gEL2.x - translation_x) + Math.cos(geodreieck.angle * Math.PI / 180) * (gEL2.y - translation_y) + translation_y);


    //canvas.add(new fabric.Circle({ radius: 5, fill: '#f55', left: geodreieckEdgePoint1.x , top: geodreieckEdgePoint1.y, originX: 'center', originY: 'center' }));
    //canvas.add(new fabric.Circle({ radius: 5, fill: '#f55', left: geodreieckEdgePoint2.x , top: geodreieckEdgePoint2.y, originX: 'center', originY: 'center' }));

    //canvas.add(new fabric.Circle({ radius: 5, fill: 'blue', left: geodreieckEdgeMidPoint.x, top: geodreieckEdgeMidPoint.y, originX: 'center', originY: 'center' }));
    for (let ii = 0; ii < lines.length; ii++){
        for (let jj = 0; jj < lines[ii].length; jj++)
        {

            let segment_end_point = new fabric.Point(lines[ii][jj].calcLinePoints().x2,lines[ii][jj].calcLinePoints().y2);
            segment_end_point = fabric.util.transformPoint(segment_end_point,lines[ii][jj].calcTransformMatrix() );

            let geodesic_start_point = new fabric.Point(lines[ii][jj].calcLinePoints().x1, lines[ii][jj].calcLinePoints().y1);
            geodesic_start_point = fabric.util.transformPoint(geodesic_start_point, lines[ii][jj].calcTransformMatrix());

            let xg1 = geodesic_start_point.x;
            let yg1 = geodesic_start_point.y;
            let xg2 = segment_end_point.x;
            let yg2 = segment_end_point.y;

            let delta_x = xg2 - xg1;
            let delta_y = yg2 - yg1;

            //atan2 bruacht zwei Argumente die eingegeben werden muessen. In diesem Fall die Differenzen der Koordinaten.
            let geodesicAngle = Math.atan2(delta_y, delta_x) * 180 / Math.PI;

            let lineSegmentMidPoint = new fabric.Point(xg1 + 0.5 * (xg2 - xg1), yg1 + 0.5 * (yg2 - yg1));

            //Float-Modulo: verschiebt die Winkeldifferenz so lange um 180, dass der Zielwert zwischen -90 und +90 liegt
            // -> Math.abs((geodesicAngle - geodreieck.angle ) - Math.round((geodesicAngle - geodreieck.angle )/ 180) * 180)
            if (Math.abs((geodesicAngle - geodreieckToRotate.angle ) - Math.round((geodesicAngle - geodreieckToRotate.angle )/ 180) * 180) < 5 & distancePointStraightLine(geodreieckEdgeMidPoint.x, geodreieckEdgeMidPoint.y, xg1, yg1, delta_x, delta_y) < 10 & distance(geodreieckEdgeMidPoint, lineSegmentMidPoint) < geodreieckWdithHalf - Math.sqrt(delta_x * delta_x + delta_y * delta_y)/2){

                geodreieckToRotate.angle += (geodesicAngle - geodreieckToRotate.angle ) - Math.round((geodesicAngle - geodreieckToRotate.angle )/ 180) * 180

            }
            if (Math.abs((geodesicAngle - geodreieckToRotate.angle ) - Math.round((geodesicAngle - geodreieckToRotate.angle )/ 180) * 180) < 5 & distance(geodreieckMidPoint, lineSegmentMidPoint) < 50){

                geodreieckToRotate.angle += (geodesicAngle - geodreieckToRotate.angle ) - Math.round((geodesicAngle - geodreieckToRotate.angle )/ 180) * 180

            }

        }




    }

}

function getCommonEdgeNumber(initialSectorID, targetSectorID){
    let commonEdgeNumber;

    for (let ii = 0; ii < 4; ii++) {
        if (sectors[initialSectorID].neighbourhood[ii] === targetSectorID) {
            commonEdgeNumber = ii
        }
    }

    return commonEdgeNumber;
}

function getKantenParameter(SectorID, xg1, yg1, dxg, dyg){

    let alpha;
    let lambda;
    let kantenIndex;

    let trapezPointsAsGlobalCoords = getTrapezPointsAsGlobalCoords(sectors[SectorID].trapez)

    for (let kk = 0; kk < 4; kk++) {

        xt1 = trapezPointsAsGlobalCoords[kk].x;
        xt2 = trapezPointsAsGlobalCoords[(kk + 1) % 4].x;
        yt1 = trapezPointsAsGlobalCoords[kk].y;
        yt2 = trapezPointsAsGlobalCoords[(kk + 1) % 4].y;

        dxt12 = xt2 - xt1;
        dyt12 = yt2 - yt1;

        // Beachte, dass nun in der veraenderten Form vom Startpunkt der Geodaete ausgegangen wird -> deshalb ueberall xg1 und yg1

        if (dxg > epsilon) {
            alpha = (yg1 - yt1 + (dyg / dxg) * (xt1 - xg1)) / (dyt12 - ((dxt12 * dyg) / dxg));
            lambda = (xt1 + ((yg1 - yt1 + (dyg / dxg) * (xt1 - xg1)) / (dyt12 - ((dxt12 * dyg) / dxg))) * dxt12 - xg1) / dxg;
        }

        else {
            alpha = (xg1 - xt1 + (dxg / dyg) * (yt1 - yg1)) / (dxt12 - ((dyt12 * dxg) / dyg));
            lambda = (yt1 + ((xg1 - xt1 + (dxg / dyg) * (yt1 - yg1)) / (dxt12 - ((dyt12 * dxg) / dyg))) * dyt12 - yg1) / dyg;
        }


        if (lambda > epsilon) {
            if (alpha >= 0.0 && alpha <= 1.0) {
                kantenIndex = kk;
                break;
            }
        }


    }

    let kantenParameter = [alpha, lambda, kantenIndex]
    return kantenParameter
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

function getParentSectorOfPoint(point){
    let sectorID;
    let stackIdx = -1;
    for (let jj = sectors.length - 1; jj >= 0; jj--) {
        if (sectorContainsPoint(sectors[jj].trapez, point)) {

            if (canvas.getObjects().indexOf(sectors[jj].ID_text) > stackIdx) {
                stackIdx = canvas.getObjects().indexOf(sectors[jj].ID_text)
                sectorID = jj
            }
        }
    }
    return sectorID
}

function getPointCoordsBeforeLorentztransform (point, trapezToGetCoordsBL){

    let trapezPointsAsGlobalCoords = getTrapezPointsAsGlobalCoords(trapezToGetCoordsBL)
    let theta_of_this_sector =  trapezToGetCoordsBL.parent.rapidity

    let point_AL_x = point.x - trapezPointsAsGlobalCoords[3].x;
    let point_AL_y = point.y - trapezPointsAsGlobalCoords[3].y;

    let point_BL_x = point_AL_x * Math.cosh(-theta_of_this_sector) + point_AL_y * Math.sinh(-theta_of_this_sector);
    let point_BL_y = point_AL_x * Math.sinh(-theta_of_this_sector) + point_AL_y * Math.cosh(-theta_of_this_sector);

    let point_BL = new fabric.Point(point_BL_x, point_BL_y)

    return point_BL
}

function getPointsOfOppositeEdges(initialSectorID, targetSectorID){

    let commonEdgeNumber = getCommonEdgeNumber(initialSectorID, targetSectorID);

    let initialTrapezPointsAsGlobalCoordsBeforeRotating = getTrapezPointsAsGlobalCoords(sectors[initialSectorID].trapez);
    let potentialtargetTrapezPointsAsGlobalCoords = getTrapezPointsAsGlobalCoords(sectors[targetSectorID].trapez);

    let point_1 = initialTrapezPointsAsGlobalCoordsBeforeRotating[commonEdgeNumber];
    let point_2 = initialTrapezPointsAsGlobalCoordsBeforeRotating[(commonEdgeNumber + 1) % 4];

    let point_a = potentialtargetTrapezPointsAsGlobalCoords[(commonEdgeNumber + 3) % 4];
    let point_b = potentialtargetTrapezPointsAsGlobalCoords[(commonEdgeNumber + 2) % 4];

    let edgePoints = [point_1, point_2, point_a, point_b];

    return edgePoints

}

function getRelationship(ObjectToGiveRelation, parentSectorID) {
    let trapezTransform = sectors[parentSectorID].trapez.calcTransformMatrix();
    let invertedtrapezTransform = invert(trapezTransform);
    let desiredTransform = multiply(
        invertedtrapezTransform,
        ObjectToGiveRelation.calcTransformMatrix());

    return desiredTransform;
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

        let trapezPointsAsGlobalCoords = getTrapezPointsAsGlobalCoords(sectors[ii].trapez);

        //Die folgenden Zeilen versetzen die zu verwendenden Eckpunkte des Trapzes nach Innen (bilden eines Padding)
        //Verhindert das fälsche overlapping
        trapezPointsAsGlobalCoords[0].x = trapezPointsAsGlobalCoords[0].x + paddingFactor * (trapezPointsAsGlobalCoords[2].x-trapezPointsAsGlobalCoords[0].x);
        trapezPointsAsGlobalCoords[0].y = trapezPointsAsGlobalCoords[0].y + paddingFactor * (trapezPointsAsGlobalCoords[2].y-trapezPointsAsGlobalCoords[0].y);

        trapezPointsAsGlobalCoords[2].x = trapezPointsAsGlobalCoords[2].x - paddingFactor * (trapezPointsAsGlobalCoords[2].x-trapezPointsAsGlobalCoords[0].x);
        trapezPointsAsGlobalCoords[2].y = trapezPointsAsGlobalCoords[2].y - paddingFactor * (trapezPointsAsGlobalCoords[2].y-trapezPointsAsGlobalCoords[0].y);

        trapezPointsAsGlobalCoords[1].x = trapezPointsAsGlobalCoords[1].x + paddingFactor * (trapezPointsAsGlobalCoords[3].x-trapezPointsAsGlobalCoords[1].x);
        trapezPointsAsGlobalCoords[1].y = trapezPointsAsGlobalCoords[1].y + paddingFactor * (trapezPointsAsGlobalCoords[3].y-trapezPointsAsGlobalCoords[1].y);

        trapezPointsAsGlobalCoords[3].x = trapezPointsAsGlobalCoords[3].x - paddingFactor * (trapezPointsAsGlobalCoords[3].x-trapezPointsAsGlobalCoords[1].x);
        trapezPointsAsGlobalCoords[3].y = trapezPointsAsGlobalCoords[3].y - paddingFactor * (trapezPointsAsGlobalCoords[3].y-trapezPointsAsGlobalCoords[1].y);


        for (let kk = 0; kk < 4; kk++) {


            xt1 =  trapezPointsAsGlobalCoords[kk].x;
            xt2 =  trapezPointsAsGlobalCoords[(kk + 1) % 4].x;
            yt1 =  trapezPointsAsGlobalCoords[kk].y;
            yt2 =  trapezPointsAsGlobalCoords[(kk + 1) % 4].y;


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

function getSchnittpunktsparameters(sectors,[xg1,yg1,xg2,yg2]) {

    let lambda;
    let alpha;

    let xt1;
    let xt2;
    let yt1;
    let yt2;

    let lambdaOfThisLineSegment;
    let lineOverThisSector;
    let lineOverThisEdge;

    let schnittpunktsparameters = [];

    // Geradengleichung der Linie und die der Sektorkante gleichsetzen
    //Orientierung der Sektorkante durch Reihenfolge der Eckpunkte: left-top -> right-top -> right-bottom -> left-bottom


    for(let ii = 0; ii < sectors.length; ii++) {

        let trapezPointsAsGlobalCoords = getTrapezPointsAsGlobalCoords(sectors[ii].trapez)

        for (let kk = 0; kk < 4; kk++) {


            xt1 =  trapezPointsAsGlobalCoords[kk].x;
            xt2 =  trapezPointsAsGlobalCoords[(kk + 1) % 4].x;
            yt1 =  trapezPointsAsGlobalCoords[kk].y;
            yt2 =  trapezPointsAsGlobalCoords[(kk + 1) % 4].y;


            let dxg = xg2 - xg1;
            let dyg = yg2 - yg1;
            let dxt12 = xt2 - xt1;
            let dyt12 = yt2 - yt1;


            if( Math.abs(dxg) > epsilon)
            {
                alpha = (yg1 - yt1 + (dyg / dxg) * (xt1 - xg1)) / (dyt12 - ((dxt12 * dyg) / dxg));
                lambda = (xt1 + ((yg1 - yt1 + (dyg / dxg) * (xt1 - xg1)) / (dyt12 - ((dxt12 * dyg) / dxg))) * dxt12 - xg1) / dxg;

            }

            else{
                alpha = (xg1 - xt1 + (dxg / dyg) * (yt1 - yg1)) / (dxt12 - ((dyt12 * dxg) / dyg));
                lambda = (yt1 + ((xg1 - xt1 + (dxg / dyg) * (yt1 - yg1)) / (dxt12 - ((dyt12 * dxg) / dyg))) * dyt12 - yg1) / dyg;

            }


            if ((0 - epsilon) <= lambda && lambda <= 1 && epsilon <= alpha && alpha <= 1){ // && Math.abs(lambdas[lambdas.length-1] - lambda) >= epsilon) {

                lambdaOfThisLineSegment = lambda;
                lineOverThisSector = ii;
                lineOverThisEdge = kk;

                let schnittpunktsparameter = [lambdaOfThisLineSegment, lineOverThisSector, lineOverThisEdge]

                schnittpunktsparameters.push(schnittpunktsparameter)

            }
        }
    }
    if(schnittpunktsparameters.length > 0){
        schnittpunktsparameters =  schnittpunktsparameters.sort(function(a, b) {
            return a[0] - b[0];
        });

        let lambdas = [0.0]
        for (let ii = 0; ii < schnittpunktsparameters.length; ii++){
            lambdaToPush = schnittpunktsparameters[ii][0]

            lambdas.push(lambdaToPush)
        }
        lambdas.push(1.0)

        let sectorsWhichContainsLineSegmentMidpoints = testLocation(lambdas, [xg1, yg1, xg2, yg2])

        let removeEntryFromIndex = []

        for (let ii = 0; ii < sectorsWhichContainsLineSegmentMidpoints.length -1; ii++){
            if (sectorsWhichContainsLineSegmentMidpoints[ii] !== -1 && sectorsWhichContainsLineSegmentMidpoints[ii] == sectorsWhichContainsLineSegmentMidpoints [ii + 1]){
                removeEntryFromIndex.push(ii)
            }
        }


        for (let ii = removeEntryFromIndex.length -1; ii >= 0; ii--){
            schnittpunktsparameters.splice(removeEntryFromIndex[ii], 1);
        }





    }

    return schnittpunktsparameters;
}

function getSectorParameterOnMousedown(initialSectorID){
    let stack_idx_of_initialSector = canvas.getObjects().indexOf(sectors[initialSectorID].trapez);
    if (turnLorentzTransformOn === "1"){
        sectorParameterOnMousedown = [sectors[initialSectorID].ID, stack_idx_of_initialSector, sectors[initialSectorID].trapez.left, sectors[initialSectorID].trapez.top, sectors[initialSectorID].trapez.angle, sectors[initialSectorID].rapidity]
    } else{
        sectorParameterOnMousedown = [sectors[initialSectorID].ID, stack_idx_of_initialSector, sectors[initialSectorID].trapez.left, sectors[initialSectorID].trapez.top, sectors[initialSectorID].trapez.angle];

    }
    return sectorParameterOnMousedown
}

function getSectorParameterOnMouseup(initialSectorID){
    let stack_idx_of_initialSector = canvas.getObjects().indexOf(sectors[initialSectorID].trapez);
    if (turnLorentzTransformOn === "1"){
        sectorParameterOnMouseup = [sectors[initialSectorID].ID, stack_idx_of_initialSector, sectors[initialSectorID].trapez.left, sectors[initialSectorID].trapez.top, sectors[initialSectorID].trapez.angle, sectors[initialSectorID].rapidity]
    } else{
        sectorParameterOnMouseup = [sectors[initialSectorID].ID, stack_idx_of_initialSector, sectors[initialSectorID].trapez.left, sectors[initialSectorID].trapez.top, sectors[initialSectorID].trapez.angle];

    }
    return sectorParameterOnMouseup
}

function getStartAndEndPointCoordsBeforeLorentztransform (lineSegment){

    geodesic_start_point = new fabric.Point(lineSegment.calcLinePoints().x1, lineSegment.calcLinePoints().y1);
    geodesic_start_point = fabric.util.transformPoint(geodesic_start_point, lineSegment.calcTransformMatrix());
    geodesic_end_point = new fabric.Point(lineSegment.calcLinePoints().x2, lineSegment.calcLinePoints().y2);
    geodesic_end_point = fabric.util.transformPoint(geodesic_end_point, lineSegment.calcTransformMatrix());

    lineSegment.start_point_BL = getPointCoordsBeforeLorentztransform(geodesic_start_point, sectors[lineSegment.parentSector[0]].trapez)
    lineSegment.end_point_BL = getPointCoordsBeforeLorentztransform(geodesic_end_point, sectors[lineSegment.parentSector[0]].trapez)

}

function getPolylinePathCoordsBeforeLorentztransform (lineSegment){

    let polylinePointsAsGlobalCoords = getPolylinePointsImGlobalCoords(lineSegment);

    lineSegment.points_BL = polylinePointsAsGlobalCoords.slice();

    for (let ii = 0; ii < polylinePointsAsGlobalCoords.length; ii++){
        lineSegment.points_BL[ii] = getPointCoordsBeforeLorentztransform(polylinePointsAsGlobalCoords[ii], sectors[lineSegment.parentSector[0]].trapez)
    }

}

function getPolylinePointsImGlobalCoords(lineSegment){
    let lineSegmentUntransformedPoints = lineSegment.points;
    let lineSegmentTransformedPoints = lineSegmentUntransformedPoints.slice()
    for (let jj = 0; jj < lineSegment.points.length; jj++) {

        let lineSegmentPointUntransformed_x = lineSegment.points[jj].x;
        let lineSegmentPointUntransformed_y = lineSegment.points[jj].y;

        lineSegmentPointUntransformed_x -= lineSegment.pathOffset.x;
        lineSegmentPointUntransformed_y -= lineSegment.pathOffset.y;

        lineSegmentPointUntransformed = new fabric.Point(lineSegmentPointUntransformed_x, lineSegmentPointUntransformed_y);

        let lineSegmentPointTransformed = fabric.util.transformPoint(lineSegmentPointUntransformed, lineSegment.calcTransformMatrix());

        lineSegmentTransformedPoints[jj] = lineSegmentPointTransformed
    }
    return lineSegmentTransformedPoints
}

function getTrapezPointsAsGlobalCoords(trapezToGetGlobalCoords) {
    let transformMatrix = trapezToGetGlobalCoords.calcTransformMatrix('True');
    let globalCoords = [{x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}, {x: 0.0, y: 0.0}];
    if (turnLorentzTransformOn == "1"){
        for (let ii = 0; ii < 4; ii++) {
            globalCoords[ii].x = trapezToGetGlobalCoords.points[ii].x - trapezToGetGlobalCoords.width / 2 - trapezToGetGlobalCoords.x_offset;
            globalCoords[ii].y = trapezToGetGlobalCoords.points[ii].y - trapezToGetGlobalCoords.height / 2 - trapezToGetGlobalCoords.y_offset;
            globalCoords[ii] = fabric.util.transformPoint(globalCoords[ii], transformMatrix);
        }
    }else{
        for (let ii = 0; ii < 4; ii++) {
            globalCoords[ii].x = trapezToGetGlobalCoords.points[ii].x - trapezToGetGlobalCoords.width / 2; // - trapezToGetGlobalCoords.x_offset ;
            globalCoords[ii].y = trapezToGetGlobalCoords.points[ii].y - trapezToGetGlobalCoords.height / 2; // - trapezToGetGlobalCoords.y_offset ;
            globalCoords[ii] = fabric.util.transformPoint(globalCoords[ii], transformMatrix);
        }
    }


    return globalCoords
}

function init() {
    for (let ii = 0; ii < sec_name.length; ii++) {

        let sec = new Sector();

        if (sectorIDText !== undefined){
            if (sectorIDText == "programID") {
                sec.name = ii;
            }
            if (sectorIDText == "off") {
                sec.name = "";
            }

        } else{
            sec.name = sec_name[ii];
        }

        sec.ID = sec_ID[ii];
        sec.sector_type = sec_type[ii];
        sec.fontSize = sec_fontSize[ii];
        sec.pos_x = sec_posx[ii] + window.innerWidth / 2;
        sec.pos_y = sec_posy[ii] + (window.innerHeight - window.innerHeight * 0.08) / 2;
        sec.sector_height = sec_height[ii];
        sec.sector_width = sec_width[ii];
        if (turnLorentzTransformOn !== "1") {
            //sec.sector_bottom = sec_bottom[ii];
            //sec.sector_top = sec_top[ii];
            sec.sector_angle = sec_angle[ii];
            //sec.offset_x = sec_offset[ii];
        } else {
            sec.sector_angle = 0;
            sec.sec_diff_edges = Math.max(sec_timeEdgeLeft[ii], sec_timeEdgeRight[ii]) - Math.min(sec_timeEdgeLeft[ii], sec_timeEdgeRight[ii]);

        }

        sec.neighbourhood = [sec_neighbour_top[ii], sec_neighbour_right[ii], sec_neighbour_bottom[ii], sec_neighbour_left[ii]];

        if (textured !== "1") {
            sec.fill = sec_fill[ii];
        }
        sec.draw(sec_coords[ii][0], sec_coords[ii][1], sec_coords[ii][2], sec_coords[ii][3], sec_coords[ii][4], sec_coords[ii][5], sec_coords[ii][6], sec_coords[ii][7]);

        if (turnLorentzTransformOn == "1") {
            sec.draw_slider(sec.pos_x - 40, sec.pos_y - 20);
        }

        sectors.push(sec);

        if (textured == "1") {
            //----------------Nur wichtig, wenn Textur. Beachte, dass .fill in Overlap angepasst werden muss-------
            let panels =

                [
                    'textures/europe_0.png',
                    'textures/europe_1.png',
                    'textures/europe_2.png',
                    'textures/europe_3.png',
                    'textures/europe_4.png',
                    'textures/europe_5.png',
                    'textures/europe_6.png',
                    'textures/europe_7.png',
                    'textures/europe_8.png'
                ];
            if (textureColored == "1") {
                panels =
                    [
                        'textures/panel-7.3.jpg',
                        'textures/panel-7.4.jpg',
                        'textures/panel-7.5.jpg',
                        'textures/panel-8.3.jpg',
                        'textures/panel-8.4.jpg',
                        'textures/panel-8.5.jpg',
                        'textures/panel-9.3.jpg',
                        'textures/panel-9.4.jpg',
                        'textures/panel-9.5.jpg'
                    ];
            }


            /*
                        fabric.util.loadImage(panels[ii], function (img) {

                            img.scaleToWidth(sec_width[ii] + 4);

                            sec.trapez.set('fill', new fabric.Pattern({
                                source: img,
                                repeat: 'no-repeat'
                            }));
                        })
            */


            fabric.Image.fromURL(panels[ii], function (img) {

                img.scaleToWidth(sec_width[ii]+ 4);

                let patternSourceCanvas = new fabric.StaticCanvas(null, {enableRetinaScaling: false});
                patternSourceCanvas.add(img);

                patternSourceCanvas.setDimensions({
                    width: img.getScaledWidth(),
                    height: img.getScaledHeight(),

                });

                patternSourceCanvas.renderAll();

                //patternSourceCanvas.getElement() fixed das Problem mit der neuen Version
                let pattern = new fabric.Pattern({
                    source: patternSourceCanvas.getElement(),
                    repeat: 'no-repeat'
                });

                pattern.offsetX = - 2

                sec.trapez.set('fill', pattern)
                canvas.renderAll();

            });
            //--------------------------------------------------------------------
        }

    }
}

function isItTimeToSnap(trapez) {
    let midpointSectorMoved = new fabric.Point(trapez.left, trapez.top);
    let midpointpotentialSnappingPartnerID;
    let distanceMidPoints;
    let dist_1a;
    let dist_2b;

    changeSnapStatus(trapez.parent.ID)

    for (let ii = 0; ii < 4; ii++){
        let potentialSnappingPartnerID = trapez.parent.neighbourhood[ii];

        if(potentialSnappingPartnerID > -1 && sectors[potentialSnappingPartnerID].trapez.opacity == startOpacity) {

            midpointpotentialSnappingPartnerID = new fabric.Point(sectors[potentialSnappingPartnerID].trapez.left, sectors[potentialSnappingPartnerID].trapez.top);
            distanceMidPoints = distance(midpointSectorMoved, midpointpotentialSnappingPartnerID);

            let edgePoints = getPointsOfOppositeEdges(trapez.parent.ID, potentialSnappingPartnerID);

            let point_1 = edgePoints[0];
            let point_2 = edgePoints[1];

            let point_a = edgePoints[2];
            let point_b = edgePoints[3];

            let point_1_2_mid = new fabric.Point(point_1.x + (point_1.x - point_2.x) * 0.5, point_1.y + (point_1.y - point_2.y) * 0.5);

            let point_a_b_mid = new fabric.Point(point_a.x + (point_a.x - point_b.x) * 0.5, point_a.y + (point_a.y - point_b.y) * 0.5);


            //---Falls die Textur eingeschaltet ist, wird Snapping direkt ausgeführt werden
            //---Es erfolgt keine Auswahl des Snappingpartners
            if (textured == "1"){
                if(distanceMidPoints <= trapez.aussenkreisradius + sectors[potentialSnappingPartnerID].trapez.aussenkreisradius) {

                    dist_1a = distance(point_1, point_a);
                    dist_2b = distance(point_2, point_b);

                }else{

                    dist_1a = snap_radius_sectors + 1;
                    dist_2b = snap_radius_sectors + 1;

                }

                if (dist_1a < snap_radius_sectors && dist_2b < snap_radius_sectors) {
                    snapInitialSectorToTargetSector(trapez.parent.ID, potentialSnappingPartnerID)
                }
            }else{
                if (distance(point_1_2_mid, point_a_b_mid) <= snap_radius_sectors || distanceMidPoints <= snappingToChosenDistance * trapez.aussenkreisradius ) {

                    for (let jj = 0; jj < 4; jj++) {
                        if (trapez.parent.neighbourhood[jj] > -1) {
                            sectors[trapez.parent.neighbourhood[jj]].trapez.fill = sec_fill[sectors[trapez.parent.neighbourhood[jj]].ID]
                        }
                    }

                    sectors[potentialSnappingPartnerID].trapez.fill = '#E6E6E6';

                    sectorToSnap = potentialSnappingPartnerID;

                    if (turnLorentzTransformOn == "1"){

                        let rapidity_before = trapez.parent.rapidity;

                        let rapid_base;
                        if (Math.abs(sec_coords[trapez.parent.ID][(ii*2) % 8] - sec_coords[trapez.parent.ID][(ii*2+2) % 8]) > Math.abs(sec_coords[trapez.parent.ID][(ii*2 + 1) % 8] - sec_coords[trapez.parent.ID][(ii * 2 + 3) % 8])) {
                            rapid_base = Math.atanh((sec_coords[trapez.parent.ID][(ii * 2 + 1) % 8] - sec_coords[trapez.parent.ID][(ii * 2 + 3) % 8]) / (sec_coords[trapez.parent.ID][(ii * 2) % 8] - sec_coords[trapez.parent.ID][(ii * 2 + 2) % 8]));
                        }
                        else{
                            rapid_base = Math.atanh((sec_coords[trapez.parent.ID][(ii * 2) % 8] - sec_coords[trapez.parent.ID][(ii * 2 + 2) % 8]) / (sec_coords[trapez.parent.ID][(ii * 2 + 1) % 8] - sec_coords[trapez.parent.ID][(ii * 2 + 3) % 8]));
                        }

                        let rapid_target;
                        if (Math.abs(point_a.x - point_b.x) > Math.abs(point_a.y - point_b.y) ){
                            rapid_target = Math.atanh((point_a.y - point_b.y) / (point_a.x - point_b.x))
                            }
                        else {
                            rapid_target = Math.atanh( (point_a.x - point_b.x) / (point_a.y - point_b.y))
                            }

                        let rapid_sum = - rapid_base + rapid_target;

                        /*
                        let point_1_untransf = new fabric.Point(sec_coords[trapez.parent.ID][(ii * 2 + 1) % 8], sec_coords[trapez.parent.ID][(ii * 2) % 8])
                        let point_2_untransf = new fabric.Point(sec_coords[trapez.parent.ID][(ii * 2 + 3) % 8], sec_coords[trapez.parent.ID][(ii * 2 + 2) % 8])

                        let length_ausgang = distance(point_1_untransf, point_2_untransf);
                        let length_target = distance(point_a, point_b);
                        let rapid_sum;
                        if (ii == 0 || ii == 2) {
                            rapid_sum = Math.log(length_ausgang / length_target);
                        }else{
                            rapid_sum = - Math.log(length_ausgang / length_target);
                        }
                        */


                        //Anpassung des Sliders an die neue rapidity (Beachte, dass hier die relationship verändert wird, Bezug ist der Mittelpunkt der Sliderlinie)
                        trapez.parent.slider[0].relationship[5] = trapez.parent.slider[1].relationship[5] + rapid_sum * slider_max;

                        trapez.parent.rapidity = rapid_sum;


                        lorentzTransform(rapid_sum, trapez);

                        let rapidity_after = trapez.parent.rapidity;


                        if(Math.abs(rapidity_before - rapidity_after)>epsilon ) {

                            changeRelationShipAfterTransform(trapez, rapid_sum)

                        }



                        return
                    }else{

                        rotateSectorToAlignAngle(trapez.parent.ID, potentialSnappingPartnerID);

                        return
                    }

                }else {

                    sectorToSnap = -1;

                    for (let jj = 0; jj < 4; jj++) {
                        if (trapez.parent.neighbourhood[jj] > -1) {

                            sectors[trapez.parent.neighbourhood[jj]].trapez.fill = sec_fill[sectors[trapez.parent.neighbourhood[jj]].ID]
                        }
                    }
                }
            }


        }
    }
}

function lorentzTransform(theta, trapez) {


    let trapezPointsAsGlobalCoords = getTrapezPointsAsGlobalCoords(trapez)
    //**** !!!! Beachte, dass 'sector' das übergegebene Trapez ist !!!!


    for (let ii=0;ii<4;ii++){
        trapez.points[ii].x= sec_coords[trapez.parent.ID][ii*2] * Math.cosh(theta) + sec_coords[trapez.parent.ID][ii*2+1] * Math.sinh(theta);
        trapez.points[ii].y= sec_coords[trapez.parent.ID][ii*2] * Math.sinh(theta) + sec_coords[trapez.parent.ID][ii*2+1] * Math.cosh(theta);

    }

    trapez.parent.ID_text.set('left', trapez.parent.ID_text.start_pos_BL_text_x * Math.cosh(theta) + trapez.parent.ID_text.start_pos_BL_text_y * Math.sinh(theta) + trapezPointsAsGlobalCoords[3].x);
    trapez.parent.ID_text.set('top', trapez.parent.ID_text.start_pos_BL_text_x * Math.sinh(theta) + trapez.parent.ID_text.start_pos_BL_text_y * Math.cosh(theta) + trapezPointsAsGlobalCoords[3].y);

    if (trapez.parent.lineSegments.length > 0) {
        for (let ii = 0; ii < trapez.parent.lineSegments.length; ii++) {
            if (trapez.parent.lineSegments[ii].lineType == "geodesic"){
                trapez.parent.lineSegments[ii].set({
                    'x1': trapez.parent.lineSegments[ii].start_point_BL.x * Math.cosh(theta) + trapez.parent.lineSegments[ii].start_point_BL.y * Math.sinh(theta) + trapezPointsAsGlobalCoords[3].x,
                    'y1': trapez.parent.lineSegments[ii].start_point_BL.x * Math.sinh(theta) + trapez.parent.lineSegments[ii].start_point_BL.y * Math.cosh(theta) + trapezPointsAsGlobalCoords[3].y,
                    'x2': trapez.parent.lineSegments[ii].end_point_BL.x * Math.cosh(theta) + trapez.parent.lineSegments[ii].end_point_BL.y * Math.sinh(theta) + trapezPointsAsGlobalCoords[3].x,
                    'y2': trapez.parent.lineSegments[ii].end_point_BL.x * Math.sinh(theta) + trapez.parent.lineSegments[ii].end_point_BL.y * Math.cosh(theta) + trapezPointsAsGlobalCoords[3].y,

                    /*
                    trapez.parent.lineSegments[ii].set({
                        'x1': (geodesic_start_point.x - transformedPoints[3].x) * Math.cosh(theta) + (geodesic_start_point.y - transformedPoints[3].y) * Math.sinh(theta) + transformedPoints[3].x,
                        'y1': (geodesic_start_point.x - transformedPoints[3].x) * Math.sinh(theta) + (geodesic_start_point.y - transformedPoints[3].y) * Math.cosh(theta) + transformedPoints[3].y,
                        'x2': (geodesic_end_point.x - transformedPoints[3].x) * Math.cosh(theta) + (geodesic_end_point.y - transformedPoints[3].y) * Math.sinh(theta) + transformedPoints[3].x,
                        'y2': (geodesic_end_point.x - transformedPoints[3].x) * Math.sinh(theta) + (geodesic_end_point.y - transformedPoints[3].y) * Math.cosh(theta) + transformedPoints[3].y,
                    */
                });
            }
            if (trapez.parent.lineSegments[ii].lineType == "polyline"){
                for (let jj = 0; jj < trapez.parent.lineSegments[ii].points_BL.length; jj++){
                    trapez.parent.lineSegments[ii].points[jj].x = trapez.parent.lineSegments[ii].points_BL[jj].x * Math.cosh(theta) + trapez.parent.lineSegments[ii].points_BL[jj].y * Math.sinh(theta) + trapezPointsAsGlobalCoords[3].x
                    trapez.parent.lineSegments[ii].points[jj].y = trapez.parent.lineSegments[ii].points_BL[jj].x * Math.sinh(theta) + trapez.parent.lineSegments[ii].points_BL[jj].y * Math.cosh(theta) + trapezPointsAsGlobalCoords[3].y

                }
                //Die Boundingbox der Polylines wird hier drüber nach jedem Schritt geupdatet
                trapez.parent.lineSegments[ii]._setPositionDimensions({})
            }

            if(trapez.parent.lineSegments[ii].dragPoint !== undefined) {
                trapez.parent.lineSegments[ii].dragPoint.set('left', trapez.parent.lineSegments[ii].dragPoint.start_pos_BL_dragPoint_x * Math.cosh(theta) + trapez.parent.lineSegments[ii].dragPoint.start_pos_BL_dragPoint_y * Math.sinh(theta) + trapezPointsAsGlobalCoords[3].x);
                trapez.parent.lineSegments[ii].dragPoint.set('top', trapez.parent.lineSegments[ii].dragPoint.start_pos_BL_dragPoint_x * Math.sinh(theta) + trapez.parent.lineSegments[ii].dragPoint.start_pos_BL_dragPoint_y * Math.cosh(theta) + trapezPointsAsGlobalCoords[3].y);
            }

        }
    }

    if (trapez.parent.ticks.length > 0) {
        for (let ii = 0; ii < trapez.parent.ticks.length; ii++) {
            trapez.parent.ticks[ii].set({
                'x1': trapez.parent.ticks[ii].start_point_BL.x * Math.cosh(theta) + trapez.parent.ticks[ii].start_point_BL.y * Math.sinh(theta) + trapezPointsAsGlobalCoords[3].x,
                'y1': trapez.parent.ticks[ii].start_point_BL.x * Math.sinh(theta) + trapez.parent.ticks[ii].start_point_BL.y * Math.cosh(theta) + trapezPointsAsGlobalCoords[3].y,
                'x2': trapez.parent.ticks[ii].end_point_BL.x * Math.cosh(theta) + trapez.parent.ticks[ii].end_point_BL.y * Math.sinh(theta) + trapezPointsAsGlobalCoords[3].x,
                'y2': trapez.parent.ticks[ii].end_point_BL.x * Math.sinh(theta) + trapez.parent.ticks[ii].end_point_BL.y * Math.cosh(theta) + trapezPointsAsGlobalCoords[3].y,

                /*
                trapez.parent.lineSegments[ii].set({
                    'x1': (geodesic_start_point.x - transformedPoints[3].x) * Math.cosh(theta) + (geodesic_start_point.y - transformedPoints[3].y) * Math.sinh(theta) + transformedPoints[3].x,
                    'y1': (geodesic_start_point.x - transformedPoints[3].x) * Math.sinh(theta) + (geodesic_start_point.y - transformedPoints[3].y) * Math.cosh(theta) + transformedPoints[3].y,
                    'x2': (geodesic_end_point.x - transformedPoints[3].x) * Math.cosh(theta) + (geodesic_end_point.y - transformedPoints[3].y) * Math.sinh(theta) + transformedPoints[3].x,
                    'y2': (geodesic_end_point.x - transformedPoints[3].x) * Math.sinh(theta) + (geodesic_end_point.y - transformedPoints[3].y) * Math.cosh(theta) + transformedPoints[3].y,
                */
            });
        }
    }
    canvas.renderAll();


}

function moveMinionsToStack(initialSectorID, sectorStackID){
    let addToStack = 1
    for (let ii = 0; ii < sectors[initialSectorID].markCircles.length; ii++) {
        let markPoint = sectors[initialSectorID].markCircles[ii];
        canvas.moveTo(markPoint, sectorStackID + addToStack)
        addToStack += 1
    }
    if (turnLorentzTransformOn === "1") {
        for (let ii = 0; ii < sectors[initialSectorID].slider.length; ii++) {
            let slider_move = sectors[initialSectorID].slider[ii];
            canvas.moveTo(slider_move, sectorStackID + addToStack)
            addToStack += 1
        }
    }
    for (let ii = 0; ii < sectors[initialSectorID].lineSegments.length; ii++) {
        let segment = sectors[initialSectorID].lineSegments[ii];
        canvas.moveTo(segment, sectorStackID + addToStack)
        addToStack += 1
        if(segment.dragPoint !== undefined) {
            let object = segment.dragPoint;
            canvas.moveTo(object, sectorStackID + addToStack)
            addToStack += 1
        }
    }
    for (let ii = 0; ii < sectors[initialSectorID].texts.length; ii++) {
        let text = sectors[initialSectorID].texts[ii];
        canvas.moveTo(text, sectorStackID + addToStack)
        addToStack += 1
    }
    for (let ii = 0; ii < sectors[initialSectorID].cornerArcs.length; ii++) {
        let cornerArc = sectors[initialSectorID].cornerArcs[ii];
        canvas.moveTo(cornerArc, sectorStackID + addToStack)
        addToStack += 1
    }
    if (sectors[initialSectorID].ID_text.relationship) {
        canvas.moveTo(sectors[initialSectorID].ID_text, sectorStackID + addToStack)
    }
}

function overlapControll(trapez) {

    let overlap = false;
    let paddingOverlap = false;

    let trapezPointsAsGlobalCoords = getTrapezPointsAsGlobalCoords(trapez);

    for (let ii = 0; ii < 4; ii++) {
        xg1 = trapezPointsAsGlobalCoords[ii].x;
        xg2 = trapezPointsAsGlobalCoords[(ii + 1) % 4].x;
        yg1 = trapezPointsAsGlobalCoords[ii].y;
        yg2 = trapezPointsAsGlobalCoords[(ii + 1) % 4].y;

        let kantenMittelpunkt = new fabric.Point(xg1 + (xg2 - xg1) / 2, yg1 + (yg2 - yg1) / 2);

        overlapParameter = getSchnittpunktsparameterPadding(sectors, [xg1, yg1, xg2, yg2]);
        for (let jj = 0; jj < overlapParameter.length; jj++)
            if (overlapParameter[jj] > 0.1 && overlapParameter[jj] < 0.979999999999999) {
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
        trapez.opacity = 0.5;
    }
    if (overlap == false && paddingOverlap == false) {
        trapez.opacity = 1.0;
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

        let trapezPointsAsGlobalCoords = getTrapezPointsAsGlobalCoords(trapez)

        //Die folgenden Zeilen versetzen die zu verwendenden Eckpunkte des Trapzes nach Innen (bilden eines Padding)
        trapezPointsAsGlobalCoords[0].x = trapezPointsAsGlobalCoords[0].x + paddingFactor * (trapezPointsAsGlobalCoords[2].x-trapezPointsAsGlobalCoords[0].x);
        trapezPointsAsGlobalCoords[0].y = trapezPointsAsGlobalCoords[0].y + paddingFactor * (trapezPointsAsGlobalCoords[2].y-trapezPointsAsGlobalCoords[0].y);

        trapezPointsAsGlobalCoords[2].x = trapezPointsAsGlobalCoords[2].x - paddingFactor * (trapezPointsAsGlobalCoords[2].x-trapezPointsAsGlobalCoords[0].x);
        trapezPointsAsGlobalCoords[2].y = trapezPointsAsGlobalCoords[2].y - paddingFactor * (trapezPointsAsGlobalCoords[2].y-trapezPointsAsGlobalCoords[0].y);

        trapezPointsAsGlobalCoords[1].x = trapezPointsAsGlobalCoords[1].x + paddingFactor * (trapezPointsAsGlobalCoords[3].x-trapezPointsAsGlobalCoords[1].x);
        trapezPointsAsGlobalCoords[1].y = trapezPointsAsGlobalCoords[1].y + paddingFactor * (trapezPointsAsGlobalCoords[3].y-trapezPointsAsGlobalCoords[1].y);

        trapezPointsAsGlobalCoords[3].x = trapezPointsAsGlobalCoords[3].x - paddingFactor * (trapezPointsAsGlobalCoords[3].x-trapezPointsAsGlobalCoords[1].x);
        trapezPointsAsGlobalCoords[3].y = trapezPointsAsGlobalCoords[3].y - paddingFactor * (trapezPointsAsGlobalCoords[3].y-trapezPointsAsGlobalCoords[1].y);




        for (let kk = 0; kk < 4; kk++) {

            let xt1 =  trapezPointsAsGlobalCoords[kk].x;
            let xt2 =  trapezPointsAsGlobalCoords[(kk + 1) % 4].x;
            let yt1 =  trapezPointsAsGlobalCoords[kk].y;
            let yt2 =  trapezPointsAsGlobalCoords[(kk + 1) % 4].y;

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
        }

    }
    return isPointInsideSectors;
}

function positionSectors() {
    for (let ii = 0; ii < sectors.length; ii++){
        sectors[ii].trapez.top = sectors[ii].pos_y;
        sectors[ii].trapez.left = sectors[ii].pos_x;
        sectors[ii].trapez.rotate(sectors[ii].sector_angle);
        //sectors[ii].trapez.angle = ;
        updateMinions(sectors[ii].trapez);
    }
}

function randomPositionAndAngle(){
    for (let ii = 0; ii < sectors.length; ii++){
        let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        sectors[ii].trapez.top += 100 * Math.random() * plusOrMinus;
        sectors[ii].trapez.left += 100 * Math.random() * plusOrMinus;
        sectors[ii].trapez.angle += 360 * Math.random() * plusOrMinus;
        sectors[ii].trapez.setCoords();
        updateMinions(sectors[ii].trapez);
    }
}

function reinitialiseSector(dist_inv_min_x_old, dist_inv_max_y_old, initialSectorID){

    let lastTopTrapez = sectors[initialSectorID].trapez.top;
    let lastLeftTrapez = sectors[initialSectorID].trapez.left;
    let lastTopID_text = sectors[initialSectorID].ID_text.top;
    let lastLeftID_text = sectors[initialSectorID].ID_text.left;

    let start_pos_BL_text_x = sectors[initialSectorID].ID_text.start_pos_BL_text_x;
    let start_pos_BL_text_y = sectors[initialSectorID].ID_text.start_pos_BL_text_y;

    let dist_inv_min_x_new = Math.min(sectors[initialSectorID].trapez.points[0].x, sectors[initialSectorID].trapez.points[1].x, sectors[initialSectorID].trapez.points[2].x, sectors[initialSectorID].trapez.points[3].x);
    let dist_inv_min_y_new = Math.max(sectors[initialSectorID].trapez.points[0].y, sectors[initialSectorID].trapez.points[1].y, sectors[initialSectorID].trapez.points[2].y, sectors[initialSectorID].trapez.points[3].y);


    canvas.remove(sectors[initialSectorID].trapez);

    canvas.remove(sectors[initialSectorID].ID_text);

    sectors[initialSectorID].draw(sectors[initialSectorID].trapez.points[0].x, sectors[initialSectorID].trapez.points[0].y, sectors[initialSectorID].trapez.points[1].x, sectors[initialSectorID].trapez.points[1].y, sectors[initialSectorID].trapez.points[2].x, sectors[initialSectorID].trapez.points[2].y, sectors[initialSectorID].trapez.points[3].x, sectors[initialSectorID].trapez.points[3].y);

    sectors[initialSectorID].trapez.set('left', lastLeftTrapez + dist_inv_min_x_new - dist_inv_min_x_old).setCoords();
    sectors[initialSectorID].trapez.set('top', lastTopTrapez + dist_inv_min_y_new - dist_inv_max_y_old).setCoords();

    sectors[initialSectorID].ID_text.set('left', lastLeftID_text).setCoords();
    sectors[initialSectorID].ID_text.set('top', lastTopID_text).setCoords();

    sectors[initialSectorID].ID_text.start_pos_BL_text_x = start_pos_BL_text_x;
    sectors[initialSectorID].ID_text.start_pos_BL_text_y = start_pos_BL_text_y;

    sectors[initialSectorID].ID_text.relationship = getRelationship(sectors[initialSectorID].ID_text, sectors[initialSectorID].ID);


    for (let ii = 0; ii < sectors[initialSectorID].slider.length; ii++) {
        sectors[initialSectorID].slider[ii].relationship = getRelationship(sectors[initialSectorID].slider[ii], sectors[initialSectorID].ID)
    }

    sectors[initialSectorID].slider[0].relationship[5] = sectors[initialSectorID].slider[1].relationship[5] + sectors[initialSectorID].rapidity * slider_max;

    if (sectors[initialSectorID].ticks.length > 0) {
        for (let ii = 0; ii < sectors[initialSectorID].ticks.length; ii++) {
            canvas.bringToFront(sectors[initialSectorID].ticks[ii]);
        }

        for (let ii = 0; ii < sectors[initialSectorID].ticks.length; ii++) {
            sectors[initialSectorID].ticks[ii].relationship = getRelationship(sectors[initialSectorID].ticks[ii], sectors[initialSectorID].ID);
        }
    }

    if (sectors[initialSectorID].lineSegments.length > 0) {

        for (let ii = 0; ii < sectors[initialSectorID].lineSegments.length; ii++) {
            canvas.bringToFront(sectors[initialSectorID].lineSegments[ii]);
        }

        for (let ii = 0; ii < sectors[initialSectorID].lineSegments.length; ii++) {
            sectors[initialSectorID].lineSegments[ii].relationship = getRelationship(sectors[initialSectorID].lineSegments[ii], sectors[initialSectorID].ID);

            if (sectors[initialSectorID].lineSegments[ii].dragPoint !== undefined) {
                canvas.bringToFront(sectors[initialSectorID].lineSegments[ii].dragPoint);
                sectors[initialSectorID].lineSegments[ii].dragPoint.relationship = getRelationship(sectors[initialSectorID].lineSegments[ii].dragPoint, sectors[initialSectorID].ID);
            }
        }
    }
}

function removeDeficitAngleVisualize() {


    if (deficitAngleVisualizeGroup._objects.length > 0) {
        for (let ii = 0; ii < deficitAngleVisualizeGroup._objects.length; ii++) {
            let object = deficitAngleVisualizeGroup._objects[ii]
            canvas.remove(object);
        }
        deficitAngleVisualizeGroup = new fabric.Group()
        infoboxDeficitAngleText.set('text', infoboxDeficitAngleTextByLanguage)
        canvas_side_bar_perm.requestRenderAll()
    }

    /*
    if (deficitAngleVisualizePolygon !== undefined) {
        canvas.remove(deficitAngleVisualizePolygon);
        infoboxDeficitAngleText.set('text', infoboxDeficitAngleTextByLanguage)
        canvas_side_bar_perm.requestRenderAll()
    }
    */
}

function removeSnapEdges(initialSectorID) {
    for (let ii = 0; ii < 4; ii++) {

        let neighbourSectorID = sectors[initialSectorID].neighbourhood[ii];

        if (sectors[initialSectorID].snapEdges[ii] !== 0) {
            let edgeToRemove = sectors[initialSectorID].snapEdges[ii];
            canvas.remove(edgeToRemove);
            sectors[initialSectorID].snapEdges[ii] = [0];
        }

        if (neighbourSectorID > -1) {

            if (sectors[neighbourSectorID].snapEdges[(ii + 2) % 4] !== 0) {
                let edgeToRemove = sectors[neighbourSectorID].snapEdges[(ii + 2) % 4];
                canvas.remove(edgeToRemove);
                sectors[neighbourSectorID].snapEdges[(ii + 2) % 4] = [0];
            }
        }
    }
}

function resetSectors() {

    canvas.discardActiveObject();
    canvas.renderAll();

    let immediatehistory = [1];

    for (let rr = 0; rr < sectors.length; rr++){
        removeSnapEdges(sectors[rr].ID);

        sectorParameterOnMousedown = getSectorParameterOnMousedown(sectors[rr].ID)
        immediatehistory.push(sectorParameterOnMousedown)


        if (turnLorentzTransformOn == "1"){
            if (Math.abs(sectors[rr].trapez.left - sec_posx[rr] + window.innerWidth/2) < epsilon || Math.abs(sectors[rr].trapez.top - sec_posy[rr] + (window.innerHeight - window.innerHeight*0.08)/2) < epsilon|| sectors[rr].rapidity !== 0) {


                let lastLeft = sectors[rr].trapez.left;
                let lastTop = sectors[rr].trapez.top;

                let dist_inv_min_x_new = Math.min(sectors[rr].trapez.points[0].x, sectors[rr].trapez.points[1].x, sectors[rr].trapez.points[2].x, sectors[rr].trapez.points[3].x);
                let dist_inv_min_y_new = Math.max(sectors[rr].trapez.points[0].y, sectors[rr].trapez.points[1].y, sectors[rr].trapez.points[2].y, sectors[rr].trapez.points[3].y);

                let trapez_x_min = Math.min(sec_coords[rr][0], sec_coords[rr][2], sec_coords[rr][4], sec_coords[rr][6]);

                lorentzTransform(0, sectors[rr].trapez);

                sectors[rr].slider[0].top = sectors[rr].slider[1].top;

                canvas.remove(sectors[rr].trapez);

                canvas.remove(sectors[rr].ID_text);

                sectors[rr].draw(sectors[rr].trapez.points[0].x, sectors[rr].trapez.points[0].y, sectors[rr].trapez.points[1].x, sectors[rr].trapez.points[1].y, sectors[rr].trapez.points[2].x, sectors[rr].trapez.points[2].y, sectors[rr].trapez.points[3].x, sectors[rr].trapez.points[3].y);

                sectors[rr].trapez.set('left', lastLeft - dist_inv_min_x_new + trapez_x_min).setCoords();
                sectors[rr].trapez.set('top', lastTop - dist_inv_min_y_new + sec_coords[rr][5]).setCoords();

                sectors[rr].ID_text.set('left', lastLeft - dist_inv_min_x_new + 90).setCoords();
                sectors[rr].ID_text.set('top', lastTop - dist_inv_min_y_new + sec_coords[rr][5] - 50).setCoords();

                for (let ss = 0; ss < sectors[rr].slider.length; ss++) {
                    sectors[rr].slider[ss].relationship = getRelationship(sectors[rr].slider[ss], sectors[rr].ID);
                }

                if (sectors[rr].ticks.length > 0) {
                    for (let ss = 0; ss < sectors[rr].ticks.length; ss++) {
                        canvas.bringToFront(sectors[rr].ticks[ss]);

                    }
                    for (let ss = 0; ss < sectors[rr].ticks.length; ss++) {
                        sectors[rr].ticks[ss].relationship = getRelationship(sectors[rr].ticks[ss], sectors[rr].ID);
                    }
                }

                if (sectors[rr].lineSegments.length > 0) {
                    for (let ss = 0; ss < sectors[rr].lineSegments.length; ss++) {
                        canvas.bringToFront(sectors[rr].lineSegments[ss]);

                    }
                    for (let ss = 0; ss < sectors[rr].lineSegments.length; ss++) {
                        sectors[rr].lineSegments[ss].relationship = getRelationship(sectors[rr].lineSegments[ss], sectors[rr].ID);

                        if (sectors[rr].lineSegments[ss].dragPoint !== undefined) {
                            canvas.bringToFront(sectors[rr].lineSegments[ss].dragPoint)

                            sectors[rr].lineSegments[ss].dragPoint.relationship = getRelationship(sectors[rr].lineSegments[ss].dragPoint, sectors[rr].ID);
                        }

                    }
                }
                sectors[rr].rapidity = 0;
            }
        }

        sectors[rr].trapez.left = sec_posx[rr] + window.innerWidth/2;
        sectors[rr].trapez.top = sec_posy[rr] + (window.innerHeight - window.innerHeight*0.08)/2;
        sectors[rr].trapez.setCoords();
        sectors[rr].trapez.angle = sec_angle[rr];

        updateMinions(sectors[rr].trapez);
        //updateMinions(sectors[rr].trapez);


    }

    history.push(immediatehistory);

    for (let rr = 0; rr < sectors.length; rr++){
        changeSnapStatus(sectors[rr].ID);
        if (turnOverlapControllOn == "1"){
            overlapControll(sectors[rr].trapez);
        }

    }
    canvas.renderAll();
}

function resetAppliction() {

    lines = [];
    markPoints = [];
    history = [];

    for( let ii = 0; ii < sectors.length; ii++){
        sectors[ii].lineSegments = [];
        sectors[ii].markCircles = [];
        sectors[ii].cornerArcs = [];
    }

    let objects = canvas.getObjects('line');
    for (let ii=0; ii < objects.length; ii++) {
        canvas.remove(objects[ii]);
    }

    objects = canvas.getObjects('polyline');
    for (let ii=0; ii < objects.length; ii++) {
        canvas.remove(objects[ii]);
    }


    objects = canvas.getObjects('circle');
    for (let ii = 0; ii < objects.length; ii++) {
        canvas.remove(objects[ii]);
    }

    resetSectors();
    if (buildStartGeodesics == "1"){startGeodesics();}

    if (buildStartMarks == "1"){startMarks();}

    if (showVerticesOn == "1"){drawVertices();}

    toolChange('grab');
    geodreieck.set('angle', 0);
    canvas.renderAll();

    if (showExerciseBox == "1"){
        currentSlideNumber = 0;
        showNextSlide()
    }

}

//------------Rotationskontrolle: Icon und Position werden verändert------------
//Rotationskontrolle: Icon und Position werden verändert

let rotateIcon = 'rotate.png';
let img = document.createElement('img');
img.src = rotateIcon;

fabric.Object.prototype.controls.mtr = new fabric.Control({
    x: 0,
    y: -0.5,
    offsetY: -15,
    cursorStyle: 'col-resize',
    actionHandler: fabric.controlsUtils.rotationWithSnapping,
    actionName: 'rotate',
    render: renderIcon,
    cornerSize: 40,
    withConnection: true
});

function renderIcon(ctx, left, top, styleOverride, fabricObject) {
    let size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(img, -size / 2, -size / 2, size, size);
    ctx.restore();
}
//-----------------------------------------------------------------------------

function rotateSectorToAlignAngle(initialSectorID, targetSectorID) {


    let commonEdgeNumber = getCommonEdgeNumber(initialSectorID, targetSectorID);
    let dxs_tmp;
    let dys_tmp;
    let gamma_target;
    let gamma_initial;

    dxs_tmp = sectors[targetSectorID].trapez.points[commonEdgeNumber].x - sectors[targetSectorID].trapez.points[(commonEdgeNumber + 1) % 4].x;
    dys_tmp = sectors[targetSectorID].trapez.points[commonEdgeNumber].y - sectors[targetSectorID].trapez.points[(commonEdgeNumber + 1) % 4].y;

    if (Math.abs(dys_tmp) > epsilon) {
        gamma_target = Math.atan(dxs_tmp / dys_tmp);
    } else {
        gamma_target = 0.0
    }

    dxs_tmp = sectors[initialSectorID].trapez.points[(commonEdgeNumber + 2) % 4].x - sectors[initialSectorID].trapez.points[(commonEdgeNumber + 3) % 4].x;
    dys_tmp = sectors[initialSectorID].trapez.points[(commonEdgeNumber + 2) % 4].y - sectors[initialSectorID].trapez.points[(commonEdgeNumber + 3) % 4].y;

    if (Math.abs(dys_tmp) > epsilon) {
        gamma_initial = Math.atan(dxs_tmp / dys_tmp);
    } else {
        gamma_initial = 0.0
    }

    sectors[initialSectorID].trapez.angle = sectors[targetSectorID].trapez.angle + gamma_target / Math.PI * 180 - gamma_initial / Math.PI * 180;

    sectors[initialSectorID].trapez.setCoords();


}

function Sector() {
    this.trapez; //Anlegen der Variablen trapez, undefiniert, um mehr als eines anlegen zu können

    //this.sector_top ;
    //this.sector_bottom;
    //this.offset_x;
    this.pos_x;
    this.pos_y;
    this.sector_height;
    this.sector_width;
    this.sector_angle;
    this.name;
    this.ID;
    this.fill;
    this.sector_type;

    this.draw = drawSector; // das Objekt Sektor bekommt die Methode 'drawSectors' mitgegeben, keine Klammern

    if (turnLorentzTransformOn == "1"){
        this.slider;
        this.rapidity = 0;
        this.draw_slider = drawSlider;
    }

    this.lineSegments = [];
    this.polylineSegments = [];
    this.markCircles = [];
    this.texts = [];
    this.cornerArcs = [];
    this.ticks = [];

    this.ID_text;
    //Nachbarschaftsbeziehung (Indizes der benachbarten Sektoren; top, right , bottom, left)
    this.neighbourhood = [-1,-1,-1,-1];
    this.snapStatus = [0,0,0,0];
    this.overlapStatus = [0,0,0,0];
    this.snapEdges = [[0],[0],[0],[0]];
}

function sectorContainsPoint(trapez,segmentMittelpunkt) {
    let isPointInsideSectors = false;
    //
    if (trapez.containsPoint(segmentMittelpunkt, undefined, 'absolute: false' )) {
        //Nach Überprüfen der bounding box prüfen ob tatsächlich innerhalb des Polygons
        //Dazu berechnen der relativen Position (links-/rechtsorientiert zu den Sektorkanten)
        //Wenn zu allen Kanten rechtsorientiert (d. h. beta > 0) dann innerhalb des Polygons
        isPointInsideSectors = true;

        let trapezPointsAsGlobalCoords = getTrapezPointsAsGlobalCoords(trapez);


        for (let kk = 0; kk < 4; kk++) {



            let xt1 =  trapezPointsAsGlobalCoords[kk].x;
            let xt2 =  trapezPointsAsGlobalCoords[(kk + 1) % 4].x;
            let yt1 =  trapezPointsAsGlobalCoords[kk].y;
            let yt2 =  trapezPointsAsGlobalCoords[(kk + 1) % 4].y;


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



            if (beta < epsilon){
                isPointInsideSectors = false;
            }
        }

    }
    return isPointInsideSectors;
}

function setGeodesicMode (){
    if (geodesicMode === 'normal') {
        geodesicMode = 'lightLike';

    }else {
        geodesicMode = 'normal';

    }
}

function setOuterSectorsToCircle() {
    for (let ii = 0; ii < sectors.length; ii++) {
        if (sectors[ii].sector_type == 'euklid') {

            let ausgangssektorID;
            let nachbarsektorTopID;
            let nachbarsektorRightID;


            ausgangssektor = sectors[sectors[ii].ID];
            ausgangssektorID = ausgangssektor.ID
            nachbarsektorRightID = ausgangssektor.neighbourhood[1];
            nachbarsektorTopID= ausgangssektor.neighbourhood[0];

            if (nachbarsektorTopID !== -1){
                snapInitialSectorToTargetSector(nachbarsektorTopID, ausgangssektorID)
            }

            if (nachbarsektorRightID !== -1){
                snapInitialSectorToTargetSector(nachbarsektorRightID, ausgangssektorID)
            }

            drawSnapEdges(ausgangssektorID)
            drawSnapEdges(nachbarsektorRightID)
        }

        if (sectors[ii].sector_type !== 'euklid') {
            sectors[ii].trapez.set('top', 8000);
            sectors[ii].trapez.set('left', 8000);
            sectors[ii].trapez.setCoords();
            updateMinions(sectors[ii].trapez);

        }
    }
}

function setSectorsToCenter(){

    for (let ii =0; ii < sectors.length; ii++){

        if (sectors[ii].sector_type !== 'euklid') {
            sectors[ii].trapez.set('top', 8000);
            sectors[ii].trapez.set('left', 8000);
            sectors[ii].trapez.setCoords();
            updateMinions(sectors[ii].trapez);

        }


    }
    canvas.renderAll();
}

function setZoomPan(){
    canvas.setZoom( startZoom);
    canvas.viewportTransform[4]= startViewportTransform_4;
    canvas.viewportTransform[5]= startViewportTransform_5;
}

function showDeficitAngleInfobox(deficitAngleInfoboxVisibleToSet){
    if (deficitAngleInfoboxVisibleToSet == true) {
        canvas_side_bar_perm.setWidth(220 * scaleRatio);
        infoboxDeficitAngle.opacity = 1;
        infoboxDeficitAngleText.opacity = 1;
    }

    if (deficitAngleInfoboxVisibleToSet == false) {
        if (toCalcSectorArea !== true) {
            canvas_side_bar_perm.setWidth(100 * scaleRatio);
        }
        removeDeficitAngleVisualize();
        infoboxDeficitAngle.opacity = 0;
        infoboxDeficitAngleText.opacity = 0;
        infoboxDeficitAngleText.set('text', infoboxDeficitAngleTextByLanguage)
    }

}

function showSectorAreaInfobox(sectorAreaInfoboxVisibleToSet){
    if (sectorAreaInfoboxVisibleToSet == true) {
        canvas_side_bar_perm.setWidth(220 * scaleRatio);
        infoboxArea.opacity = 1;
        infoboxAreaText.opacity = 1;
    }

    if (sectorAreaInfoboxVisibleToSet == false) {
        if (verticesVisible !== true){
            canvas_side_bar_perm.setWidth(100 * scaleRatio);
        }
        infoboxArea.opacity = 0;
        infoboxAreaText.opacity = 0;
        infoboxAreaText.set('text', infoboxAreaTextByLanguage)
    }

}

function showVertices(toShowVertices){
    if (toShowVertices == true){
        verticesVisible = true;
        showDeficitAngleInfobox(true)
        for (let ii = 0; ii < vertexAngleParts.length; ii++){
            vertexAngleParts[ii].set('opacity', 0.7)
        }
        canvas.renderAll();

    }else {
        verticesVisible = false;
        showDeficitAngleInfobox(false)
        for (let ii = 0; ii < vertexAngleParts.length; ii++){
            vertexAngleParts[ii].set('opacity', 0.0)
        }
        canvas.renderAll();
    }
}

function snapInitialSectorToTargetSector(initialSectorID, targetSectorID) {

    if(textured !== "1") {
        sectors[targetSectorID].trapez.fill = sec_fill[sectors[targetSectorID].ID];
    }

    if (turnLorentzTransformOn == "1"){

        translateInitialSectorToTargetSector(initialSectorID, targetSectorID);

    }else{
        rotateSectorToAlignAngle(initialSectorID, targetSectorID);

        translateInitialSectorToTargetSector(initialSectorID, targetSectorID);
    }

    updateMinions(sectors[initialSectorID].trapez)

    sectorToSnap = -1;

    changeSnapStatus(initialSectorID)

    if (showExerciseBox == "1"){
        checkSlideCondition();
        checkCheckBoxCondition();
    }

}

function startGeodesics(){

    for (let ii = 0; ii < startSectors.length; ii++) {

        let sec = sectors[startSectors[ii]];

        let lineSegment = new fabric.Line([x_Start[ii] + window.innerWidth / 2, y_Start[ii] + (window.innerHeight - window.innerHeight * 0.08) / 2, x_End[ii] + window.innerWidth / 2, y_End[ii] + (window.innerHeight - window.innerHeight * 0.08) / 2], {
            strokeWidth: startStrokeWidth[ii],
            fill: startFill[ii],
            stroke: startStroke[ii],
            originX: 'center',
            originY: 'center',
            perPixelTargetFind: true,
            objectCaching: false,
            hasBorders: false,
            hasControls: false,
            evented: true,
            selectable: false,
        });
        lineSegment.parentSector = startParentSector[ii];

        lineSegment.ID = startLineID[ii];

        lineSegment.lineType = "geodesic"

        lineSegment.relationship = getRelationship(lineSegment, sec.ID);

        sec.lineSegments.push(lineSegment);
        lines.push([lineSegment]);
        let stackidx = canvas.getObjects().indexOf(sectors[lineSegment.parentSector[0]].ID_text);
        canvas.insertAt(lineSegment, stackidx);

        if (turnLorentzTransformOn == "1"){


            getStartAndEndPointCoordsBeforeLorentztransform(lineSegment)

            lines[ii].operational = startGeodesicOperational[ii];
            if (lines[ii].operational === false){
                continueGeodesic(ii)
            }

        }

        drawDragPoint(lineSegment.ID[0])

    }

}

function startMarks() {

    for (let ii = 0; ii < markStartParentSector.length; ii++) {

        let sec = sectors[markStartParentSector[ii][0]];

        let mark = new fabric.Circle({
            originX: 'center',
            originY: 'center',
            left: markStart_x[ii]  + window.innerWidth/2,
            top: markStart_y[ii]  + (window.innerHeight - window.innerHeight*0.08)/2,
            radius: markStartRadius[ii],
            stroke: markStartStroke[ii],
            strokeWidth: markStartStrokeWidth[ii],
            fill: markStartFill[ii],
            perPixelTargetFind: true,
            hasBorders: false,
            objectCaching: false,
            selectable: false,
            lockMovementX: true,
            lockMovementY: true,
            lockScalingX: true,
            lockScalingY: true,
            evented: true,
            hoverCursor: 'crosshair',
            padding: 10
        });

        mark.parentSector = markStartParentSector[ii];

        mark.relationship = getRelationship(mark, sec.ID)
        mark.ID = markStartID[ii];
        sec.markCircles.push(mark);
        let stackIdx = canvas.getObjects().indexOf(sectors[mark.parentSector[0]].ID_text);
        canvas.insertAt(mark,stackIdx);

        markPoints.push(mark);

        mark.on('mousedown',function(o){

            for (let kk = 0; kk < lines.length; kk++){
                for (let ll = 0; ll < lines[kk].length; ll++)
                    lines[kk][ll].strokeWidth = 2 ;
            }


            chosenLineGlobalID = -1;

            let color;
            color = line_colors[lines.length % line_colors.length];

            if (!isLineStarted) {

                startAtMarkPoint = this.ID;

                let pointer = canvas.getPointer(o.e);

                if (lineTypeToDraw == 'geodesic'){

                    isLineStarted = true;

                    let points = [this.left, this.top, pointer.x, pointer.y];

                    showGeodesicButtons(true);

                    line  = new fabric.Line(points, {
                        strokeWidth: lineStrokeWidthWhenSelected,
                        stroke: color,
                        fill: color,
                        originX: 'center',
                        originY: 'center',
                        perPixelTargetFind: true,
                        objectCaching: false,
                        hasBorders: false,
                        hasControls: false,
                        evented: true
                    });

                    canvas.add(line);

                    line.bringToFront();
                }

                if (lineTypeToDraw == 'polyline'){

                    isLineStarted = true;

                    let points = [this.left, this.top, pointer.x, pointer.y];

                    showGeodesicButtons(true);

                    pathCoords.push({x: points[0], y: points[1]});
                    pathCoords.push({x: points[2], y: points[3]});
                    polyline = new fabric.Polyline(pathCoords, {
                        stroke: color,
                        fill: '',
                        strokeWidth: 2,
                        perPixelTargetFind: true,
                        originX: 'center',
                        originY: 'center',
                        objectCaching: false,
                        hasBorders: false,
                        hasControls: false,
                        evented: false,
                        selectable: false,
                    });

                    canvas.add(polyline);

                    polyline.bringToFront();

                }




                canvas.renderAll();


            }

        });


        canvas.renderAll();
    }
}

function startTexts() {
    for (let ii = 0; ii < textStartParentSector.length; ii++) {

        let sec = sectors[textStartParentSector[ii][0]];

        let text = new fabric.Text("" + (textStartContent[ii]), {
            fontSize : textStartFontSize[ii],
            originX: 'center',
            originY: 'center',
            lockMovementX: true,
            lockMovementY: true,
            lockScalingX: true,
            lockScalingY: true,
            selectable: false,
            evented: false,
            left: textStart_x[ii]  + window.innerWidth/2,
            top: textStart_y[ii]  + (window.innerHeight - window.innerHeight*0.08)/2,
            angle: textStartAngle[ii],
        });

        text.parentSector = textStartParentSector[ii];

        text.relationship = getRelationship(text, textStartParentSector[ii][0]);
        text.ID = textStartID[ii];
        sec.texts.push(text);
        let stackIdx = canvas.getObjects().indexOf(sectors[text.parentSector[0]].ID_text);
        canvas.insertAt(text, stackIdx);
        texts.push(text);
        canvas.renderAll();
    }
}

//Bestimmt die Sektorzugehörigkeit der Liniensegmente einer Geodäte über Mittelpunkte
function testLocation(lambdas, [xg1,yg1,xg2,yg2]) {

    let lineOverSectors = [];

    for (let ii = 0; ii < lambdas.length - 1; ii++) {
        let sectorID = -1;
        if (Math.abs(lambdas[ii] - lambdas[ii + 1])>epsilon){
            let lambdaMittelwert = (lambdas[ii] + lambdas[ii+1])/2;

            let segmentMittelpunkt = new fabric.Point((xg1 + lambdaMittelwert * (xg2 - xg1)),(yg1 + lambdaMittelwert * (yg2 - yg1)));

            let isPointInsideSectors = false;



            let stackIdx = 0;

            for(let jj = 0; jj < sectors.length; jj++){
                isPointInsideSectors = sectorContainsPoint(sectors[jj].trapez, segmentMittelpunkt);
                if (isPointInsideSectors) {
                    if (canvas.getObjects().indexOf(sectors[jj].ID_text) > stackIdx) {
                        sectorID = sectors[jj].ID
                        //break;

                        stackIdx = canvas.getObjects().indexOf(sectors[jj].ID_text);
                    }
                }
            }


            segmentMittelpunkt = null;
        }

        lineOverSectors.push(sectorID)
    }

    return lineOverSectors;
}

function toDegree(rad) {
    return rad * 180 /Math.PI
}

//Werkzeugsänderung über die Button der Internetseite
function toolChange(argument) {

    canvas.discardActiveObject();
    canvas.renderAll();

    selectedTool = argument;




    for (let ii = 0; ii < lines.length; ii++) {

        for (let jj = 0; jj < lines[ii].length; jj++) {

            lines[ii][jj].evented = true;
            lines[ii][jj].hoverCursor = 'pointer';

            if (selectedTool == 'delete') {

                showGeodesicButtons(false);
                lines[ii][jj].evented = false;
                lines[ii][jj].strokeWidth = 2;
                lines[ii][lines[ii].length - 1].hoverCursor = 'pointer';
                lines[ii][lines[ii].length - 1].evented = true;
                lines[ii][lines[ii].length - 1].strokeWidth = lineStrokeWidthWhenSelected;

            }

            if (typeof(lines[ii][jj].__eventListeners)=== 'undefined') {
                lines[ii][jj].on('mousedown', function () {
                    chosenLineGlobalID = this.ID[0];
                    for (let kk = 0; kk < lines.length; kk++){
                        for (let ll = 0; ll < lines[kk].length; ll++)
                            lines[kk][ll].strokeWidth = 2 ;
                    }
                    for (let kk = lines[chosenLineGlobalID].length - 1; kk >= 0; kk--) {
                        /*Idee: statt die Linien dicker werden lassen, ihnen einen Schatten geben
                          lines[chosenLineGlobalID][kk].setShadow({  color: 'rgba(0,0,0,0.2)',
                              blur: 10,
                              offsetX: 50,
                              offsetY: 0
                          })
                          canvas.renderAll()
                          */
                        lines[chosenLineGlobalID][kk].strokeWidth = lineStrokeWidthWhenSelected ;
                    }

                    if (selectedTool !== 'delete') {
                        showGeodesicButtons(true);
                        showSectorAreaInfobox(false);
                        showDeficitAngleInfobox(false)
                        showVertices(false)
                    }

                    chosenLineGlobalID = this.ID[0];




                    if (selectedTool == 'delete') {
                        cursor = 'not-allowed';
                        lines[this.ID[0]].splice(this.ID[1], 1);
                        if (this.ID[1] === 0) {
                            lines[this.ID[0]] = [];
                        }
                        if (this.parentSector[0] >= 0) {
                            sectors[this.parentSector[0]].lineSegments.splice(this.parentSector[1], 1);
                        }
                        canvas.remove(this);
                        toolChange(selectedTool);
                    }


                })
            }
        }
    }

    if (selectedTool !== 'delete' && selectedTool !== 'delete_whole') {

        for (let ii = 0; ii < sectors.length; ii++) {
            if (selectedTool === 'paint' || selectedTool === 'mark') {
                cursor = 'crosshair';
                sectors[ii].trapez.evented = true;
                sectors[ii].trapez.hasControls = false;
                sectors[ii].trapez.lockMovementX = true;
                sectors[ii].trapez.lockMovementY = true;
                if (geodreieck !== undefined){
                    geodreieck.selectable = false
                }
                if (add !== undefined){
                    if (lineTypeToDraw == "geodesic"){
                        add.opacity = 0;
                        add_dark.opacity = 1;
                        add.set('shadow', new fabric.Shadow(shadowOff));
                        canvas_side_bar_perm.renderAll()
                    }

                }
                if (add_curved !== undefined){
                    if (showAddCurvedLine == "1"){
                        if (lineTypeToDraw == "polyline") {
                            add_curved.opacity = 0;
                            add_dark_curved.opacity = 1;
                            add_curved.set('shadow', new fabric.Shadow(shadowOff));
                            canvas_side_bar_perm.renderAll()
                        }
                    }
                }

            } else {
                cursor = 'grabbing';
                sectors[ii].trapez.evented = true;
                sectors[ii].trapez.hasControls = true;
                sectors[ii].trapez.lockMovementX = false;
                sectors[ii].trapez.lockMovementY = false;
                if (geodreieck !== undefined){
                    geodreieck.selectable = true
                }
                if (add_dark !== undefined){
                    add.opacity = 1;
                    add_dark.opacity = 0;
                    add.set('shadow', new fabric.Shadow(shadowOff));
                    canvas_side_bar_perm.renderAll()
                }
                if (showAddCurvedLine == "1") {
                    if (add_dark_curved !== undefined) {
                        add_curved.opacity = 1;
                        add_dark_curved.opacity = 0;
                        add_curved.set('shadow', new fabric.Shadow(shadowOff));
                        canvas_side_bar_perm.renderAll()
                    }
                }
            }
            sectors[ii].trapez.hoverCursor = cursor;
        }
    }


    if (selectedTool === 'delete') {

        for (let ii = 0; ii < sectors.length; ii++) {
            sectors[ii].trapez.evented = false;
        }

        for (let ii = 0; ii < lines.length; ii++) {

            for (let jj = 0; jj < lines[ii].length; jj++) {



                if (selectedTool == 'delete') {
                    lines[ii][jj].evented = false;
                    lines[ii][jj].strokeWidth = 2;
                    lines[ii][lines[ii].length - 1].hoverCursor = 'pointer';
                    lines[ii][lines[ii].length - 1].evented = true;
                    lines[ii][lines[ii].length - 1].strokeWidth = lineStrokeWidthWhenSelected;

                }
            }
        }
    }



    canvas.renderAll()
}

function toRadians(deg) {
    return deg * Math.PI / 180
}

function translateInitialSectorToTargetSector(initialSectorID, targetSectorID){

    let commonEdgeNumber = getCommonEdgeNumber(initialSectorID, targetSectorID);

    let initialTrapezPointsAsGlobalCoordsBeforeRotating = getTrapezPointsAsGlobalCoords(sectors[initialSectorID].trapez);
    let targetTrapezPointsAsGlobalCoords = getTrapezPointsAsGlobalCoords(sectors[targetSectorID].trapez);

    let point_1 = initialTrapezPointsAsGlobalCoordsBeforeRotating[commonEdgeNumber];

    let point_a = targetTrapezPointsAsGlobalCoords[(commonEdgeNumber + 3) % 4];

    sectors[initialSectorID].trapez.left += point_a.x - point_1.x;
    sectors[initialSectorID].trapez.top += point_a.y - point_1.y;

    sectors[initialSectorID].trapez.setCoords();

    updateMinions(sectors[initialSectorID].trapez)

}

//Zuletzt gesetzte Linie wird gelöscht
function undoLastAction(){
    if (history.length <= 0){return}
    let immediatehistory = history.pop();

    if (immediatehistory[0] === 0) {

        for (let jj = 1; jj < immediatehistory.length; jj++) {

            let lineID = immediatehistory[immediatehistory.length - jj];

            let lineSegment = lines[lineID[0]][lineID[1]];

            if (lines[lineID[0]][lines[lineID[0]].length - 1].dragPoint !== undefined) {
                canvas.remove(lines[lineID[0]][lines[lineID[0]].length - 1].dragPoint);
                delete lines[lineID[0]][lines[lineID[0]].length - 1].dragPoint;

            }

            if (typeof(lineSegment) !== undefined) {
                let secID = lineSegment.parentSector;

                if (secID[0] >= 0) {
                    sectors[secID[0]].lineSegments.splice(secID[1], 1);
                }

                lines[lineID[0]].splice(lineID[1], 1);

                if (lineID[1] === 0) {
                    lines[lineID[0]] = [];
                }

                canvas.remove(lineSegment);

            }

            lineSegment = lines[lineID[0]][lines[lineID[0]].length - 1];

            drawDragPoint(lineID[0])

        }
    }

    if (immediatehistory[0] === 1) {
        for (let jj = 1; jj < immediatehistory.length; jj++) {
            let sectorID = immediatehistory[immediatehistory.length - jj][0];
            let sectorStackID = immediatehistory[immediatehistory.length - jj][1];
            let rapidityBefore = immediatehistory[immediatehistory.length - jj][5];

            removeSnapEdges(sectorID);

            if (turnLorentzTransformOn == "1") {

                let dist_inv_min_x_old = Math.min(sectors[sectorID].trapez.points[0].x, sectors[sectorID].trapez.points[1].x, sectors[sectorID].trapez.points[2].x, sectors[sectorID].trapez.points[3].x);
                let dist_inv_max_y_old = Math.max(sectors[sectorID].trapez.points[0].y, sectors[sectorID].trapez.points[1].y, sectors[sectorID].trapez.points[2].y, sectors[sectorID].trapez.points[3].y);

                sectors[sectorID].slider[0].top = sectors[sectorID].slider[1].top + rapidityBefore * slider_max;
                sectors[sectorID].slider[0].relationship = getRelationship(sectors[sectorID].slider[0], sectorID);

                lorentzTransform(rapidityBefore, sectors[sectorID].trapez);
                sectors[sectorID].rapidity = rapidityBefore;
                reinitialiseSector(dist_inv_min_x_old, dist_inv_max_y_old, sectorID)
            }


            sectors[sectorID].trapez.set('left', immediatehistory[immediatehistory.length - jj][2]);
            sectors[sectorID].trapez.set('top', immediatehistory[immediatehistory.length - jj][3]);
            sectors[sectorID].trapez.set('angle', immediatehistory[immediatehistory.length - jj][4]);
            updateMinions(sectors[sectorID].trapez);
            changeSnapStatus(sectorID);
            drawSnapEdges(sectorID)
            canvas.moveTo(sectors[sectorID].trapez, sectorStackID)
            moveMinionsToStack(sectorID, sectorStackID)

        }
    }

    if (immediatehistory[0] === 2) {
        let line = [];

        for (let jj = immediatehistory.length - 1; jj > 1; jj--) {
            let lineSegment;

            let lineSegmentParameter = immediatehistory[jj];

            if (lineSegmentParameter[0] == 'geodesic'){
                lineSegment = drawLineSegment(lineSegmentParameter[1], lineSegmentParameter[2], lineSegmentParameter[3], lineSegmentParameter[4], lineSegmentParameter[5], lineSegmentParameter[6], lineSegmentParameter[7])
            }

            if (lineSegmentParameter[0] == 'polyline'){
                lineSegment = drawPolylineSegment(lineSegmentParameter[1], lineSegmentParameter[2], lineSegmentParameter[3], lineSegmentParameter[4])
            }


            lineSegment.ID = [immediatehistory[1], line.length];
            line.push(lineSegment);
            }
        for (let jj = 0; jj < line.length; jj++){
            lines[immediatehistory[1]].push(line[jj])
        }

        drawDragPoint(line[line.length - 1].ID[0]);

        }

    if (immediatehistory[0] === 3) {
        for (let jj = 0; jj < immediatehistory[1]; jj++) {
            undoLastAction()
        }
    }

    if (immediatehistory[0] === 4) {

        for (let jj = 1; jj < immediatehistory.length; jj++) {

            let polylineID = immediatehistory[immediatehistory.length - jj];

            let polylineSegment = lines[polylineID[0]][polylineID[1]];

            if (lines[polylineID[0]][lines[polylineID[0]].length - 1].dragPoint !== undefined) {
                canvas.remove(lines[polylineID[0]][lines[polylineID[0]].length - 1].dragPoint);
                delete lines[polylineID[0]][lines[polylineID[0]].length - 1].dragPoint;

            }

            if (polylineSegment.parentSector !== undefined) {
                let secID = polylineSegment.parentSector;
                if (secID[0] >= 0) {
                    sectors[secID[0]].polylineSegments.splice(secID[1], 1);
                }
                lines[polylineID[0]].splice(polylineID[1], 1);
                if (polylineID[1] === 0) {
                    lines[polylineID[0]] = [];
                }
                canvas.remove(polylineSegment);
            }
            polylineSegment = lines[polylineID[0]][lines[polylineID[0]].length - 1];

            drawDragPoint(lineID[0])

        }
    }

    canvas.renderAll();
}



//Mitbewegen von untergeordneten Objekten (zugehörig zu einem Parentalsektor)
//TODO: Vereinfachen durch function
function updateMinions(boss) {
    boss.bringToFront();
    /*
    for(let ii=0;ii<4;ii++) {
        if (boss.parent.snapStatus[ii] !== 0) {
            boss.parent.snapEdges[ii].bringToFront();
        }
    }
    */

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

    if (turnLorentzTransformOn === "1"){
        for (let ii = 0; ii < boss.parent.slider.length; ii++){
            let slider_move = boss.parent.slider[ii];
            if (slider_move.relationship) {
                slider_move.bringToFront();
                let relationship = slider_move.relationship;
                let newTransform = multiply(
                    boss.calcTransformMatrix(),
                    relationship
                );
                let options;
                options = fabric.util.qrDecompose(newTransform);
                slider_move.set({
                    flipX: false,
                    flipY: false,
                });
                slider_move.setPositionByOrigin(
                    {x: options.translateX, y: options.translateY},
                    'center',
                    'center'
                );
                slider_move.set(options);
                slider_move.setCoords();
            }

        }
    }

    for (let ii = 0; ii < boss.parent.ticks.length; ii++) {
        let tick = boss.parent.ticks[ii];
        if (tick.relationship) {
            tick.bringToFront();
            let relationship = tick.relationship;
            let newTransform = multiply(
                boss.calcTransformMatrix(),
                relationship
            );
            let options;
            options = fabric.util.qrDecompose(newTransform);
            tick.set({
                flipX: false,
                flipY: false,
            });
            tick.setPositionByOrigin(
                {x: options.translateX, y: options.translateY},
                'center',
                'center'
            );
            tick.set(options);
            tick.setCoords();
        }
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
        if(segment.dragPoint !== undefined){
            let object = segment.dragPoint;
            if (object.relationship) {
                object.bringToFront();
                let relationship = object.relationship;
                let newTransform = multiply(
                    boss.calcTransformMatrix(),
                    relationship
                );
                let options;
                options = fabric.util.qrDecompose(newTransform);
                object.set({
                    flipX: false,
                    flipY: false,
                });
                object.setPositionByOrigin(
                    {x: options.translateX, y: options.translateY},
                    'center',
                    'center'
                );
                object.set(options);
                object.setCoords();
            }

        }
    }



    for (let ii = 0; ii < boss.parent.texts.length; ii++) {
        let text = boss.parent.texts[ii];
        if (text.relationship) {
            text.bringToFront();
            let relationship = text.relationship;
            let newTransform = multiply(
                boss.calcTransformMatrix(),
                relationship
            );
            let options;
            options = fabric.util.qrDecompose(newTransform);
            text.set({
                flipX: false,
                flipY: false,
            });
            text.setPositionByOrigin(
                {x: options.translateX, y: options.translateY},
                'center',
                'center'
            );
            text.set(options);
            text.setCoords();
        }
    }


    for (let ii = 0; ii < boss.parent.cornerArcs.length; ii++) {
        let cornerArc = boss.parent.cornerArcs[ii];
        if (cornerArc.relationship) {
            cornerArc.bringToFront();
            let relationship = cornerArc.relationship;
            let newTransform = multiply(
                boss.calcTransformMatrix(),
                relationship
            );
            let options;
            options = fabric.util.qrDecompose(newTransform);
            cornerArc.set({
                flipX: false,
                flipY: false,
            });
            cornerArc.setPositionByOrigin(
                {x: options.translateX, y: options.translateY},
                'center',
                'center'
            );
            cornerArc.set(options);
            cornerArc.setCoords();
        }
    }

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


    if (turnLorentzTransformOn == "1"){
        canvas.bringToFront(boss.parent.slider[0])
    }

}


/*********************************** MAIN ***********************************/

//***************************Sektoren entsprechend der Metrik anlegen********************************
// Für Programmierung sec.name = ii, ansonsten sec.name = sec_name[ii], wenn keine (für Bilder) sec.name = "";

init();

fitResponsiveCanvas();

if (buildTicks == "1"){
    for (let ii = 0; ii < sectors.length; ii++){
        drawTicks(sectors[ii].trapez);
    }
}

positionSectors();

if (buildStartGeodesics == "1"){startGeodesics();}

if (buildStartMarks == "1"){startMarks();}

if (buildStartTexts == "1"){startTexts();}

if (showVerticesOn == "1"){drawVertices();}

//startTexts();

toolChange(selectedTool);

if (setPositionAndAngleRandomly == "1"){randomPositionAndAngle();}

canvas.renderAll();

//----------------------TODOs-------------------------
//TODO: Sektor nach oben holen beim drüber zeichnen
//TODO: Werkzeug zum Messen von Linien
//TODO: Exercise: Event für Drehen und Verschieben
//TODO: Exercise: Tick-Leiste


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

/*
let deficitAngleVisualizePolygon

function drawDeficitAngleVisualizePolygon(sectorsToSnap, initialArcID_onSector, deficitAngleRad){

    let initialTrapezPointsAsGlobalCoords = getTrapezPointsAsGlobalCoords(sectors[sectorsToSnap[0]].trapez);

    let point_1 = initialTrapezPointsAsGlobalCoords[initialArcID_onSector]
    let point_2 = initialTrapezPointsAsGlobalCoords[(initialArcID_onSector + 3) % 4]

    let dx_tmp = point_2.x - point_1.x;
    let dy_tmp = point_2.y - point_1.y;

    let betrag_vec_12 = Math.sqrt(dx_tmp * dx_tmp + dy_tmp * dy_tmp)

    let lengthFactorSide = 1.2
    let lengthFactorTip = 1.01

    let angleToRotate = toDegree(Math.atan2(dy_tmp, dx_tmp))

    let x0 = 0;
    let y0 = 0;
    let x1 = betrag_vec_12 * lengthFactorSide;
    let y1 = 0;
    let x2 =  (x1 * lengthFactorTip * Math.cos(deficitAngleRad/2) - y1 * lengthFactorTip * Math.sin(deficitAngleRad/2));
    let y2 =  (x1 * lengthFactorTip * Math.sin(deficitAngleRad/2) + y1 * lengthFactorTip * Math.cos(deficitAngleRad/2));
    let x3 =  (x1 * Math.cos(deficitAngleRad) - y1 * Math.sin(deficitAngleRad));
    let y3 =  (x1 * Math.sin(deficitAngleRad) + y1 * Math.cos(deficitAngleRad));

    let toSetOriginY
    if (deficitAngleRad < 0){
        toSetOriginY = 'bottom'
    }else{
        toSetOriginY = 'top'
    }

    deficitAngleVisualizePolygon = new fabric.Polygon //Anlegen des Polygons (noch nicht geaddet), unter 'trapez' abgespeichert
        (
            [   {x: x0, y: y0},
                {x: x1, y: y1},
                {x: x2, y: y2},
                {x: x3, y: y3},
            ],

            {
                originX: 'left',
                originY: toSetOriginY,
                left: point_1.x , //Koordinaten der linken oberen Ecke der Boundingbox
                top: point_1.y,
                angle: angleToRotate,
                fill: '',
                strokeWidth: 1,
                stroke: 'red',
                perPixelTargetFind: true,
                hasControls: false,
                hasBorders: false,
                objectCaching: false,
                lockMovementX: true,
                lockMovementY: true,
                lockScalingX: true,
                lockScalingY: true,
                evented: false,
                opacity: 0.85,

            });

    canvas.add(deficitAngleVisualizePolygon)
}
*/