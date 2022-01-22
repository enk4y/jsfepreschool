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
