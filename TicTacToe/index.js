
class Player {
  static xText = 'X';
  static oText = 'O';
  static xColor = '#ff5346';
  static oColor = '#03b28b';
  constructor() {
    this.oPlayer = { text: Player.oText, color: Player.oColor, score: 0 };
    this.xPlayer = { text: Player.xText, color: Player.xColor, score: 0 };
    this.currentPlayer = this.oPlayer;
    this.nextPlayer = this.xPlayer;
  }

  changePlayer() {
    const temp = this.currentPlayer;
    this.currentPlayer = this.nextPlayer;
    this.nextPlayer = temp;
  }
}

class Game {
  static WIN_CONDITIONS = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];
  static borderOColor = '#03b28cb2';
  static borderXColor = '#ff52469c';
  static mainColor = '#4b685fb2';

  setMode(mode) {
    this.mode = mode;
    this.player.xPlayer.score = 0;
    this.player.oPlayer.score = 0;
    this.renderScore();
    this.newGame();
  }
  

  constructor() {
    this.player = new Player();
    this.currentPlayerElement = document.querySelector('.current_player');
    this.switchInput = document.getElementById("turnSwitch"); // ✅ ดึง switch input มาใช้
    this.board = new Array(9).fill('');
    this.showMessage = false;
    this.firstPlayer = this.player.xPlayer; // ให้ _ เริ่มก่อนในเกมแรก
    this.mode = "AI"

    this.newGame();
  }

  updateSwitch() {
    if (this.switchInput) {
        this.switchInput.checked = (this.player.currentPlayer.text === "X");
    }
  }
  newGame() {
    this.createBoard();
    this.initialiseEventListeners();
    this.board.fill('');
    this.showMessage = false;

    // ✅ กำหนดผู้เล่นเริ่มต้น
    this.player.currentPlayer = this.firstPlayer;
    this.player.nextPlayer = this.firstPlayer === this.player.oPlayer ? this.player.xPlayer : this.player.oPlayer;
    
    // ✅ เปลี่ยนคนเริ่มต้นในรอบถัดไป
    this.firstPlayer = this.player.nextPlayer;

    // this.currentPlayerElement.innerHTML = `Current Player: ${this.player.currentPlayer.text}`;
    this.updateSwitch();
    // ✅ ให้ AI เริ่มเล่นถ้าเป็นคิวของ AI

    setTimeout(() => {
      if (this.player.currentPlayer.text === "O" && this.mode === 'AI') {
          this.bestMove();
      }
  }, 500);
}

