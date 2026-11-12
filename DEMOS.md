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

Solo se activan enlaces HTTPS. Con `url: ''`, la ficha muestra «Demo próximamente» y el botón permanece deshabilitado. Las capturas vacías conservan una vista ilustrativa claramente identificada. Las instrucciones admiten también `pt`, `fr` y `de`; si faltan, se muestra español.

Para agregar otro sistema, añade su ficha multilingüe en `dist/data.js` y su configuración con el mismo `id` en `dist/demos.js`. No hay límite fijo de siete sistemas.

Esto es un catálogo de enlaces, no un panel para subir o ejecutar aplicaciones. Cada sistema requiere su propio despliegue; el portafolio abre la demo en una pestaña nueva.

No publiques claves de producción ni información personal. Usa datos ficticios, permisos limitados y pagos en modo prueba. Cualquier credencial que escribas aquí será pública; utiliza exclusivamente cuentas de demostración aisladas.
