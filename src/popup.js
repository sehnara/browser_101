'use strict'

export default class PopUp{
    constructor(){
        this.popUp = document.querySelector('.result');
        this.popUpText = document.querySelector('.result__text');
        this.popUpReplay = document.querySelector('.result__replay-button');
        this.popUpReplay.addEventListener('click', (e)=>{
            this.onClick && this.onClick();
            hide();
        })
    }

    setClickListner(onClick){
        this.onClick = onClick;
    }

    hide(){
        this.popUp.classList.remove('visible')
    }

    show(text){
        this.popUpText.innerText= text;
        this.popUp.classList.add('visible');
    }
}