
/* 1. Make a function called "computerPlay" that returns either "Rock", "Paper" or "Scissors". 
- There are 3 possible combinations: Rock/Paper/Scissors.
- Generate a random number between 0 to 99.
- 0-32=Rock, 33-65=Paper, 66-98=Scissors, 99=reroll.
*/
function computerPlay() {
    let play;
    let randomNumber = Math.floor(Math.random()*100);
    switch(true){
        case randomNumber>98:
            play = computerPlay();
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

/*
Write a function that plays a single round of Rock Paper Scissors. The function should take two parameters - the playerSelection and computerSelection - and then return a string that declares the winner of the round like so: "You Lose! Paper beats Rock"

    Make your function’s playerSelection parameter case-insensitive (so users can input rock, ROCK, RocK or any other variation).
*/
/*
1. Input Variables: playerSelection = string, case-insensitive; computerSelection = string.
*/
let playerSelection = "pAper";
let computerSelection = computerPlay();

const capitalizeString = (queryString) => {
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

playerSelection = capitalizeString(playerSelection);
/*
Play outcomes:
1. Player plays Rock against Computer's:
 - Rock = Tie,
 - Paper = Player Lose,
 - Scissors = Player Win.
2. Player plays Paper against Computer's:
 - Rock = Player Win,
 - Paper = Tie,
 - Scissors = Player Lose.
3. Player plays Scissors against Computer's:
 - Rock = Player Lose,
 - Paper = Player Win,
 - Scissors = Tie. 
*/
function playRound(playerSelection, computerSelection){
    const ROCK = "Rock";
    const PAPER = "Paper";
    const SCISSORS = "Scissors";
    const WIN = "Win";
    const LOSE = "Lose";
    const TIE = "Tie";

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

    if(outcome === WIN){
        return `You Win! ${playerSelection} beats ${computerSelection}.`;
    } else if(outcome === LOSE){
        return `You Lose! ${playerSelection} loses to ${computerSelection}.`;
    } else {
        return `It's a Tie! ${playerSelection} ties ${computerSelection}.`;
    }
}

console.log(playRound(playerSelection, computerSelection));
/*
2. Output Variable: string that incorporates 1) win/loss, 2) player and computer selections (inputs).
*/
