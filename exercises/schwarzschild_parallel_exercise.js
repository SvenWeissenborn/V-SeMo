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
        text_de: 'Wir wollen eine neue Funktion von ViSeMo kennenlernen.',
        text_en: 'Let\'s start with something simple: rotate and move the sectors.',
    },

    {
        id: 1,
        text_de: '',
        text_en: '',
        checkBoxesWithText: [
            {
                text_de: 'Tippe dazu einen Teil oder den Endpunkt eines Geodätenstücks an.',
                text_en: '2 and 3 &',
                type: 'tracker',
                condition: ['choseGeodesic'],
            },
        ]
    },

    {
        id: 2,
        text_de: 'Wenn Du eine Geodäte auswählst, erscheinen in der linken Werkzeugleiste weitere Buttons. ',
        text_en: 'Let\'s start with something simple: rotate and move the sectors.',
    },

    {
        id: 3,
        text_de: 'Du kannst die Konstruktion einer Geodäte beschleunigen, indem Du ViSeMo alle notwendigen Sektoren automatisch zusammensetzen lässt. Tippe dazu auf diesen Button:',
        text_en: 'Let\'s start with something simple: rotate and move the sectors.',
        slideCondition: [['buttonPressed', 'set_sectors']],
        imageToAdd: ['button_icons/set_sectors.png', buttonfactor, 125],
    },

    {
        id: 4,
        text_de: 'Anschließend kannst Du die Geodäte wie bereits bekannt vervollständigen. Wiederhole dein Vorgehen mit der zweiten Geodäte.',
        text_en: 'Let\'s start with something simple: rotate and move the sectors.',

    },

    {
        id: 5,
        text_de: 'Finde eine Möglichkeit, die Richtung der beiden Geodätenenden miteinander zu vergleichen.',
        text_en: 'Let\'s start with something simple: rotate and move the sectors.',
        slideCondition: [['snappedSectors', [8, 11]]],
    },

    {
        id: 6,
        text_de: 'Gut gemacht!\nWenn Du die Richtung zweier Linienstücke miteinander vergleichen möchtest, musst Du ihre Sektoren zunächst zusammensetzen. Anders darfst Du ihre Richtung nicht miteinander vergleichen.',
        text_en: 'Let\'s start with something simple: rotate and move the sectors.',

    },

    {
        id: 7,
        text_de: 'Kehre nun wieder zum Kurs zurück.',
        text_en: 'Let\'s start with something simple: rotate and move the sectors.',

    },


];


