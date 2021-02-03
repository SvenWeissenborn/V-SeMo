let canvas_exercise_box = new fabric.Canvas('canvas_exercise_box',{preserveObjectStacking: true,  backgroundColor : "white"});

canvas_exercise_box.selection = false;
canvas_exercise_box.selection = false;

let pageNumber = 0;

if (showExerciseBox == "1"){
    container_exercise_box.style.display = "block";
} else {
    container_exercise_box.style.display = "none";
}

let exerciseText
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
    text: exerciseContent[pageNumber][0],
    fill: '#575656',
    objectCaching: false,
    hasBorders: false,
    hasControls: false,
    selectable: false,
    perPixelTargetFind: true,
});
canvas_exercise_box.add(exerciseText);

let forward
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
    pageNumber += 1;
    exerciseText.set('text', exerciseContent[pageNumber][0])
    for (let ii = 0; ii < exerciseContent[pageNumber][1].length; ii++){
        setSectorsVisible(exerciseContent[pageNumber][1][ii])
    }
    if (pageNumber === 0){
        backward.opacity = 0;
    }else{
        backward.opacity = 1;
    }
    if (pageNumber === exerciseContent.length-1){
        forward.opacity = 0;
    }else{
        forward.opacity = 1;
    }
    canvas.renderAll()
    canvas_exercise_box.renderAll()

});
canvas_exercise_box.add(forward)

let backward
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
    pageNumber -= 1;
    exerciseText.set('text', exerciseContent[pageNumber][0])
    /*
    for (let ii = 0; ii < exerciseContent[pageNumber+1][1].length; ii++){
        setSectorsUnvisible(exerciseContent[pageNumber+1][1][ii])
    }
    */

    if (pageNumber === 0){
        backward.opacity = 0;
    }else{
        backward.opacity = 1;
    }
    if (pageNumber === exerciseContent.length-1){
        forward.opacity = 0;
    }else{
        forward.opacity = 1;
    }

    canvas.renderAll()
    canvas_exercise_box.renderAll()

});

function setSectorsVisible(sectorsID){
    sectors[sectorsID].trapez.opacity = 1;
    sectors[sectorsID].ID_text.opacity = 1;
}

function setSectorsUnvisible(sectorsID){
    sectors[sectorsID].trapez.opacity = 0;
    sectors[sectorsID].ID_text.opacity = 0;
}

if (showExerciseBox == "1"){
    window.onload = function (){
        for (let ii = 0; ii < sectors.length; ii++){
            setSectorsUnvisible(ii)
        }
        for (let ii = 0; ii < exerciseContent[pageNumber][1].length; ii++){
            setSectorsVisible(exerciseContent[pageNumber][1][ii])
        }
        canvas.renderAll()
    }
}



canvas_exercise_box.add(backward)