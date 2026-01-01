import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const cards = [
	{
		id: 1,
		name: 'El Driver Maldito',
		description: 'Un palo que desafía las leyes de la física',
		bgColor: 'bg-white',
	},
	{
		id: 2,
		name: 'Hoyo Negro',
		description: 'Absorbe todo lo que se acerca demasiado',
		bgColor: 'bg-neogreen',
	},
	{
		id: 3,
		name: 'Viento del Caos',
		description: 'Cambia la dirección del juego en un instante',
		bgColor: 'bg-white',
	},
];

export default function CardShowcase() {
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

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full">
				{cards.map((card, index) => (
					<Card key={card.id} card={card} index={index} />
				))}
			</div>
		</section>
	);
}

function Card({ card, index }) {
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
			transition={{ duration: 0.6, delay: index * 0.1 }}
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
				className="relative cursor-pointer"
				style={{
					transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
					transformStyle: 'preserve-3d',
					transition: 'transform 0.1s ease-out',
				}}
			>
				{/* Carta */}
				<div className={`relative ${card.bgColor} border-2 border-neodark p-6 h-[500px] flex flex-col`}>
					{/* Placeholder de imagen */}
					<div className="w-full h-64 border-2 border-neodark mb-4 bg-neodark flex items-center justify-center">
						<div className="text-neobase text-6xl font-bold">
							{card.name.charAt(0)}
						</div>
					</div>

					{/* Contenido de la carta */}
					<div className="flex-1 flex flex-col">
						<h3 className="text-2xl font-bold text-neodark mb-2">{card.name}</h3>
						<p className="text-neodark text-sm leading-relaxed">{card.description}</p>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
