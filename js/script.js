const searchForm = document.querySelector('#search-form')
const movie = document.querySelector('#movies')

function apiSearch(event){
	event.preventDefault()
	const searchText = document.querySelector('#search-text').value,
	server = 'https://api.themoviedb.org/3/search/multi?api_key=982295ace49e6e01b6d97a1fb4539451&language=ru&query=' + searchText
	movie.innerHTML = 'Загрузка'

// через Promise
requestApi(server)
.then(function(result){
	const output = JSON.parse(result)
	console.log(output)
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

// функция обращения к серверу
function requestApi(url){
	return new Promise (function (resolve, reject){
		// Объект XMLHttpRequest
		const request = new XMLHttpRequest();
		// Задаем настройки. По умолчанию асинхронно (true)
		request.open('GET', url)
		request.addEventListener('load', function(){
			if(request.status !== 200){
				reject({
					status: request.status
				})
				return
			}
			resolve(request.response)
		})

		request.addEventListener('error', function(){
			reject({
				status: request.status
			})
		})
		// Ждем ответ от сервера
		request.send()
	})
}