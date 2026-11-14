# Identidad de los servicios

## Estado en la reconstrucción de las dos referencias

La reconstrucción utiliza los logotipos locales documentados aquí. Netflix y Spotify usan también los wordmarks completos en las portadas; el símbolo de Netflix se conserva en el hero móvil. Disney+ y HBO Max mantienen sus SVG existentes y su atribución. Crunchyroll usa el símbolo y texto neutral. El PNG de Free Fire sin licencia confirmada deja de cargarse en todas las páginas: se emplean un nombre tipográfico y la ilustración de aventura original. No se fabrica un logotipo oficial ni se reproducen personajes de las referencias. La marca Ipey del encabezado/footer es un dibujo vectorial original compartido.

Las secciones siguientes conservan la procedencia y el historial de incorporación de recursos; las decisiones visuales vigentes se describen en [la entrega de reconstrucción](RECONSTRUCCION-REFERENCIAS.md).

Los recursos se sirven localmente desde `public/logos/`. Se conservan las proporciones y no se aplican filtros de color. Si una imagen falla, se muestra el nombre del servicio en tipografía neutral.

| Servicio | Fuente | Tratamiento y licencia de la colección |
| --- | --- | --- |
| Netflix | [Simple Icons 11.15.0](https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/netflix.svg) | SVG monocromo con relleno rojo `#E50914`; CC0 |
| Spotify | [Simple Icons 11.15.0](https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/spotify.svg) | SVG monocromo con relleno verde `#1DB954`; CC0 |
| Crunchyroll | [Simple Icons 11.15.0](https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/crunchyroll.svg) | SVG monocromo con relleno naranja `#F47521`; CC0 |
| Disney+ | [selfh.st Icons, versión clara](https://raw.githubusercontent.com/selfhst/icons/main/svg/disney-plus-light.svg) | Sin cambios; CC BY 4.0, atribución en el footer |
| HBO Max | [selfh.st Icons, versión clara](https://raw.githubusercontent.com/selfhst/icons/main/svg/hbo-max-light.svg) | Sin cambios; CC BY 4.0, atribución en el footer |
| Free Fire | [SiPalingTopUp/FreeFire-Logo](https://github.com/SiPalingTopUp/FreeFire-Logo/blob/main/unnamed.png) | Icono PNG de la aplicación, sin cambios. La fuente no declara licencia expresa: revisar o sustituir por un recurso autorizado antes de publicación pública. |

Las licencias de Simple Icons y selfh.st están incluidas en `public/logos/LICENSE-CC0.txt` y `public/logos/LICENSE-selfhst.txt`. Las licencias de las colecciones no conceden derechos sobre las marcas ni acreditan autorización comercial de los servicios. Los recursos son reproducciones de su identidad, no diseños propios ni prueba de afiliación. Su incorporación no verifica que cada versión sea la más reciente del titular.

## Referencia visual utilizada

Se intentó abrir la versión española de Instant Gaming con HTTP y Chromium. El proxy rechazó el acceso (`CONNECT 403` / `ERR_TUNNEL_CONNECTION_FAILED`). El usuario aportó posteriormente dos capturas, utilizadas para adaptar la composición: banner panorámico, cabecera fija y portadas horizontales con nombre/precio debajo. No se copiaron imágenes de videojuegos ni la identidad de Instant Gaming. Los siete fondos de `public/art/` son SVG decorativos originales del proyecto. Los dominios `instant-gaming.com` y `www.instant-gaming.com` se propusieron en el borrador de red del entorno.

## Corrección de fidelidad: recursos exclusivos de Inicio

- `public/logos/home/netflix.svg`: wordmark completo de [gilbarbara/logos](https://github.com/gilbarbara/logos/blob/main/logos/netflix.svg), sin modificaciones.
- `public/logos/home/spotify.svg`: símbolo y wordmark de [gilbarbara/logos](https://github.com/gilbarbara/logos/blob/main/logos/spotify.svg), sin modificaciones.
- La colección declara [CC0](https://github.com/gilbarbara/logos/blob/main/LICENSE.txt); se conserva copia en `public/logos/home/LICENSE-logos.txt`. La licencia de la colección no concede derechos sobre las marcas ni acredita autorización comercial del proveedor.
- HBO Max mantiene su recurso existente apilado; no se fabricó un wordmark horizontal para aparentar equivalencia con la referencia.
- Crunchyroll mantiene su símbolo existente junto al nombre como texto neutral, no una reproducción de su tipografía corporativa.
- Free Fire se presenta mediante su nombre tipográfico y una escena de aventura original. Inicio deja de usar el PNG de terceros cuya licencia no se había confirmado. Las otras páginas y sus recursos se conservan por la restricción de alcance.
- `public/art/home/editorial-atlas.webp`: ilustraciones originales creadas para el proyecto. No es arte oficial ni material promocional de Disney+, Crunchyroll o Free Fire. Véase `public/art/home/README.md`.

## WhatsApp en la última navegación

`public/logos/home/whatsapp.svg` procede de [Simple Icons 11.15.0](https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/whatsapp.svg), colección CC0 ya incluida en `public/logos/LICENSE-CC0.txt`. Se usa el símbolo en blanco, sin deformación. El enlace conserva el número configurado o dirige a la página de contacto mientras siga pendiente.
