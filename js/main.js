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
  show();
  stopClick();
  setTimeout(() => {
    timer = setInterval(time, duration);
  }, 3000);
}

// Click Start Game
document.querySelector(".start").addEventListener("click", startGame);

// Show All Cards For 1s
function show() {
  let blocks = document.querySelectorAll(".game-block");
  blocks.forEach(block => {
    block.classList.add("show");
    setTimeout(() => {
      block.classList.remove("show");
    }, 3000);
  });
}

let duration = 1000;

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
  if (blocksContainer.classList.contains("done")) {
    clearInterval(timer);
    const win = document.querySelector(".box-win");
    const yourTime = document.querySelector(".Your-time span");
    yourTime.textContent = document.querySelector(".timer").textContent;
    win.style.visibility = "visible";
  }
}

let blocksContainer = document.querySelector(".memory-game-blocks");

const blocks = Array.from(blocksContainer.children);

// Create Range Of Keys
// const orderRange = [...Array(blocks.length).keys()];
const orderRange = Array.from(Array(blocks.length).keys());
shuffle(orderRange);

// Add Oroder Css To Games Blocks
blocks.map((block, index) => {
  // console.log(blocksContainer.children.item(index).localName)

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
  if (dones.length == 20) {
    blocksContainer.classList.add("done");
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
