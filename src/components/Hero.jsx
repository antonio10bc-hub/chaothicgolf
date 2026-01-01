import { motion } from 'framer-motion';

export default function Hero() {
	return (
		<section className="flex flex-col items-center justify-center text-center h-screen px-4">
			<motion.h1
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
				className="text-6xl md:text-8xl font-bold text-neodark mb-6"
			>
				Chaothic Golf
			</motion.h1>

			<motion.p
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
				className="text-xl text-neodark mb-8 max-w-2xl mx-auto"
			>
				Un juego de mesa donde el caos y la estrategia se encuentran en cada golpe
			</motion.p>

			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
			>
				<button className="px-8 py-3 bg-neoaccent border-2 border-neodark font-bold transition-all hover:shadow-neo hover:-translate-y-1">
					Descubrir Reglas
				</button>
			</motion.div>
		</section>
	);
}
