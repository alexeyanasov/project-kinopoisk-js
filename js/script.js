const searchForm = document.querySelector('#search-form')
const movie = document.querySelector('#movies')

function apiSearch(event){
	event.preventDefault()
	const searchText = document.querySelector('#search-text').value,
	server = 'https://api.themoviedb.org/3/search/multi?api_key=982295ace49e6e01b6d97a1fb4539451&language=ru&query=' + searchText
	movie.innerHTML = 'Загрузка'
	// Через fetch
	fetch(server)
	.then(function(value){
		return value.json()
	})
	.then(function(output){
		let inner = ''
		output.results.forEach(function(item){
			let nameItem = item.name || item.title
			inner += `<div class="col-12 col-md-4 col-xs-3">${nameItem}</div>`
		})
		movie.innerHTML = inner
	})
	.catch(function(reason){
		movie.innerHTML = 'Упс, что-то пошло не так'
		console.log('error: ' + reason.status)
	})
}
searchForm.addEventListener('submit', apiSearch)
