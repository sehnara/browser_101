'use strict'

const startButton = document.querySelector('.game__button');
const timer__text = document.querySelector('.game__timer');
const count__text = document.querySelector('.game__score');
const resultBoard = document.querySelector('.result');
const resultText = document.querySelector('.result__text');
const field = document.querySelector('.field');
const replayButton = document.querySelector('.result__replay-button');

// audio
const bgSound = new Audio('./sound/bg.mp3');
const bugPullSound = new Audio('./sound/bug_pull.mp3');
const carrotPullSound = new Audio('./sound/carrot_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');
const failSound = new Audio('./sound/alert.wav');

let CARROT_COUNT = 10; // carrot 초기화 
let BUG_COUNT = 10;  // bug 초기화

// 
let started = false;
let score = 0;
let timer = 10; 

startButton.addEventListener('click', (e)=>{
    if(started){
        stopGame();
    }
    else{
        startGame();
    }    
    started = !started;
})

replayButton.addEventListener('click', (e)=>{
    stopGame()
})

field.addEventListener('click', e => {
    const target = e.target.alt;
    if(target !== 'carrot' && target !== 'bug') return
    
    // 1) click carrot
    if(target === 'carrot'){
        carrotPullSound.play();
        field.removeChild(e.target.parentNode)
        count--;        
        setCount(count)
        if(count === 0){
            winSound.play();
            clearInterval(timer);
            resultText.innerText='YOU WON!!'
            resultBoard.classList.add('visible');
        }
    }
    // 2) click bug
    else { 
        bugPullSound.play();
        clearInterval(timer);
        failSound.play();
        resultText.innerText='YOU LOSE!!'
        resultBoard.classList.add('visible');
        return;
    }
})

function startGame(){
    initGame();
    showStopButton();
    showTimerAndScore();

    setCount(CARROT_COUNT)
    setTimer(timer)
}

function stopGame(){    
    initGame()
    setCount(CARROT_COUNT)
    setTimer(timer)
}

function initGame(){  
    // 초기화    
    clearInterval(timer);    
    count__text.innerText = CARROT_COUNT
    field.innerHTML='';
    
    // 벌레, 당근 생성
    setObj('./img/bug.png',BUG_COUNT)    
    setObj('./img/carrot.png',CARROT_COUNT)    
}

function showStopButton(){
    startButton.innerHTML= '<i class="fa-solid fa-stop"></i>'  
}

function showTimerAndScore(){
    timer__text.style.visibility = "visible"
    count__text.style.visibility = "visible"
}


function setObj(img,number){
    const fieldRect = field.getBoundingClientRect();    
    const seperator = img.split('/')[2].split('.')[0];

    for (let i = 0; i < number; i++) {
        const x = Math.round(Math.random()*(fieldRect.width-100));
        const y = Math.round(Math.random()*(fieldRect.height-100));    
        
        const bug = document.createElement('button');        
        bug.setAttribute('class', 'bug');
        bug.innerHTML =`<img src="${img}" alt="${ seperator === 'bug'? 'bug' : 'carrot'}">`

        bug.style.transform = `translate(${x}px,${y}px)`;        
        field.append(bug)
    }
}

function setTimer(s){    
    let second = s-1
    let msc = 10
    timer = setInterval(()=>{
        if(second < 0) {
            failSound.play();
            resultText.innerText='Time Over!!'
            resultBoard.classList.add('visible');            
            return;
        }
        msc --;
        timer__text.innerText = `${second < 10 ? '0'+second : second}:${msc < 10 ? '0'+msc : msc}`
        if(msc === 0){
            second--;
            msc = 10
        }
    },100)    
}

function setCount(number){
    count__text.innerHTML = number
}


