let canvas_exercise_box = new fabric.Canvas('canvas_exercise_box',{preserveObjectStacking: true,  backgroundColor : "white"});

canvas_exercise_box.selection = false;
canvas_exercise_box.selection = false;

let currentSlideNumber = 0;
let currentSlide;


if (showExerciseBox == "1"){
    container_exercise_box.style.display = "block";
} else {
    container_exercise_box.style.display = "none";
}



let exerciseText;

exerciseText = new fabric.Textbox("Text", {
    width: 300,
    opacity: 1,
    fontSize: 16 * screenFactor,
    fontFamily: 'arial',
    fontWeight: 'bold',
    selectable: false,
    originX: 'left',
    originY: 'top',
    left: 10,
    top: 10,
    text: 'text',
    fill: '#575656',
    objectCaching: false,
    hasBorders: false,
    hasControls: false,
    perPixelTargetFind: true,
    hoverCursor: "default"
});
canvas_exercise_box.add(exerciseText);


let forward;

forward = new fabric.Triangle({
    width: 30,
    height: 20,
    left: 310,
    top: 175,
    stroke: '#575656',
    strokeWidth: 3,
    fill: 'white',
    angle: 90,
    originX: 'center',
    originY: 'center',
    objectCaching: false,
    hasBorders: false,
    hasControls: false,
    selectable: false,
    perPixelTargetFind: true,
    hoverCursor: "pointer",
    opacity: 1,
});

forward.on('mouseup', function (o) {

    /* für ein sehr restriktives Verhalten:
    if (currentSlide.slideCondition !== undefined){
        if (checkSlideCondition()){
            currentSlideNumber += 1;

            showNextSlide();
        }else{
            if (currentSlide.textIfSlideConditionIsNotFulfilled !== undefined) {
                exerciseText.set('text', currentSlide.textIfSlideConditionIsNotFulfilled)
                canvas_exercise_box.renderAll()
            }
        }
    } else{
        currentSlideNumber += 1;

        showNextSlide();
    }
    */

    currentSlideNumber += 1;

    showNextSlide();

    canvas.discardActiveObject().renderAll();

});


canvas_exercise_box.add(forward);

let backward;

backward = new fabric.Triangle({
    width: 30,
    height: 20,
    left: 20,
    top: 175,
    stroke: '#575656',
    strokeWidth: 3,
    fill: 'white',
    angle: -90,
    originX: 'center',
    originY: 'center',
    objectCaching: false,
    hasBorders: false,
    hasControls: false,
    selectable: false,
    perPixelTargetFind: true,
    hoverCursor: "pointer",
    opacity: 0,

});

backward.on('mouseup', function (o) {

    currentSlideNumber -= 1;

    showNextSlide();

    canvas.discardActiveObject().renderAll();

});

canvas_exercise_box.add(backward);


let hookPoints = [
    {x: 6, y: 0},
    {x: 7, y: 1},
    {x: 3, y: 6},
    {x: 0, y: 3},
    {x: 1, y: 2},
    {x: 3, y: 4},
];

let listOfCheckBoxesWithText = [];

function drawCheckBoxWithText() {

    let checkBoxRect;

        checkBoxRect = new fabric.Rect({

            left: 0,
            top: 0,
            fill: '',
            width: 22,
            height: 22,
            strokeWidth: 2,
            stroke: '#575656',
            rx: 5,
            ry: 5,
            originX: 'center',
            originY: 'center',
            objectCaching: false,
            hasBorders: false,
            hasControls: false,
            selectable: false,
            hoverCursor: "default",
        });

        let checkBoxHook;

        checkBoxHook = new fabric.Polygon(hookPoints, {
            left: 0,
            top: 0,
            fill: '#575656',
            scaleX: 2.5,
            scaleY: 2.5,
            originX: 'center',
            originY: 'center',
            opacity: 0,
            objectCaching: false,
            hasBorders: false,
            hasControls: false,
            selectable: false,
            hoverCursor: "default",
        });


        let checkBoxText;

        checkBoxText = new fabric.Textbox("Text", {
            width: 280,
            opacity: 1,
            fontSize: 16 * screenFactor,
            fontFamily: 'arial',
            fontWeight: 'bold',
            selectable: false,
            originX: 'left',
            originY: 'top',
            left: 20,
            top: -10,
            text: 'text',
            fill: '#575656',
            objectCaching: false,
            hasBorders: false,
            hasControls: false,
            perPixelTargetFind: true,
            hoverCursor: "default"
        });

        let checkBoxWithText = new fabric.Group([checkBoxRect, checkBoxHook, checkBoxText], {
            left: 10,
            top: 15 + exerciseText.height,
            objectCaching: false,
            hasBorders: false,
            hasControls: false,
            selectable: false,
            originX: 'left',
            originY: 'top',
            hoverCursor: "default"
        });

        canvas_exercise_box.add(checkBoxWithText);

        return checkBoxWithText


}

