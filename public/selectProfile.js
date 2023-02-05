const profileImg = document.querySelector('.profile-container');
const selectImg = document.querySelector('.image-container');
const profile = document.createElement('img');


document.body.onload(() =>{
    fetch('/get-profile', {
        method: 'GET',
    })
})
