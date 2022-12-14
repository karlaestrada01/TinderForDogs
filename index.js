/**
 * Tinder For Dogs
 * @version 1.0
 * @author Karla Estrada
 * @date 10.17.2022
 */
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
    if(index < dogsArray.length){ 
        currentDog = getNextDog()
        userProfile.innerHTML = currentDog.getDogHtml()
        commentSection.innerHTML = currentDog.getCommentsHtml()
        index++ 
    }
    else {
        userProfile.style.height = "500px";
        userProfile.innerHTML = `
        <div class="ending-text-container">
        <p id="ending-text">No more dogs in your area!</p>
        </div>`
       
    }
   
    
    
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
                chatLogo.addEventListener("click", addChatBtn)
            }
            document.querySelector(".next-btn").addEventListener("click", ()=> {
                resetPage()
                render()
            }, {once: true})
        
        }, 1000)
    
}
})

function addChatBtn() {
    chatSection.classList.remove("hidden")
    document.getElementById("chat-title").textContent = `Start a chart with ${currentDog.name}!`
}

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
            }, 1000)
            
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
    chatLogo.removeEventListener("click", addChatBtn)
    chatSection.classList.add("hidden")
    chatLogo.style.paddingBottom = "0px"
    chatLogo.style.borderBottom = "none"
    chatLogo.style.cursor = "auto"
    document.querySelector(".btn-container").style.width = "110px"
    document.querySelector(".next-btn").classList.add("hidden-next-btn")
}

renderData()
render()

