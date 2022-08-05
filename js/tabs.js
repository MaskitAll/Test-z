/* TABS */

let tabNames = document.querySelectorAll(".tab_item");
let tabTexts = document.querySelectorAll(".tab_text");

tabNames.forEach(function(item){
	'use strict';
	item.addEventListener("click", function(){

		if(!item.classList.contains("active")){
			let tabId = item.getAttribute("data-text");
			let tabText = document.querySelector(tabId);

			tabNames.forEach(function(item){
				item.classList.remove("active");
			});

			tabTexts.forEach(function(item){
				item.classList.remove("active");
			});

			item.classList.add("active");
			if(tabText){
				tabText.classList.add("active");
			}
		}
	});
});


document.querySelector(".tab_item:nth-child(1)").click();
