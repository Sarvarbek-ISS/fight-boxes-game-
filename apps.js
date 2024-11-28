const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const player1Hearts = document.getElementById('player1-hearts');
const player2Hearts = document.getElementById('player2-hearts');
const resultText = document.getElementById('result');

let player1Position = { x: 50, y: window.innerHeight - 150 };
let player2Position = { x: window.innerWidth - 100, y: window.innerHeight - 150 };
let player1Health = 10;
let player2Health = 10;  
let speed = 20;
let round = 1;
let maxRounds = 3;
let gameOver = false;

const keys = {};

document.addEventListener('keydown', (event) => {
    keys[event.key] = true; 
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false; 
});

setInterval(() => {
    if (gameOver) return;

    // Player 1 harakatlari
    if (keys['w']) player1Position.y = Math.max(0, player1Position.y - speed);
    if (keys['s']) player1Position.y = Math.min(window.innerHeight - 100, player1Position.y + speed);
    if (keys['a']) player1Position.x = Math.max(0, player1Position.x - speed);
    if (keys['d']) player1Position.x = Math.min(window.innerWidth - 50, player1Position.x + speed); 
    if (keys['f']) attack(player1, player2, player1Position, player2Position);

    if (keys['ArrowUp']) player2Position.y = Math.max(0, player2Position.y - speed); 
    if (keys['ArrowDown']) player2Position.y = Math.min(window.innerHeight - 100, player2Position.y + speed); 
    if (keys['ArrowLeft']) player2Position.x = Math.max(0, player2Position.x - speed);
    if (keys['ArrowRight']) player2Position.x = Math.min(window.innerWidth - 50, player2Position.x + speed); 
    if (keys['l']) attack(player2, player1, player2Position, player1Position);

    updatePositions();
}, 50); 
function updatePositions() {
    player1.style.left = player1Position.x + 'px';
    player1.style.top = player1Position.y + 'px';

    player2.style.left = player2Position.x + 'px';
    player2.style.top = player2Position.y + 'px';


    player1Hearts.innerHTML = '❤️'.repeat(player1Health);
    player2Hearts.innerHTML = '❤️'.repeat(player2Health);
}

function attack(attacker, defender, attackerPos, defenderPos) {
    if (Math.abs(attackerPos.x - defenderPos.x) < 60 && Math.abs(attackerPos.y - defenderPos.y) < 100) {
        if (attacker === player1) {
            player2Health = Math.max(0, player2Health - 1);
            player2.style.backgroundColor = 'yellow'; 
            setTimeout(() => player2.style.backgroundColor = 'blue', 300)
            if (player2Health === 0) declareWinner('Player 1');
        } else {
            player1Health = Math.max(0, player1Health - 1);
            player1.style.backgroundColor = 'yellow';
            setTimeout(() => player1.style.backgroundColor = 'red', 300);
            if (player1Health === 0) declareWinner('Player 2');
        }
    }
}

function declareWinner(winner) {
    if (round < maxRounds) {
        resultText.textContent = `${winner} g'olib bo'ldi! Raund ${round} tugadi!`;
        resultText.style.display = 'block';
        round++;
        resetRound();
    } else {
        resultText.textContent = `${winner} g'olib bo'ldi! O'yin tugadi!`;
        resultText.style.display = 'block';
        gameOver = true;
    }
}


function resetRound() {
    player1Position = { x: 50, y: window.innerHeight - 150 };
    player2Position = { x: window.innerWidth - 100, y: window.innerHeight - 150 };
    player1Health = 10;
    player2Health = 10;
    updatePositions();
    setTimeout(() => resultText.style.display = 'none', 2000);
}


let player1CanAttack = true; 
let player2CanAttack = true;


function attack(attacker, defender, attackerPos, defenderPos, attackerCooldown, defenderCooldownKey) {
    if (!attackerCooldown) return; 

    if (Math.abs(attackerPos.x - defenderPos.x) < 60 && Math.abs(attackerPos.y - defenderPos.y) < 100) {
        if (attacker === player1) {
            player2Health = Math.max(0, player2Health - 1); 
            player2.style.backgroundColor = 'yellow'; 
            setTimeout(() => player2.style.backgroundColor = 'blue', 300);
            player1CanAttack = false; 
            setTimeout(() => (player1CanAttack = true), 500); 
            if (player2Health === 0) declareWinner('Player 1');
        } else {
            player1Health = Math.max(0, player1Health - 1); 
            player1.style.backgroundColor = 'yellow'; 
            setTimeout(() => player1.style.backgroundColor = 'red', 300); 
            player2CanAttack = false; 
            setTimeout(() => (player2CanAttack = true), 500); 
            if (player1Health === 0) declareWinner('Player 2');
        }
    }
}


setInterval(() => {
    if (gameOver) return;
    if (keys['f'] && player1CanAttack) {
        attack(player1, player2, player1Position, player2Position, player1CanAttack, 'player1CanAttack');
    }
    if (keys['l'] && player2CanAttack) {
        attack(player2, player1, player2Position, player1Position, player2CanAttack, 'player2CanAttack');
    }
    
    updatePositions();
}, 50);

const groundHeight = 50; 
const jumpHeight = 120; 
let player1IsJumping = false;
let player2IsJumping = false;


setInterval(() => {
    if (gameOver) return;


    if (keys['w'] && !player1IsJumping) {
        player1IsJumping = true; 
        player1.style.bottom = groundHeight + jumpHeight + 'px';
        setTimeout(() => {
            player1.style.bottom = groundHeight + 'px';
            player1IsJumping = false;
        }, 500);
    }
    if (keys['a']) player1Position.x = Math.max(0, player1Position.x - speed); 
    if (keys['d']) player1Position.x = Math.min(window.innerWidth - 50, player1Position.x + speed); 


    if (keys['ArrowUp'] && !player2IsJumping) {
        player2IsJumping = true; 
        player2.style.bottom = groundHeight + jumpHeight + 'px'; 
        setTimeout(() => {
            player2.style.bottom = groundHeight + 'px'; 
            player2IsJumping = false; 
        }, 500);
    }
    if (keys['ArrowLeft']) player2Position.x = Math.max(0, player2Position.x - speed);
    if (keys['ArrowRight']) player2Position.x = Math.min(window.innerWidth - 50, player2Position.x + speed);

    updatePositions();
}, 50);


function attack(attacker, defender, attackerPos, defenderPos, attackerCooldown, defenderCooldownKey) {
    if (!attackerCooldown) return;

    if (Math.abs(attackerPos.x - defenderPos.x) < 60 && Math.abs(attackerPos.y - defenderPos.y) < 100) {
        
        if (attacker === player1) {
            player2Health = Math.max(0, player2Health - 1);
            player2.style.backgroundColor = 'yellow';
            setTimeout(() => player2.style.backgroundColor = 'blue', 300);
            player1CanAttack = false;
            setTimeout(() => (player1CanAttack = true), 500);
            if (player2Health === 0) declareWinner('Player 1');
        } else {
            player1Health = Math.max(0, player1Health - 1);
            player1.style.backgroundColor = 'yellow';
            setTimeout(() => player1.style.backgroundColor = 'red', 300);
            player2CanAttack = false;
            setTimeout(() => (player2CanAttack = true), 500);
            if (player1Health === 0) declareWinner('Player 2');
        }
    }
}
