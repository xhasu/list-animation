(function(){
	
	var list = document.querySelector('.card-list');
	var listElements = document.querySelectorAll('.card-box');

	var threshold = window.innerWidth * .4;

	listElements.forEach(el => {

		var currentElement = el;
		var parentElement = el.parentElement;

		var hammerManager = new Hammer.Manager(currentElement, {});

		hammerManager.add( new Hammer.Pan({'direction': Hammer.DIRECTION_HORIZONTAL, threshold: 0}) );

		hammerManager.on('pan', onHandlePan);
		hammerManager.on('panend', onHandlePanEnd);

		function onHandlePan(event){
			
			// event.preventDefault();

			var deltaX = event.deltaX;

			if( deltaX >= 0 ){
				currentElement.style.transition = "none";
				currentElement.style.transform = "translateX(" + deltaX + "px)";
			}
			if( deltaX >= threshold ){
				hammerManager.stop();
				removeElement();
			}
		};

		function onHandlePanEnd(event) {
			if( event.deltaX >= threshold ){
				removeElement();
			}else{
				currentElement.style.transform = "";
				currentElement.removeAttribute('style');
			}
		};

		function removeElement(){
			parentElement.classList.add('remove');
		};

	});

})();