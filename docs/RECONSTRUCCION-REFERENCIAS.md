# Reconstrucción a partir de las dos referencias

Rama de revisión: `review/two-reference-rebuild`. Base recuperable: `6b67b06`. Esta entrega no solicita publicación.

## Diagnóstico previo

La aplicación conserva un catálogo único en `src/catalog.ts` y las reglas comerciales en `src/commerce.ts`. Se conservan productos, modalidades, paquetes, precios, disponibilidad, validaciones y mensajes. Los estilos anteriores repartían las mismas clases entre cuatro archivos, con sucesivas redefiniciones de header, hero, portadas y breakpoints. Esos archivos se sustituirán por una única arquitectura de estilos; no se añadirá otra capa de sobrescrituras.

## Lectura visual de las referencias

Las dos imágenes adjuntas son las únicas referencias visuales de esta fase. Sus dimensiones identifican los archivos; no se interpretan como medidas CSS de teléfonos.

| Región | Escritorio: imagen 1, 1672 × 941 | Móvil: imagen 2, 887 × 1774 |
| --- | --- | --- |
| Header | Una fila oscura de aproximadamente 56 px en la imagen: identidad, separador, tres destinos, búsqueda alargada, WhatsApp y contacto | Dos filas independientes: identidad y acciones; tres destinos de igual peso debajo |
| Contenido | Contenedor centrado de unos 1468 px, margen aproximado del 6 % | Márgenes laterales uniformes, aproximadamente el 4 % de la imagen |
| Hero | Franja de unos 237 px; texto a la izquierda, seis paneles diagonales continuos a la derecha; sin carrusel | Texto a la izquierda; seis tarjetas inclinadas en dos filas de tres a la derecha; botones debajo del texto |
| Categorías | Título y cinco controles compactos en una fila, enlace al catálogo a la derecha | Dos tarjetas ilustradas: Streaming y Juegos, con icono, texto y flecha |
| Streaming | Título, descripción y enlace; cinco tarjetas iguales en una fila, portadas panorámicas y zócalo compacto | Netflix/Disney+, HBO Max/Crunchyroll y Spotify horizontal a todo el ancho |
| Gaming | Banner horizontal: ilustración izquierda, contenido central y botón a la derecha | Banner horizontal con imagen izquierda y texto/acción a la derecha; se adapta cuando no cabe el contenido |
| Información | Cuatro puntos con iconos y separadores verticales | Franja compacta de cuatro puntos; en pantallas estrechas se reorganiza para que el texto siga siendo legible |
| FAQ | No aparece entre catálogo y footer; disponible desde Ayuda | Cuatro filas desplegables, bordes, separadores y chevron |
| Footer | Identidad, Explora, Ayuda, Legal y contacto; sin redes no configuradas | Identidad, navegación y contacto, con condiciones/privacidad en la franja inferior |

La prioridad es conservar proporciones, alineaciones y composición de cada imagen. Los personajes de las referencias se reemplazan por las ilustraciones originales ya disponibles en el proyecto. Las marcas se superponen como recursos independientes, sin deformarlas. No se copiarán precios, garantías, plazos, métodos de pago, redes ni cuentas inexistentes.

## Arquitectura prevista

La presentación se separa en `components/desktop`, `components/mobile`, `components/shared`, `layouts`, `pages` y `styles`. El catálogo, las reglas comerciales, los recursos y el estado de navegación/búsqueda/filtros se comparten. Desde 1024 px se utiliza la composición de escritorio; por debajo, una presentación móvil con adaptación tablet entre 768 y 1023 px. Se comprobará el contenido real para ajustar las excepciones de anchura estrecha.

## Resultado y comparación visual

Las capturas se generaron con Chromium desde la compilación de producción y se abrieron para revisar la composición frente a las imágenes adjuntas. La comparación es visual y estructural; no se afirma igualdad píxel a píxel ni se presenta una puntuación automática de semejanza. Las ilustraciones originales y los estados comerciales reales difieren deliberadamente de las imágenes de referencia.

