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
        id: 1,
        text_de: 'Geodäten in diesem Modell',
        text_en: 'Let\'s start with something simple: rotate and move the sectors.',
        marksToHide: [0, 1, 2, 3,],

        checkBoxesWithText: [
            {
                text_de: 'Vervollständige die Geodäte bis zum Rand des Sektors.',
                text_en: '2 and 3 &',
                type: 'tracker',
                condition: ['lineTouchesOneMark', ['chosenLineGlobalID', 0]],
            }
        ]
    },

    {
        id: 0,
        text_de: 'Klicke den Sektor (A2) an. Mit Hilfe des Schiebereglers kannst du ihn lorentztransformieren.',
        text_en: 'Together we want to become familiar with the sector model.',

        checkBoxesWithText: [
            {
                text_de: 'Lege Sektor A2 an Sektor A1 an. Verwende den Schieberegler, um ihn ausreichend zu transformieren.',
                text_en: '6 and 7 &',
                type: 'tracker',
                condition: ['snappedSectors', [5, 6]]
            },


        ]
    },

    {
        id: 2,
        text_de: 'Gut gemacht.',
        text_en: 'Join the sectors',
        checkBoxesWithText: [
            {
                text_de: 'Setze die Geodäte wieder bis zum Rand des Sektors fort.',
                text_en: '2 and 3 &',
                type: 'tracker',
                condition: ['lineTouchesOneMark', ['chosenLineGlobalID', 1]],
            }
        ]
    },

    {
        id: 2,
        text_de: 'Setze nun die Geodäte in Sektor A3 fort: und ',
        text_en: 'Join the sectors',
        checkBoxesWithText: [
            {
                text_de: 'Transformiere dazu zuerst Sektor A3 und lege ihn bündig an Sektor A2.',
                text_en: '2 and 3 &',
                type: 'tracker',
                condition: ['snappedSectors', [4, 5]]
            },
            {
                text_de: 'Zeichne dann die Geodäte wieder bis zum Rand des Sektors.',
                text_en: '2 and 3 &',
                type: 'tracker',
                condition: ['lineTouchesOneMark', ['chosenLineGlobalID', 2]],
            }
        ]
    },

    {
        id: 3,
        text_de: 'Du kannst die Konstruktion einer Geodäte beschleunigen, indem Du V-SeMo alle notwendigen Sektoren automatisch zusammensetzen lässt. Tippe dazu auf Koodinieren:',
        text_en: 'You can speed up the construction of a geodesic by letting V-SeMo automatically assemble all necessary sectors. Click on this button to do so:',
        slideCondition: [['buttonPressed', 'set_sectors']],
        imageToAdd: ['button_icons/set_sectors.png', buttonfactor, 125],
    },

    {
        id: 4,
        text_de: '',
        text_en: '',
        checkBoxesWithText: [
            {
                text_de: 'Vervollständige die Geodäte bis zum Rand des Sektormodells.',
                text_en: '',
                type: 'tracker',
                condition: ['lineTouchesOneMark', ['chosenLineGlobalID', 3]],
            },
        ]
    },

    {
        id: 3,
        text_de: 'Setze die Sektoren wieder in ihre Ausgangsposition zurück:',
        text_en: 'You can speed up the construction of a geodesic by letting V-SeMo automatically assemble all necessary sectors. Click on this button to do so:',
        slideCondition: [['buttonPressed', 'reset']],
        imageToAdd: ['button_icons/reset.png', buttonfactor, 125],
    },

    {
        id: 6,
        text_de: 'Gut gemacht!',
        text_en: 'first text',

    },

];


