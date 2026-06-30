// ============================================================
// apiComparador_jc.js - Capa de SERVICIO (Model/Service en MVC).
// Encapsula el consumo de la API publica externa DummyJSON
// (https://dummyjson.com), elegida por su afinidad directa con la
// tematica: catalogo real de productos TECNOLOGICOS del mercado
// (celulares, laptops, tablets) con precio, marca, rating y stock.
//
// Sirve al "Comparador de tecnologia": permite contrastar los
// precios de equipos NUEVOS del mercado contra nuestras ofertas
// reacondicionadas, dando sentido al ahorro de comprar refurbished.
// Las vistas reciben objetos ya normalizados (sin saber de la API).
// ============================================================
import axios from 'axios'

// Cliente axios preconfigurado con la URL base de DummyJSON
const clienteApi_jc = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 12000,
})

// Categorias tecnologicas que nos interesan comparar
const CATEGORIAS_TECH_JC = ['smartphones', 'laptops', 'tablets', 'mobile-accessories']

// Imagen de respaldo si un producto no trae miniatura
const IMAGEN_RESPALDO_JC =
  'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'

/**
 * Normaliza un producto crudo de DummyJSON a la forma simple que
 * consume nuestra interfaz, REDONDEANDO los numeros para que se vean
 * limpios (precio entero, rating a un decimal).
 */
const normalizarProducto_jc = (crudo_jc) => {
  if (!crudo_jc || !crudo_jc.title) return null
  return {
    id_jc: crudo_jc.id,
    nombre_jc: crudo_jc.title,
    marca_jc: crudo_jc.brand || 'Generico',
    categoria_jc: crudo_jc.category || 'tech',
    imagen_jc: crudo_jc.thumbnail || IMAGEN_RESPALDO_JC,
    // Redondeos para evitar numeros largos y feos en pantalla
    precio_jc: Math.round(Number(crudo_jc.price) || 0), // precio entero (USD)
    rating_jc: Math.round((Number(crudo_jc.rating) || 0) * 10) / 10, // 1 decimal
    stock_jc: Math.round(Number(crudo_jc.stock) || 0),
  }
}

/**
 * Obtiene productos tecnologicos reales de varias categorias y los
 * combina en una sola lista normalizada. Lanza error si falla la red.
 * @returns {Promise<Array>} Lista de productos normalizados.
 */
export const obtenerProductosTech_jc = async () => {
  // Pedimos cada categoria en paralelo para mayor velocidad
  const peticiones_jc = CATEGORIAS_TECH_JC.map((categoria_jc) =>
    clienteApi_jc
      .get(`/products/category/${categoria_jc}`, {
        params: { limit: 15, select: 'title,brand,price,rating,stock,category,thumbnail' },
      })
      .then((resp_jc) => resp_jc.data?.products || [])
      .catch(() => []), // Si una categoria falla, no rompe el resto
  )

  const grupos_jc = await Promise.all(peticiones_jc)
  // Aplanamos los grupos en una sola lista y normalizamos
  const listaCruda_jc = grupos_jc.flat()
  const normalizados_jc = listaCruda_jc.map(normalizarProducto_jc).filter(Boolean)

  if (normalizados_jc.length === 0) throw new Error('La API no devolvio productos')
  return normalizados_jc
}
