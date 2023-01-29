class Player {
    constructor() {
        this.currentPos = createVector(200, 300)
        this.currentSpeed = createVector(0, 0)

        this.isLeftPressed = false
        this.isRightPressed = false
        this.isUpPressed = false
        this.isDownPressed = false

        this.isMovingLeft = false
        this.isMovingRight = false
        this.isMovingUp = false
        this.isMovingDown = false

        this.isDirectionLeft = false
        this.isDirectionRight = true
        this.isDirectionUp = false
        this.isDirectionDown = false

        this.height = 72
        this.width = 84
        this.isShooting = false
        this.runCycle = [run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run2Image, run2Image, run2Image, run2Image, run2Image, run2Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run2Image, run2Image, run2Image, run2Image, run2Image, run2Image]
        this.currentRunIndex = 1
        this.isHit = false
    }
    GetImageToUseBasedOnState() {
        if (this.currentSpeed.x !== 0 || this.currentSpeed.y !== 0) {
            this.currentRunIndex += 1;
            if (this.currentRunIndex >= this.runCycle.length) this.currentRunIndex = 0;
            return (this.runCycle[this.currentRunIndex])
        }
        return idleImage;

    }
    Show() {
        if (!this.isHit) {
            let imageToUse = this.GetImageToUseBasedOnState();
            if (this.isDirectionLeft) {
                push()
                scale(-1, 1)
                image(imageToUse, -this.currentPos.x, this.currentPos.y, -this.width, this.height);
                pop()
            } else {
                image(imageToUse, this.currentPos.x, this.currentPos.y, this.width, this.height);
            }
        }
    }
    Update() {
        this.CheckCollisions()
        this.currentSpeed.x = 0
        this.currentSpeed.y = 0
        if (this.isLeftPressed) {
            this.currentSpeed.x = 5
            this.isDirectionLeft = true
            this.isDirectionRight = false
            this.isMovingLeft = true
            this.currentPos.add(-this.currentSpeed.x, 0)
        } else {
            this.isMovingLeft = false
        }
        if (this.isRightPressed) {
            this.currentSpeed.x = 5
            this.isDirectionRight = true
            this.isDirectionLeft = false
            this.isMovingRight = true
            this.currentPos.add(this.currentSpeed.x, 0)
        } else {
            this.isMovingRight = false
            this.isDirectionRight = false
        }
        if (this.isUpPressed) {
            this.currentSpeed.y = 5
            this.isDirectionUp = true
            this.isMovingUp = true
            this.currentPos.add(0, -this.currentSpeed.y)
        } else {
            this.isDirectionUp = false
            this.isMovingUp = false
        }
        if (this.isDownPressed) {
            this.currentSpeed.y = 5
            this.isDirectionDown = true
            this.isMovingDown = true
            this.currentPos.add(0, this.currentSpeed.y)
        } else {
            this.isDirectionDown = false
            this.isMovingDown = false
        }
    }

    checkIfLinesColliding(lines) {
        const points = [
            {
                //top
                x1: this.currentPos.x,
                y1: this.currentPos.y,
                x2: this.currentPos.x + this.width,
                y2: this.currentPos.y
            },
            {
                //right
                x1: this.currentPos.x + this.width,
                y1: this.currentPos.y,
                x2: this.currentPos.x + this.width,
                y2: this.currentPos.y + this.height
            },
            {
                //bottom
                x1: this.currentPos.x + this.width,
                y1: this.currentPos.y + this.height,
                x2: this.currentPos.x,
                y2: this.currentPos.y + this.height
            },
            {
                //left
                x1: this.currentPos.x,
                y1: this.currentPos.y + this.height,
                x2: this.currentPos.x,
                y2: this.currentPos.y
            }
        ]
        lines.map(l => {
            points.map((point, index) => {
                const isColliding = this.AreLinesColliding(point.x1, point.y1, point.x2, point.y2, l.x1, l.y1, l.x2, l.y2)
                if (isColliding) {
                    if (index === 1 || index === 3) {
                        if (this.isMovingUp) {
                            this.currentPos.y = l.y1 + 5
                        } else if (this.isMovingDown) {
                            this.currentPos.y = l.y1 - (this.height + 5)
                        }
                    } else if (index === 0 || index === 2) {
                        if (this.isMovingLeft) {
                            this.currentPos.x = l.x1 + 5
                        } else if (this.isMovingRight) {
                            this.currentPos.x = l.x1 - (this.width + 5)
                        }
                    }
                }
            })
        })
    }
    AreLinesColliding = (x1, y1, x2, y2, x3, y3, x4, y4) => {
        let uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
        let uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
        if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
            return true;
        }
        return false

    }

    CheckCollisions(checkX1, checkY1, checkX2, checkY2) {
        let playerX1 = this.currentPos.x
        let playerY1 = this.currentPos.y
        let playerX2 = playerX1 + this.width
        let playerY2 = playerY1 + this.height

        if ((playerX1 > checkX1 && playerX1 < checkX2 && playerY2 > checkY1) || (playerX2 > checkX1 && playerX2 < checkX2 && playerY2 > checkY1)) {
            return true
        }

        return false

    }
}