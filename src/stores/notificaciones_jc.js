import { defineStore } from 'pinia'
import { ref } from 'vue'

// ============================================================
// Store de notificaciones (Snackbar flotante global).
// Permite dar feedback visual al usuario tras cualquier accion
// (agregar al carrito, error de API, etc). Tipos: exito/error/info.
// ============================================================
export const useNotificacionesStore_jc = defineStore('notificaciones', () => {
  // Estado reactivo del snackbar
  const visible_jc = ref(false)
  const mensaje_jc = ref('')
  const tipo_jc = ref('exito') // 'exito' | 'error' | 'info'
  let temporizador_jc = null // Referencia al setTimeout activo

  // Muestra una notificacion y la oculta automaticamente a los 3s
  const mostrarNotificacion_jc = (texto_jc, tipoNotificacion_jc = 'exito') => {
    mensaje_jc.value = texto_jc
    tipo_jc.value = tipoNotificacion_jc
    visible_jc.value = true

    // Reiniciamos el temporizador anterior si existia
    if (temporizador_jc) clearTimeout(temporizador_jc)
    temporizador_jc = setTimeout(() => ocultarNotificacion_jc(), 3000)
  }

  // Oculta la notificacion de forma manual
  const ocultarNotificacion_jc = () => {
    visible_jc.value = false
  }

  return {
    visible_jc,
    mensaje_jc,
    tipo_jc,
    mostrarNotificacion_jc,
    ocultarNotificacion_jc,
  }
})
