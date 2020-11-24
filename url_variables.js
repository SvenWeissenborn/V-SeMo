function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

let language = getUrlVars()["language"];
let buildStartGeodesics = getUrlVars()["buildStartGeodesics"];
let buildStartMarks = getUrlVars()["buildStartMarks"];
let textured = getUrlVars()["textured"];
let showAutoSet = getUrlVars()["showAutoSet"];
let showAutoComplete = getUrlVars()["showAutoComplete"];
let showChangeDirection = getUrlVars()["showChangeDirection"];
let autoSetOnDraw = getUrlVars()["autoSetOnDraw"];