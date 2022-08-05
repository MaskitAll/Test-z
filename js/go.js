var canvas_GO = document.getElementById("GO_canvas"),
	ctx_GO     = canvas_GO.getContext('2d');

var startBtn_GO = document.getElementById("GO-start");



canvas_GO.width = Math.floor(canvas_GO.offsetWidth);
canvas_GO.height =  Math.floor(canvas_GO.offsetHeight);
ctx_GO.fillStyle = "#ccc";
ctx_GO.fillRect(0, 0, canvas_GO.width, canvas_GO.height);

const mapGO = new Map(10, 10, 5);



drawMap(canvas_GO, ctx_GO, mapGO);
