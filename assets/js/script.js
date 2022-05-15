let gameArea = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let player = '';
let warning = '';
let playing = false;

reset();

document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(e => {
    e.addEventListener('click', itemClick,);
});

function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    
    if(playing && gameArea[item] === '') {
        gameArea[item] = player;
        renderGameArea();
        togglePlayer();
    }
}

function reset() {
    warning = '--';    
    let random = Math.floor(Math.random() * 2);
    
    if(random === 0) {
        player = 'x';
    } else {
        player = 'o';
    }

    for(let i in gameArea) {
        gameArea[i] = '';
    }
    
    playing = true;

    renderGameArea();
    renderInfo();
}

function renderGameArea() {
    for(let i in gameArea) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = gameArea[i];
    }

    checkGame();
}

function renderInfo() {
    document.querySelector('.infoArea .left span').innerHTML = player;
    document.querySelector('.infoArea .right span').innerHTML = warning;
}

function togglePlayer() {
    if(player === 'x') {
        player = 'o';
    } else {
        player = 'x';
    }

    renderInfo();
}

function checkGame() {
    if(checkWinnerFor('x')) {
        warning = '"x" é o vencedor!';
        playing = false;
    } else if(checkWinnerFor('o')) {
        warning = '"o" é o vencedor!'
        playing = false;
    } else if(isFull()) {
        warning = 'Deu empate!';
        playing = false;
    }
}

function checkWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',
        
        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in pos) {
        let pArray = pos[w].split(',');
        let hasWon = pArray.every(option => gameArea[option] === player);
        
        if(hasWon) {
            return true;
        }
    }

    return false;
}

function isFull() {
    for(let i in gameArea) {        
        if(gameArea[i] === '') {
            return false;
        }
    }

    return true;
}