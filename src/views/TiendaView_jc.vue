<script setup>
// ============================================================
// TiendaView_jc - Zona de compras del catalogo Refurbished.
// Buscador por texto, filtro por categoria (derivado del modelo)
// y ordenamiento por precio. Reutiliza TarjetaProducto_jc.
// ============================================================
import { ref, computed } from 'vue'
import { useProductosStore_jc } from '../stores/productos_jc.js'
import TarjetaProducto_jc from '../components/TarjetaProducto_jc.vue'

const productosStore_jc = useProductosStore_jc()

// Estado reactivo de los filtros
const busqueda_jc = ref('')
const categoria_jc = ref('Todas')
const orden_jc = ref('defecto') // 'precioAsc' | 'precioDesc'

// Categorias disponibles derivadas dinamicamente del catalogo
const categorias_jc = computed(() => {
  const set_jc = new Set(productosStore_jc.productos_jc.map((p_jc) => p_jc.categoria))
  return ['Todas', ...set_jc]
})

// Resultado: filtra (delegando en el store) y luego ordena
const productosFiltrados_jc = computed(() => {
  let resultado_jc = productosStore_jc.buscarProductos_jc(busqueda_jc.value, categoria_jc.value)
  resultado_jc = [...resultado_jc]
  if (orden_jc.value === 'precioAsc') resultado_jc.sort((a, b) => a.precio - b.precio)
  else if (orden_jc.value === 'precioDesc') resultado_jc.sort((a, b) => b.precio - a.precio)
  return resultado_jc
})

// Restablece todos los filtros
const limpiarFiltros_jc = () => {
  busqueda_jc.value = ''
  categoria_jc.value = 'Todas'
  orden_jc.value = 'defecto'
}
</script>

<template>
  <div id="tienda_coffiJean" class="bg-marca-negro min-h-screen">
    <!-- Cabecera con imagen de fondo de tecnologia -->
    <header class="cabecera-img_coffiJean relative overflow-hidden py-16 border-b border-marca-gris-claro mb-12">
      <div class="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
          alt="Equipos electronicos reacondicionados"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-marca-negro/80"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-marca-negro to-transparent"></div>
      </div>
      <div v-revelar class="container mx-auto px-4 text-center relative z-10">
        <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-3">
          Catálogo <span class="texto-gradiente_coffiJean">Refurbished</span>
        </h1>
        <p class="text-gray-200 max-w-2xl mx-auto">
          Equipos reacondicionados certificados, con garantía de 12 meses. Encuentra tu próximo
          dispositivo al mejor precio.
        </p>
      </div>
    </header>

    <div class="container mx-auto px-4 pb-12">

      <!-- Barra de filtros (grid responsivo para que ningun control se recorte) -->
      <div
        id="filtros_coffiJean"
        class="bg-marca-gris border border-marca-gris-claro p-6 rounded-2xl mb-10 grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
      >
        <!-- Buscador -->
        <div class="md:col-span-5">
          <label for="input-buscar_coffiJean" class="block text-gray-400 text-sm font-bold mb-2">Buscar producto</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z" />
              </svg>
            </span>
            <input
              id="input-buscar_coffiJean"
              v-model="busqueda_jc"
              type="text"
              placeholder="Ej: iPhone, MacBook, iPad..."
              class="w-full bg-marca-negro border border-marca-gris-claro rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-marca-lima transition"
            />
          </div>
        </div>

        <!-- Filtro categoria -->
        <div class="md:col-span-2">
          <label for="select-categoria_coffiJean" class="block text-gray-400 text-sm font-bold mb-2">Categoría</label>
          <select
            id="select-categoria_coffiJean"
            v-model="categoria_jc"
            class="w-full bg-marca-negro border border-marca-gris-claro rounded-lg py-3 pl-4 pr-8 text-white focus:outline-none focus:border-marca-lima transition cursor-pointer"
          >
            <option v-for="cat_jc in categorias_jc" :key="cat_jc" :value="cat_jc">{{ cat_jc }}</option>
          </select>
        </div>

        <!-- Ordenar precio -->
        <div class="md:col-span-3">
          <label for="select-orden_coffiJean" class="block text-gray-400 text-sm font-bold mb-2">Ordenar por</label>
          <select
            id="select-orden_coffiJean"
            v-model="orden_jc"
            class="w-full bg-marca-negro border border-marca-gris-claro rounded-lg py-3 pl-4 pr-8 text-white focus:outline-none focus:border-marca-lima transition cursor-pointer"
          >
            <option value="defecto">Más relevantes</option>
            <option value="precioAsc">Precio: menor a mayor</option>
            <option value="precioDesc">Precio: mayor a menor</option>
          </select>
        </div>

        <!-- Limpiar filtros -->
        <div class="md:col-span-2">
          <button
            @click="limpiarFiltros_jc"
            class="w-full bg-marca-gris-claro hover:bg-marca-lima hover:text-marca-negro text-white font-bold py-3 px-6 rounded-lg transition whitespace-nowrap"
          >
            Limpiar
          </button>
        </div>
      </div>

      <!-- Contador -->
      <p class="text-gray-400 text-sm mb-6">
        Mostrando <strong class="text-white">{{ productosFiltrados_jc.length }}</strong> productos
      </p>

      <!-- Grid de resultados -->
      <div
        v-if="productosFiltrados_jc.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="(producto_jc, indice_jc) in productosFiltrados_jc"
          :key="producto_jc.id"
          v-revelar="(indice_jc % 4) * 80"
        >
          <TarjetaProducto_jc :producto_jc="producto_jc" />
        </div>
      </div>

      <!-- Estado vacio -->
      <div
        v-else
        class="py-20 flex flex-col items-center text-center bg-marca-gris border border-marca-gris-claro rounded-2xl"
      >
        <svg class="h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 0 1 5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
        </svg>
        <h3 class="text-2xl font-bold text-white mb-2">Sin coincidencias</h3>
        <p class="text-gray-400 mb-6">Prueba ajustando tu búsqueda o tus filtros.</p>
        <button
          @click="limpiarFiltros_jc"
          class="text-marca-lima border border-marca-lima hover:bg-marca-lima hover:text-marca-negro font-bold py-2 px-6 rounded-lg transition"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  </div>
</template>
