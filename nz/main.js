let stop = {
    nr: 7,
    name: "Dunedine",
    lat: -45.87,
    lng: 170.50,
    user: "AnnaKlara123",
    wikipedia: "https://en.wikipedia.org/wiki/Dunedin"
};

const map = L.map("map", {
    //center: [stop.lat, stop.lng],
    //zoom: 13,
    layers: [
        L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`)
    ]
});

let nav = document.querySelector(`#navigation`);
console.log('Navigation HTML Element: ', nav);
//console.log(ROUTE);

ROUTE.sort((stop1, stop2) => {
    if (stop1.nr > stop2.nr) {
        return 1;
      } else {
        return -1;
      }
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
        map.setView([entry.lat, entry.lng], 13)
        mrk.openPopup();
    }
}
nav.options.selectedIndex = 22 - 1;
nav.onchange = (evt) => {
    let selected = evt.target.selectedIndex;
    let options = evt.target.options;
    let username = options[selected].value;
    let link = `https://${username}.github.io/nz/index.html`;
    console.log(username, link);

    window.location.href = link;
};

console.log(document.querySelector("#map"));