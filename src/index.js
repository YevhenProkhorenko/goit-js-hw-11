import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// import API from './fetchIMG'

// import NewApiService from './fetchIMG';
// const NewApi = await new NewApiService();


let inputName = "";
let page = 1;
let perPage = 40;
let totalPageResult = "";


const refs = {
  form: document.querySelector('.search-form'),
  inputImgName: document.querySelector('input'),
  button: document.querySelector('submit'),
  galleryWrapper: document.querySelector(".gallery"),
  loadMore: document.querySelector(".load-more"),
  link: document.querySelector('a'),
}
///Стилізація форми, кнопок та галереї 

refs.form.style.backgroundColor = "darkblue";
refs.form.style.display = "flex";
refs.form.style.justifyContent = "center";

refs.loadMore.style.display = "none";
refs.loadMore.style.backgroundColor = "darkblue";
refs.loadMore.style.color = "white";
refs.loadMore.style.borderRadius = "4px";
refs.loadMore.style.padding = "6px 22px";
refs.loadMore.style.cursor = "pointer";

refs.galleryWrapper.style.display = "grid";
refs.galleryWrapper.style.gridTemplateColumns = "repeat(auto-fill, 450px)";
refs.galleryWrapper.style.padding = "25px"
refs.galleryWrapper.style.gridColumnGap = "1em";
refs.galleryWrapper.style.gridRowGap ="1em";
refs.galleryWrapper.style.gridAutoRows = "minmax(100px, auto)";


refs.form.addEventListener('submit', submit);
refs.loadMore.addEventListener('click', loadMoreImg);



function submit(e) {
  e.preventDefault();

  inputName = refs.inputImgName.value; //Записуємо назву зображення, яке потрібно вивести на екран
  page = 1;
  getImages(inputName);                     //відправляємо запит на сервер із потрібною назвою зображення
 refs.loadMore.style.display = "block" 
}

function loadMoreImg() {  
  getImages(inputName);
}

async function getImages(inputName) {
  const API_KEY = '29227612-6a3f7ca9f0166aa0e385beb2d';
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${inputName}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`) // Отримуємо проміс з масивом об'єктів потрібних зображень
    

    totalPageResult = response.data.totalHits/perPage; //Рахуємо, яке буде загальне значення всіх виведених сторінок
    console.log(totalPageResult)   
    
    if (response === [] || refs.inputImgName.value === "") {
        Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.')
    } 
    if (page > totalPageResult) { 
    Notiflix.Notify.success("Hooray! We found totalHits images.");
    refs.loadMore.style.display = "none";
    }
    insertInfo(response.data) //Рендеримо масив зображень
    page += 1;
    console.log(page)
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
  return ` 
  <div class="photo-card">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy"  width="450px"/>
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