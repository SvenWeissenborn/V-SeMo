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
        text_de: 'Wir wollen einen Startstrich als Geodäte über das Sektormodell hinweg verlängern.',
        text_en: 'Together we want to become familiar with the sector model.',
        geodesicsToHide: [1],
    },

    {
        id: 1,
        text_de: 'Dazu setzen wir zunächst alle Sektoren zusammen, durch die unsere Geodäte verlaufen wird.',
        text_en: 'Together we want to become familiar with the sector model.',
        geodesicsToAutoSetAlong: [0],

    },

    {
        id: 2,
        text_de: 'Anschließend vervollständigen wir die Geodäte über das gesamte Modell.\n Die Geodäte hält an jedem Punkt ihre Richtung bei.',
        text_en: 'Together we want to become familiar with the sector model.',
        geodesicsToComplete: [0]
    },

    {
        id: 2,
        text_de: 'In der symmetrischen Anordnung kann es den Eindruck machen, dass der Verlauf der Geodäten gekrümmt ist.',
        text_en: 'Together we want to become familiar with the sector model.',
        sectorsToSetToOrigin: true
    },

    {
        id: 2,
        text_de: 'Die zusammenhängende Anordnung der Sektoren widerlegt dies eindeutig. Die Geodäte verläuft gerade.',
        text_en: 'Together we want to become familiar with the sector model.',
        geodesicsToAutoSetAlong: [0]
    },

    {
        id: 2,
        text_de: 'Die Täuschung des gekrümmten Verlaufs liegt nur an der Anordnung der Sektoren.',
        text_en: 'Together we want to become familiar with the sector model.',
        sectorsToSetToOrigin: true
    },

    {
        id: 2,
        text_de: 'Nun wollen wir eine zweite Geodäte vom selben Punkt aus in eine andere Richtung starten lassen',
        text_en: 'Together we want to become familiar with the sector model.',
        geodesicsToShow: [1],
    },

    {
        id: 2,
        text_de: 'Dazu setzen wir die Sektoren zunächst zusammen...',
        text_en: 'Together we want to become familiar with the sector model.',
        geodesicsToAutoSetAlong: [1]
    },

    {
        id: 2,
        text_de: 'und vervollständigen die Linie als Geodäte über das Sektormodell hinweg.',
        text_en: 'Together we want to become familiar with the sector model.',
        geodesicsToComplete: [1]
    },

    {
        id: 2,
        text_de: 'In der symmetrischen Anordnung der Sektoren kann man deutlich erkennen, dass sich die Geodäten hinter dem Schwarzen Loch treffen.',
        text_en: 'Together we want to become familiar with the sector model.',
        sectorsToSetToOrigin: true
    },

    {
        id: 2,
        text_de: 'Owohl beide Geodäten...',
        text_en: 'Together we want to become familiar with the sector model.',
        geodesicsToAutoSetAlong: [0]
    },

    {
        id: 2,
        text_de: 'eindeutig gerade verlaufen...',
        text_en: 'Together we want to become familiar with the sector model.',
        sectorsToSetToOrigin: true,
        geodesicsToAutoSetAlong: [1]
    },

    {
        id: 2,
        text_de: 'bildet sich ein sogenanntes Zweieck.',
        text_en: 'Together we want to become familiar with the sector model.',
        sectorsToSetToOrigin: true,
    },
];


