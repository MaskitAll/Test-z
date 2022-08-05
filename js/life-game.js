'use strict';
var example = document.getElementById("example"),
	ctx     = example.getContext('2d');

var start = document.querySelector("#lifeStart"),
	pause = document.querySelector("#lifePause"),
	rand = document.querySelector("#lifeRand"),
	reset = document.querySelector("#lifeReset"),
	next = document.querySelector("#lifeNext"),
	speed = document.querySelector("#lifeSpeed");

var size_range = document.querySelector("#lifeSize");

var lifeTimer;
var lifeSpeed = 500;

	example.width = example.offsetWidth;
	example.height = example.offsetHeight;

	ctx.fillStyle = "#ccc";
	ctx.fillRect(0, 0, example.width, example.height);

var w = Math.floor(example.width / (size_range.value * 3));
var h = Math.floor(example.height / (size_range.value * 3));
	// console.log('w = ' + w + " h = " + h);






	

function getCheckedCheckBoxes(ch_container) {
	var checkboxes = document.querySelectorAll(ch_container);
	var checkboxesChecked = []; // можно в массиве их хранить, если нужно использовать

	for (var i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked) {
		checkboxesChecked.push(i); // положим в массив выбранный
		}
	}
	return checkboxesChecked; // для использования в нужном месте
}

function toggleCell(x, y){
	m.cellMap[x][y].toggleLife();
	m.drawMap();
}

function born_i(checkboxesChecked, conditions, i){
	if(checkboxesChecked.indexOf(i) != -1){
		if(conditions === i) {
			return true;
		}
	}
	return false;
}

function changeSpeed(){
	lifeSpeed = (20 - speed.value) * 100;
	start.click();
};

function changeSize(){
	example.width = example.offsetWidth;
	example.height = example.offsetHeight;

	w = Math.floor(example.width / (size_range.value * 5));
	h = Math.floor(example.height / (size_range.value * 5));

	var m1 = new map(w, h);
	m1.createMap();
	m1.fillMapArr(m);

	m = m1;

	m.drawMap();
	pause.click();
};

function nextDay(m1){
	m1.dayToggle();
//	m1.showMap();
	m1.drawMap();
}




/*Управление кнопками*/
window.addEventListener(`resize`, event => {
		example.width = example.offsetWidth;
		example.height = example.offsetHeight;

		ctx.fillStyle = "#ccc";
		ctx.fillRect(0, 0, example.width, example.height);

		m.drawMap();
}, false);

example.addEventListener('mousedown', function (e) {

	var loc = windowToCanvas(e.clientX, e.clientY);
	var x = loc.x;
	var y = loc.y;

	x = Math.floor(x / (example.offsetWidth / w));
	y = Math.floor(y / (example.offsetHeight / h));

	toggleCell(x, y);
});

start.addEventListener('click', function(){
	clearInterval(lifeTimer);
	lifeTimer = setInterval(nextDay, lifeSpeed, m);
});

pause.addEventListener('click', function(){
	clearInterval(lifeTimer);
});

next.addEventListener('click', function(){
	m.dayToggle();
	m.drawMap();
});

rand.addEventListener('click', function(){
	clearInterval(lifeTimer);
	m.fillMap(true);
	m.drawMap();
});

reset.addEventListener('click', function(){
	clearInterval(lifeTimer);
	m.fillMap(false);
	m.drawMap();
});



/*	Ячейка	*/

function cell(x = 0, y = 0, life = false){
	this.x = x;
	this.y = y;

	this.id = x + '' + y;
	this.life = life;
};

cell.prototype = {
	Cell: function(x = 0, y = 0, life = false){
		this.x = x;
		this.y = y;

		this.id = x + '' + y;
		this.life = life;
	},

	toggleLife: function(){
		if(this.life === true) this.life = false;
		else this.life = true;
	},

	drawCell: function(color = "#000"){
		ctx.fillStyle = color;
		ctx.fillRect(Math.floor(this.x * example.width / w),
					 Math.floor(this.y * example.height / h),
					 Math.floor(example.width / w) - 2,
					 Math.floor(example.height / h) - 2);
	}
};


/*	Карта	*/

function map(width = 10, height = 10){
	this.width = width;
	this.height = height;

	this.cellMap;
};

