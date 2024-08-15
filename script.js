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
  const getSymbol = () => symbol;
  return {add, getSymbol};
}
playerX = createPlayer('X');
playerO = createPlayer('0');

const game = (function () {
  const getInput = () => {
    let row = -1;
    console.log("input has to be an integer from 0 to 2");
    do {
      row = Number(prompt("row: "));
    }while(isNaN(row) || row < 0 || row > 2)
    
    let col = -1;
    do {
      col = Number(prompt("column: "));
    }while(isNaN(col) || col < 0 || col > 2)

    if(board.getGrid()[row][col] != ''){
      console.log("cell is already occupied");
      return getInput()
    }

    return {row, col};
  }


  const isDraw = () => {
    grid = board.getGrid();
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        //empty space found => not a draw
        if (grid[i][j] == ''){
          return false;
        }
      }
    }
    //if no empty square is found
    return true;
  }

  const checkWin = (player) => {
    let grid = board.getGrid()
    let symbol = player.getSymbol();
    //diagonal 1
    if(grid[0][0] == symbol && grid[1][1] == symbol && grid[2][2] == symbol){
      return true;
    }
    
    //diagonal 2
    if(grid[2][0] == symbol && grid[1][1] == symbol && grid[0][2] == symbol){
      return true;
    }
    
    for(let i = 0; i < 3; i++){
      //vertical pattern
      if(grid[0][i] == symbol && grid[1][i] == symbol && grid[2][i] == symbol){
        return true;
      }
      //horizontal pattern
      if(grid[i][0] == symbol && grid[i][1] == symbol && grid[i][2] == symbol){
        return true;
      }
    }
    return false;
  }


  let gameOver = false;

  const playRound = (player) => {
    console.table(board.getGrid());
    console.log(`\n${player.getSymbol()}'s turn`);
    let input = getInput();
    player.add(input.row, input.col);
    if(checkWin(player)){
      console.log(`${player.getSymbol()} won`);
      gameOver = true;
    };
    if(isDraw()){
      console.log("Draw");
      gameOver = true;
    }
  }

  const play = () => {
    let player = undefined;
    for(let i = 0; !gameOver; i++){
      if(i % 2 == 0){
        player = playerX;
      }
      else{
        player = playerO;
      }
      playRound(player);
    }
  }

  return {play}
})();