| Bloque | Comparación con la referencia 1 | Comparación con la referencia 2 |
| --- | --- | --- |
| Header | Una fila con identidad, separador, navegación, búsqueda horizontal, WhatsApp y contacto. La acción de contacto sustituye a la cuenta inexistente | Identidad y tres acciones arriba; Inicio, Streaming y Juegos siempre visibles debajo. Menú adicional operativo |
| Hero | Seis paneles inclinados continuos, fondo individual, logotipo superpuesto y altura uniforme. Texto y dos botones a la izquierda | Seis tarjetas inclinadas en dos filas de tres, texto y dos acciones a la izquierda. Hasta 379 px se coloca el grupo gráfico debajo del texto |
| Categorías | Todos, Streaming, Juegos, Recargas y Free Fire; todos abren rutas reales. Enlace al catálogo completo | Dos tarjetas completas con icono, nombre, descripción, objeto ilustrado y flecha |
| Streaming | Cinco columnas, portadas de 90 px, zócalos de 58 px, proporciones y radios compartidos | Orden Netflix/Disney+, HBO Max/Crunchyroll y Spotify horizontal a todo el ancho. El estado de precio pendiente permanece visible |
| Free Fire | Franja horizontal con arte a la izquierda, contenido central y acción a la derecha | Bloque horizontal con ilustración y nombre tipográfico a la izquierda, información y botón visible a la derecha |
| Información | Cuatro puntos compactos y separadores verticales | Cuatro puntos; una fila en tablet y cuadrícula 2 × 2 en teléfonos para conservar la lectura |
| FAQ | Accesible desde Ayuda, conservando el contenido sin añadir un bloque ausente de la referencia de escritorio | Desplegables al final de Inicio, con separadores y chevron |
| Footer | Identidad, Explora, Ayuda, Legal y contacto útil. Sin redes sin configurar | Identidad, Explora, Contáctanos y franja inferior con condiciones y privacidad; tres columnas desde 600 px y adaptación propia en teléfonos |

A 1672 px, el contenido tiene 1468 px de ancho, como la proporción de la referencia. El hero mide aproximadamente 242 px frente a unos 237 px en la imagen adjunta. La captura completa mide 1672 × 987 desde una ventana de 1672 × 941; el texto real y la atribución del footer agregan altura. No se ha recortado la página para simular que cabe en la referencia.

La captura adicional a 887 px facilita examinar la estructura de la segunda imagen a la misma anchura de archivo; no convierte 887 px en un breakpoint de teléfono. A 390 y 430 px se conserva la composición lateral del hero. A 320 y 360 px sus seis tarjetas pasan debajo del texto para evitar comprimir nombres y botones.

### Diferencias conservadas y motivos

- Los personajes concretos de las referencias se sustituyen por las ilustraciones originales del proyecto. No se descargaron fotografías de películas o personajes para reproducirlas comercialmente.
- La marca Ipey usa un símbolo vectorial original compartido; no es una extracción de los píxeles de las imágenes.
- HBO Max conserva el SVG apilado autorizado ya disponible. Crunchyroll combina su símbolo con texto neutral. Free Fire usa un nombre tipográfico sobre la ilustración original; no se fabrica un logotipo oficial ni se usa el PNG sin licencia confirmada.
- Los objetos de las categorías móviles son dibujos vectoriales originales de una claqueta y un mando, en lugar de fotografías.
- Se muestran «Precio por definir» y las modalidades reales. No se copiaron los importes de las referencias. En móvil se priorizan nombre y precio/estado en el zócalo compacto; las modalidades se consultan en el detalle.
- Los cuatro puntos informativos hablan de consultar servicios, revisar condiciones, contactar y comparar opciones. Se omitieron promesas de entrega, seguridad de pagos y disponibilidad que el negocio aún no ha configurado.
- La descripción del hero invita a explorar. No se presenta el catálogo pendiente como una contratación ya habilitada.
- Las atribuciones de los recursos se conservan en el footer, aunque no aparecen en las referencias. El tamaño de texto y las áreas táctiles pueden aumentar la altura en pantallas pequeñas.

