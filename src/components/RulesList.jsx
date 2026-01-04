import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const rulesData = [
	{
		ids: [27, 28, 29],
		title: "Palos",
		desc: "Al usarlo, la pelota avanza tantas posiciones como el número que indica la carta. Se puede avanzar en 4 direcciones: arriba, abajo, izquierda, derecha. No se puede avanzar en diagonal."
	},
	{
		ids: [17, 18, 19, 20],
		title: "Hoyos",
		desc: "Al usarlo, mueve el hoyo 2 posiciones en la dirección que indica la carta (arriba, abajo, izquierda o derecha)."
	},
	{
		ids: [16],
		title: "El Dedo",
		desc: "Al usarlo puedes mover tu pelota 1, 2 o 3 posiciones, a tu elección, en cualquier dirección (arriba, abajo, izquierda, derecha) y con tantos cambios de dirección como quieras."
	},
	{
		ids: [13],
		title: "El Bunker",
		desc: "Puedes colocarlo en cualquier lugar que no esté ocupado por otra carta. Si una pelota avanza sobre el bunker 'cae dentro', terminando su movimiento. El bunker resta 1 al tiro que uses (solo sales con 2 o 3). El hoyo no puede caer al bunker."
	},
	{
		ids: [14, 15],
		title: "Los Portales",
		desc: "Conectan 2 puntos. Si atraviesas uno, sales por el otro manteniendo dirección. No cuentan como casilla (se salta la posición al contar). Se pueden colocar en cualquier lugar libre."
	},
	{
		ids: [30],
		title: "Palo Naranja",
		desc: "Avanza una posición en cualquier dirección. Puede usarse con tu pelota o la de otros. ¡Se puede usar en tu turno o en el de otros!"
	},
	{
		ids: [21, 22, 23, 24],
		title: "Hoyos Naranjas",
		desc: "Mueve el hoyo una (1) posición en la dirección que indica la carta (arriba, abajo, izquierda o derecha)."
	},
	{
		ids: [25],
		title: "¡NO!",
		desc: "Invalida la anterior carta jugada, incluso si es otro NO. ¡Se puede usar en tu turno o en el de otros!"
	}
];

function RuleGallery({ ids }) {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextImage = () => {
		setCurrentIndex((prev) => (prev + 1) % ids.length);
	};

	const prevImage = () => {
		setCurrentIndex((prev) => (prev - 1 + ids.length) % ids.length);
	};

	// Si solo hay una imagen, renderizar estática
	if (ids.length === 1) {
		return (
			<div className="flex justify-center w-48 sm:w-56 md:w-64">
				<img
					src={`/images/${ids[0]}.png`}
					alt={`Carta ${ids[0]}`}
					className="max-w-full h-auto object-contain border-2 border-neodark"
					style={{ maxHeight: '200px' }}
				/>
			</div>
		);
	}

	// Si hay múltiples imágenes, renderizar galería
	return (
		<div className="relative flex justify-center w-48 sm:w-56 md:w-64">
			<img
				src={`/images/${ids[currentIndex]}.png`}
				alt={`Carta ${ids[currentIndex]}`}
				className="max-w-full h-auto object-contain border-2 border-neodark"
				style={{ maxHeight: '200px' }}
			/>
			
			{/* Botón izquierdo */}
			<button
				onClick={prevImage}
				className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white border-2 border-neodark shadow-neo w-8 h-8 flex items-center justify-center transition-all hover:bg-neoaccent hover:shadow-none"
				aria-label="Imagen anterior"
			>
				<ChevronLeft className="w-5 h-5 text-neodark" />
			</button>

			{/* Botón derecho */}
			<button
				onClick={nextImage}
				className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white border-2 border-neodark shadow-neo w-8 h-8 flex items-center justify-center transition-all hover:bg-neoaccent hover:shadow-none"
				aria-label="Siguiente imagen"
			>
				<ChevronRight className="w-5 h-5 text-neodark" />
			</button>
		</div>
	);
}

export default function RulesList() {
	return (
		<div>
			{rulesData.map((rule, index) => (
				<div
					key={index}
					className="flex flex-col md:flex-row gap-6 border-2 border-neodark bg-white p-6 mb-6 shadow-neo"
				>
					{/* Contenedor de galería */}
					<div className="flex justify-center flex-shrink-0">
						<RuleGallery ids={rule.ids} />
					</div>

					{/* Contenedor de texto */}
					<div className="flex-1">
						<h3 className="text-2xl font-bold text-neodark mb-2">{rule.title}</h3>
						<p className="text-neodark text-lg leading-relaxed">{rule.desc}</p>
					</div>
				</div>
			))}
		</div>
	);
}
