// As a user, I should see the timer increment every second once the page has loaded.
document.addEventListener("DOMContentLoaded", () => {
    
    let cntr = document.getElementById('counter')
    
    //Declare the setInterval using a variable so it can be cleared later
    let timer = setInterval(runCounts, 1000)
    
    //The function that will run at the interval
    function runCounts () {
            cntr.innerText ++
        }

    // As a user, I can manually increment and decrement the counter using the plus and minus buttons.
    //increment counter
    const plus = document.getElementById('plus')
    plus.addEventListener('click', (e) => cntr.innerText ++)
    //decrement counter
    const minus = document.getElementById('minus')
    minus.addEventListener('click', (e) => cntr.innerText --)
    
// As a user, I can 'like' an individual number of the counter. I should see the count of the number of 'likes' associated with that number displayed.
    const heart = document.getElementById('heart')
    heart.addEventListener('click', 
    addLikes)
    
    //Create an array that holds the values of the counter when the like button is clicked
    let likesIdArr = []

    function addLikes () {
        const likesList = document.querySelector('.likes')
        //create a new array that holds the instances of the like button at that counter number
        let cntLikesArr = likesIdArr.filter(element => element === cntr.innerText)
        //create a variable that holds the length of that array
          //I had to add 1 to that number, and I don't know why
        let likesCount = cntLikesArr.length + 1
        //if that number has been liked before:
        if(document.getElementById(`${cntr.innerText}`)) {
            //add the number to the array holding all instances of liked numbers
            likesIdArr.push(cntr.innerText)
            //set the text of that list item to update the count of that number being liked
            document.getElementById(`${cntr.innerText}`).innerText = `${cntr.innerText} has been liked ${likesCount} times.`
        }else{
            const li = document.createElement('li')
            li.id = `${cntr.innerText}` 
            likesList.appendChild(li)
            document.getElementById(`${cntr.innerText}`).innerText = `${cntr.innerText} has been liked 1 time.`
            likesIdArr.push(cntr.innerText)
        }
        console.log(likesIdArr)
        console.log(likesCount)
    }
// As a user, I can pause the counter, which should:

const pause = document.querySelector('#pause')
function handlePauseButton () {
    if(pause.innerText === 'pause') {
        // pause the counter
        clearInterval(timer)
        // switch the label on the button from "pause" to "resume"
        pause.innerText = 'resume'
        pause.id = 'resume'
        // disable all buttons except the pause button
        heart.disabled = true
        plus.disabled = true
        minus.disabled = true
    }else if (pause.innerText === 'resume') {
        // switch the label on the button from "resume" to "pause"
        pause.innerText = 'pause'
        pause.id = 'pause'
        // As a user, I should be able to click the "resume" button to restart the counter and re-enable the buttons.
        heart.disabled = false
        plus.disabled = false
        minus.disabled = false
        timer = setInterval(runCounts, 1000)
        console.log(`count: ${cntr.innerText}`, `timer log: `, timer)
    }
}
pause.addEventListener('click', handlePauseButton)

// As a user, I can leave comments on my gameplay, such as: "Wow, what a fun game this is.
const commentsDestination = document.querySelector('#list')
const commentInput = document.querySelector('#comment-input')
const commentSubmitButton = document.querySelector('#submit')

function handleSubmitComment(event) {
event.preventDefault()
let liIdCntr = 1
//find out if the ul has already been created
if(commentsDestination.childElementCount === 0) {
    //if the ul hasn't been created then create a ul element with a unique id and append it to the section where the comments will be posted
    const ul = document.createElement('ul')
    ul.id = 'comments-ul'
    commentsDestination.appendChild(ul)
    //create a variable storing the location of the list to make adding list items easy
    const commentsUl = document.querySelector('#comments-ul')
    //create a list item element with a unique id (so it could be deleted later if you wanted to add that functionality)
    const li = document.createElement('li')
    li.id = `${liIdCntr}`
    //set the text of that list item to be the text written in the comment box
    li.innerText = commentInput.value
    //append the list item to the comments list
    commentsUl.appendChild(li)
    //reset the leave a comment textbox to an empty string
    commentInput.value = ''
    //add one to the list ID counter to prevent duplicate IDs
    liIdCntr++
}else{
    const commentsUl = document.querySelector('#comments-ul')
    //create a list item element with a unique id (so it could be deleted later if you wanted to add that functionality)
    const li = document.createElement('li')
    li.id = `${liIdCntr}`
    //set the text of that list item to be the text written in the comment box
    li.innerText = commentInput.value
    //append the list item to the comments list
    commentsUl.appendChild(li)
    //reset the leave a comment textbox to an empty string
    commentInput.value = ''
    //add one to the list ID counter to prevent duplicate IDs
    liIdCntr++
    }
}
commentSubmitButton.addEventListener('click', handleSubmitComment)

})