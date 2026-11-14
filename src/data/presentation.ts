import type {CSSProperties} from 'react';

export const artworkStyle=Object.fromEntries(['netflix','disney','max','crunchyroll','spotify','free-fire'].map(id=>[`--art-${id}`,`url("${new URL(`${import.meta.env.BASE_URL}art/services/${id}.webp`,document.baseURI).href}")`])) as CSSProperties;

export const questions=[
 ['¿Cómo solicito un servicio?','Elige un producto y una opción con precio y disponibilidad confirmados. Revisa el resumen y continúa a WhatsApp para consultar y acordar la contratación.'],
 ['¿Por qué aparecen precios por definir?','El catálogo está en preparación. Los precios y modalidades comerciales deben configurarse antes de habilitar solicitudes.'],
 ['¿Necesito compartir mi contraseña para una recarga?','No. Solo se solicita el ID de jugador. Nunca compartas contraseñas ni códigos de verificación.'],
 ['¿La tienda es un distribuidor oficial?','Somos un comercio independiente. No afirmamos afiliación oficial con las plataformas; cada oferta debe cumplir sus condiciones y autorizaciones.'],
] as const;
