export class Sprite {
    constructor({
        position,
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
    }) {
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 100;
        this.offset = offset;
    }

    draw() {
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        );
    }

    animateFrames() {
        this.framesElapsed++;

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++;
            } else {
                this.framesCurrent = 0;
            }
        }
    }

    update() {
        this.draw();
        this.animateFrames();
    }
}

export class Fighter extends Sprite {
    constructor({
        position,
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
        sprites,
        healthBarId,
    }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset,
        });

        this.width = 50;
        this.height = 150;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 100;
        this.sprites = sprites;
        this.dead = false;
        this.health = 100;
        this.healthBarId = healthBarId;

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;
        }
    }

    update() {
        document.querySelector(this.healthBarId).innerText = `${this.health}%`;
        this.draw();
        if (!this.dead) this.animateFrames();
    }

    punch() {
        this.switchSprite("punch");
        this.isAttacking = true;
    }

    switchSprite(sprite) {
        if (
            this.image === this.sprites.punch.image &&
            this.framesCurrent < this.sprites.punch.framesMax - 1
        )
            return;

        switch (sprite) {
            case "idle":
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image;
                    this.framesMax = this.sprites.idle.framesMax;
                    this.framesHold = this.sprites.idle.framesHold;
                    this.framesCurrent = 0;
                }
                break;
            case "punch":
                if (this.image !== this.sprites.punch.image) {
                    this.image = this.sprites.punch.image;
                    this.framesMax = this.sprites.punch.framesMax;
                    this.framesHold = this.sprites.punch.framesHold;
                    this.framesCurrent = 0;
                }
                break;
        }
    }
}
