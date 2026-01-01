import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const rules = [
	{
		id: 1,
		title: 'Objetivo',
		icon: '🎯',
		content: 'El objetivo de Chaothic Golf es ser el primer jugador en completar 9 hoyos con la menor cantidad de golpes posibles. Sin embargo, las cartas de caos pueden cambiar las reglas en cualquier momento, haciendo que cada partida sea única e impredecible.',
	},
	{
		id: 2,
		title: 'Preparación',
		icon: '📦',
		content: 'Cada jugador recibe 5 cartas al inicio del juego. El mazo de cartas de caos se coloca en el centro de la mesa. Se determina aleatoriamente el orden de juego. Cada jugador elige su color de ficha y la coloca en el primer hoyo del campo.',
	},
	{
		id: 3,
		title: 'Cómo se Juega',
		icon: '⚡',
		content: 'En tu turno, puedes jugar una carta de caos o realizar un golpe normal. Las cartas de caos pueden alterar la física del juego, cambiar el orden de los turnos, o afectar a otros jugadores. Después de jugar una carta, roba una nueva del mazo. El juego continúa hasta que un jugador complete los 9 hoyos.',
	},
	{
		id: 4,
		title: 'Cartas de Caos',
		icon: '🌀',
		content: 'Las cartas de caos son el corazón del juego. Pueden hacer que la gravedad se invierta, que los hoyos cambien de posición, o que los golpes de otros jugadores se redirijan. Usa tus cartas estratégicamente, pero recuerda: el caos afecta a todos, incluso a ti.',
	},
	{
		id: 5,
		title: 'Fin del Juego',
		icon: '🏆',
		content: 'El juego termina cuando un jugador completa el hoyo 9. Ese jugador es el ganador. Si hay empate, se juega una ronda de muerte súbita donde cada jugador intenta hacer un hoyo en uno. El primero en lograrlo gana.',
	},
];

export default function Rules() {
	const [openIndex, setOpenIndex] = useState(null);

	const toggleRule = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section className="py-24 px-4 bg-neogreen">
			<div className="max-w-4xl mx-auto">
				<motion.h2
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-5xl md:text-6xl font-bold mb-12 text-neobase text-center"
				>
					Reglas del Caos
				</motion.h2>

				<div className="space-y-4">
					{rules.map((rule, index) => (
						<motion.div
							key={rule.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: index * 0.1 }}
							className="bg-white border-2 border-neodark"
						>
							<button
								onClick={() => toggleRule(index)}
								className={`w-full p-6 flex items-center justify-between text-left transition-colors ${
									openIndex === index ? 'text-neoaccent' : 'text-neodark'
								}`}
							>
								<div className="flex items-center gap-4">
									<span className="text-4xl">{rule.icon}</span>
									<h3 className="text-2xl font-bold">{rule.title}</h3>
								</div>
								<span className="text-3xl font-bold">
									{openIndex === index ? '−' : '+'}
								</span>
							</button>

							<AnimatePresence>
								{openIndex === index && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: 'auto', opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.3 }}
										className="overflow-hidden"
									>
										<div className="px-6 pb-6 pt-0 border-t-2 border-neodark">
											<p className="text-neodark leading-relaxed">{rule.content}</p>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

