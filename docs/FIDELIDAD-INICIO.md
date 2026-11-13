# Corrección visual de Inicio

Estado: corrección visual completada y verificada antes de solicitar publicación. La publicación requiere autorización explícita; el propietario la autorizó posteriormente.

## Capturas reales

Se generaron desde la compilación de producción, servida bajo `/ipey/` con Chromium del sistema.

- [Escritorio, viewport exacto 1440 × 1000](capturas/inicio-escritorio-1440x1000.png).
- [Escritorio, página completa](capturas/inicio.png).
- [Móvil, viewport exacto 390 × 844](capturas/inicio-movil-390x844.png).
- [Móvil, página completa](capturas/inicio-movil.png).
- [Resultado a 1672 × 941 para comparar con la referencia](capturas/inicio-comparacion.png).

## Comparación con la referencia

La comparación fue visual y manual, abriendo las capturas reales; no es una puntuación automática ni una afirmación de equivalencia píxel a píxel con la imagen adjunta. Se realizó una captura adicional al mismo tamaño que la referencia.

| Elemento | Referencia | Resultado y corrección |
| --- | --- | --- |
| Contenedor | Márgenes de unos 73 px a 1672 px | Márgenes de unos 74 px, ancho 1525 px |
| Hero | Texto a la izquierda y seis plataformas superpuestas a la derecha | Columnas 38/62; perspectiva, superposición, alturas escalonadas y recortes individuales. Altura de 294 px a 1440 y 298 px a 1672 |
| Jerarquía | Título en dos líneas, acento azul, dos acciones | Título y descripción solicitados; acciones reales a Streaming y Juegos |
| Recursos | Portadas detalladas con logotipos | Nuevas escenas originales de cine, fantasía, anime, música y aventura; se sustituyen los fondos SVG genéricos únicamente en Inicio |
| Plataformas | Cinco tarjetas en una sola fila de escritorio | Cinco tarjetas uniformes, alrededor de 292 × 177 px a 1672; portada de 290 × 102 px, aproximadamente 58 % de la altura |
| Franja | Cuatro iconos, textos alineados, separadores | Se conservan los mensajes verificados, con columnas y separadores discretos; no se copian promesas de pago o entrega |
| Free Fire | Escena con presencia de un personaje, texto a la derecha, flecha al extremo | Escena original de aventura con un explorador; imagen izquierda, texto real del catálogo y acceso a los paquetes existentes |
| Móvil | No hay una versión móvil de la referencia adjunta | Reorganización propia: hero con tres plataformas por fila, información en dos columnas y tarjetas legibles en dos columnas |

Durante las iteraciones se corrigieron el espacio vacío de las tarjetas, la escala insuficiente de Disney+ y HBO Max, el exceso de altura del hero, el desplazamiento de las plataformas hacia la derecha y una fuga del atlas en el recorte de la ilustración de tableta. También se verificaron las rutas de imágenes en la compilación bajo `/ipey/`.

## Diferencias visuales conservadas

- La navegación de la referencia no se reproduce: se mantiene exactamente la existente. En escritorio ocupa 100 px, frente a unos 65 px de la imagen. Por eso el contenido completo queda más abajo en el viewport comparativo.
- Las escenas de fantasía, anime y aventura son originales generadas para este proyecto, no imágenes oficiales ni copias de sus personajes. Se conserva la composición, no la ilustración exacta del ejemplo.
- HBO Max conserva su logotipo apilado. Crunchyroll combina su símbolo real con el nombre en texto neutral. Free Fire utiliza un título tipográfico; no se simula su wordmark oficial. Inicio ya no utiliza el icono PNG de Free Fire de licencia no confirmada.
- No se añadieron flechas ni puntos de carrusel: el hero es una composición estática, sin controles ficticios.
- Los estados de precio, los textos de proceso y la descripción son los del proyecto; no se sustituyeron por afirmaciones comerciales sin verificar.
- No se realizaron pruebas en teléfonos físicos: las comprobaciones móviles son de Chromium con distintos tamaños de viewport.

## Recursos y alcance

El atlas WebP mide 2172 × 724 y ocupa 164.218 bytes. Se solicita una sola URL local para sus seis escenas. No se incorpora la referencia completa como fondo. Los logotipos siguen siendo imágenes independientes. Su procedencia y las licencias de las colecciones están en [LOGOTIPOS.md](LOGOTIPOS.md) y [el documento del atlas](../public/art/home/README.md).

Archivos modificados:

- `src/HomeDashboard.tsx`: presentación y tarjetas exclusivas de Inicio, wordmarks y escena de aventura.
- `src/home.css`: composición, proporciones, tipografía, recortes y responsive de Inicio.
- `e2e/store.spec.ts`: verificación de la nueva ilustración y de los cinco logotipos de streaming.
- `scripts/capture.mjs`: añade detección de respuestas HTTP fallidas al generar capturas.
- `docs/capturas/inicio.png` e `inicio-movil.png`: capturas completas actualizadas.
- `README.md` y `docs/LOGOTIPOS.md`: documentación actualizada.

Archivos añadidos:

- `public/art/home/editorial-atlas.webp` y `public/art/home/README.md`.
- `public/logos/home/netflix.svg`, `spotify.svg` y `LICENSE-logos.txt`.
- `docs/capturas/inicio-escritorio-1440x1000.png`, `inicio-movil-390x844.png` e `inicio-comparacion.png`.
- Este informe.

No cambian `src/main.tsx`, `src/style.css`, `src/ProductCard.tsx`, `src/ProductIdentity.tsx`, `src/catalog.ts` ni `src/commerce.ts`.

## Validación

- `npm run build`: TypeScript y Vite correctos.
- `npm test`: 6 pruebas comerciales aprobadas.
- `npm run test:e2e`: 10 pruebas aprobadas entre escritorio y móvil: rutas, productos, planes, filtros, búsqueda, menú, validación del ID, resumen y enlace de WhatsApp. No se enviaron mensajes.
- `npm run screenshots`: las seis capturas de páginas se generan con imágenes cargadas, sin errores JavaScript, respuestas HTTP fallidas ni desbordamiento horizontal.
- Viewports adicionales: 320, 390, 768, 1024, 1440 y 1672 px, sin desbordamiento ni errores de carga.
- Comparación de capturas anteriores y posteriores: barra idéntica en cinco anchos; contenido del buscador y menú móvil idéntico. Se excluyó de la comparación del cuadro modal el fondo de Inicio que debe cambiar.
- Streaming y Juegos: contenido visual idéntico en escritorio y móvil, comparando los píxeles debajo del encabezado. Se excluyeron del análisis los estados transitorios de hover del buscador.
- Verificación de archivos protegidos contra el commit inicial de esta tarea: idénticos, incluyendo catálogo y lógica comercial.
- `git diff --check`: sin errores.
