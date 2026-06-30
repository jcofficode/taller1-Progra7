# Refurbished — Landing Page (Taller Parte 1, Jean Coffi)

Landing Page de alta conversión + zona de compras para la tienda de tecnología
**reacondicionada (refurbished)** Refurbished: celulares, laptops, tablets y más,
con garantía.

## Stack

- **Vue 3** (Composition API, `<script setup>`)
- **Pinia** para el manejo de estado (modelo)
- **Vue Router** para la navegación entre vistas
- **Tailwind CSS v4** para el diseño
- **Axios** para el consumo de la API externa
- **Headless UI + Heroicons** para modales y accesibilidad
- Gestor de paquetes: **pnpm** 

## Arquitectura (MVC adaptado a Vue)

```
src/
├── data/         → db_jc.js   (MODELO: catálogo de equipos reacondicionados)
├── services/     → apiComparador_jc.js  (capa de servicio: API DummyJSON)
├── stores/       → Pinia: productos, carrito, favoritos, notificaciones, comparador, tema
├── directivas/   → revelar_jc.js (animación de aparición al hacer scroll)
├── components/   → VISTA reutilizable (Navbar, Footer, Snackbar, Modal, Tarjetas)
├── views/        → VISTA/CONTROLADOR (Inicio, Tienda, Comparador, Favoritos)
└── router/       → Definición de rutas
```

## API externa integrada

Se consume **DummyJSON** (https://dummyjson.com), afín a la temática por
aportar un catálogo real de productos **tecnológicos** del mercado
(celulares, laptops, tablets) con precio, marca, rating y stock. Alimenta el
**Comparador de Tecnología**: su buscador y filtros son 100% dinámicos, y
permite contrastar el precio de equipos nuevos contra los reacondicionados.

## Convenciones

- Código, variables y funciones en **español**, comentados.
- Sufijo `_jc` en variables, funciones y componentes lógicos.
- IDs y clases CSS personalizadas con sufijo `_coffiJean` (regla ApellidoNombre).
- Modo **claro/oscuro** con persistencia en localStorage (botón sol/luna).

## Comandos

```sh
pnpm install      # Instalar dependencias
pnpm run dev      # Servidor de desarrollo (http://localhost:5173)
pnpm run build    # Build de producción
pnpm run preview  # Previsualizar el build
```
