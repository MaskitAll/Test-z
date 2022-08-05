
var canvas_Memo = document.getElementById("memorization_canvas");
	// ctx_Memo     = canvas_Memo.getContext('2d');


    // Добавляем возможность свайпа на моб устройства
canvas_Memo.addEventListener('touchstart', handleTouchStart, false);
canvas_Memo.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
return evt.touches
};

function handleTouchStart(evt) {
const firstTouch = getTouches(evt)[0];
xDown = firstTouch.clientX;
yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
if ( ! xDown || ! yDown ) {
return;
}

var xUp = evt.touches[0].clientX;
var yUp = evt.touches[0].clientY;

var xDiff = xDown - xUp;
var yDiff = yDown - yUp;

if ( Math.abs(xDiff) > Math.abs(yDiff)) {
    ( xDiff > 0 ) ? alert("Left") : alert("Right");
} else {
    ( yDiff > 0 ) ? alert("Up") : alert("Down");
}

/* свайп был, обнуляем координаты */
xDown = null;
yDown = null;
};





var Memo= [];

var memos_arrow = [37, 38, 39, 40];
var memos_digit = [49, 50, 51, 52, 53, 54, 55, 56, 57, 58];
var memos_dictionary = [];

var level = 0;
var difficulty = 0;


function gainArray(){
    switch (difficulty) {
        case 0:
            return memos_arrow;
            break;
        case 1:
            return memos_digit;
            break;
    
        default:
            return [];
            break;
    }
}

function memoReset() {
    level = 0;
    difficulty = 0;
    Memo = [];
}

function createMemory(memos_array, level) {
    Memo = [];

    // записываем символы для запоминания в массив
    for(var i = 0; i <= level; ++i){
        Memo.push(memos_array[random(0, memos_array.length)])
    }
}

// function showMemo(i){
//     setTimeout(()=> {

//     }, 2000);
// }

function showMemory(){
    (function showMemo (i) {
        setTimeout(function () {           
            deleteInside(canvas_Memo.querySelector(".memoScreen"), canvas_Memo.querySelector(".emersion"));
            createInside(canvas_Memo.querySelector(".memoScreen"), 'emersion' , Memo[i]);              
            if (i < Memo.length - 1) {++i; showMemo(i);}      //  decrement i and call myLoop again if i > 0
        }, 2000)
     })(0); 
    // setTimeout(()=> {
    //     deleteInside(canvas_Memo, canvas_Memo.querySelector("div"));
    //     createInside(canvas_Memo, 'emersion' , Memo[i]);

    // }, 2000);
    // // Memo.forEach(element => {
    // for(var i = 0; i < Memo.length; ++i){
    //     console.log(Memo[i]); 
    //     createInside(canvas_Memo, 'emersion' , Memo[i]);
    //     setTimeout(() => deleteInside(canvas_Memo, canvas_Memo.querySelector("div")), 2000);
    // }
}


// createInside(canvas_Memo, 'emersion' ,"Hello!");
// // canvas_Memo.addEventListener("click", deleteInside, canvas_Memo.querySelectorAll("div"))
// canvas_Memo.addEventListener("click", ()=>deleteInside(canvas_Memo, canvas_Memo.querySelector("div")))

createMemory(gainArray(), 10);
showMemory();

// var elemDiv = document.createElement("div");
// elemDiv.style.cssText = 'width:100%;height:40px;background:red;';
// elemDiv.textContent = 'Added element with some data'; 
// // window.document.body.insertBefore(elemDiv, parent.appendChild(elemDiv));
// document.getElementById("memorization").insertBefore(elemDiv, canvas_Memo);



// console.log(createMemory(gainArray(), 10));