class Player {
    constructor() {
        this.currentPos = createVector(200, 300)
        this.currentSpeed = createVector(0, 0)
        this.isLeftPressed = false
        this.isRightPressed = false
        this.gravity = 1
        this.terminalVelocity = 20
        this.applyDash = false
        this.isDirectionLeft = false
        this.isDirectionRight = true
        this.isTouchingGround = false
        this.height = 70
        this.width = 65
        this.isShooting = false
        this.runCycle = [run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run2Image, run2Image, run2Image, run2Image, run2Image, run2Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run2Image, run2Image, run2Image, run2Image, run2Image, run2Image]
        this.currentRunIndex = 1
        this.isHit = false
    }

    GetImageToUseBasedOnState() {
        if (this.currentSpeed.y < 0 && !this.isTouchingGround) return jumpImage;
        if (this.currentSpeed.x !== 0) {
            this.currentRunIndex += 1;
            if (this.currentRunIndex >= this.runCycle.length) this.currentRunIndex = 0;
            return (this.runCycle[this.currentRunIndex])
        }
        if (this.isTouchingGround) return idleImage;
        return fallImage;
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
        if (this.applyDash) {
            this.currentSpeed.x = 20
            if (this.isDirectionLeft) {
                this.currentPos.add(-50, 0)
            }
            if (this.isDirectionRight) {
                this.currentPos.add(50, 0)
            }

        }
        if (!this.applyDash) {
            this.currentSpeed.x = 0
            if (!this.isTouchingGround) {
                this.ApplyGravity()
            }
            if (this.isLeftPressed) {
                this.currentSpeed.x = 5
                this.isDirectionLeft = true
                this.isDirectionRight = false
                this.currentPos.add(-this.currentSpeed.x, 0)
            }
            if (this.isRightPressed) {
                this.currentSpeed.x = 5
                this.isDirectionRight = true
                this.isDirectionLeft = false
                this.currentPos.add(this.currentSpeed.x, 0)
            }
            if (this.isTouchingGround) {
                this.Jump()
            }
        }
    }

    checkIfLinesColliding(lines) {
        lines.map((l) => {
            if (l.isHorizontal) {
                let isRectWithinLineY = (this.currentPos.y + this.height) > l.y1 || (this.currentPos.y + this.height) > l.y2
                if (isRectWithinLineY) {
                    this.currentPos.y = l.y1 - this.height
                    this.isTouchingGround = true
                }
            }
        })
    }

    ApplyGravity() {
        if (!this.isTouchingGround) {
            this.currentSpeed.y = min(this.currentSpeed.y + this.gravity, this.terminalVelocity)
            this.currentPos.add(0, this.currentSpeed.y)
        }
    }

    Jump() {
        this.currentSpeed.y = -map(20, 0, 20, 10, 20)
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