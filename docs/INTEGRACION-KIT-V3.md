# Integración del sistema visual Ipey v3

Rama de revisión: `review/visual-kit-v3`, basada en `1c0213b`. No se modificó `main` ni se solicitó un despliegue.

## Recursos y sistema visual

Se revisaron el manifiesto, los tokens CSS/JSON, las dos referencias, las guías visuales y el archivo de logotipos. El contenido original del paquete se conserva en [visual-kit-v3](visual-kit-v3/README.md). Las indicaciones de sus documentos se trataron como guía del material, subordinada al encargo y a las decisiones del propietario.

Los once fondos WebP se copiaron sin modificar a `public/visual/assets/`: seis portadas, un banner panorámico de Free Fire, dos fondos auxiliares y dos categorías. Suman 199 756 bytes. Sus [hashes y tamaños](capturas/kit-v3/recursos.json) permiten comprobar que corresponden a los archivos del ZIP.

`src/styles/kit-tokens.css` es una copia íntegra del CSS del kit y se carga antes de los estilos de la aplicación. `tokens.css` resuelve los nombres del sistema existente hacia esas variables, sin mantener una segunda paleta. Se usan los negros y superficies del kit, azul `#2563EB`, interacción `#3B82F6`, texto `#F8FAFC`, secundario `#94A3B8`, bordes `#2B3645` y WhatsApp `#10B981`. Los enlaces azules pequeños usan el tono de interacción para mejorar su lectura sobre los fondos oscuros.

Inter se carga desde un WOFF2 local de 48 256 bytes, con su licencia OFL incluida. Así se usa Inter realmente, en lugar de depender de la fuente alternativa del sistema. Se mantienen Lucide, los pesos 400/500/600/700, los radios y la escala de espacios del kit. No se añaden dependencias de la aplicación ni fuentes externas en tiempo de ejecución.

## Composición por capas

Cada portada tiene nodos distintos para:

1. `ArtworkBackground`: `<img class="visual-background">`, archivo WebP y `object-fit: cover`.
2. `<span class="visual-shade">`: contraste CSS, independiente y sin interacción.
3. `ServiceIdentity` / `ProductIdentity`: SVG o PNG sobrepuesto, `object-fit: contain`, medidas y posición propias.
4. Nombre, modalidades, precio/estado, enlaces y botones: HTML real, fuera del archivo gráfico.

Las imágenes de las propuestas, `Guia_Visual_Ipey.png` y `Detalle_Capas.png` no se cargan en la aplicación. No hay capturas aplanadas simulando tarjetas ni fondos con logos incorporados.

El hero de escritorio conserva seis paneles inclinados continuos. El móvil conserva seis tarjetas en una cuadrícula 2 × 3. Las cinco tarjetas comparten los mismos fondos y logos entre ambas vistas; Spotify mantiene su presentación horizontal móvil. El banner usa `free-fire-banner.webp`, no una ampliación de la portada del producto. Las categorías y el fondo del hero usan sus recursos específicos del kit. Los recortes anteriores y el dibujo provisional de categorías se retiraron tras comprobar que ya no se utilizaban.

### Logotipos y decisión sobre Free Fire

| Servicio | Recurso reutilizado |
| --- | --- |
| Netflix | `public/logos/home/netflix.svg` en portadas y hero de escritorio; `public/logos/netflix.svg` para la N del hero móvil y el detalle |
| Disney+ | `public/logos/disney-plus.svg` |
| HBO Max | `public/logos/hbo-max.svg` |
| Crunchyroll | `public/logos/crunchyroll.svg`, símbolo original; se retira el texto CSS que lo acompañaba |
| Spotify | `public/logos/home/spotify.svg` en portadas y heros; símbolo existente en el detalle |
| Free Fire | `public/logos/free-fire.png`, icono existente elegido por el propietario como imagen independiente |

El PNG de Free Fire es casi opaco y representa el icono de la aplicación; no es un wordmark transparente. El propietario eligió expresamente «Usar el icono existente como imagen independiente». Se conserva sin transformarlo ni simular el logotipo con texto. Se ajustaron sus límites en los paneles para que el icono completo quede visible. Su descarga, de 501 151 bytes, se comparte por URL entre las instancias. Los demás archivos de logos también se reutilizan sin duplicarlos.

Si falla un archivo de logo, permanece la alternativa accesible con el nombre neutral del producto. No se utiliza texto estilizado para imitar un wordmark.

## Capturas y comparación con las referencias

Capturas completas de producción bajo `/ipey/`, con los datos reales del catálogo. Los tamaños indicados son los de la ventana; la captura incluye toda la página.

