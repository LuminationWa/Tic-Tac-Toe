// Global elements
let count = 0;
const gameBoard = document.getElementById('game-board');
const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', function() {resetGame()});

function removeElementsByClass(className){
    // Generic function to remove all elements with the same class
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function makeBoard() {
    // Creates 9 identical cells inside the grid
    for (let i = 0; i < 9; i++) {
    let cell = document.createElement('button');
    cell.classList.add('cell');
    cell.id = 'cell' + i;
    cell.addEventListener('click', function() {
        game().gameLogic(cell.id)
    });
    gameBoard.appendChild(cell);
};
}

function resetGame() {
    // Removes all cells, resets text and classes of the display, sets the count to 0 again and makes a new board.
    removeElementsByClass('cell');
    let display = document.getElementById('display');
    let displayText = document.getElementById('display-text');
    displayText.textContent = '';
    display.classList.remove('displayResult');
    count = 0;
    makeBoard();
}

const game = (() => {
    // Array with available choices
    const gameBoard = ['x', 'o','x', 'o','x', 'o','x', 'o','x'];
    const gameResult = (winningMark) => {
        // Takes the winning mark from the checkResult function and adjusts the display to it.
        let display = document.getElementById('display');
        let displayText = document.getElementById('display-text');
        switch(winningMark) {
            case 'x':
                displayText.textContent = 'Player X wins';
                display.classList.add('displayResult');
                // Count = 9 makes the game stop
                count = 9;
                break;
            case 'o':
                displayText.textContent = 'Player O wins';
                display.classList.add('displayResult');      
                count = 9;
                break;         
        }
    }
    const checkResult = () => {
        let displayText = document.getElementById('display-text');
        let cell0 = document.getElementById('cell0');
        let cell1 = document.getElementById('cell1');
        let cell2 = document.getElementById('cell2');
        let cell3 = document.getElementById('cell3');
        let cell4 = document.getElementById('cell4');
        let cell5 = document.getElementById('cell5');
        let cell6 = document.getElementById('cell6');
        let cell7 = document.getElementById('cell7');
        let cell8 = document.getElementById('cell8');
        // Checks if there's three marks placed in a row and passes it to gameResult()
        if (cell4.textContent === cell0.textContent && cell0.textContent == cell8.textContent ||
            cell4.textContent === cell6.textContent && cell6.textContent == cell2.textContent ||
            cell4.textContent === cell1.textContent && cell7.textContent == cell1.textContent ||
            cell4.textContent === cell3.textContent && cell3.textContent == cell5.textContent) {
                gameResult(cell4.textContent);
        } else if (cell2.textContent === cell5.textContent && cell5.textContent == cell8.textContent) {
            gameResult(cell2.textContent);
        } else if (cell0.textContent === cell3.textContent && cell3.textContent == cell6.textContent) {
            gameResult(cell0.textContent);
        } else if (cell0.textContent === cell1.textContent && cell1.textContent == cell2.textContent) {
            gameResult(cell0.textContent);
        } else if (cell6.textContent === cell7.textContent && cell7.textContent == cell8.textContent){
            gameResult(cell6.textContent);
        };
        if (displayText.textContent == '' && count == 9) {
            displayText.textContent = "It's a draw!";
            return;
        }
    }
    const gameLogic = (id) => {    
        checkResult();
        let cell = document.getElementById(id);
        // If the the cell hasn't been marked yet places the corresponding mark there and updates count.
        if (cell.textContent === '') {
            cell.textContent = gameBoard[count];
            cell.classList.add(`${gameBoard[count]}Mark`);
            count++
        }
        checkResult();
        
    }
    return {
        gameBoard,
        gameResult,
        checkResult,
        gameLogic,
    };
});

makeBoard();