minimax(board, depth, isMaximizing) {
  let winner = this.getWinner();
  if (winner === "X") return -100 + depth; // AI แพ้ → ให้ค่าลบสูงสุด
  if (winner === "O") return 100 - depth;  // AI ชนะ → ให้ค่าบวกสูงสุด
  if (!board.includes("")) return 0; // เสมอ

  if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
          if (board[i] === "") {
              board[i] = "O";
              let score = this.minimax(board, depth + 1, false);
              board[i] = "";
              bestScore = Math.max(score, bestScore);
          }
      }
      return bestScore;
  } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
          if (board[i] === "") {
              board[i] = "X";
              let score = this.minimax(board, depth + 1, true);
              board[i] = "";
              bestScore = Math.min(score, bestScore);
          }
      }
      return bestScore;
  }
}


  bestMove() {
    let bestScore = -Infinity;
    let move;
  
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i] === "") {
        this.board[i] = "O"; // ให้ AI ลองเล่น
        if (this.getWinner() === "O") {
          document.getElementById(i).click(); // ชนะทันที
          return;
        }
        let score = this.minimax(this.board, 0, false);
        this.board[i] = ""; // ย้อนกลับ
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    if (move !== undefined && document.getElementById(move)) {
      console.log("Ai play", move);
      document.getElementById(move).click();
  } else {
      setTimeout(() => {
          console.warn("AI move is invalid or cell not found but Ai will random play:", move);
          console.log(this.player.currentPlayer.text);
          let a = [0, 2, 4, 6, 8, 4, 4, 4, 4];
          if(this.player.currentPlayer.text === "O")
            {document.getElementById(a[Math.floor(Math.random() * a.length)]).click();}
      }, 1050);    
      
  }
  }

  

  createBoard() {
    const game_html = `
    <div class="game_row">
      <div class="game_cell"></div>
      <div class="game_cell"></div>
      <div class="game_cell"></div>
    </div>
    <div class="game_row">
      <div class="game_cell"></div>
      <div class="game_cell"></div>
      <div class="game_cell"></div>
    </div>
    <div class="game_row">
      <div class="game_cell"></div>
      <div class="game_cell"></div>
      <div class="game_cell"></div>
    </div>
    `;

    document.querySelector('.game_container').innerHTML = game_html;

    document.querySelector(
      '.o_score'
    ).innerHTML = `${this.player.oPlayer.score}`;

    document.querySelector(
      '.x_score'
    ).innerHTML = `${this.player.xPlayer.score}`;
  }
  initialiseEventListeners() {
    document.querySelectorAll('.game_cell').forEach((cell, index) => {
      cell.id = index;

      cell.onclick = () => {

        if (!this.isOccupied(cell)) {
          // update board js
          this.board[Number(cell.id)] = this.player.currentPlayer.text;

          // update board html
          this.updateCell(cell);
          cell.classList.add('filled');

          // check winner
          const winner = this.getWinner();
          if (winner) {
            console.log(`${winner} won!`);
            if (winner === 'O') {
              this.player.oPlayer.score += 1;
            } else if (winner === 'X') {
              this.player.xPlayer.score += 1;
            }
            this.renderScore();

            this.displayMessage(winner).then(() => {
              // document.querySelectorAll('.game_cell').forEach((e) => {
              //   e.innerHTML = '';
              //   e.classList.remove('filled');
              // });
              // this.board.fill('');
            });
          }

          // change player
          this.player.changePlayer();
          // this.currentPlayerElement.innerHTML = `Current Player: ${this.player.currentPlayer.text}`;
          this.updateSwitch();

          setTimeout(() => {
            if (this.player.currentPlayer.text === "O" && this.mode === 'AI' ) {
              this.bestMove();
            }
          }, 500);
        }
      };

      cell.onmouseover = () => {
        if (!this.isOccupied(cell)) {
          // update board html
          this.updateCell(cell);
          cell.style.color = `${this.player.currentPlayer.color}4b`;
        }
      };

      cell.onmouseleave = () => {
        // update board html
        if (!this.isOccupied(cell)) {
          cell.innerHTML = '';
        }
      };
    });
  }

  updateCell(cell) {
    cell.innerHTML = this.player.currentPlayer.text;
    cell.style.color = this.player.currentPlayer.color;
  }

  renderScore() {
    document.querySelector('.x_score').innerHTML = this.player.xPlayer.score;
    document.querySelector('.o_score').innerHTML = this.player.oPlayer.score;
  }

  isOccupied(cell) {
    if (this.showMessage) return true;
    return (
      cell.classList['value'].includes('filled') &&
      this.board[Number(cell.id)] !== ''
    );
  }

  getWinner() {
    for (const win_con of Game.WIN_CONDITIONS) {
      if (
        this.board[win_con[0]] === this.board[win_con[1]] &&
        this.board[win_con[1]] === this.board[win_con[2]] &&
        this.board[win_con[0]] !== '' &&
        this.board[win_con[1]] !== '' &&
        this.board[win_con[2]] !== ''
      )
        return this.board[win_con[0]];
    }

    // the game is still ongoing
    for (const i of this.board) {
      if (i === '') return '';
    }

    // board is fully filled
    return 'draw';
  }

  async displayMessage(message) {
    const messageContainer = document.querySelector('.game_message_container');
    if (message === 'draw') {
      messageContainer.innerHTML = 'Draw!';
      messageContainer.style.background = Game.mainColor;
    } else if (message === 'X') {
      messageContainer.innerHTML = `X Win!`;
      messageContainer.style.background = Game.borderXColor;
    } else if (message === 'O') {
      messageContainer.innerHTML = `O Win!`;
      messageContainer.style.background = Game.borderOColor;
    }
    messageContainer.style.display = 'flex';
    this.showMessage = true;
    await wait(1500);
    messageContainer.innerHTML = `<br><span style="font-size: 30px; cursor: pointer;">Click to restart</span>`;
    
    messageContainer.onclick = () => {
        messageContainer.style.display = 'none';
        this.showMessage = false;
        this.newGame();
    };
  }
}

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let game = new Game(); 
