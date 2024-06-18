const rollEl = document.querySelector(".roll");
const rollAgainEl = document.querySelector(".roll-again");
const namesEl = document.querySelector(".names");
const winnerEl = document.querySelector(".winner");
const entriesEl = document.querySelector(".entries");
const addItemEl = document.querySelector(".add-item");

function randomName() {
  const ENTRIES = [...entriesEl["entries[]"].values()].map((i) => i.value);
  const rand = Math.floor(Math.random() * ENTRIES.length);
  const name = ENTRIES[rand];
  namesEl.innerText = name;
}

function rollClick() {
  rollEl.classList.add("hide");
  rollAgainEl.classList.add("hide");
  winnerEl.classList.add("hide");
  namesEl.classList.remove("hide");

  setDeceleratingTimeout(randomName, 10, 30);

  setTimeout(() => {
    namesEl.classList.add("hide");
    winnerEl.classList.remove("hide");
    rollAgainEl.classList.remove("hide");

    const winner = namesEl.innerText;
    winnerEl.innerText = winner;
    winnerEl.innerHTML = `<span>And the winner is...</span><br>${winner}`;
  }, 4000);
}

function setDeceleratingTimeout(callback, factor, times) {
  const internalCallback = ((t, counter) => {
    return () => {
      if (--t > 0) {
        setTimeout(internalCallback, ++counter * factor);
        callback();
      }
    };
  })(times, 0);

  setTimeout(internalCallback, factor);
}

function removeItem(e) {
  e.preventDefault();
  const target = e.target.closest("div");
  target.remove();
  return false;
}

function addItem(e) {
  e.preventDefault();
  const items = entriesEl.querySelectorAll("input").length;
  const newItem = document.createElement("div");
  newItem.innerHTML = `
    <input type="text" name="entries[]" value="Item #${items + 1}">
    <button class="remove-item" type="button" onclick="removeItem(event)">×</button>
  `;
  addItemEl.parentNode.insertBefore(newItem, addItemEl);
  return false;
}

function formSubmit() {
  rollClick();
  return false;
}

window.addEventListener("load", (evt) => {
  const url = new URL(window.location.href);
  const entriesString = url.searchParams.get("entries") || "";
  const entries =
    entriesString
      .split(",")
      .map((e) => e.trim())
      .filter((e) => !!e) || [];

  if (entries.length) {
    console.log("found entries from query params", entries);
    entries.forEach((entry, i) => {
      let input = entriesEl.querySelectorAll("input")[i];
      if (!input && i > 2) addItem(evt);
      if (!input) input = entriesEl.querySelectorAll("input")[i];
      if (input) input.value = entry;
    });
  }
});