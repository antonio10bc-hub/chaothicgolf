import { useEffect, useState, useCallback } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export default function ParticlesBackground() {
    const [init, setInit] = useState(false);
    const [container, setContainer] = useState(null);

    // 1. Inicialización del motor
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    // 2. Callback para cuando cargan las partículas
    const particlesLoaded = useCallback(async (container) => {
        setContainer(container);
    }, []);

    // 3. Listener del evento de Caos
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

    // CAMBIOS CLAVE AQUÍ:
    // 1. Eliminado el <div> contenedor.
    // 2. Clases 'pointer-events-none' y 'mix-blend-multiply' movidas al componente Particles.
    // 3. fullScreen habilitado en las opciones.
    return (
        <Particles
            id="tsparticles"
            loaded={particlesLoaded}
            className="pointer-events-none mix-blend-multiply" 
            options={{
                fullScreen: {
                    enable: true, // Esto fuerza pantalla completa real (móvil y PC)
                    zIndex: 0     // Asegura que quede al fondo
                },
                background: {
                    color: 'transparent',
                },
                fpsLimit: 120,
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
                detectRetina: true,
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
    );
}