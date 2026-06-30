import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useNotificacionesStore_jc } from './notificaciones_jc.js'

// ============================================================
// Store de favoritos (lista de deseos del usuario).
// Tambien persiste en localStorage. Permite marcar productos del
// equipos como favoritos y consultarlos en una vista aparte.
// ============================================================
export const useFavoritosStore_jc = defineStore('favoritos', () => {
  // Cargamos favoritos previos desde localStorage
  const guardado_jc = localStorage.getItem('favoritos_jc')
  const favoritos_jc = ref(guardado_jc ? JSON.parse(guardado_jc) : [])

  // Persistimos automaticamente ante cualquier cambio
  watch(
    favoritos_jc,
    (nuevo_jc) => localStorage.setItem('favoritos_jc', JSON.stringify(nuevo_jc)),
    { deep: true },
  )

  // Alterna un producto: lo agrega si no esta, lo quita si ya esta
  const alternarFavorito_jc = (producto_jc) => {
    const notificaciones_jc = useNotificacionesStore_jc()
    const indice_jc = favoritos_jc.value.findIndex((a_jc) => a_jc.id === producto_jc.id)

    if (indice_jc >= 0) {
      favoritos_jc.value.splice(indice_jc, 1)
      notificaciones_jc.mostrarNotificacion_jc(`${producto_jc.nombre} quitado de deseos`, 'info')
    } else {
      favoritos_jc.value.push(producto_jc)
      notificaciones_jc.mostrarNotificacion_jc(`${producto_jc.nombre} a tu lista de deseos`, 'exito')
    }
  }

  // Indica si un producto concreto esta en favoritos
  const esFavorito_jc = (id_jc) => favoritos_jc.value.some((a_jc) => a_jc.id === id_jc)

  // Cantidad de favoritos (para el navbar)
  const cantidadFavoritos_jc = computed(() => favoritos_jc.value.length)

  const vaciarFavoritos_jc = () => (favoritos_jc.value = [])

  return {
    favoritos_jc,
    alternarFavorito_jc,
    esFavorito_jc,
    cantidadFavoritos_jc,
    vaciarFavoritos_jc,
  }
})
