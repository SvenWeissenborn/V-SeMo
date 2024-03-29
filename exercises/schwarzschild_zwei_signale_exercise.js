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

let turnBackwardOff = true;
let slideContent = [
    {
        text_de: '',
        text_en: '',

        geodesicsToHide: [0],
        marksToHide: [0, 1],

        checkBoxesWithText: [
            {
                text_de: 'Setze die blaue Linie als Geodäte über das Sektormodell fort.',
                text_en: 'Help Lisa orientate her transmitter correctly. First select the blue geodesic. Use the compass button to change her starting direction.',
                type: 'tracker',
                condition: ['lineTouchesOneMark', [1, 1]],
            }
            ]
    },

    {
        text_de: '',
        text_en: '',
        geodesicsToShow: [0],

        checkBoxesWithText: [
            {
                text_de: 'Gut gemacht! Setze nun die schwarze Linie als Geodäte über das Sektormodell fort.',
                text_en: 'Help Lisa orientate her transmitter correctly. First select the blue geodesic. Use the compass button to change her starting direction.',
                type: 'tracker',
                condition: ['lineTouchesOneMark', [0, 0]],
            }
        ]
    },

    {
        text_de: 'Sehr schön. Wie du sehen solltest, treffen sich die Geodäten erneut, nachdem sie den Raum um das Schwarze Loch passiert haben.\nKehre nun wieder zum Kurs zurück.',
        text_en: '',

    },

]


