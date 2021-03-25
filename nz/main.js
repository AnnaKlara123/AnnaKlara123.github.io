
let stop = {
    nr: 7,
    name: "Dunedine",
    lat: -45.874167,
    lng: 170.503611,
    user: "webmapping",
    wikipedia: "https://en.wikipedia.org/wiki/Dunedin"
};

const map = L.map("map", {
    center: [ stop.lat, stop.lng],
    zoom: 13,
    layer: [
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
    ]
});

let mrk = L.marker([-45.874167, 170.503611]).addTo(map);
mrk.bindPopup("Dunedine").openPopup();

console.log(document.querySelector("#map"));