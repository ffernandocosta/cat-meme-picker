import { catsData } from '/data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')
const memeModalAddToFavoriteBtn = document.getElementById('meme-modal-add-to-favorite-button')
const memeModalFavorites = document.getElementById('meme-modal-favorites')
const memeModalClearFavoritesBtn = document.getElementById('clear-all-favorites-btn')

let currentCatObject = null;
let favoriteCatsArray = JSON.parse(localStorage.getItem("favoriteCats")) || []

emotionRadios.addEventListener('change', highlightCheckedOption)

memeModalCloseBtn.addEventListener('click', closeModal)

memeModalAddToFavoriteBtn.addEventListener('click', addToFavorites)

memeModalClearFavoritesBtn.addEventListener('click', clearFavoriteList)

getImageBtn.addEventListener('click', renderCat)

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(){
    memeModal.style.display = 'none'
    memeModalAddToFavoriteBtn.nextElementSibling.style.display = 'none'
}

function addToFavorites(){
    if (currentCatObject && !favoriteCatsArray.includes(currentCatObject)) {
        favoriteCatsArray.push(currentCatObject)
        localStorage.setItem("favoriteCats", JSON.stringify(favoriteCatsArray))
        
        // creates an image tag for the current cat meme
        const image = document.createElement('img')
        image.src = `./images/${currentCatObject.image}`
        image.alt = currentCatObject.alt
        image.classList.add('cat-img')

        // adds the image tag to the memeModalFavorites div
        memeModalFavorites.appendChild(image)
        
    } else {
        memeModalAddToFavoriteBtn.nextElementSibling.style.display = 'flex'
    }
}

function renderFavoriteList() {
        // renders saved favorite memes
        memeModalFavorites.innerHTML = ""
        for (let catObject of favoriteCatsArray) {
            const image = document.createElement('img')
            image.src = `./images/${catObject.image}`
            image.alt = catObject.alt
            image.classList.add('cat-img')
            memeModalFavorites.appendChild(image)
        }
}

function clearFavoriteList() {
    
    // removes 'favoriteCats' key from localStorage
    localStorage.removeItem("favoriteCats");
    
    // clears the favoriteCatsArray
    favoriteCatsArray = [];
    
    // clears the current cat memes being rendered in the memeModalFavorites div
    memeModalFavorites.innerHTML = "";
}


function renderCat(){
    currentCatObject = getSingleCatObject()
    memeModalInner.innerHTML =  `
        <img 
        class="cat-img" 
        src="./images/${currentCatObject.image}"
        alt="${currentCatObject.alt}"
        >
        `
    memeModal.style.display = 'flex'
}


function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    
    if(catsArray.length === 1){
        return catsArray[0]
    }
    else{
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}

function getMatchingCatsArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter(function(cat){
            
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingCatsArray 
    }  
}

function getEmotionsArray(cats){
    const emotionsArray = []    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats){
        
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)
renderFavoriteList()
