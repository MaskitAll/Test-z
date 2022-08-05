'use strict';

var Vue = new Vue({
	el: '#main',
	data: {
		logotip: "Test`s",

		isShowNav: 1,


		htmlWithoutStyles: [
			{
				id: "w1",
				name: "Только день не повторится...",
				link: "/html/without_css/test-1.html",
				dificult: "green",
				task: "/html/without_css/task-1.html",
				decision: "/html/without_css/decision-1.html",
				isShow: false,
			},
			{
				id: "w2",
				name: "Заповедь",
				link: "/html/without_css/test-2.html",
				dificult: "green",
				task: "/html/without_css/task-2.html",
				decision: "/html/without_css/decision-2.html",
				isShow: false,
			},
			{
				id: "w3",
				name: "Silence is golden",
				link: "/html/without_css/test-3.html",
				dificult: "green",
				task: "/html/without_css/task-3.html",
				decision: "/html/without_css/decision-3.html",
				isShow: false,
			},
			{
				id: "w4",
				name: "Проект",
				link: "/html/without_css/test-4.html",
				dificult: "green",
				task: "/html/without_css/task-4.html",
				decision: "/html/without_css/decision-4.html",
				isShow: false,
			},
			{
				id: "w5",
				name: "Статьи",
				link: "/html/without_css/test-5.html",
				dificult: "green",
				task: "/html/without_css/task-5.html",
				decision: "/html/without_css/decision-5.html",
				isShow: false,
			},
			{
				id: "w6",
				name: "Генераторы",
				link: "/html/without_css/test-6.html",
				dificult: "green",
				task: "/html/without_css/task-6.html",
				decision: "/html/without_css/decision-6.html",
				isShow: false,
			},
			{
				id: "w7",
				name: "Время",
				link: "/html/without_css/test-7.html",
				dificult: "green",
				task: "/html/without_css/task-7.html",
				decision: "/html/without_css/decision-7.html",
				isShow: false,
			},
			{
				id: "w8",
				name: "Код",
				link: "/html/without_css/test-8.html",
				dificult: "green",
				task: "/html/without_css/task-8.html",
				decision: "/html/without_css/decision-8.html",
				isShow: false,
			},
			{
				id: "w9",
				name: "Волшебные формулы",
				link: "/html/without_css/test-9.html",
				dificult: "green",
				task: "/html/without_css/task-9.html",
				decision: "/html/without_css/decision-9.html",
				isShow: false,
			},
			{
				id: "w10",
				name: "Странные буквы",
				link: "/html/without_css/test-10.html",
				dificult: "green",
				task: "/html/without_css/task-10.html",
				decision: "/html/without_css/decision-10.html",
				isShow: false,
			},
			{
				id: "w11",
				name: "Химические элементы",
				link: "/html/without_css/test-11.html",
				dificult: "yellow",
				task: "/html/without_css/task-11.html",
				decision: "/html/without_css/decision-11.html",
				isShow: false,
			},
			{
				id: "w12",
				name: "Карта сокровищ",
				link: "/html/without_css/test-12.html",
				dificult: "yellow",
				task: "/html/without_css/task-12.html",
				decision: "/html/without_css/decision-12.html",
				isShow: false,
			},
			{
				id: "w13",
				name: "Запись на курсы",
				link: "/html/without_css/test-13.html",
				dificult: "yellow",
				task: "/html/without_css/task-13.html",
				decision: "/html/without_css/decision-13.html",
				isShow: false,
			},
			{
				id: "w14",
				name: "Простое тестовое",
				link: "/html/without_css/test-14.html",
				dificult: "red",
				task: "/html/without_css/task-14html",
				decision: "/html/without_css/decision-14.html",
			},

		],
		htmlWithStyles: [
			{
				id: "wo1",
				name: "Центрированный блок",
				link: "/html/with_css/test-1.html",
				dificult: "green",
				task: "/html/with_css/task-1.html",
				decision: "/html/with_css/decision-1.html",
				isShow: false,
			},
			{
				id: "wo2",
				name: "Центрированный блок 2",
				link: "/html/with_css/test-2.html",
				dificult: "green",
				task: "/html/with_css/task-2.html",
				decision: "/html/with_css/decision-2.html",
				isShow: false,
			},
			{
				id: "wo3",
				name: "Буква и строка",
				link: "/html/with_css/test-3.html",
				dificult: "green",
				task: "/html/with_css/task-3.html",
				decision: "/html/with_css/decision-3.html",
				isShow: false,
			},
			{
				id: "wo4",
				name: "Всему свой резон",
				link: "/html/with_css/test-4.html",
				dificult: "green",
				task: "/html/with_css/task-4.html",
				decision: "/html/with_css/decision-4.html",
				isShow: false,
			},
			{
				id: "wo5",
				name: "Полезные ссылки",
				link: "/html/with_css/test-5.html",
				dificult: "green",
				task: "/html/with_css/task-5.html",
				decision: "/html/with_css/decision-5.html",
				isShow: false,
			},
			{
				id: "wo6",
				name: "Математические задачи",
				link: "/html/with_css/test-6.html",
				dificult: "green",
				task: "/html/with_css/task-6.html",
				decision: "/html/with_css/decision-6.html",
				isShow: false,
			},
			{
				id: "wo7",
				name: "Интересная затея",
				link: "/html/with_css/test-7.html",
				dificult: "green",
				task: "/html/with_css/task-7.html",
				decision: "/html/with_css/decision-7.html",
				isShow: false,
			},
			{
				id: "wo8",
				name: "Два принципа",
				link: "/html/with_css/test-8.html",
				dificult: "green",
				task: "/html/with_css/task-8.html",
				decision: "/html/with_css/decision-8.html",
				isShow: false,
			},
			{
				id: "wo9",
				name: "Принципы успеха",
				link: "/html/with_css/test-9.html",
				dificult: "green",
				task: "/html/with_css/task-9.html",
				decision: "/html/with_css/decision-9.html",
				isShow: false,
			},
			{
				id: "wo10",
				name: "Собираем проект",
				link: "/html/with_css/test-10.html",
				dificult: "green",
				task: "/html/with_css/task-10.html",
				decision: "/html/with_css/decision-10.html",
				isShow: false,
			},
			{
				id: "wo11",
				name: "Создание графика",
				link: "/html/with_css/test-11.html",
				dificult: "green",
				task: "/html/with_css/task-11.html",
				decision: "/html/with_css/decision-11.html",
				isShow: false,
			},
			{
				id: "wo12",
				name: "Koans",
				link: "/html/with_css/test-12.html",
				dificult: "green",
				task: "/html/with_css/task-12.html",
				decision: "/html/with_css/decision-12.html",
				isShow: false,
			},
			{
				id: "wo13",
				name: "Всякое разное",
				link: "/html/with_css/test-13.html",
				dificult: "green",
				task: "/html/with_css/task-13.html",
				decision: "/html/with_css/decision-13.html",
				isShow: false,
			},
			{
				id: "wo14",
				name: "Наши достижения",
				link: "/html/with_css/test-14.html",
				dificult: "green",
			},
			{
				id: "wo15",
				name: "Словари",
				link: "/html/with_css/test-15.html",
				dificult: "green",
			},
			{
				id: "wo16",
				name: "Фиксированное избранное",
				link: "/html/with_css/test-16.html",
				dificult: "green",
			},
			{
				id: "wo17",
				name: "Разноцветные блоки",
				link: "/html/with_css/test-17.html",
				dificult: "green",
			},
			{
				id: "wo18",
				name: "Две колонки",
				link: "/html/with_css/test-18.html",
				dificult: "green",
			},
			{
				id: "wo19",
				name: "В два ряда",
				link: "/html/with_css/test-19.html",
				dificult: "green",
			},
			{
				id: "wo20",
				name: "Серия блоков",
				link: "/html/with_css/test-20.html",
				dificult: "green",
			},
			{
				id: "wo21",
				name: "Молчание - золото",
				link: "/html/with_css/test-21.html",
				dificult: "green",
			},
			{
				id: "wo22",
				name: "Кольцо",
				link: "/html/with_css/test-22.html",
				dificult: "green",
			},
			{
				id: "wo23",
				name: "Три треугольника",
				link: "/html/with_css/test-23.html",
				dificult: "green",
			},
			{
				id: "wo24",
				name: "Три квадрата",
				link: "/html/with_css/test-24.html",
				dificult: "green",
			},
			{
				id: "wo25",
				name: "Smart pixel",
				link: "/html/with_css/test-25.html",
				dificult: "green",
			},
			{
				id: "wo26",
				name: "Безопасность",
				link: "/html/with_css/test-26.html",
				dificult: "green",
			},
			{
				id: "wo27",
				name: "Распродажа стайлеров",
				link: "/html/with_css/test-27.html",
				dificult: "green",
			},
			{
				id: "wo28",
				name: "Зафиксируйте цену",
				link: "/html/with_css/test-28.html",
				dificult: "green",
			},
			{
				id: "wo29",
				name: "Научное наследие",
				link: "/html/with_css/test-29.html",
				dificult: "green",
			},
			{
				id: "wo30",
				name: "Эйнштейн",
				link: "/html/with_css/test-30.html",
				dificult: "green",
			},
			{
				id: "wo31",
				name: "Яндекс",
				link: "/html/with_css/test-31.html",
				dificult: "green",
			},
			{
				id: "wo32",
				name: "Сегодня на сайте",
				link: "/html/with_css/test-32.html",
				dificult: "green",
			},
			{
				id: "wo33",
				name: "Самое читаемое",
				link: "/html/with_css/test-33.html",
				dificult: "green",
			},
			{
				id: "wo34",
				name: "Код CSS",
				link: "/html/with_css/test-34.html",
				dificult: "green",
			},
			{
				id: "wo35",
				name: "Английский",
				link: "/html/with_css/test-35.html",
				dificult: "green",
			},
			{
				id: "wo36",
				name: "Переводчики онлайн",
				link: "/html/with_css/test-36.html",
				dificult: "green",
			},
			{
				id: "wo37",
				name: "План занятий",
				link: "/html/with_css/test-37.html",
				dificult: "green",
			},
			{
				id: "wo38",
				name: "Книги на форуме",
				link: "/html/with_css/test-38.html",
				dificult: "green",
			},
			{
				id: "wo39",
				name: "Акценты",
				link: "/html/with_css/test-39.html",
				dificult: "green",
			},
			{
				id: "wo40",
				name: "",
				link: "/html/with_css/test-40.html",
				dificult: "green",
			},
			{
				id: "wo41",
				name: "",
				link: "/html/with_css/test-41.html",
				dificult: "green",
			},

		],


		isShowFooter: 0,
		isShowLabel: 1,
		arrow: ["&uArr;", "&dArr;"],

	},

		methods: {

			showCard: function(id, list) {
				list = list.map(card => {
					if(card.id === id){ this.resetDeg(); card.isShow = !card.isShow; }
					else { card.isShow = false;}
					return card;
				});
			},

			rotate: function() {
				var front = document.querySelector(".front"),
					decision = document.querySelector(".decision");

				this.degF += 180;
				this.degD += 180;

				front.style.transform = 'rotateY(' + this.degF + 'deg)';
				decision.style.transform = 'rotateY(' + this.degD + 'deg)';
			},

			resetDeg: function(){
				this.degF = 0;
				this.degD = 180;
			},

		}
});

