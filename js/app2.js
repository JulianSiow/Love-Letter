class Card {
    constructor(name, strength) {
        this.name = name;
        this.strength = strength;
    }
}

class Guard extends Card {
    constructor(name, strength) {
        super(name, strength)
    }
    ability(target) {
        if (target.handmaiden === true) {
            alert('The handmaiden is protecting this player!');
        } else {
            let guardTarget = prompt('What card does your target have?');
            if (guardTarget.toLowerCase() === target.hand[0].name.toLowerCase()) {
                alert(`You found a ${guardTarget}!`)
                target.hand.pop();
                game.eliminatePlayer(target);
            } else {
                alert(`${target.name} does not have a ${guardTarget}...`)
            }
        }
    }
}

class Priest extends Card {
    constructor(name, strength) {
        super(name, strength)
    }
    ability(target) {
        if (target.handmaiden === true) {
            alert('The handmaiden is protecting this player!');
        } else {
            alert(`${target.name}'s card is ${target.hand[0].name}`)
        }
    }
}

class Baron extends Card {
    constructor(name, strength) {
        super(name, strength);
    }
    ability(target, player) {
        for(let i=0; i<player.hand.length; i++){
            if(player.hand[i].name === 'baron'){
                player.hand.splice(i, 1);
            }
        }
        if (target.handmaiden === true) {
            alert('The handmaiden is protecting this player!');
        } else if (player.hand[0].strength > target.hand[0].strength){
            console.log(`You knocked out ${target.name}!`)
            discardPile.push(target.hand[0]);
            target.hand.pop();
            game.eliminatePlayer(target);
        }else{
            alert(`${target.name} has a higher strength card...`)
        }
    }
}

class Handmaiden extends Card {
    constructor(name, strength) {
        super(name, strength)
    }
    ability(player) {
        player.handmaiden = true;
    }
}

class Prince extends Card {
    constructor(name, strength) {
        super(name, strength)
    }
    ability(target, player) {
        for(let i=0; i < player.hand.length; i++) {
            if (player.hand[i].name === 'countess') {
                alert('The Countess must be played')
            }
        }
        if (target.handmaiden === true) {
            alert('The handmaiden is protecting this player!');
        }else if (target.hand[0] === princess) {
            discardPile.unshift(target.hand[0])
            target.hand.pop();
            game.eliminatePlayer(target);

        } else {
            discardPile.push(target.hand[0]);
            if (deck.length === 0 || target.hand[0] === princess) {
                game.eliminatePlayer();
            }
            target.hand.pop();
        }
    }
}

class King extends Card {
    constructor(name, strength) {
        super(name, strength);
    }
    ability(target, player) {
        for(let i=0; i < player.hand.length; i++) {
            if (player.hand[i].name === 'countess') {
                alert('The Countess must be played')
            }
        }
        if (target.handmaiden === true) {
            alert('The handmaiden is protecting this player!');
        } else {
            target.hand.push(player.hand[0]);
            player.hand.push(target.hand[0]);
            target.hand.splice(1, 1);
            player.hand.splice(1, 1);
        }
    }
}

class Countess extends Card {
    constructor(name, strength) {
        super(name, strength);
    }
    ability(player) { 
        return player;
    }
}

class Princess extends Card {
    constructor(name, strength) {
        super(name, strength);
    }
    ability(player) {

        game.eliminatePlayer(player);
    }
}

const guard1 = new Guard('guard', 1);
const guard2 = new Guard('guard', 1);
const guard3 = new Guard('guard', 1);
const guard4 = new Guard('guard', 1);
const guard5 = new Guard('guard', 1);
const priest1 = new Priest('priest', 2);
const priest2 = new Priest('priest', 2);
const baron1 = new Baron('baron', 3);
const baron2 = new Baron('baron', 3);
const handmaiden1 = new Handmaiden('handmaiden', 4);
const handmaiden2 = new Handmaiden('handmaiden', 4);
const prince1 = new Prince('prince', 5);
const prince2 = new Prince('prince', 5);
const king = new King('king', 6);
const countess = new Countess('countess', 7);
const princess = new Princess('princess', 8);

