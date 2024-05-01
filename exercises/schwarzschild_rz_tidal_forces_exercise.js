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
        text_de: 'Zwei Geodäten in diesem Modell.',
        text_en: 'Two geodeticists in this model. Complete the geodata to the End of Sector Model. First, click on the "Coordinate" button to transform and stack the necessary sectors. Then you can complete the geodata.',
        geodesicsToHide: [1],
        marksToHide: [0, 1],
    },

    {
        id: 0,
        text_de: '',
        text_en: 'Two geodeticists in this model. Complete the geodata to the End of Sector Model. First, click on the "Coordinate" button to transform and stack the necessary sectors. Then you can complete the geodata.',
        checkBoxesWithText: [
            {
                text_de: 'Vervollständige die Geodäte mit Hilfe der Koordinieren-Funktion bis zum Ende des Sektormodells.',
                text_en: '',
                type: 'tracker',
                condition: ['lineTouchesOneMark', ['chosenLineGlobalID', 0]],
            },
        ],
        imageToAdd: ['button_icons/set_sectors.png', buttonfactor, 125],
    },
    {
        id: 1,
        text_de: 'Jetzt ist in Sektor B1 ein zweiter Anfang einer Geodäte erschienen.',
        text_en: 'Now a second beginning of a geodesy has appeared in sector B1. Complete these as well. Click the "Coordinate" button again before you start drawing.',
        geodesicsToShow: [1],
        checkBoxesWithText: [
            {
                text_de: 'Vervollständige diese ebenfalls.',
                text_en: '',
                type: 'tracker',
                condition: ['lineTouchesOneMark', ['chosenLineGlobalID', 1]],
            }
        ],
        imageToAdd: ['button_icons/set_sectors.png', buttonfactor, 125],
    },
    
    {
        id: 2,
        text_de: 'Jetzt kannst du die Sektoren wieder in ihre Ausgangsposition zurücksetzen.',
        text_en: 'Now you can reset the sectors to their original position.',
        slideCondition: [['buttonPressed', 'reset']],
        imageToAdd: ['button_icons/reset.png', buttonfactor, 125],
    },
    {
        id: 3,
        text_de: 'Gut gemacht!',
        text_en: 'Well done!',
    },


];


