/* -----------Eintragungen--------------*/
// id: slideID
// text: "editierbare Textbausteine"
// sectorsToHide: [SektorID 1, SektorID 2, ...] Array der zu versteckenden Sektoren
// sectorsToShow: [SektorID 1, SektorID 2, ...] Array der zu zeigenden Sektoren
// geodesicsToHide: [GeodaeteID 1, GeodaeteID 2, ...] Array der zu versteckenden Geodaeten
// geodesicsToShow: [GeodaeteID 1, GeodaeteID 2, ...] Array der zu zeigenden Geodaeten
// marksToHide: [MarkID 1, MarkID 2, ...] Array der versteckenden StartMarks
// marksToShow: [MarkID 1, MarkID 2, ...] Array der zeigenden StartMarks
// textsToHide: [TextID 1, TextID 2, ...] Array der versteckenden StartTexts
// textsToShow: [TextID 1, TextID 2, ...] Array der zeigenden StartTexts
// startToRemoveAllLines: true; um alle Geodaeten zu loeschen. Beachte, dass die History geleert wird
// geodesicsToAutoSetAlong: [GeodaeteID 1, GeodaeteID 2, ...], Array der Geodaeten, entlang derer die Sektoren zusammengesetzt werden sollen
// sectorsToSnapTogether: [[SektorIDToSnap, SektorIDZielsektor], [SektorIDToSnap, SektorIDZielsektor], ...],
// -> Array der Snappartner. Erster Eintrag gilt dem zu bewegenden Sektor der an den Zielsektor sngesnappt wird
// slideCondition: [['snappedSectors', [2, 5]]],
   //textIfSlideConditionIsNotFulfilled: 'Du hast Sektor 5 noch nicht richtig angelegt!'

// imageToAdd: 'add.png' fügt ein Bild ein
/* -------------------------------------*/

/*  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    Beachte, dass der erste SlideContent
    alle Sektoren, Geodaeten,Texte und
    Marks verstecken sollte, die nicht
    von Anfang an sichtbar sein sollen
*/

let turnBackwardOff = true

let slideContent = [
    {
        id: 0,
        text_de: 'Gemeinsam wollen wir uns mit dem Sektormodell vertraut machen.',
        text_en: 'Together we want to become familiar with the sector model.',
        sectorsToHide: [ 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16, 17, 18, 19, 20, 21, 25, 26, 27, 28, 29, 30, 31, 32, 36, 37, 38, 39, 40, 41, 42, 43, 47, 48, 49, 50, 51, 52, 53, 54, 58, 59, 60, 61, 62, 63, 64, 65, 69, 70, 71, 72, 73, 74, 75, 76, 80, 81, 82, 83, 84, 85, 86, 87, 91, 92, 93, 94, 95, 96, 97, 98, 102, 103, 104, 105, 106, 107, 108, 109, 113, 114, 115, 116, 117, 118, 119, 120, 124, 125, 126, 127, 128, 129, 130, 131],
        geodesicsToHide: [0],
        setZoomAndPanTo: [0.9, 80, 50],
    },

    {
        id: 1,
        text_de: 'Beginnen wir mit etwas einfachem: Drehe und Verschiebe die Sektoren.',
        text_en: 'Let\'s start with something simple: rotate and move the sectors.',
        //setZoomAndPanTo: [0.45, 500, 300],
        sectorsToShow: [ 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16, 17, 18, 19, 20, 21, 25, 26, 27, 28, 29, 30, 31, 32, 36, 37, 38, 39, 40, 41, 42, 43, 47, 48, 49, 50, 51, 52, 53, 54, 58, 59, 60, 61, 62, 63, 64, 65, 69, 70, 71, 72, 73, 74, 75, 76, 80, 81, 82, 83, 84, 85, 86, 87, 91, 92, 93, 94, 95, 96, 97, 98, 102, 103, 104, 105, 106, 107, 108, 109, 113, 114, 115, 116, 117, 118, 119, 120, 124, 125, 126, 127, 128, 129, 130, 131,],
        geodesicsToShow: [0],
    },



];