let deck = [guard1, guard2, guard3, guard4, guard5, priest1, priest2, baron1, baron2, handmaiden1, handmaiden2, prince1, prince2, king, countess, princess];
let discardPile = [];
let players = [];
let z = 0;
class Player {
    constructor(name, hand = [], handmaiden = false) {
        this.name = name;
        this.hand = hand;
        this.handmaiden = handmaiden;
    }
    draw() {
        let r = Math.floor(Math.random() * deck.length);
        this.hand.push(deck[r]);
        deck.splice(r, 1);
    }
    setImg() {
        if (this.hand[0].name === 'guard') {
            $('#card1').attr('src', "./images/guard.jpg");
            $('#card1').attr('class', 'guard')
        } else if (this.hand[0].name === 'priest') {
            $('#card1').attr('src', "./images/priest.jpg");
            $('#card1').attr('class', 'priest')
        } else if (this.hand[0].name === 'baron') {
            $('#card1').attr('src', "./images/baron.jpg");
            $('#card1').attr('class', 'baron')
        } else if (this.hand[0].name === 'handmaiden') {
            $('#card1').attr('src', "./images/handmaid.jpg");
            $('#card1').attr('class', 'handmaid')
        } else if (this.hand[0].name === 'prince') {
            $('#card1').attr('src', "./images/prince.jpg");
            $('#card1').attr('class', 'prince')
        } else if (this.hand[0].name === 'king') {
            $('#card1').attr('src', "./images/king.jpg");
            $('#card1').attr('class', 'king')
        } else if (this.hand[0].name === 'countess') {
            $('#card1').attr('src', "./images/countess.jpg");
            $('#card1').attr('class', 'countess')
        } else if (this.hand[0].name === 'princess') {
            $('#card1').attr('src', "./images/princess.jpg");
            $('#card1').attr('class', 'princess')
        };
        if (this.hand[1].name === 'guard') {
            $('#card2').attr('src', "./images/guard.jpg");
            $('#card2').attr('class', 'guard')
        } else if (this.hand[1].name === 'priest') {
            $('#card2').attr('src', "./images/priest.jpg");
            $('#card2').attr('class', 'priest')
        } else if (this.hand[1].name === 'baron') {
            $('#card2').attr('src', "./images/baron.jpg");
            $('#card2').attr('class', 'baron')
        } else if (this.hand[1].name === 'handmaiden') {
            $('#card2').attr('src', "./images/handmaid.jpg");
            $('#card2').attr('class', 'handmaid')
        } else if (this.hand[1].name === 'prince') {
            $('#card2').attr('src', "./images/prince.jpg");
            $('#card2').attr('class', 'prince')
        } else if (this.hand[1].name === 'king') {
            $('#card2').attr('src', "./images/king.jpg");
            $('#card2').attr('class', 'king')
        } else if (this.hand[1].name === 'countess') {
            $('#card2').attr('src', "./images/countess.jpg");
            $('#card2').attr('class', 'countess')
        } else if (this.hand[1].name === 'princess') {
            $('#card2').attr('src', "./images/princess.jpg");
            $('#card2').attr('class', 'princess')
        };
    }
    resetImg() {
        $('#card1').attr('src', "./images/eda1d_61421.png");
        $('#card2').attr('src', "./images/eda1d_61421.png");
        $('#card1').attr('class', 'card-back');
        $('#card2').attr('class', 'card-back');
    }
    pickCard(){
        let $card1 = $('#card1');
        let $card2 = $('#card2');
        $card1.on('click', ()=>{
            if($card1.is('.baron')||$card1.is('.king')||$card1.is('.prince')){
                let target = prompt(`${players[z].name}, who is your target?`);
                players[z].playCardTargetSelf(players[z].hand[0], players[z].findTarget(target.toLowerCase()));
            } else if($card1.is('.guard')||$card1.is('.priest')){
                let target = prompt(`${players[z].name}, who is your target?`);
                players[z].playCardTarget(players[z].hand[0], players[z].findTarget(target.toLowerCase()));
            } else if($card1.is('handmaiden')||$card1.is('countess')||$card1.is('princess')){
                players[z].playCardSelf(players[z].hand[0])
            }
            players[z].hand.shift();
            z++;
            if(z === players.length){
                z = 0;
            }
            players[z].resetImg();
        })
        $card2.on('click', ()=>{
            if($card2.is('.baron')||$card2.is('.king')||$card2.is('.prince')){
                let target = prompt(`${players[z].name}, who is your target?`);
                players[z].playCardTargetSelf(players[z].hand[1], players[z].findTarget(target.toLowerCase()));
            } else if($card2.is('.guard')||$card2.is('.priest')){
                let target = prompt(`${players[z].name}, who is your target?`);
                players[z].playCardTarget(players[z].hand[1], players[z].findTarget(target.toLowerCase()));
            } else if($card2.is('handmaiden')||$card2.is('countess')||$card2.is('princess')){
                players[z].playCardSelf(players[z].hand[1])
            }
            players[z].hand.pop();
            z++;
            if(z === players.length){
                z = 0;
            }
            players[z].resetImg();

        })
    }
    playCardSelf(card) {
        console.log(card);
        card.ability(this);
    }
    playCardTarget(card, target) {
        console.log(card);
        card.ability(target);
    }
    playCardTargetSelf(card, target) {
        console.log(card)
        card.ability(target, this);
    }
    findCardInHand(chosenCard) {
        for (let i = 0; i < this.hand.length; i++) {
            if (chosenCard === this.hand[i].name.toLowerCase()) {
                return this.hand[i]
            };
        }
    }
    findTarget(target) {
        for (let i = 0; i < players.length; i++) {
            if (target.toLowerCase() === players[i].name.toLowerCase()) {
                return players[i];
            }
        }
    }
}

const p1 = new Player('Player 1', [], false);
const p2 = new Player('Player 2', [], false);

const game = {
    playerPhase() {
        players.push(p1, p2);//TODO 
    },
    drawPhase() {
        for (let i = 0; i < players.length; i++) {
            if(players[i].hand.length === 0){
                players[i].draw();
            }
        }
    },
    checkForWin() {
        if (players.length === 1) {
            alert(`${players[0].name} is the winner!`);
            return;
        }
        if (deck.length === 0) {
            let winner = players[0];
            for (let i = 0; i < players.length; i++) {
                if (players[i].hand[0].strength >= winner.hand[0].strength) {
                    winner = players[i];
                }
            }
            alert(`${winner.name} is the winner!`);
            return;
        }
    },
    eliminatePlayer(target) {
        for (let i = 0; i < players.length; i++) {
            if (players[i].name === target.name) {
                players.splice(i, 1);
            }
        }
    },
}

game.playerPhase();

$('.start-turn').on('click', function(){
    console.log('start turn function');
    players[z].handmaiden = false;
    game.checkForWin();
    game.drawPhase();
    players[z].draw();
    players[z].setImg();
    console.log(players);
})
players[z].pickCard();
$('.next-turn').on('click', function(){
    console.log('next turn function');
})

$('.add-player').on('click')