//SECTION 
//TODO 
//Guard
//prompt player to select another player
//check for handmaiden === true
//if false, select a card to compare to hand
//pass selected players hand through if... than function
//if players hand is === declared card, discard players hand and set eliminated -> true and start next turn
//if players hand is !== declared card, next turn begins

//TODO 
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
//TODO 
//Turn Logic
//check for end game 
//reveal card
//set handmaiden to false
//check for eliminated, if true, next turn begins
//if false, prompt player to start


//SECTION 
//TODO 
//End Game
//During draw phase, check if more than 1 player has "eliminated" === false, if not, the last remaining player wins
// OR if the deck.length === 0, compare hands, player with the highest strength in their hand wins


//SECTION Deck Classes

//Card Class
class Card{
    constructor(name, strength){
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
class Guard extends Card{
    constructor(name, strength){
        super(name, strength)
    }
    //TODO card function
}

//Priest
//prompt player to select another player
//check for handmaiden === true
//selected players card is displayed for selecting player
//next turn begins
class Priest extends Card{
    constructor(name, strength){
        super(name, strength)
    }
    // ability(target){
    //     if(target.handmaiden === true){
    //         nextTurn();
    //     } else{
    //         //TODO display target.hand
    //     }
    // }
}

//Baron 
//prompt player to select another player
//check for handmaiden === true
//compare remaining hand, if selected players hand is lower than selecting players hand, selected players hand is discarded and set eliminated -> true and start next turn
//if selecting players hand is lower, start next turn
class Baron extends Card{
    constructor(name, strength){
        super(name, strength);
    }
    ability(target, player){
        if(target.handmaiden === true){
            nextTurn();
        } else if(player.hand.strength > target.hand.strength){
            discard.push(target.hand[0]);
            target.hand.strength.splice(0, 1);
        } else {
            nextTurn();
        }
    }
}

//Handmaiden
//player sets key:value pair "handmaiden" -> true
//next turn begins
class Handmaiden extends Card{
    constructor(name, strength){
        super(name, strength)
    }
    ability(player){
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
class Prince extends Card{
    constructor(name, strength){
        super(name, strength)
    }
    ability(target){
        if(target.handmaiden === true){
            nextTurn();
        } else{
            discard.push(target.hand[0]);
            if(deck.length === 0 || target.hand[0] === princess){
                target.eliminated === true;
            }
            target.hand.splice(0, 1);
        }
    }
}

//King 
//promt player to choose another player
//check for handmaiden
//splice each hands contents to eachother
class King extends Card{
    constructor(name, strength){
        super(name, strength);
    }
    ability(target, player){
        if(target.handmaiden === true){
            nextTurn();
        } else {
            target.hand.push(player.hand[0]);
            player.hand.push(target.hand[0]);
            target.hand.splice(1,1);
            player.hand.splice(1,1);
            nextTurn();
        }
    }
}

//Countess
//loop through hand
//if hand[i] === King || hand[i] === prince
//play countess, next turn begins
class Countess extends Card{
    constructor(name, strength){
        super(name, strength);
    }
    ability(player){
        for(let i=0; i<player.hand.length; i++){
            if(player.hand[i].name === 'king' || player.hand[i].name === 'prince'){
                player.hand.unshift(discard[0]);
            } else {
                nextTurn();
            }
        }
    }
}

//Princess
//when played, set eliminated -> true
//next turn begins
class Princess extends Card{
    constructor(name, strength){
        super(name, strength);
    }
    ability(player){
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
let discard = [];
let players = [];

//SECTION Player Class
class Player {
    constructor(name, hand = [], handmaiden = false, eliminated = false){
        this.name = name;
        this.hand = hand;
        this.handmaiden = handmaiden;
        this.eliminated = eliminated;
    }
    draw(){
        let r = Math.floor(Math.random() * deck.length);
        this.hand.push(deck[r]);
        deck.splice(r,1);
    }
    pickPhase(){
        let chosenCard = prompt(`Choose a card! ${this.hand[0]} or ${this.hand[1]}`);
        if(chosenCard.toLowerCase() === 'guard' || chosenCard.toLowerCase() === 'baron' || chosenCard.toLowerCase() === 'king'){
            let target = prompt('Who is your target?');
            this.playCardTargetSelf(this.findCardInHand(chosenCard), this.findTarget(target));
        } else if(chosenCard.toLowerCase() === 'priest' || chosenCard.toLowerCase() === 'prince'){
            let target = prompt('Who is your target?');
            this.playCardTarget(this.findCardInHand(chosenCard), this.findTarget(target));
        } else if(chosenCard.toLowerCase() === 'handmaiden' || chosenCard.toLowerCase() === 'countess' || chosenCard.toLowerCase() === 'princess'){
            this.playCardSelf(this.findCardInHand(chosenCard));
        }
    }
    playCardSelf(card){
        card.ability(this);
    }
    playCardTarget(card, target){
        card.ability(target);
    }
    playCardTargetSelf(card, target){
        card.ability(target, this);
    }
    findCardInHand(chosenCard){
        for(let i=0; i<this.hand.length; i++){
            if(chosenCard === this.hand[i].name){
                return this.hand[i]
            };
        }
    }
    findTarget(target){
        for(let i=0; i<players.length; i++){
            if(target.toLowerCase() === players[i].name){
                return players[i]
            }
        }
    }
};

const p1 = new Player('Player 1', [], false, false);
const p2 = new Player('Player 2', [], false, false);


//SECTION 
//Game Logic

const game = {
    playerPhase(){
        players.push(p1, p2);
    },
    drawPhase(){
        for(let i=0; i<players.length; i++){
            players[i].draw();
        }
    },
}

//Game Start

//Push all players into game
game.playerPhase();

// Draw for all players
game.drawPhase();

//Begin Turn
players[0].draw();

//Activate Card
console.log(players[0].hand);
console.log(players[1].hand);
players[0].pickPhase();

//End Turn

console.log(players);