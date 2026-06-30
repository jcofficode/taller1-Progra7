<script setup>
// ============================================================
// ComparadorView_jc - Comparador de tecnologia alimentado por la
// API publica DummyJSON. Cumple el requisito de integrar una API
// externa afin a la tematica: aqui el BUSCADOR y los FILTROS
// (categoria, orden por precio/rating) se nutren de datos reales
// de equipos NUEVOS del mercado, para contrastar contra nuestros
// precios reacondicionados.
// ============================================================
import { onMounted } from 'vue'
import { useComparadorStore_jc } from '../stores/comparador_jc.js'
import TarjetaComparador_jc from '../components/TarjetaComparador_jc.vue'

const comparadorStore_jc = useComparadorStore_jc()

// Al entrar a la vista, disparamos la carga de datos (con cache interno)
onMounted(() => comparadorStore_jc.cargarProductos_jc())
</script>

<template>
  <div id="comparador_coffiJean" class="bg-marca-negro min-h-screen">
    <!-- Banner superior con imagen de fondo de tecnologia -->
    <header class="cabecera-img_coffiJean relative overflow-hidden py-20 border-b border-marca-gris-claro">
      <div class="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
          alt="Dispositivos tecnologicos sobre un escritorio"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-marca-negro/80"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-marca-negro to-transparent"></div>
      </div>
      <div v-revelar class="container mx-auto px-4 text-center relative z-10 max-w-3xl">
        <span class="inline-block bg-marca-cyan/15 text-marca-cyan text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-marca-cyan/40">
          API en vivo - DummyJSON
        </span>
        <h1 class="text-4xl lg:text-5xl font-extrabold text-white mb-4">
          Comparador de <span class="texto-gradiente_coffiJean">Tecnología</span>
        </h1>
        <p class="text-gray-200 text-lg">
          Precios reales de equipos NUEVOS en el mercado. Busca, filtra por categoría y ordena por
          precio o valoración para ver cuánto ahorras comprando reacondicionado con nosotros.
        </p>
      </div>
    </header>

    <!-- Panel de filtros (alimentado por la API) -->
    <section class="bg-marca-oscuro border-b border-marca-gris-claro py-6">
      <div class="container mx-auto px-4">
        <div class="bg-marca-gris border border-marca-gris-claro p-6 rounded-2xl grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <!-- Buscador -->
          <div class="md:col-span-2">
            <label for="buscar-tech_coffiJean" class="block text-gray-400 text-sm font-bold mb-2">Buscar equipo o marca</label>
            <input
              id="buscar-tech_coffiJean"
              v-model="comparadorStore_jc.filtroTexto_jc"
              type="text"
              placeholder="Ej: iPhone, Samsung, MacBook..."
              class="w-full bg-marca-negro border border-marca-gris-claro rounded-lg py-3 px-4 text-white focus:outline-none focus:border-marca-lima transition"
            />
          </div>

          <!-- Filtro categoria (opciones derivadas de la API) -->
          <div>
            <label for="filtro-categoria-tech_coffiJean" class="block text-gray-400 text-sm font-bold mb-2">Categoría</label>
            <select
              id="filtro-categoria-tech_coffiJean"
              v-model="comparadorStore_jc.filtroCategoria_jc"
              class="w-full bg-marca-negro border border-marca-gris-claro rounded-lg py-3 px-4 text-white focus:outline-none focus:border-marca-lima transition"
            >
              <option v-for="cat_jc in comparadorStore_jc.categoriasDisponibles_jc" :key="cat_jc" :value="cat_jc">
                {{ cat_jc }}
              </option>
            </select>
          </div>

          <!-- Orden -->
          <div>
            <label for="filtro-orden-tech_coffiJean" class="block text-gray-400 text-sm font-bold mb-2">Ordenar por</label>
            <select
              id="filtro-orden-tech_coffiJean"
              v-model="comparadorStore_jc.orden_jc"
              class="w-full bg-marca-negro border border-marca-gris-claro rounded-lg py-3 px-4 text-white focus:outline-none focus:border-marca-lima transition"
            >
              <option value="defecto">Relevancia</option>
              <option value="precioAsc">Precio: menor a mayor</option>
              <option value="precioDesc">Precio: mayor a menor</option>
              <option value="ratingDesc">Mejor valorados</option>
            </select>
          </div>
        </div>

        <div class="flex justify-between items-center mt-4">
          <p class="text-gray-400 text-sm">
            <strong class="text-white">{{ comparadorStore_jc.productosFiltrados_jc.length }}</strong> equipos encontrados
          </p>
          <button
            @click="comparadorStore_jc.limpiarFiltros_jc()"
            class="text-marca-lima hover:underline text-sm font-bold"
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </section>

    <!-- Resultados -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <!-- Cargando -->
        <div v-if="comparadorStore_jc.cargando_jc" class="flex flex-col items-center py-24">
          <div class="w-16 h-16 border-4 border-marca-gris-claro border-t-marca-lima rounded-full animate-spin mb-4"></div>
          <p class="text-gray-400">Consultando el catálogo de tecnología...</p>
        </div>

        <!-- Error -->
        <div v-else-if="comparadorStore_jc.hayError_jc" class="text-center py-24">
          <p class="text-red-400 text-lg font-bold mb-2">No se pudo conectar con la API</p>
          <button
            @click="comparadorStore_jc.cargarProductos_jc()"
            class="mt-2 bg-marca-lima text-marca-negro font-bold py-2 px-6 rounded-lg hover:bg-marca-lima-hover transition"
          >
            Reintentar
          </button>
        </div>

        <!-- Sin resultados tras filtrar -->
        <div v-else-if="comparadorStore_jc.productosFiltrados_jc.length === 0" class="text-center py-24">
          <p class="text-gray-400 text-lg">No hay equipos que coincidan con tus filtros.</p>
        </div>

        <!-- Grid de productos tech -->
        <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          <div
            v-for="(producto_jc, indice_jc) in comparadorStore_jc.productosFiltrados_jc"
            :key="producto_jc.id_jc"
            v-revelar="(indice_jc % 5) * 70"
          >
            <TarjetaComparador_jc :producto_jc="producto_jc" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
