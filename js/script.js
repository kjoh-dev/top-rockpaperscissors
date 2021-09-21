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
const playButtons = document.querySelector(".play-buttons");
const vs = document.querySelector(".vs");
const nextRoundButton = document.querySelector(".next-round");
const nextMatchButton = document.querySelector(".next-match");
const notificationPanel = document.querySelector("p");
const playerMoveImage = document.querySelector(".player-move-image");
const computerMoveImage = document.querySelector(".computer-move-image");

const PLAYER_DEFAULT = "player-default";
const COMPUTER_DEFAULT = "computer-default";
const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";
const WIN = "win";
const LOSE = "lose";
const TIE = "tie";

//List of trigger keywords for message display at different stages of the game:
const PLAYERCHOOSE = "player-choose";       //Choose your play.
const PLAYERSELECTED = "player-selected";   //You chose ${playerSelection}.
const WAITFORREVEAL = "wait-for-reveal";    //Computer chose...
const COMPUTERREVEAL = "computer-reveal";   //Computer chose ${computerSelection}
const ASSESSROUND = "assess-round";         //${playerSelection} beats/loses to ${computerSelection}.
const ROUNDWINNER = "round-winner";         //You Lose/Win
const SCORES = "scores";                    //Display current scores
const MATCHRESULTS = "match-results";       //Display final scores and match winner


let buttonsHidden = false;
let playerSelection = null;
let computerSelection = null;
let roundResult = null;
let roundNumber = 0;
let playerScore = 0;
let computerScore = 0;

for (let i = 0; i < playButtons.childElementCount; i++) {
    const button = playButtons.children[i];
    button.addEventListener("mouseenter", showPlayerMoveImage);
    button.addEventListener("mouseleave", showPlayerMoveImage);
    button.addEventListener("click", setPlayerMove);
    button.addEventListener("click", togglePlayerMoveButtons);
    button.addEventListener("click", toggleComputerMoveLayout);

}

nextRoundButton.addEventListener("click", continueToNextRound);
nextMatchButton.addEventListener("click", beginNewMatch);

vs.addEventListener("transitionend", computerPlay);

//End of Initializations

showNotification(PLAYERCHOOSE);



//Start of Functions Definitions
function resetStats() {
    roundResult = 0;
    roundNumber = 0;
    playerScore = 0;
    computerScore = 0;
}

function continueToNextRound() {
    nextRoundButton.classList.add("hidden");
    nextMatchButton.classList.add("hidden");

    showMoveImage(COMPUTER_DEFAULT, computerMoveImage);
    toggleComputerMoveLayout();
    togglePlayerMoveButtons();
    showNotification(PLAYERCHOOSE);
}

function beginNewMatch() {
    resetStats();
    continueToNextRound();
}

