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
        text_de: 'Konstruktion von Lichtstrahlen',
        text_en: 'Sectormodels',
        sectorsToShow: [],
        sectorsToHide: [],
        geodesicsToHide: [1],
        marksToHide: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },

    {
        id: 1,
        text_de: '',
        text_en: '',
        checkBoxesWithText: [
            {
                text_de: 'Vervollständige die Geodäte. Ziehe dazu den Punkt zur oberen Kante des oberen Sektors.',
                text_en: '2 and 3 &',
                type: 'tracker',
                condition: ['lineTouchesOneMark', ['chosenLineGlobalID', 0]],
            }
        ]
    },

    {
        id: 2,
        text_de: '',
        text_en: '',
        checkBoxesWithText: [
            {
                text_de: 'Setze die Geodäte im mittleren Sektor fort. Klicke dazu mit der Maus zunächst auf den\n' +
                    'Button „Zeichnen“ und dann an die entsprechende Stelle im zweiten Sektor. Jetzt kannst du\n' +
                    'die Geodäte zeichnen.\n',
                text_en: '',
                type: 'tracker',
                condition: ['lineTouchesTwoMarks', ['chosenLineGlobalID', 1, 2, 5]],
            }
        ]
    },

    {
        id: 3,
        text_de: '',
        text_en: '',
        checkBoxesWithText: [
            {
                text_de: 'Setze nun die Geodäte im dritten Sektor fort. Dabei gehst du genauso vor, wie im vorherigen Schritt.',
                text_en: '',
                type: 'tracker',
                condition: ['lineTouchesTwoMarks', ['chosenLineGlobalID', 3, 4, 5]],
            }
        ]
    },

    {
        id: 4,
        text_de: 'Im unteren Sektor wurde nun mit etwas zeitlichem Abstand ein zweites Lichtsignal\n' +
            'ausgesendet. Wir wollen uns nun anschauen, wie sich der Abstand verhält, wenn sich beide\n' +
            'Lichtstrahlen fortsetzen.',
        text_en: 'Set sector 9 suitably.',
        geodesicsToShow: [1],

    },

    {
        id: 5,
        text_de: '',
        text_en: 'Set sector 9 suitably.',

        checkBoxesWithText: [
            {
                text_de: 'Vervollständige dazu die Geodäte und gehe dabei genauso vor, wie bei der ersten Geodäte.',
                text_en: '',
                type: 'tracker',
                condition: ['lineTouchesTwoMarks', ['chosenLineGlobalID', 8, 9, 5]],
            }
        ]
    },

    {
        id: 6,
        text_de: 'Gut gemacht!',
        text_en: 'Join the sectors',
    },
];


