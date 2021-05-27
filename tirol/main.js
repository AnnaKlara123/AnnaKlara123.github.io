//* global L */
// Bike Trail Tirol Beispiel

// Kartenhintergründe der basemap.at definieren
let baselayers = {
    standard: L.tileLayer.provider("BasemapAT.basemap"),
    grau: L.tileLayer.provider("BasemapAT.grau"),
    terrain: L.tileLayer.provider("BasemapAT.terrain"),
    surface: L.tileLayer.provider("BasemapAT.surface"),
    highdpi: L.tileLayer.provider("BasemapAT.highdpi"),
    ortho_overlay: L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ]),
};

// Overlays für die Themen zum Ein- und Ausschalten definieren /Wikipedia Overlays hinzufügen
let overlays = {
    tracks: L.featureGroup(),
    wikipedia: L.featureGroup()
};

// Karte initialisieren und auf Innsbrucks Wikipedia Koordinate blicken
let map = L.map("map", {
    center: [47.267222, 11.392778],
    zoom: 9,
    layers: [
        baselayers.grau
    ]
})
// Kartenhintergründe und Overlays zur Layer-Control hinzufügen /Hier sagen welche Layer angezeigt werden sollen
let layerControl = L.control.layers({
    "basemap.at Standard": baselayers.standard,
    "basemap.at grau": baselayers.grau,
    "basemap.at Relief": baselayers.terrain,
    "basemap.at Oberfläche": baselayers.surface,
    "basemap.at hochauflösend": baselayers.highdpi,
    "basemap.at Orthofoto beschriftet": baselayers.ortho_overlay
}, {
    "GPX-Tracks": overlays.tracks,
    "Wikipedia-Artikel": overlays.wikipedia
}).addTo(map);

// Overlay mit GPX-Track anzeigen
overlays.tracks.addTo(map);
overlays.wikipedia.addTo(map);

const elevationControl = L.control.elevation({
    elevationDiv: "#profile",
    followMarker: false,
    theme: 'lime-theme',
}).addTo(map);

// Wikipedia Artikel zeichnen -GEO NAMES
let articleDrawn = {};
const drawWikipedia =(bounds) =>{
console.log(bounds);
let url = `https://secure.geonames.org/wikipediaBoundingBoxJSON?north=${bounds.getNorth()}&south=${bounds.getSouth()}&east=${bounds.getEast()}&west=${bounds.getWest()}&username=AnnaKlara123&lang=de&maxRows=30`;
console.log(url);


let icons = {
    adm1st: "wikipedia_administration.png",
    adm2nd: "wikipedia_administration.png",
    adm3rd: "wikipedia_administration.png",
    airport: "wikipedia_helicopter.png",
    city: "wikipedia_smallcity.png",
    glacier: "wikipedia_glacier-2.png",
    landmark: "wikipedia_landmark.png",
    railwaystation: "wikipedia_train.png",
    river: "wikipedia_river-2.png",
    mountain: "wikipedia_mountains.png",
    waterbody: "wikipedia_lake.png",
    default: "wikipedia_information.png",
};

//Fetch sagt immer, dass etwas aus dem Internet zurückgegeben wird! Hier der WIkipedia Artikel URL beigeonames.org aufrufen und JSON Daten abholen
fetch(url).then(
    response => response.json()
).then(jsonData => {
    console.log(jsonData);

//Wikipedia Artikel zeigen 
    for (let article of jsonData.geonames) {
        // Habe ich den Artikel schon gezeichnet? --> If
        if (articleDrawn[article.wikipediaUrl]) {
            //Ja, nicht noch einmal zeichnen!
            console.log("schon gesehen", article.wikipediaUrl);
            continue;
        } else{
            articleDrawn[article.wikipediaUrl] = true;
        }

        }
        //welches Icon soll verwendet werden? --> IF abfrage
        if(icons[article.feature]) {
// ICON ist bekannt
        } else {
            //generisches Icon
            article.feature="default";
        }
        let mrk =L.marker([article.lat, article.lng], {
            icon: L.icon({
                iconUrl: `icons/${icons[article.feature]}`,
                iconSize: [32, 37],
                iconAnchor:[16, 37], 
                popupAnchor:[0, -37]
            })
        });
        mrk.addTo(overlays.wikipedia);

        //Popup erzeugen
        let img ="";
        if(article.thumbnailImg) {
            img = `<img src="${article.thumbnailImg}" 
            alt ="Thumbnail">`;
        }
        // Pipup definieren
        mrk.bindPopup(`
                <small>${article.feature}</small>
                <h3>${article.title} (${article.elevation}m)</h3>
                ${img}
                <p>${article.summary}</p>
                <a target="Wikipedia" href="https://${article.wikipediaUrl}">Wikipedia-Artikel</a>
        `);
    }
);

};

//Tracks zeichnen
const drawTrack = (nr) =>{
    console.log('Track: ', nr);
    elevationControl.clear();
    overlays.tracks.clearLayers();
    let gpxTrack =new L.GPX(`tracks/${nr}.gpx`,{
        async:true,
        marker_options: {
            startIconUrl: `icons/number_${nr}.png`,
            endIconUrl: `icons/finish.png`,
            shadowUrl: null,
          },
          //Die Strecke stricheln 
          polyline_options: {
              color: 'black',
            dashArray: [2, 5],}
    }).addTo(overlays.tracks);
    //Zoomen der Map auf den AUsschnitt geht erst, nachdem die Karte geladen wurde!
    gpxTrack.on("loaded", () => {
        console.log('loaded gpx');
        console.log('Track name: ', gpxTrack.get_name());
        console.log('Track name: ', gpxTrack.get_distance());
        gpxTrack.bindPopup(`
        <h3>${gpxTrack.get_name()}</h3>
        <ul>
            <li>Streckenlänge: ${gpxTrack.get_distance()} m</li>
            <li>tiefster Punkt: ${gpxTrack.get_elevation_min()} m</li>
            <li>höchster Punkt: ${gpxTrack.get_elevation_max()} m</li>
            <li>Höhenmeter bergauf: ${gpxTrack.get_elevation_gain()} m</li>
            <li>Höhenmeter bergab: ${gpxTrack.get_elevation_loss()} m</li>
        </ul>
        `);
       
    })
    //popup with
    //Name, max höhe, min. höhe, total distance
    elevationControl.load(`tracks/${nr}.gpx`);
};
//drawTrack(30); --> //Veriaable variabel halten (bei mr NUMMER 30. Diese wied durch draw Track vergeben)
const selectedTrack = 30;
drawTrack(selectedTrack);

//
console.log('biketirol json: ', BIKETIROL);
let pulldown = document.querySelector("#pulldown");
console.log('Pulldown: ', pulldown);
let selected = '';
for (let track of BIKETIROL) {
    if (selectedTrack == track.nr) {
        selected = 'selected';
    } else {
        selected = '';
    }
    pulldown.innerHTML += `<option ${selected} value="${track.nr}">${track.nr}: ${track.etappe}</option>`;
} 

pulldown.onchange = () => {
    console.log('changed!!!!!', pulldown.value);
    drawTrack(pulldown.value);
}; 

//Event handler map.on (Auf welches Ereigniss er reagieren soll: Zoom, Pan)  
map.on("zoomend moveend", () => {
    // Wikipedia Artikel zeichnen
    drawWikipedia(map.getBounds());
});