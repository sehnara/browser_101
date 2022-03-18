'use strict'
import PopUp from './popup.js';
import GameBuilder,{ Reason } from './game.js';
import * as sound from './sound.js';

const CARROT_COUNT = 5; // carrot 초기화 
const BUG_COUNT = 5;  // bug 초기화
const GAME_DURATION_SEC = 5; 

const gameFinishedBanner = new PopUp();
const game = new GameBuilder()
.withGameDuration(GAME_DURATION_SEC)
.withCarrotCount(CARROT_COUNT)
.withBugCount(BUG_COUNT)
.build();


game.setGameStop(reason => {
    let message = "";
    switch (reason) {
        case Reason.cancel:      
            message = "Replay?";  
            sound.playFailSound();    
            sound.stopBgSound(); 
            break;
        case Reason.win:   
            sound.playWinSound();
            message = 'You Won!!';
            break;
        case Reason.lose:  
            sound.playBugSound();
            sound.stopBgSound(); 
            message = 'You Lose!!';    
            break;    
        default:
            throw new Error('not valid reason!')
    }
    gameFinishedBanner.show(message)
})

gameFinishedBanner.setClickListner(()=>{
    game.start();
})



