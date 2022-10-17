import {dogs} from "./data.js"
import Dog from "./Dog.js"


const userProfile = document.querySelector(".user-profile")
const xBtn = document.getElementById("x-btn")
const heartBtn = document.getElementById("heart-btn")
const chatBtn = document.getElementById("chat-btn")
const chatForm  = document.getElementById("chat-form")
const commentSection = document.querySelector(".comment-section")
const chatLogo = document.getElementById("chat-logo")
const chatSection = document.querySelector(".chat-section")
const dogsArray = []

let index=0
let currentDog

/**
 * Transform the data from the data file into an array of Dog objects
 */
function renderData() {
    for(let dog of dogs){
        dogsArray.push(new Dog(dog))
    }
}
/**
 * Renders onto the screen a new dog and its information
 */
function render() {
    currentDog = getNextDog()
    userProfile.innerHTML = currentDog.getDogHtml()
    commentSection.innerHTML = currentDog.getCommentsHtml()
    index++ 
}
/**
 * Updates the comments of the current dog
 */
function updateCurrentDog() {
    commentSection.innerHTML = currentDog.getCommentsHtml()

}
/**
 * Gets the next dog
 * @returns the next dog object
 */
function getNextDog() {
    if(index < dogsArray.length){ 
        return dogsArray[index]
    }
    else {
        index = 0
        return dogsArray[index]
    }
}
/**
 * Event listener when a user presses the heart button
 */
heartBtn.addEventListener("click", () => {
    if(!currentDog.hasBeenSwiped){
        currentDog.hasBeenLiked = true
        currentDog.hasBeenSwiped = true

        setTimeout(() => {
            userProfile.innerHTML += currentDog.dogLiked()
            chatLogo.style.paddingBottom = "5px"
            chatLogo.style.borderBottom = "2px solid #3fcea3"
            chatLogo.style.cursor = "pointer"
            document.querySelector(".btn-container").style.width = "140px"
            document.querySelector(".next-btn").classList.remove("hidden-next-btn")
            if(currentDog.hasBeenLiked){
            chatLogo.addEventListener("click", () => {
                chatSection.classList.remove("hidden")
                document.getElementById("chat-title").textContent = `Start a chart with ${currentDog.name}!`
            }, {once : true})

        }
            document.querySelector(".next-btn").addEventListener("click", ()=> {
                resetPage()
                render()
            })
        
        }, 1500)
    
}
})
/**
 * Event listener when the user presses the x button
 */
xBtn.addEventListener("click", () => {
    if(!currentDog.hasBeenLiked){
        currentDog.hasBeenLiked = false
        currentDog.hasBeenSwiped = true

        setTimeout(() => {
            userProfile.innerHTML += currentDog.dogNotLiked()
            setTimeout(() =>{
                render()
            }, 1500)
            
        }, 1000)
    }
})

/**
 * Event listeners for when a user enters a comment in the chat
 */
chatForm.addEventListener('submit', (e) => {
    e.preventDefault()
    currentDog.chat.push(document.getElementById("chat-comment").value)
    chatForm.reset()
    updateCurrentDog()
})


/**
 * Event listener for when a user closes the chat modal's x button
 */
document.getElementById("close-btn").addEventListener("click", () => {
    chatSection.classList.add("hidden")
})

/**
 * Resets styling of the page
 */
function resetPage () {
    
    chatSection.classList.add("hidden")
    chatLogo.style.paddingBottom = "0px"
    chatLogo.style.borderBottom = "none"
    chatLogo.style.cursor = "auto"
    document.querySelector(".btn-container").style.width = "110px"
    document.querySelector(".next-btn").classList.add("hidden-next-btn")
}

renderData()
render()



//issue when you already liked a person then u click x it doesnt work
//for next dog to press x