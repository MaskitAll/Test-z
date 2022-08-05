'use strict';
var sliderPosition = 0;

const slidesToShow = 4;
const slidesToScroll = 2;

const sliderContainer = document.querySelector(".slider_container");
const sliderLine = document.querySelector(".slider_line");

const btnSliderLeft = document.querySelector("#slider-left");
const btnSliderRight = document.querySelector("#slider-right");

const sliderItems = document.querySelectorAll(".slider-item");


const itemWidth = sliderContainer.clientWidth / slidesToShow;
const movePosition = slidesToScroll * itemWidth;
const itemCount = sliderItems.length;



sliderItems.forEach((item) => {
	item.style.minWidth = itemWidth + 'px';
	// Если убирать внешние отступы. Иначе отступы через паддинг и вкладывать туда еще item
//	console.log(window.getComputedStyle(item).marginRight);
});

const setPosition = () =>{
	sliderLine.style.transform = "translateX(" + sliderPosition + "px)";
	console.log(sliderPosition);
};

const checkBtns = () => {
	btnSliderLeft.classList.remove("btn-disabled");
	btnSliderRight.classList.remove("btn-disabled");
	if(sliderPosition === 0){ btnSliderLeft.classList.add("btn-disabled");  }
	if(sliderPosition <= -(itemCount - slidesToShow) * itemWidth){ btnSliderRight.classList.add("btn-disabled"); }
};


btnSliderRight.addEventListener('click', () => {
	const itemLeft = itemCount - (Math.abs(sliderPosition) + slidesToShow * itemWidth) / itemWidth;

	sliderPosition -= itemLeft >= slidesToScroll ? movePosition: itemLeft * itemWidth;

	setPosition();
	checkBtns();
});

btnSliderLeft.addEventListener('click', () => {
	const itemLeft = Math.abs(sliderPosition) / itemWidth;

	sliderPosition += itemLeft >= slidesToScroll ? movePosition: itemLeft * itemWidth;

	setPosition();
	checkBtns();
});




























checkBtns();
