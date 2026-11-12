# Portafolio profesional — Jermy Cubas Solsol

Portafolio estático, accesible y adaptable con contenido en español, inglés,
portugués, francés y alemán. Incluye temas claro/oscuro, fichas de proyectos y
los recursos de identidad JSCS.

## Vista local

Desde PowerShell:

```powershell
.\serve.ps1
```

Luego abre `http://localhost:4173`.

También puedes servir `dist/` con cualquier servidor HTTP estático.

## Validación

```powershell
node .\validate.mjs
```

## Estructura

- `dist/index.html`: contenido y estructura semántica.
- `dist/styles.css`: sistema visual y diseño adaptable.
- `dist/data.js`: traducciones y proyectos.
- `dist/app.js`: temas, idioma, navegación y fichas de proyectos.
- `dist/assets/`: fotografías, firma, logo y gráficos.
- `serve.mjs`: servidor local sin dependencias como alternativa a Python.

No requiere instalación de dependencias ni proceso de compilación.

## Dirección visual

La actualización visual toma como referencia patrones de proyectos populares en GitHub: la presentación directa de proyectos de [Simplefolio](https://github.com/cobiwave/simplefolio), el diseño limpio y adaptable de [al-folio](https://github.com/alshedivat/al-folio) y la narrativa profesional de [Academic Pages](https://github.com/academicpages/academicpages.github.io). Al 12 de noviembre de 2026, GitHub muestra 17.8k estrellas para Academic Pages, 16.3k para al-folio y 14.2k para Simplefolio.

La adaptación mantiene la identidad y el contenido de Jermy: da más peso a la portada y el retrato, aumenta el contraste entre secciones y mejora la jerarquía de las tarjetas de proyectos. Sigue siendo un sitio estático sin dependencias de compilación; las transiciones respetan la preferencia del sistema por movimiento reducido.

