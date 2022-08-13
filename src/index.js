import Notiflix from 'notiflix';
import axios from 'axios';
import API from './fetchIMG';

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
refs.galleryWrapper.style.display = "grid";
refs.galleryWrapper.style.gridTemplateColumns = "repeat(auto-fill, 450px)";
refs.galleryWrapper.style.padding = "25px"
refs.galleryWrapper.style.gridColumnGap = "1em";
refs.galleryWrapper.style.gridRowGap ="1em";
// refs.galleryWrapper.style.gridAutoRows = "minmax(100px, auto)"; 
//стилі по  окремій картці слід накладати  на class="info"

refs.form.addEventListener('submit', submit);


function submit(e) {
  e.preventDefault();

  const result = refs.inputImgName.value; //Записуємо назву зображення, яке потрібно вивести на екран
  
  getImages(result);                      //відправляємо запит на сервер із потрібною назвою зображення
  
}
async function getImages(result) {
  
    try {
      const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${result}&image_type=photo&orientation=horizontal&safesearch=true`) // Отримуємо проміс з масивом об'єктів потрібних зображень
      if (response === [] || refs.inputImgName.value === "") {
        Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.')
      }
      else {
        insertInfo(response.data) //Рендеримо масив зображень
      }
      refs.inputImgName.value = "";
    }
    catch (error) {      
      Notiflix.Notify.failure(error)
    }
}

const generateInfo = (array) => array?.reduce((acc, item) => acc + createContent(item), ""); //Перебериємо  масив об'єктів зображень і кожен об'єкт додаємо в функцію рендера зображення

const insertInfo = (array) => {                         //додаєо розмітку в HTML
    const result = generateInfo(array.hits);
    refs.galleryWrapper.innerHTML = result;
}
function createContent(item) {                  //Створюємо HTML розмітку отриманих зображень
  return `<div class="photo-card">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy"  width="450px"/>
    <div class="info">
     <div class="info">
      <p class="info-item">
        <b>Likes: </b>${item.likes}
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
    </div>
</div>`; 
}




/* <table>
    <thead>
    <tr>
      <th>Likes:</th>
      <th>Views:</th>
      <th>Comments:</th>
      <th>Downloads:</th>
    </tr>
  </thead>
     <tbody>
        <tr>
        <td>
        <p class="info-item">
          ${item.likes}
        </p>
        </td>
        <td>
        <p class="info-item">
      ${item.views}
        </p>
        </td>
        <td>
        <p class="info-item">
      ${item.comments}
        </p>
      </td>
        <td>
        <p class="info-item">
      ${item.downloads}
      </p>
        </td>
    </tr>        
     </tbody>         
    </table> */