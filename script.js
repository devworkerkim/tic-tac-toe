const game = (() => {
    let board = ['','','','','','','','',''];
    let gameComplete = false;
    let player1Turn = true;
    const newBoard = () => {
        board = new Array(9).fill('');
        gameComplete = false;
        document.querySelector('.moveMessage').innerText = player1Turn ? "Player X's move" : "Player O's move";
        document.querySelector('.gameMessage').innerText = "New game! Let's play!"
        display();
    }
    const display = (markedSpace) => {
        while (document.querySelector('.gameBoard').firstChild) {
            document.querySelector('.gameBoard').removeChild(document.querySelector('.gameBoard').firstChild);
        }
        board.forEach((space, ind) => {
            const div = document.createElement('div');
            div.setAttribute('value', ind);
            div.setAttribute('tabindex', '0')
            div.onclick = function() {
                player1Turn ? player1.move(ind) : player2.move(ind);
            }
            div.onkeyup = function(e) {
                if (e.code === "Space" || e.code === "Enter" || e.code === "NumpadEnter") {
                    document.querySelector(`div[value="${ind}"]`).click();
                }
            }
            const span = document.createElement('span');
            if (ind === markedSpace) span.classList.add('spin-in');
            span.innerText = space ? space : '';
            div.appendChild(span);
            document.querySelector('.gameBoard').appendChild(div);
        })
    }

    const move = (name, type, space) => {
        if (!gameComplete) {
            if (board[space]) return `Space is occupied. ${player1Turn ? "Player X's" : "Player O's"} move`;
            else {
                board[space] = type;
                player1Turn = !player1Turn;
                display(space);
            }
            document.querySelector('.gameMessage').innerText = check();
            return `${name} marked ${type} on space ${space}`;
        }
        else return 'Press "New Game" to play again';
    }

    const check = () => {
        checkArr = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        checkArr.forEach((combo) => {
            if (board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
                if (board[combo[0]]) gameComplete = true;
            }
        });
        if (!board.filter((space) => space === '').length && !gameComplete) {
            gameComplete = true;
            return 'Game over (draw)';
        }
        else return gameComplete ? `Game over: ${!player1Turn ? player1.getName() : player2.getName()} wins!` : 'Play continues';
    }

    return { newBoard, move, check }
})();

const Player = (name, type) => {
    const getName = () => name;
    const setName = (newName) => name = newName;
    const getType = () => type;
    const setType = (newType) => type = newType;

    const move = (space) => {
        document.querySelector('.moveMessage').innerText = game.move(getName(), getType(), space);
    }
    return { getName, setName, getType, setType, move }
}
game.newBoard();
const player1 = Player('Player 1', 'X');
document.querySelector('#player1Name').value = player1.getName();
const player2 = Player('Player 2', 'O');
document.querySelector('#player2Name').value = player2.getName();

document.querySelector('#player1Name').addEventListener('input', () => player1.setName(document.querySelector('#player1Name').value));
document.querySelector('#player2Name').addEventListener('input', () => player2.setName(document.querySelector('#player2Name').value));

document.querySelector('#newGame').addEventListener('click', () => game.newBoard());