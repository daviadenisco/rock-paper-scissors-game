let userScore = 0;
let compScore = 0;
const userName_div = document.getElementById('user-label')
const userScore_span = document.getElementById('user-score');
const compScore_span = document.getElementById('comp-score');
const scoreboard_div = document.querySelector('.scoreboard');
const newGame_button = document.getElementById('new-game');
const main_p = document.getElementById('main');
const sub_p = document.getElementById('sub');
const choices_div = document.querySelector('.choices');
const yourRock_img = document.getElementById('your-rock');
const yourPaper_img = document.getElementById('your-paper');
const yourScissors_img = document.getElementById('your-scissors');
const compRock_img = document.getElementById('comp-rock');
const compPaper_img = document.getElementById('comp-paper');
const compScissors_img = document.getElementById('comp-scissors');

// window.addEventListener('click', () => gameWinner());
main();

function newGame() {
    window.location.reload();
};

function gameWinner(comp, user) {
    user = userScore;
    comp = compScore;
    if (user === 5) {
        main_p.innerHTML = `You have won the match ${user} to ${comp}!`;
        sub_p.innerHTML = 'Click New Game to play again'
        scoreboard_div.classList.add('hide');
        choices_div.classList.add('disable');
    } else if (comp === 5) {
        main_p.innerHTML = `Comp has won the match ${comp} to ${user}!`;
        sub_p.innerHTML = 'Click New Game to play again'
        scoreboard_div.classList.add('hide');
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
    let compSelection_img_div = document.getElementById('computer-' + comp.toLowerCase());
    let userSelection_img_div = document.getElementById('user-' + user.toLowerCase());

    compSelection_img_div.classList.remove('comp-' + comp.toLowerCase());
    userSelection_img_div.classList.remove('your-' + user.toLowerCase());
    userSelection_img_div.classList.add('user-result-animation');
    compSelection_img_div.classList.add('comp-result-animation');
    
    setTimeout(() => {
        compSelection_img_div.classList.add('comp-' + comp.toLowerCase());
        userSelection_img_div.classList.add('your-' + user.toLowerCase());
        userSelection_img_div.classList.remove('user-result-animation');
        compSelection_img_div.classList.remove('comp-result-animation');
    }, 800);
    setTimeout(() => {
        gameWinner();   
    }, 825);
};

function win(user, comp) {
    let compSelection_img = document.getElementById('comp-' + comp.toLowerCase());
    let userSelection_img = document.getElementById('your-' + user.toLowerCase());
    userScore++;
    userScore_span.innerHTML = userScore;
   
    main_p.innerHTML = `You win! ${user} beats ${comp.toLowerCase()}.`;

    userSelection_img.classList.add('green-glow');
    compSelection_img.classList.add('red-glow');
    animate(user, comp);
    // debugger;
console.log('userWin userChoice: ', user);
console.log('userWin compChoice: ', comp);
console.log(`You win! ${user} beats ${comp.toLowerCase()}`);
    setTimeout(() => {
        userSelection_img.classList.remove('green-glow');
        compSelection_img.classList.remove('red-glow');
        main_p.innerHTML = '';
    }, 800);
};

function lose(user, comp) {
    let compSelection_img = document.getElementById('comp-' + comp.toLowerCase());
    let userSelection_img = document.getElementById('your-' + user.toLowerCase());
    compScore++;
    compScore_span.innerHTML = compScore;
   
    main_p.innerHTML = `You lost! ${comp} beats ${user.toLowerCase()}.`;
   
    compSelection_img.classList.add('green-glow');
    userSelection_img.classList.add('red-glow');
    animate(user, comp);
    // debugger;
    console.log('compWin userChoice: ', user);
    console.log('compWin compChoice: ', comp);
    console.log(`You lose! ${comp} beats ${user.toLowerCase()}`);
    setTimeout(() => {
        compSelection_img.classList.remove('green-glow');  
        userSelection_img.classList.remove('red-glow');
        main_p.innerHTML = '';      
    }, 800);
};

function draw(user, comp) {
    let compSelection_img = document.getElementById('comp-' + comp.toLowerCase());
    let userSelection_img = document.getElementById('your-' + user.toLowerCase());
    main_p.innerHTML = `It's a draw! ${comp} equals ${user.toLowerCase()}.`;
    
    compSelection_img.classList.add('grey-glow');
    userSelection_img.classList.add('grey-glow');
    animate(user, comp);
    console.log('draw userChoice: ', user);
    console.log('draw compChoice: ', comp);
    setTimeout(() => {
        compSelection_img.classList.remove('grey-glow');
        userSelection_img.classList.remove('grey-glow');
        main_p.innerHTML = '';
    }, 800);
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