const searchForm = document.querySelector('#search-form')
const movie = document.querySelector('#movies')

function apiSearch(event){
	event.preventDefault()
	const searchText = document.querySelector('#search-text').value,
	server = 'https://api.themoviedb.org/3/search/multi?api_key=982295ace49e6e01b6d97a1fb4539451&language=ru&query=' + searchText
	requestApi('GET', server)
}
searchForm.addEventListener('submit', apiSearch)

// функция обращения к серверу
function requestApi(method, url){
	// Объект XMLHttpRequest
	const request = new XMLHttpRequest();
	// По умолчанию асинхронно (true)
	request.open('GET', url)
	// Ждем ответ от сервера
	request.send()

	request.addEventListener('readystatechange', () => {
		if(request.readyState !== 4) return
			
		if(request.status !== 200){
			console.log('error: ' + request.status)
			return
		}
		const output = JSON.parse(request.responseText)

		let inner = ''

		output.results.forEach(function(item){
			let nameItem = item.name || item.title
			// console.log(nameItem)
			inner += `<div class="col-12">${nameItem}</div>`
		})
		movie.innerHTML = inner
		console.log(output)
	})
}
