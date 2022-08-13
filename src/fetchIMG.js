const API_KEY = '29227612-6a3f7ca9f0166aa0e385beb2d';

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
export default { getImages }