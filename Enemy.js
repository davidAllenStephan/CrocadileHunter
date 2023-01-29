class Enemy {
    constructor() {
        this.width = 162
        this.height = 34
        this.currentPos = createVector(300, (540 - this.height) - 10)
        this.currentSpeed = createVector(3, 10)
        this.isDirectionLeft = false
        this.isDirectionRight = true
        this.isHit = false
        this.runCycle = [crocRun1Image, crocRun1Image, crocRun1Image, crocRun1Image, crocRun1Image, crocRun1Image, crocRun1Image, crocRun1Image, crocRun1Image, crocRun1Image, crocRun1Image, crocRun1Image, crocRun1Image, crocRun2Image, crocRun2Image, crocRun2Image, crocRun2Image, crocRun2Image, crocRun2Image, crocRun3Image, crocRun3Image, crocRun3Image, crocRun3Image, crocRun3Image, crocRun3Image, crocRun3Image, crocRun3Image, crocRun3Image, crocRun3Image, crocRun3Image, crocRun3Image, crocRun3Image, crocRun2Image, crocRun2Image, crocRun2Image, crocRun2Image, crocRun2Image, crocRun2Image]
        this.runSnapCycle = [crocSnap1Image, crocSnap1Image, crocSnap1Image, crocSnap1Image, crocSnap1Image, crocSnap1Image, crocSnap1Image, crocSnap1Image, crocSnap1Image, crocSnap1Image, crocSnap1Image, crocSnap1Image, crocSnap2Image, crocSnap2Image, crocSnap2Image, crocSnap2Image, crocSnap2Image, crocSnap2Image, crocSnap2Image, crocSnap3Image, crocSnap3Image, crocSnap3Image, crocSnap3Image, crocSnap3Image, crocSnap3Image, crocSnap3Image, crocSnap3Image, crocSnap3Image, crocSnap3Image, crocSnap3Image, crocSnap3Image, crocSnap3Image, crocSnap2Image, crocSnap2Image, crocSnap2Image, crocSnap2Image, crocSnap2Image, crocSnap2Image]
        this.currentRunIndex = 1
        this.distanceToPlayer = 0
    }
    GetDistanceToPlayer(playerX) {
        let distance = null
        if (this.isDirectionLeft) {
            distance = Math.abs(this.currentPos.x - playerX)
        } else if (this.isDirectionRight) {
            distance = Math.abs((this.currentPos.x + this.width) - playerX)
        }
        this.distanceToPlayer = distance
    }
    GetImageToUseBasedOnState() {
        if (this.distanceToPlayer < 150) {
            this.height = 54
            this.currentPos.y = (540 - this.height) - 10
            this.currentRunIndex += 1;
            if (this.currentRunIndex >= this.runSnapCycle.length) this.currentRunIndex = 0;
            return (this.runSnapCycle[this.currentRunIndex])
        } else {
            this.height = 34
            this.currentPos.y = (540 - this.height) - 10
            this.currentRunIndex += 1;
            if (this.currentRunIndex >= this.runCycle.length) this.currentRunIndex = 0;
            return (this.runCycle[this.currentRunIndex])
        }
    }
    SpeedUp() {
        if (this.distanceToPlayer < 150) {
            if (this.isDirectionLeft) {
                this.currentSpeed.x = -6
            }
            if (this.isDirectionRight) {
                this.currentSpeed.x = 6
            }
        } else {
            if (this.isDirectionLeft) {
                this.currentSpeed.x = -3
            }
            if (this.isDirectionRight) {
                this.currentSpeed.x = 3
            }
        }
    }
    Show() {
        let imageToUse = this.GetImageToUseBasedOnState();
        if (!this.isHit) {
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
        if (this.currentPos.x > (940 - this.width)) {
            this.isDirectionLeft = true
            this.isDirectionRight = false
            this.currentSpeed.x = -3
        } else {
            this.SpeedUp()
        }
        if (this.currentPos.x < 0) {
            this.isDirectionLeft = false
            this.isDirectionRight = true
            this.currentSpeed.x = 3
        } else {
            this.SpeedUp()
        }
        this.currentPos.add(this.currentSpeed.x, 0)
    }
}