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
    selectable: false,
    perPixelTargetFind: true,
});
canvas_exercise_box.add(exerciseText);


let forward;

forward = new fabric.Triangle({
    width: 30,
    height: 20,
    left: 310,
    top: 125,
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
    top: 125,
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


function showNextSlide() {

    currentSlide = slideContent[currentSlideNumber];

    console.log(currentSlide);

    if (currentSlideNumber <= 1){
        backward.opacity = 0;
    }else{
        backward.opacity = 1;
    }
    if (currentSlideNumber === slideContent.length-1){
        forward.opacity = 0;
    }else{
        forward.opacity = 1;
    }

    setText();

    setSectorsVisible();

    setSectorsUnvisible();

    setGeodesicsVisible();

    setGeodesicsUnvisible();

    setMarksVisible();

    setMarksUnvisible();

    setTextsVisible();

    setTextsUnvisible();

    autoCompleteStartGeodesics();

    autoSetSectorsAlongStartGeodesics();

    sectorsToSnapTogether();

    canvas.renderAll();

    canvas_exercise_box.renderAll()

}

function setText(){

    if (currentSlide.text !== undefined) {
        exerciseText.set('text', currentSlide.text)
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

function checkSlideCondition() {

    if (currentSlide.slideCondition !== undefined){
        let conditionIsFulfilled = false;
        for (let ii = 0; ii < currentSlide.slideCondition.length; ii++){

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
                }
            }

        }
        if (conditionIsFulfilled){
            currentSlideNumber += 1;

            showNextSlide();
        }
    }

}

if (showExerciseBox == "1"){

    window.onload = function () {

        showNextSlide()

    }
}



