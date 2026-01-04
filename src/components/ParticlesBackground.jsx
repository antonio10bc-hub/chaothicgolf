import { useEffect, useState, useCallback } from 'react';
import Particles from '@tsparticles/react';
import { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export default function ParticlesBackground() {
	const [init, setInit] = useState(false);
	const [container, setContainer] = useState(null);

	useEffect(() => {
		initParticlesEngine(async (engine) => {
			await loadSlim(engine);
		}).then(() => {
			setInit(true);
		});
	}, []);

	const particlesLoaded = useCallback(async (container) => {
		setContainer(container);
	}, []);

	useEffect(() => {
		const handleChaos = () => {
			console.log("%c 👂 FONDO: Evento recibido", "background: yellow; color: black; padding: 2px 5px; font-weight: bold;");
			
			let targetContainer = container;
			
			// Lógica de respaldo: si el estado container es null, busca la instancia global
			if (!targetContainer && window.tsParticles) {
				console.log("%c 🔍 FONDO: Buscando contenedor global...", "background: orange; color: white; padding: 2px 5px; font-weight: bold;");
				try {
					targetContainer = window.tsParticles.domItem(0);
					if (targetContainer) {
						console.log("%c ✅ FONDO: Contenedor encontrado globalmente", "background: green; color: white; padding: 2px 5px; font-weight: bold;");
					}
				} catch (error) {
					console.error("%c ⚠️ FONDO: Error al buscar contenedor global", "background: orange; color: white; padding: 2px 5px; font-weight: bold;", error);
				}
			}
			
			if (targetContainer) {
				try {
					console.log("%c 💥 FONDO: Añadiendo partícula", "background: green; color: white; padding: 2px 5px; font-weight: bold;");
					targetContainer.particles.push(1);
				} catch (error) {
					console.error("%c ❌ ERROR CRÍTICO: No se pudo añadir partícula", "background: red; color: white; padding: 2px 5px; font-weight: bold;", error);
				}
			} else {
				console.error("%c ❌ ERROR CRÍTICO: No se encontró el contenedor de partículas", "background: red; color: white; padding: 2px 5px; font-weight: bold;");
			}
		};

		window.addEventListener('add-chaos', handleChaos);
		return () => {
			window.removeEventListener('add-chaos', handleChaos);
		};
	}, [container]);

	if (!init) {
		return null;
	}

	return (
		<div className="fixed inset-0 pointer-events-none z-0 mix-blend-multiply">
			<Particles
				id="tsparticles"
				loaded={particlesLoaded}
				options={{
					fullScreen: {
						enable: false,
					},
					background: {
						color: 'transparent',
					},
					particles: {
						number: {
							value: 0,
							density: {
								enable: true,
								height: 800,
								width: 800,
							},
						},
						shape: {
							type: 'image',
							options: {
								image: {
									src: '/images/imagenfondo.png',
									width: 100,
									height: 100,
								},
							},
						},
						opacity: {
							value: 1,
						},
						size: {
							value: {
								min: 25,
								max: 45,
							},
						},
						rotate: {
							value: {
								min: 0,
								max: 360,
							},
							animation: {
								enable: true,
								speed: 3,
								sync: false,
							},
							direction: 'random',
						},
						move: {
							enable: true,
							speed: 3,
							direction: 'none',
							random: false,
							straight: false,
							outModes: 'out',
						},
					},
					interactivity: {
						events: {
							onHover: {
								enable: true,
								mode: 'repulse',
							},
						},
						modes: {
							repulse: {
								distance: 150,
								duration: 0.4,
							},
						},
					},
				}}
			/>
		</div>
	);
}
