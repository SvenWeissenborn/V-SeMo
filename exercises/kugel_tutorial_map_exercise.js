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
        text_de: 'Gemeinsam wollen wir uns genauer mit dem Sektormodell beschäftigen. Klicke auf den Pfeil, um zu beginnen.',
        text_en: 'Together, let\'s take a closer look at the sector model. Click on the arrow to get started.',
        sectorsToShow: [4],
        sectorsToHide: [0, 1, 2, 3, 5, 6, 7, 8],
        marksToHide: [0, 1, 2, 3, 4],
        textsToHide: [0, 1, 2, 3, 4],
    },

    {
        id: 1,
        text_de: 'Die Sektoren des Sektormodells ähneln kleinen Papierstücken. Sie lassen sich frei bewegen und verdrehen. Probiere es mal.',
        text_en: 'Together, let\'s take a closer look at the sector model. Click on the arrow to get started.',

    },

    {
        id: 2,
        text_de: 'Wir beginnen mit einer Städtereise, welche in Rom startet. Zeichne eine erste Route von Rom nach Kopenhagen ein. Klicke anschließend wieder auf den Pfeil',
        text_en: 'We start with a city trip, which starts in Rome. Draw a first route from Rome to Copenhagen.',
        marksToShow: [3, 4],
        textsToShow: [3, 4],

    },


    {
        id: 3,
        text_de: 'Von Kopenhagen geht es weiter nach Helsinki. Zeichne auch diese Route ein.',
        text_en: 'From Copenhagen we continue to Helsinki. Draw this route as well.',
        sectorsToShow: [3],
        marksToShow: [2],
        textsToShow: [2],

    },

    {
        id: 4,
        text_de: 'Nun wollen wir unsere Reise nach Reykjavik auf Island fortsetzen.',
        text_en: 'Now we want to continue our journey to Reykjavik in Iceland.',
        sectorsToShow: [0],
        marksToShow: [0],
        textsToShow: [0],
    },

    {
        id: 5,
        text_de: 'Die letzte Station ist die irische Stadt Dublin.',
        text_en: 'The last stop is the Irish city of Dublin.',
        sectorsToShow: [1],
        marksToShow: [1],
        textsToShow: [1],
    },

    {
        id: 6,
        text_de: 'Nach unserer letzten Station wollen wir mit dem Flugzeug die kürzeste Route zurück nach Rom nehmen.',
        text_en: 'After our last stop, we want to take the shortest route back to Rome by plane.',
    },

    {
        id: 7,
        text_de: 'Kehre wieder zum Kurs zurück.',
        text_en: 'Return back to the course.',
    },
];
