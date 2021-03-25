
let stop = {
    nr: 7,
    name: "Dunedine",
    lat: -45.874167,
    lng: 170.503611,
    user: "AnnaKlara123",
    wikipedia: "https://en.wikipedia.org/wiki/Dunedin"
};

const map = L.map("map", {
    center: [ stop.lat, stop.lng],
    zoom: 13,
    layers: [
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
    ]
});



let mrk = L.marker([ stop.lat, stop.lng ]).addTo(map);
mrk.bindPopup(`<h4>Stop ${stop.nr}: ${stop.name}<h4>
<p><a href="${stop.wikipedia}"><i class="fas fa-external-link-alt mr-3"></i>Read about stop in Wikipedia</a></p>
`).openPopup();

console.log(document.querySelector("#map"));