map.prototype = {
	createMap: function(){
		this.cellMap = createArr(this.width, this.height);

		for (var i = 0; i < this.cellMap.length; ++i){
			for (var j = 0; j < this.cellMap[i].length; ++j){
				this.cellMap[i][j] = new cell(j, i, false);
//				this.cellMap[i][j] = new cell(j, i, !!random(0, 1));
//				this.cellMap[i][j] = random(0, 1);
			}
		}
	},

	fillMap: function(rand = false){
		for (var i = 0; i < this.cellMap.length; ++i){
			for (var j = 0; j < this.cellMap[i].length; ++j){
				if(rand){
					this.cellMap[i][j].Cell(i, j, !!random(0, 1));
				}
				else {
					this.cellMap[i][j].Cell(i, j, false);
				}
			}
		}
	},

	fillMapArr: function(m1){
		for (var i = 0; i < this.cellMap.length; ++i){
			for (var j = 0; j <  this.cellMap[i].length; ++j){

				if (i < m1.cellMap.length && j < m1.cellMap[i].length){
					this.cellMap[i][j] = m1.cellMap[i][j];
				} else{
					this.cellMap[i][j].Cell(i, j, false);
				}

			}
		}
	},

	
	lifeCondition: function(i, j){
		var conditions = 0;
		if(i > 0 && j > 0 				&& this.cellMap[i - 1][j - 1].life) {++conditions;}
		if(i > 0 						&& this.cellMap[i - 1][j].life) 	{++conditions;}
		if(i > 0 && j < this.cellMap[i].length-1
										   && this.cellMap[i - 1][j + 1].life) {++conditions;}

		if(j > 0						&& this.cellMap[i][j - 1].life) 	{++conditions;}
		if(j < this.cellMap[i].length-1	&& this.cellMap[i][j + 1].life) 	{++conditions;}

		if(i < this.cellMap.length-1 && j > 0
										   && this.cellMap[i + 1][j - 1].life) {++conditions;}
		if(i < this.cellMap.length-1	&& this.cellMap[i + 1][j].life)  	{++conditions;}
		if(i < this.cellMap.length-1 && j < this.cellMap[i].length-1
										   && this.cellMap[i + 1][j + 1].life)	{++conditions;}
		return conditions;
	},


	bn_sn: function(secCellMap, conditions, i, j){
//		var d = "";
		var b = false;
		if(this.cellMap[i][j].life == true){
			for(var k = 0; k <= 8; ++k){
				b = (b || born_i(getCheckedCheckBoxes(".check-born .checkbox"), conditions, k));
			}
			if(b) {secCellMap[i][j].life = true;}
			else {secCellMap[i][j].life = false;}

		} else {
			for(var k = 0; k <= 8; ++k){
				b = (b || born_i(getCheckedCheckBoxes(".check-survive .checkbox"), conditions, k));
			}
			if(b) {secCellMap[i][j].life = true;}
			else {secCellMap[i][j].life = false;}
		}
		return secCellMap;
	},

	dayToggle: function(){
		var secCellMap = createArr(this.width, this.height);
		for (var i = 0; i < this.cellMap.length; ++i){
			for (var j = 0; j < this.cellMap[i].length; ++j){
				secCellMap[i][j] = new cell(i, j, false);
			}
		}

		var conditions = 0;

		for (var i = 0; i < this.cellMap.length; ++i){
			for (var j = 0; j < this.cellMap[i].length; ++j){
				conditions = this.lifeCondition(i, j);

				secCellMap = this.bn_sn(secCellMap, conditions, i, j);
				conditions = 0;
			}
		}
		this.cellMap = secCellMap;
	},

	showMap: function(){
		var show = createArr(this.width, this.height);

		for (var i = 0; i < show.length; ++i){
			for (var j = 0; j < show[i].length; ++j){
				show[i][j] = +this.cellMap[i][j].life;
			}
		}
		console.log(show);
	},

	drawMap: function(){
		for (var i = 0; i < this.cellMap.length; ++i){
			for (var j = 0; j < this.cellMap[i].length; ++j){
				if(this.cellMap[i][j].life == true){
					this.cellMap[i][j].drawCell();
				} else if(this.cellMap[i][j].life == false) {
					this.cellMap[i][j].drawCell("#ccc");
				}
			}
		}
	},
	
}

var m = new map(w, h);
m.createMap();
m.fillMap(true);
m.drawMap();