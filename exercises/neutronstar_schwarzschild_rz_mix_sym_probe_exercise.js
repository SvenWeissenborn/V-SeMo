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
        text_de: 'Nachdem unsere Astronauten Karl und Lisa viel über die Geometrie des Raumes um einen Neutronenstern herausgefunden haben, wurden sie beauftragt weitere Eigenschaften des Neutronensterns zu untersuchen.',
        text_en: 'Together we want to become familiar with the sector model.',
        geodesicsToHide: [0,1],
        marksToHide: [0],

    },

    {
        id: 0,
        text_de: 'Lisa setzt dazu ein unbeschleunigtes Testobjekt in Sektor P1 aus. Wir wollen uns seine Weltlinie genauer anschauen.',
        text_en: 'Together we want to become familiar with the sector model.',
        checkBoxesWithText: [
            {
                text_de: 'Vervollständige hierzu die Weltlinie des Objektes ohne die Verwendung der automatischen Vervollständigung.',
                text_en: 'Help Lisa orientate her transmitter correctly. First select the blue geodesic. Use the compass button to change her starting direction.',
                type: 'tracker',
                condition: ['lineTouchesOneMark', ['chosenLineGlobalID', 0]],
            }
        ]
    },

    {
        id: 0,
        text_de: 'Sehr gut gemacht! \nWelches Schicksal ereilt das Objekt?.',
        text_en: 'Together we want to become familiar with the sector model.',
        checkBoxesWithText: [
            {
                text_de: 'a) Es schlägt auf die Sternenoberfläche.',
                text_en: 'a) Floater 1',
                type: 'quiz',
                answerIs: true,
                result: {
                    type: 'showMarkAndText',
                    mark: 4,
                    text: 5
                }
            },
            {
                text_de: 'b) Es entfernt sich von der Sternenoberfläche.',
                text_en: 'b) Floater 2',
                type: 'quiz',
                answerIs: false,
                result: {
                    type: 'showMarkAndText',
                    mark: 4,
                    text: 5
                }
            },
        ],
    },

    {
        id: 0,
        text_de: 'Währenddessen befindet sich Karl in seinem Raumschiff (schwarze Weltlinie) weit von der Sternenoberfläche entfernt. Er hält mit Hilfe der Schubdüsen den Abstand zur Sternenoberfläche konstant.',
        text_en: 'Together we want to become familiar with the sector model.',
        geodesicsToShow: [0, 1],
        setZoomAndPanTo: [1.5, -4400, -8000]

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
        text_de: 'Bestimme die Geschwindigkeit, mit der das Verpflegungspaket auf der Sternenoberfläche auftrifft.\n\nTipp: Erinnere Dich, wie man die Geschwindigkeit eines Objektes anhand dessen Weltlinie bestimmen kann.',
        text_en: 'Join the sectors',
    },

];


