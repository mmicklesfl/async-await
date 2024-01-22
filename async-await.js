const numAPI = 'http://numbersapi.com';

// 1. Function to pull a fact for one number
async function numFact(number) {
    try {
        const url = `${numAPI}/${number}/trivia`;
        const res = await axios.get(url);
        console.log(`Fact for number ${number}: ${res.data}`);
    } catch (error) {
        console.error('Error:', error);
    }
}

// 2. Function to pull a fact for multiple numbers
async function numsFact(numbers) {
    try {
        const url = `${numAPI}/${numbers.join(',')}/trivia`;
        const res = await axios.get(url);
        const numFacts = res.data;
        for (let num in numFacts) {
            console.log(`Fact for number ${num}: ${numFacts[num]}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// 3. Function to pull multiple facts for one number
async function numFacts(number) {
    const count = 4; // number of facts to pull
    for (let i = 0; i < count; i++) {
        try {
            const url = `${numAPI}/${number}/trivia`;
            const res = await axios.get(url);
            console.log(`Fact ${i + 1} for number ${number}: ${res.data}`);
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

// Deck of Cards functions
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
