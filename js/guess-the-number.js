'use strict';
const GTN = document.querySelector("#guess_the_number");

const GTN_Container = GTN.querySelector(".GTN-input_container");
const GTN_Submit	= GTN.querySelector("#GTN-submit");
const GTN_Reset		= GTN.querySelector("#GTN-reset");
const GTN_Controller = GTN.querySelectorAll(".GTN-one_number");
const GTN_Mesage 	= GTN.querySelector("#GTN-result_message");

function getController(GTN_ControllerI){
	return {
		Up:  GTN_ControllerI.querySelector(".GTN-number_up"),
		Digit: GTN_ControllerI.querySelector(".GTN-number"),
		Down:  GTN_ControllerI.querySelector(".GTN-number_down")
	}
}

//var computerDigit = 5555;
var computerDigit = thinkNum();
var playerDigit;
var countOfAttempts = 0;


/***************************
Управлние кнопками увеличить
***************************/

for (let controller of GTN_Controller) {
	getController(controller).Up.onclick = () => {
		var digit = getController(controller).Digit.value;
		if(digit < 9){
			getController(controller).Digit.value++;
		} else {
			getController(controller).Digit.value = 0;
		}
	}
}

/***************************
Управлние кнопками уменьшить
***************************/

for (let controller of GTN_Controller) {
	getController(controller).Down.onclick = () => {
		var digit = getController(controller).Digit.value;
		if(digit > 0){
			getController(controller).Digit.value--;
		} else {
			getController(controller).Digit.value = 9;
		}
	}
}

/***************************
Получение числа игрока
***************************/

function sumDigits(){
	var sum = "";
	for (let controller of GTN_Controller) {
		sum += getController(controller).Digit.value;
	}
	return parseInt(sum, 10);
}

function thinkNum(){
	return Math.floor(Math.random() * Math.floor(10000));
}

function sendMessage(message){
	if(message != ""){
		GTN_Mesage.innerHTML = message;
	}
}

GTN_Reset.addEventListener('click', function(){
	computerDigit = thinkNum();
	countOfAttempts = 0;

	for (let controller of GTN_Controller) {
		getController(controller).Digit.value = 5;
	}

	sendMessage("Подберите число, которое загадал компьютер");
	GTN_Mesage.style.color='black';


});

GTN_Submit.addEventListener('click', function(){
	playerDigit = sumDigits();
	countOfAttempts++;

	if(playerDigit < computerDigit) {
		sendMessage("Ваше число меньше загаданного");
		GTN_Mesage.style.color='red';
	}
	if(playerDigit > computerDigit) {
		sendMessage("Ваше число больше загаданного");
		GTN_Mesage.style.color='blue';

	}
	if(playerDigit === computerDigit) {
		sendMessage("Поздравляю, вы угадали число!<br><br> Количество попыток: " + countOfAttempts);
		GTN_Mesage.style.color='green';
	}
});
