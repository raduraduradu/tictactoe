/*gameboard = [
['', '', ''],
['', '', ''],
['', '', '']
];
*/


const board = (function () {
  //initialize 3x3 2d array for gameboard
  const grid = [];
  for(let i = 0; i < 3; i++){
    grid[i] = [];
    for(let j = 0; j < 3; j++){
      grid[i][j] = '';
    }
  }
  const add = (symbol, row, col) => grid[row][col] = symbol;

  const getGrid = () => grid;

  return {add, getGrid};
})();


function createPlayer (symbol) {
  const add = (row, col) => board.add(symbol, row, col);
  return {add}
}
playerX = createPlayer('X');
playerO = createPlayer('0');

const game = (function () {
  const getInput = () => {
    let row = 0;
    console.log("input has to be an integer from 0 to 2");
    do {
      row = Number(prompt("row: "));
    }while(!isNaN(row) && input >= 0 && row <= 2)
    
    let column = 0;
    do {
      col = Number(prompt("column: "));
    }while(!isNaN(col) && col >= 0 && col <= 2)

    return {row, col};
  }

  const checkWin = () => {
    
  }

  const playRound = (player) => {
    console.log(`\n${player}'s turn`);
    let input = getInput();
    player.add(input.row, input.col);
  }

  const playGame = () => {

  }

  return {playGame}
})();
