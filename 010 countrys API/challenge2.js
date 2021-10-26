'use strict'

let image;

function wait(ms) {
    return new Promise(resolve => setTimeout(() => {
        console.log(`inside wait..`);
        resolve()
    }, ms * 1000))
}

function uploadImageInPage(image) {
    document.querySelector('body').innerHTML = '';
    console.log(`appending new image...`);
    document.querySelector('body').append(image);
}

function imgPromise(src) {
    if (image) image.remove();
    image = document.createElement('img');
    image.classList.remove('fadeAndRemove');
    image.classList.add('imageCh2');
    console.log(`run imgPromise...`);

    return new Promise((resolve, reject) => {
        image.src = src;
        console.log(`${image.src}`);

        image.addEventListener('load', e => resolve(image));
        image.addEventListener('error', e => reject(new Error(e.message)));
    })
}

imgPromise('img-1.jpg')
    .then((image) => {
        uploadImageInPage(image);
        console.log('first then..')
        return wait(5)

    })
    .then(() => {
        image.classList.add('fadeAndRemove');
        console.log('second then..')

        return imgPromise('img-2.jpg');
    })
    .then((image) => {
        console.log('third then..')
        uploadImageInPage(image);
        return wait(5)
    })
    .catch(e => console.log(e.message))