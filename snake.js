const SIZE = 50;
let W, H;

let snake = [];

let snakeImg;
function preload()
{
    snakeImg = loadImage("./img/thomas.jpg", resizeImg);
}

function resizeImg(img)
{
    img.resize(SIZE, SIZE);
}

function initSnake()
{
    snake = [{x:floor(random(0, W)), y:floor(random(0, H))}];
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

function draw()
{
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
}