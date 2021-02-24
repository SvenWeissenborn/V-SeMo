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
        text: 'Gemeinsam wollen wir uns mit dem Sektormodell vertraut machen.',
        sectorsToShow: [1, 2, 5,],
        sectorsToHide: [0, 3, 4, 6, 7, 8],
        geodesicsToHide: [0, 1],
        marksToHide: [0, 1, 2],
        textsToHide: [0, 1, 2],
    },

    {
        id: 1,
        text: 'Beginnen wir mit etwas einfachem: Drehe und Verschiebe die Sektoren.',
    },


    {
        id: 2,
        text: 'Setze die Sektoren',
        checkBoxesWithText: [
            {
                text: '2 und 3 &',
                condition: ['snappedSectors', [1, 2]]
            },

            {
                text: '3 und 6 zusammen',
                condition: ['snappedSectors', [2, 5]]
            },
        ]
    },

    {
        id: 3,
        text: 'Setze Sektor 9 passend an.',
        sectorsToShow: [8],
        slideCondition: [['snappedSectors', [2, 5]], ['snappedSectors', [5, 8]]],
    },

    {
        id: 4,
        text: 'Zeichne eine Linie, die die Punkte M1 und M3 verbindet.',
        marksToShow: [0, 2],
        textsToShow: [0, 2],
        checkBoxesWithText: [
            {
                text: 'erster Text',
                condition: ['snappedSectors', [1, 2]]
            },

            {
                text: 'zweiter Text',
                condition: ['snappedSectors', [2, 5]]
            },
        ]
    },

    {
        id: 5,
        text: 'Setze die Sektoren 5 und 4 passend an.',
        sectorsToShow: [3, 4],
        marksToShow: [1],
        textsToShow: [1],
    },

    {
        id: 6,
        text: 'Setze die Linie von Punkt M3 zu M2 auf dem kürzesten Weg fort. Was fällt Dir auf?',

    },

    {
        id: 7,
        text: 'Entferne das zuletzt gezeichnete Linienstück über den Rückgängig-Button.',
    },

    {
        id: 8,
        text: 'Hier sind die noch notwendigen Sektoren. Verbinde nun die Punkte M3 und M2 auf dem kürzesten Weg miteinander.',
        sectorsToShow: [0, 1, 6, 7 ],
    },

    {
        id: 9,
        text: 'Setze die Linie von M2 zu M1 fort.',
    },

    {
        id: 10,
        text: 'Welches geometrische Objekt hast Du soeben auf dem Sektormodell konstruiert?',
    },

    {
        id: 11,
        text: 'Bestimme mit Hilfe des Geodreiecks die Innenwinkelsumme des Dreiecks auf dem Sektormodell. Was fällt Dir auf?',
    },

    {
        id: 11,
        text: 'Kehre wieder zum Kurs zurück.',
    },

];


