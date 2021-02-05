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

exerciseText = new fabric.Text("Text", {
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

    showNextSlide()

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

            sectors[sectorsID].trapez.opacity = startOpacity;

            sectors[sectorsID].ID_text.opacity = startOpacity;
        }
    }

}

function setSectorsUnvisible(){

    if (currentSlide.sectorsToHide !== undefined){

        let sectorsID;

        for (let ii = 0; ii < currentSlide.sectorsToHide.length; ii++){

            sectorsID = currentSlide.sectorsToHide[ii];

            sectors[sectorsID].trapez.opacity = 0;

            sectors[sectorsID].ID_text.opacity = 0;
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

            for (let jj = 0; jj < geodesics[geodesicID].length; jj++){

                if (geodesics[geodesicID][jj].dragPoint !== undefined){
                    geodesics[geodesicID][jj].dragPoint.opacity = 1;
                    geodesics[geodesicID][jj].dragPoint.perPixelTargetFind = false;
                }

                geodesics[geodesicID][jj].opacity = 1;
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

            for (let jj = 0; jj < geodesics[geodesicID].length; jj++){

                if (geodesics[geodesicID][jj].dragPoint !== undefined){
                    geodesics[geodesicID][jj].dragPoint.opacity = 0;
                    geodesics[geodesicID][jj].dragPoint.perPixelTargetFind = true;
                }

                geodesics[geodesicID][jj].opacity = 0;
            }
        }
    }

}


if (showExerciseBox == "1"){

    window.onload = function () {

        showNextSlide()

    }
}



