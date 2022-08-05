window.onscroll = function() {
	var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

	'use strict';
   var scrollElem = document.getElementById("scrollToTop");
//	console.log(document.body.scrollTop);
//	console.log(document.documentElement.clientHeight);


   if (top > 0) {
	  scrollElem.style.opacity = "1";
   } else {
	   scrollElem.style.opacity = "0";
   }
}

var timeOut;

function goUp() {
	var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

   if(top > 0) {
	  window.scrollBy(0,-100);
	  timeOut = setTimeout('goUp()',20);
   } else clearTimeout(timeOut);
}
