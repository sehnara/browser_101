'use strict'

import PopUp from './popup.js';

const startButton = document.querySelector('.game__button');
const timer__text = document.querySelector('.game__timer');
const count__text = document.querySelector('.game__score');
const field = document.querySelector('.field');


// audio
const bgSound = new Audio('./sound/bg.mp3');
const bugPullSound = new Audio('./sound/bug_pull.mp3');
const carrotPullSound = new Audio('./sound/carrot_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');
const failSound = new Audio('./sound/alert.wav');

const CARROT_COUNT = 20; // carrot 초기화 
const BUG_COUNT = 20;  // bug 초기화
const GAME_DURATION_SEC = 5; 

// 
let started = false;
let count = CARROT_COUNT;
let timer = undefined; 

const gameFinishedBanner = new PopUp();

gameFinishedBanner.setClickListner(()=>{
    startGame();
    started = !started;
})

startButton.addEventListener('click', (e)=>{
    if(started){
        stopGame();
    }
    else{
        startGame();
    }    
    started = !started;
})

field.addEventListener('click', e => {
    if(!started)return;

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
            finishGame(true);
        }
    }
    // 2) click bug
    else { 
        bugPullSound.play();
        failSound.play();
        finishGame(false);
        return;
    }
})

function finishGame(win){
    started = false;
    clearInterval(timer);
    gameFinishedBanner.show(win ? 'YOU WON!!' :'YOU LOSE!!')
    stopGame(bgSound);
}

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound){
    sound.pause();
}

function startGame(){
    count = CARROT_COUNT;
    initGame();
    showStopButton();
    showTimerAndScore();
    //
    setTimer();
    setCount(CARROT_COUNT);    
    playSound(bgSound);   
}

function stopGame(){
    stopGameTimer();    
    // bug, carrot 막아야 한다.
    gameFinishedBanner.show('Replay??');  
    stopSound(bgSound);   
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
function showStartButton(){
    startButton.innerHTML= '<i class="fa-solid fa-play"></i>' 
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

function setTimer(){    
    let second = GAME_DURATION_SEC-1
    let msc = 10

    timer = setInterval(()=>{
        if(second < 0) {
            failSound.play();
            finishGame(false);    
            return;
        }
        msc --;
        updateTimerText(second, msc);
        if(msc === 0){
            second--;
            msc = 10;
        }
    },100)    
}
function stopGameTimer(){
    clearInterval(timer);
}

function updateTimerText(second,msc){
    timer__text.innerText = `${second < 10 ? '0'+second : second}:${msc < 10 ? '0'+msc : msc}`
}

function setCount(number){
    count__text.innerHTML = number
}


