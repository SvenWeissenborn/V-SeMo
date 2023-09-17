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
        text_de: 'Willkommen in der online-Lernumgebung V-SeMo, in der Flächen auf ihre geometrischen Eigenschaften untersucht werden können. Klicke auf den Pfeil, um zu beginnen.',
        text_en: 'Vectortext',
    },

    {
        id: 1,
        text_de: 'Du siehst nun eine Fläche, welche durch 4 Sektoren (weiße Vierecke) dargestellt wird, welche frei beweglich und drehbar sind. Probiere es mal aus.',
        text_en: 'Vectortext 2',
    },

    {
        id: 2,
        text_de: 'Du siehst auf der linken Seite eine Reihe verschiedener Buttons. Erkunde gern einmal deren Funktion. Betätige erneute den Pfeil, wenn du jeden Button ausprobiert hast.',
        text_en: 'Vectortext 2',
    },

    {
        id: 3,
        text_de: 'Nutze nun den Vektor-Button, um einen Vektor innerhalb eines beliebigen Sektors zu zeichnen.',
        text_en: 'Vectortext 2',
    },

    {
        id: 4,
        text_de: 'Auch hier kannst du nun die einzelnen Funktionen des Vektors ausprobieren. Was kannst du mit dem Vektor anstellen? Hinweis: Es gibt 3 grundlegende Funktionen.',
        text_en: 'Vectortext 2',
    },

    {
        id: 5,
        text_de: 'Nutze nun den Button, welcher in der Nähe des Fußpunktes erscheint, sobald du den Fußpunkt des Vektors klickst, um einen Schatten zu erzeugen.',
        text_en: 'Vectortext 2',
    },

    {
        id: 6,
        text_de: 'Du solltest jetzt den Schatten als graues Duplikat deines gezeichneten Vektors sehen. Versuche nun, den Fußpunkt des Vektors in ein angrenzendes Viereck zu verschieben. Dazu musst du zunächst die Lücke zwischen beiden Vierecken schließen.',
        text_en: 'Vectortext 2',
    },

    {
        id: 7,
        text_de: 'Wenn sich der Fußpunkt deines Vektors in einem anderen Viereck befindet, wiederhole dieses Vorgehen, bis du den Vektor einmal durch alle Vierecke bewegt hast, sodass er wieder im selben Viereck ist, indem sich auch sein Schatten befindet.',
        text_en: 'Vectortext 2',
    },

    {
        id: 8,
        text_de: 'Versuche nun deinen Vektor mit seinem ursprünglichen Schatten zu vergleichen. Was kannst du feststellen?',
        text_en: 'Vectortext 2',
    },
];


