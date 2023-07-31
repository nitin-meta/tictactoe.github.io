let app = document.querySelector("#app");
let player = 'X';
let win_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

startGame();

function startGame() {
    app.innerHTML = '';
    for (a = 0; a <= 8; a++) {
        app.innerHTML += `<div id="box${a}" class="box"></div>`;
    }

    let boxes = document.querySelectorAll(".box");

    boxes.forEach(box => {
        if (!box.classList.contains('X') && !box.classList.contains('O')) {
            box.onmouseover = () => {
                boxes.forEach(removeHover => {
                    if (!removeHover.classList.contains('X') && !removeHover.classList.contains('O')) {
                        removeHover.innerHTML = '';
                    }
                });
                box.innerHTML = player;
            }
        }
        box.addEventListener("click", () => {
            box.classList.add(player);
            box.style.pointerEvents = "none";
            box.innerHTML = player;

            if (checkWin(player)) {
                showWinner(`${player} Wins!`);
            } else if (draw()) {
                showWinner(`Draw`);
            }


            if (player == "X") {
                player = "O";
            } else {
                player = "X";
            }

        });
    });
}

function checkWin(current_player) {
    return win_combinations.some(combinations => {
        return combinations.every(index => {
            return document.querySelector(`#box${index}`).classList.contains(current_player);
        });
    })
}

function draw() {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8].every(index => {
        box = document.querySelector(`#box${index}`);
        return box.classList.contains("X") || box.classList.contains("O");
    });
}


function showWinner(message) {
    app.innerHTML += `
    <div class="result">
    <span>
    <div>${message}</div>
    <button id="restart">Restart</button>
    </span>
    </div>
    `;

    document.querySelector("#restart").onclick = () => {
        startGame();
    }
}