var frequency = document.querySelector("#frequency");
var fr = frequency.value;

var delay = document.querySelector("#delay");
var delayValue = delay.value;

var gainM = document.querySelector("#gain");
var gainValue = gainM.value;

var frArr = new Array;
var delayArr = new Array;

//  создать Web Audio API контекст;
var audioContext = new (window.AudioContext || window.webkitAudioContext)();

function Ding( fr, st, ga){
    var now = audioContext.currentTime;
    // Создать узел осциллятора внутри этого контекста;
    oscillator = audioContext.createOscillator() //Осциллятор - математически вычисляемые звуки;
    // Выбрать тип сигнала;
    //OscillatorNode.type = 'sine'|'square'|'triangle'|'sawtooth';
    oscillator.type="square";
    // Установить частоту;
    oscillator.frequency.value = fr;
    // Подключить осциллятор;
    oscillator.connect(audioContext.destination);
    
    // Создать узел усилителя внутри контекста
    myGain = audioContext.createGain()
    // Присоединить его к цепи
    oscillator.connect(myGain);
    // Присоединить усилитель к назначению
    myGain.connect(audioContext.destination);

    myGain.gain.value = ga;
    // myGain.gain.setValueAtTime(100, now);
    // myGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    // Запустить осциллятор;
    oscillator.start(now);
    oscillator.stop(now + st * 0.001);
}

function changeFrequency(){
    document.querySelector("#frequency_label").innerHTML = "Частота: " + frequency.value + "Гц";
    fr = frequency.value;
    Ding(fr,delayValue, gainValue);
}

function changeDelay(){
    document.querySelector("#delay_label").innerHTML = "Задержка: " + delay.value + "мс";
    delayValue = delay.value;
    Ding(fr,delayValue, gainValue);
}

function changeGain(){
    document.querySelector("#gain_label").innerHTML = "Усиление: " + gainM.value + "";
    gainValue = gainM.value;
    Ding(fr,delayValue, gainValue);
}

function goMusic(){
    for(var i = 0; i < frArr.length; ++i){
        // console.log(frArr)
        Ding(frArr[i],delayArr[i], gainValue);
        setInterval(() => { }, 1000);
    }
}

function remember(){
    frArr.push(fr);
    delayArr.push(delayValue);
}