## Capturas completas de producción

Las dimensiones siguientes son las de la ventana del navegador; las imágenes incluyen toda la página. Todos los productos de estas capturas usan los datos reales pendientes del catálogo.

| Presentación | Ventana | Captura |
| --- | --- | --- |
| Escritorio | 1280 × 800 | [Abrir](capturas/reconstruccion/inicio-1280x800.png) |
| Escritorio | 1440 × 900 | [Abrir](capturas/reconstruccion/inicio-1440x900.png) |
| Escritorio, referencia principal | 1672 × 941 | [Abrir](capturas/reconstruccion/inicio-1672x941.png) |
| Escritorio | 1920 × 1080 | [Abrir](capturas/reconstruccion/inicio-1920x1080.png) |
| Móvil | 320 × 700 | [Abrir](capturas/reconstruccion/inicio-320x700.png) |
| Móvil | 360 × 800 | [Abrir](capturas/reconstruccion/inicio-360x800.png) |
| Móvil | 390 × 844 | [Abrir](capturas/reconstruccion/inicio-390x844.png) |
| Móvil | 430 × 932 | [Abrir](capturas/reconstruccion/inicio-430x932.png) |
| Tablet | 768 × 1024 | [Abrir](capturas/reconstruccion/inicio-768x1024.png) |
| Tablet | 820 × 1180 | [Abrir](capturas/reconstruccion/inicio-820x1180.png) |
| Composición ampliada, comparación visual | 887 × 1774 | [Abrir](capturas/reconstruccion/inicio-887x1774.png) |

Páginas funcionales:

| Página | Escritorio | Móvil |
| --- | --- | --- |
| Streaming | [Ver](capturas/reconstruccion/streaming-1440.png) | [Ver](capturas/reconstruccion/streaming-390.png) |
| Juegos | [Ver](capturas/reconstruccion/juegos-1440.png) | [Ver](capturas/reconstruccion/juegos-390.png) |
| Catálogo completo | [Ver](capturas/reconstruccion/catalogo-1440.png) | [Ver](capturas/reconstruccion/catalogo-390.png) |
| Netflix | [Ver](capturas/reconstruccion/netflix-1440.png) | [Ver](capturas/reconstruccion/netflix-390.png) |
| Free Fire | [Ver](capturas/reconstruccion/free-fire-1440.png) | [Ver](capturas/reconstruccion/free-fire-390.png) |
| Contacto | [Ver](capturas/reconstruccion/contacto-1440.png) | [Ver](capturas/reconstruccion/contacto-390.png) |
| Condiciones | [Ver](capturas/reconstruccion/condiciones-1440.png) | [Ver](capturas/reconstruccion/condiciones-390.png) |
| Privacidad | [Ver](capturas/reconstruccion/privacidad-1440.png) | [Ver](capturas/reconstruccion/privacidad-390.png) |
| Ayuda y FAQ | [Ver](capturas/reconstruccion/ayuda-1440.png) | [Ver](capturas/reconstruccion/ayuda-390.png) |

Las [métricas de captura](capturas/reconstruccion/verificacion.json) registran ventana, altura completa del documento, geometría del hero, seis paneles, seis productos y ausencia de desbordamiento/error en Inicio. El script también comprueba las otras rutas, los logotipos y las portadas CSS, no solo elementos `<img>`.

## Arquitectura final

