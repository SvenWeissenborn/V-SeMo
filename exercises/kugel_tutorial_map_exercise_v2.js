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
// startToRemoveAllLines: true; um alle Geoda eten zu loeschen. Beachte, dass die History geleert wird
// geodesicsToAutoSetAlong: [GeodaeteID 1, GeodaeteID 2, ...], Array der Geodaeten, entlang derer die Sektoren zusammengesetzt werden sollen
// sectorsToSnapTogether: [[SektorIDToSnap, SektorIDZielsektor], [SektorIDToSnap, SektorIDZielsektor], ...],
// -> Array der Snappartner. Erster Eintrag gilt dem zu bewegenden Sektor der an den Zielsektor sngesnappt wird
// slideCondition: [['snappedSectors', [2, 5]]],
//textIfSlideConditionIsNotFulfilled: 'Du hast Sektor 5 noch nicht richtig angelegt!'

/* bedingte Checkboxes:
    checkBoxesWithText: [
        {
            text_de: '2 und 3 &',
            text_en: '2 and 3 &',
            condition: ['snappedSectors', [1, 2]]
        },
    ]
 */

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
        text_de: 'Willkommen zur Vorstellung von ViSeMo. Klicke auf den Pfeil, um zu beginnen.',
        text_en: 'Together we want to become familiar with the sector model.',
        sectorsToShow: [4],
        sectorsToHide: [0, 1, 2, 3, 5, 6, 7, 8],
        marksToHide: [0, 1, 2, 3, 4, 5, 6],
        textsToHide: [0, 1, 2, 3, 4, 5, 6],
    },

    {
        id: 1,
        text_de: 'Die Sektoren des Sektormodells ähneln kleinen Papierschnippseln. Sie lassen sich frei bewegen. Probiere es mal.',
        text_en: 'Let\'s start with something simple: rotate and move the sectors.',
    },

    {
        id: 2,
        text_de: 'Du kannst jeden Sektor auch drehen. Teste es mal.',
        text_en: 'Let\'s start with something simple: rotate and move the sectors.',
    },

    {
        id: 2,
        text_de: 'Tipp:\nDu kannst entweder mit zwei Fingern auf deinem Tablet oder mit Hilfe des Mausrades in die Arbeitsfläche hinein- oder herauszoomen.',
        text_en: 'Let\'s start with something simple: rotate and move the sectors.',
    },


    {
        id: 3,
        text_de: '',
        text_en: 'Let\'s start with something simple: rotate and move the sectors.',
        marksToShow: [4, 5],
        textsToShow: [4, 5],

        checkBoxesWithText: [
            {
                text_de: 'Wir beginnen mit einer Städtereise, welche in Rom startet. Zeichne eine erste Route von Rom nach Kopenhagen ein.',
                text_en: 'Help Lisa orientate her transmitter correctly. First select the blue geodesic. Use the compass button to change her starting direction.',
                type: 'tracker',
                condition: ['lineCrossTwoMarks', ['chosenLineGlobalID', 4, 5]],
            },
        ],

    },

    {
        id: 4,
        text_de: '',
        text_en: 'Join the sectors',
        sectorsToShow: [1],
        marksToShow: [1],
        textsToShow: [1],

        checkBoxesWithText: [
            {
                text_de: 'Von Kopenhagen geht es weiter nach Dublin. Zeichne auch diese Route ein.',
                text_en: 'Help Lisa orientate her transmitter correctly. First select the blue geodesic. Use the compass button to change her starting direction.',
                type: 'tracker',
                condition: ['lineCrossTwoMarks', ['chosenLineGlobalID', 5, 1]],
            },
        ],

    },

    {
        id: 5,
        text_de: '',
        text_en: '',
        sectorsToShow: [2],
        marksToShow: [2],
        textsToShow: [2],

        checkBoxesWithText: [
            {
                text_de: 'Nun wollen wir unsere Reise nach Casablanca in Marokko fortsetzen.',
                text_en: 'Help Lisa orientate her transmitter correctly. First select the blue geodesic. Use the compass button to change her starting direction.',
                type: 'tracker',
                condition: ['lineCrossTwoMarks', ['chosenLineGlobalID', 1, 2]],
            },
        ],
    },

    {
        id: 6,
        text_de: '',
        text_en: 'Draw a line connecting the points M1 and M3.',
        sectorsToShow: [5],
        marksToShow: [6],
        textsToShow: [6],

        checkBoxesWithText: [
            {
                text_de: 'Die letzte Station ist die tunesische Hauptstadt Tunis.',
                text_en: 'Help Lisa orientate her transmitter correctly. First select the blue geodesic. Use the compass button to change her starting direction.',
                type: 'tracker',
                condition: ['lineCrossTwoMarks', ['chosenLineGlobalID', 2, 6]],
            },
        ],
    },

    {
        id: 7,
        text_de: '',
        text_en: 'first text',

        checkBoxesWithText: [
            {
                text_de: 'Nach unserer letzten Station wollen wir mit dem Flugzeug die kürzeste Route zurück nach Rom nehmen.',
                text_en: 'Help Lisa orientate her transmitter correctly. First select the blue geodesic. Use the compass button to change her starting direction.',
                type: 'tracker',
                condition: ['lineCrossTwoMarks', ['chosenLineGlobalID', 6, 4]],
            },
        ],
    },

    {
        id: 8,
        text_de: 'Kehre wieder zum Kurs zurück.',
        text_en: 'first text',

    },

];
