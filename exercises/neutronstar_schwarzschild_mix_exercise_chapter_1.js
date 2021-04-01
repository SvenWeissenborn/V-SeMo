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
        text_de: 'Karl und Lisa sind in Sektor K4 am Neutronenstern angekommen.',
        text_en: 'Together we want to become familiar with the sector model.',
        geodesicsToHide: [0, 1, 2],
        marksToHide: [1, 2, 3, 4, 5,],
        textsToHide: [1, 2, 3, 4, 5, 6],
    },

    {
        id: 7,
        text_de: 'Welcher der Aussagen stimmt?',
        text_en: 'first text',
        checkBoxesWithText: [
            {
                text_de: 'a) Ich bin ein Test.',
                text_en: '2 and 3 &',
                type: 'quiz',
                answerIs: true,
                result: {
                    type: 'showMarkAndText',
                    mark: 4,
                    text: 5
                }
            },
            {
                text_de: 'b) Ich bin ein Test.',
                text_en: '2 and 3 &',
                type: 'quiz',
                answerIs: false,
                result: {
                    type: 'showMarkAndText',
                    mark: 4,
                    text: 5
                }
            },
        ],
    },

    {
        id: 1,
        text_de: 'Lisa verlässt mit einem Lander das Raumschiff und landet in Sektor D5 auf der Sternenoberfläche.',
        text_en: 'Let\'s start with something simple: rotate and move the sectors.',
        marksToShow: [1],
        textsToHide: [0],
        textsToShow: [1, 2],
    },


    {
        id: 2,
        text_de: 'Um Karl ihre gelungene Landung mitzuteilen, versucht Lisa ihm ein Signal (blaue Geodäte) zu senden.',
        text_en: 'Join the sectors',
        geodesicsToShow: [0],
        geodesicsToComplete: [0],
    },


    {
        id: 3,
        text_de: '',
        text_en: 'Set sector 9 suitably.',
        checkBoxesWithText: [
            {
                text_de: 'Hilf Lisa ihren Sender richtig auszurichten. Wähle dazu zuerst die blaue Geodäte aus. Über den Kompass-Button kannst Du ihre Startrichtung ändern.',
                text_en: '2 and 3 &',
                type: 'tracker',
                condition: ['lineTouchesTwoMarks', ['chosenLineGlobalID', 0, 1, 2]],
            },
        ],
        imageToAdd: ['button_icons/direction.png', 0.5, 125]
    },


    {
        id: 4,
        text_de: 'Lisa erkundet mit einem Rover die Sternenoberfläche. Dabei sendet sie Karl kontinuierlich ein Signal.',
        text_en: 'first text',
        imageToAdd: ['media/ns_rover_0.png', 0.38, 85],
        marksToHide: [1],
        marksToShow: [2],
        textsToHide: [2],
        textsToShow: [3],
        geodesicsToDelete: [0],
        geodesicsToShow: [1],
        geodesicsToComplete: [1],
    },

    {
        id: 5,
        text_de: 'Lisa erkundet mit einem Rover die Sternenoberfläche. Dabei sendet sie Karl kontinuierlich ein Signal.',
        text_en: 'first text',
        imageToAdd: ['media/ns_rover_1.png', 0.38, 85],
        marksToHide: [2],
        marksToShow: [3],
        textsToHide: [3],
        textsToShow: [4],
        geodesicsToDelete: [1],
        geodesicsToShow: [2],
        geodesicsToComplete: [2],
    },

    {
        id: 6,
        text_de: 'Als Lisa eine bestimmte Position erreicht, kann Karl ihr Signal nicht mehr empfangen.',
        text_en: 'first text',
        geodesicsToDelete: [2],
        marksToHide: [3],
        textsToHide: [4],

    },

    {
        id: 7,
        text_de: '',
        text_en: 'first text',
        checkBoxesWithText: [
            {
                text_de: 'Bestimme durch die Konstruktion geeigneter Geodäten Lisas Position als Karl ihr Signal zuletzt empfangen konnte. \n \nTipp: Beginne deine Geodäte bei Karl.',
                text_en: '2 and 3 &',
                type: 'tracker',
                condition: ['lineTouchesTwoMarks', ['chosenLineGlobalID', 0, 4, 2]],
                result: {
                    type: 'showMarkAndText',
                    mark: 4,
                    text: 5
                }
            },
        ],
    },

    {
        id: 8,
        text_de: 'Lisa setzt ihre Erkundungsfahrt fort. Nach einiger Zeit erreicht Karl wieder ihr Signal.',
        text_en: 'first text',
        marksToHide: [4],
        textsToHide: [5],
    },


    {
        id: 9,
        text_de: '',
        text_en: 'first text',
        checkBoxesWithText: [
            {
                text_de: 'Bestimme Lisas Position als Karl ihr Signal zum ersten Mal wieder empfängt.',
                text_en: '2 and 3 &',
                condition: ['lineTouchesTwoMarks', ['chosenLineGlobalID', 0, 5, 2]],
                result: {
                    type: 'showMarkAndText',
                    mark: 5,
                    text: 6
                }
            },
        ],
    },

    {
        id: 10,
        text_de: 'Kehre wieder zum Kurs zurück.',
        text_en: 'first text',

    },
];


