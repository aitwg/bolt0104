const board = document.getElementById('board');
    const message = document.getElementById('message');
    const resetBtn = document.getElementById('resetBtn');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    function handleCellClick(e) {
      const cell = e.target;
      const index = parseInt(cell.dataset.index);

      if (gameBoard[index] !== '' || !gameActive) return;

      gameBoard[index] = currentPlayer;
      cell.textContent = currentPlayer;

      checkWinner();
      switchPlayer();
    }

    function switchPlayer() {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWinner() {
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          message.textContent = `Player ${gameBoard[a]} wins!`;
          gameActive = false;
          return;
        }
      }

      if (!gameBoard.includes('')) {
        message.textContent = "It's a draw!";
        gameActive = false;
      }
    }

    function resetGame() {
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      currentPlayer = 'X';
      gameActive = true;
      message.textContent = '';
      document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    }

    board.addEventListener('click', handleCellClick);
    resetBtn.addEventListener('click', resetGame);
