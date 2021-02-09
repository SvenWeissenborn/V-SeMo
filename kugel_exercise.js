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
        text: 'Willkommen zu der Vorstellung einer Tutorial-Funktion für ViSeMo.',
        sectorsToShow: [2, 5],
        sectorsToHide: [0, 1, 3, 4, 6, 7, 8],
        geodesicsToHide: [0, 1],
        marksToHide: [0, 1, 2, 3],
        textsToHide: [0, 1, 2, 3],
    },

    {
        id: 1,
        text: 'Hier änderte sich nun nur der Text',
    },


    {
        id: 3,
        text: 'Wir erweitern das Modell. Setze Sektor 2 an seinen passenden Nachbarn.',
        sectorsToShow: [1],
    },

    {
        id: 4,
        text: 'Nun fügen wir einen vierten Sektor unserem Modell hinzu. Lege auch ihn an.',
        sectorsToShow: [4],
    },

    {
        id: 5,
        text: 'Wir setzen mal die Sektoren 3 und 6 zusammen.',
        slideCondition: [['snappedSectors', [2, 5]]],
    },

    {
        id: 5,
        text: 'Daraufhin geht hier das Tutorial weiter.',
    },


    {
        id: 6,
        text: 'Hier ein Geodätenstück.',
        geodesicsToShow: [0],

    },

    {
        id: 6,
        text: 'Wir vervollständigen Sie. Natürlich nur über sichtbare Sektoren.',
        geodesicsToComplete: [0],
    },

    {
        id: 6,
        text: 'Setzen wir doch mal alle Sektoren entlang dieser Geodäte zusammen.',
        geodesicsToAutoSetAlong: [0],
    },

    {
        id: 7,
        text: 'Ändern wir doch mal die Snappanordnug.',
        sectorsToSnapTogether: [[5, 2], [4, 5]],
    },

    {
        id: 7,
        text: 'Hier erscheint mal ein Markierungspunkt mit einem Text ;-).',
        marksToShow: [0, 1, 2 , 3],
        textsToShow: [0, 1, 2 , 3],
    },

    {
        id: 7,
        text: 'Danke für die Aufmerksamkeit!',

    },

];


