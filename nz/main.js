let stop = {
    nr: 7,
    name: "Dunedine",
    lat: -45.874167,
    lng: 170.503611,
    user: "AnnaKlara123",
    wikipedia: "https://en.wikipedia.org/wiki/Dunedin"
};

const map = L.map("map", {
    //center: [stop.lat, stop.lng],
    //zoom: 13,
    layers: [
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
    ]
});

let nav = (document.querySelector("#navigation"));
console.log(nav);
//console.log(nav)

//console.log(ROUTE);
ROUTE.sort((stop1, stop2) => {
    return stop1.nr > stop2.nr
});

for (let entry of ROUTE) {
  //  console.log(entry);
    nav.innerHTML += `
    <option value="${entry.user}"> ${entry.nr}: ${entry.name} </option>
    `;

    let mrk = L.marker([entry.lat, entry.lng]).addTo(map);
    mrk.bindPopup(`
    <h4>entry ${entry.nr}: ${entry.name}<h4>
    <p><a href="${entry.wikipedia}"><i class="fas fa-external-link-alt mr-3"></i>Read about stop in Wikipedia</a></p>
`);

    if (entry.nr == 7) {
        map.setView([entry.lat,entry.lng], 13)
        mrk.openPopup();
    }
}

//console.log(document.querySelector("#map"));


