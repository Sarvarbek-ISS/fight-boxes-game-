// const btn = document.getElementById("btn");
// const input = document.getElementById("input")
// const birliklar = ['', 'bir', "ikki", "uch", "to'rt", "besh", "olti", "yetti", "sakkiz", "to'qqiz"]
// const onliklar = ['', "o'n", "o'n bir", "o'n ikki", "o'n uch", "o'n to'rt", "o'n besh", "o'n olti", "o'n yetti", "o'n sakkiz", "o'n to'qqiz"]

// btn.addEventListener("click", fun)

// function fun(){
//     let son = input.value

//     if(son > 9 & son < 100){
//         let birlik = son % 10
//         let onlik = (son - birlik) / 10

//         console.log(onliklar[onlik], birliklar[birlik]);
//     }
//     else if(son >= 100 && son < 1000 ){
//         let birlik = son % 10
//         let onlik = (son - birlik) / 10 % 10
//         let yuzlik = (son - birlik - onlik * 10) / 100

//         console.log(birliklar[yuzlik] + "yuz", onliklar[onlik], birlik[birlik]);
//     }

    
// else console.log(birliklar[son])
// }

// function Podqusdosh(ismi, boyi, qobilyati, xarakteri, sochhinirangi,){
//     this.ismi = ismi
//     this.boyi = boyi
//     this.qobilyati = qobilyati
//     this.xarakteri = xarakteri
//     this.sochhinirangi = sochhinirangi
// }

// const Farida = 



const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const player1Hearts = document.getElementById('player1-hearts');
const player2Hearts = document.getElementById('player2-hearts');
const resultText = document.getElementById('result');

// Boshlang'ich pozitsiyalar va sog'liq
let player1Position = { x: 50, y: window.innerHeight - 150 };
let player2Position = { x: window.innerWidth - 100, y: window.innerHeight - 150 };
let player1Health = 10;  // Yuraklar soni
let player2Health = 10;  // Yuraklar soni
let speed = 20;  // Tezlikni oshirish uchun qadam kattaligi
let round = 1;
let maxRounds = 3;
let gameOver = false;

// Tugma holatini kuzatish
const keys = {};

// Tugmalarni bosish va qo‘yishni kuzatish
document.addEventListener('keydown', (event) => {
    keys[event.key] = true; // Tugma bosildi deb belgilanadi
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false; // Tugma qo‘yildi deb belgilanadi
});

// O'yinni har doim yangilab turish uchun interval
setInterval(() => {
    if (gameOver) return;

    // Player 1 harakatlari
    if (keys['w']) player1Position.y = Math.max(0, player1Position.y - speed); // Yuqoriga
    if (keys['s']) player1Position.y = Math.min(window.innerHeight - 100, player1Position.y + speed); // Pastga
    if (keys['a']) player1Position.x = Math.max(0, player1Position.x - speed); // Chapga
    if (keys['d']) player1Position.x = Math.min(window.innerWidth - 50, player1Position.x + speed); // O'ngga
    if (keys['f']) attack(player1, player2, player1Position, player2Position); // Hujum

    // Player 2 harakatlari
    if (keys['ArrowUp']) player2Position.y = Math.max(0, player2Position.y - speed); // Yuqoriga
    if (keys['ArrowDown']) player2Position.y = Math.min(window.innerHeight - 100, player2Position.y + speed); // Pastga
    if (keys['ArrowLeft']) player2Position.x = Math.max(0, player2Position.x - speed); // Chapga
    if (keys['ArrowRight']) player2Position.x = Math.min(window.innerWidth - 50, player2Position.x + speed); // O'ngga
    if (keys['l']) attack(player2, player1, player2Position, player1Position); // Hujum

    updatePositions();
}, 50); // Harakatni har 50ms da yangilash

// Pozitsiyalarni yangilash funksiyasi
function updatePositions() {
    player1.style.left = player1Position.x + 'px';
    player1.style.top = player1Position.y + 'px';

    player2.style.left = player2Position.x + 'px';
    player2.style.top = player2Position.y + 'px';

    // Yuraklarni yangilash
    player1Hearts.innerHTML = '❤️'.repeat(player1Health);
    player2Hearts.innerHTML = '❤️'.repeat(player2Health);
}

// Hujum qilish funksiyasi
function attack(attacker, defender, attackerPos, defenderPos) {
    if (Math.abs(attackerPos.x - defenderPos.x) < 60 && Math.abs(attackerPos.y - defenderPos.y) < 100) {
        if (attacker === player1) {
            player2Health = Math.max(0, player2Health - 1); // Yurakcha kamayadi
            player2.style.backgroundColor = 'yellow'; // Zarar yetkazish sariq rangga
            setTimeout(() => player2.style.backgroundColor = 'blue', 300); // 0.3 sekunddan keyin eski rangga qaytish
            if (player2Health === 0) declareWinner('Player 1');
        } else {
            player1Health = Math.max(0, player1Health - 1); // Yurakcha kamayadi
            player1.style.backgroundColor = 'yellow'; // Zarar yetkazish sariq rangga
            setTimeout(() => player1.style.backgroundColor = 'red', 300); // 0.3 sekunddan keyin eski rangga qaytish
            if (player1Health === 0) declareWinner('Player 2');
        }
    }
}

