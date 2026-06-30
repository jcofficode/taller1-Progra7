// ============================================================
// revelar_jc.js - Directiva personalizada "v-revelar".
// Anima la aparicion de un elemento cuando entra en pantalla
// (efecto reveal on scroll) usando IntersectionObserver, que es
// eficiente y nativo del navegador. Se aplica en las plantillas
// como v-revelar y, opcionalmente, un retraso: v-revelar="150".
// ============================================================
export const revelar_jc = {
  // 'mounted' se ejecuta cuando el elemento ya esta en el DOM
  mounted(elemento_jc, enlace_jc) {
    // Estado inicial: oculto y desplazado (clase definida en main.css)
    elemento_jc.classList.add('revelar_coffiJean')

    // Si se paso un valor (v-revelar="200"), lo usamos como retraso en ms
    const retraso_jc = Number(enlace_jc.value) || 0
    elemento_jc.style.transitionDelay = `${retraso_jc}ms`

    // Observador que detecta cuando el elemento es visible en el viewport
    const observador_jc = new IntersectionObserver(
      (entradas_jc) => {
        entradas_jc.forEach((entrada_jc) => {
          if (entrada_jc.isIntersecting) {
            // Al entrar en pantalla, agregamos la clase que lo revela
            entrada_jc.target.classList.add('visible_coffiJean')
            // Dejamos de observar: la animacion ocurre una sola vez
            observador_jc.unobserve(entrada_jc.target)
          }
        })
      },
      { threshold: 0.12 }, // Se dispara cuando ~12% del elemento es visible
    )

    observador_jc.observe(elemento_jc)
  },
}
