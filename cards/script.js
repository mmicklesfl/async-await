let deckId = null;

// Function to create a new deck
async function createNewDeck() {
    try {
        const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        deckId = response.data.deck_id;
    } catch (error) {
        console.error('Error creating new deck:', error);
    }
}

// Function to draw a card
async function drawCard() {
    if (!deckId) return;

    try {
        const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        if (response.data.cards.length === 0) {
            alert("No more cards in the deck.");
            return;
        }

        const card = response.data.cards[0];
        displayCard(card);
    } catch (error) {
        console.error('Error drawing a card:', error);
    }
}

// Function to display the card
function displayCard(card) {
    const cardContainer = document.getElementById('cardContainer');
    const cardImage = document.createElement('img');
    cardImage.src = card.image;
    cardImage.alt = `${card.value} of ${card.suit}`;
    cardImage.id = 'card';
    cardContainer.innerHTML = ''; // Clear previous card
    cardContainer.appendChild(cardImage);
}

// Event listener for the draw card button
document.getElementById('drawCard').addEventListener('click', drawCard);

// Create a new deck when the page loads
window.onload = createNewDeck;