// G'olibni e'lon qilish funksiyasi
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

// O'yinni qayta boshlash funksiyasi
function resetRound() {
    player1Position = { x: 50, y: window.innerHeight - 150 };
    player2Position = { x: window.innerWidth - 100, y: window.innerHeight - 150 };
    player1Health = 10; // Yuraklar soni 10 ga qaytadi
    player2Health = 10; // Yuraklar soni 10 ga qaytadi
    updatePositions();
    setTimeout(() => resultText.style.display = 'none', 2000); // 2 sekunddan so'ng natijani yashirish
}

// Hujum uchun cool-down (bir martalik ishlashni ta'minlash)
let player1CanAttack = true; // Player 1 uchun hujum tugmasi faolmi
let player2CanAttack = true; // Player 2 uchun hujum tugmasi faolmi

// Hujum qilish funksiyasi yangilangan
function attack(attacker, defender, attackerPos, defenderPos, attackerCooldown, defenderCooldownKey) {
    if (!attackerCooldown) return; // Agar hujum uchun imkon bo'lmasa, hech nima qilmaydi

    if (Math.abs(attackerPos.x - defenderPos.x) < 60 && Math.abs(attackerPos.y - defenderPos.y) < 100) {
        if (attacker === player1) {
            player2Health = Math.max(0, player2Health - 1); // Player 2 yuragini kamaytirish
            player2.style.backgroundColor = 'yellow'; // Sariq rang
            setTimeout(() => player2.style.backgroundColor = 'blue', 300); // Asl rangga qaytarish
            player1CanAttack = false; // Player 1 hujumni bloklash
            setTimeout(() => (player1CanAttack = true), 500); // 0.5 sekunddan so'ng qayta hujum qilish imkoniyati
            if (player2Health === 0) declareWinner('Player 1');
        } else {
            player1Health = Math.max(0, player1Health - 1); // Player 1 yuragini kamaytirish
            player1.style.backgroundColor = 'yellow'; // Sariq rang
            setTimeout(() => player1.style.backgroundColor = 'red', 300); // Asl rangga qaytarish
            player2CanAttack = false; // Player 2 hujumni bloklash
            setTimeout(() => (player2CanAttack = true), 500); // 0.5 sekunddan so'ng qayta hujum qilish imkoniyati
            if (player1Health === 0) declareWinner('Player 2');
        }
    }
}

// Interval ichida hujum tugmalarini kuzatib turish
setInterval(() => {
    if (gameOver) return;

    // Player 1 hujum (faqat bir martalik)
    if (keys['f'] && player1CanAttack) {
        attack(player1, player2, player1Position, player2Position, player1CanAttack, 'player1CanAttack');
    }

    // Player 2 hujum (faqat bir martalik)
    if (keys['l'] && player2CanAttack) {
        attack(player2, player1, player2Position, player1Position, player2CanAttack, 'player2CanAttack');
    }

    // Harakatlar yangilanadi
    updatePositions();
}, 50);
// Zamin va o'yinchilarning boshlang'ich holati
const groundHeight = 50; // Yerning balandligi
const jumpHeight = 120; // Sakrash balandligi
let player1IsJumping = false; // Player 1 sakrayaptimi
let player2IsJumping = false; // Player 2 sakrayaptimi

// O'yinchilarni harakatlantirish
setInterval(() => {
    if (gameOver) return;

    // Player 1 harakatlari
    if (keys['w'] && !player1IsJumping) {
        player1IsJumping = true; // Sakrashni boshlash
        player1.style.bottom = groundHeight + jumpHeight + 'px'; // Sakrash
        setTimeout(() => {
            player1.style.bottom = groundHeight + 'px'; // Pastga qaytish
            player1IsJumping = false; // Sakrash tugadi
        }, 500);
    }
    if (keys['a']) player1Position.x = Math.max(0, player1Position.x - speed); // Chapga
    if (keys['d']) player1Position.x = Math.min(window.innerWidth - 50, player1Position.x + speed); // O'ngga

    // Player 2 harakatlari
    if (keys['ArrowUp'] && !player2IsJumping) {
        player2IsJumping = true; // Sakrashni boshlash
        player2.style.bottom = groundHeight + jumpHeight + 'px'; // Sakrash
        setTimeout(() => {
            player2.style.bottom = groundHeight + 'px'; // Pastga qaytish
            player2IsJumping = false; // Sakrash tugadi
        }, 500);
    }
    if (keys['ArrowLeft']) player2Position.x = Math.max(0, player2Position.x - speed); // Chapga
    if (keys['ArrowRight']) player2Position.x = Math.min(window.innerWidth - 50, player2Position.x + speed); // O'ngga

    updatePositions();
}, 50);

// Hujum funksiyasi o'zgarmaydi
function attack(attacker, defender, attackerPos, defenderPos, attackerCooldown, defenderCooldownKey) {
    if (!attackerCooldown) return;

    if (Math.abs(attackerPos.x - defenderPos.x) < 60 && Math.abs(attackerPos.y - defenderPos.y) < 100) {
        // Zarar yetkazish
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
