var easy = 1,
    medium = 3,
    hard = 5;

var lvl = 0;
var answer = 0;

var taskArr = new Array;    // массив чисел
var singsArr = new Array;   // массив знаков
var mathRezult = 0;         // результат выражения

var mathTest = document.querySelector("#math_test");
var mathTask = document.querySelector("#math_task");
var mathText = document.querySelector("#math_text");


function changeRadioBox(){
    var level = mathTest.querySelectorAll('input[type="radio"]');

    for(var i = 0; i < level.length; ++i){
        if(level[i].checked === true){
            switch (i){
                case 0: lvl = easy; break;
                case 1: lvl = medium; break;
                case 2: lvl = hard; break;
            };  
        }
    };
    createTask();
};

function createTask(){

    // clear arrays
    taskArr.splice(0, taskArr.length);
    singsArr.splice(0, singsArr.length);

    taskArr.push(random(0, 20));

    for(var i = 0; i < lvl; ++i){
        taskArr.push(random(0, 20));
        singsArr.push(random(0, 4));
        // проверка на правильное деление
        if(singsArr[i] === 1){
            var ch = divideCheck(taskArr[i], taskArr[i + 1]);
            if(ch === 1){taskArr[i + 1]++;}                 //если делитель = 0
            if(ch === 2){                                   //если есть остаток
                while (taskArr[i] % taskArr[i + 1] != 0) {
                    taskArr[i + 1] -= 1;                    
                }
            }
        }
    }
    mathTask.innerHTML = writeTask(taskArr, singsArr) + " = ";
    answer = findRezult(taskArr, singsArr);
    //answer = eval(writeTask(taskArr, singsArr));           //не рекомендуется
    console.log(answer)
}



function findDesigion(a, b, sign){
    switch (sign){
        case 0: return a * b; break;
        case 1: return Math.floor(a / b); break;
        case 2: return a + b; break;
        case 3: return a - b; break;
    };
}

// Функция поиска правильного порядка вычисления 
function myMin(Arr){
    for(var i = 0; i < Arr.length; ++i){
        if(Arr[i] === 0 || Arr[i] === 1){
            return i;
        }
    }
    return 0;
}

function findRezult(tasks, sings){
    var j;
    while(sings.length != 0){
        j = myMin(sings);
        if(sings.length != 0){
            tasks.splice(j, 2, findDesigion(tasks[j], tasks[j + 1], sings[j]));
            sings.splice(j, 1);
        }
    }
    return taskArr[0];
}

function divideCheck(a, b){
    return b === 0 ? 1 : a % b != 0 ? 2 : 0;
}

function writeSings(sign){
    switch (sign){
        case 0: return "*"; break;
        case 1: return "/"; break;
        case 2: return "+"; break;
        case 3: return "-"; break;
    };
}

function writeTask(tasks, signs){
    var W = "";

    for(var i = 0; i < tasks.length - 1; ++i){
        W += tasks[i] + " ";
        W += writeSings(signs[i]) + " ";
    }
    W += tasks[tasks.length - 1];

    return W;
}

function clear(){
    mathText.value = "";
    changeRadioBox();
}

function setSuccess(){
    mathText.classList.add("success");
}

function removeSuccess(){
    mathText.classList.remove("success");
}

function checkAnswer(){
    if(parseInt(mathText.value) === answer){
        Ding(400, 50, 10);
        setSuccess();
        setInterval(removeSuccess, 500);
        console.log("Graz");
        clear();
    }
}

changeRadioBox();
