// ============================================================
// db_jc.js - "Base de datos" local del catalogo de Refurbished.
// Capa MODELO (datos) del patron MVC. Contiene los MISMOS equipos
// que expone la API del comparador (DummyJSON), pero en su version
// REACONDICIONADA y a un precio mas bajo. Asi la comparacion tiene
// sentido: el cliente ve el mismo modelo nuevo (precio de mercado en
// el comparador) frente a nuestro precio reacondicionado.
//
// Campos: id, nombre (igual al de la API), imagen (misma de la API),
// descripcion, precio (reacondicionado), categoria, condicion, stock
// y etiqueta. Se incluye precioMercado_jc para resaltar el ahorro.
// ============================================================
export const db_jc = [
  {
    id: 1,
    nombre: 'iPhone 13 Pro',
    imagen: 'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp',
    descripcion:
      'Grado A+. Batería al 100%, pantalla original sin marcas. 128GB. Incluye cargador y garantía de 12 meses.',
    precio: 699,
    precioMercado_jc: 1100, // Precio de mercado (nuevo) segun la API
    categoria: 'Celulares',
    condicion: 'Como nuevo (A+)',
    stock: 5,
    etiqueta: 'Mas vendido',
  },
  {
    id: 2,
    nombre: 'iPhone X',
    imagen: 'https://cdn.dummyjson.com/product-images/smartphones/iphone-x/thumbnail.webp',
    descripcion:
      'Grado A. 64GB, Face ID y pantalla Super Retina impecables. Reacondicionado y certificado.',
    precio: 499,
    precioMercado_jc: 900,
    categoria: 'Celulares',
    condicion: 'Excelente (A)',
    stock: 7,
    etiqueta: '',
  },
  {
    id: 3,
    nombre: 'Samsung Galaxy S10',
    imagen: 'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/thumbnail.webp',
    descripcion:
      'Reacondicionado de fábrica. 128GB, pantalla Dynamic AMOLED. Libre para cualquier operador.',
    precio: 399,
    precioMercado_jc: 700,
    categoria: 'Celulares',
    condicion: 'Excelente (A)',
    stock: 8,
    etiqueta: '',
  },
  {
    id: 4,
    nombre: 'Samsung Galaxy S8',
    imagen: 'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/thumbnail.webp',
    descripcion:
      'Grado B. 64GB, pequeños signos de uso apenas visibles. Funciona perfecto. Gran relación precio-calidad.',
    precio: 249,
    precioMercado_jc: 500,
    categoria: 'Celulares',
    condicion: 'Muy bueno (B)',
    stock: 10,
    etiqueta: 'Oferta',
  },
  {
    id: 5,
    nombre: 'Oppo F19 Pro Plus',
    imagen:
      'https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/thumbnail.webp',
    descripcion:
      'Grado A. Carga ultra rápida y cámara nocturna. 128GB. Reacondicionado con batería restaurada.',
    precio: 229,
    precioMercado_jc: 400,
    categoria: 'Celulares',
    condicion: 'Excelente (A)',
    stock: 9,
    etiqueta: '',
  },
  {
    id: 6,
    nombre: 'Apple MacBook Pro 14 Inch Space Grey',
    imagen:
      'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp',
    descripcion:
      'Chip Apple M-series, 16GB RAM, 512GB SSD. Ciclos de batería bajos. Restaurado de fábrica con garantía.',
    precio: 1399,
    precioMercado_jc: 2000,
    categoria: 'Laptops',
    condicion: 'Como nuevo (A+)',
    stock: 3,
    etiqueta: 'Premium',
  },
  {
    id: 7,
    nombre: 'New DELL XPS 13 9300 Laptop',
    imagen:
      'https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/thumbnail.webp',
    descripcion:
      'Intel Core i7, 16GB RAM, 512GB SSD. Pantalla InfinityEdge. Ideal para trabajo profesional.',
    precio: 949,
    precioMercado_jc: 1500,
    categoria: 'Laptops',
    condicion: 'Excelente (A)',
    stock: 2,
    etiqueta: '',
  },
  {
    id: 8,
    nombre: 'Lenovo Yoga 920',
    imagen: 'https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/thumbnail.webp',
    descripcion:
      'Convertible 2 en 1, pantalla táctil 4K. Intel Core i7, 8GB RAM, 256GB SSD. Bisagra impecable.',
    precio: 679,
    precioMercado_jc: 1100,
    categoria: 'Laptops',
    condicion: 'Muy bueno (B)',
    stock: 4,
    etiqueta: '',
  },
  {
    id: 9,
    nombre: 'iPad Mini 2021 Starlight',
    imagen:
      'https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/thumbnail.webp',
    descripcion:
      'Grado A+. Chip A15, compatible con Apple Pencil 2. 64GB. Pantalla Liquid Retina sin detalles.',
    precio: 329,
    precioMercado_jc: 500,
    categoria: 'Tablets',
    condicion: 'Como nuevo (A+)',
    stock: 6,
    etiqueta: '',
  },
  {
    id: 10,
    nombre: 'Samsung Galaxy Tab S8 Plus Grey',
    imagen:
      'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/thumbnail.webp',
    descripcion:
      'Pantalla Super AMOLED de 12.4". Incluye S Pen. 128GB. Reacondicionado certificado con garantía.',
    precio: 389,
    precioMercado_jc: 600,
    categoria: 'Tablets',
    condicion: 'Excelente (A)',
    stock: 5,
    etiqueta: 'Limitado',
  },
]
