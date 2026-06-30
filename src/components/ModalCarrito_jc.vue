<script setup>
// ============================================================
// ModalCarrito_jc - Drawer lateral del carrito (Headless UI).
// Lista los articulos, permite ajustar cantidades, remover y
// realizar un checkout simulado. Lee y muta el store del carrito.
// ============================================================
import { useRouter } from 'vue-router'
import { useCarritoStore_jc } from '../stores/carrito_jc.js'
import { useNotificacionesStore_jc } from '../stores/notificaciones_jc.js'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon, ShoppingBagIcon, TrashIcon } from '@heroicons/vue/24/outline'

const carritoStore_jc = useCarritoStore_jc()
const router_jc = useRouter()

// Atajos para usar en el template
const cerrar_jc = () => carritoStore_jc.cerrarCarrito_jc()

// Cierra el carrito y navega a la tienda (boton del estado vacio)
const irATienda_jc = () => {
  carritoStore_jc.cerrarCarrito_jc()
  router_jc.push('/tienda')
}
const incrementar_jc = (id_jc) => carritoStore_jc.incrementarCantidad_jc(id_jc)
const disminuir_jc = (id_jc) => carritoStore_jc.disminuirCantidad_jc(id_jc)
const remover_jc = (id_jc) => carritoStore_jc.removerDelCarrito_jc(id_jc)

// Checkout simulado: muestra feedback y vacia el carrito tras 2s
const procederAlPago_jc = () => {
  if (carritoStore_jc.articulosCarrito_jc.length === 0) return
  const notificaciones_jc = useNotificacionesStore_jc()
  carritoStore_jc.cerrarCarrito_jc()
  notificaciones_jc.mostrarNotificacion_jc('Procesando pago seguro...', 'info')
  setTimeout(() => {
    carritoStore_jc.vaciarCarrito_jc()
    notificaciones_jc.mostrarNotificacion_jc('¡Pago exitoso! Tu compra va en camino.', 'exito')
  }, 2000)
}
</script>

<template>
  <TransitionRoot as="template" :show="carritoStore_jc.carritoAbierto_jc">
    <Dialog as="div" id="modal-carrito_coffiJean" class="relative z-50" @close="cerrar_jc">
      <!-- Fondo oscuro -->
      <TransitionChild
        as="template"
        enter="ease-in-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <!-- Panel deslizante -->
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-300"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col bg-marca-oscuro shadow-xl border-l border-marca-gris-claro">
                  <!-- Encabezado -->
                  <div class="flex items-center justify-between p-4 border-b border-marca-gris-claro">
                    <DialogTitle class="text-xl font-bold text-white flex items-center">
                      <ShoppingBagIcon class="h-6 w-6 mr-2 text-marca-lima" />
                      Tu Carrito
                    </DialogTitle>
                    <button @click="cerrar_jc" class="p-2 text-gray-400 hover:text-white transition" aria-label="Cerrar">
                      <XMarkIcon class="h-6 w-6" />
                    </button>
                  </div>

                  <!-- Contenido -->
                  <div class="flex-1 overflow-y-auto px-4 py-6 text-gray-200">
                    <!-- Estado vacio -->
                    <div
                      v-if="carritoStore_jc.articulosCarrito_jc.length === 0"
                      class="flex flex-col items-center justify-center h-full text-gray-500"
                    >
                      <ShoppingBagIcon class="h-16 w-16 mb-4 opacity-40" />
                      <p class="text-lg">Tu carrito está vacío</p>
                      <button @click="irATienda_jc" class="mt-4 text-marca-lima hover:underline">Ir a la tienda</button>
                    </div>

                    <!-- Lista de articulos -->
                    <ul v-else role="list" class="divide-y divide-marca-gris-claro">
                      <li
                        v-for="articulo_jc in carritoStore_jc.articulosCarrito_jc"
                        :key="articulo_jc.id"
                        class="flex py-5"
                      >
                        <div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-marca-gris-claro bg-marca-gris">
                          <img :src="articulo_jc.imagen" :alt="articulo_jc.nombre" class="h-full w-full object-cover" />
                        </div>
                        <div class="ml-4 flex flex-1 flex-col">
                          <div class="flex justify-between text-base font-medium text-white">
                            <h3 class="line-clamp-1 pr-2">{{ articulo_jc.nombre }}</h3>
                            <p class="text-marca-lima whitespace-nowrap">${{ articulo_jc.precio }}</p>
                          </div>
                          <div class="flex flex-1 items-end justify-between text-sm mt-2">
                            <!-- Controles de cantidad -->
                            <div class="flex items-center bg-marca-negro rounded border border-marca-gris-claro">
                              <button @click="disminuir_jc(articulo_jc.id)" class="px-3 py-1 text-gray-300 hover:text-white">-</button>
                              <span class="px-2 font-bold w-8 text-center">{{ articulo_jc.cantidad }}</span>
                              <button
                                @click="incrementar_jc(articulo_jc.id)"
                                :disabled="articulo_jc.cantidad >= articulo_jc.stock"
                                :class="articulo_jc.cantidad >= articulo_jc.stock ? 'opacity-40 cursor-not-allowed' : 'hover:text-white'"
                                class="px-3 py-1 text-gray-300"
                              >+</button>
                            </div>
                            <button @click="remover_jc(articulo_jc.id)" class="text-gray-500 hover:text-red-500 flex items-center">
                              <TrashIcon class="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <!-- Footer con total y checkout -->
                  <div
                    v-if="carritoStore_jc.articulosCarrito_jc.length > 0"
                    class="border-t border-marca-gris-claro px-4 py-6"
                  >
                    <div class="flex justify-between text-base font-medium text-white">
                      <p>Subtotal</p>
                      <p class="text-marca-lima text-xl font-bold">${{ carritoStore_jc.totalCarrito_jc }}</p>
                    </div>
                    <p class="mt-1 text-sm text-gray-400">Envío e impuestos calculados al pagar.</p>
                    <button
                      id="btn-checkout_coffiJean"
                      @click="procederAlPago_jc"
                      class="mt-5 flex w-full items-center justify-center rounded-lg bg-marca-lima px-6 py-3 text-base font-bold text-marca-negro shadow-[0_0_18px_rgba(198,255,46,0.5)] hover:bg-marca-lima-hover transition"
                    >
                      Proceder al pago
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
