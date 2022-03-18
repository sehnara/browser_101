'use strict'

import Field, { ItemType } from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
    cancel : 'cancel',
    win : 'win',
    lose: 'lose'
})

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
                this.stop(Reason.cancel);
            }
            else{
                this.start();
            }  
        });
    }

    onItemClick = (item) => {
        if(!this.started)return;    
        if(item === ItemType.carrot){
            this.count--;        
            this.setCount(this.count)
            if(this.count === 0){        
                this.stop(Reason.win);
            }
        }
        else{
            this.stop(Reason.lose);
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

    stop(reason){
        this.started = false;
        this.stopGameTimer();         
        this.onGameStop && this.onGameStop(reason);
               
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
                this.stop(Reason.lose);    
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