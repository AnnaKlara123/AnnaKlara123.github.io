let basemapGray = L.tileLayer.provider('BasemapAT.grau'); //https://docs.eegeo.com/eegeo.js/v0.1.780/docs/leaflet/L.TileLayer/ - Used to load and display tile layers on the map, implements ILayer interface.

let map = L.map("map", { // https://docs.eegeo.com/eegeo.js/v0.1.780/docs/leaflet/L.Map/ -  it is used to create a map on a page and manipulate it.
    center: [47, 11],
    zoom: 9,
    layers: [
        basemapGray
    ]
});

let layerControl = L.control.layers({ //https://docs.eegeo.com/eegeo.js/v0.1.780/docs/leaflet/L.Control/ - The base class for all Leaflet controls. Implements IControl interface. You can add controls to the map
    "BasemapAT.grau": basemapGray,
    "BasemapAT.orthofoto": L.tileLayer.provider('BasemapAT.orthofoto'), //https://docs.eegeo.com/eegeo.js/v0.1.780/docs/leaflet/L.TileLayer/ - Used to load and display tile layers on the map, implements ILayer interface.
    "BasemapAT.surface": L.tileLayer.provider('BasemapAT.surface'),
    "BasemapAT.overlay+ortho": L.layerGroup([ // Used to group several layers and handle them as one. If you add it to the map, any layers added or removed from the group will be added/removed on the map as well. Extends Layer. - Create a layer group, optionally given an initial set of layers and an options object.
        L.tileLayer.provider('BasemapAT.orthofoto'), 
        L.tileLayer.provider('BasemapAT.overlay')
    ])
}).addTo(map);


let awsUrl = 'https://wiski.tirol.gv.at/lawine/produkte/ogd.geojson';

let awsLayer = L.featureGroup(); //https://leafletjs.com/reference-1.7.1.html#layergroup - Extended LayerGroup that makes it easier to do the same thing to all its member layers:
layerControl.addOverlay(awsLayer, "Wetterstationen Tirol");
awsLayer.addTo(map);

// awsLayer.addTo(map);
let snowLayer = L.featureGroup();
layerControl.addOverlay(snowLayer, "Schneehöhen");
snowLayer.addTo(map);

//Windlayer hinzufügen
let windLayer = L.featureGroup();
layerControl.addOverlay(windLayer, "Windgeschwiendigkeit");
windLayer.addTo(map)

//Lufttemperatur hinzufügen 
let AirLayer = L.featureGroup();
layerControl.addOverlay(AirLayer, "Lufttemperatur");
AirLayer.addTo(map)



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
            <li>Temperatur: ${station.properties.LT} C</li>
            <li>Schneehöhe: ${station.properties.HS || '?'} cm</li>
            <li>Windgeschwindigkeit: ${station.properties.WG || '?'} km/h</li>
            <li>Windgeschwindrichtung: ${station.properties.WR || '?'}</li>
          </ul>
          <a target="_blank" href="https://wiski.tirol.gv.at/lawine/grafiken/1100/standard/tag/${station.properties.plot}.png">Grafik</a>
            `);
            marker.addTo(awsLayer);
            if (station.properties.HS) {
                let highlightClass = '';
                if (station.properties.HS > 100) {
                    highlightClass = 'snow-100';
                }
                if (station.properties.HS > 200) {
                    highlightClass = 'snow-200';
                }
                let snowIcon = L.divIcon({ //https://docs.eegeo.com/eegeo.js/v0.1.780/docs/leaflet/L.DivIcon/ - Represents a lightweight icon for markers that uses a simple div element instead of an image.
                    html: `<div class="snow-label ${highlightClass}">${station.properties.HS}</div>`
                })
                let snowMarker = L.marker([
                    station.geometry.coordinates[1],
                    station.geometry.coordinates[0]
                ], {
                    icon: snowIcon
                });
                snowMarker.addTo(snowLayer);
            }

          
        }
        // set map view to all stations
        map.fitBounds(awsLayer.getBounds());
    });