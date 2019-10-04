//SECTION 
//Guard
//prompt player to select another player
//check for handmaiden === true
//if false, select a card to compare to hand
//pass selected players hand through if... than function
//if players hand is === declared card, discard players hand and set eliminated -> true and start next turn
//if players hand is !== declared card, next turn begins

//Priest
//prompt player to select another player
//check for handmaiden === true
//selected players card is displayed for selecting player
//next turn begins

//Baron 
//prompt player to select another player
//check for handmaiden === true
//compare remaining hand, if selected players hand is lower than selecting players hand, selected players hand is discarded and set eliminated -> true and start next turn
//if selecting players hand is lower, start next turn

//Handmaiden
//player sets key:value pair "handmaiden" -> true
//next turn begins

//Prince
//prompt player to choose another player
//check for handmaiden
//selected players hand is discarded
//check for princess
//if deck.length === 0, set selected player eliminated -> true
//else, draw new card

//King 
//promt player to choose another player
//check for handmaiden
//splice each hands contents to eachother

//Countess
//loop through hand
//if hand[i] === King || hand[i] === prince
//play countess, next turn begins

//Princess
//when played, set eliminated -> true
//next turn begins

//SECTION 
//Turn Logic
//check for end game 
//reveal card
//set handmaiden to false
//check for eliminated, if true, next turn begins
//if false, prompt player to start


//SECTION 
//End Game
//During draw phase, check if more than 1 player has "eliminated" === false, if not, the last remaining player wins
// OR if the deck.length === 0, compare hands, player with the highest strength in their hand wins


//SECTION Deck Classes

//Card Class
class Card {
    constructor(name, strength) {
        this.name = name;
        this.strength = strength;
    }
}

//Guard
//prompt player to select another player
//check for handmaiden === true
//if false, select a card to compare to hand
//pass selected players hand through if... than function
//if players hand is === declared card, discard players hand and set eliminated -> true and start next turn
//if players hand is !== declared card, next turn begins
class Guard extends Card {
    constructor(name, strength) {
        super(name, strength)
    }
    ability(target) {
        if (target.handmaiden === true) {
            return
        } else {
            let guardTarget = prompt('What card does your target have?');
            if(guardTarget.toLowerCase() === target.hand[0].name.toLowerCase()){
                alert(`You found a ${guardTarget}!`)
                target.hand.pop();
                game.eliminatePlayer(target);
            } else{
                alert(`${target.name} does not have a ${guardTarget}...`)
            }
        }
    }
}

//Priest
//prompt player to select another player
//check for handmaiden === true
//selected players card is displayed for selecting player
//next turn begins
class Priest extends Card {
    constructor(name, strength) {
        super(name, strength)
    }
    ability(target){
        if(target.handmaiden === true){
            return
        } else{
            alert(`${target.name}'s card is ${target.hand[0].name}`)
        }
    }
}

//Baron 
//prompt player to select another player
//check for handmaiden === true
//compare remaining hand, if selected players hand is lower than selecting players hand, selected players hand is discarded and set eliminated -> true and start next turn
//if selecting players hand is lower, start next turn
class Baron extends Card {
    constructor(name, strength) {
        super(name, strength);
    }
    ability(target, player) {//FIXME not eliminating player
        if (target.handmaiden === true) {
            return
        } else if (player.hand.strength > target.hand.strength) {
            discardPile.push(target.hand[0]);
            target.hand.splice(0, 1);
            game.eliminatePlayer(target);
        }
    }
}

//Handmaiden
//player sets key:value pair "handmaiden" -> true
//next turn begins
class Handmaiden extends Card {
    constructor(name, strength) {
        super(name, strength)
    }
    ability(player) {
        player.handmaiden = true;
    }
}

