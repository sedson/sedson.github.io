console.log("js is working!");

const domCreate = x => document.createElement(x);
const domGet = x => document.querySelector(x);
const domGetAll = x => document.querySelector(x);

let sec = domGet("section");


let round = 0;
let moves = ["x", "o"];

let isPlaying = true;


// FUNCTIONS

const clickBox = (event, board) => {
  if(isPlaying){
    event.stopPropagation();

    let [bad, x, y] = event.target.id.split('').map(x => parseInt(x));

    if (board[x][y] === " ") {
      let move = moves[round % 2];
      board[x][y] = move;
      event.target.innerText = move;
      event.target.classList.add("used");

      if (checkBoardForWin(board, move, x, y)) {
        setMessage(`${move} has won!!`)
        //reset();
      }
      else {
        round++;
        setMove(round);
        if(round === 9){
          setMessage("TIE");
          // reset();
        }
      }
    }
  }
}

const makeBoard = () => {
  let board = [];
  for(let i = 0; i < 3; i++){
    let row = [];
    for(let j = 0; j < 3; j++){
      row.push(" ");
      let box = domCreate("div");
      let tile = domCreate("div");
      box.classList.add("box");
      tile.classList.add("tile");
      tile.id = "_" + i + j;
      tile.addEventListener("click", () => clickBox(event, gameboard));
      box.appendChild(tile);
      sec.appendChild(box);
    }
    board.push(row);
  }
  return board;
}

// CHECK HORIZONTAL WIN
const checkRow = (board, move, x, y) => {
  let offsets = [0, 0,
                 0, 1,
                 0, 2];

  let hasWon = checkBoxes(board, move, offsets, x, y);
  if (hasWon) highLightBoxes(offsets, x, y);
  return hasWon;
}

// CHECK VERTICAL WIN
const checkCol = (board, move, x, y) => {
  let offsets = [0, 0,
                 1, 0,
                 2, 0];

  let hasWon = checkBoxes(board, move, offsets, x, y);
  if (hasWon) highLightBoxes(offsets, x, y);
  return hasWon;
}

// CHECK DIAGONAL WIN
const checkDiag = (board, move, x, y) => {
  if(x === y){
      let offsets = [0, 0,
                     1, 1,
                     2, 2];

     let hasWon = checkBoxes(board, move, offsets, x, y);
     if (hasWon) highLightBoxes(offsets, x, y);
     return hasWon;
  }
  else if(x + y === 2) {
      let offsets = [0, 0,
                     1, 2,
                     2, 1];

     let hasWon = checkBoxes(board, move, offsets, x, y);
     if (hasWon) highLightBoxes(offsets, x, y);
     return hasWon;
  }
  return false;
}

const checkBoardForWin = (board, move, x, y) => {
  return checkRow(board, move, x, y) || checkCol(board, move, x, y) || checkDiag(board, move, x, y);
}

const setMessage = (msg) => {
  domGet("#message").innerText = msg;
  isPlaying = false;
  domGet("#reset-button").style.display = "inline";
}

const setMove = (round) => domGet("#current-move").innerText = moves[round % 2];

const reset = () => {
  sec.textContent = "";
  gameboard = makeBoard();
  round = 0;
  setMove(round);
  setMessage("");
  isPlaying = true;
  domGet("#reset-button").style.display = "none";

}


const checkBoxes = (board, move, offSetArr, x, y) => {
  return board[(x + offSetArr[0]) % 3][(y + offSetArr[1]) % 3] === move &&
         board[(x + offSetArr[2]) % 3][(y + offSetArr[3]) % 3] === move &&
         board[(x + offSetArr[4]) % 3][(y + offSetArr[5]) % 3] === move;
}

const highLightBoxes = (offSetArr, x, y) => {
  domGet(`#_${(x + offSetArr[0]) % 3}${(y + offSetArr[1]) % 3}`).classList.add("winning");
  domGet(`#_${(x + offSetArr[2]) % 3}${(y + offSetArr[3]) % 3}`).classList.add("winning");
  domGet(`#_${(x + offSetArr[4]) % 3}${(y + offSetArr[5]) % 3}`).classList.add("winning");
}

reset();
