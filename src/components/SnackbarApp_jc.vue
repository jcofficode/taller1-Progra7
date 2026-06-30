<script setup>
// ============================================================
// SnackbarApp_jc - Notificacion flotante global (esquina inferior).
// Lee su estado del store de notificaciones y se autodestruye.
// Cambia color/icono segun el tipo: exito / error / info.
// ============================================================
import { useNotificacionesStore_jc } from '../stores/notificaciones_jc.js'

const notificacionesStore_jc = useNotificacionesStore_jc()
const ocultar_jc = () => notificacionesStore_jc.ocultarNotificacion_jc()
</script>

<template>
  <transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-4 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition ease-in duration-150"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="notificacionesStore_jc.visible_jc"
      id="snackbar_coffiJean"
      class="fixed bottom-5 right-5 z-[60] max-w-sm w-full bg-marca-gris border border-marca-gris-claro shadow-2xl rounded-xl overflow-hidden flex snackbar_coffiJean"
    >
      <!-- Barra lateral de color segun tipo -->
      <div
        class="w-1.5 flex-shrink-0"
        :class="{
          'bg-marca-lima': notificacionesStore_jc.tipo_jc === 'exito',
          'bg-red-500': notificacionesStore_jc.tipo_jc === 'error',
          'bg-marca-cyan': notificacionesStore_jc.tipo_jc === 'info',
        }"
      ></div>

      <div class="flex-grow p-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <!-- Icono exito -->
          <svg
            v-if="notificacionesStore_jc.tipo_jc === 'exito'"
            class="h-6 w-6 text-marca-lima flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
          </svg>
          <!-- Icono error -->
          <svg
            v-else-if="notificacionesStore_jc.tipo_jc === 'error'"
            class="h-6 w-6 text-red-500 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <!-- Icono info -->
          <svg
            v-else
            class="h-6 w-6 text-marca-cyan flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>

          <p class="text-white text-sm font-medium pr-2">{{ notificacionesStore_jc.mensaje_jc }}</p>
        </div>

        <button @click="ocultar_jc" class="text-gray-400 hover:text-white transition ml-2" aria-label="Cerrar">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </transition>
</template>
