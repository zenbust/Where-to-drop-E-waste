const locationInfo = document.getElementById('location-info');

const locationsData = [
    { id: "672218eaca4aed83d3089d55", name: "Triam Udom Suksa Patthanakarn, Nonthaburi", coords: [13.848, 100.443139] },

];

locationsData.forEach(location => {
    const marker = L.marker(location.coords, { icon: markerIcon }).addTo(map);
    marker.on('click', async () => {
        locationInfo.style.display = 'block';

        try {
            const response = await fetch(`http://localhost:3000/centers/${location.id}`);
            console.log('Response:', response); // Debugging line
            if (!response.ok) {
                throw new Error('Failed to fetch center data');
            }
            const centerData = await response.json();

            locationInfo.innerHTML = `
                <h3>${centerData.name}</h3>
                <p>${centerData.details}</p>
                <p>${centerData.benefits}</p>
                <p>${centerData.tel}</p>`;
        } catch (error) {
            console.error('Error fetching center data:', error);
            locationInfo.innerHTML = 'Failed to load center information.';
        }
    });
});

// Optional: Hide the box when clicking elsewhere
map.on('click', () => {
    locationInfo.style.display = 'none';
});

marker.on('click', async () => {
    locationInfo.style.display = 'block';

    try {
        const response = await fetch(`http://localhost:3000/centers/${location.id}`);
        console.log('Response status:', response.status); // Log the response status
        if (!response.ok) {
            throw new Error('Failed to fetch center data');
        }
        const centerData = await response.json();
        console.log('Center data:', centerData); // Log the center data

        locationInfo.innerHTML = `
            <h3>${centerData.name}</h3>
            <p>${centerData.details}</p>
            <p>${centerData.benefits}</p>
            <p>${centerData.tel}</p>`;
    } catch (error) {
        console.error('Error fetching center data:', error);
        locationInfo.innerHTML = 'Failed to load center information.';
    }
});

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

// Search input event listener
document.querySelector('.place').addEventListener('input', (event) => {
    const query = event.target.value;
    fetchCenters(query);
});

// Fetch centers when the window loads
window.onload = () => fetchCenters();
