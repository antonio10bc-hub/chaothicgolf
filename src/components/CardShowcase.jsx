import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const cardRows = [
	[7, 8, 9, 10, 11, 12], // Fila 1
	[27, 28, 29, 16],      // Fila 2
	[17, 18, 19, 20],      // Fila 3
	[13, 14, 15],          // Fila 4
	[21, 22, 23, 24, 25, 30],// Fila 5
	[1, 2, 3, 4, 5, 6]       // Fila 6
];

export default function CardShowcase() {
	let cardIndex = 0;

	return (
		<section className="py-24 px-4 min-h-screen flex flex-col items-center justify-center">
			<motion.h2
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className="text-4xl md:text-5xl font-bold mb-4 text-neodark text-center"
			>
				Cartas del Juego
			</motion.h2>
			<motion.p
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6, delay: 0.1 }}
				className="text-neodark mb-12 text-center max-w-2xl"
			>
				Descubre las cartas que cambiarán tu estrategia
			</motion.p>

			<div className="w-full max-w-6xl mx-auto">
				{cardRows.map((row, rowIndex) => (
					<div
						key={rowIndex}
						className="flex justify-center flex-wrap gap-4 mb-4"
					>
						{row.map((cardId) => {
							const index = cardIndex++;
							return (
								<Card key={cardId} cardId={cardId} index={index} />
							);
						})}
					</div>
				))}
			</div>
		</section>
	);
}

function Card({ cardId, index }) {
	const [rotateX, setRotateX] = useState(0);
	const [rotateY, setRotateY] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const cardRef = useRef(null);

	const handleMouseMove = (e) => {
		if (!cardRef.current) return;

		const rect = cardRef.current.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const mouseX = e.clientX - centerX;
		const mouseY = e.clientY - centerY;

		const maxRotate = 15;
		const rotateXValue = (mouseY / (rect.height / 2)) * -maxRotate;
		const rotateYValue = (mouseX / (rect.width / 2)) * maxRotate;

		setRotateX(rotateXValue);
		setRotateY(rotateYValue);
	};

	const handleMouseLeave = () => {
		setRotateX(0);
		setRotateY(0);
		setIsHovered(false);
	};

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, delay: index * 0.05 }}
			className="relative"
		>
			{/* Sombra dura naranja detrás de la carta al hover */}
			<div
				className={`absolute -inset-1 bg-neoaccent transition-all duration-200 ${
					isHovered ? 'opacity-100' : 'opacity-0'
				}`}
				style={{
					transform: isHovered ? 'translate(4px, 4px)' : 'translate(0, 0)',
				}}
			/>

			<div
				ref={cardRef}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				onMouseEnter={handleMouseEnter}
				className="relative cursor-pointer w-40 h-56"
				style={{
					transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
					transformStyle: 'preserve-3d',
					transition: 'transform 0.1s ease-out',
				}}
			>
				{/* Carta */}
				<div className="relative bg-white border-2 border-neodark w-full h-full overflow-hidden">
					{/* Imagen real */}
					<img
						src={`/images/${cardId}.png`}
						alt={`Carta ${cardId}`}
						className="object-cover w-full h-full"
					/>
				</div>
			</div>
		</motion.div>
	);
}
