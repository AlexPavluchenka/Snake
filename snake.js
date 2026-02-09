const SIZE = 67;
const MARS = 5;
const STSPEED = 200;
let W, H;
let speed;

let snake = [];
let marsy = [];
let dir;
let gameOver;
let timer;

let snakeImg, marsImg;

function contains(arr, elem)
{
    return arr.some(p => p.x === elem.x && p.y === elem.y);
}

function preload()
{
    snakeImg = loadImage("./img/thomas.jpg", resizeImg);
    marsImg = loadImage("./img/mars.png", resizeImg);
}

function resizeImg(img)
{
    img.resize(SIZE, SIZE);
}

function addMars()
{
    let x = floor(random(0, W));
    let y = floor(random(0, H));
    while(contains(marsy, {x, y}) || contains(snake, {x, y}))
    {
        x = floor(random(0, W));
        y = floor(random(0, H));
    }
    marsy.push({x:x, y:y});
}

function initSnake()
{
    snake = [{x:floor(random(0, W)), y:floor(random(0, H))}];
    dir = {x:0, y:0};
    gameOver = false;
    marsy = [];
    for(let i = 0; i < MARS; i++) addMars();
    speed = STSPEED;
    timer = millis();
    closeRick();
}

function setup()
{
    W = floor(windowWidth / SIZE);
    H = floor(windowHeight / SIZE * 0.95);
    W--;
    H--;
    let can = createCanvas(W * SIZE, H * SIZE);
    can.parent("canvas");

    initSnake();
}

function keyPressed()
{   
    if(gameOver)
    {
        if(key === 'r') initSnake();
        return;
    }
    if(key === 'w' || keyCode === UP_ARROW)
    {
        dir.x = 0;
        dir.y = -1;
    }
    else if(key === 's' || keyCode === DOWN_ARROW)
    {
        dir.x = 0;
        dir.y = 1;
    }
    if(key === 'a' || keyCode === LEFT_ARROW)
    {
        dir.x = -1;
        dir.y = 0;
    }
    if(key === 'd' || keyCode === RIGHT_ARROW)
    {
        dir.x = 1;
        dir.y = 0;
    }
}

function loser()
{
    playRick();
    gameOver = true;
}

function moveSnake()
{
    if(dir.x === 0 && dir.y === 0) return;
    let x = snake[0].x;
    let y = snake[0].y;
    let nx = x + dir.x;
    let ny = y + dir.y;
    if(nx < 0 || nx >= W || ny < 0 || ny >= H)
    {
        loser();
        return;
    }
    if(contains(snake, {x:nx, y:ny}))
    {
        if(snake.findIndex(p => p.x === nx && p.y === ny) !== snake.length - 1)
        {
            loser();
            return;
        }
    }

    if(contains(marsy, {x:nx, y:ny}))
    {
        marsy.splice(marsy.findIndex(p => p.x == nx && p.y == ny), 1);
    }
    else snake.pop();
    snake.unshift({x:nx, y:ny});
    if(marsy.length < MARS) addMars();
}

function draw()
{
    if(millis() - timer >= speed)
    {
        moveSnake();
        timer = millis();
    }

    background(0);
    fill(0);
    stroke(255);
    strokeWeight(1);
    for(let i = 0; i < W; i++)
    {
        for(let j = 0; j < H; j++)
        {
            rect(i * SIZE, j * SIZE, SIZE, SIZE);
        }
    }

    for(let i in snake)
    {
        image(snakeImg, snake[i].x * SIZE, snake[i].y * SIZE);
    }

    fill(255);
    noStroke();
    for(let i in marsy)
    {
        image(marsImg, marsy[i].x * SIZE, marsy[i].y * SIZE);
    }
}