import { STRINGS } from '../lang/messages/en/string.js'
import { GameButton } from './game_button.js';

document.addEventListener("DOMContentLoaded", () => {
  const placeholderElements = document.querySelectorAll("[data-i18n-placeholder]");
  
  placeholderElements.forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (STRINGS && STRINGS[key]) {
      el.placeholder = STRINGS[key];
    }
  });

  const localeElements = document.querySelectorAll(".not-localized").forEach(el => {
    el.textContent = STRINGS[el.textContent]
    el.classList.remove("not-localized")

  })

  document.querySelector("title").innerText = STRINGS["index-title"]
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//let client_width = document.documentElement.clientWidth
//let client_height = document.documentElement.clientHeight


window.addEventListener('resize', handleResize);
function handleResize() {
}




document.getElementById('gamestart').addEventListener('submit', function(event) {
   event.preventDefault()

    const numButtons = parseInt(document.getElementById('memory-buttons').value)
    if (!numButtons || numButtons < 3 || numButtons > 7) {
      window.alert(`The value '${numButtons}' is not between 3 and 7!`)
      return
    }

    initGame(numButtons)
    document.getElementById('gamestart').style.display = "none"
})


async function initGame(numButtons) {


  console.log(numButtons)
  let buttons = Array.from({ length: numButtons}, (_, index) => new GameButton(index+1))

  buttons.forEach(button => document.getElementById("gamespace").appendChild(button.elem))
  buttons.forEach(button => button.showValue())
  
  await sleep(1000 * numButtons);

  buttons.forEach(button => {button.makeAbsolute()})

  scrambleButtons(buttons)
  for (let i = 0; i < numButtons-1; i++) {
    await sleep(2000);
    scrambleButtons(buttons)
  }

  buttons.forEach(button => button.hideValue())

  let current = 0
  buttons.forEach(button => button.elem.addEventListener("click", (event => {
    if (button.value <= current) {
      return
    }

    
    if (current + 1 == button.value) {
      button.elem.style.border = "3px dotted lime"
      button.elem.style.backgroundColor = "lightgray"
      button.showValue()
      current++
      if (current == numButtons) {
        winGame()
      }
      return
    }
    button.elem.style.border = "3px dotted red"
    button.elem.style.backgroundColor = "lightgray"
    button.showValue()
    loseGame(buttons)
  })))
}

function winGame() {
  document.getElementById("gamespace").style.display = "none"

  let win = document.createElement("p")
  win.innerText = STRINGS["win-game"]
  document.getElementById("body").appendChild(win)
}

async function loseGame(buttons) {
  console.log("lose")
  

  buttons.forEach(button => {button.showValue()})

  await sleep(3000)
  document.getElementById("gamespace").style.display = "none"
  let lose = document.createElement("p")
  lose.innerText = STRINGS["lose-game"]
  document.getElementById("body").appendChild(lose)
}


function scrambleButtons(buttons) {
  buttons[0].randomizePosition()
  let placedButtons = [buttons[0]]
  

  buttons.slice(1).forEach(button => {
    do {
      button.randomizePosition()
    }
    while (!(placedButtons.every(placedButton => doesCollide(button, placedButton))))
    placedButtons.push(button);

  })
  

  
}

function doesCollide(button1, button2) {

  return !((Math.abs(button1.getPosition().x - button2.getPosition().x) < button1.getSize().x) && 
          (Math.abs(button1.getPosition().y - button2.getPosition().y) < button1.getSize().y))

}

