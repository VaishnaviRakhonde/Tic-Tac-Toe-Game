document.addEventListener("DOMContentLoaded", () => {
    let boxes = document.querySelectorAll(".box");
    let resetBtn = document.querySelector("#reset");
    let newBtn = document.querySelector("#new");

    let turn0 = true; // Player X, Player 0
    let gameActive = true; // Controls whether the game is active

    let winPatterns = [
        [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], 
        [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]
    ];

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if (!gameActive) return; // Prevent clicks after game ends

            if (turn0) {
                box.innerText = "O"; // Player O
            } else {
                box.innerText = "X"; // Player X
            }
            box.disabled = true;
            turn0 = !turn0;

            checkWinner();
        });
    });

    const disableBoxes = () => {
        boxes.forEach(box => box.disabled = true);
        gameActive = false;
    };

    const enableBoxes = () => {
        boxes.forEach(box => {
            box.disabled = false;
            box.innerText = "";
        });
        gameActive = true;
        turn0 = true;
    };

    const showWinnerPopup = (winner) => {
        setTimeout(() => {
            alert(`🎉 Congratulations! The winner is ${winner} 🏆`);
        }, 300);
        disableBoxes();
    };

    const checkWinner = () => {
        for (let pattern of winPatterns) {
            let [pos1, pos2, pos3] = pattern;
            let val1 = boxes[pos1].innerText;
            let val2 = boxes[pos2].innerText;
            let val3 = boxes[pos3].innerText;

            if (val1 !== "" && val1 === val2 && val2 === val3) {
                showWinnerPopup(val1);
                return;
            }
        }

        // Check for a draw condition (if all boxes are filled)
        if ([...boxes].every(box => box.innerText !== "")) {
            setTimeout(() => {
                alert("😲 It's a Draw! Try Again.");
            }, 300);
            disableBoxes();
        }
    };

    // Reset the game
    const resetGame = () => {
        enableBoxes();
    };

    resetBtn.addEventListener("click", resetGame);
    newBtn.addEventListener("click", resetGame);
});


