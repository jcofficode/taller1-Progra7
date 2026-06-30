import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db_jc } from '../data/db_jc.js'

// ============================================================
// Store de productos (catalogo de equipos reacondicionados Refurbished).
// Es el MODELO del catalogo: expone los datos y las acciones de
// busqueda/filtrado puro. Las vistas consumen estas funciones.
// ============================================================
export const useProductosStore_jc = defineStore('productos', () => {
  // Arreglo reactivo con todos los productos cargados desde db_jc
  const productos_jc = ref(db_jc)

  // Devuelve los primeros N productos como "destacados" para la landing
  const obtenerDestacados_jc = (cantidad_jc = 4) => {
    return productos_jc.value.slice(0, cantidad_jc)
  }

  // Busca productos por texto (nombre/descripcion) y categoria.
  // Funcion pura: no muta el estado, solo retorna el subconjunto.
  const buscarProductos_jc = (consulta_jc, categoria_jc = 'Todas') => {
    let resultado_jc = productos_jc.value

    // 1. Filtro por categoria (si no es 'Todas')
    if (categoria_jc && categoria_jc !== 'Todas') {
      resultado_jc = resultado_jc.filter((p_jc) => p_jc.categoria === categoria_jc)
    }

    // 2. Filtro por texto de busqueda (insensible a mayusculas)
    if (consulta_jc) {
      const texto_jc = consulta_jc.toLowerCase()
      resultado_jc = resultado_jc.filter(
        (p_jc) =>
          p_jc.nombre.toLowerCase().includes(texto_jc) ||
          p_jc.descripcion.toLowerCase().includes(texto_jc),
      )
    }

    return resultado_jc
  }

  return {
    productos_jc,
    obtenerDestacados_jc,
    buscarProductos_jc,
  }
})
