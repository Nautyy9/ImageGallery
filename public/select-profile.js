const mainContainer = document.querySelector('.img_container');
const firstImgContainer = document.querySelector('.main-img-container');
const secondImgContainer = document.querySelector('.flex-5-img');
const button = document.querySelector('.btn');
const innerDiv = document.createElement('div');
innerDiv.classList.add('inside-container');


button.addEventListener("click", () =>{
    window.location.href = "/gallery.html"
})

async function makeProfile(){
const mainArr = new Array;

await fetch('get-profile', {
    method: 'GET',
})
.then(res =>
    res.json()
)
.then(data => {
    mainArr.push(...data)}
).catch((err) => {
    alert(err.message);
})
if(mainArr.length < 1)
    {  
        // console.log(mainArr.length);
        secondImgContainer.innerHTML = `<h1>The Gallery is empty right now!</h1>`
        return 
    }


const profileImage = document.createElement('img');
profileImage.classList.add('main-img');
profileImage.src= '/Profile/Screenshot 2021-04-08 170611.png'
document.cookie =  'profile=/Profile/Screenshot 2021-04-08 170611.png';
firstImgContainer.appendChild(profileImage);



    

    const retData = mainArr.map((val) => 
{
    // const profileImage = document.createElement('img');
    // const selectImage  = document.createElement('img');
    // imgContainer.appendChild(profileImage);
    var imgdiv = document.createElement("div");
    var img = document.createElement("img");
    

    imgdiv.classList.add("div-img");
    imgdiv.setAttribute("key", val._id);
    img.classList.add("profile-img");
    // console.log(val);
    img.setAttribute('key', val._id)
    img.src = `${val.fileName}`;
    img.loading = 'lazy';
    // console.log(mainArr[0].profile?.fileName);
    // image.src = `${mainArr[0].profile?.fileName}`
    imgdiv.appendChild(img);
    // arr.push(imgdiv);
    // console.log(imgdiv);
    // You could use the outerHTML property of the html element so that your array only contains string, and then sanitize these strings in the template so that the html can be displayed`
    return `${imgdiv.outerHTML}`

}).reverse().join('')

secondImgContainer.innerHTML = retData
// console.log(retData)
secondImgContainer.childNodes.forEach((val) =>{
    // console.log(val)
    val.addEventListener("click", (e) =>{
        profileImage.src = e?.target?.attributes.src.nodeValue;
        // var allCookies = document.cookie.split(';');
        //         // The "expire" attribute of every cookie is 
        //         // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
                
        //             document.cookie = allCookies[1] + "=;expires="
        //             + new Date(0).toUTCString();
        document.cookie = `profile=${e?.target?.attributes.src.nodeValue}`
    })
})
// imgContainer.appendChild(innerDiv)
// console.log( imgContainer.innerHTML);

}



makeProfile()

