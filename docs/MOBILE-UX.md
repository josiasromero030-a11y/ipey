# Adaptación móvil de Ipey

Entrega preparada y verificada localmente el 13 de noviembre de 2026. El propietario autorizó posteriormente su publicación mediante el archivo de solicitud de GitHub Pages. Se conserva «marca», sin símbolo. La adaptación se activa hasta 768 px, inclusive; escritorio conserva su presentación.

## Referencias y límite de investigación

Se intentó abrir las cuatro referencias antes de implementar. La red del entorno bloqueó los accesos con `CONNECT tunnel failed, response 403`; también falló el acceso desde Chromium. Una comprobación final por HTTP reprodujo el bloqueo en las cuatro direcciones. No se pudo estudiar su contenido actual ni verificar sus conclusiones. Este documento no atribuye hallazgos ni cifras a esos sitios.

| Referencia solicitada | Tema que se pretendía revisar | Resultado |
| --- | --- | --- |
| [Instant Gaming](https://www.instant-gaming.com/es/) | Navegación, portadas y descubrimiento gaming | Bloqueada por la red |
| [Eneba](https://www.eneba.com/) | Categorías, búsqueda, filtros y producto | Bloqueada por la red |
| [Baymard: m-commerce usability](https://baymard.com/research/mcommerce-usability) | Navegación y contratación en móvil | Bloqueada por la red |
| [Baymard: mobile UX ecommerce](https://baymard.com/research-articles/mobile-ux-ecommerce) | Controles, variantes y formularios | Bloqueada por la red |

Se guardaron los dominios necesarios en el borrador de configuración del entorno, sin aplicar cambios a la red activa. La investigación externa queda pendiente de habilitar ese acceso. La implementación se basa en los requisitos detallados del encargo, la interfaz existente y principios generales de usabilidad; no constituye una validación empírica de conversión.

## Estructura y decisiones

El catálogo real contiene cinco servicios de streaming y un juego. Para ese tamaño resulta suficiente mostrar dos categorías principales y mantener visibles todos los productos, sin introducir más niveles de navegación.

| Elemento | Estructura móvil anterior | Nueva estructura móvil |
| --- | --- | --- |
| Navegación | Destinos principales dentro del menú | Primera fila de 62 px con marca, búsqueda, contacto y menú; segunda fila de 44 px con Inicio, Streaming y Juegos |
| Menú | Acceso a los destinos principales | Solo contacto, condiciones, privacidad y preguntas frecuentes; los tres destinos no se repiten aquí |
| Hero | Composición gráfica derivada de escritorio y controles de diapositivas | Banner estático de aproximadamente 210–242 px, título de 27–28 px y dos acciones de 44 px |
| Descubrimiento | Información del proceso antes del catálogo | Hero → dos categorías compactas → streaming → Free Fire → cuatro puntos informativos → FAQ |
| Streaming | Acción mediante una flecha | Portada, marca, nombre, modalidades, precio real o pendiente y «Ver planes»; dos columnas con 12 px de separación |
| Última tarjeta | Espacio final sin pareja | Tarjeta horizontal que aprovecha ambas columnas y conserva su acción |
| Free Fire | Composición horizontal y flecha adaptadas de escritorio | Imagen superior, nombre y descripción debajo, «Ver paquetes» de ancho completo |
| Catálogo | Varios controles simultáneos | Búsqueda visible, botón Filtros, selector Ordenar y etiquetas removibles |
| Modalidades | Distribución de escritorio reducida | Tarjetas seleccionables de ancho completo con precio, disponibilidad y características legibles |
| Condiciones | Bloque de texto abierto | Desplegable accesible con el mismo contenido; disponibilidad y precio siguen visibles fuera del desplegable |
| Formulario | Validación existente | Se conserva la validación; ID con teclado numérico, texto de ayuda, error asociado y foco en el campo al fallar |
| Resumen | Diálogo compartido | Diálogo con altura limitada a la ventana, desplazamiento interno y acción WhatsApp de 50 px |

Las acciones principales usan áreas táctiles de 44–50 px. No hay barra inferior fija ni CTA superpuesto al formulario. La selección de modalidades y la navegación activa tienen un acento azul discreto. Se mantienen los colores existentes, incluidos los acentos del banner gaming.

Comparación de Inicio: [captura móvil anterior guardada en la revisión base](capturas/mobile-ux/movil-antes.png) y [nueva captura a 390 px](capturas/mobile-ux/390/inicio.png).

Los filtros usan un `dialog` nativo: atrapa el foco, admite Escape y devuelve el foco al botón al cerrar. Las modificaciones son un borrador hasta pulsar «Aplicar filtros»; cerrar descarta ese borrador. «Limpiar» vacía el borrador y «Aplicar filtros» confirma ese estado. Las etiquetas permiten quitar un filtro individual. No se ofrece filtro de plataforma cuando solo hay un juego ni duración en Juegos. Se mantienen los criterios y la ordenación existentes.

No se cambiaron productos, variantes, precios, condiciones, funciones comerciales, validación del ID, número de WhatsApp ni rutas. Las opciones pendientes siguen sin generar una solicitud de compra. No se solicitan contraseñas ni códigos.

## Capturas reales

Chromium con emulación táctil, escala 1 y altura de ventana de 844 px. Las capturas son de página completa, salvo la columna adicional «Panel de resumen», que muestra únicamente la ventana visible. Inicio, Streaming, Juegos y los dos detalles usan el catálogo real, cuyos precios y disponibilidad están pendientes.

**Los resúmenes son una demostración con datos ficticios inyectados únicamente en la respuesta del módulo del navegador de prueba.** El precio, disponibilidad y teléfono de esa demostración no se guardan en la aplicación. No se abrió WhatsApp ni se envió ningún mensaje. Esta separación permite comprobar el flujo existente sin habilitar ventas ficticias.

| Ancho | Inicio | Streaming | Juegos | Netflix | Free Fire | Resumen completo de prueba | Panel de resumen | Filtros |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 320 px | [Ver](capturas/mobile-ux/320/inicio.png) | [Ver](capturas/mobile-ux/320/streaming.png) | [Ver](capturas/mobile-ux/320/juegos.png) | [Ver](capturas/mobile-ux/320/netflix.png) | [Ver](capturas/mobile-ux/320/free-fire.png) | [Ver](capturas/mobile-ux/320/resumen-demo.png) | [Ver](capturas/mobile-ux/320/resumen-demo-panel.png) | [Ver](capturas/mobile-ux/320/filtros.png) |
| 360 px | [Ver](capturas/mobile-ux/360/inicio.png) | [Ver](capturas/mobile-ux/360/streaming.png) | [Ver](capturas/mobile-ux/360/juegos.png) | [Ver](capturas/mobile-ux/360/netflix.png) | [Ver](capturas/mobile-ux/360/free-fire.png) | [Ver](capturas/mobile-ux/360/resumen-demo.png) | [Ver](capturas/mobile-ux/360/resumen-demo-panel.png) | [Ver](capturas/mobile-ux/360/filtros.png) |
| 390 px | [Ver](capturas/mobile-ux/390/inicio.png) | [Ver](capturas/mobile-ux/390/streaming.png) | [Ver](capturas/mobile-ux/390/juegos.png) | [Ver](capturas/mobile-ux/390/netflix.png) | [Ver](capturas/mobile-ux/390/free-fire.png) | [Ver](capturas/mobile-ux/390/resumen-demo.png) | [Ver](capturas/mobile-ux/390/resumen-demo-panel.png) | [Ver](capturas/mobile-ux/390/filtros.png) |
| 430 px | [Ver](capturas/mobile-ux/430/inicio.png) | [Ver](capturas/mobile-ux/430/streaming.png) | [Ver](capturas/mobile-ux/430/juegos.png) | [Ver](capturas/mobile-ux/430/netflix.png) | [Ver](capturas/mobile-ux/430/free-fire.png) | [Ver](capturas/mobile-ux/430/resumen-demo.png) | [Ver](capturas/mobile-ux/430/resumen-demo-panel.png) | [Ver](capturas/mobile-ux/430/filtros.png) |
| 768 px | [Ver](capturas/mobile-ux/768/inicio.png) | [Ver](capturas/mobile-ux/768/streaming.png) | [Ver](capturas/mobile-ux/768/juegos.png) | [Ver](capturas/mobile-ux/768/netflix.png) | [Ver](capturas/mobile-ux/768/free-fire.png) | [Ver](capturas/mobile-ux/768/resumen-demo.png) | [Ver](capturas/mobile-ux/768/resumen-demo-panel.png) | [Ver](capturas/mobile-ux/768/filtros.png) |

## Escritorio

Se capturó la compilación anterior y la nueva, con el mismo Chromium, posición del cursor y preferencia de movimiento reducido, a 1024 y 1440 px. Se compararon los píxeles de siete rutas en ambos tamaños: Inicio, Streaming, Juegos, Netflix, Free Fire, Contacto y Buscar. Resultado: **14 de 14 comparaciones idénticas, cero píxeles diferentes**.

La [evidencia de comparación](capturas/mobile-ux/escritorio-comparacion.json) incluye la revisión base, las dimensiones, los hashes y el resultado por página. Ejemplo de Inicio a 1440 px: [antes](capturas/mobile-ux/escritorio-antes.png) y [después](capturas/mobile-ux/escritorio-despues.png).

`src/home.css`, `src/navigation.css` y `src/style.css` permanecen sin cambios. Las nuevas reglas se concentran en `src/mobile.css`, cargado después de los estilos existentes y limitado a 768 px. Su regla global para ocultar la etiqueta de acción en escritorio ya existía. Las bifurcaciones React conservan los componentes y el orden de escritorio.

## Rendimiento y accesibilidad

El atlas móvil reutiliza el recurso existente con una copia de 88 144 bytes frente a 212 122 bytes: reducción del 58,4 % hasta 480 px. A mayor anchura se conserva el original. No se añaden fuentes, recursos externos ni dependencias. Las proporciones de portadas, imagen de detalle y banner se reservan mediante CSS; las ilustraciones y logotipos conservan sus proporciones.

En la revisión visual se corrigieron recortes que mostraban celdas vecinas del atlas en las tarjetas anchas de 768 px. El texto informativo inferior también se amplió para evitar tamaños de 9 px.

Se conservan los logotipos locales y sus alternativas si falla la carga. El hero móvil es estático y no tiene reproducción automática. Se mantiene la regla global para movimiento reducido. Los formularios y el resumen tienen controles nativos, etiquetas accesibles, límites de altura y espacio inferior que contempla el área segura.

## Pruebas ejecutadas

| Comprobación | Resultado |
| --- | --- |
| `npm run build` | TypeScript y compilación de producción correctos |
| `npm test` | 6/6 pruebas comerciales correctas |
| `npm run test:e2e` | 20/20 pruebas correctas, escritorio y móvil |
| `npx playwright test e2e/mobile-ux.spec.ts --project=mobile --workers=2` | 8/8 pruebas de la adaptación móvil; repetidas tras los ajustes visuales |
| `npm run screenshots` | 6 capturas desde producción; imágenes, rutas hash y recarga bajo `/ipey/` correctas |
| Desbordamiento horizontal | Sin desbordamiento en las seis vistas y los cinco anchos solicitados |
| Filtros | Cancelar descarta borrador; aplicar, quitar etiqueta, limpiar, buscar y ordenar funcionan |
| Contratación | ID inválido muestra error y recibe foco; paquete elegido aparece en resumen; enlace conserva `wa.me` y texto codificado |
| Ventana reducida | ID y acción de resumen accesibles en 390 × 500 px, simulando menos espacio disponible |
| Escritorio | 14/14 imágenes idénticas a 1024 y 1440 px |
| Errores de carga | Ningún error JavaScript ni respuesta HTTP fallida en las rutas capturadas |

Para regenerar las capturas móviles: `npx playwright test e2e/mobile-ux.spec.ts --project=mobile`. Para las capturas de producción bajo `/ipey/`: iniciar `npm run preview -- --port 4173 --base /ipey/` después de compilar y ejecutar `npm run screenshots` en otra terminal.

## Archivos de la entrega

| Archivo | Cambio |
| --- | --- |
| `src/HomeDashboard.tsx` | Hero estático móvil, categorías, orden de secciones y tarjetas compartidas |
| `src/main.tsx` | Navegación móvil, herramientas de catálogo, condiciones desplegables y accesibilidad del ID/resumen |
| `src/mobile.css` | Disposición y controles de móvil hasta 768 px |
| `src/MobileCatalogTools.tsx` | Nuevo panel de filtros y búsqueda/ordenación móviles |
| `src/useMobileLayout.ts` | Nuevo hook para sincronizar la estructura React con el breakpoint |
| `public/art/home/editorial-mobile.webp` | Copia optimizada del atlas existente |
| `public/art/home/README.md` | Procedencia y tamaño del nuevo recurso |
| `e2e/mobile-ux.spec.ts` | Recorridos móviles, validación y capturas en cinco anchos |
| `e2e/store.spec.ts` | Ajuste de los recorridos compartidos a los controles móviles |
| `playwright.config.ts` | Ejecuta la suite móvil exclusiva solo en el proyecto móvil |
| `scripts/capture.mjs` | Reconoce los títulos móviles al capturar producción |
| `docs/capturas/*-movil.png` | Tres capturas de producción actualizadas |
| `docs/capturas/mobile-ux/` | Capturas de las seis vistas, filtros y evidencia de escritorio |
| `README.md`, `docs/MOBILE-UX.md` | Instrucciones y entrega documentada |

## Pendientes y límites

Queda pendiente estudiar las referencias externas cuando la red permita abrirlas. La emulación de Chromium no sustituye una prueba física en Safari/iPhone o Chrome/Android: la ventana reducida verifica el espacio disponible, pero no reproduce un teclado ni todas las particularidades de áreas seguras de un dispositivo real.

Los precios, disponibilidad y número comercial de WhatsApp siguen pendientes tal como estaban en el catálogo. El flujo habilitado solo se verificó con la demostración aislada. El workflow de Pages permanece sin cambios. `.github/pages-publication.json` se actualizó únicamente después de recibir autorización expresa del propietario para publicar esta entrega.
