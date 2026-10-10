export const DEFAULT_GAME_BUTTON_WIDTH = 10
export const DEFAULT_GAME_BUTTON_HEIGHT = 5


export class GameButton {
    constructor(st_val, cl) {
        this.value = st_val
        this.colour = cl

        if (!cl) {
            this.randomizeColour()
        }

        this.elem = document.createElement("div")
        this.elem.style.backgroundColor = this.colour
        
        this.elem.classList.add("game-button")
    }

    randomizeColour() {
        this.colour = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
    }


    showValue() {
        this.elem.innerText = `${this.value}`
        
    }

    hideValue() {
        this.elem.innerText = ""
    }

    moveTo(x, y) {
        this.elem.style.left = `${x}px`
        this.elem.style.top = `${y}px`
    }

    randomizePosition() {
        this.elem.style.left = `${Math.floor((document.documentElement.clientWidth - this.elem.offsetWidth) * Math.random())}px`
        this.elem.style.top = `${Math.floor((document.documentElement.clientHeight - this.elem.offsetHeight) * Math.random())}px`
        
    }

    getSize() {
        return {"x": parseInt(this.elem.offsetWidth), "y": parseInt(this.elem.offsetHeight)}
    }

    getPosition() {
        return {"x": parseInt(this.elem.style.left), "y": parseInt(this.elem.style.top)}
    }

    makeStatic() {
        this.elem.style.position = "static"
        this.elem.style.left = "auto"
        this.elem.style.top = "auto"
    }

    makeAbsolute() {
        this.elem.style.position = "absolute"
    }




}