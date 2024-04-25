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
        id: 7,
        text_de: 'Parallel startende Geodäten laufen auf dem Sektormodell der Sattelfläche...',
        text_en: '',
        answerBoxesWithText: [
            {
                text_de: 'a) aufeinander zu.',
                text_en: 'a) Floater 1',
                answerIs: false,

            },
            {
                text_de: 'b) voneinander weg.',
                text_en: 'a) Floater 1',
                answerIs: true,

            },
            {
                text_de: 'c) stehts parallel.',
                text_en: 'a) Floater 1',
                answerIs: false,

            },
        ],
    },
    {
        id: 7,
        text_de: 'Die Geometrie der Sattelfläche...',
        text_en: '',
        answerBoxesWithText: [
            {
                text_de: 'a) unterscheidet sich von der der Kugeloberfläche.',
                text_en: 'a) Floater 1',
                answerIs: true,

            },
            {
                text_de: 'b) gleicht der der Kugeloberfläche.',
                text_en: 'a) Floater 1',
                answerIs: false,

            },

        ],
    },
    {
        id: 7,
        text_de: 'Ende',
        text_en: '',

    },
];