| Vista | Captura |
| --- | --- |
| Escritorio, 1440 × 900 | [Inicio](capturas/kit-v3/inicio-1440x900.png) |
| Móvil, 390 × 844 | [Inicio](capturas/kit-v3/inicio-390x844.png) |
| Comparación de escritorio | [Referencia y captura a la misma anchura](capturas/kit-v3/comparacion-escritorio.png) |
| Comparación de composición móvil | [Referencia y captura a 887 px de anchura](capturas/kit-v3/comparacion-movil.png) |
| Streaming | [Escritorio](capturas/kit-v3/streaming-1440.png) · [Móvil](capturas/kit-v3/streaming-390.png) |
| Juegos | [Escritorio](capturas/kit-v3/juegos-1440.png) · [Móvil](capturas/kit-v3/juegos-390.png) |
| Netflix | [Escritorio](capturas/kit-v3/netflix-1440.png) · [Móvil](capturas/kit-v3/netflix-390.png) |
| Free Fire | [Escritorio](capturas/kit-v3/free-fire-1440.png) · [Móvil](capturas/kit-v3/free-fire-390.png) |

También se comprobaron y capturaron 320, 360, 430, 768, 820, 887, 1024, 1280, 1672 y 1920 px. Hay 30 capturas de páginas y dos imágenes de comparación. Las [métricas](capturas/kit-v3/verificacion.json) registran dimensiones, seis paneles, seis productos, altura del documento y errores. A 320/360 px el grupo 2 × 3 queda debajo del texto para conservar la legibilidad, como ya permitía la plantilla aprobada.

Se abrieron las capturas para compararlas directamente con las referencias del ZIP. Las composiciones se conservan; las diferencias restantes se documentan sin afirmar igualdad píxel a píxel:

- La paleta vigente es la del kit; las referencias contienen acentos cian más brillantes.
- Los fondos del kit son reconstrucciones, no los archivos fuente de las propuestas. Se comparte un fondo por servicio, aunque las referencias muestran personajes distintos según la vista.
- HBO Max utiliza el SVG apilado disponible; Crunchyroll su símbolo, sin fabricar un wordmark. Free Fire usa el icono elegido.
- Las categorías utilizan los WebP del kit, aunque las referencias muestran otros objetos decorativos.
- Se mantienen los precios y disponibilidad pendientes, contacto real y textos informativos verificables. No se copian cuentas, redes sociales, garantías o precios ilustrativos de los mockups.
- El footer conserva las atribuciones y las condiciones de la tienda, lo que puede aumentar la altura completa.

## Pruebas

| Verificación | Resultado |
| --- | --- |
| `npm run build` | TypeScript y compilación correctos |
| `npm test` | 6/6 pruebas comerciales aprobadas |
| `npm run test:e2e` | 46/46 pruebas de escritorio, móvil, tablet y composición aprobadas |
| Revisión visual posterior | 13/13 pruebas del proyecto visual aprobadas después de ajustar el icono y los estilos |
| `npm run screenshots` | 30 capturas completas sin errores de carga ni desplazamiento horizontal |
| Fondos y logos | Peticiones y elementos diferentes; seis portadas únicas del manifiesto compartidas por las instancias |
| Tamaño del logo | Cambiar solo ancho/alto del logo no altera el `src`, rectángulo ni `object-fit` del fondo |
| Archivo del logo | Cambiar únicamente su `src` tampoco altera el fondo ni el nombre/acción HTML |
| Tipografía y tokens | Inter cargada y variables verificadas contra el JSON del paquete |
| Datos y reglas | Catálogo, comercio, pruebas comerciales y estado/filtros idénticos byte a byte a `1c0213b` |
| GitHub Pages | Prefijo y recarga de rutas correctos; workflow y archivo de solicitud intactos |

Las solicitudes se prueban con datos ficticios aislados en el navegador. No se habilitan compras ficticias en el catálogo ni se envían mensajes de WhatsApp. Las pruebas de formato de ID, modalidades, filtros, búsquedas, resumen y enlaces se conservan.

## Archivos principales y revisión

El [manifiesto de cambios](ARCHIVOS-KIT-V3.txt) enumera los archivos añadidos, modificados y retirados. La [evidencia de pruebas](capturas/kit-v3/pruebas.json) resume los resultados y la conservación de los datos.

- Recursos: `public/visual/assets/`, `src/data/visualAssets.ts`, `src/styles/kit-tokens.css`, `public/fonts/inter/`.
- Capas: `ArtworkBackground`, `PlatformPanels`, `ServiceCard`, `GamingContent`, `ServiceIdentity`, `ProductIdentity` y `DetailPage`.
- Plantillas: heros de escritorio/móvil, categorías móviles y `StoreLayout`; la arquitectura de presentaciones independientes permanece.
- Estilos: los seis archivos de `src/styles/` reciben los tokens y los controles de capa, sin añadir otra hoja de sobrescrituras.
- QA: `e2e/layer-composition.spec.ts`, helpers, configuración de Playwright y captura; guías originales y pruebas de recursos en `docs/`.
- Retirados: seis recortes obsoletos de `public/art/services/` y `CategoryArtwork.tsx`, sustituidos por el kit. Permanecen recuperables en Git.

Para revisar: cambiar a `review/visual-kit-v3`, ejecutar `npm ci` y `npm run dev`. Para producción local: `npm run build` y `npm run preview -- --port 4173 --base /ipey/`. Con ese preview activo, `npm run screenshots` regenera las capturas; `CAPTURE_DIR` permite otro destino.

La comprobación en dispositivos físicos iPhone/Android sigue pendiente. No se ha publicado esta integración; queda preparada para revisión.
