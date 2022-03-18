'use strict'

import * as sound from './sound.js';
import Field from './field.js';

export default class GameBuilder {
    withGameDuration = duration => {
        this.gameDuration = duration;
        return this;
    }
    withCarrotCount(num){
        this.carrotCount = num;
        return this;
    }
    withBugCount(num){
        this.bugCount = num;
        return this;
    }
    build(){
        return new Game(
            this.gameDuration,
            this.carrotCount,
            this.bugCount
        )
    }
}

class Game{
    constructor(bugCount, carrotCount, gameDuration){
        this.startButton = document.querySelector('.game__button');        
        this.timer__text = document.querySelector('.game__timer');
        this.count__text = document.querySelector('.game__score');

        this.carrotCount = carrotCount;
        this.bugCount = bugCount
        this.gameDurationSec = gameDuration;

        this.started = false;
        this.count = carrotCount;
        this.timer = undefined;        

        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListener(this.onItemClick)

        this.startButton.addEventListener('click',()=>{
            if(this.started){
                this.stop();
            }
            else{
                this.start();
            }  
        });
    }

    onItemClick = (item) => {
        if(!this.started)return;    
        if(item === "carrot"){
            this.count--;        
            this.setCount(this.count)
            if(this.count === 0){ 
                sound.playWinSound();         
                this.finish(true);
            }
        }
        else{
            this.finish(false);
            return;
        }
    }

    setGameStop(onGameStop){
        this.onGameStop = onGameStop
    }

    init(){
        clearInterval(this.timer);
        this.count__text.innerText = this.carrotCount;
        this.gameField.init();
    }

    start(){
        this.started = true;
        this.count = this.carrotCount;
        this.showStopButton();
        this.showTimerAndScore();
        this.init();
        this.setTimer();
        this.setCount(this.carrotCount);
        sound.playBgSound();
    }

    stop(){
        this.started = false;
        this.stopGameTimer();
        this.onGameStop && this.onGameStop('cancel')
        sound.stopBgSound();        
    }

    finish(win){
        this.started = false;
        this.stopGameTimer();
        this.onGameStop && this.onGameStop(win ? 'win' : 'lose')
        // this.gameFinishedBanner.show(win ? 'YOU WON!!' :'YOU LOSE!!')
        sound.stopBgSound();
    }

    showStopButton(){
        this.startButton.innerHTML='<i class="fa-solid fa-stop"></i>';
    }

    showTimerAndScore(){
        this.timer__text.style.visibility = "visible"
        this.count__text.style.visibility = "visible"
    }

    setTimer(){
        let second = this.gameDurationSec-1
        let msc = 10
    
        this.timer = setInterval(()=>{
            if(second < 0) {
                sound.playFailSound();
                this.finish(false);    
                return;
            }
            msc --;
            this.updateTimerText(second, msc);
            if(msc === 0){
                second--;
                msc = 10;
            }
        },100)    
    }

    updateTimerText(second,msc){
        this.timer__text.innerText = `${second < 10 ? '0'+second : second}:${msc < 10 ? '0'+msc : msc}`
    }

    setCount(number){
        this.count__text.innerHTML = number
    }

    stopGameTimer(){
        clearInterval(this.timer);
    }
}