let image = 0;



function addCheckBoxWithText() {

    for (let ii = 0; ii < listOfCheckBoxesWithText.length; ii++) {
        let checkBoxWithTextToRemove = listOfCheckBoxesWithText[ii];
        canvas_exercise_box.remove(checkBoxWithTextToRemove)
    }

    if (currentSlide.checkBoxesWithText !== undefined) {

        forward.set('opacity', 0);

        listOfCheckBoxesWithText = [];

        for (let ii = 0; ii < currentSlide.checkBoxesWithText.length; ii++) {

            checkBoxWithText = drawCheckBoxWithText();

            listOfCheckBoxesWithText.push(checkBoxWithText);

            if (language !== 'english'){
                checkBoxWithText._objects[2].set('text', currentSlide.checkBoxesWithText[ii].text_de);
                //checkBoxWithText.set('height', checkBoxWithText._objects[2].getScaledHeight() + 1)
            } else{
                checkBoxWithText._objects[2].set('text', currentSlide.checkBoxesWithText[ii].text_en);
            }

            checkBoxWithText.condition = currentSlide.checkBoxesWithText[ii].condition;
            checkBoxWithText.conditionIsFullfilled = false;

            if (ii == 0){
                if (exerciseText.text == ""){
                    console.log('go')
                    checkBoxWithText.set('top', 10)
                }
            }

            if (ii > 0) {

                checkBoxWithText.set('top', listOfCheckBoxesWithText[ii - 1]._objects[2].getScaledHeight() + 1 + listOfCheckBoxesWithText[ii - 1].top + 5)
                checkBoxWithText.setCoords()

            }

        }
    }
}

function addImage(){

    if (image !== 0){
        canvas_exercise_box.remove(image)
    }

    image = 0;

    let imageTop = exerciseText.height + 25

    if (currentSlide.checkBoxesWithText !== undefined) {

        imageTop += listOfCheckBoxesWithText[currentSlide.checkBoxesWithText.length - 1].top + listOfCheckBoxesWithText[currentSlide.checkBoxesWithText.length - 1]._objects[2].getScaledHeight() - 30

    }

    if (currentSlide.imageToAdd !== undefined) {
        fabric.Image.fromURL(currentSlide.imageToAdd[0], function(img) {
            image = img.set({
                top: imageTop,
                left: currentSlide.imageToAdd[2],
                opacity: 1,
                originX: "left",
                originY: "top",
                objectCaching: false,
                hasBorders: false,
                hasControls: false,
                evented: false,
                selectable: false,
                centeredRotation: false,
                scaleX: currentSlide.imageToAdd[1] ,
                scaleY: currentSlide.imageToAdd[1] ,
                hoverCursor: "default"});



            canvas_exercise_box.add(image)
        })
    }

}


function showNextSlide() {

    currentSlide = slideContent[currentSlideNumber];

    if (turnBackwardOff !== true){
        if (currentSlideNumber <= 1){
            backward.opacity = 0;
        }else{
            backward.opacity = 1;
        }
    }

    if (currentSlideNumber === slideContent.length-1){
        forward.opacity = 0;
    }else{
        forward.opacity = 1;
    }

    setText();

    addCheckBoxWithText();

    setSectorsVisible();

    setSectorsUnvisible();

    setGeodesicsVisible();

    addImage();

    setGeodesicsUnvisible();

    setMarksVisible();

    setMarksUnvisible();

    setTextsVisible();

    setTextsUnvisible();

    deleteChosenGeodesics();

    autoCompleteStartGeodesics();

    autoSetSectorsAlongStartGeodesics();

    sectorsToSnapTogether();

    removeAllLines();

    canvas.renderAll();

    canvas_exercise_box.renderAll()

}

