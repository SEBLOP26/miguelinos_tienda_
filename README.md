# Miguelinos de Lelia — Tienda (HTML + CSS + JS)

## Estructura
- `index.html`  → Maquetación (HTML)
- `styles.css`  → Estilos
- `app.js`      → Lógica (catálogo, filtros, carrito, WhatsApp)
- `assets/img/` → Aquí van tus imágenes de productos (opcional)

## Cómo abrir
1. Abre esta carpeta en **Visual Studio Code**.
2. Abre `index.html` con **Live Server** (extensión recomendada) para que cargue todo correctamente.

## Imágenes
En el catálogo (`app.js`) las imágenes están apuntando a rutas como:
- `img/yogurt-natural.jpg`

Puedes hacer 1 de estas 2 cosas:
- Opción A (rápida): crea una carpeta `img/` al lado de `index.html` y coloca ahí las imágenes.
- Opción B (ordenada): usa `assets/img/` y cambia las rutas en `app.js` de `img/...` a `assets/img/...`.

## Dónde editar productos
En `app.js`, busca el arreglo:
`const CATALOG = [ ... ]`
Ahí puedes:
- Cambiar nombres, descripciones y precios
- Agregar o quitar productos
- Cambiar categorías (`cat`)
