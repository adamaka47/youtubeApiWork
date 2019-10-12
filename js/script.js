'use strict';

document.addEventListener('DOMContentLoaded', function(event) {
	
	// эл. клава

	{

		const keyboardIcon = document.querySelector('.search-form__keyboard');

		const closeKeyboard = document.getElementById('close-keyboard');

		const input = document.querySelector('.search-form__input');

		
		const keyboard = document.querySelector('.keyboard');

		const changeLang = (btn, lang) => {

			const langRu = ['ё', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
			                'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
			                'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
			                'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.',
			                'en', ' '
			               ];
			const langEn = ['`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
			                'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
			                'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"',
			                'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
			                'ru', ' '
			               ];
			if (lang === 'en') {
				btn.forEach((item, i) => {
					item.textContent = langEn[i]
				})
			} else {
				btn.forEach((item, i) => {
					item.textContent = langRu[i]
				})
			}


		}




		let toggleKeyboard = () => keyboard.style.top = keyboard.style.top ? '' : '50%'
		function typing(event) {
			if (event.target.tagName.toLowerCase() == 'button') {
				const buttons = [...keyboard.querySelectorAll('button')].filter(item => item.style.visibility !== 'hidden')
				if (event.target.id === 'keyboard-backspace') {
					input.value = input.value.substr(0, input.value.length-2)
				} else if (event.target.id === 'space_btn') {
					input.value = input.value + ' ';
				} else if (event.target.textContent.trim() === 'en' || event.target.textContent.trim() === 'ru') {
					changeLang(buttons, event.target.textContent.trim())
				} else {
					input.value += event.target.textContent.trim()
				}
			}
		}


		keyboardIcon.addEventListener('click', toggleKeyboard)

		closeKeyboard.addEventListener('click', toggleKeyboard)

		keyboard.addEventListener('click', typing)



	}

	// меню
	{
		const burger = document.querySelector('.spinner');
		const menu = document.querySelector('.sidebarMenu');

		burger.addEventListener('click', function() {
			this.classList.toggle('active')
			menu.classList.toggle('rollUp')
		})

		menu.addEventListener('click', e => {
			let target = e.target;
			target = target.closest('a[href="#"')
			if (target) {
				menu.querySelectorAll('li').forEach((item) => {
					item.classList.remove('active')
				})
				const parentTarget = target.parentNode;
				parentTarget.classList.add('active');
			}
		})
	}


	// модальное окно

	{

	document.body.insertAdjacentHTML('beforeend', `  
		<div class="youTuberModal">
		    <div id="youtuberClose">&#215;</div>
		    <div id="youtuberContainer"></div>
		  </div>
	`)

	}

	const youtuberM = () => {

		const blockYoutube = document.querySelector('.youTuberModal')
		const blockYoutubeItems = document.querySelectorAll('[data-youtuber]')
		const youtuberContainer = document.querySelector('#youtuberContainer')

		const mediaWidth = [3840, 2560, 1920, 1280, 854, 620, 426, 256];
		const mediaHeight = [2160, 1440, 1080, 720, 480, 360, 240, 144];

		let widthDisplayVisible = document.documentElement.clientWidth;
		let heightDisplayVisible = document.documentElement.clientHeight;


		document.body.appendChild(blockYoutube);

		blockYoutubeItems.forEach(item => {
			item.addEventListener('click', () => {
				const idVideo = item.dataset.youtuber;
				blockYoutube.style.display = 'block'

				const youtubeFrame = document.createElement('iframe')
				youtubeFrame.src = `https://youtube.com/embed/${idVideo}`;
				youtuberContainer.insertAdjacentElement('beforeend', youtubeFrame)

				window.addEventListener('resize', mediaVideo)

				mediaVideo();
			})
		})

		blockYoutube.addEventListener('click', () => {
			blockYoutube.style.display = 'none'
			youtuberContainer.innerHTML = ''
			window.removeEventListener('resize', mediaVideo)

		})

		const mediaVideo = () => {
			let widthDisplayVisible = document.documentElement.clientWidth;
			let heightDisplayVisible = document.documentElement.clientHeight;

			for (let i = 0; i < mediaWidth.length; i++) {
				if (widthDisplayVisible > mediaWidth[i]) {

					youtuberContainer.querySelector('iframe').style.cssText = ` 
						width: ${mediaWidth[i]}px;
						height: ${mediaHeight[i]}px;
					`

					youtuberContainer.style.cssText = ` 
					width: ${mediaWidth[i]}px;
					height: ${mediaHeight[i]}px;
					top: ${(heightDisplayVisible - mediaHeight[i]) / 2}px;
					left: ${(widthDisplayVisible - mediaWidth[i]) / 2}px;

					`

					break;
				}
			}

		}


	}

	{

	document.body.insertAdjacentHTML('beforeend', `  
		<div class="youTuberModal">
		    <div id="youtuberClose">&#215;</div>
		    <div id="youtuberContainer"></div>
		  </div>
	`)


	youtuberM()
	}

	{

		const API = 'IzaSyC1lUW7-pLeme3ujnG5Yojc_o-L38PkS9o';
		const ID = '13668246787-rv2iog7uevsruu0jaaoudq2fqov6oiad.apps.googleusercontent.com';

		// авторизация
		{

			const btnAuth = document.querySelector('#authorize');
			const blockAuth = document.querySelector('.auth');

			gapi.load("client:auth2", function() {
			  gapi.auth2.init({client_id: ID});
			});

			function authenticate() {
			    return gapi.auth2.getAuthInstance()
			        .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
			        .then(function() { blockAuth.style.display = 'none'; },
			              function(err) { errAuth; });
			  }
			  function loadClient() {
			    gapi.client.setApiKey(API);
			    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
			        .then(function() { console.log("GAPI client loaded for API"); },
			              function(err) { errAuth; });
			  }
			  // Make sure the client is loaded and sign-in is complete before calling this method.
			  function execute() {
			    return gapi.client.youtube.channels.list({})
			        .then(function(response) {
			                // Handle the results here (response.result has the parsed body).
			                console.log("Response", response);
			              },
			              function(err) { console.error("Execute error", err); });
			  }

			  btnAuth.addEventListener('click', () => {
			  	authenticate().then(loadClient)
			  })

			  function errAuth(err) {
			  	console.error(err)
			  	blockAuth.style.display = ''
			  }
		}
		// request

		{
			// es6 xD

			const logoTube = document.querySelector('.logo-academy');

			const trendsTube = document.querySelector('#yt_trend');

			const likeTube = document.querySelector('#like');

			const subscribeTube = document.querySelector('#subscriptions');

			const searchForm = document.querySelector('.search-form');


			const request = options => gapi.client.youtube[options.func]
				.list(options)
				.then(response => response.result.items)
				.then(data => options.func === 'subscriptions' ? renderSub(data) : render(data))
				.catch(err => console.error('Ошибка запроса: ' + err)) 

			const renderSub = (data) => {
				const ytWrapper = document.querySelector('#yt-wrapper')
				ytWrapper.innerHTML = '';
				data.forEach(item => {
					try {const {snippet:{resourceId:{channelId}, description, title, thumbnails: {high:{url}}}} = item;
					ytWrapper.innerHTML+= ` 
					
					<div class="yt" data-youtuber="${channelId}">
					  <div class="yt-thumbnail" style="--aspect-ratio:16/9;">
					    <img src="${url}" alt="thumbnail" class="yt-thumbnail__img">
					  </div>
					  <div class="yt-title">${title}</div>
					  <div class="yt-channel">${description || 'Adam Dasten'}</div>
					</div>

					`;
					} catch(err) {
						alert(err);
					}
				});
				ytWrapper.querySelectorAll('.yt').forEach((item) => {
					item.addEventListener('click', () => {
						request({
							func: 'search',
							part: 'snippet',
							channelId: item.dataset.youtuber,
							order: 'date',
							maxResults: 8,
						})
					})
				})
			};

			const render = (data) => {
				const ytWrapper = document.querySelector('#yt-wrapper')
				ytWrapper.innerHTML = '';
				data.forEach(item => {
					try {const {id, id:{videoId}, snippet:{resourceId:{videoId: likeVideoId} = {}, channelTitle, title, thumbnails:{high:{url}}}} = item;
					ytWrapper.innerHTML+= ` 
					
					<div class="yt" data-youtuber="${likeVideoId || videoId || id}">
					  <div class="yt-thumbnail" style="--aspect-ratio:16/9;">
					    <img src="${url}" alt="thumbnail" class="yt-thumbnail__img">
					  </div>
					  <div class="yt-title">${title}</div>
					  <div class="yt-channel">${channelTitle || 'Adam Dasten'}</div>
					</div>

					`;
					} catch(err) {
						alert(err);
					}
				});
				youtuberM()
			};

			logoTube.addEventListener('click', () => {
				request({
					func: 'search',
					part: 'snippet',
					channelId: 'UCVswRUcKC-M35RzgPRv8qUg',
					order: 'date',
					maxResults: 8,
				})
			})

			trendsTube.addEventListener('click', () => {
				request({
					func: 'videos',
					part: 'snippet',
					maxResults: 8,
					chart: 'mostPopular',
					regionCode: 'RU'

				})
			})

			likeTube.addEventListener('click', () => {
				request({
					func: 'playlistItems',
					part: 'snippet',
					maxResults: 8,
					playlistId: 'LLbqUChwkFHhlMg5DugINHYw'

				})
			})

			subscribeTube.addEventListener('click', () => {
				request({
					func: 'subscriptions',
					part: 'snippet',
					maxResults: 8,
					mine: true

				})
			});


			searchForm.addEventListener('submit', event => {
				event.preventDefault();
				const searchInt = searchForm.elements[0].value
				if (!searchInt) {
					searchForm.style.border = '1px solid red'
					return
				}
				searchForm.style.border = ''
				request({
					func: 'search',
					part: 'snippet',
					maxResults: 8,
					order: 'relevance',
					q: searchInt,
				})



			})




		
		}

	}




})