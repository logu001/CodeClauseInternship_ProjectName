const cardValues = Array.from({ length: 8 }, (_, i) => i + 1);
const cards = [...cardValues, ...cardValues]
    .map(value => ({ value, id: Math.random() }))
    .sort(() => Math.random() - 0.5);

let flippedIndices = [];
let score = 0;
let timer = 0;
let intervalId;

const gameBoard = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const resetButton = document.getElementById('reset-button');

function startTimer() {
    intervalId = setInterval(() => {
        timer++;
        timerElement.textContent = `Time: ${timer}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(intervalId);
}

function resetGame() {
    score = 0;
    timer = 0;
    flippedIndices = [];
    scoreElement.textContent = `Score: ${score}`;
    timerElement.textContent = `Time: ${timer}s`;
    gameBoard.innerHTML = '';
    initializeGame();
}

function checkMatch() {
    const [firstIndex, secondIndex] = flippedIndices;
    const firstCard = document.querySelector(`.card[data-id="${cards[firstIndex].id}"]`);
    const secondCard = document.querySelector(`.card[data-id="${cards[secondIndex].id}"]`);
    
    if (cards[firstIndex].value === cards[secondIndex].value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        score++;
        scoreElement.textContent = `Score: ${score}`;
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
        }, 1000);
    }
    flippedIndices = [];
}

function handleCardClick(e) {
    const card = e.target;
    if (card.classList.contains('flipped') || flippedIndices.length === 2) return;

    card.classList.add('flipped');
    const cardIndex = Array.from(gameBoard.children).indexOf(card);
    flippedIndices.push(cardIndex);

    if (flippedIndices.length === 2) {
        checkMatch();
    }
}

function initializeGame() {
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;
        cardElement.innerHTML = `<span class="value">${card.value}</span>`;
        cardElement.addEventListener('click', handleCardClick);
        gameBoard.appendChild(cardElement);
    });
    startTimer();
}

resetButton.addEventListener('click', resetGame);

// Initialize game on page load
initializeGame();
