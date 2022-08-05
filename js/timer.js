
var Ses = document.querySelector(".session .lenght");
var Bre = document.querySelector(".break .lenght");

var Min = document.querySelector(".timer-time .min");
var Sec = document.querySelector(".timer-time .sec");

var CB = document.querySelector(".circle-container");

var Stop = document.querySelector(".stop_icon")

		Min.textContent = todeg(Ses.textContent);

var stime = (Min.textContent * 60) + Sec.textContent * 1;
var timerid;
var runTimer = false;							//запущен ли таймер
var isSes = false;								//это сессия или отдых

	document.querySelector(".session .left-arrow").addEventListener('click', function (){
	'use strict';
		if(Ses.textContent > 1)
			Ses.textContent--;
			res();
	});

	document.querySelector(".session .right-arrow").addEventListener('click', function (){
		Ses.textContent++;
			res();
	});

	document.querySelector(".break .left-arrow").addEventListener('click', function (){
		if(Bre.textContent > 1)
			Bre.textContent--;
			res();
	});

	document.querySelector(".break .right-arrow").addEventListener('click', function (){
		Bre.textContent++;
			res();
	});

	// central block
	CB.addEventListener('click', function(){
		if(runTimer){
			CB.style.background = 'rgba(200, 180, 180, 0.4)';
			runTimer = false;
		}
		else{
			CB.style.background = 'rgba(200, 180, 180, 0.6)';
			runTimer = true;
		}
		timer(runTimer);
	});

	// stop
	document.querySelector(".stop_icon").addEventListener('click', function (){
		console.log("stop");
		res();
	});

	//timer
	function timer(runTimer){
		if(runTimer){								// если таймер запущен
			if(stime<=0){							// если таймер закончил отсчет
				if(!isSes){
					isSes = true;
					stime = Bre.textContent * 60;
				} else {
					isSes = false;
					stime = Ses.textContent * 60;
				}
				Ding(400, 50, 10);					// DING!!!
			}
			tic();
			timerid = setTimeout(timer, 1000, true);
		}
		else{stop();}
	}

	//1 sec
	function tic(){
		if(stime>0){
			stime--;
		}
		
		stom(stime);
	}

	//parse time (sec to min)
	function stom(s){
		Min.textContent = todeg(parseInt(s % 3600 / 60));
		Sec.textContent = todeg(parseInt(s % 3600 % 60));
	}

	function res(){
		console.log("stop");

		Min.textContent = todeg(Ses.textContent);
		Sec.textContent = todeg(0);
		stime = (Min.textContent * 60) + Sec.textContent * 1;
		CB.style.background = 'rgba(200, 180, 180, 0.4)';
		runTimer = false;

		stop();
	}

	function stop(){
		clearTimeout(timerid);
	}

	function todeg(a){
		if(a/10<1){return "0" + a;} else {return a;}
	}
