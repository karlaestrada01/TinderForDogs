import {dogs} from "./data.js"
import Dog from "./Dog.js"

let index=0
const userProfile = document.querySelector(".user-profile")
const xBtn = document.getElementById("x-btn")
const heartBtn = document.getElementById("heart-btn")
const chatBtn = document.getElementById("chat-btn")
const chatForm  = document.getElementById("chat-form")
const commentSection = document.querySelector(".comment-section")
const dogsArray = []
let currentDog
let arrayLength = dogs.length

function renderData() {
    for(let dog of dogs){
        dogsArray.push(new Dog(dog))
    }
    
}
function render() {
   
    currentDog = getNextDog()
    userProfile.innerHTML = currentDog.getDogHtml()
    commentSection.innerHTML = currentDog.getCommentsHtml()
    index++;

}
function updateCurrentDog() {
    commentSection.innerHTML = currentDog.getCommentsHtml()

}
function getNextDog() {
    

    if(index < arrayLength){
        
        return dogsArray[index]
    }
    else {
        index = 0
    }
}
heartBtn.addEventListener("click", () => {
    currentDog.hasBeenLiked = true
    currentDog.hasBeenLiked = true
    setTimeout(() => {
        userProfile.innerHTML += currentDog.dogLiked()
        setTimeout(() =>{
            render()
        }, 2000)
    }, 1500)
    
    
})
xBtn.addEventListener("click", () => {
    currentDog.hasBeenLiked = false
    currentDog.hasBeenLiked = true
    setTimeout(() => {
        userProfile.innerHTML += currentDog.dogNotLiked()
        setTimeout(() =>{
            render()
        }, 2000)
        
    }, 1500)
   
    
})

chatForm.addEventListener('submit', (e) => {
    console.log("in here")
    e.preventDefault()
    currentDog.chat.push(document.getElementById("chat-comment").value)
    console.log(currentDog.chat)
    chatForm.reset()
    updateCurrentDog()
})
console.log(dogs)
renderData()
render()