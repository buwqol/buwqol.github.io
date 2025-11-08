const colors = [
	"#14654A", "#2A7154", "#37765B",
	"#50724E", "#57874A", "#568863", "#848b6d"
];

const orbitContainer = document.querySelector(".orbiting-dots");
const initialCount = 100;

function spawnDot() {
	const dot = document.createElement("span");

	// shortest viewport edge (height on desktop, width on phone)
	const shortestEdge = Math.min(window.innerWidth, window.innerHeight);

	// orbit properties
	const radius = Math.random() * (shortestEdge / 2) + 40; // up to half the shortest edge
	const speed = Math.random() * 120 + 60;

	// gives variety to spawn timing + orbit starting location
	const fadeInDelay = Math.random() * 1.5;
	const startingAngleOffset = Math.random() * -speed;

	// random direction (1 = clockwise, -1 = counterclockwise)
	const direction = Math.random() < 0.5 ? 1 : -1;

	// random color
	const color = colors[Math.floor(Math.random() * colors.length)];

	// apply style
	dot.style.setProperty("--radius", `${radius}px`);
	dot.style.setProperty("--direction", direction);
	dot.style.backgroundColor = color;
	dot.style.boxShadow = `0 0 8px ${color}, 0 0 12px ${color}`;
	dot.style.opacity = "0";

	dot.style.animation = `
		orbit ${speed}s linear infinite
	`;
	dot.style.animationDelay = `${startingAngleOffset}s`;
	dot.style.transition = "opacity 1.2s ease";

	orbitContainer.appendChild(dot);

	// fade in after delay
	setTimeout(() => {
		dot.style.opacity = "1";
	}, fadeInDelay * 1000);

	// lifetime 1–3 orbits
	const lifetime = speed * (Math.random() * 2 + 1);

	setTimeout(() => {
		dot.style.opacity = "0";
		setTimeout(() => {
			dot.remove();
			spawnDot();
		}, 1200);
	}, lifetime * 1000);
}

for (let i = 0; i < initialCount; i++) {
	spawnDot();
}