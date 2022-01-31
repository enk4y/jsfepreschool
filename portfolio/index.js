import i18Obj from './assets/js/translate.js';

(function () {
	const iconMenu = document.querySelector('.menu__icon');
	const menu = document.querySelector('.menu');
	const menuLinks = document.querySelectorAll('.menu__link');

	iconMenu.addEventListener('click', () => {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menu.classList.toggle('_active');
		menu.classList.toggle('menu-open');
	});

	for (let i = 0; i < menuLinks.length; i++) {
		menuLinks[i].addEventListener('click', () => {
			iconMenu.classList.remove('_active');
			document.body.classList.remove('_lock');
			menu.classList.remove('_active');
			menu.classList.remove('menu-open');
		});
	}
})();

/*========= Change images ==========*/
const portfolioButtonsContainer = document.querySelector('.portfolio__buttons');
const portfolioImages = document.querySelectorAll('.portfolio__img');
const portfolioButtons = document.querySelectorAll('.portfolio__button');
const selectButtons = document.querySelectorAll('.select');

portfolioButtonsContainer.addEventListener('click', changeImage);

function changeImage(event) {
	if (event.target.classList.contains('portfolio__button')) {
		removeActiveStyles('button_colored', portfolioButtons);
		event.target.classList.add('button_colored');
		portfolioImages.forEach((image, index) => {
			image.src = `assets/img/${event.target.dataset.season}/${index + 1}.jpg`;
		});
	}
}

/*========= Preload images ==========*/
const seasons = ['winter', 'spring', 'summer', 'autumn'];

preloadImages();

function preloadImages() {
	for (let i = 1; i <= 6; i++) {
		seasons.forEach((value) => {
			const img = new Image();
			img.src = `./assets/img/${value}/${i}.jpg`;
		});
	}
}

/*========= Change languages ==========*/
const headerButtons = document.querySelector('.header__buttons');
const changeLangButtons = document.querySelectorAll('.select');
const selectedLanguage = localStorage.getItem('language');

if (selectedLanguage) {
	console.log(changeLangButtons);
	changeLangButtons.forEach((button) => {
		button.dataset.lang === selectedLanguage
			? button.classList.add('select_colored')
			: button.classList.remove('select_colored');
	});

	getTranslate(selectedLanguage);
}

headerButtons.addEventListener('click', changeLanguage);

function changeLanguage(event) {
	if (event.target.classList.contains('select')) {
		removeActiveStyles('select_colored', selectButtons);
		event.target.classList.add('select_colored');
		getTranslate(event.target.dataset.lang);
		localStorage.setItem('language', event.target.dataset.lang);
	}
}

function getTranslate(lang) {
	const textElementsArray = document.querySelectorAll('[data-i18]');
	textElementsArray.forEach((element) => {
		if (element.placeholder) {
			element.placeholder = i18Obj[lang][element.dataset.i18];
			element.textContent = '';
		} else if (element.dataset.i18 != i18Obj[lang][element.dataset.i18]) {
			element.textContent = i18Obj[lang][element.dataset.i18];
		}
	});
}

console.log(
	'Score: 85 / 85\n' +
		'- Вёрстка соответствует макету. Ширина экрана 768px (48)\n' +
		'- [x] блок header (6)\n' +
		'- [x] секция hero (6)\n' +
		'- [x] секция skills (6)\n' +
		'- [x] секция portfolio (6)\n' +
		'- [x] секция video (6)\n' +
		'- [x] секция price (6)\n' +
		'- [x] секция contacts (6)\n' +
		'- [x] блок footer (6)\n' +
		'Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки (15)\n' +
		'- [x] нет полосы прокрутки при ширине страницы от 1440рх до 768рх (5)\n' +
		'- [x] нет полосы прокрутки при ширине страницы от 768рх до 480рх (5)\n' +
		'- [x] нет полосы прокрутки при ширине страницы от 480рх до 320рх (5)\n' +
		'На ширине экрана 768рх и меньше реализовано адаптивное меню (22)\n' +
		'- [x] при ширине страницы 768рх панель навигации скрывается, появляется бургер-иконка (2)\n' +
		'- [x] при нажатии на бургер-иконку справа плавно появляется адаптивное меню, бургер-иконка изменяется на крестик (4)\n' +
		'- [x] высота адаптивного меню занимает всю высоту экрана. При ширине экрана 768-620рх вёрстка меню соответствует макету, когда экран становится уже, меню занимает всю ширину экрана (4)\n' +
		'- [x] при нажатии на крестик адаптивное меню плавно скрывается уезжая за правую часть экрана, крестик превращается в бургер-иконку (4)\n' +
		'- [x] бургер-иконка, которая при клике превращается в крестик, создана при помощи css-анимаций без использования изображений (2)\n' +
		'- [x] ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям (2)\n' +
		'- [x] при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, крестик превращается в бургер-иконку (4)'
);
