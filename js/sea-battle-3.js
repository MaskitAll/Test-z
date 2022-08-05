var canvasPlayer_BS = document.getElementById("sea-battle_canvas"),
	ctxPlayer_BS     = canvasPlayer_BS.getContext('2d');
var canvasEnemy_BS = document.getElementById("sea-battle-enemy_canvas"),
	ctxEnemy_BS     = canvasEnemy_BS.getContext('2d');
var canvasShips_BS = document.getElementById("sea-battle-ship_canvas"),
	ctxShips_BS     = canvasShips_BS.getContext('2d');

var startBtn_bs = document.getElementById("sea-battle-start");



    canvasPlayer_BS.width = Math.floor(canvasPlayer_BS.offsetWidth);
    canvasPlayer_BS.height =  Math.floor(canvasPlayer_BS.offsetHeight);
    ctxPlayer_BS.fillStyle = "#ccc";
    ctxPlayer_BS.fillRect(0, 0, canvasPlayer_BS.width, canvasPlayer_BS.height);

    canvasEnemy_BS.width = Math.floor(canvasEnemy_BS.offsetWidth);
    canvasEnemy_BS.height =  Math.floor(canvasEnemy_BS.offsetHeight);
    ctxEnemy_BS.fillStyle = "#ccc";
    ctxEnemy_BS.fillRect(0, 0, canvasEnemy_BS.width, canvasEnemy_BS.height);

    canvasShips_BS.width = Math.floor(canvasShips_BS.offsetWidth);
    canvasShips_BS.height =  Math.floor(canvasShips_BS.offsetHeight);
    ctxShips_BS.fillStyle = "#ccc";
    ctxShips_BS.fillRect(0, 0, canvasShips_BS.width, canvasShips_BS.height);
 

            /***************
                Class BS
            ***************/
class Ships{
    constructor(x = 0, y = 0, rotate = "e", length = 0){        
        this.x = x;
        this.y = y;

        this.rotate = rotate;
        this.length = length;
        
        this.id = "x" + this.x + "y" + this.y + "r" + this.rotate + "l" + this.length;

        if(rotate === "v"){
            this.width = 1;
            this.height = this.length;

            this.ship = createArr(this.width,  this.height);
        } 
        else if(rotate === "h"){
            this.width = this.length;
            this.height = 1;

            this.ship = createArr(this.width,  this.height);
        }

        for(var i = 0; i < this.width; ++i){
            for(var j = 0; j < this.height; ++j){
                this.ship[i][j] = new Cell(this.x + i, this.y + j, 1);
            }
        }
	}

    // Поворот корабля
    rotateShip(){
        if(this.rotate === "h"){
            this.rotate = "v";
            this.width = 1;
            this.height = this.length;

            this.ship = createArr(this.width,  this.height);
        }
        else if(this.rotate === "v"){
            this.rotate = "h";
            this.width = this.length;
            this.height = 1;

            this.ship = createArr(this.width,  this.height);
        }


        for(var i = 0; i < this.width; ++i){
            for(var j = 0; j < this.height; ++j){
                this.ship[i][j] = new Cell(this.x + i, this.y + j, 1);
            }
        }
    }

