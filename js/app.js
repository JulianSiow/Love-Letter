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

//TODO 
//Baron 
//prompt player to select another player
//check for handmaiden === true
//compare remaining hand, if selected players hand is lower than selecting players hand, selected players hand is discarded and set eliminated -> true and start next turn
//if selecting players hand is lower, start next turn

//TODO 
//Handmaiden
//player sets key:value pair "handmaiden" -> true
//next turn begins

//TODO 
//Prince
//prompt player to choose another player
//check for handmaiden
//selected players hand is discarded
//check for princess
//if deck.length === 0, set selected player eliminated -> true
//else, draw new card

//TODO 
//King 
//promt player to choose another player
//check for handmaiden
//splice each hands contents to eachother

//TODO 
//Countess
//loop through hand
//if hand[i] === King || hand[i] === prince
//play countess, next turn begins

//TODO 
//Princess
//when played, set eliminated -> true
//next turn begins

//SECTION 
//TODO 
//Turn Logic
//check for end game 
//prompt player to begin turn
//reveal card
//set handmaiden to false
//check for eliminated, if true, next turn begins
//if false, 


//SECTION 
//TODO 
//End Game
//During draw phase, check if more than 1 player has "eliminated" === false, if not, the last remaining player wins
// OR if the deck.length === 0, compare hands, player with the highest strength in their hand wins