```text
src/
  App.tsx                       composición de rutas y páginas
  catalog.ts                    catálogo y configuración únicos, conservados
  commerce.ts                   reglas comerciales conservadas
  ProductIdentity.tsx            marcas locales y alternativa si fallan
  WhatsAppIcon.tsx               recurso compartido conservado
  hooks/
    useStore.ts                 navegación, búsqueda, filtros y ordenación únicos
    usePresentation.ts          selección de composición desde 1024 px
  layouts/
    StoreLayout.tsx             contenedor estable: conserva el estado del formulario
  components/
    shared/                     marca, tarjetas, paneles, recursos, FAQ, resumen y contenido
    desktop/                    header, hero, categorías, filtros, banner y footer
    mobile/                     header, hero, categorías, filtros, banner y footer
  pages/
    HomePage.tsx
    CatalogPage.tsx
    DetailPage.tsx
    InformationPage.tsx
  data/
    presentation.ts             recursos gráficos y preguntas existentes
  styles/
    tokens.css                  colores, espacios, radios, transiciones y tipografía
    base.css                    normalización y controles básicos
    shared.css                  componentes y recursos comunes
    pages.css                   catálogo, detalle, filtros y diálogo
    desktop.css                 composición de la referencia 1
    mobile.css                  composición de la referencia 2 y tablet
```

`StoreLayout` mantiene el mismo `<main>` montado al cambiar de anchura. Intercambia los encabezados y footers específicos; `HomePage` elige los heros, categorías y banners correspondientes. Así el paquete, ID y filtros se conservan al rotar o redimensionar. La separación está en la presentación, no en copias del catálogo ni de las funciones de compra.

Compartidos: `Brand`, `PrimaryNavigation`, `ServiceCard`, `ServiceIdentity`, `PlatformPanels`, `ProcessStrip`, `Faq`, `OrderSummary`, contenido de gaming/footer y los datos de `useStore`. Las variantes de `Header`, `Hero`, `CategoryNavigation`, `GamingBanner`, `Footer` y controles de filtro son específicas de cada vista. Las cuadrículas usan el mismo `ServiceCard` y reglas de composición independientes. Spotify recibe una indicación de presentación horizontal en Inicio; no se duplica su producto.

No hay carrusel, reproducción automática, componentes de cuenta ni redes sociales ficticias. Se añade la ruta de ayuda `#/preguntas` para que escritorio conserve acceso al FAQ sin insertar en Inicio un bloque que la referencia no muestra. Las rutas anteriores se mantienen.

## Archivos modificados, añadidos y eliminados

El [manifiesto completo](ARCHIVOS-RECONSTRUCCION.txt) enumera los archivos de esta entrega, incluidas las capturas.

| Grupo | Cambios |
| --- | --- |
| Entrada | `src/main.tsx` queda como arranque; `src/App.tsx` concentra la composición y `index.html` actualiza identidad, color y área segura |
| Datos | `src/catalog.ts`: únicamente `business.name` pasa de «marca» a «Ipey». Los demás datos comerciales no cambian |
| Recursos | `src/ProductIdentity.tsx` deja de cargar el PNG de Free Fire no autorizado; `public/art/services/` contiene seis recortes WebP compartidos y su procedencia |
| Componentes y páginas | Se añaden las carpetas `components`, `hooks`, `layouts`, `pages`, `data` y `styles` descritas arriba |
| Filtros móviles | `src/MobileCatalogTools.tsx` se traslada a `src/components/mobile/MobileCatalogTools.tsx`, conservando su lógica de borrador/aplicar/limpiar |
| Pruebas y capturas | Nuevas suites de recorridos, interacción móvil y composición; configuración de Playwright; `scripts/capture-references.mjs`; comando `screenshots` de `package.json` |
| Documentación | README, procedencia de logotipos, este informe, manifiesto y 29 capturas completas |

Eliminaciones comprobadas:

| Archivo anterior | Justificación |
| --- | --- |
| `src/style.css`, `src/home.css`, `src/navigation.css`, `src/mobile.css` | Se retiran de las importaciones y se reemplazan por `src/styles/`. Ninguna de sus capas antiguas se carga en la aplicación |
| `src/HomeDashboard.tsx` | Sustituido por `HomePage` y componentes de presentación, sin retirar datos comerciales |
| `src/ProductCard.tsx` | Sustituido por el único `ServiceCard` y los banners gaming compartidos |
| `src/useMobileLayout.ts` | Sustituido por el breakpoint centralizado de `usePresentation` |
| `scripts/capture.mjs` | Sustituido por el script que comprueba todos los tamaños y las portadas CSS |
| `e2e/store.spec.ts`, `e2e/mobile-ux.spec.ts` | Sus expectativas visuales correspondían al diseño descartado; se sustituyen por recorridos equivalentes y ampliados en las tres nuevas suites. `commerce.test.ts` se conserva intacto |

