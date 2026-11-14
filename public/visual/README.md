# Kit visual Ipey v3

Los once WebP de `assets/` se copiaron sin modificaciones desde `Ipey_Kit_Visual_Capas_v3.zip`, aportado por el propietario. La guía, las referencias, el manifiesto y sus notas originales se conservan en `docs/visual-kit-v3/`; no se sirven como imágenes de la aplicación.

`src/data/visualAssets.ts` centraliza las rutas. Los fondos son elementos `<img>` con `object-fit: cover`. Los SVG/PNG de `public/logos/` se superponen como nodos independientes con `object-fit: contain`. Textos, estados, precios y acciones se generan mediante React y HTML.

El icono PNG de Free Fire se reutiliza por elección expresa del propietario. Es un icono de aplicación casi opaco, no un wordmark transparente; se conserva tal cual, separado del fondo. Netflix y Spotify reutilizan las versiones completas de `public/logos/home/`, salvo el símbolo N del hero móvil.
