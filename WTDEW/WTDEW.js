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
