const SIZE = 50;
let W, H;

function setup()
{
    W = floor(windowWidth / SIZE);
    H = floor(windowHeight / SIZE * 0.95);
    W--;
    H--;
    let can = createCanvas(W * SIZE, H * SIZE);
    can.parent("canvas");
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
}