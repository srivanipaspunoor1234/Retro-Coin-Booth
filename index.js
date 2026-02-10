let time = 0;
let timer = null;
let number = "";

const numberEl = document.getElementById("number");
const timeEl = document.getElementById("time");
const statusEl = document.getElementById("status");

function insertCoin() {
  time += 60;
  updateTime();
  statusEl.textContent = "₹1 coin accepted. Time added!";
}

function pressKey(key) {

  // * key
  if (key === '*') {
    if (timer) {
      endCall();
      return;
    }

    // Before call ---->  clear number
    number = "";
    numberEl.textContent = "";
    statusEl.textContent = "❌ Number cleared";
    return;
  }

  // # key -----> start call
  if (key === '#') {
    if (!timer) startCall();
    return;
  }

  // Disable input during call
  if (timer) return;

  // Allow only digits
  if (key < '0' || key > '9') return;
  if (number.length >= 10) return;

  number += key;
  numberEl.textContent = number;
}


// Indian mobile number validation
function isValidIndianMobile(num) {
  return (
    num.length === 10 &&
    !isNaN(num) &&
    (
      num.startsWith('6') ||
      num.startsWith('7') ||
      num.startsWith('8') ||
      num.startsWith('9')
    )
  );
}

function startCall() {
  // Only start if number is valid and timer not running
  if (!isValidIndianMobile(number)) {
    alert("Please enter a valid Indian mobile number (starts with 6/7/8/9)");
    return;
  }

  if (time <= 0) {
    alert("Insert ₹1 coin to start the call");
    return;
  }

  if (timer) return; // Prevent double start

  // Show call state ONLY in number box
  numberEl.textContent = "📞 Call Connected";
  statusEl.textContent = ""; // Clear status to avoid duplication

  timer = setInterval(() => {
    time--;
    updateTime();

    if (time <= 0) {
      endCall();
    }
  }, 1000);
}

function endCall() {
  clearInterval(timer);
  timer = null;
  time = 0;
  updateTime();

  number = "";

  // Show END message ONLY in number box
  numberEl.textContent = "⛔ Call Ended";

  // Clear status box to avoid duplication
  statusEl.textContent = "";
}

function updateTime() {
  const min = Math.floor(time / 60);
  const sec = time % 60;

  timeEl.textContent =
    min + ":" + (sec < 10 ? "0" + sec : sec);
}
