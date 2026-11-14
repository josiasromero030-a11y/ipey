# Ipey — Kit visual v3, por capas

Contiene **fondos sueltos para reutilizar**, una **guía visual con paleta**, un archivo de **tokens CSS**, rutas de los **logotipos transparentes ya presentes en GitHub** y un **prompt separado para Codex**.

## Regla central

**FONDO WEBP (sin logotipo) → sombreado CSS opcional → LOGO SVG/PNG independiente → contenido comercial en HTML.** Nunca se debe aplanar un servicio en una única imagen que contenga fondo, logo y botón.

## Dónde encontrar cada cosa
- `assets/covers/`: 6 fondos de productos, individuales 1200 × 600.
- `assets/banners/free-fire-banner.webp`: fondo panorámico 1600 × 620.
- `assets/backgrounds/hero-base.webp`, `texture-sutil.webp`: fondo del hero y textura neutra.
- `assets/categories/streaming.webp`, `juegos.webp`: fondos de categoría.
- `design/Guia_Visual_Ipey.png`: panel visual informativo para comparar y explicar a Codex.
- `design/Detalle_Capas.png`: ejemplo de que fondo y logo son recursos distintos.
- `design/tokens.css`, `design/tokens.json`: paleta, tipografía, radio de esquinas.
- `logos/LEEME.md`: rutas del repositorio de los logotipos de servicios.
- `referencias/`: las DOS imágenes aprobadas, solo como guía.
- `docs/manifest.json`: nombres y mapeo real.
- `docs/PROMPT_CODEX.md`: prompt independiente.

## Limitaciones técnicas y legales
Los fondos son recortes y reconstrucciones de ilustraciones generadas para las propuestas, **no equivalen a sus archivos fuente originales en capas** y su detalle depende del tamaño original. Las marcas y personajes de la composición no implican autorización de uso comercial; antes de publicar, revisa las licencias y sustituye imágenes o logos que requieran permiso. Las referencias no son capturas del producto funcional.
