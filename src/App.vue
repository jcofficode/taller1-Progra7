<script setup>
// ============================================================
// App.vue - Componente raiz de la aplicacion Refurbished.
// Define el esqueleto global: barra de navegacion, contenedor de
// las vistas (RouterView), pie de pagina, y los elementos flotantes
// globales (carrito y notificaciones).
// ============================================================
import { RouterView } from 'vue-router'
import NavbarApp_jc from './components/NavbarApp_jc.vue'
import FooterApp_jc from './components/FooterApp_jc.vue'
import ModalCarrito_jc from './components/ModalCarrito_jc.vue'
import SnackbarApp_jc from './components/SnackbarApp_jc.vue'
</script>

<template>
  <div id="app-root_coffiJean" class="min-h-screen flex flex-col font-sans text-gray-200">
    <!-- Navegacion global fija -->
    <NavbarApp_jc />

    <!-- Aqui se inyectan las vistas segun la ruta activa -->
    <main class="flex-grow">
      <RouterView />
    </main>

    <!-- Pie de pagina global -->
    <FooterApp_jc />

    <!-- Elementos flotantes globales -->
    <ModalCarrito_jc />
    <SnackbarApp_jc />
  </div>
</template>
