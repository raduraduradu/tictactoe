const cells = document.querySelectorAll(".container div");

const board = (function () {
    //initialize 3x3 2d array for gameboard and assign id's to their corresponding html elements
    //id's will be two digits representing the row and column of their cell
    let cellIndex = 0;
    const grid = [];
    for(let i = 0; i < 3; i++){
        grid[i] = [];
        for(let j = 0; j < 3; j++){
            grid[i][j] = '';
            cells[cellIndex].id = `${i}${j}`;
            cellIndex++;
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
    
    const checkWin = (symbol) => {
        //checks a pattern of 3 cells based on the coordinates passed as arguments
        //takes three arrays as arguments, each represents a row-column pair
        const checkPattern = (cellOne, cellTwo, cellThree) => {
            if(grid [cellOne[0]] [cellOne[1]] == symbol &&
                grid [cellTwo[0]] [cellTwo[1]] == symbol &&
                grid [cellThree[0]] [cellThree[1]] == symbol) {
                    return true;
            }
        }

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
    const updateBoard = () => {
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                document.getElementById(`${i}${j}`).textContent = board.grid[i][j];
            }
        }
    }
    const msgElement = document.querySelector("#message");
    const message = (str) => {
        msgElement.textContent = str;
    }
    currentTurnElement = document.querySelector("#current-turn");
    updateTurn = (symbol) => {
        currentTurnElement.textContent = `current turn: ${symbol}`;
    }
    return {updateBoard, message, cells, updateTurn}
})();

function createPlayer (symbol){
    const add = (row, col) => {
        board.grid[row][col] = symbol;
    }
    const getSymbol = () => symbol;

    return {add, getSymbol}
}
playerX = createPlayer('X');
playerO = createPlayer('0');


const game = (function () {
    let currentTurn = playerX;

    const disableBtns = () => {
        for(let i = 0; i < cells.length; i++) {
            cells[i].classList.add("disabled")
        }
    }
    const enableBtns = () => {
        for(let i = 0; i < cells.length; i++) {
            cells[i].classList.remove("disabled")
        }
    }

    const playRound = (cell) => {
        let cellRow = cell.id[0];
        let cellCol = cell.id[1];

        //do nothing if cell is already occupied
        if(board.grid[cellRow][cellCol] !== ''){
            return;
        }
        currentTurn.add(cellRow, cellCol);

        if(board.checkWin(currentTurn.getSymbol()) == true) {
            displayController.message(`player ${currentTurn.getSymbol()} wins!`);
            disableBtns();
        }
        else if(board.checkDraw() == true){
            displayController.message("It's a draw!");
            disableBtns();
        };
        displayController.updateBoard();
        
        if(currentTurn == playerX) {
            currentTurn = playerO;
        }
        else {
            currentTurn = playerX;
        }
        displayController.updateTurn(currentTurn.getSymbol());
    }
    return {playRound, enableBtns}
})();


for(let i = 0; i < cells.length; i++){
    cells[i].addEventListener("click", (e) => {
        if(cells[i].classList.contains("disabled")) {
            return;
        }
        game.playRound(e.target);
    });
};

document.querySelector("button#reset").addEventListener("click", () => {
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            board.grid[i][j] = '';
        }
    }
    displayController.updateBoard();
    game.enableBtns();
    displayController.message('');
})
