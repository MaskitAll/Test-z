'use strict';
var seaBattleCanvas = document.getElementById("sea-battle-canvas"),
	sb_ctx     = seaBattleCanvas.getContext('2d');
//var seaBattleEnemyCanvas = document.getElementById("sea-battle-enemy-canvas"),
//	sb_ctx_e     = seaBattleEnemyCanvas.getContext('2d');
//var seaBattleShipCanvas = document.getElementById("sea-battle-ship-canvas"),
//	sb_ctx_s     = seaBattleShipCanvas.getContext('2d');

const sizeMap = 20;

const w = (seaBattleCanvas.width / sizeMap);
const h = (seaBattleCanvas.height / sizeMap);
var firthtIndent = 5;
var secondIndent = 25 + (seaBattleCanvas.offsetWidth / w) * 10;

	console.log('w = ' + w + " h = " + h);
	console.log('1 = ' + firthtIndent + " 2 = " + secondIndent);

	seaBattleCanvas.width = Math.floor(seaBattleCanvas.offsetWidth);
	seaBattleCanvas.height =  Math.floor(seaBattleCanvas.offsetHeight);

	sb_ctx.fillStyle = "#ccc";
	sb_ctx.fillRect(0, 0, seaBattleCanvas.width, seaBattleCanvas.height);

function windowToCanvas(x, y) {
	var bbox = seaBattleCanvas.getBoundingClientRect();

	return {
		x: x - bbox.left * (seaBattleCanvas.offsetWidth / bbox.width),
		y: y - bbox.top * (seaBattleCanvas.offsetHeight / bbox.height)
	};
}

seaBattleCanvas.addEventListener('mousedown', function (e) {
	var loc = windowToCanvas(e.clientX, e.clientY);
	var x = loc.x;
	var y = loc.y;

	console.log("1) x = " + x + " y = " + y);

	x = Math.floor(x / (seaBattleCanvas.offsetWidth / w));
	y = Math.floor(y / (seaBattleCanvas.offsetWidth / w));

	console.log("x = " + x + " y = " + y);
});

function createArr(width, height){
	var arr = new Array(width);
	for (var i = 0; i < arr.length; ++i) {
		arr[i] = new Array(height);
	}
	return arr;
}




/* Ячейка */
class sb_cell{
	constructor(x = 0, y = 0, life = 0) {
		this.x = x;
		this.y = y;
		this.life = life;
		/*	0 - вода
			1 - мимо
			2 - потопленный корабль
			3 - живой корабль
		*/
	}
	/*При размещении на карте*/
	toggleShip(){
			 if(this.life === 0){ this.life = 3; }
		else if(this.life === 3){ this.life = 0; }
	}
	/*При игре*/
	shotShip(){
			 if(this.life === 0){ this.life = 1; }
		else if(this.life === 3){ this.life = 2; }
	}

	drawCell(color = "#ddd", indent = 5){
		sb_ctx.fillStyle = color;
		sb_ctx.fillRect(indent + this.x * (seaBattleCanvas.offsetWidth / w), 5 + this.y *  (seaBattleCanvas.offsetWidth / w), (seaBattleCanvas.offsetWidth / w) - 1,  (seaBattleCanvas.offsetWidth / w) - 1);
	}
};





/* Корабль */
class sb_ship{
	constructor(x = 0, y = 0, len = 1, rotate = "h"){
		this.startX = x;
		this.startY = y;

		this.len = len;
		this.rotate = rotate;
	}
};







/* Карта */

class sb_map{
	constructor(width = 10, height = 10){
		this.width = width;
		this.height = height;
		this.cellMap = createArr(this.width, this.height);
		this.closedMap = createArr(this.width, this.height);
		this.shipMap = createArr(5, 20);

		this.ship;
	}

	fillMap(){
		for(var i = 0; i < this.width; ++i){
			for(var j = 0; j < this.height; ++j){
				this.cellMap[i][j] = new sb_cell(i, j, 0);
			}
		}
	}

	showMap(){
		var m = createArr(this.width, this.height);

		for(var i = 0; i < this.width; ++i){
			for(var j = 0; j < this.height; ++j){
				m[i][j] = this.cellMap[i][j].life;
			}
		}
		console.log(m);
	}

	checkShip(ship) {
		if(ship.rotate === "h"){
			var mini = ship.startX - 1,
				minj = ship.startY - 1,

				maxi = ship.startX + ship.len,
				maxj = ship.startY + 1;
		} else {
			var mini = ship.startX - 1,
				minj = ship.startY - 1,

				maxi = ship.startX + 1,
				maxj = ship.startY + ship.len;
		}

		if(mini < 0) { mini = 0; }
		if(minj < 0) { minj = 0; }
		if(maxi > 9) { maxi = 9; }
		if(maxj > 9) { maxj = 9; }

		var secCellMap = createArr(this.width, this.height);
		secCellMap = this.cellMap;


		for(var i = mini; i <= maxi; ++i) {
				for(var j = minj; j <= maxj; ++j) {

//					console.log(i + " : " + j);
					if(secCellMap[i][j].life === 0 || secCellMap[i][j].life === 1){
						secCellMap[i][j].life = 1;
					} else {
						console.log("error");
					}
				}
			}
		this.cellMap = secCellMap;
		this.setShip(ship);
	}

	findLen(x, y, rot = "v"){
		var len = 0;
		console.log(x + " + " + y);
		while(this.cellMap[x][y].life === 3){
			len++;
			if(rot === "h"){
				if(x < 9) {x += 1;}
				else break;
			} else
			if(rot === "v"){
				if(y < 9) {y += 1;}
				else break;
			}
		}
		return len;
	}

