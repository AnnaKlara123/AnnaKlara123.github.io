let basemapGray = L.tileLayer.provider('BasemapAT.grau'); //https://docs.eegeo.com/eegeo.js/v0.1.780/docs/leaflet/L.TileLayer/ - Used to load and display tile layers on the map, implements ILayer interface.

let map = L.map("map", { // https://docs.eegeo.com/eegeo.js/v0.1.780/docs/leaflet/L.Map/ -  it is used to create a map on a page and manipulate it.
    center: [47, 11],
    zoom: 9,
    layers: [
        basemapGray
    ]
});

let overlays = {
    stations: L.featureGroup(), // hier landen Wetterstationen
    temperature: L.featureGroup(),
    snowheight: L.featureGroup(),
    windspeed: L.featureGroup(),
    winddirection: L.featureGroup(),
};



let layerControl = L.control.layers({ //https://leafletjs.com/reference-1.7.1.html#control-layers - The base class for all Leaflet controls. Implements IControl interface. You can add controls to the map
    "BasemapAT.grau": basemapGray,
    "BasemapAT.orthofoto": L.tileLayer.provider('BasemapAT.orthofoto'), //https://docs.eegeo.com/eegeo.js/v0.1.780/docs/leaflet/L.TileLayer/ - Used to load and display tile layers on the map, implements ILayer interface.
    "BasemapAT.surface": L.tileLayer.provider('BasemapAT.surface'),
    "BasemapAT.overlay+ortho": L.layerGroup([ // Used to group several layers and handle them as one. If you add it to the map, any layers added or removed from the group will be added/removed on the map as well. Extends Layer. - Create a layer group, optionally given an initial set of layers and an options object.
        L.tileLayer.provider('BasemapAT.orthofoto'), 
        L.tileLayer.provider('BasemapAT.overlay')
    ])
}, {"Wetterstationen Tirol": overlays.stations,
    "Temperatur (C°)": overlays.temperature,
    "Schneehöhe (cm)": overlays.snowheight,
    "Windgeschwindigkeit (km/h)": overlays.windspeed,
    "Windrichtung ": overlays.winddirection,
    } , {
        collapsed:false
    }
).addTo(map);


// Maßstab einbauen 
L.control.scale({
    imperial: false
}    
).addTo(map);

let getColor = (value, colorRamp) => {
console.log("Wert: ", value, "Palette:" , colorRamp);
for (let rule of colorRamp) {
    if (value >= rule.min && value < rule.max) {
        return rule.col;
    }

return "black";
}};

let newLabel = (coords, options) => {
    let color = getColor(options.value, options.colors)
    console.log("Wert", options.value, "bekommt Farbe", color); 
    let label = L.divIcon({
        html: `<div>${options.value}</div>`,
        className: "text-label"
    })
    let marker = L.marker([coords[1], coords[0]], {
        icon: label,
        title: `${options.station} (${coords[2]}m)`
    });
    return marker;
};

// .text-label


let awsUrl = 'https://wiski.tirol.gv.at/lawine/produkte/ogd.geojson';


fetch(awsUrl)
    .then(response => response.json())
    .then(json => {
        console.log('Daten konvertiert: ', json);
        for (station of json.features) {
            // console.log('Station: ', station);
            let marker = L.marker([ // http://docs.eegeo.com/eegeo.js/v0.1.780/docs/leaflet/L.Marker/%20Used%20to%20put%20markers%20on%20the%20map. - 
                station.geometry.coordinates[1],
                station.geometry.coordinates[0]
            ]);
            let formattedDate = new Date(station.properties.date);
            marker.bindPopup(`
            <h3>${station.properties.name}</h3>
            <ul>
            <li>Datum: ${formattedDate.toLocaleString("de")}</li>
            <li>Seehöhe: ${station.geometry.coordinates[2]} m</li>
            <li>Temperatur: ${station.properties.LT ||'?'} °C</li>
            <li>Schneehöhe: ${station.properties.HS || '?'} cm</li>
            <li>Windgeschwindigkeit: ${station.properties.WG || '?'} km/h</li>
            <li>Windgeschwindrichtung: ${station.properties.WR || '?'}</li>
          </ul>
          <a target="_blank" href="https://wiski.tirol.gv.at/lawine/grafiken/1100/standard/tag/${station.properties.plot}.png">Grafik</a>
            `);
          
           // Schneehöhenlayer hizufüen 
         
           marker.addTo(overlays.stations);
           if (typeof station.properties.HS == "number") {
               let marker = newLabel(station.geometry.coordinates, {
                   value: station.properties.HS.toFixed(0), 
                   colors: COLORS.snowheight,
                   station: station.properties.name
               });
               marker.addTo(overlays.snowheight);
           }
           // Windgeschwiendigkeit

           if (typeof station.properties.WG == "number") {
               let marker = newLabel(station.geometry.coordinates, {
                   value: station.properties.WG.toFixed(0),
                   colors: COLORS.windspeed,
                   station: station.properties.name
               });
               marker.addTo(overlays.windspeed);
           }
           // TEmperatr
           if (typeof station.properties.LT == "number") {
               let marker = newLabel(station.geometry.coordinates, {
                   value: station.properties.LT.toFixed(1),
                   colors: COLORS.temperature,
                   station: station.properties.name
               });
               marker.addTo(overlays.temperature);
           }
       }
       // set map view to all stations
       map.fitBounds(overlays.stations.getBounds());
   });

