var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';

var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';

var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

function setDetails(imageURL, titleText) {
    'use strict';

    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageURL);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail){
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail){
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail){
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumbnail) {
    'use strict';
    thumbnail.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumbnail);
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);    
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
      frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
  }

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function getImagesArray(){
    'use strict';
    var imageArray = getThumbnailsArray();
    //get only the href and assign it to imageArray so image array 
    for(var i = 0; i < imageArray.length; i++){
        imageArray[i] = imageArray[i].href;
    }
    return imageArray;
}

function previous(){
    var imageArray = getImagesArray();
    var thumbnailArray = getThumbnailsArray();
    var current = imageArray.indexOf(document.getElementById("detail-image").src);
    if(current == 0){
        current = imageArray.length - 1;
    }
    else{
        current -= 1;
    }
    thumbnailArray[current].click();
}

function next(){
    var imageArray = getImagesArray();
    var thumbnailArray = getThumbnailsArray();
    var current = imageArray.indexOf(document.getElementById("detail-image").src);
    if(current == imageArray.length - 1){
        current = 0;
    }
    else{
        current += 1;
    }
    thumbnailArray[current].click();
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();

    document.getElementById("previous").addEventListener("click", function(event) {
        event.preventDefault();
        previous();
      });
    
      document.getElementById("next").addEventListener("click", function(event) {
        event.preventDefault();
        next();
    });
}

initializeEvents();

