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
        sectorsToHide: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    },

    {
        id: 1,
        text_de: 'Du siehst nun eine Fläche, welche durch 4 Sektoren dargestellt wird, welche frei beweglich und drehbar sind. Probiere es mal aus.',
        text_en: 'Vectortext 2',
        sectorsToShow: [0, 1, 3, 4],
    },

    {
        id: 2,
        text_de: 'Zeichne auf einen dieser Sektoren einen Zeiger, welcher auch als Vektor bezeichnet wird. Klicke anschließend wieder auf den Pfeil,' +
            'um fortzufahren.',
        text_en: 'Vectortext 2',
    },

    {
        id: 3,
        text_de: 'Du kannst den gezeichneten Zeiger (Vektor) an seinem Fußpunkt verschieben. Probiere es mal.',
        text_en: 'Vectortext 2',
    },

    {
        id: 4,
        text_de: 'Es ist auch möglich, den Vektor an seiner Spitze zu greifen, um seine Richtung und Länge zu verändern. Teste es einmal.',
        text_en: 'Vectortext 2',
    },

    {
        id: 5,
        text_de: 'Sobald du den Fußpunkt des Vektors klickst, erscheint in seiner Nähe ein Button. Wenn du diesen betätigst, hinterlässt der Vektor einen Schatten, um seine vorherige Position, Ausrichtung und Länge' +
            'anzuzeigen. Erzeuge nun einen Schatten deines gezeichneten Vektors.',
        text_en: 'Vectortext 2',
    },

    {
        id: 6,
        text_de: 'Deine Aufgabe ist es nun, den Vektor am Fußpunkt einmal in einen angrenzenden Sektor zu bewegen, ohne dabei seine Richtung an der Vektorspitze zu verändern.',
        text_en: 'Vectortext 2',
    },

    {
        id: 7,
        text_de: 'Vom neuen Sektor kannst du ihn weiter in den nächsten Sektor verschieben. Wiederhole dieses Vorgehen, bis du wieder im Ausgangssektor, welcher den Vektorschatten beinhaltet, angekommen bist.' +
            'Merke dir dabei, ob den Vektor im oder gegen den Uhrzeigersinn bewegst.',
        text_en: 'Vectortext 2',
    },

    {
        id: 8,
        text_de: 'Vergleiche nun den Vektor mit seinem Schatten. Was kannst du feststellen?',
        text_en: 'Vectortext 2',
    },
];


