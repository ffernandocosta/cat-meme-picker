# Scrimba - Lily's cat meme picker challenge

This is a project I built during module 4 of Scrimba's JavaScript course. After I was done with the original project I changed the UX design, made it responsive for all screen sizes and added the 'add to favorite' button feature using JavaScript.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Video](#video)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Select an emotion and generate a random meme from the data.js file
- Check the gifs only checkbox if the user desires to only generate gifs
- Add the generated meme to a favorite list and access this list even when the page is refreshed or they close the app
- Clear the favorite list clicking the clear favorites button

### Video

https://user-images.githubusercontent.com/70672573/226144306-4d8f3114-efb9-4f50-a309-7f8e01e38f71.mp4



### Links

- [Live version](https://cat-meme-picker.vercel.app)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS variables
- Grid
- Flexbox
- Mobile first workflow
- JavaScript


### What I learned

Learned a new way of writing for loops with the 'for of' syntax. Learned how to use import/export to import js data from another file. Learned to get a hold of html elements using 'querySelector', 'getElementByClassName' and learned how to add and remove classes of elements with the 'classList.add/remove'. Also learned how to use filter and includes method to get the correct cat object from the selected emotion.


```html
  <h1>Some HTML I am proud of</h1>
  
  <h3 class="favorite-memes">Your favorite memes</h3>
		<div class="meme-modal-favorites" id="meme-modal-favorites"></div>
		<button id="clear-all-favorites-btn" class="clear-all-favorites-btn">Clear all</button>
```
```css
  .proud-of-this-css {

  @media (max-width: 767px) {

    .header-inner {
        width: 100%;
        justify-content: center;
        flex-wrap: wrap;
    }

    .meme-modal {
        width: 300px;
        height: 350px;
    }

    .cat-img {
        width: 250px;
        height: 280px;
        border-radius: 5px;
    }

    .meme-modal-close-btn,
    .meme-modal-add-to-favorite-button {
        font-size: 12px;
        padding: 1px 4px;
    }

    .meme-modal-favorite-message {
        font-size: 12px;
        display: none;
        width: 160px;
        left: 35%;
        top: 1%;
    }
}
}
```
```js
const proudOfThisFunc = () => {
  
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
}
```


## Author

<div>
  <a href="https://www.linkedin.com/in/ffernando-costa/?locale=en_US" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="My Linkedin profile"></a>
  <a href="https://twitter.com/ffernandodev" target="_blank"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="My twitter profile"</a>
</div>
