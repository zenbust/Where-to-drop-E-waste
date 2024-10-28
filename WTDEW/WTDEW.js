const locationInfo = document.getElementById('location-info');

const locationsData = [
    { name: "Triam Udom Suksa Patthanakarn, Nonthaburi", coords: [13.848, 100.443139], details: "Description of this location.",benefits:"benefits",tel:"08X-XXX-XXXX" },
    { name: "Central Plaza, Nonthaburi", coords: [13.873, 100.524], details: "Description of this location." ,details: "Description of this location.",benefits:"benefits",tel:"08X-XXX-XXXX"},
    { name: "Central Plaza, wesgate", coords: [13.878247, 100.41001], details: "Description of this location." ,details: "Description of this location.",benefits:"benefits",tel:"08X-XXX-XXXX"},

    // Add additional locations here
];

locationsData.forEach(location => {
    const marker = L.marker(location.coords, { icon: markerIcon }).addTo(map);
    marker.on('click', () => {
        locationInfo.style.display = 'block';
        locationInfo.innerHTML = `<h3>${location.name}</h3>
        <p>${location.details}</p>
        <p>${location.benefits}</p>
        <p>${location.tel}</p>`;
    });
});

// Optional: Hide the box when clicking elsewhere
map.on('click', () => {
    locationInfo.style.display = 'none';
});
//

src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
    crossorigin=""

// Function to fetch e-waste collection centers from the backend
async function fetchCenters(query = '') {
    const url = query
        ? `http://localhost:3000/centers/search?q=${encodeURIComponent(query)}`
        : 'http://localhost:3000/centers';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response error');
        }
        const centers = await response.json();
        displayCenters(centers);
    } catch (error) {
        console.error('Error fetching centers:', error);
        document.getElementById('centers-list').innerText = 'Failed to load centers';
    }
}

function displayCenters(centers) {
    const centersList = document.getElementById('centers-list');
    centersList.innerHTML = '';

    centers.forEach(center => {
        const centerItem = document.createElement('div');
        centerItem.classList.add('center-item');
        centerItem.innerHTML = `
            <h2>${center.name || 'No Name Provided'}</h2>
            <p>Address: ${center.address || 'No Address Provided'}</p>
            <p>Location: ${center.location?.coordinates[0] || 'N/A'}, ${center.location?.coordinates[1] || 'N/A'}</p>
        `;
        centersList.appendChild(centerItem);
    });
}

//Search input event listener
document.querySelector('.place').addEventListener('input', (event) => {
    const query = event.target.value;
    fetchCenters(query);
});

window.onload = () => fetchCenters();

