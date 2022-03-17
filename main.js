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

let count = 10 // carrot 잡은 횟수
let inteval = 0; 

startButton.addEventListener('click', (e)=>{
    startButton.classList.add('unactive');
    gameStart(10,count,10);
})


replayButton.addEventListener('click', (e)=>{
    // 1. time reset
    clearInterval(inteval);
    // 2. remove result board
    resultBoard.classList.remove('visible')
    // 3. count reset
    count = 10
    // 4. field reset
    while(field.firstChild){
        field.removeChild(field.firstChild)
    }
    // 5. restart
    gameStart(10,count,10);
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
            clearInterval(inteval);
            resultText.innerText='YOU WON!!'
            resultBoard.classList.add('visible');
        }
    }
    // 2) click bug
    else { 
        bugPullSound.play();
        clearInterval(inteval);
        failSound.play();
        resultText.innerText='YOU LOSE!!'
        resultBoard.classList.add('visible');
        return;
    }
})

function gameStart(number,count, timer){
    setObj('./img/bug.png',number)    
    setObj('./img/carrot.png',number)    
    setCount(count)
    setTimer(timer)
}

function setTimer(s){    
    let second = s-1
    let msc = 10
    inteval = setInterval(()=>{
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

function setObj(img,number){
    const fieldHeight = field.clientHeight;
    const fieldWidth = field.clientWidth;
    const seperator = img.split('/')[2].split('.')[0];

    for (let i = 0; i < number; i++) {
        const x = Math.round(Math.random()*(fieldWidth-100));
        const y = Math.round(Math.random()*(fieldHeight-100));    
        
        const bug = document.createElement('button');        
        bug.setAttribute('class', 'bug');
        bug.innerHTML =`<img src="${img}" alt="${ seperator === 'bug'? 'bug' : 'carrot'}">`

        bug.style.transform = `translate(${x}px,${y}px)`;        
        field.append(bug)
    }
}