//Prince
//prompt player to choose another player
//check for handmaiden
//selected players hand is discarded
//check for princess
//if deck.length === 0, set selected player eliminated -> true
//else, draw new card
class Prince extends Card {
    constructor(name, strength) {
        super(name, strength)
    }
    ability(target) {
        if (target.handmaiden === true) {
            //STUB 
        }else if(target.hand[0] === princess){//TODO
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

//King 
//promt player to choose another player
//check for handmaiden
//splice each hands contents to eachother
class King extends Card {
    constructor(name, strength) {
        super(name, strength);
    }
    ability(target, player) {
        if (target.handmaiden === true) {
            return
        } else {
            target.hand.push(player.hand[0]);
            player.hand.push(target.hand[0]);
            target.hand.splice(1, 1);
            player.hand.splice(1, 1);
        }
    }
}

//Countess
//loop through hand
//if hand[i] === King || hand[i] === prince
//play countess, next turn begins
class Countess extends Card {
    constructor(name, strength) {
        super(name, strength);
    }
    ability(player) {//FIXME 
        for (let i = 0; i < player.hand.length; i++) {
            if (player.hand[i].name === 'king' || player.hand[i].name === 'prince') {
                player.hand.unshift(discardPile[0]);
            }
        }
    }
}

//Princess
//when played, set eliminated -> true
//next turn begins
class Princess extends Card {
    constructor(name, strength) {
        super(name, strength);
    }
    ability(player) {
        player.eliminated = true;
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

//SECTION 
//Game Objects
let deck = [guard1, guard2, guard3, guard4, guard5, priest1, priest2, baron1, baron2, handmaiden1, handmaiden2, prince1, prince2, king, countess, princess];
let discardPile = [];
let players = [];

//SECTION Player Class
class Player {
    constructor(name, hand = [], handmaiden = false, eliminated = false) {
        this.name = name;
        this.hand = hand;
        this.handmaiden = handmaiden;
        this.eliminated = eliminated;
    }
    draw() {
        let r = Math.floor(Math.random() * deck.length);
        this.hand.push(deck[r]);
        deck.splice(r, 1);
    }
    setImg(){
        if(this.hand[0].name === 'guard'){
            $('#card1').attr('src', "./images/guard.jpg");
        }else if(this.hand[0].name === 'priest'){
            $('#card1').attr('src', "./images/priest.jpg");
        }else if(this.hand[0].name === 'baron'){
            $('#card1').attr('src', "./images/baron.jpg");
        }else if(this.hand[0].name === 'handmaiden'){
            $('#card1').attr('src', "./images/handmaid.jpg");
        }else if(this.hand[0].name === 'prince'){
            $('#card1').attr('src', "./images/prince.jpg");
        }else if(this.hand[0].name === 'king'){
            $('#card1').attr('src', "./images/king.jpg");
        }else if(this.hand[0].name === 'countess'){
            $('#card1').attr('src', "./images/countess.jpg");
        }else if(this.hand[0].name === 'princess'){
            $('#card1').attr('src', "./images/princess.jpg");
        };
        if(this.hand[1].name === 'guard'){
            $('#card2').attr('src', "./images/guard.jpg");
        }else if(this.hand[1].name === 'priest'){
            $('#card2').attr('src', "./images/priest.jpg");
        }else if(this.hand[1].name === 'baron'){
            $('#card2').attr('src', "./images/baron.jpg");
        }else if(this.hand[1].name === 'handmaiden'){
            $('#card2').attr('src', "./images/handmaid.jpg");
        }else if(this.hand[1].name === 'prince'){
            $('#card2').attr('src', "./images/prince.jpg");
        }else if(this.hand[1].name === 'king'){
            $('#card2').attr('src', "./images/king.jpg");
        }else if(this.hand[1].name === 'countess'){
            $('#card2').attr('src', "./images/countess.jpg");
        }else if(this.hand[1].name === 'princess'){
            $('#card2').attr('src', "./images/princess.jpg");
        };
    }
    resetImg(){
        $('#card1').attr('src', "./images/eda1d_61421.png");
        $('#card2').attr('src', "./images/eda1d_61421.png");
    }
    pickPhase() {
        let chosenCard = prompt(`${this.name}, choose a card! ${this.hand[0].name} or ${this.hand[1].name}`);
        if (chosenCard.toLowerCase() === 'baron' || chosenCard.toLowerCase() === 'king') {
            let target = prompt(`${this.name}, who is your target?`);
            this.playCardTargetSelf(this.findCardInHand(chosenCard), this.findTarget(target));
            this.discard(chosenCard);
        } else if (chosenCard.toLowerCase() === 'guard' || chosenCard.toLowerCase() === 'priest' || chosenCard.toLowerCase() === 'prince') {
            let target = prompt(`${this.name}, who is your target?`);
            this.playCardTarget(this.findCardInHand(chosenCard), this.findTarget(target));
            this.discard(chosenCard);
        } else if (chosenCard.toLowerCase() === 'handmaiden' || chosenCard.toLowerCase() === 'countess' || chosenCard.toLowerCase() === 'princess') {
            this.playCardSelf(this.findCardInHand(chosenCard));
            this.discard(chosenCard);
        }
    }
    playCardSelf(card) {
        card.ability(this);

    }
    playCardTarget(card, target) {
        card.ability(target);
    }
    playCardTargetSelf(card, target) {
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
    discard(chosenCard){
        for (let i = 0; i < this.hand.length; i++) {
            if (chosenCard === this.hand[i].name.toLowerCase()) {
                discardPile.unshift(this.hand[i])
                this.hand.splice(i, 1)
            };
        }
    }
    readyCheck(){
        alert(`${this.name}, are you ready?`);
    }
};

const p1 = new Player('Player 1', [], false, false);
const p2 = new Player('Player 2', [], false, false);
// const p3 = new Player('Player 3', [princess], false, false);


//SECTION 
//Game Logic

const game = {
    playerPhase() {
        players.push(p1, p2);//TODO 
    },
    drawPhase() {
        for (let i = 0; i < players.length; i++) {
            players[i].draw();
        }
    },
    endTurn(){
        for(let i=0; i<players.length; i++){
            if(players[i].hand.length === 0){
                players[i].draw();
            }
        }
    },
    startLoop(){
        while(true){
            this.checkForWin();
            for(i=0;i<players.length; i++){
                players[i].handmaiden = false;
                players[i].draw();
                players[i].readyCheck();
                players[i].setImg();
                console.log(players)
                players[i].pickPhase();
                players[i].resetImg();
                game.endTurn();
                console.log(players);
                console.log(deck.length);
                console.log(discardPile);
            }
        }
    },
    checkForWin(){
        if(players.length === 1){
            alert(`${players[0].name} is the winner!`);
            return;
        }
        if(deck.length === 0){
            let winner = players[0];
            for(let i=0; i<players.length; i++){
                if(players[i].hand[0].strength >= winner.hand[0].strength){
                    winner = players[i];
                }
            }
            alert(`${winner.name} is the winner!`);
            return;
        }
    },
    eliminatePlayer(target){
        for (let i = 0; i < players.length; i++){
            if(players[i].name === target.name){
                players.splice(i, 1);
            }
        }
    },
}

//Game Start
//NOTE use a loop to loop though players turns


//Push all players into game
game.playerPhase();

// Draw for all players
game.drawPhase();

// Start game loop
game.startLoop();



//Begin Turn
// players[0].draw();

// //Activate Card
// console.log(players[0].hand)
// console.log(players[1].hand)
// players[0].pickPhase();

// //End Turn
// //loop through players
// //if hand.length === 0, draw
// game.endTurn();

// console.log(players);

//End Game SECTION 
//if players.length === 1
//${players[0]} is the Winner!!!!
// if(players.length === 1){
//     console.log(`${players[0]} is the winner!`);
// }
// if(deck.length === 0){
//     let winner = players[0];
//     for(let i=0; i<players.length; i++){
//         if(players[i].hand[0].strength >= winner.hand[0].strength){
//             winner = players[i];
//         }
//     }
//     console.log(`${winner} is the winner!`);
// }
//if deck.length === 0
//compare card strength
//player with highest card strength is the winner 


// ##################################################################
//SECTION ---------------------SANDBOX------------------------------
//###################################################################

// const imgChange = () => {
//     $('#card1').attr('src', `players[0].hand[0].image`);
//     $('#card2').attr('src', `players[0].hand[1].image`);
//     console.log(players[0].hand[0].image);
//     console.log("in img change function");
// };

// $('#card1').on('click', ()=>{
//     console.log('click')
//     imgChange();
// });

// for(let i=0; i<hand.length; i++){
//     $('#card1').attr('src', `${hand[i].image}`);
    
    
// }
// $('#card1').attr('src', `${hand[i].image}`);
// $('#card2').attr('src', `${hand[i].image}`);

// for(let i=0; i<this.hand.length; i++){
//     if(hand[0] === 'guard'){
//         $('#card1').attr('src', "./images/guard.jpg");
//     }else if(hand[0] === 'priest'){
//         $('#card1').attr('src', "./images/priest.jpg");
//     }else if(hand[0] === 'baron'){
//         $('#card1').attr('src', "./images/baron.jpg");
//     }else if(hand[0] === 'handmaiden'){
//         $('#card1').attr('src', "./images/handmaid.jpg");
//     }else if(hand[0] === 'prince'){
//         $('#card1').attr('src', "./images/prince.jpg");
//     }else if(hand[0] === 'king'){
//         $('#card1').attr('src', "./images/king.jpg");
//     }else if(hand[0] === 'countess'){
//         $('#card1').attr('src', "./images/countess.jpg");
//     }else if(hand[0] === 'princess'){
//         $('#card1').attr('src', "./images/princess.jpg");
//     }

//     if(hand[2] === 'guard'){
//         $('#card2').attr('src', "./images/guard.jpg");
//     }else if(hand[2] === 'priest'){
//         $('#card2').attr('src', "./images/priest.jpg");
//     }else if(hand[2] === 'baron'){
//         $('#card2').attr('src', "./images/baron.jpg");
//     }else if(hand[2] === 'handmaiden'){
//         $('#card2').attr('src', "./images/handmaid.jpg");
//     }else if(hand[2] === 'prince'){
//         $('#card2').attr('src', "./images/prince.jpg");
//     }else if(hand[2] === 'king'){
//         $('#card2').attr('src', "./images/king.jpg");
//     }else if(hand[2] === 'countess'){
//         $('#card2').attr('src', "./images/countess.jpg");
//     }else if(hand[2] === 'princess'){
//         $('#card2').attr('src', "./images/princess.jpg");
//     }
// }
