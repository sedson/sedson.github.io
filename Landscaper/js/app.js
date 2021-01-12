// some game control settings
const maxLawnPrice = 10000;
const numItemsInShop = 3;
let winAmt = 1000000000;
let lawnArray = []; // for tracking data about each lawn button
let ButtonIndex = 0;
let frame = 0; // the current "frame"
let gameRunning = true;

// import user and tools data from data.js
let user = makeUser();
let tools = makeTools();

initGame();

//-----------------------------------------------------
// GAME LOOP UPDATE
// function to update the buttons on the DOM
// trying to run like an Update() gmae loop
// https://www.sitepoint.com/quick-tip-game-loop-in-javascript/ - source for the game loop premise
// basics of the animation are from w3 schools progress bar
//-----------------------------------------------------
function updateButtons(){
  frame++;
  let allButtons = document.querySelectorAll(".lawn-button");

  for(let i = 0; i < allButtons.length; i++){
    // if the lawn button is animating, update the progress
    if (lawnArray[i].isAnimating === true) {
      let button = allButtons[i];
      let children = button.childNodes;
      let overlay = null;

      // to get a ref to the overlay div
      for(let j = 0; j < children.length; j++){
        if(children[j].className == "button-overlay") overlay = children[j];
        break;
      }

      // update the progress
      lawnArray[i].progress += user.mowingSpeed;

      // if the progress has made it to end reset
      if (lawnArray[i].progress >= 100) {
        lawnArray[i].isAnimating = false;
        lawnArray[i].progress = 0;
        user.money += user.perLawnEarnings;
        if (user.autoMower.enabled) lawnArray[i].isAnimating = true;
        // Reset and restart this lawn button if the user's autoMower is on
      }
      overlay.style.width = lawnArray[i].progress + "%"; //update the CSS width of the overlay
    }
  }

  if(user.money >= winAmt){
    document.querySelector("#win").style.display = "flex";
  }

  // update the report card every frame
  displayMoney();
  updateShopClasses();

  // call this function again on the window's next available frame
  if(gameRunning) window.requestAnimationFrame(updateButtons);
}

//-----------------------------------------------------
// Called when lawn button is clicked
//-----------------------------------------------------
function mowLawn(event){
  // Get the calling event
  let buttonPressed = event.target;
  let buttonIndex = parseInt(buttonPressed.id);

  // If something called this function that does'ne have a numerical ID - return
  if (isNaN(buttonIndex)) return;

  if(! lawnArray[buttonIndex].isAnimating) lawnArray[buttonIndex].isAnimating = true;
}

//-----------------------------------------------------
// Functions that update the DOM
//-----------------------------------------------------
function displayMoney() {
  let money = document.querySelector('#user-money');
  money.innerHTML = addCommasToNum(user.money);

  let prof = document.querySelector('#user-prof');
  prof.innerHTML = addCommasToNum(user.perLawnEarnings);

  let speed = document.querySelector('#user-speed');
  speed.innerHTML = user.mowingSpeed.toFixed(1);
}

function displayTools() {
  let toolsDiv = document.querySelector('#tools-content');
  toolsDiv.textContent = "";
  for(const t of user.myTools){
    let newTool = document.createElement("li");
    newTool.innerHTML = t.name;
    toolsDiv.appendChild(newTool);
  }
}

function displayShop() {
  let shopDiv = document.querySelector('#shop-content');
  shopDiv.textContent = ""; // reset internal elements

  // loop through first N elements of tools array
  for(let i = 0; i < numItemsInShop; i++){
    let tool = tools[i];
    if(typeof tool !== "undefined"){

      // make new paragraph
      let toolEntry = document.createElement("p");
      toolEntry.classList += "shop-entry ";
      toolEntry.id = tool.name;

      // gray it out if user cannot afford
      //if(user.money < tool.cost) toolEntry.classList += "cant-afford";
      toolEntry.innerHTML = `${tool.name} <span class="right-tag">$${addCommasToNum(tool.cost)} <a onclick="buyTool(${i})" >BUY</a></span>`;

      let infoText = document.createElement("p");
      let info = "";
      infoText.className = "tool-caption";

      if(tool.hasOwnProperty("description")){
        info = tool.description;
      } else {
        if(tool.value > 0) info += `Profit + $${addCommasToNum(tool.value)} `;
        if(tool.speed > 0) info += `Efficiency + ${tool.speed}`;
      }
      infoText.innerHTML = info;
      toolEntry.appendChild(infoText);
      shopDiv.appendChild(toolEntry);
    }
  }
}

function updateShopClasses(){
  let shopItems = document.querySelector('#shop-content').childNodes;
  for(let item of shopItems){
    item.classList.remove("cant-afford");
    if(user.money < tools[tools.findIndex(o => o.name === item.id)].cost){
      item.classList.add("cant-afford");
    }
  }
}

function displayAll(){
  displayMoney();
  displayTools();
  displayShop();
}

//-----------------------------------------------------
// function that lets user buy a given tool
//-----------------------------------------------------
function buyTool(index) {
  if(index >=0 && index < tools.length){
    if(user.money >= tools[index].cost){
      user.money -= tools[index].cost; //subtract cost

      // call special method if object has one
      if(tools[index].hasOwnProperty("onPurchase")){
        tools[index].onPurchase();
      }

      // add it to list of tools if it should be
      if(tools[index].equippable){
        user.myTools.push(tools[index]);
        user.mowingSpeed += tools[index].speed;
        user.perLawnEarnings += tools[index].value;
        tools.splice(index,1);
      }
    }
  }
  // refesh DOM
  displayAll();
}

//-----------------------------------------------------
// function that adds a new lawn button to the DOM
//-----------------------------------------------------
function createNewLawn(){
  let lawns = document.querySelector("#lawns");

  // making a new lawn object to add to the DOM
  let newLawn = document.createElement("div");
  newLawn.className = "lawn-button";

  // track a button index and add this ad an ID to the buttons -
  // so that I index an array of control values when the button is clicked later
  newLawn.id = ButtonIndex.toString();
  ButtonIndex++;

  newLawn.addEventListener("click", mowLawn); // buttons call this function when clicked

  // adding the overlay div which shows the progress of the lawn being mowed
  let overlay = document.createElement("div");
  overlay.className = "button-overlay";
  newLawn.appendChild(overlay);

  // adding internal text
  let text = document.createElement("p");
  text.innerHTML = "Mow Lawn";
  newLawn.appendChild(text);

  lawns.appendChild(newLawn);

  // whenever a new lawn button is made
  // i need to store its basic data in a structure
  // important for the indices of this array to match the indices of buttons in the DOM
  // and the id tags of the buttons
  lawnArray.push({isAnimating: false, progress: 0});
}

function initGame(){
  user = makeUser();
  tools = makeTools();
  lawnArray = [];
  ButtonIndex = 0;
  createNewLawn();
  displayAll();
  window.requestAnimationFrame(updateButtons);
}

function reset() {
  document.querySelector("#win").style.display = "none";
  let lawns = document.querySelector("#lawns");
  lawns.textContent = "";
  initGame();
}

// helper func for adding commas to string for legibility sake
function addCommasToNum(num){
  let n = num.toString().split('');
  let o = "";
  for(let i = n.length - 1, j = 0; i >= 0; i--, j++){
    o = (j % 3 === 2 && i !== 0 ? "," : "") + n[i] + o;
  }
  return o;
}
