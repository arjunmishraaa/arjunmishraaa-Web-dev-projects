let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

const btns = ["red", "yellow", "purple", "green"];
const h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if (!started) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 100);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 100);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);  // Corrected range to 4
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length ==gameSeq.length) {
            setTimeout(levelUp, 300);
        }
    } else {
        h2.innerText = `Game Over!! Your score is ${level }. Press any key to start again!`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        restart();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {  // Added 'let' to declare 'btn' in the loop
    btn.addEventListener("click", btnPress);
}

function restart() {
    started = false;
    level = 0;
    userSeq = [];
    gameSeq = [];
}
