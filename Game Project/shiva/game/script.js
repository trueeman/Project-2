// De navigatie bar openen.
function open_nav() {
  document.getElementById("nav").style.width = "250px";
}


// De navigatie bar sluiten.
function close_nav() {
  document.getElementById("nav").style.width = "0";
}



let playerText = document.getElementById("playerText"); //get element by id brengt een element terug met een specifieke waarde.
let restartBtn = document.getElementById("restartBtn");
let boxes = Array.from(document.getElementsByClassName("box")); //hiermee target ik alle elementen met de naam "box".

let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);

const O_TEXT = "O"; // dit zorgt er voor dat als je op het vakje klikt dat je een o ziet en geen andere letter/cijfer.
const X_TEXT = "X"; // dit zorgt er voor dat als je op het vakje klikt dat je een x ziet en geen andere letter/cijfer.

let currentPlayer = X_TEXT; // dit zorgt ervoor dat je altijd begint met de letter X
let spaces = Array(9).fill(null); // deze code zorgt ervoor dat je niet op een vakje kan klikken waar al eerder op geklikt is.

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
}; //deze code zorgt ervoor dat de game start

function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer; // deze code is er zodat als een box gevuld word met x dat je door gaat met O, en als de vorige zet een O was dat de volgendezet weer een x word.

    if (playerHasWon() !== false) {
      playerText.innerHTML = `${currentPlayer} heeft gewonnen!`; //deze hele code zorgt ervoor dat er "O/X heeft gewonnen" staat als een speler gewonnen heeft.
      let winning_blocks = playerHasWon();

      winning_blocks.map(
        (box) => (boxes[box].style.backgroundColor = winnerIndicator)
      );
      return;
    }

    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
  }
}

let winningCombos = [
  //dit zijn alle combinaties waarmee je kunt winnen
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playerHasWon() {
  for (let condition of winningCombos) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}
//De functie hierboven checkt of de speler gewonnen heeft door langs de winnende combinaties te gaan.

restartBtn.addEventListener("click", restart);
function restart() {
  spaces.fill(null);

  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });

  playerText.innerHTML = "Boter, kaas en eieren"; //Dit laat de titel van de game zien.

  currentPlayer = X_TEXT;
}
//deze hele code hierboven zorgt ervoor dat de opnieuw knop werkt

startGame();
