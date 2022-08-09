
/* Cell */
class Cell{
    constructor(x = 0, y = 0, value = 0) {
        this.x = x;
        this.y = y;

        this.value = value;
    }

    setValue(newValue){
        this.value = newValue;
    }

    toggleValue(){
		this.value === 0 ? this.value = 1 : this.value = 0;
	}
};

/* Map */
class Map{
    constructor(width, height, indent){
        this.width = width;
        this.height = height;
        this.indent = indent;
        
        this.cellMap = createArr(this.width, this.height);
        for(var i = 0; i < this.width; ++i){
            for(var j = 0; j < this.height; ++j){
                this.cellMap[i][j] = new Cell(i, j, 0);
            }
        }

        this.colorArray = ["#fff", "#f00", "#0f0", "#00f", "#ddd", "#000"];
        // this.colorArray = {0: "#fff", 1: "#f00", 2: "#0f0", 3: "#00f", 4: "#ccc", 5: "#000"};
    }

    // меняет местами значения ячеек
    swipeCell(cell_1, cell_2){
        var cell = new Cell();
        cell.value = cell_2.value;
        cell_2.value = cell_1.value;
        cell_1.value = cell.value;
    }

    // заполняет карту пустыми ячейками
    fillMap(){
        for(var i = 0; i < this.width; ++i){
            for(var j = 0; j < this.height; ++j){
                this.cellMap[i][j].value = 0;
            }
        }
    }

    // заполняет карту ячейками из другой карты
    fillMapArr(m1){
		for (var i = 0; i < this.cellMap.length; ++i){
			for (var j = 0; j < this.cellMap[i].length; ++j){

				if (i < m1.cellMap.length && j < m1.cellMap[i].length){
					this.cellMap[i][j] = m1.cellMap[i][j];
				} else{
					this.cellMap[i][j].value = 0;
				}
			}
		}
	}

    // заполняет карту случайными ячейками
    fillMapRand(){
		for (var i = 0; i < this.cellMap.length; ++i){
			for (var j = 0; j < this.cellMap[i].length; ++j){
				this.cellMap[i][j] = new Cell(i, j, random(0, this.colorArray.length));
			}
		}
	}
    // выставляет значение ячейки
    setCellValue(x, y, value){
        if( x >= 0 && x < this.cellMap.length && 
            y >= 0 && y < this.cellMap[x].length) {
                this.cellMap[x][y].value = value;
            }
        else {
            return false;
        }
    }
}


/* Всякие функции поддержки*/

// Random
function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// функция добавления нового див в родительский класс
function createInside(parent, style, innerHTML){    
    var elemDiv = document.createElement("div");
    elemDiv.classList.add(style);
    elemDiv.innerHTML = innerHTML; 
    parent.append(elemDiv);
}

function deleteInside(parent, elemDiv){
    if(elemDiv){ parent.removeChild(elemDiv);}
}

// Create array
function createArr(width, height){
	var arr = new Array(width);
	for (var i = 0; i < arr.length; ++i) {
		arr[i] = new Array(height);
	}
	return arr;
}

// переводит позицию мыши на экране в позицию на канвасе
function windowToCanvas(canvas, x, y, indent = 5) {
    var bbox = canvas.getBoundingClientRect();
    
    return {
        // позиция мыши - (позиция канваса(0.0) + отступ)
        x: x - (bbox.left + indent),
        y: y - (bbox.top + indent)
    };
}

// отрисовывает обводку ячейки
function drawBorder(canvas, ctx, m, color, x, y){
    ctx.fillStyle = color;

    ctx.fillRect(   m.indent + x * ((canvas.width - m.indent * 2) / m.width) - 2,
                    m.indent + y * ((canvas.height - m.indent * 2) / m.height) - 2,
                    (canvas.width - m.indent * 2)/ m.width + 2,
                    (canvas.height - m.indent * 2) / m.height + 2
    );
};

// отрисовывает ячейку
function drawCell(canvas, ctx, m, x, y){
    ctx.fillStyle = m.colorArray[m.cellMap[x][y].value];

    ctx.fillRect(   m.indent + x * ((canvas.width - m.indent * 2) / m.width),
                    m.indent + y * ((canvas.height - m.indent * 2) / m.height),
                    (canvas.width - m.indent * 2)/ m.width - 2,
                    (canvas.height - m.indent * 2) / m.height - 2
    );
};

// отрисовывает карту
function drawMap(canvas, ctx, m){
    ctx.fillStyle = "#ccc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // console.log(m.cellMap); 
    for (var i = 0; i < m.cellMap.length; ++i){
        for (var j = 0; j < m.cellMap[i].length; ++j){
            drawCell(canvas, ctx, m, i, j);
        }
    }
};



