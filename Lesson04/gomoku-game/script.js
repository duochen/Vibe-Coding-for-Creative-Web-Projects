// ===== Game settings =====
const BOARD_SIZE = 15;
const WIN_COUNT = 5;

// Directions to check for a win: horizontal, vertical, two diagonals
const DIRECTIONS = [
  [0, 1],   // horizontal (left-right)
  [1, 0],   // vertical (up-down)
  [1, 1],   // diagonal down-right
  [1, -1],  // diagonal up-right
];

// ===== Game state =====
let board = [];           // 2D array: null = empty, "black" or "white"
let currentPlayer = "black";
let gameOver = false;

// ===== DOM elements =====
const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

// ===== Start the game when the page loads =====
initGame();

restartBtn.addEventListener("click", initGame);

/**
 * Set up a fresh game: empty board, black goes first.
 */
function initGame() {
  board = createEmptyBoard();
  currentPlayer = "black";
  gameOver = false;

  buildBoardUI();
  updateStatus("Black's turn");
  statusElement.classList.remove("winner");
}

/**
 * Create a 15x15 grid filled with null (empty cells).
 */
function createEmptyBoard() {
  const grid = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    grid[row] = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      grid[row][col] = null;
    }
  }
  return grid;
}

/**
 * Draw all 225 cells on the page and attach click handlers.
 */
function buildBoardUI() {
  boardElement.innerHTML = "";

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "cell";
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.setAttribute("aria-label", `Row ${row + 1}, column ${col + 1}`);

      cell.addEventListener("click", () => handleCellClick(row, col));

      boardElement.appendChild(cell);
    }
  }
}

/**
 * Called when a player clicks a cell.
 */
function handleCellClick(row, col) {
  // Ignore clicks after the game ends or on occupied cells
  if (gameOver || board[row][col] !== null) {
    return;
  }

  // Place the stone
  board[row][col] = currentPlayer;
  updateCellUI(row, col, currentPlayer);

  // Check if this move wins the game
  if (checkWin(row, col, currentPlayer)) {
    gameOver = true;
    const winnerName = currentPlayer === "black" ? "Black" : "White";
    updateStatus(`${winnerName} wins! 🎉`, true);
    disableAllCells();
    return;
  }

  // Switch to the other player
  currentPlayer = currentPlayer === "black" ? "white" : "black";
  const turnName = currentPlayer === "black" ? "Black" : "White";
  updateStatus(`${turnName}'s turn`);
}

/**
 * Show a black or white stone in the clicked cell.
 */
function updateCellUI(row, col, player) {
  const index = row * BOARD_SIZE + col;
  const cell = boardElement.children[index];
  cell.classList.add("taken", player);
  cell.disabled = true;
}

/**
 * Update the turn or winner message at the top.
 */
function updateStatus(message, isWinner = false) {
  statusElement.textContent = message;
  if (isWinner) {
    statusElement.classList.add("winner");
  }
}

/**
 * Stop all cells from accepting clicks after someone wins.
 */
function disableAllCells() {
  const cells = boardElement.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.disabled = true;
  });
}

/**
 * Count how many stones in a row starting from (row, col)
 * and going in one direction (dr, dc).
 */
function countInDirection(row, col, dr, dc, player) {
  let count = 0;
  let r = row;
  let c = col;

  while (
    r >= 0 &&
    r < BOARD_SIZE &&
    c >= 0 &&
    c < BOARD_SIZE &&
    board[r][c] === player
  ) {
    count++;
    r += dr;
    c += dc;
  }

  return count;
}

/**
 * Check if the last move created 5 or more in a row.
 * We count in both directions along each line (but subtract 1
 * so we do not count the center stone twice).
 */
function checkWin(row, col, player) {
  for (const [dr, dc] of DIRECTIONS) {
    const total =
      countInDirection(row, col, dr, dc, player) +
      countInDirection(row, col, -dr, -dc, player) -
      1;

    if (total >= WIN_COUNT) {
      return true;
    }
  }

  return false;
}
