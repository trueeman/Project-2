var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

 

var gameOver = false;
var board;

 

var rows = 6;
var columns = 7;
var currColumns = []; //houdt bij in welke rij elke blok/kolom zich bevindt.

 

window.onload = function() {
    setGame();
}

 

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];


 

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // voor JS
            row.push(' ');
            // voor HTML
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

 
// is refresh
function setPiece() {
    if (gameOver) {
        return;
    }

 

    //get coords of that tile clicked
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

 

    // om te kijken in welke rij de kolom moet staan
    r = currColumns[c];

 

    if (r < 0) { // board[r][c] != ' ' r is voor de rijen verticaal en c voor rijen die horizontaal gaan
        return; 
    }

 

    board[r][c] = currPlayer; //update JS board
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    }
    else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

 

    r -= 1; // dit is voor de zwaarte kracht met die munten
    currColumns[c] = r; //update de zwaarte kracht

 

    checkWinner();
}

 

function checkWinner() {
     // horizontaal
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
         }
    }

 

    // verticaal
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

 

    // is voor links anti diagonaal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

 

    // is voor diagonaal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

 
// geeft aan welke kleur gewonnen heeft
function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins";             
    } else {
        winner.innerText = "Yellow Wins";
    }
    gameOver = true;
}
