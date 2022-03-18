'use strict';
import * as sound from './sound.js';

export const ItemType = Object.freeze({
    carrot : "carrot",
    bug : "bug"
})

export default class Field{

    constructor(carrotCount, bugCount){
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.field');
        // this 바인딩 1)
        // this.onClick = this.onClick.bind(this)
        this.field.addEventListener('click', e=> this.onClick(e)) // this 바인딩 2) 
    }

    init() {
        this.field.innerHTML = '';
        this._addItem('./img/bug.png',this.carrotCount)
        this._addItem('./img/carrot.png',this.bugCount)
    }

    // private : 외부 사용 X
    _addItem(img,number){
        const fieldRect = this.field.getBoundingClientRect();    
        const seperator = img.split('/')[2].split('.')[0];

        for (let i = 0; i < number; i++) {
            const x = Math.round(Math.random()*(fieldRect.width-100));
            const y = Math.round(Math.random()*(fieldRect.height-100));    
            
            const bug = document.createElement('button');        
            bug.setAttribute('class', 'bug');
            bug.innerHTML =`<img src="${img}" alt="${ seperator === 'bug'? 'bug' : 'carrot'}">`

            bug.style.transform = `translate(${x}px,${y}px)`;        
            this.field.append(bug)
        }
    }

    onClick(e){
        const target = e.target.alt;
        if(target !== 'carrot' && target !== 'bug') return
        
        if(target === 'carrot'){
            sound.playCarrotSound();
            this.field.removeChild(e.target.parentNode)
            this.onItemClick&& this.onItemClick(ItemType.carrot);
        }
        else { 
            sound.playBugSound();
            this.onItemClick&& this.onItemClick(ItemType.bug);
        }
    }
    setClickListener(onItemClick){
        this.onItemClick = onItemClick
    }   
}