/*************************************************
ВЫВОДИТ ВСПЛЫВАЮЩЕЕ ОКНО ПОВЕРХ СТРАНИЦЫ
В ПЕРЕМЕННУЮ ПОДАЕТСЯ ID ЭЛЕМЕНТА ОКНА
**************************************************/

function togglePop_up(elem){
	event.preventDefault();
	var el = document.getElementById(elem);
	el.classList.toggle("close-pop_up");
}



/*************************************************
ФУНКЦИЯ МЕДИА-ЗАПРОСА(min-width: 1150px)
ОТСЛЕЖИВАЕТСЯ И ИЗМЕНЯЕТСЯ ТОЛЬКО ПРИ ИЗМЕНЕНИИ ПАРАМЕТРОВ
**************************************************/

const mediaQueryMax = window.matchMedia('screen and (min-width: 1150px)');
function handleTabletMaxChange(e) {
	if (e.matches) {
		Vue.isShowNav = 1;
		Vue.isShowFooter = 0;
		Vue.isShowLabel = 1;
	}
};
handleTabletMaxChange(mediaQueryMax);
mediaQueryMax.addListener(handleTabletMaxChange);

/*************************************************
ФУНКЦИЯ МЕДИА-ЗАПРОСА(max-width: 1150px)
**************************************************/