function setText(){

    if (language !== 'english'){
        if (currentSlide.text_de !== undefined) {
            exerciseText.set('text', currentSlide.text_de)
        }
    } else{
        if (currentSlide.text_de !== undefined) {
            exerciseText.set('text', currentSlide.text_en)
        }
    }

}

function setSectorsVisible(){

    if (currentSlide.sectorsToShow !== undefined){

        let sectorsID;

        for (let ii = 0; ii < currentSlide.sectorsToShow.length; ii++){

            sectorsID = currentSlide.sectorsToShow[ii];

            if (sectors[sectorsID] !== undefined) {

                sectors[sectorsID].trapez.opacity = startOpacity;

                sectors[sectorsID].ID_text.opacity = startOpacity;
            }else {console.log('Sector', sectorsID, 'does not exist')}
        }
    }

}

function setSectorsUnvisible(){

    if (currentSlide.sectorsToHide !== undefined){

        let sectorsID;

        for (let ii = 0; ii < currentSlide.sectorsToHide.length; ii++){

            sectorsID = currentSlide.sectorsToHide[ii];

            if (sectors[sectorsID] !== undefined) {

                sectors[sectorsID].trapez.opacity = 0;

                sectors[sectorsID].ID_text.opacity = 0;
            }else {console.log('Sector', sectorsID, 'does not exist')}
        }
    }

}

function setGeodesicsVisible(){

    if (buildStartGeodesics !== "1"){
        return
    }

    if (currentSlide.geodesicsToShow !== undefined){

        let geodesicID;

        for (let ii = 0; ii < currentSlide.geodesicsToShow.length; ii++){

            geodesicID = currentSlide.geodesicsToShow[ii];

            for (let jj = 0; jj < lines[geodesicID].length; jj++){

                if (lines[geodesicID][jj].dragPoint !== undefined){
                    lines[geodesicID][jj].dragPoint.opacity = 1;
                    lines[geodesicID][jj].dragPoint.perPixelTargetFind = false;
                }

                if (lines[geodesicID][jj] !== undefined){
                    lines[geodesicID][jj].opacity = 1;
                }else {console.log('Geodesic', geodesicID, 'does not exist')}

            }
        }
    }

}

function setGeodesicsUnvisible(){

    if (buildStartGeodesics !== "1"){
        return
    }

    if (currentSlide.geodesicsToHide !== undefined){

        let geodesicID;

        for (let ii = 0; ii < currentSlide.geodesicsToHide.length; ii++){

            geodesicID = currentSlide.geodesicsToHide[ii];

            for (let jj = 0; jj < lines[geodesicID].length; jj++){

                if (lines[geodesicID][jj].dragPoint !== undefined){
                    lines[geodesicID][jj].dragPoint.opacity = 0;
                    lines[geodesicID][jj].dragPoint.perPixelTargetFind = true;
                }

                if (lines[geodesicID][jj] !== undefined){
                    lines[geodesicID][jj].opacity = 0;
                }else {console.log('Geodesic', geodesicID, 'does not exist')}

            }
        }
    }

}

function setMarksVisible(){

    if (buildStartMarks !== "1"){
        return
    }

    if (currentSlide.marksToShow !== undefined){

        let markID;

        for (let ii = 0; ii < currentSlide.marksToShow.length; ii++){

            markID = currentSlide.marksToShow[ii];

            if (markPoints[markID] !== undefined){
                markPoints[markID].opacity = 1;
                markPoints[markID].perPixelTargetFind = false;
            }else {console.log('MarkPoint', markID, 'does not exist')}

        }
    }

}

