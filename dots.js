const colors = [
	'#14654A', '#2A7154', '#37765B',
	'#50724E', '#57874A', '#568863', '#848b6d'
];

const orbitContainer = document.querySelector('.orbiting-dots');
const initialCount = 256;

function spawnDot() {
	const dot = document.createElement('span');

	const longestEdge = Math.max(window.innerWidth, window.innerHeight) - 16;

	const t = Math.random();
	const eased = Math.pow(t, 1.5);
	const radius = eased * (longestEdge / 2) + 40;

	const speed = Math.random() * 1024 + 60;

	const fadeInDelay = Math.random() * 1.5;
	const startingAngleOffset = Math.random() * -speed;

	const direction = Math.random() < 0.5 ? 1 : -1;

	const color = colors[Math.floor(Math.random() * colors.length)];

	dot.style.setProperty('--radius', `${radius}px`);
	dot.style.setProperty('--direction', direction);
	dot.style.backgroundColor = color;
	dot.style.boxShadow = `0 0 4px ${color}, 0 0 8px ${color}`;
	dot.style.opacity = '0';

	dot.style.animation = `
		orbit ${speed}s linear infinite
	`;
	dot.style.animationDelay = `${startingAngleOffset}s`;
	dot.style.transition = 'opacity 1.2s ease';

	orbitContainer.appendChild(dot);

	setTimeout(() => {
		dot.style.opacity = '1';
	}, fadeInDelay * 1000);

	const lifetime = speed * (Math.random() * 2 + 1);

	setTimeout(() => {
		dot.style.opacity = '0';
		setTimeout(() => {
			dot.remove();
			spawnDot();
		}, 1200);
	}, lifetime * 1000);
}

for (let i = 0; i < initialCount; i++) {
	spawnDot();
}

const desktopHeader = document.querySelector('.desktop-header');
const desktopModal = document.querySelector('.desktop-modal');

desktopHeader.addEventListener('click', () => {
	desktopModal.classList.add('open');
});

desktopModal.addEventListener('click', e => {
	if (e.target === desktopModal) {
		desktopModal.classList.remove('open');
	}
});
