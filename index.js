    const API_KEY = 'c097ca9e'
    
    async function fetchData(title) {
    const spiner = document.querySelector("#spiner")
    spiner.style.display = 'block'
    const response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&t="${title}"`)
    const data = await response.json()
    spiner.style.display = 'none'
    return data
  }
  
  const searchInputElement = document.querySelector('#movie-search-input')
  const searchButtonElement = document.querySelector("#movie-search-button")
  
  
  let movieTitleValue = ''
  let movie = null
  
  searchButtonElement.addEventListener('click', async () => {
    const searchResultsContainer = document.querySelector('.search-results')
  
    movieTitleValue = searchInputElement.value
  
    if (movie && movie.Title.toLowerCase().includes(movieTitleValue.toLocaleLowerCase())) return
    searchResultsContainer.innerHTML = ""
  
    movie = await fetchData(movieTitleValue)
  
    if (movie.Response === "False") {
      alertMessage('Нету никакого фильма, иди спать!', 'error')
      return
    }
  
    const cardElementTemplate = `
    <div class="card" style="width: 18rem">
        <img
        src="${movie.Poster}"
        class="card-img-top"
        alt="${movie.Title} movie poster"
        />
        <div class="card-body">
            <h5 class="card-title">${movie.Title}</h5>
            <p class="card-text">${movie.Plot}</p>
            <a
                href="#"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                >
                Подробнее
            </a>
  
              <a
                href="#"
                class="btn btn-primary add-fav-btn" ;"
                >
              В Избранное
            </a>
        </div>
    </div>`
  
  
  
    searchResultsContainer.insertAdjacentHTML('beforeend', cardElementTemplate)
    alertMessage("Наслаждайтесь просмотром", 'Наслаждайтесь просмотром')
  
    searchResultsContainer.innerHTML = ''
    searchResultsContainer.insertAdjacentHTML('beforeend', cardElementTemplate)
    let addedMovie = movie
  
    const addFavButton = document.querySelector('.add-fav-btn')
    addFavButton.addEventListener('click', () => {
  
      if (localStorage.getItem('favMovies') === null) {
        const favMoviesList = []
        favMoviesList.push(movie)
        localStorage.setItem('favMovies', JSON.stringify(favMoviesList))
        return
      }
      const favMoviesList = JSON.parse(localStorage.getItem('favMovies'))
      favMoviesList.push(movie)
      localStorage.setItem('favMovies', JSON.stringify(favMoviesList))
    })
  })
  const window = document.getElementById('exampleModal')
    window.addEventListener('show.bs.modal', event => {
    document.getElementById('exampleModalLabel').textContent = movie.Title
    document.querySelector("#Title").textContent = movie.Title
    document.getElementById('modal-body-image').src = movie.Poster
    document.getElementById('Actors').textContent = movie.Actors
    document.getElementById('Plot').textContent = movie.Plot
    document.getElementById('Year').textContent = movie.Year
    document.getElementById('Rating').textContent = movie.Rating
    document.getElementById('Released').textContent = movie.Released
    document.getElementById('Type').textContent = movie.Type
  })
  const modalBoxesElement = document.querySelector("#modal-boxes")
  
  function alertMessage(message, type) {
    const toastBody = document.querySelector("#toast-body")
    let toast = document.getElementById('toast')
  
    toastBody.textContent = message
  
    if (type === "Наслаждайтесь просмотром") {
      toast.style.border = '1px solid green'
      toastBody.style.color = 'green'
    } else if (type === "error") {
      toast.style.border = '1px solid red'
      toastBody.style.color = 'red'
    }
  
    $('.toast').toast('show')
  }