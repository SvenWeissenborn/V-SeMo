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
        text_de: 'Karl befindet sich in seinem Raumschiff (schwarze Weltlinie) weit von der Sternenoberfläche entfernt. Er hält mit Hilfe der Schubdüsen den Abstand zur Sternenoberfläche konstant.',
        text_en: 'Together we want to become familiar with the sector model.',
        geodesicsToHide: [1],
    },

    {
        id: 1,
        text_de: 'Er möchte Lisa ein Verpflegungspaket zukommen lassen. Dieses (blaue Linie) verlässt durch eine Schleuse das Raumschiff und befindet sich zunächst in Ruhe (Sektor X1).',
        text_en: 'Let\'s start with something simple: rotate and move the sectors.',
        geodesicsToShow: [1],

    },

    {
        id: 2,
        text_de: 'Vervollständige den Verlauf der Weltlinie automatisch.',
        text_en: 'Join the sectors',
        slideCondition: [['buttonPressed', 'autocomplete']],
        imageToAdd: ['button_icons/autocomplete.png', buttonfactor, 125],
    },

    {
        id: 3,
        text_de: 'Bestimme die Geschwindigkeit, mit der das Verpflegungspaket auf der Sternenoberfläche auftrifft.\n\nTipp: Erinnere Dich, wie man die Geschwindigkeit eines Objektes anhand dessen Weltlinie bestimmen kann. Solltest Du Dir unsicher sein, blättere etwas im Kurs zurück.',
        text_en: 'Join the sectors',

    },

];


