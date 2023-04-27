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
let turnBackwardOff = false;

let slideContent = [
    {
        id: 0,
        text_de: 'Äußerster Ring',
        text_en: 'Complete the two starting lines as geodesics to the edge of the sector model.\n \nConsider:\n1. How does a geodesic run within a sector?\n2. What do you have to do to continue a geodesic in the next sector?',
        sectorsToHide: [0, 1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 18, 20, 21, 22, 23, 25, 26, 27, 28, 30, 31, 32, 33, 35, 36, 37, 38, 40, 41, 42, 43, 45, 46, 47,48, 50, 51, 52, 53, 55, 56, 57, 58 ],
        marksToHide: [1, 2, 4, 5, 7, 8, 10, 11],
        sectorsSetToRingsOnR:
            {
                ringsToSetStart: 4,
                ringsToSetEnd: 4,
                numberOfSectorsPerRing: 12,
                numberOfRings: 5

            },
        setLineColor: ['yellow'],
        /*slideCondition: [
            ['AnyLineTouchsTwoMarks', {mark1: 0, mark2: 3}],
            ['AnyLineTouchsTwoMarks', {mark1: 3, mark2: 6}],
            ['AnyLineTouchsTwoMarks', {mark1: 6, mark2: 9}],
            ['AnyLineTouchsTwoMarks', {mark1: 9, mark2: 0}]
        ],*/


    },

    {
        id: 2,
        text_de: 'zwei Ringe',
        text_en: 'Complete the two starting lines as geodesics to the edge of the sector model.\n \nConsider:\n1. How does a geodesic run within a sector?\n2. What do you have to do to continue a geodesic in the next sector?',
        sectorsToHide: [0, 1, 2, 5, 6, 7, 10, 11, 12, 15, 16, 17, 20, 21, 22, 25, 26, 27, 30, 31, 32, 35, 36, 37, 40, 41, 42, 45, 46, 47, 50, 51, 52, 55, 56, 57,],
        sectorsToShow: [3, 8, 13, 18, 23, 28, 33, 38, 43, 48, 53, 58],
        sectorsSetToRingsOnR:
            {
                ringsToSetStart: 3,
                ringsToSetEnd: 4,
                numberOfSectorsPerRing: 12,
                numberOfRings: 5

            },
        deactivateAllDragPoints: true,
    },

    {
        id: 2,
        text_de: 'drei Ringe',
        text_en: 'Complete the two starting lines as geodesics to the edge of the sector model.\n \nConsider:\n1. How does a geodesic run within a sector?\n2. What do you have to do to continue a geodesic in the next sector?',
        sectorsToHide: [0, 1, 5, 6, 10, 11, 15, 16, 20, 21, 25, 26, 30, 31, 35, 36, 40, 41, 45, 46, 50, 51, 55, 56,],
        sectorsToShow: [2, 7, 12, 17, 22, 27, 32, 37, 42, 47, 52, 57],
        marksToShow: [1, 4, 7, 10],
        sectorsSetToRingsOnR:
            {
                ringsToSetStart: 2,
                ringsToSetEnd: 4,
                numberOfSectorsPerRing: 12,
                numberOfRings: 5

            },
        setLineColor: ['green']

    },

    {
        id: 4,
        text_de: 'Rote',
        text_en: 'Complete the two starting lines as geodesics to the edge of the sector model.\n \nConsider:\n1. How does a geodesic run within a sector?\n2. What do you have to do to continue a geodesic in the next sector?',
        setLineColor: ['red'],
        deactivateAllDragPoints: true,

    },

    {
        id: 5,
        text_de: 'vier Ringe',
        text_en: 'Complete the two starting lines as geodesics to the edge of the sector model.\n \nConsider:\n1. How does a geodesic run within a sector?\n2. What do you have to do to continue a geodesic in the next sector?',
        sectorsToHide: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55,],
        sectorsToShow: [1, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56],
        sectorsSetToRingsOnR:
            {
                ringsToSetStart: 1,
                ringsToSetEnd: 4,
                numberOfSectorsPerRing: 12,
                numberOfRings: 5

            },
        deactivateAllDragPoints: true,
    },

    {
        id: 6,
        text_de: 'fünf Ringe',
        text_en: 'Complete the two starting lines as geodesics to the edge of the sector model.\n \nConsider:\n1. How does a geodesic run within a sector?\n2. What do you have to do to continue a geodesic in the next sector?',
        sectorsToShow: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
        marksToShow: [2, 5, 8, 11],
        sectorsSetToRingsOnR:
            {
                ringsToSetStart: 0,
                ringsToSetEnd: 4,
                numberOfSectorsPerRing: 12,
                numberOfRings: 5

            },
        setLineColor: ['green'],
        deactivateAllDragPoints: true,

    },

    {
        id: 7,
        text_de: 'fünf Ringe',
        text_en: 'Complete the two starting lines as geodesics to the edge of the sector model.\n \nConsider:\n1. How does a geodesic run within a sector?\n2. What do you have to do to continue a geodesic in the next sector?',
        sectorsToShow: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
        marksToShow: [2, 5, 8, 11],
        sectorsSetToRingsOnR:
            {
                ringsToSetStart: 0,
                ringsToSetEnd: 4,
                numberOfSectorsPerRing: 12,
                numberOfRings: 5

            },
        setLineColor: ['blue'],
        deactivateAllDragPoints: true,
    },
];


