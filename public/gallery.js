"use strict";

// const { json } = require("body-parser");

const file = document.querySelector('.need');
const main = document.querySelector('.main');
const inFile = document.querySelector('#for-id');
const div1 = document.querySelector('.container1');
const div2 = document.querySelector('.container2');
const div3 = document.querySelector('#container3');
const btn = document.querySelector('.btn');
const image = document.querySelector('.profile');
const headp = document.querySelector('.headerp');

// const images = [
//     "Screenshot 2022-12-11 225914.png",
//     "Screenshot 2022-11-21 015904.png",
//     "Screenshot 2022-11-27 121009.png",
//     "Screenshot 2022-11-27 123734.png",
//     "Screenshot 2022-11-27 125546.png",
//     "Screenshot 2022-11-27 130220.png",
//     "Screenshot 2022-12-11 225059.png"
// ]

//---------------------> post to profile

// const getImages = async () =>{
//     // const random_index = Math.floor(Math.random() *images.length);
//     const selectedImage = images[6];
//     console.log(`../Profile/${selectedImage}`);

//     await fetch('/profile', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
//         body: `/Profile/${selectedImage}`,
//     })
    
//     //no image will be served until we make it static from our index.js that is the folder must be publically available to all
// }
// getImages();
    
// .src = `../Profile/${selectedImage}`

const value = document.cookie.split('=')[1]
const cookieProfile = document.cookie.split('=')[2]


headp.textContent = `suii`
headp.style.visibility = 'hidden';

headp.addEventListener('hover', () =>{
    headp.style.invisibility = 'visible';
})

const formData = new FormData();

class need {
    constructor(type, error) {
        this.type = type;
        this.error = error;
    }
};

const types = ['image/png', 'image/jpeg'];

let neededType;  

inFile.onchange = async () => {
    let error = '';
    let selected = inFile.files[0];

    neededType = new need(selected, error);
    if (selected && types.includes(selected.type)) {
        formData.append('image', selected)
        // console.log(formData)
        var requestOptions = 
        {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };
        await fetch('/gallery', requestOptions)
        .then(response => response.json())
        .then(result => console.log(result) )
        .then(() => window.location.reload(true))
        .catch(error => console.log(error));
        // console.log(neededType.type);
        // console.log(neededType.error)
        // console.log(neededType.type)
    }
    else {
        neededType.type = null;
        neededType.error = "Please select a file of only '/png' or '/jpeg' format"
        // console.log(neededType.type, neededType.error)
    }
}
const all = document.cookie;
// console.log(all.split(';'))

// const arr =[];
// console.log(cookieProfile, value, 'shir')
const getDb = async () => {
    var mainArr = new Array;
    try{
    await fetch('/gallery')
    .then(res => res.json())
    .then(data => mainArr.push(...data))
    .catch(error => console.log('error', error))
    
    if(mainArr.length < 1)
    {   
        image.src = `${cookieProfile}`
        // console.log(mainArr.length);
        div2.innerHTML = `<h1>The Gallery is empty right now!</h1>`
    return 
    }
    

    const  data = mainArr.map((val) => {
        var imgdiv = document.createElement("div");
        var img = document.createElement("img");
        
        imgdiv.classList.add("divmap");
        imgdiv.setAttribute("key", val._id);
        img.classList.add("divimg");
        img.src = `/${val.file}`;
        // console.log(val.file, 'dsfhajfdlk')
        img.loading = 'lazy';
        image.loading = 'lazy'
        // console.log(mainArr[0]);
        if(mainArr[0].profile !== undefined || mainArr[0].profile !==null ){
            // console.log('shiroro' , `/${mainArr[0].profile}`);
            image.src =  `${mainArr[0].profile}`
        }
        else{
            // console.log('suiii', `/${cookieProfile}`);
            image.src = `/${cookieProfile}` 
        }
        imgdiv.appendChild(img);
        const outHtml=  `${imgdiv.outerHTML}`
        // console.log(outHtml)
        // arr.push(imgdiv);
        // console.log(imgdiv);
        // You could use the outerHTML property of the html element so that your array only contains string, and then sanitize these strings in the template so that the html can be displayed`
        return outHtml

        // return `<div class="divmap" key=${val._id}> 
        //     <img src=${'/'+val.file} class="divimg"/>
        // </div>`
    })
    const images = data.reverse().join('')
    div2.innerHTML = images;
    
    for (const node of div2.childNodes){
        const bttn = document.createElement("button")
        const spanTooltip = document.createElement("span")
        spanTooltip.innerText = "Delete Image?!"
        spanTooltip.classList.add("span_tooltip")
        bttn.classList.add("yoho_btn")
        bttn.innerText = "X"
        bttn.appendChild(spanTooltip)
        spanTooltip.style.visibility = "hidden"
        bttn.onmouseenter = (e) =>{
            spanTooltip.style.visibility = "visible"
        }
        bttn.onmouseleave = (e) =>{
            spanTooltip.style.visibility = "hidden"
        }

        bttn.onclick = async (e) =>{
            const imgName =  e.target.offsetParent.childNodes[0].currentSrc.slice(22)
            await fetch('/gallery/image', {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                redirect: "follow",
                body: imgName
            })
            .then((val) =>  val.json())
            .then((val) => {
                alert("Image delted successfully 😄")
                window.location.reload()
            })
            .catch((err) =>{
                alert(err.msg)
            })
        }
        node.appendChild(bttn)
    }

    // console.log(div2.innerHTML);
}
catch (error) {
    div2.innerHTML =
      `<h5 class="empty-list">${error}</h5>`
  }
}

getDb();

btn.style.visibility = "hidden"
div3.style.visibility = "hidden";

btn.onclick = () =>{
    // console.log('suii');
    btn.style.visibility = "hidden"
    div3.style.visibility = "hidden"
}
const img = document.createElement("img")

div2.addEventListener('click', (val) =>{
    
    let need = val.srcElement.getAttribute('src')
    // console.log(div3, need);
    
    if(need){
        img.src = need
        img.classList.add('div3img')
        div3.append(img)
        div1.onclick = () =>{
            div3.style.visibility = "hidden"
            btn.style.visibility = "hidden"

        } 
        btn.style.visibility = "visible"
        div3.style.visibility = 'visible'

    }
    else {
        btn.style.visibility = "hidden"
        div3.style.visibility = 'hidden'
    } 
})
div2.childNodes.forEach(val => {console.log(val)})