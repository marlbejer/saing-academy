
$(document).ready(function() {
	let baseURL = (window.location.href).split('#')[0];

	fetchAndLoad('landing-page');
	
	$('body').on('click', '#index', function() {
		fetchAndLoad('home');
	});

	$('body').on('click', '.navbar-brand', function() {
		// let toremove = getCurrentPage(window.location.href)
		fetchAndLoad($(this)[0].href.split('#')[1]);
	});

	$('body').on('click', 'a', function() {
		let location = $(this)[0].href.split('#')[1];
		if(location == null) {
			fetchAndLoad('home');
		} 
		else if (location.search('carousel') == 0) {
			//return false;
		}
		else {
			fetchAndLoad($(this)[0].href.split('#')[1]);
		}	
		
		
	});
	
	$('body').on('click', '.nav-item', function() {
		let toload = $(this).find('a').text().toLowerCase().replace(' ','');
		fetchAndLoad(toload);
		$('#navbar-nav').removeClass('show');
	});
	
	function getCurrentPage(url) {
		let urlArray = url.split('#');
		return urlArray[urlArray.length - 1];
	}

	function fetchAndLoad(toload) {
		let loadIfError = (window.location.href).split('#')[1];

		if(toload != 'landing-page') {
			$('#stickynav').show();
			$('#contactFooter').show()
		} else {
			$('#stickynav').hide();
			$('#contactFooter').hide();
		}
		
		fetch(toload + '.html')			
			.then($('#main div').remove())
			.then(response => response.text())
			.then(response => $('#main').html(response))
			// .then(() => {
				// $([document.documentElement, document.body]).animate({
			 //        scrollTop: $('#' + toload).offset().top - 80
			 //    }, 100);
			// })
			.then(() => $('#navbar-nav li').each(function(i, v){
				$(this).removeClass('active');
			}))
			.then(() => $('#navbar-nav li').each(function(i, v){
				if($(this).find('a').text().toLowerCase().replace(' ','') == toload) {
					$(this).addClass('active');
					window.location.href = `${baseURL}#${toload}`;
					$("html, body").animate({ scrollTop: 0 });
				}
			}))
			.catch(function(err){
				fetchAndLoad(loadIfError);
			});

		
		
			

	}
	
});