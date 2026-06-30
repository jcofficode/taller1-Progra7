<script setup>
// ============================================================
// FavoritosView_jc - Lista de deseos del usuario. Muestra los
// productos marcados como favoritos (persistidos en localStorage)
// reutilizando la misma TarjetaProducto_jc de la tienda.
// ============================================================
import { useRouter } from 'vue-router'
import { useFavoritosStore_jc } from '../stores/favoritos_jc.js'
import TarjetaProducto_jc from '../components/TarjetaProducto_jc.vue'

const router_jc = useRouter()
const favoritosStore_jc = useFavoritosStore_jc()

const irATienda_jc = () => router_jc.push('/tienda')
</script>

<template>
  <div id="favoritos_coffiJean" class="bg-marca-negro min-h-screen">
    <!-- Cabecera con imagen de fondo de tecnologia -->
    <div class="cabecera-img_coffiJean relative overflow-hidden py-14 border-b border-marca-gris-claro mb-10">
      <div class="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1526738549149-8e07eca6c147?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
          alt="Escritorio tecnologico"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-marca-negro/85"></div>
      </div>
      <header class="container mx-auto px-4 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-4xl font-extrabold text-white mb-2">Mis <span class="texto-gradiente_coffiJean">Deseos</span></h1>
          <p class="text-gray-300">{{ favoritosStore_jc.cantidadFavoritos_jc }} producto(s) en tu lista.</p>
        </div>
        <button
          v-if="favoritosStore_jc.cantidadFavoritos_jc > 0"
          @click="favoritosStore_jc.vaciarFavoritos_jc()"
          class="text-gray-300 border border-marca-gris-claro hover:border-red-500 hover:text-red-400 font-bold py-2 px-5 rounded-lg transition self-start"
        >
          Vaciar lista
        </button>
      </header>
    </div>

    <div class="container mx-auto px-4 pb-12">
      <!-- Con favoritos -->
      <div
        v-if="favoritosStore_jc.cantidadFavoritos_jc > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="(producto_jc, indice_jc) in favoritosStore_jc.favoritos_jc"
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
        <svg class="h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
        <h3 class="text-2xl font-bold text-white mb-2">Aún no tienes favoritos</h3>
        <p class="text-gray-400 mb-6">Marca el corazón en los productos que te gusten para guardarlos aquí.</p>
        <button
          @click="irATienda_jc"
          class="bg-marca-lima hover:bg-marca-lima-hover text-marca-negro font-bold py-2.5 px-6 rounded-lg transition"
        >
          Explorar la tienda
        </button>
      </div>
    </div>
  </div>
</template>
