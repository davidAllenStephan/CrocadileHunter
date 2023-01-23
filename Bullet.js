class Bullet {
    constructor(playerPosX, playerPosY, playerDirRight, playerDirLeft) {
        this.currentPos = createVector(playerPosX, playerPosY + 20)

        this.speed = 40
        if (playerDirLeft) {
            this.currentSpeed = createVector(-this.speed, -5)
        }
        if (playerDirRight) {
            this.currentSpeed = createVector(this.speed, -5)
        }
        this.gravity = 0.5
        this.terminalVelocity = 20
        this.isMaxHeight = false
        this.maxHeight = 300

        this.height = 10
        this.width = 10
    }

    Show() {
        push()
        fill(0, 255, 0);
        stroke(0, 255, 0)
        rect(this.currentPos.x, this.currentPos.y, this.height, this.width);
        pop()
    }

    Update() {
        this.currentPos.add(this.currentSpeed.x, 0)
    }

    ApplyGravity() {
        this.currentSpeed.y = min(this.currentSpeed.y + this.gravity, this.terminalVelocity)
        this.currentPos.add(0, this.currentSpeed.y)
    }
    CheckCollisions(checkX1, checkY1, checkX2, checkY2) {
        let bulletX1 = this.currentPos.x
        let bulletY1 = this.currentPos.y
        let bulletX2 = bulletX1 + this.width
        let bulletY2 = bulletY1 + this.height

        if ((bulletX1 > checkX1 && bulletX1 < checkX2) && (bulletY2 > checkY1 && bulletY2 < checkY2) || (bulletX2 > checkX1 && bulletX2 < checkX2) && (bulletY2 > checkY1 && bulletY2 < checkY2)) {
            return true
        }

        return false

    }
    OutOfFrame() {
        if (this.currentPos.x > 960 || this.currentPos.x < 0) {
            return true
        }
        return false
    }

}