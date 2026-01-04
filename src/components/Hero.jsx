import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Hero() {
	const [isBumped, setIsBumped] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setIsBumped(true);
			setTimeout(() => {
				setIsBumped(false);
			}, 200);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	const handleClick = () => {
		console.log("%c 🔘 HERO: Click detectado...", "background: blue; color: white; padding: 2px 5px; font-weight: bold;");
		window.dispatchEvent(new Event('add-chaos'));
		console.log("%c 📡 HERO: Señal enviada.", "background: blue; color: white; padding: 2px 5px; font-weight: bold;");
		
		setIsBumped(true);
		setTimeout(() => {
			setIsBumped(false);
		}, 200);
	};

	return (
		<section className="flex flex-col items-center justify-center text-center py-32 px-4">
			<div 
				className="relative group cursor-pointer mb-6 inline-block z-50"
				onClick={handleClick}
			>
				<motion.img
					src="/images/headericon.png"
					alt="Chaothic Golf"
					initial={{ opacity: 0, y: 50 }}
					animate={{ 
						opacity: 1, 
						y: 0,
						x: isBumped ? 4 : 0,
					}}
					style={{
						transform: isBumped ? 'translate(4px, 4px)' : 'translate(0, 0)',
					}}
					transition={{ 
						duration: 0.8, 
						ease: "easeOut",
						x: { duration: 0.1 },
					}}
					className={`w-32 h-32 border-2 border-neodark mb-6 mx-auto transition-all hover:scale-105 ${
						isBumped 
							? 'drop-shadow-none' 
							: 'drop-shadow-[4px_4px_0px_#2D2E2D]'
					}`}
				/>
			</div>

			<motion.h1
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
				className="text-6xl md:text-8xl font-bold text-neodark mb-6"
			>
				Chaothic Golf
			</motion.h1>

			<motion.p
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
				className="text-sm text-neodark mb-8 max-w-2xl mx-auto"
			>
				Un juego de mesa donde el caos y la estrategia se encuentran en cada golpe
			</motion.p>

			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
			>
				<a
					href="/reglas"
					className="inline-block px-8 py-3 bg-neoaccent border-2 border-neodark font-bold transition-all hover:shadow-neo hover:-translate-y-1"
				>
					Descubrir Reglas
				</a>
			</motion.div>
		</section>
	);
}
