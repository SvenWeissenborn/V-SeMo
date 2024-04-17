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
                text_de: ' Transformiere dazu zuerst Sektor A3 und lege ihn bündig an Sektor A2.',
                text_en: '2 and 3 &',
                type: 'tracker',
                condition: ['snappedSectors', [4, 5]]
            },
            {
                text_de: ' Zeichne dann die Geodäte wieder bis zum Rand des Sektors.',
                text_en: '2 and 3 &',
                type: 'tracker',
                condition: ['lineTouchesOneMark', ['chosenLineGlobalID', 2]],
            }
        ]
    },

    {
        id: 3,
        text_de: 'Du kannst die Konstruktion einer Geodäte beschleunigen, indem Du V-SeMo alle notwendigen Sektoren automatisch zusammensetzen lässt. Tippe dazu auf den Koodinieren-Button:',
        text_en: 'You can speed up the construction of a geodesic by letting V-SeMo automatically assemble all necessary sectors. Click on this button to do so:',
        slideCondition: [['buttonPressed', 'set_sectors']],
        imageToAdd: ['button_icons/set_sectors.png', buttonfactor, 125],
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


