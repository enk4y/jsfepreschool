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

/*========= Change languages ==========*/
const headerButtons = document.querySelector('.header__buttons');
const changeLangButtons = document.querySelectorAll('.select');
const selectedLanguage = localStorage.getItem('language');

if (selectedLanguage) {
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

/*========= Change theme ==========*/
const changeThemeButton = document.querySelector('.change-theme');
const changeThemeIcon = document.querySelector('.change-theme__link');
const lightTheme = 'light-theme';
const iconTheme = 'moon';

const selectedTheme = localStorage.getItem('theme');
const selectedIcon = localStorage.getItem('themeIcon');

const getCurrentTheme = () => {
	return document.body.classList.contains(lightTheme)
		? 'light-theme'
		: 'dark-theme';
};

const getCurrentIcon = () => {
	return changeThemeIcon.classList.contains(iconTheme) ? 'moon' : 'sun';
};

if (selectedTheme) {
	document.body.classList[selectedTheme === 'light-theme' ? 'add' : 'remove'](
		lightTheme
	);
	if (document.body.classList.contains(lightTheme)) {
		changeImagesTheme('.hero__container', 'header-bg-light');
		changeImagesTheme('.header__container', 'header-bg-light');
		changeImagesTheme('.contacts__container', 'contacts-bg-light');
	}

	changeThemeIcon.classList[selectedIcon === 'moon' ? 'add' : 'remove'](
		selectedIcon
	);
	if (changeThemeIcon.classList.contains('moon')) {
		changeThemeIcon.setAttribute('xlink:href', 'assets/svg/sprite.svg#moon');
	}
}

changeThemeButton.addEventListener('click', changeTheme);

function changeTheme(event) {
	document.body.classList.toggle(lightTheme);
	changeThemeIcon.classList.toggle(iconTheme);

	if (document.body.classList.contains(lightTheme)) {
		changeImagesTheme('.hero__container', 'header-bg-light');
		changeImagesTheme('.header__container', 'header-bg-light');
		changeImagesTheme('.contacts__container', 'contacts-bg-light');
	} else {
		changeImagesTheme('.hero__container', 'header-bg');
		changeImagesTheme('.header__container', 'header-bg');
		changeImagesTheme('.contacts__container', 'contacts-bg');
	}

	if (changeThemeIcon.classList.contains('moon')) {
		changeThemeIcon.setAttribute('xlink:href', 'assets/svg/sprite.svg#moon');
	} else {
		changeThemeIcon.setAttribute('xlink:href', 'assets/svg/sprite.svg#sun');
	}

	localStorage.setItem('theme', getCurrentTheme());
	localStorage.setItem('themeIcon', getCurrentIcon());
}

function changeImagesTheme(container, img) {
	document.body.querySelector(
		container
	).style.backgroundImage = `url(assets/img/${img}.jpg)`;
}

/*========= Scroll reveal animation ==========*/
const sr = ScrollReveal({
	origin: 'top',
	distance: '60px',
	duration: 2500,
	delay: 400,
});

sr.reveal(' .contacts__content, .footer__social', { origin: 'right' });
sr.reveal(' .hero__content, .footer__text', { origin: 'left' });
sr.reveal('.skills__column, .price__column', { interval: 100 });
sr.reveal('.portfolio__buttons', { origin: 'right', distance: '100px' });
sr.reveal('.portfolio__img', { origin: 'left', distance: '100px' });
sr.reveal('.video__body', { scale: 0.8 });

/*========= Reusable methods ==========*/
function removeActiveStyles(active, buttons) {
	buttons.forEach((button) => {
		if (button.classList.contains(active)) {
			button.classList.remove(active);
		}
	});
}

console.log(
	'Score: 75 / 75 \n' +
		'- Смена изображений в секции portfolio (25)\n' +
		'- [x] при кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием (20)\n' +
		'- [x] кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными (5)\n' +
		'- Перевод страницы на два языка (25)\n' +
		'- [x] при клике по надписи ru англоязычная страница переводится на русский язык (10)\n' +
		'- [x] при клике по надписи en русскоязычная страница переводится на английский язык (10)\n' +
		'- [x] надписи en или ru, соответствующие текущему языку страницы, становятся активными т.е. выделяются стилем (5)\n' +
		'- Переключение светлой и тёмной темы (25)\n' +
		'- [x] тёмная тема приложения сменяется светлой (10)\n' +
		'- [x] светлая тема приложения сменяется тёмной (10)\n' +
		'- [x] после смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и клике и при этом остаются видимыми на странице (нет ситуации с белым шрифтом на белом фоне) (5)\n' +
		'- Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы (5)\n' +
		'- Дополнительный функционал: сложные эффекты для кнопок при наведении и/или клике (5)'
);
