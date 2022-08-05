'use strict';
document.addEventListener('DOMContentLoaded', function(){

	let pages = document.querySelectorAll(".brif-page");
	let i = 0;

	let form = document.querySelector("#brif_form");
	let brif_start_btn = document.querySelector("#brif_btn");

	let exit = document.querySelector(".brif .exit");
	let arrow_left = document.querySelector(".brif .arrow-left");
	let arrow_right = document.querySelector(".brif .arrow-right");

	let progress = document.querySelector(".brif .progress");
	let exp = document.querySelector(".brif .exp");



	brif_start_btn.addEventListener("click", function(){
		toggle_active(form);
		toggle_active(pages[0]);
	});

//	document.onkeydown = function(e){
//			 if(e.keyCode === 27) exit.click();
//	}
//


	exit.addEventListener("click", function(){
		if(form.classList.contains("active")){
			toggle_active(form);
			document.querySelector(".brif .reset").click();

			pages.forEach(function(item){
				if(item.classList.contains("active")){ toggle_active(item); }
			});

			i = 0;
			progress_bar();
		}
	});

	arrow_left.addEventListener("click", function(){
		if(i > 0){
			toggle_active(pages[i]);
			toggle_active(pages[i-1]);
			if(pages[i-1].querySelector(".options_textarea")){
			pages[i-1].querySelector(".options_textarea").focus();}
			i--;
			progress_bar();
		}
	});

	arrow_right.addEventListener("click", function(){
		if(i === pages.length - 1 && test(pages[i])){
//			formSend();
//			toggle_active(form);
			document.querySelector("#brif-page__endless").classList.add("active");
			//exit.click();
		}

		if(i < pages.length - 1 && test(pages[i])){
			toggle_active(pages[i]);
			toggle_active(pages[i+1]);
			if(pages[i+1].querySelector(".options_textarea")){
			pages[i+1].querySelector(".options_textarea").focus();}
			i++;
			progress_bar();
		}
	});

	function toggle_active(a){
		a.classList.toggle("active");
		a.classList.toggle("inactive");
	};


	function progress_bar(s){
		exp.style.width = (i + 1) / pages.length * 100 + "%";
	}



	function test(a){
		let Error = 0;
		let errorText = "";

		let formOption = a.querySelector(".form-options");
		let formOptions = a.querySelectorAll(".form-options");

		let checkbox = a.querySelector(".options_item");


//		проверка чекбоксов
		if(checkbox){
			let error = 0;

			if (checkedTest(a)){ error++; }
			if(error != 0) Error++;
		}

//		проверка текстовых полей
		else {
			formOptions.forEach(function(f) {
				errorText = "";
				let error = 0;
				let textarea = f.querySelector(".options_textarea");

//				if(emptyTest(textarea)) {
//					error++;
//				}

				if(f.classList.contains(".mail") && !emptyTest(textarea)){
					if(emailTest(textarea)) {
						error++;
						errorText = "Please, enter the e-mail.";
					}
				}
				if(f.classList.contains(".tel") && !emptyTest(textarea)){
					if(telTest(textarea)) {
						error++;
						errorText = "Please, enter the phone number.";
					}
				}
				if(f.classList.contains(".link") && !emptyTest(textarea)){
					if(linkTest(textarea)) {
						error++;
						errorText = "Please, enter the link.";
					}
				}
				if(f.classList.contains(".num") && !emptyTest(textarea)){
					if(numTest(textarea)) {
						error++;
						errorText = "Please, enter the nums.";
					}
				}

				if(error != 0){
					textarea.classList.add("error");
					textarea.value = "";
					textarea.placeholder = errorText;
					Error++;
				} else {
					if( textarea.classList.contains("error")){  textarea.classList.remove("error");}

					textarea.placeholder = "";
				}
			}); /*конец проверки текстовых полей*/

		}
		return Error === 0 ? 1 : 0;
	}


//	mail
	function emailTest(mail){
		return !/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i.test(mail.value);
	}

//	ссылка
	function linkTest(link){
		return !/(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i.test(link.value);
	}

//	телефон
	function telTest(tel){
		return !/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{5,12}$/.test(tel.value);
	}

//	пустое поле
	function emptyTest(text){
		return text.value === '';
	}

//	не выбран чекбокс
	function checkedTest(options){
		return !options.querySelectorAll(":checked").length != 0;
	}

//	число страниц
	function numTest(num){
		return !/^[0-9_-]{1,5}$/.test(num.value);
	}

});
