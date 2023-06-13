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

/* TODO: aus parameters entnehmen */
let nRowsInModel = 3;
let nColumnsInModel = 8;


/**
 * gibt SektorIndizes der Ringe r zurück
 * @param r Ring-Nrn, 0 = innerster Ring
 */
function sectorRing(...r) {
    let s = [];
    for (let i=0; i<nColumnsInModel; i++) {
        s.push(...r.map(ri => ri + i*nRowsInModel));
    }
    return s;
}


let slideContent = [
    {
        id: 0,
        text_de: 'gelbe Wand',
        text_en: '',
        sectorsToHide: sectorRing(0,1),
        marksToHide: [1, 2, 4, 5, 7, 8, 10, 11],
        sectorsSetToRingsOnR:
            {
                ringsToSetStart: 2,
                ringsToSetEnd: 2,
                numberOfSectorsPerRing: nColumnsInModel,
                numberOfRings: nRowsInModel

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
        text_de: 'grüne Wände zu den roten Punkten',
        text_en: '',
        sectorsToHide: sectorRing(0),
        sectorsToShow: sectorRing(1),
        marksToShow: [1, 4, 7, 10],
        sectorsSetToRingsOnR:
            {
                ringsToSetStart: 1,
                ringsToSetEnd: 2,
                numberOfSectorsPerRing: nColumnsInModel,
                numberOfRings: nRowsInModel

            },
        setLineColor: ['green'],
        deactivateAllDragPoints: true,
    },

    {
        id: 3,
        text_de: 'rote Wand',
        text_en: '',
        sectorsToHide: sectorRing(0),
        sectorsToShow: sectorRing(1),
        marksToShow: [1, 4, 7, 10],
        sectorsSetToRingsOnR:
            {
                ringsToSetStart: 1,
                ringsToSetEnd: 2,
                numberOfSectorsPerRing: nColumnsInModel,
                numberOfRings: nRowsInModel

            },
        setLineColor: ['red'],
        deactivateAllDragPoints: true,
    },

    {
        id: 6,
        text_de: 'grüne Wände vervollständigen',
        text_en: '',
        sectorsToShow: sectorRing(0),
        marksToShow: [2, 5, 8, 11],
        sectorsSetToRingsOnR:
            {
                ringsToSetStart: 0,
                ringsToSetEnd: 2,
                numberOfSectorsPerRing: nColumnsInModel,
                numberOfRings: nRowsInModel

            },
        setLineColor: ['green'],
        deactivateAllDragPoints: true,

    },

    {
        id: 7,
        text_de: 'blaue Wand',
        text_en: '',
        sectorsToShow: sectorRing(0),
        marksToShow: [2, 5, 8, 11],
        sectorsSetToRingsOnR:
            {
                ringsToSetStart: 0,
                ringsToSetEnd: 2,
                numberOfSectorsPerRing: nColumnsInModel,
                numberOfRings: nRowsInModel

            },
        setLineColor: ['blue'],
        deactivateAllDragPoints: true,
    },

    {
        id: 8,
        text_de: 'Weg zeichnen längs der roten Wand',
        text_en: '',
        sectorsToShow: sectorRing(0),
        marksToShow: [2, 5, 8, 11],
        sectorsSetToRingsOnR:
            {
                ringsToSetStart: 0,
                ringsToSetEnd: 2,
                numberOfSectorsPerRing: nColumnsInModel,
                numberOfRings: nRowsInModel

            },
        setLineColor: ['black'],
        deactivateAllDragPoints: true,
    },
];
