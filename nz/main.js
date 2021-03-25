
const map = L.map ("map", {
    center: [-45.874167, 170.503611],
    zoom: 13,
    layer : [
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
    ]
    });

let mrk = L.marker([-45.874167, 170.503611]) .addTo(map);    
mrk.bindPopup("Dunedine").openPopup();

console.log(document.querySelector("#map"));
