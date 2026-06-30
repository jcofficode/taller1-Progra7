<script setup>
// ============================================================
// FooterApp_jc - Pie de pagina global con info de marca, enlaces
// de navegacion, redes sociales y aviso legal. Usa <footer>
// semantico para SEO. Ano calculado dinamicamente.
// ============================================================
const anioActual_jc = new Date().getFullYear()

// Redes sociales con su icono de marca real (paths SVG oficiales)
const redes_jc = [
  {
    nombre: 'Instagram',
    url: 'https://instagram.com',
    icono: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    nombre: 'X (Twitter)',
    url: 'https://x.com',
    icono: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    nombre: 'YouTube',
    url: 'https://youtube.com',
    icono: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
]
</script>

<template>
  <footer
    id="footer_coffiJean"
    class="bg-marca-oscuro border-t border-marca-gris-claro pt-14 pb-8 footer_coffiJean"
  >
    <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
      <!-- Columna de marca -->
      <div class="md:col-span-2">
        <div class="flex items-center gap-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-7 w-7 text-marca-lima">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
          </svg>
          <span class="text-xl font-extrabold text-white">REFUR<span class="text-marca-lima">BISHED</span></span>
        </div>
        <p class="text-gray-400 max-w-md leading-relaxed mb-5">
          Tecnología reacondicionada premium con garantía total. Dale una segunda vida a los mejores
          dispositivos del mercado: ahorra dinero y cuida el planeta.
        </p>
        <!-- Datos de contacto (requisito de la guia de landing) -->
        <ul class="space-y-2 text-gray-400 text-sm">
          <li class="flex items-center gap-2">
            <svg class="h-4 w-4 text-marca-lima" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            <a href="mailto:hola@refurbished.com" class="hover:text-marca-lima transition">hola@refurbished.com</a>
          </li>
          <li class="flex items-center gap-2">
            <svg class="h-4 w-4 text-marca-lima" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z" />
            </svg>
            <a href="tel:+584120000000" class="hover:text-marca-lima transition">+58 412 000 0000</a>
          </li>
        </ul>
      </div>

      <!-- Columna de navegación -->
      <nav aria-label="Enlaces del sitio">
        <h3 class="text-white font-bold mb-4 uppercase text-sm tracking-wider">Navegación</h3>
        <ul class="space-y-2 text-gray-400">
          <li><RouterLink to="/" class="hover:text-marca-lima transition">Inicio</RouterLink></li>
          <li><RouterLink to="/tienda" class="hover:text-marca-lima transition">Tienda</RouterLink></li>
          <li><RouterLink to="/comparador" class="hover:text-marca-lima transition">Comparador</RouterLink></li>
          <li><RouterLink to="/favoritos" class="hover:text-marca-lima transition">Mis Deseos</RouterLink></li>
        </ul>
      </nav>

      <!-- Columna de redes -->
      <div>
        <h3 class="text-white font-bold mb-4 uppercase text-sm tracking-wider">Síguenos</h3>
        <div class="flex gap-3">
          <a
            v-for="red_jc in redes_jc"
            :key="red_jc.nombre"
            :href="red_jc.url"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="red_jc.nombre"
            :title="red_jc.nombre"
            class="h-10 w-10 rounded-full bg-marca-gris border border-marca-gris-claro flex items-center justify-center text-gray-300 hover:bg-marca-lima hover:text-marca-negro hover:scale-110 transition"
          >
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path :d="red_jc.icono" />
            </svg>
          </a>
        </div>
        <p class="text-gray-500 text-sm mt-4">Tecnología que revive, planeta que respira.</p>
      </div>
    </div>

    <!-- Linea legal inferior -->
    <div class="container mx-auto px-4 mt-10 pt-6 border-t border-marca-gris-claro text-center text-gray-500 text-sm">
      &copy; {{ anioActual_jc }} Refurbished - Taller Parte 1 Vue - Jean Coffi - Profesor Ronald Palacios. 
    </div>
  </footer>
</template>
