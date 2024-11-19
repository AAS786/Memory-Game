function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
}
document.addEventListener("DOMContentLoaded", () => {
  const welcomePage = document.querySelector(".welcome-page");
  const gameContainer = document.querySelector(".container");
  const startButton = document.querySelector(".start-button");

  startButton.addEventListener("click", () => {
      welcomePage.style.display = "none"; // Hide the welcome page
      gameContainer.style.display = "block"; // Show the game container
  });
});


const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");


function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
      toggleModal();
  }
}

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

let cardTest = [];
let cards = [
  "apple-fruit-100", "apple-fruit-100",
  "banana-100", "banana-100",
  "birthday-cake-100", "birthday-cake-100",
  "black-jaguar-100", "black-jaguar-100",
  "blueberry-100", "blueberry-100",
  "bread-100", "bread-100",
  "broccoli-100", "broccoli-100",
  "butterfly-100", "butterfly-100",
  "cheese-100", "cheese-100",
  "cherry-100", "cherry-100",
  "chili-pepper-100", "chili-pepper-100",
  "chocolate-bar-100", "chocolate-bar-100",
  "citrus-100", "citrus-100",
  "coffee-100", "coffee-100",
  "crab-100", "crab-100",
  "cute-pumpkin-100", "cute-pumpkin-100",
  "doughnut-100", "doughnut-100",
  "french-fries-100", "french-fries-100",
  // "gingerbread-house-100", "gingerbread-house-100",
  // "globe-100", "globe-100",
  // "grapes-100", "grapes-100",
  // "hot-dog-100", "hot-dog-100",
  // "ice-cream-sundae-100", "ice-cream-sundae-100",
  // "ingredients-100", "ingredients-100",
  // "mushroom-100", "mushroom-100",
  // "orange-100", "orange-100",
  // "panda-100", "panda-100",
  // "pear-100", "pear-100",
  // "pelican-100", "pelican-100",
  // "pineapple-100", "pineapple-100",
  // "pizza-100", "pizza-100",
  // "raspberry-100", "raspberry-100",
  "sandwich-100", "sandwich-100",
  "shark-100", "shark-100",
  // "strawberry-100", "strawberry-100",
  // "watermelon-100", "watermelon-100",
  // "wine-bar-100", "wine-bar-100",
  // "wrap-100", "wrap-100"
];


let shuffledCards = shuffle(cards);

function createCards() {
  for (let card of shuffledCards) {
      const li = document.createElement("LI");
      li.classList.toggle("card");

      // Create a span element for the "?" symbol
      const questionMark = document.createElement("span");
      questionMark.classList.add("question-mark");
      questionMark.textContent = "❤️"; // Set "?" on the front of the card

      // Create an img element for the card image
      const img = document.createElement("img");
      img.src = `images/${card}.png`; // Image path for the card
      img.alt = card; // Set alternative text for accessibility
      img.classList.add("hidden"); // Initially hide the image

      const deck = document.querySelector('.deck');
        li.appendChild(questionMark); // Append the "?" symbol first
        li.appendChild(img); // Then append the image (back of the card)
        deck.appendChild(li);
  }
}

const ul = document.querySelector('.deck');
let moves = document.querySelector(".moves");
let movesCounter = 0;
let stars = 3;
let match = 0;
let isfirstClick = true;
let timerID;
let isRestart = false;

function initGame() {
  createCards();
  const card = document.querySelectorAll('.card');
  for (let i = 0; i < card.length; i++) {
      card[i].addEventListener("click", function (event) {
          if (card[i] !== event.target) return;
          if (event.target.classList.contains("show")) return;
          if (isfirstClick) {
              timerID = setInterval(timer, 1000);
              isfirstClick = false;
          }
          showCard(event.target);
          setTimeout(addCard, 550, shuffledCards[i], event.target, cardTest, i);
      }, false);
  }
}

function showCard(card) {
    card.classList.add('show');

    // Remove the question mark when the card is flipped
    const questionMark = card.querySelector('.question-mark');
    if (questionMark) {
        questionMark.style.display = 'none'; // Hide the "?" symbol
    }

    // Show the image
    const img = card.querySelector('img');
    if (img) {
        img.classList.remove('hidden');
    }
}


function addCard(card, cardHTML, testList, pos) {
  if (isRestart) {
      testList.length = 0;
      isRestart = false;
  }
  testList.push(card);
  testList.push(cardHTML)
  testList.push(pos);
  if (testList.length === 6) {
      updateMoveCounter();
      testCards(testList[0], testList[1], testList[2], testList[3], testList[4], testList[5]);
      testList.length = 0;
  }
}

function testCards(card1, html1, x1, card2, html2, x2) {
  if (card1 === card2 && x1 != x2) {
      cardsMatch(html1, html2);
  } else {
      cardsDontMatch(html1, html2);
  }
}

function cardsMatch(card1, card2) {
  card1.classList.add('match');
  card2.classList.add('match');
  match++;
  if (match === 20) {
      win();
  }
}

