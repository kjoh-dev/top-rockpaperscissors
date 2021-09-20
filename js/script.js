/*Vision:
TOP Requirements:
- Buttons for player moves: rock, paper and scissors.
- Display results: running score and announce winner (player/computer to win 5 rounds).
Additional Considerations and Organization:
A. Title Screen:
    1. Title
    2. Graphic
    3. Start Button
B. Player Move Screen:
    1. Show Header with Player Score and Computer Score.
    2. Show Buttons for each move: Rock, Paper and Scissors
    3. Show Graphic representing each move
    4. Selected graphic movement to center-left while the rest fade out.
    5. Computer move selection: show selection animation.
    6. Show round result. Update scores.
    7. Show final score and leader if applicable. Else, go to next round (repeat B).
C. Game Over Screen:
    1. Announce winner. (Center and move to top?)
    2. Show final scores and number of rounds taken.
    3. Show button for Play Again.

*/

const rockButton = document.querySelector(".rock");
const paperButton = document.querySelector(".paper");
const scissorsButton = document.querySelector(".scissors");
const buttonsContainer = document.querySelector(".buttons-container");
const vs = document.querySelector(".vs");

const PLAYER_DEFAULT = "player-default";
const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

let buttonsHidden = false;
let playerSelection = null;
let computerSelection = null;
let roundResult = null; 
let roundNumber = 0;
let playerScore = 0;
let computerScore = 0;

for (let i = 0; i < buttonsContainer.childElementCount; i++) {
    const button = buttonsContainer.children[i];
    button.addEventListener("mouseenter", showPlayerMoveImage);
    button.addEventListener("mouseleave", showPlayerMoveImage);
    button.addEventListener("click", setPlayerMove);
    button.addEventListener("click", togglePlayerMoveButtons);
    button.addEventListener("click", showComputerMoveLayout);

}

vs.addEventListener("transitionend", computerPlay);

//Run after computer move layout transition complete:
//computerPlay();
// calcRound();
// calcScore();

//Need to be accompanied by relevant html elements before full implementation:
//showRoundResult()
// showScore()

function computerPlay() {
    const randomNumber = Math.floor(Math.random()*100);
    switch(true){
        case randomNumber>98:
            computerSelection = ComputerPlay();
            break;
        case randomNumber>65:
            computerSelection = SCISSORS;
            break;
        case  randomNumber>32:
            computerSelection = PAPER;
            break;
        default:
            computerSelection = ROCK;
            break;
    }

    const computerMoveImage = document.querySelector(".computer-move-image");
    showMoveImage(computerSelection, computerMoveImage);
}

function calcRound(){
    roundNumber++;
    switch(true){
        case (playerSelection === ROCK && computerSelection === ROCK):
            roundResult = TIE;
            break;
        case (playerSelection === ROCK && computerSelection === PAPER):
            roundResult = LOSE;
            break;
        case (playerSelection === ROCK && computerSelection === SCISSORS):
            roundResult = WIN;
            break;
        case (playerSelection === PAPER && computerSelection === ROCK):
            roundResult = WIN;
            break;
        case (playerSelection === PAPER && computerSelection === PAPER):
            roundResult = TIE;
            break;
        case (playerSelection === PAPER && computerSelection === SCISSORS):
            roundResult = LOSE;
            break;
        case (playerSelection === SCISSORS && computerSelection === ROCK):
            roundResult = LOSE;
            break;
        case (playerSelection === SCISSORS && computerSelection === PAPER):
            roundResult = WIN;
            break;
        case (playerSelection === SCISSORS && computerSelection === SCISSORS):
            roundResult = TIE;
            break;
        default:
            console.log(`Error - Unaccounted for combo. Player's ${playerSelection} vs. Computer's ${computerSelection}.`)
            break;
    }
}

function calcScore(){
    if(roundResult === WIN){
        ++playerScore;
    } 
    
    if(roundResult === LOSE){
        ++computerScore;
    }
}

function showRoundResult(){
    if(roundResult === WIN){
        alert(`You Win! ${playerSelection} beats ${computerSelection}.`);
    } else if(roundResult === LOSE){
        alert(`You Lose! ${playerSelection} loses to ${computerSelection}.`);
    } else {
        alert(`It's a Tie! ${playerSelection} ties ${computerSelection}.`);
    }
}

function showScore(){

    alert(`End of Round ${roundNumber}`);
    alert("Scores:");
    alert(`Player: ${playerScore}`);
    alert(`Computer: ${computerScore}`);
    if(playerScore > computerScore){
        alert("Player is Winning!");
    } else if (playerScore < computerScore){
        alert("Computer is Winning!");
    } else{
        alert("Scores are Tied!");
    }
}

function setPlayerMove(e){
    const move = e.target.className;
    switch (true) {
        case (move === ROCK):
            playerSelection = ROCK;
            break;
        case (move === PAPER):
            playerSelection = PAPER;
            break;
        case (move === SCISSORS):
            playerSelection = SCISSORS;
            break;
        default:
            alert(`Error - Unexpected play choice: ${move}`);
            break;
    }
}

function showMoveImage(move, imageElement){

    switch (true) {
        case (move === PLAYER_DEFAULT):
            imageElement.src = "img/rps-all.png";
            break;
        case (move === ROCK):
            imageElement.src = "img/rps-rock.png";
            break;
        case (move === PAPER):
            imageElement.src = "img/rps-paper.png";
            break;
        case (move === SCISSORS):
            imageElement.src = "img/rps-scissors.png";
            break;
        default:
            break;
    }
}

function toggleComputerMoveImage(){
    const computerMoveImage = document.querySelector(".computer-move-image");
    const computedStyle = window.getComputedStyle(computerMoveImage);
    const displayValue = computedStyle.getPropertyValue("display");
    if(displayValue === "none"){
        computerMoveImage.style.display = "block";
    }
    else{
        computerMoveImage.style.display = "none";
    }
}

function toggleVS(){
    const vsTransition = vs.classList.contains("vs-transition");
    if (vsTransition) {
        
        vs.classList.remove("vs-transition");
    }
    else{
        vs.style.fontSize = "96px";

        vs.classList.add("vs-transition");
    }
}

function showPlayerMoveImage(e){
    const playerMoveImage = document.querySelector(".player-move-image");

    if (e.type === "mouseleave" && buttonsHidden !== true) {
        showMoveImage(PLAYER_DEFAULT, playerMoveImage);
    } else {
        showMoveImage(e.target.className, playerMoveImage);
    }
    //Hide buttons after player move selection
    if (e.type === "click") {
        buttonsContainer.style.display = "none";
        buttonsHidden = true;
    }
}

//Toggle player move buttons on/off.
function togglePlayerMoveButtons(e){
    if(buttonsHidden === true){
        buttonsContainer.style.display = "flex";
        buttonsHidden = false;    
    } else {
        buttonsContainer.style.display = "none";
        buttonsHidden = true;    
    }
}

//Toggles computer move screen layout on/off.
function showComputerMoveLayout(){
    const mainElement = document.querySelector("main");
    const compStyles = window.getComputedStyle(mainElement);

    if (compStyles.getPropertyValue("flex-direction") === "column") {
        mainElement.style.flexDirection = "row";
        mainElement.style.justifyContent = "center";
        mainElement.style.alignItems = "start";
        
        toggleVS();
        toggleComputerMoveImage();
    } else {
        mainElement.style.flexDirection = "column";
        mainElement.style.justifyContent = "start";
        mainElement.style.alignItems = "center";

        toggleVS();
        toggleComputerMoveImage();
    }
}
