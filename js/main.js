// Btn Start Game
function startGame() {
    const name = document.querySelector(".name span");
    // Name Is Empty && Set Name
    let yourName = prompt("Whats Your Name");
    yourName == null || yourName == ""
        ? (name.textContent = "Unknown")
        : (name.textContent = yourName);
    // Remove   Splash Screen
    document.querySelector(".control-btn").style.display = "none";
    document.querySelector(".start").classList.remove("play-agin");

    show();
    stopClick();
    setTimeout(() => {
        timer = setInterval(time, duration);
    }, duration);
}
// Click Start Game
document.querySelector(".start").addEventListener("click", startGame);


let duration;

// Show All Cards For 1s
function show() {
    let blocks = document.querySelectorAll(".game-block");
    blocks.forEach(block => {
        block.classList.add("show");
        if (block.classList.contains("show")) {
            duration = 5000;
        }

        setTimeout(() => {
            block.classList.remove("show");
            duration = 1000;
        }, duration);
    });
}

// Timer Function
function time() {
    let min = document.querySelector(".min"),
        scend = document.querySelector(".scend");

    if (scend.textContent >= 59) {
        min.textContent = 1;
        scend.textContent = 0;
        min.textContent < 10
            ? (min.textContent = "0" + min.textContent)
            : min.textContent;
    } else {
        scend.textContent = parseInt(scend.textContent) + 1;
    }
    scend.textContent < 10
        ? (scend.textContent = "0" + scend.textContent)
        : scend.textContent;

    // End Game
    if (blocksContainer.classList.contains("done")) {
        document.getElementById("winner").play();
        clearInterval(timer);

        // Save YOur Scoor
        const yourName = document.querySelector(".your-name span");
        const yourTime = document.querySelector(".your-time span");
        const yourTries = document.querySelector(".your-tries span");
        yourTime.textContent = min.textContent + " : " + scend.textContent;
        yourName.textContent = document.querySelector(".name span").textContent;
        yourTries.textContent = document.querySelector(
            ".tries span"
        ).textContent;

        // Winner Bos Show
        document.querySelector(".control-btn").style.display = "block";
        document.querySelector(".control-btn").style.backgroundColor =
            "transparent";
        document.querySelector(".start").classList.add("play-agin");
        if (document.querySelector(".start").classList.contains("play-agin")) {
            blocksContainer.classList.remove("done");
            document.querySelector(".start").textContent = "Play Again";
            document.querySelector(".name span").textContent = "";
            document.querySelector(".allbox .up").textContent = "0";
            min.textContent = "00";
            scend.textContent = "00";
            document.querySelector(".tries span").textContent = "0";
        }
        const win = document.querySelector(".box-win");
        win.style.visibility = "visible";

        // LocalStorage
        const players = JSON.parse(localStorage.getItem("Name"))
                ? JSON.parse(localStorage.getItem("Name"))
                : [],
            times = JSON.parse(localStorage.getItem("Time"))
                ? JSON.parse(localStorage.getItem("Time"))
                : [],
            trieses = JSON.parse(localStorage.getItem("Tries"))
                ? JSON.parse(localStorage.getItem("Tries"))
                : [];

        players.push(yourName.textContent);
        times.push(yourTime.textContent);
        trieses.push(yourTries.textContent);

        localStorage.setItem("Name", JSON.stringify(players));
        localStorage.setItem("Time", JSON.stringify(times));
        localStorage.setItem("Tries", JSON.stringify(trieses));

        const namePlay = JSON.parse(localStorage.getItem("Name"));
        namePlay.map(ply => {
            const span = document.createElement("span");
            span.textContent = ply;
            document.querySelector(".locla-name").appendChild(span);
        });

        const timePlay = JSON.parse(localStorage.getItem("Time"));
        timePlay.map(tim => {
            const span = document.createElement("span");
            span.textContent = tim;
            document.querySelector(".locla-time").appendChild(span);
        });

        const triesPly = JSON.parse(localStorage.getItem("Tries"));
        triesPly.map(tris => {
            const span = document.createElement("span");
            span.textContent = tris;
            document.querySelector(".locla-tries").appendChild(span);
        });
    }
}

let blocksContainer = document.querySelector(".memory-game-blocks");
const allCards = document.querySelectorAll(".game-block");
const blocks = Array.from(blocksContainer.children);
// Create Range Of Keys
// const orderRange = [...Array(blocks.length).keys()];
const orderRange = Array.from(Array(blocks.length).keys());
shuffle(orderRange);
// Add Oroder Css To Games Blocks
blocks.map((block, index) => {
    block.style.order = orderRange[index];

    // Add Click Event
    block.addEventListener("click", function() {
        // Trigger The Filp Block Function
        filpBlock(block);
    });
});

// Flip Block Function
function filpBlock(selectedBlock) {
    // Add Class Is-filpped
    selectedBlock.classList.add("is-flipped");

    // Collect All Filpped Cards
    let allFilppedBlocks = blocks.filter(filppedBlock =>
        filppedBlock.classList.contains("is-flipped")
    );

    if (allFilppedBlocks.length == 2) {
        stopClick();
        checkMatched(allFilppedBlocks[0], allFilppedBlocks[1]);
    }

    // Checked All Cards Has Class Match
    let dones = blocks.filter(done => done.classList.contains("match"));
    // End Game
    if (dones.length == allCards.length) {
        blocksContainer.classList.add("done");
        setTimeout(() => {
            blocks.filter(done => done.classList.remove("match"));
        }, duration);
    }
}

// Sotp Clicking Function
function stopClick() {
    blocksContainer.classList.add("no-click");
    setTimeout(() => {
        blocksContainer.classList.remove("no-click");
    }, duration);
}

// Check Matched Blocks
function checkMatched(firstBlock, secondBlock) {
    const triesCont = document.querySelector(".tries span");
    if (firstBlock.dataset.ainmate === secondBlock.dataset.ainmate) {
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("match");
        secondBlock.classList.add("match");

        document.querySelector("#succss").play();

        let cards = document.querySelector(".allbox .up");
        cards.textContent = parseInt(cards.textContent) + 1;
    } else {
        triesCont.textContent = parseInt(triesCont.textContent) + 1;
        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, duration);
        document.querySelector("#fail").play();
    }
}

// Shuffle Function
function shuffle(array) {
    // Setting Vars
    let current = array.length,
        temp,
        random;
    while (current > 0) {
        // Get Random Number
        random = Math.floor(Math.random() * current);

        // Decrease Length One
        current--;

        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    } /*
	for(current > 0;random = Math.floor(Math.random() * current);current--){
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
	}*/
    return array;
}
