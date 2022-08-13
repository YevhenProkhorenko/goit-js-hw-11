import Notiflix from 'notiflix';
import axios from 'axios';
// import API from './fetchIMG';

const API_KEY = '29227612-6a3f7ca9f0166aa0e385beb2d';
const refs = {
form: document.querySelector('.search-form'),
inputImgName: document.querySelector('input'),
button: document.querySelector('button'),
galleryWrapper: document.querySelector(".gallery"),
}
refs.form.style.backgroundColor = "darkblue";
refs.form.style.display = "flex";
refs.form.style.justifyContent = "center";

refs.form.addEventListener('submit', submit);


function submit(e) {
  e.preventDefault();

  const result = refs.inputImgName.value; //Записуємо назву зображення, яке потрібно вивести на екран
  
  getImages(result);                      //відправляємо запит на сервер із потрібною назвою зображення
  
}
async function getImages(result) {
  
    try {
      const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${result}&image_type=photo&orientation=horizontal&safesearch=true`) // Отримуємо проміс з масивом об'єктів потрібних зображень
      console.log(response.data)
      insertInfo(response.data) //Рендеримо масив зображень
    }
    catch (error) {
      console.log(error)        
    }
}

const generateInfo = (array) => array?.reduce((acc, item) => acc + createContent(item.data), ""); //Перебериємо  масив об'єктів зображень і кожен об'єкт додаємо в функцію рендера зображення

const insertInfo = (array) => {                         //додаєо розмітку в HTML
    const result = generateInfo(array.data);
    refs.galleryWrapper.innerHTML = result;
}
function createContent(item) {                  //Створюємо HTML розмітку отриманих зображень
  return `<div class="photo-card">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" width="20px"/>
  <div class="info">
    <p class="info-item">
      <b>${item.likes}Likes</b>
    </p>
    <p class="info-item">
      <b>Views: </b>${item.views}
    </p>
    <p class="info-item">
      <b>Comments: </b>${item.comments}
    </p>
    <p class="info-item">
      <b>Downloads: </b>${item.downloads}
    </p>
  </div>
</div>`

  
}


//Попередні варіанти, коли релюсом відразу робилася розмітка без функції generateInfo

//   const render = data.reduce((acc, item) => {
//     return acc + `<div class="photo-card">
//   <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" width="20px"/>
//   <div class="info">
//     <p class="info-item">
//       <b>${item.likes}Likes</b>
//     </p>
//     <p class="info-item">
//       <b>Views: </b>${item.views}
//     </p>
//     <p class="info-item">
//       <b>Comments: </b>${item.comments}
//     </p>
//     <p class="info-item">
//       <b>Downloads: </b>${item.downloads}
//     </p>
//   </div>
// </div>`
        
//   }, "");

  // refs.galleryWrapper.innerHTML("beforeend", render);

//     const result = data.reduce((acc, item) => (acc += `<div class="photo-card">
//   <img src="" alt="" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>${item.likes}Likes</b>
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div>`
//     ), "");
