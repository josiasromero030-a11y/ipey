# CODEX — CONTINUACIÓN: IMPLEMENTAR KIT VISUAL POR CAPAS EN IPEY

Este mensaje es una **continuación del proyecto Ipey** y complementa el prompt maestro de reconstrucción, **no lo sustituye**. Adjunto las dos referencias definitivas (escritorio y móvil) y `Ipey_Kit_Visual_Capas_v3.zip`.

## REGLA ABSOLUTA: CAPAS REALES, NO IMÁGENES APLANADAS
Para cada servicio, la portada debe estar constituida por **cuatro capas independientes**:
1. FONDO WebP de `/assets/covers/` (únicamente arte, sin logo);
2. Overlay CSS opcional para preservar contraste;
3. LOGOTIPO transparente SVG/PNG, separado, obtenido de `public/logos/` del repositorio actual, centrado o posicionado sobre la imagen con `object-fit: contain`, `z-index` superior y medidas propias;
4. Nombre, datos comerciales y botones como elementos HTML/React reales.

No uses una captura de la propuesta, ni una imagen con el logotipo pegado, ni texto dibujado para simular el logo. Un cambio de recorte del fondo no debe recortar, mover ni pixelar el logotipo. Nunca coloques el logo dentro de la propiedad CSS `background-image` del mismo elemento que lleva la portada: utiliza **dos nodos DOM separados**.

## ARCHIVOS Y RECURSOS
Extrae el ZIP dentro de la aplicación, por ejemplo en `public/visual/`, sin duplicar assets. Lee `docs/manifest.json`, `design/tokens.json`, `design/tokens.css` y `logos/LEEME.md` antes de modificar el código. La identidad Ipey, si se usa, también debe estar separada de otros fondos.

Fondos: `assets/covers/netflix.webp`, `disney.webp`, `hbo-max.webp`, `crunchyroll.webp`, `spotify.webp`, `free-fire.webp`; `assets/backgrounds/hero-base.webp`; `assets/banners/free-fire-banner.webp`; `assets/categories/streaming.webp`, `juegos.webp`. Carga los logotipos existentes en `public/logos/` según el manifest, no copies los del mockup.

### APLICACIÓN EN LAS DOS PLANTILLAS
- Escritorio: la composición del hero consta de seis paneles inclinados, cada uno con su fondo de servicio y su logo superpuesto; cada tarjeta de streaming reutiliza el mismo par fondo+logo; Free Fire banner usa su imagen panorámica con logo externo.
- Móvil: la composición del hero es una cuadrícula 2×3 de servicios (no el hero de escritorio reducido); Netflix, Disney+, HBO Max y Crunchyroll se presentan en 2 columnas, Spotify en una tarjeta horizontal, Free Fire en un banner. Cada instancia reutiliza los mismos fondos y logos, adaptando solamente posiciones y recortes.
- Categorías, textos, precios, flechas y CTAs son componentes reales y accesibles.

## SISTEMA VISUAL
Aplica exactamente los tokens del paquete. Usa Inter (familia CSS, sin adjuntar archivos de fuente), Lucide React para iconografía y los radios/espaciados del sistema. Los colores de cada marca provienen de su propio logotipo/arte: el sitio es negro/gris/azul moderado y evita neón, brillos, saturación exagerada y sombras intensas.

## FUNCIONALIDAD Y DATOS
Conserva React/TypeScript/Vite, catálogo, variantes, precios verificables, paquetes de Free Fire, ID de jugador, búsqueda, filtros, WhatsApp, FAQ y GitHub Pages. NO inventes precios, descuentos, disponibilidad, autorización oficial, testimonios, seguridad de pagos ni plazos de entrega. Los precios en mockups son ilustrativos; si no hay precio real, mostrar “Precio por definir”.

## VERIFICACIÓN Y ENTREGA
- Comprueba que cada fondo carga **sin logotipo/texto incrustado** y que cada logotipo carga en una petición/elemento separado.
- Capturas reales en escritorio 1440×900 y móvil 390×844; compara con ambas referencias y corrige espaciados, proporciones, recortes y tamaños de logos.
- Revisa comportamiento 320/360/390/430/768/1024/1440 px.
- Confirma que al cambiar únicamente el `src` de un logo el fondo permanezca inalterado.
- Ejecuta compilación y pruebas existentes. No publiques ni modifiques `main` automáticamente.

**IMPORTANTE SOBRE FIDELIDAD:** los fondos WebP son reconstrucciones de las propuestas visuales, no los recursos fuente originales de las imágenes generadas; si un detalle visual no puede reproducirse exactamente, documéntalo y no finjas fidelidad perfecta. Verifica derechos comerciales de marcas y material de entretenimiento antes de publicar.
