# Cómo agregar las demos

Las siete fichas existentes están preparadas. Su configuración está en `dist/demos.js`.

1. Publica tu sistema en su propio alojamiento, con una base de datos de prueba separada de producción.
2. Guarda una captura en `dist/assets/`, por ejemplo `transporte-demo.webp`.
3. Completa la ficha correspondiente:

```js
transporte: {
  url: 'https://tu-demo.example.com',
  image: 'assets/transporte-demo.webp',
  instructions: {
    es: 'Selecciona el rol visitante. Explora los pasajes y crea una reserva de prueba.',
    en: 'Select the visitor role. Explore tickets and create a test booking.'
  }
},
```

## Videos

Cada ficha admite un video corto del sistema en uso. Guárdalo en `dist/assets/` y añade el campo `video`:

```js
transporte: {
  url: 'https://tu-demo.example.com',
  image: 'assets/transporte-demo.webp',   // se usa como portada del video
  video: 'assets/transporte-demo.mp4',
  instructions: { es: '…', en: '…' }
},
```

- Formatos: `.mp4` (H.264) o `.webm`. También vale una URL `https://…` que termine en `.mp4` o `.webm`.
- En la ficha se reproduce en bucle y sin sonido mientras está en pantalla; en «Ver caso» aparece con controles y audio.
- Recomendado: 15–40 s, 1280×720, menos de 8 MB, grabado con datos ficticios.
- Sin video ni captura, la ficha muestra una vista animada ilustrativa.
- Con «reducir movimiento» activado en el sistema, el video no se reproduce solo y las animaciones se desactivan.

`node .\validate.mjs` comprueba que el archivo exista y tenga un formato admitido.

## Enlaces

Solo se activan enlaces HTTPS. Con `url: ''`, la ficha muestra «Demo próximamente» y el botón permanece deshabilitado. Las capturas vacías conservan una vista ilustrativa claramente identificada. Las instrucciones admiten también `pt`, `fr` y `de`; si faltan, se muestra español.

Para agregar otro sistema, añade su ficha multilingüe en `dist/data.js` y su configuración con el mismo `id` en `dist/demos.js`. No hay límite fijo de siete sistemas.

Esto es un catálogo de enlaces, no un panel para subir o ejecutar aplicaciones. Cada sistema requiere su propio despliegue; el portafolio abre la demo en una pestaña nueva.

No publiques claves de producción ni información personal. Usa datos ficticios, permisos limitados y pagos en modo prueba. Cualquier credencial que escribas aquí será pública; utiliza exclusivamente cuentas de demostración aisladas.

## Pasarela de capturas

En lugar de un video, una ficha puede mostrar una pasarela de capturas reales que avanza sola, con una barra de progreso y un título por pantalla. Añade el campo `slides`:

```js
taller: {
  url: 'https://tu-demo.example.com',
  image: 'assets/demos/taller-03-resumen.jpg',
  slides: [
    { image: 'assets/demos/taller-01-web.jpg', caption: { es: 'Web pública del taller', en: 'Public workshop website' } },
    { image: 'assets/demos/taller-04-ordenes.jpg', caption: { es: 'Órdenes de trabajo', en: 'Work orders' } }
  ],
  instructions: { es: '…', en: '…' }
},
```

- Capturas en 16:9 (por ejemplo 1120×630), en `.jpg`, `.png`, `.webp` o `.avif`, con datos ficticios.
- `caption` necesita al menos `es` y `en`; los demás idiomas usan el inglés si faltan.
- En la ficha avanza sola mientras está en pantalla; en «Ver caso» se ve más grande, con flechas, y se pausa al pasar el cursor.
- Si la ficha tiene `video`, se muestra el video y no la pasarela.
- Con «reducir movimiento» activado no avanza sola: se ve la primera captura y en «Ver caso» se pasa con las flechas.

## Capítulos del video

Un video puede llevar capítulos: la ficha muestra qué se está viendo en cada momento y «Ver caso» permite saltar a cada parte. Añade `chapters` junto a `video`:

```js
taller: {
  url: 'https://tu-demo.example.com',
  image: 'assets/demos/taller-poster.jpg',
  video: 'assets/demos/taller-demo.webm',
  chapters: [
    { t: 0, group: 'public', title: { es: 'Web del taller', en: 'Workshop website' }, caption: { es: 'La web pública del taller', en: 'The public website' } },
    { t: 32.2, group: 'panel', title: { es: 'Acceso por rol', en: 'Role sign-in' }, caption: { es: 'Entra al panel con un clic', en: 'One-click sign-in' } }
  ],
  instructions: { es: '…', en: '…' }
},
```

- `t` es el segundo del video en que empieza el capítulo, en orden creciente.
- `group` es `public` (sitio público) o `panel` (panel de gestión).
- `title` es el nombre corto del botón; `caption`, la frase que aparece sobre el video. Ambos necesitan `es` y `en`.
