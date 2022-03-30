const bgSound = new Audio('./static/bgmusic.mp3'),
    blockSound = new Audio('./static/block.mp3'),
    overSound = new Audio('./static/gameover.mp3'),
    pointSound = new Audio('./static/point.mp3')

let inputDir = { x: 0, y: 0 },
speed = 6,
lastPaintTime = 0, 
snakeArray = [
    { x: 13, y: 15 }
],
food = { x: 7, y: 5 },
score = 0;

// UI alert

window.addEventListener('DOMContentLoaded', () => {
    window.alert('The UI of this game is designed for desktop only. Click OK to continue');
});

// Game Functions

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
    bgSound.play();
}
// collision function

function isCollide(snake){
    // if you collide with yourself
    for(let i = 1; i < snakeArray.length; i++){
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // if you collide with wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
    return false;
}
function gameEngine() {
    // Update snake array & food
    if(isCollide(snakeArray)){
        blockSound.play();
        bgSound.pause();
        inputDir = { x: 0, y: 0 };
        alert('Game Over. Click OK to play again');
        snakeArray = [
            { x: 13, y: 15 }
        ]
        bgSound.play();
        score = 0;
        scoreArea.innerHTML = `Score: 0`;
    }
    if(snakeArray[0].x === food.x && snakeArray[0].y === food.y){
        pointSound.play();
        snakeArray.unshift({x: snakeArray[0].x + inputDir.x, y:snakeArray[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b - a)*Math.random()), y: Math.round(a + (b - a)*Math.random())}
        score += 1;
        scoreArea.innerHTML = `Score: ${score}`;
        if(score > hScore){
            hScore = 0;
            hScore = score;
            localStorage.setItem('highScore', JSON.stringify(hScore));
            hgScore.innerHTML = `High-Score: ${hScore}`
        }
    }
    // Moving the snake
    for( let i = snakeArray.length -2; i >= 0; i--){
        snakeArray[i+1] = {...snakeArray[i]};

    }
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;

    // Display snake and food
    board.innerHTML = "";
    snakeArray.forEach((e,index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Main logic 
let highScore = localStorage.getItem('highScore');
if (highScore === null){
    hScore = 0;
    localStorage.setItem('highScore', JSON.stringify(hScore));
}
else{
    hScore = JSON.parse(highScore);
    hgScore.innerHTML = `High-Score: ${highScore}`
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 0 }
    switch (e.key) {
        case 'ArrowUp':
            console.log('ArrowUp')
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case 'ArrowDown':
            console.log('ArrowDown')
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case 'ArrowLeft':
            console.log('ArrowLeft')
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case 'ArrowRight':
            console.log('ArrowRight')
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default: 
            break;
    }
});