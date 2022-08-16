export default class NewApiService{
  constructor() {
    this.searchQuery = '';
    this.page = 1;
}
  
  async fetchImages() {
 const API_KEY = '29227612-6a3f7ca9f0166aa0e385beb2d';
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${inputName}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`) // Отримуємо проміс з масивом об'єктів потрібних зображень
    this.incrementPage();
    return response;
  }
  
    catch (error) {      
      Notiflix.Notify.failure(error)
    }
  }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}





// async function getImages(result) {
//   const API_KEY = '29227612-6a3f7ca9f0166aa0e385beb2d';
//     try {
//       const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${this.inputName}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`) // Отримуємо проміс з масивом об'єктів потрібних зображень
//       if (response === [] || refs.inputImgName.value === "") {
//         Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.')
//       }
//       else {
//         insertInfo(response.data) //Рендеримо масив зображень
//       }
//       refs.inputImgName.value = "";
//     }
//     catch (error) {      
//       Notiflix.Notify.failure(error)
//     }
// }

// export default { getImages }