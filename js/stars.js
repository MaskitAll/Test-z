//function setRate (event, el) {
	'use strict';

const maxRate = 10;
const minRate = 1;

var currentRate = 6.5;
var el = document.querySelector("#star2");
var stars = document.querySelector(".stars");
var stProgress = document.querySelector(".progress");


 function move(e, obj){
	var progress = e.pageX - stars.getBoundingClientRect().left;
	var rating = progress * 5 / stars.clientWidth;
//	stProgress.width = progress + 'px';

	stProgress.style.width = progress + 'px';

	 console.log(progress);
	 console.log(stProgress.style.width);


 }

	/* Изменение статуса звезд*/
	stars.addEventListener(`click`, e => {
//		console.log("progress");

		el.classList.toggle("fixed");
		move(e, el);

	});

	/* Изменение рейтинга*/
	stars.addEventListener('mousemove', e => {
//		console.log("progresss");

		if(el.classList.contains("fixed")){
			move(e, el);

		}
	});

console.log();

//}

