const locations = [
    "Triam Udon Suksa Patthanakarn, Nonthaburi",
    "Central Plaza, Nonthaburi",
    "Future Park Rangsit, Pathum Thani",
    "Big C, Ratchaphruek",
    "Home Pro, Nonthaburi",
    "โรงเรียนเตรียมอุดมศึกษาพัฒนาการนนทบุรี"
];

function showSuggestions(value) {
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = ''; // Clear previous suggestions

    if (value.length === 0) return; // Don't show suggestions if input is empty

    const filteredSuggestions = locations.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
    );

    filteredSuggestions.forEach(item => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('suggestion');
        suggestionItem.textContent = item;
        suggestionItem.onclick = () => {
            document.getElementById('Search').value = item; // Set input value
            suggestionsContainer.innerHTML = ''; // Clear suggestions
        };
        suggestionsContainer.appendChild(suggestionItem);
    });
}