	findRotate(x, y){
		if(x > 0){
			if(this.cellMap[x - 1][y].life === 3){
				return "h";
			}
		}
		if(x < 9){
			if(this.cellMap[x + 1][y].life === 3){
				return "h";
			}
		}
		if(y > 0){
			if(this.cellMap[x][y - 1].life === 3){
				return "v";
			}
		}
		if(y < 9){
			if(this.cellMap[x][y + 1].life === 3){
				return "v";
			}
		}
		return "rot";
	}

	findStart(x, y){
		var rot = this.findRotate(x, y);

		if(this.cellMap[x][y].life != 3){
			return [x, y];
		} else {
			if(x > 0){
				if(this.cellMap[x - 1][y].life === 3){
					return this.findStart(x - 1, y);
				}
			}
			if(y > 0){
				if(this.cellMap[x][y - 1].life === 3){
					return this.findStart(x, y - 1);
				}
			}
		}
		return [x, y];
	}

	whatIsShip(x, y){
		var rot = this.findRotate(x, y);
		var start = this.findStart(x, y);
		var len = this.findLen(start[0], start[1], rot);

		console.log(rot);
		console.log(start);
		console.log(len);

		return;
	}

//		findStart(x, y, rot = "v"){
//		console.log(this.cellMap[x][y]);
//
//		if(this.cellMap[x][y].life != 3){
//			console.log("itogL = " + this.findLen(x, y, rot));
//			return [x, y, "rot"];
//		} else {
//			if(x > 0){
//				if(this.cellMap[x - 1][y].life === 3){
//					return this.findStart(x - 1, y, "h");
//				}
//			}
//			if(y > 0){
//				if(this.cellMap[x][y - 1].life === 3){
//					return this.findStart(x, y - 1, "v");
//				}
//			}
//		}
//		console.log("itogL = " + this.findLen(x, y, rot));
//
//		return [x, y, rot];
//	}

	setShip(ship){
		if(ship.rotate === "h"){
			for(var i = 0; i < ship.len; ++i){
				this.cellMap[ship.startX + i][ship.startY].life = 3;
			}
		}
		if(ship.rotate === "v"){
			for(var i = 0; i < ship.len; ++i){
				this.cellMap[ship.startX][ship.startY + i].life = 3;
			}
		}
	}

	deleteShip(ship){
		if(ship.rotate === "h"){
			for(var i = 0; i < ship.len; ++i){
				this.cellMap[ship.startX + i][ship.startY].life = 0;
			}
		}
		if(ship.rotate === "v"){
			for(var i = 0; i < ship.len; ++i){
				this.cellMap[ship.startX][ship.startY + i].life = 0;
			}
		}
	}

	drawMap(){
		for (var i = 0; i < this.cellMap.length; ++i){
			for (var j = 0; j < this.cellMap[i].length; ++j){
				if(this.cellMap[i][j].life === 0){
//					console.log("0");
					this.cellMap[i][j].drawCell("#fff");
				}
				else if(this.cellMap[i][j].life === 1){
//					console.log("1");
					this.cellMap[i][j].drawCell("#00BFFF");
				}
				else if(this.cellMap[i][j].life === 2){
//					console.log("2");
					this.cellMap[i][j].drawCell("#A52A2A");
				}
				else if(this.cellMap[i][j].life === 3){
//					console.log("3");
					this.cellMap[i][j].drawCell("#202020");
				}
			}
		}
	}

	drawSecMap(){
		for (var i = 0; i < this.closedMap.length; ++i){
			for (var j = 0; j < this.closedMap[i].length; ++j){
				if(this.cellMap[i][j].life === 0){
					this.cellMap[i][j].drawCell("#fff", secondIndent);
				}
				else if(this.cellMap[i][j].life === 1){
					this.cellMap[i][j].drawCell("#00BFFF", secondIndent);
				}
				else if(this.cellMap[i][j].life === 2){
					this.cellMap[i][j].drawCell("#A52A2A", secondIndent);
				}
				else if(this.cellMap[i][j].life === 3){
					this.cellMap[i][j].drawCell("#202020", secondIndent);
				}
			}
		}
	}

	drawThirdMap(){

	}


};


//
//const sb_Cell = new sb_cell(3, 3, 2);
////sb_Cell.toggleCell();
//sb_Cell.drawCell("#000");
//console.log(sb_Cell);


const sb_Map = new sb_map;
sb_Map.fillMap();
//sb_Map.setShip(new sb_ship(0, 0, 2, "h"));
//sb_Map.showMap();
sb_Map.checkShip(new sb_ship(0, 0, 1, "h"));
sb_Map.checkShip(new sb_ship(0, 2, 1, "h"));
sb_Map.checkShip(new sb_ship(0, 4, 1, "h"));
sb_Map.checkShip(new sb_ship(4, 0, 1, "h"));

sb_Map.checkShip(new sb_ship(8, 0, 2, "h"));
sb_Map.checkShip(new sb_ship(4, 7, 2, "v"));
sb_Map.checkShip(new sb_ship(7, 7, 2, "h"));

sb_Map.checkShip(new sb_ship(7, 9, 3, "h"));
sb_Map.checkShip(new sb_ship(2, 7, 3, "v"));

sb_Map.checkShip(new sb_ship(3, 4, 4, "h"));

//console.log("itog = " + sb_Map.findStart(9, 9));
console.log("itog = " + sb_Map.whatIsShip(9, 9));

//console.log("itog = " + sb_Map.findStart(2, 9));

sb_Map.drawMap();
sb_Map.drawSecMap();
sb_Map.showMap();

//console.log(sb_Map);