function setMarksUnvisible(){

    if (buildStartMarks !== "1"){
        return
    }

    if (currentSlide.marksToHide !== undefined){

        let markID;

        for (let ii = 0; ii < currentSlide.marksToHide.length; ii++){

            markID = currentSlide.marksToHide[ii];



            if (markPoints[markID] !== undefined){
                markPoints[markID].opacity = 0;
                markPoints[markID].perPixelTargetFind = false;
            }else {console.log('MarkPoint', markID, 'does not exist')}

        }
    }

}

function setTextsVisible(){

    if (buildStartTexts !== "1"){
        return
    }

    if (currentSlide.textsToShow !== undefined){

        let markID;

        for (let ii = 0; ii < currentSlide.textsToShow.length; ii++){

            textID = currentSlide.textsToShow[ii];

            if (texts[textID] !== undefined){
                texts[textID].opacity = 1;
            }else {console.log('Text', textID, 'does not exist')}

        }
    }

}

function setTextsUnvisible(){

    if (buildStartTexts !== "1"){
        return
    }

    if (currentSlide.textsToHide !== undefined){

        let textID;

        for (let ii = 0; ii < currentSlide.textsToHide.length; ii++){

            textID = currentSlide.textsToHide[ii];



            if (texts[textID] !== undefined){
                texts[textID].opacity = 0;
            }else {console.log('Text', textID, 'does not exist')}

        }
    }

}

function autoCompleteStartGeodesics(){

    if (buildStartGeodesics !== "1"){
        return
    }

    if (currentSlide.geodesicsToComplete !== undefined){

        let geodesicID;

        for (let ii = 0; ii < currentSlide.geodesicsToComplete.length; ii++){

            geodesicID = currentSlide.geodesicsToComplete[ii];

            continueGeodesic(geodesicID)
        }
    }

    toolChange('grab')

}

function autoSetSectorsAlongStartGeodesics(){

    if (buildStartGeodesics !== "1"){
        return
    }

    if (currentSlide.geodesicsToAutoSetAlong !== undefined){

        let geodesicID;

        for (let ii = 0; ii < currentSlide.geodesicsToAutoSetAlong.length; ii++){

            geodesicID = currentSlide.geodesicsToAutoSetAlong[ii];

            autoSetSectorsAlongGeodesic(geodesicID)
        }
    }

}

function sectorsToSnapTogether(){

    if (currentSlide.sectorsToSnapTogether !== undefined){

        let initialSectorID;
        let targetSectorID;

        for (let ii = 0; ii < currentSlide.sectorsToSnapTogether.length; ii++){

            initialSectorID = currentSlide.sectorsToSnapTogether[ii][0];
            targetSectorID = currentSlide.sectorsToSnapTogether[ii][1];

            removeSnapEdges(initialSectorID);
            //removeSnapEdges(targetSectorID);
            snapInitialSectorToTargetSector(initialSectorID, targetSectorID);
            drawSnapEdges(initialSectorID);
            //drawSnapEdges(targetSectorID);


        }
    }

}

function removeAllLines(){

    if (currentSlide.startToRemoveAllLines !== undefined) {
        if (currentSlide.startToRemoveAllLines == true) {
            for (let ii = 0; ii < lines.length; ii++) {
                for (let jj = 0; jj < lines[ii].length; jj++) {
                    let lineSegment = lines[ii][jj]

                    canvas.remove(lineSegment);
                    delete lineSegment

                    if(lines[ii][lines[ii].length-1].dragPoint!==undefined){
                        canvas.remove(lines[ii][lines[ii].length-1].dragPoint);
                        delete lines[ii][lines[ii].length-1].dragPoint;

                    }
                }
            }

            lines = [];
            history = [];
        }
    }
}

function deleteChosenGeodesics() {
    if (currentSlide.geodesicsToDelete !== undefined) {
        showGeodesicButtons(false)
        for (let ii = 0; ii < currentSlide.geodesicsToDelete.length; ii++) {
            console.log(currentSlide.geodesicsToDelete)
            deleteWholeGeodesic(currentSlide.geodesicsToDelete[ii])
        }

    }
    chosenLineGlobalID = -1
}

