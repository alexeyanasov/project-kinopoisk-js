const searchForm = document.querySelector('#search-form')
const movie = document.querySelector('#movies')
const urlPoster = 'https://image.tmdb.org/t/p/w500'
function apiSearch(event){
	event.preventDefault()
	const searchText = document.querySelector('#search-text').value,
	server = 'https://api.themoviedb.org/3/search/multi?api_key=982295ace49e6e01b6d97a1fb4539451&language=ru&query=' + searchText
	movie.innerHTML = `<div class="spinner"></div>`
	// Через fetch
	fetch(server)
	.then(function(value){
		if(value.status !==200){
			return Promise.reject(new Error("Ошибка"))
		}
		return value.json()
	})
	.then(function(output){
		console.log(output.results)
		let inner = ''
		output.results.forEach(function(item){
			let nameItem = item.name || item.title
			const poster = item.poster_path ? urlPoster + item.poster_path : './img/noposter.png'
			inner += 
			`<div class="col-12 col-md-6 col-xs-3 item">
				<img class="img-poster" src="${poster}" alt="${nameItem}" />
				<h5>${nameItem}</h5>
			</div>`
		})
		movie.innerHTML = inner
	})
	.catch(function(reason){
		movie.innerHTML = `<div class="col-12 col-md-6 col-xs-3">Упс, что-то пошло не так</div>`
		console.log('error: ' + reason)
	})
}
searchForm.addEventListener('submit', apiSearch)
