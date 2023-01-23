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

let currentLines = [{
    isHorizontal: true,
    x1: 0,
    y1: height - 10,
    x2: 960,
    y2: height - 10
}]

function preload() {
    idleImage = loadImage('images/poses/idle.png')
    squatImage = loadImage('images/poses/squat.png')
    jumpImage = loadImage('images/poses/jump.png')
    oofImage = loadImage('images/poses/oof.png')
    run1Image = loadImage('images/poses/run1.png')
    run2Image = loadImage('images/poses/run2.png')
    run3Image = loadImage('images/poses/run3.png')
    fallImage = loadImage('images/poses/fall.png')

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
    enemy = new Enemy()
    player = new Player()
}

function draw() {
    background(10)

    player.checkIfLinesColliding(currentLines)
    if (!player.isHit) {
        player.isHit = player.CheckCollisions(enemy.currentPos.x, enemy.currentPos.y, enemy.currentPos.x + enemy.width, enemy.currentPos.y + enemy.height)
    }
    player.Update()
    player.Show()

    if (player.isShooting) {
        let bullet = new Bullet(player.currentPos.x, player.currentPos.y, player.isDirectionRight, player.isDirectionLeft)
        activeBullets.push(bullet)
    }

    activeBullets.map((bullet, index) => {
        if (!enemy.isHit) {
            enemy.isHit = bullet.CheckCollisions(enemy.currentPos.x, enemy.currentPos.y, enemy.currentPos.x + enemy.width, enemy.currentPos.y + enemy.height)
        }

        bullet.Update()
        bullet.Show()
        if (bullet.OutOfFrame()) {
            console.log("hello")
            activeBullets.splice(index, 1)
        }
    })


    if (frameCount % 15 === 0) {
        previousFrameRate = floor(getFrameRate())
    }

    fill(255, 255, 255);
    stroke(255);
    textSize(32);
    text('FPS: ' + previousFrameRate, width - 160, 35);
    line(0, height - 10, 960, height - 10)
    rect(0, 530, 960, 10)


    enemy.GetDistanceToPlayer(player.currentPos.x)
    enemy.Show()
    enemy.Update()

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
            player.isTouchingGround = false
            break;
    }
    switch (key) {
        case ' ':
            player.applyDash = true
            break
        case 'z':
            player.isShooting = true
            break

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
    }
    switch (key) {
        case ' ':
            player.applyDash = false
            break
        case 'z':
            player.isShooting = false
            break
    }
}




