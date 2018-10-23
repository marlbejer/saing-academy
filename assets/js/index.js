
$(document).ready(function() {

	fetch('landing-page.html')
		.then(response => response.text())
		.then(response => $('#main').html(response));
	
	$('body').on('click', '#index', function() {
		fetchAndLoad('home', 'landing-page');
	});

	$('body').on('click', '.navbar-brand', function() {
	// $('.navbar-brand').click(function(){
		let toremove = getCurrentPage(window.location.href)
		fetchAndLoad('landing-page', toremove);
	});

	$('body').on('click', '.nav-item', function() {
		let toremove = getCurrentPage(window.location.href),
		 	toload = $(this).find('a').text().toLowerCase();

		 	console.log(toremove, toload);
		 //fetchAndLoad(toload, toremove);
	});
	
	function getCurrentPage(url) {
		let urlArray = url.split('#');
		return urlArray[urlArray.length - 1];
	}

	function fetchAndLoad(toload, toremove) {
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
				if($(this).find('a').text().toLowerCase() == toload) {
					$(this).addClass('active');
					window.location.href += toload;
				}
			}));
	}
	
});