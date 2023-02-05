"use strict";

const loader = document.querySelector('.loader');
const btn = document.querySelector('.btn');
const email = document.querySelector('#email');
const form = document.querySelector('#setUser');

const mailrex = /[a-zA-Z0-9]*\@[a-zA-Z0-9]*\.[a-zA-Z0-9]*/g
// const card = document.querySelector('.card');

// btn.style.padding = '10px';
// btn.style.borderRadius = '5px';

const suii = form.elements['email']
// console.log(suii);
addEventListener('load', () =>{
    setTimeout(() => {
        loader.classList.add('hide');
        btn.classList.remove('hide');
        email.classList.remove('hide');
        // card.classList.remove('hide');

    }, 1000)
    })
let x;
let checkMail;
email.addEventListener('change', (e)=> {
    x = e.target.value;
    console.log(x, 'adsk');
    checkMail = mailrex.test(x)
})


    form.onsubmit= async (event) =>{

        event.preventDefault();
        
        document.cookie = `mail=${suii.value}`;

        // await fetch('/', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        //     body: suii.value,
        // })
        // .then( (res) =>{
        //     console.log(res);
        // })
        // .catch( (err) =>{
        //     console.log(err);
        // })

        var userExists = new Array ;
        var userDoesNotExist = '' ;
        await fetch('/gallery')
        .then(res => res.json())
        .then(data => userExists.push(...data))
        .catch(error =>   { 
            userDoesNotExist = error.message
        })
        console.log(userDoesNotExist , userExists);
        
        if(userDoesNotExist || userExists.length === 0){
            setTimeout(() => {
                console.log(userDoesNotExist, userExists);
                window.location.replace('select-profile.html')
            }, 2000)
        }
        if(userExists.length > 0){
            setTimeout(() => {
                console.log(userDoesNotExist, userExists);
                window.location.replace('gallery.html')
            }, 2000)
        }
        console.log(suii.value);
       

    }

    // else{
    //     btn.setAttribute('disabled', 'disabled');
    //     btn.style.pointerEvents = 'none';
    //     // const para = form.createElement("p");

    //     // para.innerHtml = 'Please fill in the mail field'
    // }
    
    // else{
    //     const para = document.createElement("P");
    //     para.innerText = 'Mail must contain @ and . and must be of 6 characters long';
    //     para.style.backgroundColor = 'white';
    //     para.style.color = '#FCBA7F'
    //     form.appendChild(para);

    //     // form.textContent = 'please fill in the mail field'
    // }