import { createRouter, createWebHistory } from 'vue-router'
// Importacion de las vistas (capa VISTA/CONTROLADOR del patron MVC)
import InicioView_jc from '../views/InicioView_jc.vue'
import TiendaView_jc from '../views/TiendaView_jc.vue'
import ComparadorView_jc from '../views/ComparadorView_jc.vue'
import FavoritosView_jc from '../views/FavoritosView_jc.vue'

// ============================================================
// Definicion de rutas de la SPA de Refurbished. Cada ruta mapea una
// URL a una vista. El meta.titulo se usa para el <title> dinamico.
// ============================================================
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'inicio', component: InicioView_jc, meta: { titulo: 'Refurbished | Inicio' } },
    {
      path: '/tienda',
      name: 'tienda',
      component: TiendaView_jc,
      meta: { titulo: 'Refurbished | Catalogo' },
    },
    {
      path: '/comparador',
      name: 'comparador',
      component: ComparadorView_jc,
      meta: { titulo: 'Refurbished | Comparador de Tecnologia' },
    },
    {
      path: '/favoritos',
      name: 'favoritos',
      component: FavoritosView_jc,
      meta: { titulo: 'Refurbished | Mis Deseos' },
    },
  ],
  // Siempre subir al inicio de la pagina al cambiar de ruta
  scrollBehavior() {
    return { top: 0 }
  },
})

// Actualiza el titulo del documento segun la ruta (mejora SEO/UX)
router.afterEach((to) => {
  document.title = to.meta?.titulo || 'Refurbished'
})

export default router
