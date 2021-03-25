
const map = L.map ("map", {
    center: [-45.874167, 170.503611],
    uzoom: 13,
    layer : [
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
    ]
    });
// WMTS-Sercvices
console.log(document.querySelector("#map"));