    // Перенос корабля
    putShip(x, y){
        this.x = x;
        this.y = y;
    }



}


            /*********************
                Class Ship Map
            *********************/

    class MapShip extends Map{
        constructor(width = 10, height = 5, indent = 5 ){
            super(width, height, indent);
            this.colorArray = ["#fff", "#000", "#aaf", "#faa"];
        }

        // Возможность дополнить !!!!
        canSetShip(ship, newX = ship.x, newY = ship.y){  
            if(ship.rotate === "e"){ console.log("Ship is not turned correctly"); return false;}

            for(var i = -1; i <= ship.width; ++i){
                for(var j = -1; j <= ship.height; ++j){
                
                if( newX + i >= 0 && newX+ i < this.cellMap.length && 
                    newY + j >= 0 && newY + j < this.cellMap[newX].length) {
                        // если корабль залезает в зону другого
                        if(this.cellMap[newX + i][newY + j].value === 1){
                            console.log( "Ship enters the zone of another ship"); return false;
                        }
                    }
                    else {
                        // проверка на выход за границы полей карты
                        if(i != -1 && j != -1 && i != ship.width && j != ship.height){
                            console.log( "Ship goes out of the Map"); return false;
                        }
                    }
                }
            }
            console.log( "Ship is placed"); return true;
        }

        setShip(ship){
            for(var i = -1; i <= ship.width; ++i){      // ширина (Ox)
                for(var j = -1; j <= ship.height; ++j){ // высота (Oy)

                   // проверка на выход за границы полей карты
                    if( ship.x + i >= 0 && ship.x + i < this.cellMap.length && 
                        ship.y + j >= 0 && ship.y + j < this.cellMap[ship.x].length) {

                        // заполняются пустые места вокруг корабля
                        if(i === -1 || j === -1 || i === ship.width || j === ship.height){
                            this.cellMap[ship.x + i][ship.y + j].value = 0;
                        }
                        // заполняется сам корабль
                        else {
                            this.cellMap[ship.x + i][ship.y + j].value = 1;
                        }
                    }
                }
            }
        }

        findRotate(x, y){
            if(this.cellMap[x][y].value != 1){return "e";}
            if(x > 0 && x < this.cellMap.length - 1){
                if(this.cellMap[x - 1][y].value === 1){
                    return "h";
                }
                if(this.cellMap[x + 1][y].value === 1){
                    return "h";
                }
            }
            if(y > 0 && y < this.cellMap[x].length - 1){
                if(this.cellMap[x][y - 1].value === 1){
                    return "v";
                }
                if(this.cellMap[x][y + 1].value === 1){
                    return "v";
                }
            }
            return "v";
        }

        findStart(x, y){
            if(x > 0){
                if(this.cellMap[x - 1][y].value === 1){
                    return this.findStart(x - 1, y);
                }
            }
            if(y > 0){
                if(this.cellMap[x][y - 1].value === 1){
                    return this.findStart(x, y - 1);
                }
            }
            return [x, y];
        }

        findLen(x, y, rot){
            var len = 0;
    
            while(this.cellMap[x][y].value === 1){
                len++;
                if(rot === "h"){
                    if(x < this.cellMap.length - 1) {x += 1;}
                    else break;
                } else
                if(rot === "v"){
                    if(y < this.cellMap[x].length - 1) {y += 1;}
                    else break;
                }
            }
            return len;
        }

        // Возвращает корабль из координат
        isShip(x, y){
            if(this.cellMap[x][y].value != 1){ return false; }
    
            var rotate = this.findRotate(x, y);
    
            if(rotate === "e"){ return false;}
    
            var startX = this.findStart(x, y)[0];
            var startY = this.findStart(x, y)[1];
    
            var len = this.findLen(startX, startY, rotate);
    
            // ИЗМЕНИТЬ ВОЗВРАТ !!!
            // return new Ships(startX, startY, rotate, len);
            return "x" + startX + "y" + startY + "r"  + rotate + "l"  + len;
        }

        raiseShip(ship){
            for(var i = ship.x; i < ship.x + ship.width; ++i){
                for(var j = ship.y; j < ship.y + ship.height; ++j){
                    this.cellMap[i][j].value = 0;
                }
            }
        }

        moveShip(ship, x, y){
            if(this.canSetShip(ship, x, y)){
                this.raiseShip(ship);   // Поднимаем корабль
                ship.putShip(x, y);     // Перемещаем корабль
                this.setShip(ship);     // Опускаем корабль
            }
        }

        shot(x, y){
            if(this.cellMap[x][y].value === 0){
                this.cellMap[x][y].value = 2;
            }
            if(this.cellMap[x][y].value === 1){
                this.cellMap[x][y].value = 3;
            }
            // проверка на смерть и попадания
        }

    }







    const mapPlayer = new MapShip(10, 10, 10);
    const mapEnemy = new MapShip(10, 10, 10);
    const mapShips = new MapShip(20, 6, 10);

    const shipArray = [ 
        new Ships(1, 1, "v", 4),

        new Ships(3, 1, "v", 3),  
        new Ships(5, 1, "v", 3),

        new Ships(7, 1, "h", 2),
        new Ships(7, 3, "h", 2),
        new Ships(7, 5, "h", 2),
        
        new Ships(10, 1, "v", 1),
        new Ships(12, 1, "v", 1),
        new Ships(10, 3, "v", 1),
        new Ships(12, 3, "v", 1),
]


var currentShip = new Ships();
    
    

// Загрузка начальной карты
function startGame(){

}

function findShipInArray(shipID){
    for(var i = 0; i < shipArray.length; ++i){  
        if(shipID === shipArray[i].id){
            return shipArray[i];
        }
    }; 
    return false;
}

