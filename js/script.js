/*
Write a NEW function called game(). Use the previous function inside of this one to play a 5 round game that keeps score and reports a winner or loser at the end. 
- Use prompt() to get input from the user.

A. Inside Game() function:

1. Set playerSelection with player's input using prompt().
2. Check for input validity using CheckInputValidity().
3. a) If invalid input, go back to step #1. (Display warning?)
3. b) If valid input, proceed to next step.
3. c) If null input, quit game.
4. Format playerSelection using CapitalizeString().
5. Get/Set computerSelection using ComputerPlay().
6. Get round result using PlayRound().
7. Keep score using (). Until 5 rounds are up.
8. Display round result using console.log().
9. a) If 5 rounds are not up, go to step #1.
9. b) If 5 rounds are up, proceed to the next step.
10. Declare winner and display final score.
*/
function Game(){
    
    const ROCK = "Rock";
    const PAPER = "Paper";
    const SCISSORS = "Scissors";
    const WIN = "Win";
    const LOSE = "Lose";
    const TIE = "Tie";
    
    let roundNumber = 0;
    let playerScore = 0;
    let computerScore = 0;
    let roundResult; 
    
    let playerSelection;
    let computerSelection;
    
    for (i = roundNumber; i < roundNumber; roundNumber++){
        playerSelection = GetPlayerPlay();
        if (playerSelection ?? true){
            console.log("Quit Game");
            return;
        } 
        playerSelection = CapitalizeString(playerSelection);

        computerSelection = ComputerPlay();

        roundResult = PlayRound();
        UpdateScore();
        ShowRoundResult();
        ShowScore();
    }



    function CheckInputValidity(){
        if(playerSelection.toUpperCase() === "ROCK" || playerSelection.toUpperCase() === "PAPER" || playerSelection.toUpperCase() === "SCISSORS"){
            return "valid";
        }
        else if(playerSelection ?? true){
            return "quit";
        }
        else {
            return "invalid";
        }
    }

    function GetPlayerPlay(){
        const input = prompt("What's your play?", "");
        let inputValidity = CheckInputValidity(input);
        if(inputValidity === "valid"){
            return input;
        } else if (inputValidity === "invalid"){
            return GetPlayerPlay();
        } else {
            return null;
        }
    }
        
    const CapitalizeString = (queryString) => {
        if(typeof queryString !== "string"){
            return "";
        }
        else if(queryString.length < 2){
            return queryString.toUpperCase();
        }
        else{
            return queryString.charAt(0).toUpperCase() + queryString.slice(1).toLowerCase();
        }
    }
    
    function ComputerPlay() {
        let play;
        let randomNumber = Math.floor(Math.random()*100);
        switch(true){
            case randomNumber>98:
                play = ComputerPlay();
                break;
            case randomNumber>65:
                play = "Scissors";
                break;
            case  randomNumber>32:
                play = "Paper";
                break;
            default:
                play = "Rock";
                break;
        }
        return play;
    }
        
    function PlayRound(){
    
        let outcome;
        switch(true){
            case (playerSelection === ROCK && computerSelection === ROCK):
                outcome = TIE;
                break;
            case (playerSelection === ROCK && computerSelection === PAPER):
                outcome = LOSE;
                break;
            case (playerSelection === ROCK && computerSelection === SCISSORS):
                outcome = WIN;
                break;
            case (playerSelection === PAPER && computerSelection === ROCK):
                outcome = WIN;
                break;
            case (playerSelection === PAPER && computerSelection === PAPER):
                outcome = TIE;
                break;
            case (playerSelection === PAPER && computerSelection === SCISSORS):
                outcome = LOSE;
                break;
            case (playerSelection === SCISSORS && computerSelection === ROCK):
                outcome = LOSE;
                break;
            case (playerSelection === SCISSORS && computerSelection === PAPER):
                outcome = WIN;
                break;
            case (playerSelection === SCISSORS && computerSelection === SCISSORS):
                outcome = TIE;
                break;
            default:
                console.log(`Error - Unaccounted for combo. Player's ${playerSelection} vs. Computer's ${computerSelection}.`)
                break;
        }
        
        return outcome;
    }

    function UpdateScore(){
        if(roundResult === WIN){
            ++playerScore;
        } 
        
        if(roundResult === LOSE){
            ++computerSelection;
        }
    }

    function ShowRoundResult(){
        if(roundResult === WIN){
            console.log(`You Win! ${playerSelection} beats ${computerSelection}.`);
        } else if(roundResult === LOSE){
            console.log(`You Lose! ${playerSelection} loses to ${computerSelection}.`);
        } else {
            console.log(`It's a Tie! ${playerSelection} ties ${computerSelection}.`);
        }
    }

    function ShowScore(){
        let heading;
        let finalWinner;
        if(roundNumber < 5){
            heading = `Round ${roundNumber} Score`;
            finalWinner = "";
        }
        else{
            heading = `Final Score`;
            if(playerScore > computerScore){
                finalWinner = "Player Wins!";
            }
            else{
                finalWinner = "Computer Wins!";
            }
        }
        console.log(heading);
        console.log(`Player: ${playerScore}`);
        console.log(`Computer: ${computerScore}`);
        console.log(finalWinner);
    }

}
