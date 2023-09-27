/*https://www.toptal.com/developers/keycode*/

$(document).on('keydown', function(event){
	if (event.ctrlKey && event.keyCode === 67) {
		console.log("Has pulsado ctrl+c");
		$('[data-testid="translator-target-toolbar-copy"]').click();
		$(document).focus();
	}
	
	if (event.ctrlKey && event.keyCode === 86) {
		console.log("Has pulsado ctrl+v");
		$('#translator-source-clear-button').click();
		document.execCommand("paste");
	}
	
	if (event.ctrlKey && event.keyCode === 46) {
		console.log("Has pulsado ctrl+supr");
		$('#translator-source-clear-button').click();
	}

});