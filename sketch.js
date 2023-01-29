let canvas = null
let player = null
let enemy = null
let activeBullets = []

let width = 960
let height = 540

let previousFrameRate = 0;

let idleImage = null;
let squatImage = null;
let jumpImage = null;
let oofImage = null;
let run1Image = null;
let run2Image = null;
let run3Image = null;
let fallImage = null;

let crocRun1Image = null
let crocRun2Image = null
let crocRun3Image = null

let crocSnap1Image = null
let crocSnap2Image = null
let crocSnap3Image = null

let isGameWon = false

let currentLines = [
    {
        x1: 0,
        y1: height,
        x2: width,
        y2: height
    },
    {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: height
    },
    {
        x1: width,
        y1: 0,
        x2: width,
        y2: height
    },
    {
        x1: 0,
        y1: 0,
        x2: width,
        y2: 0
    }
]

function preload() {
    idleImage = loadImage('images/poses/idle.png')
    squatImage = loadImage('images/poses/squat.png')
    run1Image = loadImage('images/poses/run1.png')
    run2Image = loadImage('images/poses/run2.png')
    run3Image = loadImage('images/poses/run3.png')

    crocRun1Image = loadImage('images/enemy/run1.png')
    crocRun2Image = loadImage('images/enemy/run2.png')
    crocRun3Image = loadImage('images/enemy/run3.png')

    crocSnap1Image = loadImage('images/enemy/snap1.png')
    crocSnap2Image = loadImage('images/enemy/snap2.png')
    crocSnap3Image = loadImage('images/enemy/snap3.png')
}

function setup() {
    canvas = createCanvas(960, 540)
    canvas.parent("canvas")
    background(10)
    player = new Player()
}

function draw() {
    background(10)

    player.checkIfLinesColliding(currentLines)
    player.Update()
    player.Show()


    if (frameCount % 15 === 0) {
        previousFrameRate = floor(getFrameRate())
    }

    fill(255, 255, 255);
    stroke(255);
    textSize(32);
    text('FPS: ' + previousFrameRate, width - 160, 35);
    currentLines.map((l) => {
        line(l.x1, l.y1, l.x2, l.y2)
    })
}

function keyPressed() {
    switch (keyCode) {
        case LEFT_ARROW:
            player.isLeftPressed = true
            break;
        case RIGHT_ARROW:
            player.isRightPressed = true
            break;
        case UP_ARROW:
            player.isUpPressed = true
            break;
        case DOWN_ARROW:
            player.isDownPressed = true
            break;
    }
}

function keyReleased() {
    switch (keyCode) {
        case LEFT_ARROW:
            player.isLeftPressed = false
            break;
        case RIGHT_ARROW:
            player.isRightPressed = false
            break;
        case UP_ARROW:
            player.isUpPressed = false
            break;
        case DOWN_ARROW:
            player.isDownPressed = false
            break;
    }
}




