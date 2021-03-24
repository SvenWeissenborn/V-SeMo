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


let slideContent = [
    {
        id: 0,
        text_de: 'Karl und Lisa sind in Sektor K4 am Neutronenstern angekommen.',
        text_en: 'Together we want to become familiar with the sector model.',
        geodesicsToHide: [0],
        marksToHide: [1, 2, 3,],
        textsToHide: [1, 2, 3, 4],
    },

    {
        id: 1,
        text_de: 'Lisa verlässt mit einem Lander das Raumschiff und landet in Sektor D5 auf der Sternenoberfläche.',
        text_en: 'Let\'s start with something simple: rotate and move the sectors.',
        marksToShow: [0, 1],
        textsToHide: [0],
        textsToShow: [1, 2],
    },


    {
        id: 2,
        text_de: 'Um Karl ihre gelungene Landung mitzuteilen, versucht Lisa ihm ein Signal (blaue Geodäte) zu senden.',
        text_en: 'Join the sectors',
        geodesicsToShow: [0],
        geodesicsToComplete: [0],
    },

    {
        id: 3,
        text_de: 'Hilf Lisa ihren Sender richtig auszurichten. Wähle dazu zuerst die blaue Geodäte aus und ändere anschließend ihre Startrichtung.',
        text_en: 'Set sector 9 suitably.',
        imageToAdd: ['button_icons/direction.png', 0.5, 125]

    },

    {
        id: 4,
        text_de: 'Bestimme den Winkel zur Sternenoberfläche, in dem Lisa ihren Sender ausrichten muss, damit Karl das Signal empfangen kann. ',
        text_en: 'Draw a line connecting the points M1 and M3.',

    },

    {
        id: 5,
        text_de: 'Kehre wieder zum Kurs zurück.',
        text_en: 'first text',

    },



];


