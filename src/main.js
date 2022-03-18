'use strict'
import PopUp from './popup.js';
import GameBuilder from './game.js';

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
    gameFinishedBanner.show(reason === 'cancel' ? "Replay?" : reason === 'win' ? 'You Won!!' : 'You Lose!!')
})

gameFinishedBanner.setClickListner(()=>{
    game.start();
})



