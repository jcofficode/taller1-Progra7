<script setup>
// ============================================================
// TarjetaProducto_jc - Tarjeta de un equipo reacondicionado.
// Componente reutilizable (capa VISTA). Muestra imagen, etiqueta,
// precio y permite: agregar al carrito, ajustar cantidad, marcar
// favorito y abrir un modal de detalle (Headless UI).
// ============================================================
import { computed, ref } from 'vue'
import { useCarritoStore_jc } from '../stores/carrito_jc.js'
import { useFavoritosStore_jc } from '../stores/favoritos_jc.js'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

// Prop: el producto a renderizar (con sufijo _jc por convencion)
const props_jc = defineProps({
  producto_jc: { type: Object, required: true },
})

const carritoStore_jc = useCarritoStore_jc()
const favoritosStore_jc = useFavoritosStore_jc()

// Acciones envueltas para el template
const agregar_jc = () => carritoStore_jc.agregarAlCarrito_jc(props_jc.producto_jc)
const incrementar_jc = () => carritoStore_jc.incrementarCantidad_jc(props_jc.producto_jc.id)
const disminuir_jc = () => carritoStore_jc.disminuirCantidad_jc(props_jc.producto_jc.id)
const alternarFavorito_jc = () => favoritosStore_jc.alternarFavorito_jc(props_jc.producto_jc)

// Estado derivado: este producto ya esta en el carrito? es favorito?
const itemCarrito_jc = computed(() =>
  carritoStore_jc.articulosCarrito_jc.find((a_jc) => a_jc.id === props_jc.producto_jc.id),
)
const esFavorito_jc = computed(() => favoritosStore_jc.esFavorito_jc(props_jc.producto_jc.id))

// Control del modal de detalle
const mostrarDetalle_jc = ref(false)
</script>

