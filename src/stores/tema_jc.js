import { defineStore } from 'pinia'
import { ref } from 'vue'

// ============================================================
// Store del tema visual (modo oscuro / claro).
// Guarda la preferencia en localStorage y aplica/quita la clase
// 'claro' en el elemento <html>, que dispara los estilos del modo
// claro definidos en main.css. Por defecto la pagina es oscura.
// ============================================================
export const useTemaStore_jc = defineStore('tema', () => {
  // Leemos la preferencia guardada; si no hay, arrancamos en oscuro
  const guardado_jc = localStorage.getItem('tema_jc')
  const oscuro_jc = ref(guardado_jc ? guardado_jc === 'oscuro' : true)

  // Aplica el tema actual al documento y lo persiste
  const aplicarTema_jc = () => {
    const raiz_jc = document.documentElement
    if (oscuro_jc.value) raiz_jc.classList.remove('claro')
    else raiz_jc.classList.add('claro')
    localStorage.setItem('tema_jc', oscuro_jc.value ? 'oscuro' : 'claro')
  }

  // Cambia entre oscuro y claro
  const alternarTema_jc = () => {
    oscuro_jc.value = !oscuro_jc.value
    aplicarTema_jc()
  }

  // Aplicamos el tema al crear el store (al cargar la app)
  aplicarTema_jc()

  return { oscuro_jc, alternarTema_jc }
})
