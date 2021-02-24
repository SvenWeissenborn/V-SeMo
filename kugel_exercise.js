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
/* -------------------------------------*/

/*  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    Beachte, dass der erste SlideContent
    alle Sektoren, Geodaeten,Texte und
    Marks verstecken sollte, die nicht
    von Anfang an sichtbar sein sollen
*/


let slideContent = [
    {
        id: 0,
        text_de: 'Gemeinsam wollen wir uns mit dem Sektormodell vertraut machen.',
        text_en: 'Together we want to become familiar with the sector model.',
        sectorsToShow: [1, 2, 5,],
        sectorsToHide: [0, 3, 4, 6, 7, 8],
        geodesicsToHide: [0, 1],
        marksToHide: [0, 1, 2],
        textsToHide: [0, 1, 2],
    },

    {
        id: 1,
        text_de: 'Beginnen wir mit etwas einfachem: Drehe und Verschiebe die Sektoren.',
        text_en: 'Let\'s start with something simple: rotate and move the sectors.',
    },


    {
        id: 2,
        text_de: 'Setze die Sektoren',
        text_en: 'Join the sectors',
        checkBoxesWithText: [
            {
                text_de: '2 und 3 &',
                text_en: '2 and 3 &',
                condition: ['snappedSectors', [1, 2]]
            },

            {
                text_de: '3 und 6 zusammen.',
                text_en: '3 and 6.',
                condition: ['snappedSectors', [2, 5]]
            },
        ]
    },

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

];