function checkSlideCondition() {

    if (currentSlide.slideCondition !== undefined){

        let conditionIsFulfilled = false;

        for (let ii = 0; ii < currentSlide.slideCondition.length; ii++){

            // Loop for snapped Sectors
            if (currentSlide.slideCondition[ii][0] == 'snappedSectors'){

                let sectorPairIsSnapped = false;

                let firstSectorID = currentSlide.slideCondition[ii][1][0];
                let secondSectorID = currentSlide.slideCondition[ii][1][1];

                for (let jj = 0; jj < 4; jj++){
                    if (sectors[firstSectorID].neighbourhood[jj] == secondSectorID) {

                        if (sectors[firstSectorID].snapStatus[jj] !== 0){
                            sectorPairIsSnapped = true;
                        }
                    }
                }

                if (sectorPairIsSnapped == true){
                    conditionIsFulfilled = true
                }else{
                    conditionIsFulfilled = false
                    break
                }
            }

        }


        if (conditionIsFulfilled){
            currentSlideNumber += 1;

            showNextSlide();
        }
    }

}

function checkCheckBoxCondition() {

    let AllCheckBoxConditionsAreFulfilled = false;

    if (currentSlide.checkBoxesWithText !== undefined){

        for (let ii = 0; ii < currentSlide.checkBoxesWithText.length; ii++){

            let currentCheckBoxWithText = listOfCheckBoxesWithText[ii];

            if (currentSlide.checkBoxesWithText[ii].condition[0] == 'snappedSectors'){

                let firstSectorID = currentSlide.checkBoxesWithText[ii].condition[1][0];
                let secondSectorID = currentSlide.checkBoxesWithText[ii].condition[1][1];

                for (let jj = 0; jj < 4; jj++){
                    if (sectors[firstSectorID].neighbourhood[jj] == secondSectorID) {

                        if (sectors[firstSectorID].snapStatus[jj] !== 0){
                            currentCheckBoxWithText.conditionIsFullfilled = true;
                            currentCheckBoxWithText._objects[1].set('opacity', 1);
                        }
                    }
                }

            }

            if (currentSlide.checkBoxesWithText[ii].condition[0] == 'lineTouchesMark'){
                let lineID = currentSlide.checkBoxesWithText[ii].condition[1][0]
                let markID = currentSlide.checkBoxesWithText[ii].condition[1][0]

                console.log(markPoints)

                for (let ii = 0; ii < lines[lineID].length; ii++){
                    let point_x = markPoints[markID].left;
                    let point_y = markPoints[markID].top;


                    let lineStartPoint = new fabric.Point(lines[lineID][ii].calcLinePoints().x1, lines[lineID][ii].calcLinePoints().y1)
                    lineStartPoint = fabric.util.transformPoint(lineStartPoint, lines[lineID][ii].calcTransformMatrix());

                    let direction_x = lines[lineID][ii].x2 - lines[lineID][ii].x1;
                    let direction_y = lines[lineID][ii].y2 - lines[lineID][ii].y1;

                    if (lines[lineID][ii].parentSector[0] == markPoints[markID].parentSector[0]){
                        if (distancePointStraightLine(point_x, point_y, lineStartPoint.x, lineStartPoint.y, direction_x, direction_y) < 2){
                            console.log(ii)
                            console.log(distancePointStraightLine(point_x, point_y, lineStartPoint.x, lineStartPoint.y, direction_x, direction_y))
                            currentCheckBoxWithText.conditionIsFullfilled = true;
                            currentCheckBoxWithText._objects[1].set('opacity', 1);
                        }
                    }
                }
            }

        }

        for (let ii = 0; ii < currentSlide.checkBoxesWithText.length; ii++){
            let currentCheckBoxWithText = listOfCheckBoxesWithText[ii];
            if (currentCheckBoxWithText.conditionIsFullfilled == true){
                AllCheckBoxConditionsAreFulfilled = true
            }else{
                AllCheckBoxConditionsAreFulfilled = false;
                break
            }
        }

        if (AllCheckBoxConditionsAreFulfilled){
            forward.opacity = 1;
        }

    }

    canvas_exercise_box.renderAll()

}

if (showExerciseBox == "1"){

    window.onload = function () {

        showNextSlide()

    }
}



