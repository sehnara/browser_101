'use strict'
import PopUp from './popup.js';
import Game from './game.js';

const CARROT_COUNT = 5; // carrot 초기화 
const BUG_COUNT = 5;  // bug 초기화
const GAME_DURATION_SEC = 5; 

const gameFinishedBanner = new PopUp();
const game = new Game(5,5,5);


game.setGameStop(reason => {
    gameFinishedBanner.show(reason === 'cancel' ? "Replay?" : reason === 'win' ? 'You Won!!' : 'You Lose!!')
})

gameFinishedBanner.setClickListner(()=>{
    game.start();
})



