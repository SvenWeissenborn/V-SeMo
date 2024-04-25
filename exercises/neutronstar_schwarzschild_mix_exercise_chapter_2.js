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
        id: 0,
        text_de: 'Lisa berichtet Karl, dass sie hinter dem Stern zwei Schweber (S1 & S2) gestartet hat. Beide senden kontinuierlich Signale.',
        text_en: 'Lisa tells Karl that she has launched two floaters (F1 & F2) behind the star. Both are continuously sending signals.',
        sectorsToSnapTogether: [[43, 42]]
    },

    {
        id: 1,
        text_de: 'Lisa versucht ihren Empfänger passend auszurichten. Doch egal was sie macht, sie empfängt nur das Signal eines Schwebers.',
        text_en: 'Let\'s start with something simple: rotate and move the sectors.',

    },


    {
        id: 2,
        text_de: 'Bestimme durch die Konstruktion geeigneter Geodäten, von welchem Schweber Lisa ein Signal empfangen kann.',
        text_en: 'Determine from which floater Lisa can receive a signal by constructing suitable geodesics. \nCheck your result by ticking the corresponding box.',
        answerBoxesWithText: [
            {
                text_de: 'a) Schweber 1',
                text_en: 'a) Floater 1',
                answerIs: false,
            },
            {
                text_de: 'b) Schweber 2',
                text_en: 'b) Floater 2',
                answerIs: true,
            },
        ],
    },

    {
        id: 0,
        text_de: 'Wo könnte sich ein Alien auf der Oberfläche des Neutronensterns vor Karl verstecken?',
        text_en: 'Return to the course.',
        geodesicsToHide: [],
        marksToHide: [],
        textsToHide: [],
    },

];


