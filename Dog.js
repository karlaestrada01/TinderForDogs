/**
 * Dog class
 */
class Dog {
    constructor(data) {
        Object.assign(this, data)
    }
    getDogHtml() {
        const {name, avatar, age, bio, chat} = this

        return `
        <img class="profile-img" src="${avatar}">
        <div class="user-info">
            <h2>
                ${name}, ${age}
            </h2>
            <p>${bio}</p>
        </div>

        `
    }
    dogLiked(){
        return `
            <img src="images/badge-like.png" class="like-badge">
        `
    }
    dogNotLiked(){
        return `
        <img src="images/badge-nope.png" class="not-liked-badge">`
    }
    getCommentsHtml() {
        if(this.chat.length > 0){
            let str = ``
            for(let comment of this.chat) {
               str += `
                <p class="comment-entered">${comment}</p>`
            }
            return str
        }
        else {
            return ``
        }
    }

}

export default Dog