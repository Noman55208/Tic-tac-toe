const boxes = document.querySelectorAll(".box");
const resetButton = document.getElementById("reset_btn");
const newGameButton = document.getElementById("new_btn");
const msgContainer = document.querySelector(".msgcontainer");
const msg = document.getElementById("msg");

let turnO = true; // true = X, false = O
let gameActive = true;

// Winning combinations
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
];

// Function to check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (boxes[a].innerText !== "" && 
            boxes[a].innerText === boxes[b].innerText && 
            boxes[a].innerText === boxes[c].innerText) {
            
            gameActive = false; // Stop the game
            showWinner(boxes[a].innerText);
            return;
        }
    }
    // Check for a tie
    if ([...boxes].every(box => box.innerText !== "")) {
        showWinner("It's a Tie!");
    }
};

// Function to display winner message
const showWinner = (winner) => {
    msg.innerText = (winner === "X" || winner === "O") ? `Winner: ${winner}` : winner;
    msgContainer.classList.remove("hide");
};

// Box click event
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "" && gameActive) {
            box.innerText = turnO ? "X" : "O";
            turnO = !turnO;
            checkWinner();
        }
    });
});

// Reset function
const resetGame = () => {
    boxes.forEach(box => {
        box.innerText = "";
    });
    turnO = true;
    gameActive = true;
    msgContainer.classList.add("hide");
};

// Event listeners
resetButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click", resetGame);