const mediaQuery = window.matchMedia('screen and (max-width: 1150px)');
function handleTabletChange(e) {
	if (e.matches) {
		Vue.isShowNav = 0;
		Vue.isShowFooter = 1;
		Vue.isShowLabel = 0;
	}
};
handleTabletChange(mediaQuery);
mediaQuery.addListener(handleTabletChange);


/*************************************************
ФУНКЦИЯ МЕДИА-ЗАПРОСА(max-width: 750px)
**************************************************/

const mediaQueryMin = window.matchMedia('screen and (max-width: 750px)');
function handleTabletMinChange(e) {
	if (e.matches) {
		Vue.isShowNav = 1;
		Vue.isShowFooter = 1;
		Vue.isShowLabel = 0;
	}
};

handleTabletMinChange(mediaQueryMin);
mediaQueryMin.addListener(handleTabletMinChange);


/*************************************************
ФУНКЦИЯ НАБЛЮДЕНИЯ ЗА DOM В MAIN
**************************************************/

let observer = new MutationObserver(mutationRecords => {
	  //console.log(mutationRecords); // console.log(изменения)
	includeHTML();
});

// наблюдать за всем, кроме атрибутов
observer.observe(main, {
  childList: true, // наблюдать за непосредственными детьми
  subtree: true, // и более глубокими потомками
  characterDataOldValue: true // передавать старое значение в колбэк
});


/*************************************************
ФУНКЦИЯ ПОДКЛЮЧЕНИЯ ДОП. СТРАНИЦ HTML
**************************************************/
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
	elmnt = z[i];
	/*search for elements with a certain atrribute:*/
	file = elmnt.getAttribute("maskit-include-html");
	if (file) {
	  /*make an HTTP request using the attribute value as the file name:*/
	  xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
		  if (this.status == 200) {elmnt.innerHTML = this.responseText;}
		  if (this.status == 404) {}
		  /*remove the attribute, and call this function once more:*/
		  elmnt.removeAttribute("maskit-include-html");
		  includeHTML();
		}
	  }
	  xhttp.open("GET", file, true);
	  xhttp.send();
	  /*exit the function:*/
	  return;
	}
  }
};