function cardsDontMatch(card1, card2) {
  card1.classList.toggle('no-match');
  card2.classList.toggle('no-match');
  setTimeout(function () {
      card1.classList.toggle('no-match');
      card2.classList.toggle('no-match');
      card1.classList.toggle('show');
      card2.classList.toggle('show');

  }, 300);
}

function win() {
  clearInterval(timerID);
  toggleModal();
  const stats = document.querySelector(".stats");
  if (s % 60 < 10) {
      stats.textContent = "You won with: " + stars + " stars in " + movesCounter + " moves with time: " + m + ":0" + s % 60;
  } else {
      stats.textContent = "You won with: " + stars + " stars in " + movesCounter + " moves with time: " + m + ":" + s % 60;
  }
}

function updateMoveCounter() {
  movesCounter++;
  moves.textContent = "Moves: " + movesCounter;

  // Adjust thresholds based on 40 cards
  if (movesCounter === 40) { // First star is lost after 35 moves
      let star = document.querySelector("#star3");
      star.classList.toggle("fa-star");
      star.classList.add("fa-star-o");
      stars--;
  } else if (movesCounter === 55) { // Second star is lost after 55 moves
      let star = document.querySelector("#star2");
      star.classList.toggle("fa-star");
      star.classList.add("fa-star-o");
      stars--;
  } else if (movesCounter === 65) { // Third star is lost after 65 moves
      let star = document.querySelector("#star1");
      star.classList.toggle("fa-star");
      star.classList.add("fa-star-o");
      stars--;
  }

  // Check if all stars are lost
  if (stars === 0) {
      gameOver(); // Trigger the game-over function
  }
}



function gameOver() {
  clearInterval(timerID); // Stop the timer when the game is over

  const modal = document.querySelector("#game-modal"); // Get the modal for losing
  modal.classList.add("show-modal"); // Display the modal
  
  const stats = document.querySelector("#stats"); // Get the stats element inside the modal
  stats.textContent = "Better luck next time! Would you like to try again?"; // Display loss message

  const retrygamebutton = document.querySelector(".retry-game"); // Get the "Try Again!" button
  retrygamebutton.style.display = "block"; // Ensure the button is visible
  retrygamebutton.addEventListener("click", resetGame); // Add an event listener to reset the game

  const closeButton = document.querySelector(".close-button"); // Get the close button

  // Add an event listener to the close button
  closeButton.addEventListener("click", () => {
    modal.classList.remove("show-modal"); // Close the modal when 'x' is clicked
  });
}

// Reset game logic
function resetGame() {
  // Hide the modal
  const modal = document.querySelector("#game-modal");
  modal.classList.remove("show-modal"); // Hide the modal when the user tries again
  
  // Reset or reload the game logic here
  location.reload(); // Reload the page to start a fresh game
}

function win() {
  if (stars === 0) return; // Do not trigger win if stars are zero

  clearInterval(timerID);
  toggleModal();
  const stats = document.querySelector(".stats");
  if (s % 60 < 10) {
      stats.textContent = "You won with: " + stars + " stars in " + movesCounter + " moves with time: " + m + ":0" + s % 60;
  } else {
      stats.textContent = "You won with: " + stars + " stars in " + movesCounter + " moves with time: " + m + ":" + s % 60;
  }
}






let s = 0; 
let m = 0; 
function timer() {
  ++s;
  m = Math.floor(s / 60);
  let timer = document.querySelector(".timer");
  if (s % 60 < 10) {
      timer.textContent = "Time: " + m + ":0" + s % 60;
  } else {
      timer.textContent = "Time: " + m + ":" + s % 60;
  }

}

let restart = document.querySelector(".restart");
restart.addEventListener("click", restartGame, false);
function restartGame() {
  clearInterval(timerID);
  movesCounter = 0;
  match = 0;
  s = 0;
  m = 0;
  isfirstClick = true;
  isRestart = true;
  const deck = document.querySelector('.deck');
  var elements = deck.getElementsByClassName("card");

  while (elements[0]) {
      elements[0].parentNode.removeChild(elements[0]);
  }
  shuffledCards = shuffle(cards); 
  let timer = document.querySelector(".timer");
  timer.textContent = "Time: 0:00";
  moves.textContent = "Moves: " + movesCounter;

  resetStars();
  initGame();
}

function resetStars() {
  stars = 3;
  let star = document.querySelector("#star3");
  star.classList.remove("fa-star");
  star.classList.remove("fa-star-o");
  star.classList.add("fa-star");

  star = document.querySelector("#star2");
  star.classList.remove("fa-star");
  star.classList.remove("fa-star-o");
  star.classList.add("fa-star");

  star = document.querySelector("#star1");
  star.classList.remove("fa-star");
  star.classList.remove("fa-star-o");
  star.classList.add("fa-star");
}

const newGameButton = document.querySelector(".new-game");
newGameButton.addEventListener("click", newGame);
function newGame() {
  toggleModal();
  restartGame();
}

initGame();
