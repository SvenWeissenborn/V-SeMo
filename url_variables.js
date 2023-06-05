function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}


//? um die Variablen anzukuendigen

//language=english& um die Sprache auf Englisch zu stellen (das &-Zeichen zum trennen der Variablen)
let language = getUrlVars()["language"];

//turnLorentzTransformOn=1& um lorentzTransform einzuschalten
//let turnLorentzTransformOn = getUrlVars()["turnLorentzTransformOn"];

//goThroughStar=1& um lorentzTransform einzuschalten
let goThroughStar = getUrlVars()["goThroughStar"];

//sectorIDText=programID& oder sectorIDText=off& um den Button fuer die Sektorflaeche anzuzeigen
let sectorIDText = getUrlVars()["sectorIDText"];

//setPositionAndAngleRandomly=1& um die Startposition und den Startwinkel der Sektoren zufaellig einzurichten
let setPositionAndAngleRandomly = getUrlVars()["setPositionAndAngleRandomly"];

//showExerciseBox=1& um den Button fuer das automatische Zusammensetzen entlang einer Geodaete einzuschalten
let showExerciseBox = getUrlVars()["showExerciseBox"];

//textured=1& um die Texturen der Erdkarte einzuschalten (nur fuer die Kugel)
let textured = getUrlVars()["textured"];

//textureColored=1& um die Texturen der Erdkarte farbig darzustellen (beachte, dass es dann Nordafrika ist)
let textureColored = getUrlVars()["textureColored"];


//buildStartGeodesics=1& um die Startgeodaeten einzuschalten
let buildStartGeodesics = getUrlVars()["buildStartGeodesics"];

//buildStartMarks=1& um die Markierungen zu Anfang einzuschalten
let buildStartMarks = getUrlVars()["buildStartMarks"];

//buildStartTexts=1& um die Markierungen zu Anfang einzuschalten
let buildStartTexts = getUrlVars()["buildStartTexts"];

//buildTicks=1& um die ticks zu Anfang einzuschalten
let buildTicks = getUrlVars()["buildTicks"];

//buildLightCone=1& um den Lichtkegel zu Anfang einzuschalten
let buildLightCone = getUrlVars()["buildLightCone"];

//showResetSectors=1& um den Button fuer das Zuruecksetzten aller Sektoren zu aktivieren
let showResetSectors = getUrlVars()["showResetSectors"];

//showSetSectorsToRing=1& um den Button fuer das automatische Zusammensetzen der euklidischen Sektoren zu einem Ring
let showSetSectorsToRing = getUrlVars()["showSetSectorsToRing"];

//showAddCurvedLine=1& um den Button fuer krumme Linien anzuzeigen
let showAddCurvedLine = getUrlVars()["showAddCurvedLine"];

//showAreaSector=globe& oder showAreaSector=earth& um den Button fuer die Sektorflaeche anzuzeigen
let showAreaSector = getUrlVars()["showAreaSector"];

//showVerticesOn=1& um den Button fuer die Vertices der Sektoren anzuzeigen
let showVerticesOn = getUrlVars()["showVerticesOn"];

//showAutoSet=1& um den Button fuer das automatische Zusammensetzen entlang einer Geodaete einzuschalten
let showAutoSet = getUrlVars()["showAutoSet"];

//showChangeDirection=1& um den Button fuer die Aenderung der Startrichtung anzuzeigen
let showChangeDirection = getUrlVars()["showChangeDirection"];

//showAutoComplete=1& um den Button fuer die automatische Vervollstaendigung anzuzeigen
let showAutoComplete = getUrlVars()["showAutoComplete"];

//showChangeStartPoint=1& um den Joystick fuer die Aenderung der Startposition anzuzeigen
let showChangeStartPoint = getUrlVars()["showChangeStartPoint"];

//turnOverlapControllOn=1& um die OverlapControll ein- und auszuschalten
let turnOverlapControllOn = getUrlVars()["turnOverlapControllOn"];

//defineLaufContinueGeodesicMax=XX& XX is a number to limit the function
let defineLaufContinueGeodesicMax = getUrlVars()["defineLaufContinueGeodesicMax"];

let userName = getUrlVars()["userName"];

//autoSetOnDraw=1& um das automatische Zusammensetzen der Sektoren beim Zeichnen einer Linie zu aktivieren
//noch zu entwickeln
let autoSetOnDraw = getUrlVars()["autoSetOnDraw"];

//buildGeodesicTicks=1&
let buildGeodesicTicks = getUrlVars()["buildGeodesicTicks"];

let geodesicsLightLike = getUrlVars()["geodesicsLightLike"];