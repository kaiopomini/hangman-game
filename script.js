const wordEl = document.getElementById('word')
const wrongLetterEl = document.getElementById('wrong-letters')
const playAgainBtn = document.getElementById('play-button')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')

const figureParts = document.querySelectorAll('.figure-part')

 
const words = ['application', 'programming', 'interface', 'wizard']


let selectWord = getRandomWord()

const correctLetters = []
const wrongLetters = []



// Getting a random word
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}

// Show hidden word

function displayWord() {
    wordEl.innerHTML=`
        ${selectWord
            .split('')
            .map( letter => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>
            `)
        .join('')}
    `
    const innerWord = wordEl.innerText.replace(/\n/g, '')
    if(innerWord === selectWord){
        finalMessage.innerText = 'Congratulations! You won!'
        popup.style.display = 'flex'
    }
}

// Update the Wrong Letters

function updateWrongLettersEl() {
    // Display wrong letters
    wrongLetterEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter =>`<span> ${letter}</span>`)}
    `
    // Display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length

        if(index < errors){
            part.style.display = 'block'
        } else {
            part.style.display = 'none'
        }
    })

    // Check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = `Unfortunately you lost. The correct word was: \n${selectWord}`
        popup.style.display = 'flex'
    }
}

// Show notification

function showNotification() {
    notification.classList.add('show')

    setTimeout(() => {
        notification.classList.remove('show')
    }, 2000)
}


// Keydown letter press

window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <= 90){ // hit letter
        const letter = e.key
        
        if(selectWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter)

                displayWord()
            } else {
                showNotification()
            }

        } else {
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter)

                updateWrongLettersEl()
            } else {
                showNotification()
            }
        }
    } 
})

// Restart game and play again

playAgainBtn.addEventListener('click', () => {
    // Empty arrays
    correctLetters.splice(0)
    wrongLetters.splice(0)

    selectWord = getRandomWord()

    displayWord()

    updateWrongLettersEl()

    popup.style.display = 'none'
})

displayWord()