Los informes, capturas y recursos de fases anteriores se conservan como historial de referencia; no se importan como estilos de la nueva aplicación. No se ha eliminado ni reescrito el historial de Git.

## Verificación y rendimiento

| Comprobación | Resultado |
| --- | --- |
| `npm run build` | TypeScript y compilación de producción correctos |
| `npm test` | 6 pruebas comerciales aprobadas, sin cambios en esas pruebas ni en `commerce.ts` |
| `npm run test:e2e` | 43/43 aprobados: recorridos de escritorio/móvil/tablet y diez tamaños de composición |
| `npm run screenshots` | 29 capturas de producción correctas; recarga de rutas bajo `/ipey/`, imágenes, portadas CSS y ausencia de errores/desbordamiento |
| Catálogo | Comparado contra `6b67b06`: texto idéntico al normalizar únicamente el nombre «Ipey» a «marca» |
| Solicitudes | Netflix y Free Fire: selección de variante, validación, resumen y texto/enlace de WhatsApp comprobados |
| Opciones pendientes | No muestran botón de compra ni generan una solicitud ficticia |
| Cambio de anchura | Conserva la selección y el ID al pasar por 1024, 768, 430 y 1440 px |
| Accesibilidad básica | Navegación única, etiquetas de formulario, radios nativos, menús con Escape/foco, filtros y resumen mediante `dialog`, ayuda y errores asociados al ID |
| Ventana reducida | ID y acción del resumen accesibles con una ventana de 390 × 500 px |
| Publicación | Archivo de solicitud y workflow de Pages idénticos a la base; ningún despliegue solicitado |

La [evidencia de verificación](capturas/reconstruccion/pruebas.json) resume las pruebas y la conservación de datos y configuración. Tras el último ajuste del hero se repitieron las diez pruebas de composición, todas aprobadas.

Las pruebas de contratación habilitan precio, disponibilidad y teléfono ficticios únicamente en la respuesta del módulo del navegador de prueba. No se modifican los datos de la aplicación ni se envían mensajes. La validación del ID sigue siendo local y de formato, no una comprobación de cuenta contra el proveedor.

Las seis portadas compartidas suman 130 616 bytes; cada una mide 600 × 300 px. El navegador reutiliza la misma URL entre los distintos componentes. No hay dependencias nuevas ni descargas de imágenes/fuentes de terceros. La compilación genera aproximadamente 40,8 KB de CSS (8,4 KB comprimidos) y 265,2 KB de JavaScript (81,8 KB comprimidos). Se reservan proporciones para las imágenes y alturas para el hero/paneles. Se respetan las preferencias de movimiento reducido.

## Revisión y pendientes

Para revisar localmente esta rama:

```sh
git switch review/two-reference-rebuild
npm ci
npm run dev
```

Abrir el puerto 5173 del entorno de desarrollo. Para revisar la compilación con el mismo prefijo que Pages:

```sh
npm run build
npm run preview -- --port 4173 --base /ipey/
```

Abrir `http://localhost:4173/ipey/#/` en esa máquina o mediante la vista previa del entorno. Para regenerar las capturas, mantener el preview activo y ejecutar `npm run screenshots` en otra terminal. `CAPTURE_URL`, `CAPTURE_DIR` y `CHROMIUM_PATH` permiten ajustar servidor, destino y Chromium.

Pendientes: revisión visual del propietario; pruebas físicas en iPhone/Safari y Android/Chrome, especialmente teclado y áreas seguras; sustitución de ilustraciones o wordmarks únicamente si se aportan recursos autorizados más próximos a las referencias. Precios, disponibilidad, condiciones comerciales y número de WhatsApp conservan sus estados pendientes originales. No se ha realizado la segunda fase de rediseño estético libre ni se ha publicado esta reconstrucción.
