import { Fighter } from "./classes.js";

const canvas = document.querySelector("canvas");
window.c = canvas.getContext("2d");

const leftPlayer = new Fighter({
    position: {
        x: 0,
        y: 0,
    },
    offset: {
        x: 0,
        y: 0,
    },
    imageSrc: "./images/left/idle.png",
    framesMax: 2,
    scale: 0.4,
    sprites: {
        idle: {
            imageSrc: "./images/left/idle.png",
            framesMax: 1,
            framesHold: 50,
        },
        punch: {
            imageSrc: "./images/left/punch.png",
            framesMax: 3,
            framesHold: 9,
        },
    },
    healthBarId: "#zombie-health",
});

const rightPlayer = new Fighter({
    position: {
        x: 50,
        y: 0,
    },
    offset: {
        x: 0,
        y: 0,
    },
    imageSrc: "./images/right/idle.png",
    framesMax: 2,
    scale: 0.4,
    sprites: {
        idle: {
            imageSrc: "./images/right/idle.png",
            framesMax: 1,
            framesHold: 50,
        },
        punch: {
            imageSrc: "./images/right/punch.png",
            framesMax: 3,
            framesHold: 9,
        },
    },
    healthBarId: "#mummy-health",
});

const keys = {
    z: {
        pressed: false,
    },
    m: {
        pressed: false,
    },
};

const animate = () => {
    window.requestAnimationFrame(animate);

    c.fillStyle = "lightblue";
    c.fillRect(0, 0, canvas.width, canvas.height);

    leftPlayer.update();
    rightPlayer.update();

    if (keys.z.pressed) {
        leftPlayer.punch();
        rightPlayer.health -= 1;
        keys.z.pressed = false;
    } else {
        leftPlayer.switchSprite("idle");
    }

    if (keys.m.pressed) {
        rightPlayer.punch();
        leftPlayer.health -= 1;
        keys.m.pressed = false;
    } else {
        rightPlayer.switchSprite("idle");
    }

    if (rightPlayer.health <= 0 && leftPlayer.health > 0) {
        alert("Zombie (left player) wins!");
        location.reload();
    } else if (leftPlayer.health <= 0 && rightPlayer.health > 0) {
        alert("Mummy (right player) wins!");
        location.reload();
    } else if (leftPlayer.health <= 0 && rightPlayer.health <= 0) {
        alert("It's a draw!");
        location.reload();
    }
};

animate();

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "z":
            keys.z.pressed = true;
            leftPlayer.lastKey = "z";
            break;
        case "m":
            keys.m.pressed = true;
            leftPlayer.lastKey = "m";
            break;
    }
});
