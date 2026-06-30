// ============================================================
// main.js - Punto de entrada de la aplicacion Refurbished.
// Crea la instancia de Vue, registra Pinia (manejo de estado) y
// Vue Router (navegacion), e inyecta los estilos globales.
// ============================================================
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { revelar_jc } from './directivas/revelar_jc.js'

const app_jc = createApp(App)

app_jc.use(createPinia()) // Estado global (stores)
app_jc.use(router) // Enrutado de vistas

// Directiva global de animacion al hacer scroll (uso: v-revelar)
app_jc.directive('revelar', revelar_jc)

app_jc.mount('#app')
