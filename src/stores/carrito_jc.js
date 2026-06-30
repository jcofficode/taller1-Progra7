import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useNotificacionesStore_jc } from './notificaciones_jc.js'

// ============================================================
// Store del carrito de compras (zona de compras de la landing).
// Persiste en localStorage para no perder el carrito al recargar.
// Maneja cantidades respetando el stock disponible de cada producto.
// ============================================================
export const useCarritoStore_jc = defineStore('carrito', () => {
  // Recuperamos el carrito guardado en localStorage (o iniciamos vacio)
  const guardado_jc = localStorage.getItem('carrito_jc')
  const articulosCarrito_jc = ref(guardado_jc ? JSON.parse(guardado_jc) : [])

  // Sincronizamos con localStorage ante cualquier cambio profundo
  watch(
    articulosCarrito_jc,
    (nuevo_jc) => localStorage.setItem('carrito_jc', JSON.stringify(nuevo_jc)),
    { deep: true },
  )

  // Estado de apertura del drawer del carrito
  const carritoAbierto_jc = ref(false)
  const alternarCarrito_jc = () => (carritoAbierto_jc.value = !carritoAbierto_jc.value)
  const cerrarCarrito_jc = () => (carritoAbierto_jc.value = false)

  // Agrega un producto; si ya existe, incrementa su cantidad
  const agregarAlCarrito_jc = (producto_jc) => {
    const notificaciones_jc = useNotificacionesStore_jc()
    const existente_jc = articulosCarrito_jc.value.find((a_jc) => a_jc.id === producto_jc.id)

    if (existente_jc) {
      if (existente_jc.cantidad < existente_jc.stock) {
        existente_jc.cantidad++
        notificaciones_jc.mostrarNotificacion_jc(`Otra unidad de ${producto_jc.nombre}`, 'exito')
      } else {
        notificaciones_jc.mostrarNotificacion_jc('Alcanzaste el stock disponible', 'info')
      }
    } else {
      articulosCarrito_jc.value.push({ ...producto_jc, cantidad: 1 })
      notificaciones_jc.mostrarNotificacion_jc(`${producto_jc.nombre} agregado al carrito`, 'exito')
    }
  }

  // Elimina por completo un producto del carrito
  const removerDelCarrito_jc = (id_jc) => {
    const notificaciones_jc = useNotificacionesStore_jc()
    const articulo_jc = articulosCarrito_jc.value.find((a_jc) => a_jc.id === id_jc)
    if (articulo_jc) {
      articulosCarrito_jc.value = articulosCarrito_jc.value.filter((a_jc) => a_jc.id !== id_jc)
      notificaciones_jc.mostrarNotificacion_jc(`${articulo_jc.nombre} removido`, 'info')
    }
  }

  // Incrementa la cantidad respetando el limite de stock
  const incrementarCantidad_jc = (id_jc) => {
    const articulo_jc = articulosCarrito_jc.value.find((a_jc) => a_jc.id === id_jc)
    if (!articulo_jc) return
    if (articulo_jc.cantidad < articulo_jc.stock) {
      articulo_jc.cantidad++
    } else {
      useNotificacionesStore_jc().mostrarNotificacion_jc(
        `Solo quedan ${articulo_jc.stock} unidades`,
        'info',
      )
    }
  }

  // Disminuye la cantidad; si llega a 0 elimina el producto
  const disminuirCantidad_jc = (id_jc) => {
    const articulo_jc = articulosCarrito_jc.value.find((a_jc) => a_jc.id === id_jc)
    if (!articulo_jc) return
    if (articulo_jc.cantidad > 1) articulo_jc.cantidad--
    else removerDelCarrito_jc(id_jc)
  }

  const vaciarCarrito_jc = () => (articulosCarrito_jc.value = [])

  // Total monetario del carrito (precio * cantidad)
  const totalCarrito_jc = computed(() =>
    articulosCarrito_jc.value.reduce((t_jc, a_jc) => t_jc + a_jc.precio * a_jc.cantidad, 0),
  )

  // Numero total de unidades (para el globo del navbar)
  const totalUnidades_jc = computed(() =>
    articulosCarrito_jc.value.reduce((c_jc, a_jc) => c_jc + a_jc.cantidad, 0),
  )

  return {
    articulosCarrito_jc,
    carritoAbierto_jc,
    alternarCarrito_jc,
    cerrarCarrito_jc,
    agregarAlCarrito_jc,
    removerDelCarrito_jc,
    incrementarCantidad_jc,
    disminuirCantidad_jc,
    vaciarCarrito_jc,
    totalCarrito_jc,
    totalUnidades_jc,
  }
})
