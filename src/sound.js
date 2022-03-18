'use strict'

const bgSound = new Audio('./sound/bg.mp3');
const bugPullSound = new Audio('./sound/bug_pull.mp3');
const carrotPullSound = new Audio('./sound/carrot_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');
const failSound = new Audio('./sound/alert.wav');

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound){
    sound.pause();
}

export function playCarrotSound(){
    playSound(carrotPullSound);
}
export function playBugSound(){
    playSound(bugPullSound);
}
export function playWinSound(){
    playSound(winSound);
}
export function playFailSound(){
    playSound(failSound);
}
export function playBgSound(){
    playSound(bgSound);
}
export function stopBgSound(){
    stopSound(bgSound);
}