# Portadas compartidas de la reconstrucción

Esta sección corresponde a la fase anterior. Los seis recortes WebP se retiraron del árbol público al integrar el kit v3: ya no tenían referencias en la aplicación. Se conservan en Git en la revisión `1c0213b`. Los fondos vigentes están en `public/visual/assets/` y se documentan en `public/visual/README.md`.

Los seis WebP anteriores eran recortes del atlas original del proyecto `../home/editorial-atlas.webp`, no imágenes oficiales de las plataformas. Cada celda original de 724 × 362 px se optimizó a 600 × 300 px con WebP de calidad 85. No se alteró el contenido de las ilustraciones.

Orden de las celdas, de izquierda a derecha y de arriba abajo: Netflix, Disney+, HBO Max, Crunchyroll, Spotify y Free Fire. Escritorio y móvil usan exactamente estos mismos archivos con encuadres CSS distintos. El navegador reutiliza la descarga entre hero, tarjetas, banner y detalle.

Los logotipos se sirven por separado desde `public/logos`; las licencias y fuentes están en `docs/LOGOTIPOS.md`. Free Fire se identifica mediante texto tipográfico sobre el paisaje de aventura original, no mediante el PNG de terceros sin licencia confirmada. Los objetos de las categorías móviles son dibujos vectoriales originales en `src/components/mobile/CategoryArtwork.tsx`.

Los personajes y fotografías de las referencias adjuntas no se copiaron. Se usan el reparto ficticio, castillo, figura enmascarada, aventurero de anime, seda verde y explorador originales ya existentes.
