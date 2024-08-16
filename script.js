const board = (function () {
    //initialize 3x3 2d array for gameboard
    const grid = [];
    for(let i = 0; i < 3; i++){
        grid[i] = [];
        for(let j = 0; j < 3; j++){
            grid[i][j] = '';
        }
    }
    const checkDraw = () => {
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                //empty cell found => not a draw
                if (grid[i][j] == '') {
                    return false;
                }
            }
        }
        //if there are no more empty cells
        return true;
    }

    //checks a pattern of 3 cells based on the coordinates passed as arguments
    //takes three arrays as arguments, each represents a row-column pair
    const checkPattern = (cellOne, cellTwo, cellThree) => {
        if(grid [cellOne[0]] [cellOne[1]] == symbol &&
            grid [cellTwo[0]] [cellTwo[1]] == symbol &&
            grid [cellThree[0]] [cellThree[1]] == symbol) {
                return true;
        }
    }

    const checkWin = (symbol) => {
        //diagonals
        if(checkPattern([0,0], [1,1], [2,2]) || checkPattern([2,0], [1,1], [0,2])){
            return true;
        }

        for(let i = 0; i < 3; i++){
            //vertical pattern
            if(checkPattern([0,i], [1,i], [2,i])) {
                return true;
            }

            //horizontal pattern
            if(checkPattern([i,0], [i,1], [i,2])) {
                return true;
            }
        }
        return false;
    }

    return {grid, checkDraw, checkWin}
})();




const displayController = (function () {
    const cells = document.querySelector(".container div");
    const htmlBoard = [];
    let i = 0; //i will be the index used for the cells nodeList, j and k will be used to copy the elements inside a 2d array
    for(let j = 0; j < 3; j++) {
        htmlBoard[j] = [];
        for(let k = 0; k < 3; k++) {
            htmlBoard[j][k] = cells[i];
            i++;
        }
    }
    return {htmlBoard}
})();

function createPlayer (symbol){
    const add = (row, col) => {
        board.grid[row][col] = symbol;
        displayController.htmlBoard[row][col].textContent = symbol;
    }
    const getSymbol = () => symbol;

    return {add, getSymbol}
}
playerX = createPlayer('X');
playerO = createPlayer('0');


const game = (function () {
    const playRound = (player) => {

    }
})();


let cells = document.querySelector(".container div");
cells.forEach((cell) => cell.addEventListener("click", () => {
  
});
