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
        text: 'Willkommen zu der Vorstellung von ViSeMo.',
        sectorsToShow: [2, 5],
        sectorsToHide: [0, 1, 3, 4, 6, 7, 8],
        marksToHide: [0, 1],
        textsToHide: [0, 1],
    },

    {
        id: 1,
        text: 'Probiere die Funktionen Verschieben und Drehen der Sektoren aus, welche du im Video bereits gesehen hast.',
    },


    {
        id: 2,
        text: 'Setze die beiden Sektoren an den passenden Kanten zusammen, sodass sie aneinander snappen.',
        slideCondition: [['snappedSectors', [2, 5]]],
    },

    {
        id: 3,
        text: 'Zeichne eine Geodäte auf einen der Sektoren und lösche sie anschließend wieder.',
    },

    {
        id: 4,
        text: 'Zeichne eine Geodäte, welche über beide Sektoren verläuft.',
    },

    {
        id: 5,
        text: 'Ziehe die Sektoren wieder auseinander und versuche nun eine Geodäte über die Lücke von einem in den anderen Sektor zu zeichnen.',
        startToRemoveAllLines: true,
    },

    {
        id: 6,
        text: 'Setze die Sektoren auf verschiedene Weisen zusammen, sodass unterschiedliche Sektoren miteinander snappen bzw. Lücken bilden.',
        sectorsToShow: [1, 4],

    },

    {
        id: 7,
        text: 'Zeichne eine Geodäte, die diagonal über das Sektormodell verläuft.',
    },

    {
        id: 8,
        text: 'Zeichne eine Geodäte von P1 in Sektor 3 zu P2 in Sektor 7.',
        sectorsToShow: [0, 3, 6, 7, 8],
        marksToShow: [0 ,1],
        textsToShow: [0, 1],
    },

];


