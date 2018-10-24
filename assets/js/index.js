
$(document).ready(function() {
	let baseURL = (window.location.href).split('#')[0];
	// fetch('landing-page.html')
	// 	.then($('#stickynav').hide())
	// 	.then($('#contactFooter').hide())
	// 	.then(response => response.text())
	// 	.then(response => $('#main').html(response))
	// 	.then(window.location.href = `${baseURL}#home`);
	fetchAndLoad('home', 'landing-page');
	
	$('body').on('click', '#index', function() {
		fetchAndLoad('home', 'landing-page');
	});

	$('body').on('click', '.navbar-brand', function() {
		let toremove = getCurrentPage(window.location.href)
		fetchAndLoad('landing-page', toremove);
	});

	$('body').on('click', '.nav-item', function() {
		let toremove = getCurrentPage(window.location.href),
		 	toload = $(this).find('a').text().toLowerCase().replace(' ','');

		fetchAndLoad(toload, toremove);
	});
	
	function getCurrentPage(url) {
		let urlArray = url.split('#');
		return urlArray[urlArray.length - 1];
	}

	function fetchAndLoad(toload, toremove) {
		console.log(`toload: ${toload}, toremove: ${toremove}`);
		if(toload != 'landing-page') {
			$('#stickynav').show();
			$('#contactFooter').show()
		} else {
			$('#stickynav').hide();
			$('#contactFooter').hide();
		}
		
		fetch(toload + '.html')			
			.then($('#' + toremove).remove())
			.then(response => response.text())
			.then(response => $('#main').html(response))
			.then(() => {
				$([document.documentElement, document.body]).animate({
			        scrollTop: $('#' + toload).offset().top
			    }, 1000);
			})
			.then(() => $('#navbar-nav li').each(function(i, v){
				$(this).removeClass('active');
			}))
			.then(() => $('#navbar-nav li').each(function(i, v){
				if($(this).find('a').text().toLowerCase().replace(' ','') == toload) {
					$(this).addClass('active');
					window.location.href = `${baseURL}#${toload}`;
				}
			}));

		
		
			

	}
	
});