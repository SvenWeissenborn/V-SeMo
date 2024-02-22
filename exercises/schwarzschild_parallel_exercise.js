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
        text_de: 'Wir wollen eine neue Funktion von V-SeMo kennenlernen.',
        text_en: 'We want to learn about a new feature of ViSeMo.',

        geodesicsToHide: [0],
        marksToHide: [0, 1],
    },

    {
        id: 1,
        text_de: '',
        text_en: '',
        checkBoxesWithText: [
            {
                text_de: 'Tippe dazu einen Teil der blauen Linie oder ihren Endpunkt an.',
                text_en: 'Click on a part of the blue line or its end point.',
                type: 'tracker',
                condition: ['choseGeodesic'],
            },
        ]
    },

    {
        id: 2,
        text_de: 'Wenn Du eine Linie auswählst, erscheinen in der linken Werkzeugleiste weitere Buttons.',
        text_en: 'When you select a line, more buttons appear in the left toolbar.',
    },

    {
        id: 3,
        text_de: 'Du kannst die Konstruktion einer Geodäte beschleunigen, indem Du V-SeMo alle notwendigen Sektoren automatisch zusammensetzen lässt. Tippe dazu auf diesen Button:',
        text_en: 'You can speed up the construction of a geodesic by letting V-SeMo automatically assemble all necessary sectors. Click on this button to do so:',
        slideCondition: [['buttonPressed', 'set_sectors']],
        imageToAdd: ['button_icons/set_sectors.png', buttonfactor, 125],
    },

    {
        id: 2,
        text_de: '',
        text_en: '',
        checkBoxesWithText: [
            {
                text_de: 'Vervollständige jetzt die Linie als Geodäte.',
                text_en: 'Complete the line as a geodesic.',
                type: 'tracker',
                condition: ['lineTouchesOneMark', [1, 0]],
            },
        ]
    },

    {
        id: 4,
        text_de: '',
        text_en: '',

        geodesicsToShow: [0],

        checkBoxesWithText: [
            {
                text_de: 'Wiederhole dieses Vorgehen für die zweite Linie.',
                text_en: 'Repeat this process for the second line.',
                type: 'tracker',
                condition: ['lineTouchesOneMark', [0, 1]],
            },
        ]

    },

    {
        id: 3,
        text_de: 'Für einen besseren Überblick kannst Du die Sektoren wieder in ihre Ausgangsposition zurücksetzen. Tippe dazu auf diesen Button:',
        text_en: 'For a better overview you can reset the sectors to their initial position. Click on this button to do so:',
        slideCondition: [['buttonPressed', 'reset']],
        imageToAdd: ['button_icons/reset.png', buttonfactor, 125],
    },

    {
        id: 5,
        text_de: '',
        text_en: '',
        checkBoxesWithText: [
            {
                text_de: 'Finde eine Möglichkeit, die Richtungen der Enden beider Geodäten miteinander zu vergleichen.',
                text_en: 'Find a way to compare the directions of the ends of both geodesics.',
                type: 'tracker',
                condition: ['snappedSectors', [8, 11]],
            },
        ]
    },

    {
        id: 6,
        text_de: 'Gut gemacht!\nWenn Du die Richtung zweier Linienstücke miteinander vergleichen möchtest, musst Du ihre Sektoren zunächst zusammensetzen. Anders darfst Du ihre Richtung nicht miteinander vergleichen.',
        text_en: 'Well done!\nIf you want to compare the direction of two line segments, you have to put their sectors together first. Otherwise you can\'t compare their direction.',

    },

    {
        id: 6,
        text_de: 'Mit Hilfe des Geodreiecks kannst Du die Richtung genauer vergleichen. Probiere es aus!',
        text_en: 'With the help of the triangle you can compare the direction more accurately. Try it out!',

    },

    {
        id: 7,
        text_de: 'Kehre nun wieder zum Kurs zurück.',
        text_en: 'Now return to the course.',

    },


];


