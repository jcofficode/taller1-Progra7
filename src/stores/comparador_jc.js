import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { obtenerProductosTech_jc } from '../services/apiComparador_jc.js'
import { useNotificacionesStore_jc } from './notificaciones_jc.js'

// ============================================================
// Store del comparador (datos en vivo de la API DummyJSON).
// Corazon del "Comparador de tecnologia": descarga una vez los
// productos tech del mercado y expone:
//  - estado de carga / error
//  - filtros REACTIVOS (texto, categoria, orden) que la API alimenta
//  - un computed con la lista ya filtrada y ordenada
// Asi el buscador y los filtros de la pagina son 100% dinamicos.
// ============================================================
export const useComparadorStore_jc = defineStore('comparador', () => {
  // ---- Estado base ----
  const listaProductos_jc = ref([]) // Productos normalizados de la API
  const cargando_jc = ref(false)
  const hayError_jc = ref(false)
  const yaCargado_jc = ref(false) // Cache: evita volver a pedir si ya hay datos

  // ---- Estado de los filtros (controlado desde la vista) ----
  const filtroTexto_jc = ref('') // Buscador por nombre o marca
  const filtroCategoria_jc = ref('Todas') // Categoria seleccionada
  const orden_jc = ref('defecto') // 'precioAsc' | 'precioDesc' | 'ratingDesc'

  // Carga los datos desde la API (solo la primera vez)
  const cargarProductos_jc = async () => {
    if (yaCargado_jc.value) return
    cargando_jc.value = true
    hayError_jc.value = false
    try {
      listaProductos_jc.value = await obtenerProductosTech_jc()
      yaCargado_jc.value = true
    } catch (error_jc) {
      console.error('Error al consultar DummyJSON:', error_jc)
      hayError_jc.value = true
      useNotificacionesStore_jc().mostrarNotificacion_jc(
        'No se pudo conectar con el catalogo de tecnologia',
        'error',
      )
    } finally {
      cargando_jc.value = false
    }
  }

  // Categorias disponibles, derivadas DINAMICAMENTE de la API.
  // De aqui se alimenta el <select> de filtros (no esta hardcodeado).
  const categoriasDisponibles_jc = computed(() => {
    const set_jc = new Set(listaProductos_jc.value.map((p_jc) => p_jc.categoria_jc))
    return ['Todas', ...[...set_jc].sort()]
  })

  // Resultado final: aplica buscador + filtro de categoria + orden.
  const productosFiltrados_jc = computed(() => {
    let resultado_jc = [...listaProductos_jc.value]

    // 1. Buscador por texto (nombre o marca)
    if (filtroTexto_jc.value) {
      const texto_jc = filtroTexto_jc.value.toLowerCase()
      resultado_jc = resultado_jc.filter(
        (p_jc) =>
          p_jc.nombre_jc.toLowerCase().includes(texto_jc) ||
          p_jc.marca_jc.toLowerCase().includes(texto_jc),
      )
    }

    // 2. Filtro por categoria
    if (filtroCategoria_jc.value !== 'Todas') {
      resultado_jc = resultado_jc.filter((p_jc) => p_jc.categoria_jc === filtroCategoria_jc.value)
    }

    // 3. Ordenamiento por precio o rating
    if (orden_jc.value === 'precioAsc') resultado_jc.sort((a, b) => a.precio_jc - b.precio_jc)
    else if (orden_jc.value === 'precioDesc') resultado_jc.sort((a, b) => b.precio_jc - a.precio_jc)
    else if (orden_jc.value === 'ratingDesc') resultado_jc.sort((a, b) => b.rating_jc - a.rating_jc)

    return resultado_jc
  })

  // Restablece todos los filtros a su valor inicial
  const limpiarFiltros_jc = () => {
    filtroTexto_jc.value = ''
    filtroCategoria_jc.value = 'Todas'
    orden_jc.value = 'defecto'
  }

  return {
    listaProductos_jc,
    cargando_jc,
    hayError_jc,
    filtroTexto_jc,
    filtroCategoria_jc,
    orden_jc,
    categoriasDisponibles_jc,
    productosFiltrados_jc,
    cargarProductos_jc,
    limpiarFiltros_jc,
  }
})
