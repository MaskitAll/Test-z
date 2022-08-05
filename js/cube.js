'use strict';
( function(){
	var rotateX = 0,
		rotateY = 0,
		lineI = 2,

		invertRotateX = 0,
		invertRotateY = 0,

		translateX = 0,
		translateY = 0,
		translateZ = 0,

		perspective = 0;

	let canvas = document.querySelector(".canvas");
	let line1 = document.querySelector(".line1");

	let controlBtn = document.querySelector("#control_button");

	let canvasOx = document.querySelector("#canvasOx");
	let canvasOy = document.querySelector("#canvasOy");
	let canvasWidth = document.querySelector("#canvasWidth");
	let canvasHeight = document.querySelector("#canvasHeight");
	let canvasDepth = document.querySelector("#canvasDepth");


	controlBtn.addEventListener("click", function(event) {
  		event.preventDefault();
		lineI++;
		addCube(canvas, "line" + lineI, canvasOx.value, canvasOy.value, canvasOz.value, exeptNumber(canvasWidth.value), exeptNumber(canvasHeight.value), exeptNumber(canvasDepth.value));
		console.log("12321");
	});


	line1.style.transformOrigin = '20px 50px 20px';

	addCube(canvas, "line3", 200, 0, 0, 50, 200, 100);
	addCube(canvas, "line4", 100, 100, 0, 25, 128, 32);




	document.onkeydown = function(e){
			 if(e.keyCode === 65) translateX -= 10;
		else if(e.keyCode === 87) translateZ -= 20;
		else if(e.keyCode === 68) translateX += 10;
		else if(e.keyCode === 83) translateZ += 20;

		else if(e.keyCode === 90) invertRotateX += 4;
		else if(e.keyCode === 67) invertRotateX -= 4;
		else if(e.keyCode === 69) invertRotateY += 4;
		else if(e.keyCode === 81) invertRotateY -= 4;

		else if(e.keyCode === 32) translateY = 150;
//
//		line1.style.transform =
//			'rotateY(' + rotateY + 'deg)' +
//			'rotateX(' + rotateX + 'deg)' +
//
//			'translateX(' + translateX + 'px)' +
//			'translateY(' + translateY + 'px)' +
//			'translateZ(' + translateZ + 'px)';

		canvas.style.transform =
//			'perspective(' + perspective + 'px)' +
			'translateX(' + translateX + 'px)' 	+
//			'translateZ(' + translateZ + 'px)' 	+
			'rotateX(' + invertRotateX + 'deg)' +
			'rotateY(' + invertRotateY + 'deg)' ;
	}





	function exeptNumber(n){
		return n >= 0 ? n : -n;
	}

	function addCube(id, name = "line", Ox = 0, Oy = 0, Oz = 0, width = 0, height = 0, depth = 0){

		var newLine = id.appendChild(document.createElement("div"));
		newLine.classList.add("line");
		newLine.classList.add(name);

		newLine.style.transform = 'translate3d(' + Ox + 'px, ' + Oy + 'px, ' + Oz + 'px)';

		var newFront = newLine.appendChild(document.createElement("div"));
		newFront.classList.add("line");
		newFront.classList.add("front");

		newFront.style.width = width + 'px';
		newFront.style.height = height + 'px';
		newFront.style.transform = 'translate3d(' + 0 + 'px, ' + 0 + 'px, ' + 0 + 'px)';
		newFront.style.backgroundColor = 'rgba(100, 100, 100, .3)';
		newFront.insertAdjacentHTML("afterBegin", "front");


		var newBack = newLine.appendChild(document.createElement("div"));
		newBack.classList.add("line");
		newBack.classList.add("back");
		newBack.style.width = width + 'px';
		newBack.style.height = height + 'px';
		newBack.style.transform = 	'rotateY(' + 180 + 'deg)' +
									'translate3D(' + (-width) + 'px, ' + 0 + 'px, ' + depth + 'px)';
		newBack.style.backgroundColor = 'rgba(0, 100, 100, .3)';
		newBack.insertAdjacentHTML("afterBegin", "back");


		var newLeft = newLine.appendChild(document.createElement("div"));
		newLeft.classList.add("line");
		newLeft.classList.add("left");
		newLeft.style.width = depth + 'px';
		newLeft.style.height = height + 'px';
		newLeft.style.transform = 'rotateY(-' + 90 + 'deg)' + 'translate3d(-' + depth + 'px, ' + 0 + 'px, ' + 0 + 'px)';
		newLeft.style.backgroundColor = 'rgba(100, 0, 100, .3)';
		newLeft.insertAdjacentHTML("afterBegin", "left");


		var newRight = newLine.appendChild(document.createElement("div"));
		newRight.classList.add("line");
		newRight.classList.add("right");
		newRight.style.width = depth + 'px';
		newRight.style.height = height + 'px';
		newRight.style.transform = 'rotateY(' + 90 + 'deg)' + 'translate3d(' + 0 + 'px, ' + 0 + 'px, ' + width + 'px)';
		newRight.style.backgroundColor = 'rgba(100, 100, 0, .3)';
		newRight.insertAdjacentHTML("afterBegin", "right");


		var newTop = newLine.appendChild(document.createElement("div"));
		newTop.classList.add("line");
		newTop.classList.add("top");
		newTop.style.width = width + 'px';
		newTop.style.height = depth + 'px';
		newTop.style.transform = 'rotateX(' + 90 + 'deg)' + 'translate3d(' + 0 + 'px, ' + (-depth) + 'px, ' + 0 + 'px)';
		newTop.style.backgroundColor = 'rgba(0, 0, 100, .3)';
		newTop.insertAdjacentHTML("afterBegin", "top");


		var newBottom = newLine.appendChild(document.createElement("div"));
		newBottom.classList.add("line");
		newBottom.classList.add("bottom");
		newBottom.style.width = width + 'px';
		newBottom.style.height = depth + 'px';
		newBottom.style.transform = 'rotateX(-' + 90 + 'deg)' + 'translate3d(' + 0 + 'px, ' + 0 + 'px, ' + height + 'px)';
		newBottom.style.backgroundColor = 'rgba(100, 0, 0, .3)';
		newBottom.insertAdjacentHTML("afterBegin", "bottom");

	}

//		canvas.addEventListener('mousemove', e => {
//		line1.style.transform =
//			'rotateY(' + (e.offsetY / canvas.scrollHeight) * 360 + 'deg)' +
//			'rotateX(' + (e.offsetX / canvas.scrollWidth) * 360  + 'deg)';
//	});


})();
