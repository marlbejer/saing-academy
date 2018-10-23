$(document).ready(function(){

	$('#index').click(function(){
		fetchAndLoad('home');
	});

	function fetchAndLoad(page) {
		fetch( page + '.html')
			.then(response => response.text())
			.then(response => $('#main').html(response))
			.then(() => {
				$([document.documentElement, document.body]).animate({
			        scrollTop: $('#' + page).offset().top
			    }, 1000);
			});
	}
	
});