function returnShipInMap(ship){
    if(ship.rotate != ship.id.substring(ship.id.indexOf("r") + 1, ship.id.indexOf("l"))){
        mapShips.raiseShip(currentShip);
        currentShip.rotateShip();  
      }
    mapShips.moveShip(ship, +ship.id.substring(1, ship.id.indexOf("y")), +ship.id.substring(ship.id.indexOf("y") + 1, ship.id.indexOf("r")));
}

// function randomMoveShips(map){
//     for(var i = 0; i < map.cellMap.length; ++i){
//         for(var j = 0; j < map.cellMap[i].length; ++j){

//             if(map.cellMap[x][y].value != 0){
//                 if(map.isShip(x, y)){
                        
//                 }
//             }
//         }
//     }
// }

// при нажатии на пробел currentShip меняет ротацию 
document.onkeydown = function(event){
    if(event.keyCode === 32){
        event.preventDefault();

        if(currentShip != false){
            mapShips.raiseShip(currentShip);
            currentShip.rotateShip();
            mapShips.moveShip(currentShip, 15, 1);
        }
    }

    drawMap(canvasShips_BS, ctxShips_BS, mapShips);
};

// выбирает корабль
canvasShips_BS.addEventListener('mousedown', function (e) {
    var loc = windowToCanvas(canvasShips_BS, e.clientX, e.clientY, mapShips.indent);
    var x = loc.x;
    var y = loc.y;
    
    x = Math.floor(x / (canvasShips_BS.width - mapShips.indent * 2) * mapShips.width);
    y = Math.floor(y / (canvasShips_BS.height - mapShips.indent * 2) * mapShips.height);

    // изменить в зависимости от логики
    if(mapShips.cellMap[x][y].value != 0){
    if(currentShip.length != 0){
        returnShipInMap(currentShip);
    }
    
    currentShip = findShipInArray(mapShips.isShip(x, y));

    if(currentShip === false){return;}
    
    for(var i = 0; i < shipArray.length; ++i){
        if (shipArray[i].x === currentShip.x && shipArray[i].y === currentShip.y) {
            mapShips.moveShip(currentShip, 15, 1);
            // shipArray.splice(i, 1);
        }
    }
}
    drawMap(canvasShips_BS, ctxShips_BS, mapShips);
});


// выставление кораблей на свое поле
canvasPlayer_BS.addEventListener('mousedown', function (e) {
    var loc = windowToCanvas(canvasPlayer_BS, e.clientX, e.clientY, mapPlayer.indent);
    var x = loc.x;
    var y = loc.y;
    
    x = Math.floor(x / (canvasPlayer_BS.width - mapPlayer.indent * 2) * mapPlayer.width);
    y = Math.floor(y / (canvasPlayer_BS.height - mapPlayer.indent * 2) * mapPlayer.height);

    // изменить в зависимости от логики
    if(startBtn_bs.disabled){

    if(mapPlayer.canSetShip(currentShip, x, y)){
        mapShips.raiseShip(currentShip);    // удаляет корабль из окна выбора
        currentShip.putShip(x, y);          // меняет координаты выбранного корабля под текущие
        mapPlayer.setShip(currentShip);     // выставляет корабль на поле игрока
        
        // ИЗМЕНИТЬ!!!
        for(var i = 0; i < shipArray.length; ++i){
            if(shipArray[i].id === currentShip.id){
                shipArray.splice(i, 1);
            }
            if(shipArray.length === 0){
                startBtn_bs.classList.remove("btn-disabled");
                startBtn_bs.removeAttribute("disabled");
            }
        }
        currentShip = new Ships();          // удаляет корабль выбора
    }
    } else{
        mapPlayer.shot(x, y);
    }
    drawMap(canvasPlayer_BS, ctxPlayer_BS, mapPlayer);
    drawMap(canvasShips_BS, ctxShips_BS, mapShips);
});

startBtn_bs.addEventListener('click', () => {
    startGame();
});

mapShips.fillMap();
console.log("start");

shipArray.forEach(ship => {
    mapShips.setShip(ship);
});

drawMap(canvasPlayer_BS, ctxPlayer_BS, mapPlayer);
drawMap(canvasEnemy_BS, ctxEnemy_BS, mapEnemy);
drawMap(canvasShips_BS, ctxShips_BS, mapShips);