function computerPlay(e) {
    if (e.propertyName !== "opacity")
        return;

    const randomNumber = Math.floor(Math.random() * 100) + 1;
    switch (true) {
        case randomNumber > 66:
            computerSelection = SCISSORS;
            break;
        case randomNumber > 33:
            computerSelection = PAPER;
            break;
        default:
            computerSelection = ROCK;
            break;
    }

    setTimeout(function () {
        showMoveImage(computerSelection, computerMoveImage);
        showNotification(COMPUTERREVEAL);

        calcRound();
        calcScore();

        setTimeout(function () {
            showNotification(ASSESSROUND);
            setTimeout(function () {
                showNotification(ROUNDWINNER);
                setTimeout(function () {
                    showNotification(SCORES);

                    if (playerScore === 5 || computerScore === 5) {
                        setTimeout(function () {
                            showNotification(MATCHRESULTS);
                            nextMatchButton.classList.remove("hidden");
                        }, 1000);
                    } else {
                        nextRoundButton.classList.remove("hidden");
                    }
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}

function calcRound() {
    roundNumber++;
    switch (true) {
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

function showNotification(keyword) {
    let message = ``;
    switch (true) {
        case (keyword === PLAYERCHOOSE):
            message = "\u2191 \u2191 \u2191 WHAT'S YOUR PLAY? \u2191 \u2191 \u2191";
            break;
        case (keyword === PLAYERSELECTED):
            message = `YOU CHOSE ${playerSelection.toUpperCase()}`;
            break;
        case (keyword === WAITFORREVEAL):
            message = "COMPUTER CHOSE...";
            break;
        case (keyword === COMPUTERREVEAL):
            message = `${computerSelection.toUpperCase()}!`;
            break;
        case (keyword === ASSESSROUND):
            if (roundResult === WIN) {
                message = `${playerSelection.toUpperCase()} BEATS ${computerSelection.toUpperCase()}!`;
            } else if (roundResult === LOSE) {
                message = `${playerSelection.toUpperCase()} LOSES TO ${computerSelection.toUpperCase()}!`;
            } else {
                message = `${playerSelection.toUpperCase()} TIES ${computerSelection.toUpperCase()}!`;
            }
            break;
        case (keyword === ROUNDWINNER):
            if (roundResult === WIN) {
                message = "YOU WIN!";
            } else if (roundResult === LOSE) {
                message = "YOU LOSE!";
            } else {
                message = "IT'S A TIE!";
            }
            break;
        case (keyword === SCORES):
            message = `< ROUND ${roundNumber} SCORE >
                PLAYER: ${playerScore}
                COMPUTER: ${computerScore}`;
            break;
        case (keyword === MATCHRESULTS):
            if (playerScore > computerScore) {
                message = "PLAYER WINS THE MATCH!";
            } else {
                message = "COMPUTER WINS THE MATCH!";
            }
            break;
        default:
            message = `Error - no match for keyword, ${keyword}`;
            break;
    }

    notificationPanel.innerText = message;
}

function calcScore() {
    if (roundResult === WIN) {
        ++playerScore;
    }

    if (roundResult === LOSE) {
        ++computerScore;
    }
}

function showRoundResult() {
    if (roundResult === WIN) {
        alert(`You Win! ${playerSelection} beats ${computerSelection}.`);
    } else if (roundResult === LOSE) {
        alert(`You Lose! ${playerSelection} loses to ${computerSelection}.`);
    } else {
        alert(`It's a Tie! ${playerSelection} ties ${computerSelection}.`);
    }
}

function showScore() {

    alert(`End of Round ${roundNumber}`);
    alert("Scores:");
    alert(`Player: ${playerScore}`);
    alert(`Computer: ${computerScore}`);
    if (playerScore > computerScore) {
        alert("Player is Winning!");
    } else if (playerScore < computerScore) {
        alert("Computer is Winning!");
    } else {
        alert("Scores are Tied!");
    }
}

function setPlayerMove(e) {
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

    showNotification(PLAYERSELECTED);
    setTimeout(function () {
        showNotification(WAITFORREVEAL);
    }, 1000);
}

function showMoveImage(move, imageElement) {
    switch (true) {
        case (move === PLAYER_DEFAULT):
            imageElement.src = "img/rps-all.png";
            break;
        case (move === COMPUTER_DEFAULT):
            imageElement.src = "img/move-hidden.png";
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

function toggleComputerMoveImage() {
    const computerMoveImage = document.querySelector(".computer-move-image");
    const computedStyle = window.getComputedStyle(computerMoveImage);
    const displayValue = computedStyle.getPropertyValue("display");
    if (displayValue === "none") {
        computerMoveImage.style.display = "block";
    }
    else {
        computerMoveImage.style.display = "none";
    }
}

function toggleVS() {
    const vsTransition = vs.classList.contains("vs-transition");
    if (vsTransition) {
        vs.style.transition = "none";
        vs.style.fontSize = "0px";
        vs.style.transitionDuration = "0.5s"
        vs.classList.remove("vs-transition");
    }
    else {
        vs.style.fontSize = "96px";
        vs.style.transition = "margin, font-size, opacity";
        vs.style.transitionDuration = "1.5s"
        vs.classList.add("vs-transition");
    }
}

function showPlayerMoveImage(e) {

    if (!buttonsHidden) {
        if (e.type === "mouseleave") {
            showMoveImage(PLAYER_DEFAULT, playerMoveImage);
            return;
        }
        if (e.type === "mouseenter") {
            showMoveImage(e.target.className, playerMoveImage);
            return;
        }
        if (e.type === "click") {
            playButtons.style.display = "none";
            buttonsHidden = true;
            return;
        }
    }
}

//Toggle player move buttons on/off.
function togglePlayerMoveButtons() {
    if (buttonsHidden === true) {
        playButtons.style.display = "flex";
        buttonsHidden = false;
    } else {
        playButtons.style.display = "none";
        buttonsHidden = true;
    }
}

//Toggles computer move screen layout on/off.
function toggleComputerMoveLayout() {
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
