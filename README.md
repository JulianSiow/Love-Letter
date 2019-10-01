PROPOSAL:

Based on card game Love Letter.  

SECTION Rule Set:

On your turn, draw the top card from the deck and add it to your hand. Then choose one of the two cards in your hand and discard it face up in front of you. Apply any effect on the card you discarded. You must apply its effect, even if it is bad for you.

All discarded cards remain in front of the player who discarded them. Overlap the cards so that it's clear in which order they were discarded. This helps players to figure out which cards other players might be holding.

Once you finish applying the card's effect, the turn passes to the player on your left.

NOTE OUT OF ROUND:
If a player is knocked out of the round, that player discards the card in his or her hand face up (do not apply the card's effect) and takes no more turns until next round.

NOTE END OF ROUND:
A round ends if the deck is empty at the end of a turn.

All players still in the round reveal their hands. The player with the highest ranked person wins the round. In case of a tie, the player who discarded the highest total value of cards wins.

A round also ends if all players but one are out of the round, in which case the remaining player wins.

SECTION CARDS:

Guard: Player designates another player and names a type of card. If that player's hand matches the type of card specified, that player is eliminated from the round. However, Guard cannot be named as the type of card.
Number in deck: 5
Strength: 1
STUB Functionality: Player1 is prompted to select a player(2).  Then they are prompted to select a card.  If if P2's card === card selected, P2's card is discarded and P2 is given the eliminated class.  

Priest/Spy: Player is allowed to see another player's hand.
Number in deck: 2
Strength: 2
STUB Functionality: Player1 may select another players(2) card.  Reveal player2's card to player1.

Baron: Player will choose another player and privately compare hands. The player with the lower-strength hand is eliminated from the round.
Number in deck: 2
Strength: 3
STUB Functionality: Player1 chooses a player(2). P1 and P2 compare hands.  The player with the lower card recives the eliminated class.

Handmaiden: Player cannot be affected by any other player's card until the next turn.
Number in deck: 2
Strength: 4
STUB Functionality: At the start of each players hand, the key:value pair "untargetable" is set to false.  If a player plays the handmaiden, "untargetable" is set to true.  When targeting another player with a card effect, players with "untargetable" set to true cannot be targeted.  

Prince: Player can choose any player (including themself) to discard their hand and draw a new one. If the discarded card is the Princess, the discarding player is eliminated.
Number in deck: 2
Strength: 5
STUB Functionality: Player1 chooses a player(2).  P2's hand is discarded and they draw a new card.  If deckArray.length === 0, P2 gains eliminated class

King: Player trades hands with any other player.
Number in deck: 1
Strength: 6
STUB  Functionality: P1 picks a second player, the players hand arrays are swapped.  

Countess: If a player holds both this card and either the King or Prince card, this card must be played immediately.
Number in deck: 1
Strength: 7
STUB Functionality: check hand, if the other card is === King || 2ndCard === Prince, this card is played.  No effect. 

Princess: 	If a player plays this card for any reason, they are eliminated from the round.
Number in deck: 1
Strength: 8
STUB If this card is played, player who plays it recives the "eliminated" class.

SECTION USER STORIES:

NOTE 4 players is a stretch goal
up to 4 players may input player names into forms.  Player objects are created with those names.  

Each player is dealt a hand of 1 card of the 16 card deck, all cards are face down.  Player 1(P1) is prompted to start.  

Once P1 confirms they are ready, they're card is revealed and another random card is drawn.  P1 must choose which card effect to activate.  The card effect activates, P1's remaining hand is hidden, and P2 is prompted to start.


Once the deck is empty, remaining players compare cards.  Player with the highest strength wins.