const ZOMBIE = {
    key: "z",
    health: 10,
};
document.querySelector("#zombie-health").innerText = ZOMBIE.health;

const MUMMY = {
    key: "m",
    health: 10,
};
document.querySelector("#mummy-health").innerText = MUMMY.health;

document.addEventListener("keydown", (event) => {
    if (event.key === ZOMBIE.key) {
        MUMMY.health -= 1;
        document.getElementById("mummy-health").innerText = MUMMY.health;
        if (MUMMY.health === 0) {
            alert("Mummy is dead!");
        }
    } else if (event.key === MUMMY.key) {
        ZOMBIE.health -= 1;
        document.getElementById("zombie-health").innerText = ZOMBIE.health;
        if (ZOMBIE.health === 0) {
            alert("Zombie is dead!");
        }
    }
});
