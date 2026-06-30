<script setup>
// ============================================================
// NavbarApp_jc - Barra de navegacion global de Refurbished.
// Fija arriba (sticky), con enlaces a las vistas, contador de
// favoritos y boton del carrito con globo de unidades reactivo.
// ============================================================
import { ref, computed } from 'vue'
import { useCarritoStore_jc } from '../stores/carrito_jc.js'
import { useFavoritosStore_jc } from '../stores/favoritos_jc.js'
import { useTemaStore_jc } from '../stores/tema_jc.js'

// Stores necesarios para los contadores del navbar
const carritoStore_jc = useCarritoStore_jc()
const favoritosStore_jc = useFavoritosStore_jc()
const temaStore_jc = useTemaStore_jc() // Modo claro/oscuro

// Contadores reactivos
const unidadesCarrito_jc = computed(() => carritoStore_jc.totalUnidades_jc)
const cantidadFavoritos_jc = computed(() => favoritosStore_jc.cantidadFavoritos_jc)

// Estado del menu hamburguesa en moviles
const menuAbierto_jc = ref(false)
const alternarMenu_jc = () => (menuAbierto_jc.value = !menuAbierto_jc.value)
</script>

<template>
  <header
    id="navbar_coffiJean"
    class="bg-marca-oscuro/95 backdrop-blur border-b border-marca-gris-claro sticky top-0 z-50 shadow-lg navbar_coffiJean"
  >
    <nav class="container mx-auto px-4 flex justify-between items-center h-16">
      <!-- Logotipo: chip + nombre de marca -->
      <RouterLink to="/" class="flex items-center gap-2 group logo_coffiJean">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          class="h-8 w-8 text-marca-lima group-hover:scale-110 transition"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
          />
        </svg>
        <span class="text-2xl font-extrabold tracking-tight text-white">
          REFUR<span class="text-marca-lima">BISHED</span>
        </span>
      </RouterLink>

      <!-- Enlaces de escritorio -->
      <div class="hidden md:flex items-center gap-8">
        <RouterLink
          to="/"
          class="text-gray-300 hover:text-marca-lima transition font-medium"
          active-class="text-marca-lima font-bold"
          >Inicio</RouterLink
        >
        <RouterLink
          to="/tienda"
          class="text-gray-300 hover:text-marca-lima transition font-medium"
          active-class="text-marca-lima font-bold"
          >Tienda</RouterLink
        >
        <RouterLink
          to="/comparador"
          class="text-marca-lima/90 hover:text-marca-lima transition font-bold flex items-center gap-1"
          active-class="text-white drop-shadow-[0_0_8px_rgba(198,255,46,0.8)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="size-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h12M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
            />
          </svg>
          Comparador
        </RouterLink>
      </div>

      <!-- Acciones a la derecha: tema + favoritos + carrito + hamburguesa -->
      <div class="flex items-center gap-2">
        <!-- Boton de modo claro/oscuro (sol cuando esta oscuro) -->
        <button
          @click="temaStore_jc.alternarTema_jc()"
          class="p-2 text-gray-300 hover:text-marca-lima transition"
          :title="temaStore_jc.oscuro_jc ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
          aria-label="Cambiar tema"
        >
          <!-- Sol: visible en modo oscuro (invita a aclarar) -->
          <svg v-if="temaStore_jc.oscuro_jc" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
          <!-- Luna: visible en modo claro (invita a oscurecer) -->
          <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>
        </button>

        <!-- Favoritos -->
        <RouterLink
          to="/favoritos"
          class="relative p-2 text-gray-300 hover:text-marca-lima transition"
          title="Lista de deseos"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0z"
            />
          </svg>
          <span
            v-if="cantidadFavoritos_jc > 0"
            class="absolute top-0 right-0 bg-marca-magenta text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
          >
            {{ cantidadFavoritos_jc }}
          </span>
        </RouterLink>

        <!-- Carrito -->
        <button
          id="btn-carrito_coffiJean"
          @click="carritoStore_jc.alternarCarrito_jc()"
          class="relative p-2 text-gray-300 hover:text-marca-lima transition"
          title="Carrito de compras"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z"
            />
          </svg>
          <span
            v-if="unidadesCarrito_jc > 0"
            id="globo-carrito_coffiJean"
            class="absolute top-0 right-0 bg-marca-lima text-marca-negro text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
          >
            {{ unidadesCarrito_jc }}
          </span>
        </button>

        <!-- Boton hamburguesa (solo movil) -->
        <button
          @click="alternarMenu_jc"
          class="md:hidden p-2 text-gray-300 hover:text-marca-lima transition"
          aria-label="Abrir menú"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Menu desplegable en moviles -->
    <div
      v-if="menuAbierto_jc"
      class="md:hidden border-t border-marca-gris-claro bg-marca-oscuro px-4 py-4 flex flex-col gap-3"
    >
      <RouterLink @click="menuAbierto_jc = false" to="/" class="text-gray-300 hover:text-marca-lima">Inicio</RouterLink>
      <RouterLink @click="menuAbierto_jc = false" to="/tienda" class="text-gray-300 hover:text-marca-lima">Tienda</RouterLink>
      <RouterLink @click="menuAbierto_jc = false" to="/comparador" class="text-marca-lima font-bold">Comparador</RouterLink>
      <RouterLink @click="menuAbierto_jc = false" to="/favoritos" class="text-gray-300 hover:text-marca-lima">Mis Deseos</RouterLink>
    </div>
  </header>
</template>
