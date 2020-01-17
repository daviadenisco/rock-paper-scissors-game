let userScore = 0;
let compScore = 0;
const userName_div = document.getElementById('user-label')
const userScore_span = document.getElementById('user-score');
const compScore_span = document.getElementById('comp-score');
const scoreboard_div = document.querySelector('.scoreboard');
const reset_div = document.getElementById('reset');
const playAgain_button = document.getElementById('play-again');
const result_p = document.querySelector('.result > p');
const choices_div = document.querySelector('.choices');
const rock_div = document.getElementById('rock');
const paper_div = document.getElementById('paper');
const scissors_div = document.getElementById('scissors');

// let userName = prompt("Please enter a username up to four letters", "<name goes here>");
// if (userName !== null && userName.length < 4) {
//     userName_div.innerHTML = userName;
// };

window.addEventListener('click', () => gameWinner());

main();

function playAgain() {
    // choices_div.classList.remove('disable');
    window.location.reload();
}

function gameWinner(user, comp) {
    user = userScore;
    comp = compScore;
    if (user === 5) {
        result_p.innerHTML = `You have won the match ${user} to ${comp}!`;
        scoreboard_div.classList.add('hide');
        reset_div.classList.remove('hide');
        choices_div.classList.add('disable');
    } else if (comp === 5) {
        result_p.innerHTML = `Comp has won the match ${comp} to ${user}!`;
        scoreboard_div.classList.add('hide');
        reset_div.classList.remove('hide');
        choices_div.classList.add('disable');
    }
    playAgain_button.addEventListener('click', function() {
        playAgain();
    });
}

function getCompChoice() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    const randomIndex = Math.floor(Math.random() * (choices.length));
    return choices[randomIndex];
}

function win(user, comp) {
    let userSelection_div = document.getElementById(user.toLowerCase());
    userScore++;
    userScore_span.innerHTML = userScore;
    result_p.innerHTML = `You win! ${user} beats ${comp.toLowerCase()}.`;
    userSelection_div.classList.add('green-glow');
    setTimeout(() => userSelection_div.classList.remove('green-glow'), 300);
}

function lose(user, comp) {
    let userSelection_div = document.getElementById(user.toLowerCase());
    compScore++;
    compScore_span.innerHTML = compScore;
    result_p.innerHTML = `You lost! ${comp} beats ${user.toLowerCase()}.`;
    userSelection_div.classList.add('red-glow');
    setTimeout(() => userSelection_div.classList.remove('red-glow'), 300);
}

function draw(user, comp) {
    let userSelection_div = document.getElementById(user.toLowerCase());
    result_p.innerHTML = `It's a draw! ${comp} equals ${user.toLowerCase()}.`;
    userSelection_div.classList.add('grey-glow');
    setTimeout(() => userSelection_div.classList.remove('grey-glow'), 300);
}

function game(userChoice) {
    const compChoice = getCompChoice();
    switch (userChoice + compChoice) {
        case 'RockScissors':
        case 'ScissorsPaper':
        case 'PaperRock':
            win(userChoice, compChoice);
            break;
        case 'ScissorsRock':
        case 'PaperScissors':
        case 'RockPaper':
            lose(userChoice, compChoice);
            break;
        case 'RockRock':
        case 'PaperPaper':
        case 'ScissorsScissors':
            draw(userChoice, compChoice);
            break;
    }
}

function main () {
    rock_div.addEventListener('click', () => game('Rock'));
    paper_div.addEventListener('click', () => game('Paper'));
    scissors_div.addEventListener('click', () => game('Scissors'));
};
