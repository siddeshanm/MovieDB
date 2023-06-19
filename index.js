const API_KEY = 'api_key=b4d517c656676e2667d6d9a3f9fb97ef'
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY
const search_url = BASE_URL + '/search/movie?' + API_KEY
const image_url = 'https://image.tmdb.org/t/p/w500'


const main = document.querySelector('#main')
const form = document.querySelector('#form')
const search = document.querySelector('#search')




const getMovieInfo = async function (url) {
   try{
   const response = await axios.get(url);
   showResults(response.data.results)
   }catch(error){
      console.log('404')
      console.log(error)
   }
}

function getColor(rating) {
   if (rating < 5) {
       return 'red'
   } else if (rating < 7) {
       return 'orange'
   } else {
       return 'green'
   }
}

getMovieInfo(API_URL);

const showResults = function (results) {
   main.innerHTML = ''


   for(let result of results){
      const { title, poster_path, vote_average, overview } = result
      const movieEl = document.createElement('div')
      movieEl.classList.add('movie')
      movieEl.innerHTML = `
      <img src="${image_url+poster_path}" alt="${title}">
      <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getColor(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
          <h3>overview</h3>${overview}</div>`

      main.appendChild(movieEl)
   }
}

form.addEventListener('submit', (e) => {
   e.preventDefault()
   const searchTerm = search.value
   console.log(searchTerm)
   if (searchTerm) {
       getMovieInfo(search_url + '&query=' + searchTerm)
   } else {
       getMovieInfo(API_URL)
   }
})