<template>
  <article
    :id="'tarjeta-' + producto_jc.id + '_coffiJean'"
    class="elevar_coffiJean bg-marca-gris border border-marca-gris-claro rounded-2xl overflow-hidden flex flex-col h-full group hover:border-marca-lima hover:shadow-[0_0_25px_rgba(198,255,46,0.3)] tarjeta_coffiJean"
  >
    <!-- Imagen + acciones flotantes -->
    <div class="relative overflow-hidden aspect-square bg-marca-oscuro">
      <img
        :src="producto_jc.imagen"
        :alt="producto_jc.nombre"
        loading="lazy"
        class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
      />
      <!-- Etiqueta promocional (z-20 para quedar sobre el overlay) -->
      <span
        v-if="producto_jc.etiqueta"
        class="absolute top-3 left-3 z-20 bg-marca-lima text-marca-negro text-xs font-bold px-2 py-1 rounded"
      >
        {{ producto_jc.etiqueta }}
      </span>
      <!-- Boton favorito (z-20 para recibir el clic por encima del overlay).
           Usa la clase btn-favorito_coffiJean para que su icono se vea claro
           en ambos modos (oscuro y claro), ya que flota sobre un circulo oscuro. -->
      <button
        @click="alternarFavorito_jc"
        class="btn-favorito_coffiJean absolute top-3 right-3 z-20 cursor-pointer p-2 bg-marca-negro/60 rounded-full hover:bg-marca-negro/80 transition"
        :class="{ 'es-favorito_coffiJean': esFavorito_jc }"
        aria-label="Marcar favorito"
      >
        <svg class="h-5 w-5" :fill="esFavorito_jc ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0z" />
        </svg>
      </button>
      <!-- Overlay con boton ver detalle.
           pointer-events-none deja pasar los clics al corazon; solo el
           boton interior recibe eventos (pointer-events-auto). -->
      <div class="absolute inset-0 z-10 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center pointer-events-none">
        <button
          @click="mostrarDetalle_jc = true"
          class="pointer-events-auto cursor-pointer bg-marca-lima text-marca-negro font-bold py-2 px-5 rounded-lg scale-90 group-hover:scale-100 transition"
        >
          Ver detalle
        </button>
      </div>
    </div>

    <!-- Info -->
    <div class="p-5 flex flex-col flex-grow">
      <span class="text-xs text-marca-cyan font-semibold uppercase tracking-wider mb-1">{{ producto_jc.categoria }}</span>
      <h3 class="text-lg font-bold text-white mb-2 line-clamp-1" :title="producto_jc.nombre">{{ producto_jc.nombre }}</h3>
      <p class="text-sm text-gray-400 mb-4 line-clamp-2 flex-grow">{{ producto_jc.descripcion }}</p>

      <div class="flex items-center justify-between mt-auto">
        <div class="flex flex-col leading-tight">
          <!-- Precio de mercado (nuevo) tachado, para resaltar el ahorro -->
          <span v-if="producto_jc.precioMercado_jc" class="text-xs text-gray-500 line-through">
            ${{ producto_jc.precioMercado_jc }} nuevo
          </span>
          <span class="text-marca-lima font-extrabold text-2xl">${{ producto_jc.precio }}</span>
        </div>

        <!-- Si no esta en el carrito: boton agregar -->
        <button
          v-if="!itemCarrito_jc"
          @click="agregar_jc"
          class="bg-marca-gris-claro hover:bg-marca-lima text-white hover:text-marca-negro font-semibold py-2 px-4 rounded-lg transition text-sm"
        >
          Agregar
        </button>
        <!-- Si ya esta: controles de cantidad -->
        <div v-else class="flex items-center bg-marca-negro rounded-lg border border-marca-gris-claro">
          <button @click="disminuir_jc" class="px-3 py-1.5 text-gray-300 hover:text-white">-</button>
          <span class="px-2 font-bold w-8 text-center text-white">{{ itemCarrito_jc.cantidad }}</span>
          <button
            @click="incrementar_jc"
            :disabled="itemCarrito_jc.cantidad >= producto_jc.stock"
            :class="itemCarrito_jc.cantidad >= producto_jc.stock ? 'opacity-40 cursor-not-allowed' : 'hover:text-white'"
            class="px-3 py-1.5 text-gray-300"
          >+</button>
        </div>
      </div>
    </div>
  </article>

  <!-- Modal de detalle del producto -->
  <TransitionRoot as="template" :show="mostrarDetalle_jc">
    <Dialog as="div" class="relative z-50" @close="mostrarDetalle_jc = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/70 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="ease-out duration-300" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100"
            leave="ease-in duration-200" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-marca-gris border border-marca-gris-claro shadow-2xl flex flex-col md:flex-row">
              <div class="w-full md:w-2/5 aspect-square md:aspect-auto bg-marca-oscuro">
                <img :src="producto_jc.imagen" :alt="producto_jc.nombre" class="w-full h-full object-cover" />
              </div>
              <div class="p-6 md:p-8 w-full md:w-3/5 flex flex-col">
                <div class="flex items-start justify-between mb-2">
                  <DialogTitle as="h3" class="text-2xl font-bold text-white">{{ producto_jc.nombre }}</DialogTitle>
                  <button @click="mostrarDetalle_jc = false" class="text-gray-400 hover:text-white" aria-label="Cerrar">
                    <XMarkIcon class="h-6 w-6" />
                  </button>
                </div>
                <div class="flex flex-wrap gap-2 mb-4">
                  <span class="bg-marca-negro border border-marca-gris-claro text-marca-lima text-xs font-bold px-3 py-1 rounded">{{ producto_jc.categoria }}</span>
                  <span v-if="producto_jc.condicion" class="bg-marca-negro border border-marca-gris-claro text-marca-cyan text-xs font-bold px-3 py-1 rounded">{{ producto_jc.condicion }}</span>
                </div>
                <p class="text-gray-300 text-sm leading-relaxed mb-6">{{ producto_jc.descripcion }}</p>

                <div class="mt-auto pt-6 border-t border-marca-gris-claro flex items-center justify-between">
                  <div class="flex flex-col leading-tight">
                    <!-- Precio de mercado tachado + ahorro frente a nuevo -->
                    <span v-if="producto_jc.precioMercado_jc" class="text-sm text-gray-500 line-through">
                      ${{ producto_jc.precioMercado_jc }} nuevo
                    </span>
                    <span class="text-3xl font-extrabold text-marca-lima">${{ producto_jc.precio }}</span>
                    <span v-if="producto_jc.precioMercado_jc" class="text-xs text-marca-cyan font-bold mt-1">
                      Ahorras ${{ producto_jc.precioMercado_jc - producto_jc.precio }}
                    </span>
                  </div>
                  <button
                    v-if="!itemCarrito_jc"
                    @click="agregar_jc"
                    class="bg-marca-lima hover:bg-marca-lima-hover text-marca-negro font-bold py-2.5 px-6 rounded-lg transition"
                  >
                    Agregar al carrito
                  </button>
                  <div v-else class="flex items-center bg-marca-negro rounded-lg border border-marca-gris-claro">
                    <button @click="disminuir_jc" class="px-4 py-2 text-gray-300 hover:text-white font-bold">-</button>
                    <span class="px-3 font-bold w-10 text-center text-white">{{ itemCarrito_jc.cantidad }}</span>
                    <button
                      @click="incrementar_jc"
                      :disabled="itemCarrito_jc.cantidad >= producto_jc.stock"
                      :class="itemCarrito_jc.cantidad >= producto_jc.stock ? 'opacity-40 cursor-not-allowed' : 'hover:text-white'"
                      class="px-4 py-2 text-gray-300 font-bold"
                    >+</button>
                  </div>
                </div>
                <p v-if="producto_jc.stock <= 6" class="text-xs text-marca-magenta mt-3 text-right">¡Quedan pocas unidades ({{ producto_jc.stock }})!</p>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
