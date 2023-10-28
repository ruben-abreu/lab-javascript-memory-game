const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
];

const memoryGame = new MemoryGame(cards);
memoryGame.shuffleCards();

window.addEventListener('load', event => {
  let html = '';

  memoryGame.cards.forEach(pic => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;

  const pickedCards = [];
  let clickedCards = 0;
  let guessedCards = 0;

  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      clickedCards++;
      const clicked = document.getElementById('pairs-clicked');
      clicked.innerText = Math.floor(clickedCards / 2);

      pickedCards.push(card);

      card.classList.toggle('turned');

      if (pickedCards.length === 2) {
        let card1 = pickedCards[0].getAttribute('data-card-name');
        let card2 = pickedCards[1].getAttribute('data-card-name');

        if (memoryGame.checkIfPair(card1, card2) === true) {
          pickedCards.forEach(pickedCard => {
            guessedCards++;
            const guessed = document.getElementById('pairs-guessed');
            guessed.innerText = guessedCards;
            pickedCard.classList.toggle('blocked');

            pickedCards.length = 0;

            if (memoryGame.checkIfFinished() === true) {
              const youWon = document.querySelector('h1');
              youWon.innerText = `You Won!`;
            }
          });
        } else {
          setTimeout(() => {
            pickedCards.forEach(pickedCard => {
              pickedCard.classList.remove('turned');
            });
            pickedCards.length = 0;
          }, 500);
        }
      }
    });
  });
});
