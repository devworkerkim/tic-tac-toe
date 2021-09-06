const game = (() => {
    let board = [null, null, null, null, null, null, null, null, null];
    let gameComplete = false;
    let player1Turn = true;
    const newBoard = () => {
        board = new Array(9).fill(null);
        gameComplete = false;
        document.querySelector('.moveMessage').innerText = player1Turn ? "Player X's move" : "Player O's move";
        document.querySelector('.gameMessage').innerText = 'new game'
        display();
    }
    const display = () => {
        while (document.querySelector('.gameBoard').firstChild) {
            document.querySelector('.gameBoard').removeChild(document.querySelector('.gameBoard').firstChild);
        }
        board.forEach((space, ind) => {
            const div = document.createElement('div');
            div.onclick = function() {
                player1Turn ? player1.move(ind) : player2.move(ind);
            }
            div.innerText = space ? space : '-';
            document.querySelector('.gameBoard').appendChild(div);
        })
    }

    const move = (name, type, space) => {
        if (!gameComplete) {
            if (board[space]) return 'space occupied';
            else {
                board[space] = type;
                player1Turn = !player1Turn;
                display();
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
        if (!board.filter((space) => space === null).length) {
            gameComplete = true;
            return 'game over (draw)';
        }
        else return gameComplete ? `game over: ${!player1Turn ? player1.getName() : player2.getName()} wins!` : 'continue';
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
const player1 = Player('player1', 'X');
document.querySelector('#player1Name').value = player1.getName();
const player2 = Player('player2', 'O');
document.querySelector('#player2Name').value = player2.getName();

document.querySelector('#player1Name').addEventListener('input', () => player1.setName(document.querySelector('#player1Name').value));
document.querySelector('#player2Name').addEventListener('input', () => player2.setName(document.querySelector('#player2Name').value));

document.querySelector('#newGame').addEventListener('click', () => game.newBoard());