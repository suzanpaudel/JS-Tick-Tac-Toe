const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBO = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let circleTurn;
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMsgElement = document.getElementById('winningMsg');
const winningMsgTxtElement = document.querySelector('[data-winning-msg-txt]');
const restartBtn = document.getElementById('restart');

startGame();

restartBtn.addEventListener('click', startGame);

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('clcik', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMsgElement.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMsgTxtElement.innerText = 'Draw!';
  } else {
    winningMsgTxtElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!!!`;
  }
  winningMsgElement.classList.add('show');
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurn() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);

  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBO.some((combo) => {
    return combo.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
