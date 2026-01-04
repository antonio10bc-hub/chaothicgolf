import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  vite: {
    ssr: {
      // ESTO ES LA MAGIA: Obligamos a procesar estas librerías
      noExternal: ['@tsparticles/react', '@tsparticles/slim'],
    },
    // Añadimos esto por si acaso para mejorar la compatibilidad
    optimizeDeps: {
      include: ['@tsparticles/react', '@tsparticles/slim']
    }
  }
});