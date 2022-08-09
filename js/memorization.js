//основное поле игры
var canvas_Memo = document.getElementById("memorization_canvas");
// кнопки выбора
var select_1 = document.getElementById("select_1");
var select_2 = document.getElementById("select_2");
var select_3 = document.getElementById("select_3");
var select_4 = document.getElementById("select_4");


var memo_level = document.getElementById("memo_level");
var memo_speed = document.getElementById("memo_speed");


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
        ( xDiff > 0 ) ? selectMemoAnswer(37, 'select_1') : selectMemoAnswer(39, 'select_4');
    } else {
        ( yDiff > 0 ) ? selectMemoAnswer(38, 'select_2') : selectMemoAnswer(40, 'select_3');
    }

    /* свайп был, обнуляем координаты */
    xDown = null;
    yDown = null;
};




// код игры запоминалка
var Memo= [];
var MemoAnswer = [];

var memos_arrow = [37, 38, 39, 40];
var memos_digit = [49, 50, 51, 52, 53, 54, 55, 56, 57, 58];
var memos_dictionary = [];

var level = memo_level.value - 1;
var difficulty = 0;
var speed = 500;
setSpeed();

// устанавливаем скорость всплывания
function setSpeed(){
    if(String(parseInt(memo_speed.value, 10)) === String(memo_speed.value)){
        console.log(memo_speed.value)
        if(memo_speed.value < 200) { speed = 200; }
        else if(memo_speed.value > 4000) {speed = 4000}
        else {speed = memo_speed.value}
        console.log(speed);
        canvas_Memo.querySelector(".memoScreen").style.setProperty('--speed', speed + "s");
    }
}

var select = 0;

// получить массив для запоминания
function getMemoArray(){
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

function replaceArrowCode(code){
    switch (code) {
        case 37:
            return "&lArr;"
            break;
    
        case 38:
            return "&uArr;"
            break;
    
        case 39:
            return "&rArr;"
            break;
    
        case 40:
            return "&dArr;"
            break;
    
        default:
            break;
    }

}

// отключить кнопки
function hideButtons(){
    select_1.classList.add("blocked");
    select_2.classList.add("blocked");
    select_3.classList.add("blocked");
    select_4.classList.add("blocked");
}

// включить кнопки
function showButtons(){
    if(select_1.classList.contains("blocked")) {select_1.classList.remove("blocked");}
    if(select_2.classList.contains("blocked")) {select_2.classList.remove("blocked");}
    if(select_3.classList.contains("blocked")) {select_3.classList.remove("blocked");}
    if(select_4.classList.contains("blocked")) {select_4.classList.remove("blocked");}
   
    if(select_1.classList.contains("correct")) {select_1.classList.remove("correct");}
    if(select_2.classList.contains("correct")) {select_2.classList.remove("correct");}
    if(select_3.classList.contains("correct")) {select_3.classList.remove("correct");}
    if(select_4.classList.contains("correct")) {select_4.classList.remove("correct");}
   
    if(select_1.classList.contains("incorrect")) {select_1.classList.remove("incorrect");}
    if(select_2.classList.contains("incorrect")) {select_2.classList.remove("incorrect");}
    if(select_3.classList.contains("incorrect")) {select_3.classList.remove("incorrect");}
    if(select_4.classList.contains("incorrect")) {select_4.classList.remove("incorrect");}
}

// заполнить значения в кнопки
function getMemoButtons(){
    select_1.innerHTML = replaceArrowCode(memos_arrow[0])
    select_2.innerHTML = replaceArrowCode(memos_arrow[1])
    select_4.innerHTML = replaceArrowCode(memos_arrow[2])
    select_3.innerHTML = replaceArrowCode(memos_arrow[3])
}

function returnButton(name){
    switch (name) {
        case "select_1":
            return select_1;
            break;
    
        case "select_2":
            return select_2;
            break;
    
        case "select_3":
            return select_3;
            break;
    
        case "select_4":
            return select_4;
            break;
    
        default:
            break;
    }
}

function selectMemoAnswer(code, button){
    MemoAnswer.push(code);
    console.log(MemoAnswer[MemoAnswer.length - 1])
    console.log(Memo[MemoAnswer.length - 1])

    if(MemoAnswer[MemoAnswer.length - 1] === Memo[MemoAnswer.length - 1]){
        returnButton(button).classList.add("correct");
        setTimeout(function () {           
            returnButton(button).classList.toggle("correct");
        }, 1000)

        if(MemoAnswer.length === Memo.length){
            alert("Поздравляю, вы выиграли!");
            memo_level.value++;
            hideButtons();

        }
    }else{
        returnButton(button).classList.add("incorrect");
        setTimeout(function () {           
            returnButton(button).classList.toggle("incorrect");
        }, 500)
        memoReset();
        hideButtons();
    }

    // console.log(code);
}

// сброс массива
function memoReset() {
    level = memo_level.value - 1;
    setSpeed();
    difficulty = 0;
    Memo = [];
    MemoAnswer = [];
}

function createMemory(memos_array, level) {
    Memo = [];
    // записываем символы для запоминания в массив
    for(var i = 0; i <= level; ++i){
        Memo.push(memos_array[random(0, memos_array.length)])
    }
    console.log(Memo)
}

// всплывание сиволов для запоминания
// function showMemory(){
//     (function showMemo (i) {
//         setTimeout(function () {           
//             deleteInside(canvas_Memo.querySelector(".memoScreen"), canvas_Memo.querySelector(".emersion"));
//             createInside(canvas_Memo.querySelector(".memoScreen"), 'emersion' , Memo[i]);              
//             if (i < Memo.length - 1) {++i; showMemo(i);}      //  decrement i and call myLoop again if i > 0
//         }, 2000)
//      })(0);     
// }
 
function showMemory(){
    (function showMemo (i) {
        setTimeout(function () {           
            deleteInside(canvas_Memo.querySelector(".memoScreen"), canvas_Memo.querySelector(".emersion"));
            createInside(canvas_Memo.querySelector(".memoScreen"), 'emersion' , replaceArrowCode(Memo[i]));              
            if (i < Memo.length - 1) {++i; showMemo(i);}      //  decrement i and call myLoop again if i > 0
        }, speed)
    })(0);
    setTimeout(() => { showButtons(); }, speed * (Memo.length + 1));
 }

// createInside(canvas_Memo, 'emersion' ,"Hello!");
// // canvas_Memo.addEventListener("click", deleteInside, canvas_Memo.querySelectorAll("div"))
// canvas_Memo.addEventListener("click", ()=>deleteInside(canvas_Memo, canvas_Memo.querySelector("div")))


function memoStart(){
    memoReset();
    hideButtons();
    createMemory(getMemoArray(), level);
    getMemoButtons();
    showMemory();
    // showButtons();
}

// var elemDiv = document.createElement("div");
// elemDiv.style.cssText = 'width:100%;height:40px;background:red;';
// elemDiv.textContent = 'Added element with some data'; 
// // window.document.body.insertBefore(elemDiv, parent.appendChild(elemDiv));
// document.getElementById("memorization").insertBefore(elemDiv, canvas_Memo);



// console.log(createMemory(gainArray(), 10));