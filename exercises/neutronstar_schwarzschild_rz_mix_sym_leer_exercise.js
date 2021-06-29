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
        text_de: 'Gemeinsam wollen wir uns mit dem Raumzeitsektormodell des Neutronensterns vertraut machen.',
        text_en: 'Together we want to become familiar with the sector model.',
        //sectorsToHide: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 140, 141, 142, 143, 144, 150, 151, 152, 153, 154, 160, 161, 162, 163, 164, 170, 171, 172, 173, 174, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, ],
        geodesicsToHide: [0],
    },

    {
        id: 0,
        text_de: 'Zur besseren Übersicht sind die Raumzeitsektoren des Neutronensterns grau eingefärbt.',
        text_en: 'Together we want to become familiar with the sector model.',
    },

    {
        id: 1,
        text_de: 'Eben hast Du erfahren, dass ein Raumzeitsektor nicht gedreht werden darf. Um dennoch zwei Sektoren zusammensetzen zu können, muss man sie transformieren.',
        text_en: 'Let\'s start with something simple: rotate and move the sectors.',
    },

    {
        id: 2,
        text_de: 'Jeder Sektor hat einen eigenen Schieberegler, mit dem Du ihn transformieren kannst. Probiere es doch mal mit Sektor P2',
        text_en: 'Let\'s start with something simple: rotate and move the sectors.',
    },

    {
        id: 2,
        text_de: 'Transformiere Sektor P2 so, dass Du ihn an Sektor P1 ansetzen kannst.',
        text_en: 'Join the sectors',
        checkBoxesWithText: [
            {
                text_de: 'Setze die Sektoren P1 und P2 zusammen.',
                text_en: '2 and 3 &',
                type: 'tracker',
                condition: ['snappedSectors', [158, 159]]
            },


        ]
    },

    {
        id: 2,
        text_de: 'Verlängere das in P1 erschienene Linienstück als Geodäte bis zum oberen Rand von P2.',
        text_en: 'Join the sectors',
        geodesicsToShow: [0],
    },

    {
        id: 2,
        text_de: 'Transformiertst Du einen Sektor, werden alle darauf befindlichen Linien mittransformiert. Probiere es ruhig aus.',
        text_en: 'Join the sectors',
        geodesicsToShow: [0],
    },

    {
        id: 2,
        text_de: 'Setze die begonnene Geodäte bis zum Rand des Sektors P4 fort.',
        text_en: 'Join the sectors',
        geodesicsToShow: [0],
    },

    {
        id: 2,
        text_de: 'Setze die Sektoren auf ihre ursprüngliche Position und Form zurück.',
        text_en: 'Join the sectors',
        imageToAdd: ['button_icons/reset.png', buttonfactor, 125],
    },

    /*
    {
        id: 3,
        text_de: 'Setze Sektor 9 passend an.',
        text_en: 'Set sector 9 suitably.',
        sectorsToShow: [8],
        slideCondition: [['snappedSectors', [2, 5]], ['snappedSectors', [5, 8]]],
    },

    {
        id: 4,
        text_de: 'Zeichne eine Linie, die die Punkte M1 und M3 verbindet.',
        text_en: 'Draw a line connecting the points M1 and M3.',
        marksToShow: [0, 2],
        textsToShow: [0, 2],
        checkBoxesWithText: [
            {
                text_de: 'erster Text',
                text_en: 'first text',
                condition: ['snappedSectors', [1, 2]]
            },

            {
                text_de: 'zweiter Text',
                text_en: 'second text',
                condition: ['snappedSectors', [2, 5]]
            },
        ]
    },

    {
        id: 5,
        text_de: 'Setze die Sektoren 5 und 4 passend an.',
        text_en: 'first text',
        sectorsToShow: [3, 4],
        marksToShow: [1],
        textsToShow: [1],
    },

    {
        id: 6,
        text_de: 'Setze die Linie von Punkt M3 zu M2 auf dem kürzesten Weg fort. Was fällt Dir auf?',
        text_en: 'first text',

    },

    {
        id: 7,
        text_de: 'Entferne das zuletzt gezeichnete Linienstück über den Rückgängig-Button.',
        text_en: 'first text',
    },

    {
        id: 8,
        text_de: 'Hier sind die noch notwendigen Sektoren. Verbinde nun die Punkte M3 und M2 auf dem kürzesten Weg miteinander.',
        text_en: 'first text',
        sectorsToShow: [0, 1, 6, 7 ],
    },

    {
        id: 9,
        text_de: 'Setze die Linie von M2 zu M1 fort.',
        text_en: 'first text',
    },

    {
        id: 10,
        text_de: 'Welches geometrische Objekt hast Du soeben auf dem Sektormodell konstruiert?',
        text_en: 'first text',
    },

    {
        id: 11,
        text_de: 'Bestimme mit Hilfe des Geodreiecks die Innenwinkelsumme des Dreiecks auf dem Sektormodell. Was fällt Dir auf?',
        text_en: 'first text',
    },

    {
        id: 11,
        text_de: 'Kehre wieder zum Kurs zurück.',
        text_en: 'first text',
    },

    */

];


