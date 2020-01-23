let userScore = 0;
let compScore = 0;
const userName_div = document.getElementById('user-label')
const userScore_span = document.getElementById('user-score');
const compScore_span = document.getElementById('comp-score');
const scoreboard_div = document.querySelector('.scoreboard');
const reset_div = document.getElementById('reset');
const newGame_button = document.getElementById('new-game');
const result_p = document.querySelector('.result-header > p');
const choices_div = document.querySelector('.choices');
const yourRock_img = document.getElementById('your-rock');
const yourPaper_img = document.getElementById('your-paper');
const yourScissors_img = document.getElementById('your-scissors');
const compRock_img = document.getElementById('comp-rock');
const compPaper_img = document.getElementById('comp-paper');
const compScissors_img = document.getElementById('comp-scissors');

window.addEventListener('click', () => gameWinner());
console.log('newGame_button.parentNode', newGame_button.parentNode);
main();

function newGame() {
    console.log('NEW Game')
    window.location.reload();
};

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
    newGame_button.addEventListener('click', function() {
        window.location.reload();

        newGame();
    });
};

function getCompChoice() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    const randomIndex = Math.floor(Math.random() * (choices.length));
    return choices[randomIndex];
};

// animate user win
// if user wins with rock, then comp has scissors
    // user rock should "smash" comp scissors
// if user wins with paper, then comp has rock
    // user paper should be on top of comp rock and then get larger with edges turning in
// if user wins with scissors, then comp has paper
    // user scissors should "slice" (just move quickly across comp paper a couple times)

// animate comp win
// if comp wins with rock, then user has scissors
    // comp rock should "smash" user scissors
// if comp wins with paper, then user has rock
    // comp paper should be on top of user rock and then get larger with edges turning in
// if comp wins with scissors, then user has paper
    // user scissors should "slice" (just move quickly across comp paper a couple times)

// animate draw
    // both user and comp images should come together in the center 
    // and then bounce off of one another back into their respective spots

function animate(user, comp) {
    let userSelection_img_div = document.getElementById('user-' + user.toLowerCase());
    let compSelection_img_div = document.getElementById('computer-' + comp.toLowerCase());

    userSelection_img_div.classList.remove('your-' + user.toLowerCase());
    compSelection_img_div.classList.remove('comp-' + comp.toLowerCase());
    compSelection_img_div.classList.add('result-animation');
    userSelection_img_div.classList.add('result-animation');
    
    setTimeout(() => {
        compSelection_img_div.classList.add('comp-' + comp.toLowerCase());
        userSelection_img_div.classList.add('your-' + user.toLowerCase());
        userSelection_img_div.classList.remove('result-animation');
        compSelection_img_div.classList.remove('result-animation');
    }, 500);
};

function win(user, comp) {
    let userSelection_img = document.getElementById('your-' + user.toLowerCase());
    let compSelection_img = document.getElementById('comp-' + comp.toLowerCase());
    userScore++;
    userScore_span.innerHTML = userScore;
   
    result_p.innerHTML = `You win! ${user} beats ${comp.toLowerCase()}.`;

    userSelection_img.classList.add('green-glow');
    compSelection_img.classList.add('red-glow');
    animate(user, comp);

    setTimeout(() => {
        console.log('WIN')
        userSelection_img.classList.remove('green-glow');
        compSelection_img.classList.remove('red-glow');
    }, 500);
};

function lose(user, comp) {
    let userSelection_img = document.getElementById('your-' + user.toLowerCase());
    let compSelection_img = document.getElementById('comp-' + comp.toLowerCase());
    compScore++;
    compScore_span.innerHTML = compScore;
   
    result_p.innerHTML = `You lost! ${comp} beats ${user.toLowerCase()}.`;
   
    userSelection_img.classList.add('red-glow');
    compSelection_img.classList.add('green-glow');
    animate(user, comp);

    setTimeout(() => {
        console.log('LOSE');
        userSelection_img.classList.remove('red-glow');
        compSelection_img.classList.remove('green-glow');        
    }, 500);
};

function draw(user, comp) {
    let userSelection_img = document.getElementById('your-' + user.toLowerCase());
    let compSelection_img = document.getElementById('comp-' + comp.toLowerCase());
    result_p.innerHTML = `It's a draw! ${comp} equals ${user.toLowerCase()}.`;
    
    userSelection_img.classList.add('grey-glow');
    compSelection_img.classList.add('grey-glow');
    animate(user, comp);

    setTimeout(() => {
        console.log('DRAW');
        userSelection_img.classList.remove('grey-glow');
        compSelection_img.classList.remove('grey-glow');

    }, 500);
};

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
    };
};

function main () {
    yourRock_img.addEventListener('click', () => game('Rock'));
    yourPaper_img.addEventListener('click', () => game('Paper'));
    yourScissors_img.addEventListener('click', () => game('Scissors'));
};