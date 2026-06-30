<script setup>
// ============================================================
// InicioView_jc - Landing Page de alta conversion de Refurbished.
// Estructura semantica HTML5 (header/section/article) orientada a
// SEO y conversion: Hero con CTA, beneficios, puntos de dolor,
// productos destacados (zona de compras), datos en vivo de la API,
// quienes somos, testimonios, FAQ y CTA final. Con efectos de
// aparicion al hacer scroll (directiva v-revelar) y glassmorphism.
// ============================================================
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductosStore_jc } from '../stores/productos_jc.js'
import { useComparadorStore_jc } from '../stores/comparador_jc.js'
import TarjetaProducto_jc from '../components/TarjetaProducto_jc.vue'
import TarjetaComparador_jc from '../components/TarjetaComparador_jc.vue'

const router_jc = useRouter()
const productosStore_jc = useProductosStore_jc()
const comparadorStore_jc = useComparadorStore_jc()

// Productos destacados para la mini-tienda de la landing
const destacados_jc = productosStore_jc.obtenerDestacados_jc(4)

// Al montar, pedimos datos en vivo a la API para la seccion comparativa
onMounted(() => comparadorStore_jc.cargarProductos_jc())

// Navegacion rapida
const irATienda_jc = () => router_jc.push('/tienda')
const irAComparador_jc = () => router_jc.push('/comparador')

// Datos estáticos de beneficios (modelo de la vista)
const beneficios_jc = ref([
  {
    id: 1,
    titulo: 'Ahorro Inteligente',
    desc: 'Equipos premium con hasta 50% de descuento frente a su precio nuevo.',
    // Icono: etiqueta de precio
    icono: 'M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3zM6 6h.008v.008H6V6z',
  },
  {
    id: 2,
    titulo: 'Calidad Certificada',
    desc: 'Cada dispositivo pasa 40 puntos de prueba de hardware y software.',
    // Icono: insignia de verificación
    icono: 'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.249-8.25-3.285z',
  },
  {
    id: 3,
    titulo: 'Garantía de 12 Meses',
    desc: 'Cobertura total ante cualquier defecto. Compra con total tranquilidad.',
    // Icono: escudo con check
    icono: 'M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12z',
  },
  {
    id: 4,
    titulo: 'Eco-Friendly',
    desc: 'Reacondicionar reduce la basura electrónica. Tecnología más sostenible.',
    // Icono: reciclaje / flechas
    icono: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99',
  },
])

// Testimonios (prueba social, clave en conversión)
const testimonios_jc = ref([
  { id: 1, autor: 'Laura G.', texto: 'Mi MacBook llegó impecable, nadie creería que es reacondicionada. Me ahorré más de $300.', estrellas: 5 },
  { id: 2, autor: 'Diego F.', texto: 'El envío fue rapidísimo y el teléfono funciona de 10. El soporte resolvió todas mis dudas.', estrellas: 5 },
  { id: 3, autor: 'Carla M.', texto: 'Perfecto para saltar a equipos de gama alta gastando mucho menos. Volveré a comprar seguro.', estrellas: 4 },
])

// Preguntas frecuentes (FAQ, mejora SEO y reduce fricciones)
const preguntas_jc = ref([
  { id: 1, pregunta: '¿Qué es un equipo reacondicionado?', respuesta: 'Es un dispositivo usado que fue restaurado a nivel de hardware y software, reemplazando piezas desgastadas, para que funcione y luzca como nuevo.' },
  { id: 2, pregunta: '¿Cómo funciona la garantía de 1 año?', respuesta: 'Cubre cualquier defecto de fábrica o falla en los componentes internos durante 12 meses. No cubre daños accidentales como caídas o agua.' },
  { id: 3, pregunta: '¿Puedo devolver mi pedido si no me gusta?', respuesta: 'Tienes 14 días desde la recepción para devolver el producto. Te reembolsamos o cambiamos el equipo sin complicaciones.' },
])
</script>

<template>
  <div class="landing_coffiJean">
    <!-- ===================== 1. HERO (Glassmorphism) ===================== -->
    <!-- Hero con imagen de fondo real y una tarjeta de vidrio esmerilado
         (glassmorphism) encima para un look premium y menos plano. -->
    <header id="hero_coffiJean" class="cabecera-img_coffiJean relative overflow-hidden min-h-[88vh] flex items-center">
      <!-- Capa de imagen de fondo + degradados (overlay suave para que se vea clara) -->
      <div class="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
          alt="Laptop reacondicionada con pantalla iluminada en ambiente oscuro"
          class="w-full h-full object-cover"
        />
        <!-- Overlays suaves: dejan ver mejor la imagen, oscureciendo
             solo lo justo (sobre todo a la izquierda, tras la tarjeta). -->
        <div class="absolute inset-0 bg-marca-negro/20"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-marca-negro via-transparent to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-marca-negro/80 via-marca-negro/20 to-transparent"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10 py-20">
        <!-- Tarjeta principal con efecto Glassmorphism (entra al cargar) -->
        <div class="vidrio_coffiJean entrar-hero_coffiJean rounded-3xl p-8 lg:p-12 max-w-2xl">
          <span class="inline-flex items-center gap-2 bg-marca-lima/15 text-marca-lima text-sm font-bold px-4 py-1.5 rounded-full mb-6 border border-marca-lima/40">
            <span class="h-2 w-2 rounded-full bg-marca-lima brillo-energia_coffiJean"></span>
            Tecnología reacondicionada premium
          </span>
          <h1 class="text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.05]">
            Tecnología premium a una
            <span class="texto-gradiente_coffiJean">fracción del costo.</span>
          </h1>
          <p class="text-lg lg:text-xl text-gray-200 mb-9 max-w-lg">
            Equipos reacondicionados con <strong class="text-marca-lima">garantía total</strong>.
            Dale una segunda vida a los mejores dispositivos sin sacrificar calidad ni estética.
          </p>
          <div class="flex flex-wrap gap-4">
            <button
              id="cta-hero_coffiJean"
              @click="irATienda_jc"
              class="cursor-pointer bg-marca-lima hover:bg-marca-lima-hover text-marca-negro font-bold py-4 px-8 rounded-xl transition text-lg brillo-energia_coffiJean"
            >
              Explorar catálogo
            </button>
            <button
              @click="irAComparador_jc"
              class="cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-4 px-8 rounded-xl transition text-lg"
            >
              Comparar precios
            </button>
          </div>
          <!-- Indicadores de confianza -->
          <div class="flex gap-8 mt-10 pt-8 border-t border-white/10">
            <div>
              <p class="text-3xl font-extrabold text-marca-lima">+10k</p>
              <p class="text-sm text-gray-300">Equipos restaurados</p>
            </div>
            <div>
              <p class="text-3xl font-extrabold text-marca-lima">12</p>
              <p class="text-sm text-gray-300">Meses de garantía</p>
            </div>
            <div>
              <p class="text-3xl font-extrabold text-marca-lima">-50%</p>
              <p class="text-sm text-gray-300">Frente a nuevo</p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- ===================== 2. BENEFICIOS ===================== -->
    <section id="beneficios_coffiJean" class="py-20 bg-marca-oscuro border-y border-marca-gris-claro">
      <div class="container mx-auto px-4">
        <h2 v-revelar class="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
          ¿Por qué comprar <span class="texto-gradiente_coffiJean">reacondicionado</span>?
        </h2>
        <p v-revelar="100" class="text-gray-400 text-center max-w-2xl mx-auto mb-14">
          La forma inteligente de tener la mejor tecnología: ahorras dinero y cuidas el planeta.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <article
            v-for="(beneficio_jc, indice_jc) in beneficios_jc"
            :key="beneficio_jc.id"
            v-revelar="indice_jc * 120"
            class="elevar_coffiJean group bg-marca-gris p-7 rounded-2xl border border-marca-gris-claro hover:border-marca-lima text-center"
          >
            <div class="bg-marca-negro w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-marca-gris-claro group-hover:border-marca-lima group-hover:bg-marca-lima/10 transition">
              <svg class="h-7 w-7 text-marca-lima group-hover:scale-110 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" :d="beneficio_jc.icono" />
              </svg>
            </div>
            <h3 class="text-lg font-bold mb-2 text-white">{{ beneficio_jc.titulo }}</h3>
            <p class="text-gray-400 text-sm leading-relaxed">{{ beneficio_jc.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ============ 3. SECCION DE CONTEXTO (PUNTOS DE DOLOR) ============ -->
    <!-- Ataca las creencias falsas y frustraciones del usuario para
         generar identificación antes de presentar la solución. -->
    <section id="contexto_coffiJean" class="py-20 bg-marca-negro">
      <div class="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div v-revelar>
          <span class="text-marca-magenta font-bold uppercase tracking-wider text-sm">El problema</span>
          <h2 class="text-3xl md:text-4xl font-bold text-white mt-2 mb-6">
            Pagar precio de <span class="text-marca-magenta">nuevo</span> ya no tiene sentido
          </h2>
          <ul class="space-y-4">
            <li class="flex items-start gap-3 text-gray-300">
              <span class="text-marca-magenta font-bold text-xl leading-none">&times;</span>
              Equipos nuevos carísimos que pierden la mitad de su valor en meses.
            </li>
            <li class="flex items-start gap-3 text-gray-300">
              <span class="text-marca-magenta font-bold text-xl leading-none">&times;</span>
              El mito de que "reacondicionado" significa dañado o de mala calidad.
            </li>
            <li class="flex items-start gap-3 text-gray-300">
              <span class="text-marca-magenta font-bold text-xl leading-none">&times;</span>
              Toneladas de basura electrónica que contaminan el planeta cada año.
            </li>
          </ul>
          <p class="text-white font-bold mt-6 text-lg">
            Refurbished cambia las reglas:
            <span class="text-marca-lima">misma calidad, mitad de precio, cero culpa.</span>
          </p>
        </div>
        <div v-revelar="150" class="relative">
          <div class="absolute inset-0 bg-marca-magenta rounded-full filter blur-[110px] opacity-10"></div>
          <img
            src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Dispositivos electrónicos reacondicionados"
            class="relative z-10 rounded-3xl border border-marca-gris-claro shadow-2xl hover:scale-[1.02] transition duration-500"
          />
        </div>
      </div>
    </section>

    <!-- ============ 4. ZONA DE COMPRAS (DESTACADOS) ============ -->
    <section id="destacados_coffiJean" class="py-20 bg-marca-oscuro border-y border-marca-gris-claro">
      <div class="container mx-auto px-4">
        <div v-revelar class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-2">Los más <span class="text-marca-lima">vendidos</span></h2>
            <p class="text-gray-400">Equipos reacondicionados estrella, listos para tu carrito.</p>
          </div>
          <button @click="irATienda_jc" class="text-marca-lima font-bold hover:underline whitespace-nowrap">
            Ver todo el catálogo &rarr;
          </button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(producto_jc, indice_jc) in destacados_jc"
            :key="producto_jc.id"
            v-revelar="indice_jc * 110"
          >
            <TarjetaProducto_jc :producto_jc="producto_jc" />
          </div>
        </div>
      </div>
    </section>

    <!-- ===== BANNER DE CONFIANZA (Glassmorphism sobre imagen real) =====
         Misma tecnica del hero: imagen de fondo real + tarjeta de vidrio
         esmerilado encima, para un look premium y menos plano. -->
    <section
      id="banner-confianza_coffiJean"
      class="cabecera-img_coffiJean relative overflow-hidden py-28 flex items-center"
    >
      <!-- Imagen de fondo (laptop premium) + overlays suaves.
           Oscurecemos sobre todo la izquierda, donde va la tarjeta,
           dejando visible la laptop a la derecha. -->
      <div class="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
          alt="Laptop ultradelgada reacondicionada mostrando informacion en pantalla"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-marca-negro/45"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-marca-negro/90 via-marca-negro/40 to-transparent"></div>
      </div>

      <!-- Tarjeta de vidrio esmerilado (glassmorphism) a la izquierda -->
      <div class="container mx-auto px-4 relative z-10 flex justify-center lg:justify-start">
        <div v-revelar class="vidrio_coffiJean rounded-3xl p-8 lg:p-10 max-w-xl">
          <span class="inline-block bg-marca-cyan/15 text-marca-cyan text-sm font-bold px-4 py-1.5 rounded-full mb-5 border border-marca-cyan/40">
            Confianza garantizada
          </span>
          <h2 class="text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
            Compra sin riesgo,
            <span class="texto-gradiente_coffiJean">evoluciona sin límites.</span>
          </h2>
          <p class="text-gray-200 mb-7">
            Cada equipo se restaura, se prueba y se certifica. Y si algo no te convence, te
            respaldamos. Así de simple.
          </p>

          <!-- Tres sellos de confianza -->
          <div class="grid grid-cols-3 gap-4 mb-8">
            <div class="text-center">
              <p class="text-2xl font-extrabold text-marca-lima">12</p>
              <p class="text-xs text-gray-300 mt-1">Meses de garantía</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-extrabold text-marca-lima">14</p>
              <p class="text-xs text-gray-300 mt-1">Días de devolución</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-extrabold text-marca-lima">24h</p>
              <p class="text-xs text-gray-300 mt-1">Envío express</p>
            </div>
          </div>

          <button
            @click="irATienda_jc"
            class="cursor-pointer bg-marca-lima hover:bg-marca-lima-hover text-marca-negro font-bold py-3 px-8 rounded-xl transition brillo-energia_coffiJean"
          >
            Explorar catálogo
          </button>
        </div>
      </div>
    </section>

    <!-- ============ 5. DATOS EN VIVO DE LA API ============ -->
    <section id="mercado_coffiJean" class="py-20 bg-marca-negro">
      <div class="container mx-auto px-4">
        <div v-revelar class="text-center mb-12">
          <span class="inline-block bg-marca-cyan/10 text-marca-cyan text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-marca-cyan/30">
            Precios reales en vivo - DummyJSON
          </span>
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-2">Mira cuánto ahorras</h2>
          <p class="text-gray-400 max-w-2xl mx-auto">
            Estos son precios de equipos NUEVOS en el mercado, traídos en directo de una API pública.
            Compara: con nosotros pagas mucho menos por el mismo rendimiento.
          </p>
        </div>

        <!-- Cargando -->
        <div v-if="comparadorStore_jc.cargando_jc" class="flex justify-center py-10">
          <div class="w-12 h-12 border-4 border-marca-gris-claro border-t-marca-lima rounded-full animate-spin"></div>
        </div>
        <!-- Error -->
        <p v-else-if="comparadorStore_jc.hayError_jc" class="text-center text-gray-500 py-6">
          No pudimos cargar los datos en vivo en este momento.
        </p>
        <!-- Grid de 4 ejemplos -->
        <div v-else class="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            v-for="(producto_jc, indice_jc) in comparadorStore_jc.listaProductos_jc.slice(0, 4)"
            :key="producto_jc.id_jc"
            v-revelar="indice_jc * 110"
          >
            <TarjetaComparador_jc :producto_jc="producto_jc" />
          </div>
        </div>
        <div class="text-center mt-10">
          <button @click="irAComparador_jc" class="bg-marca-cyan/90 hover:bg-marca-cyan text-marca-negro font-bold py-3 px-7 rounded-xl transition">
            Abrir el comparador completo
          </button>
        </div>
      </div>
    </section>

    <!-- ============ 6. PRESENTACIÓN / QUIÉNES SOMOS (AUTORIDAD) ============ -->
    <!-- Establece la autoridad del emisor: quiénes somos y por qué
         confiar en la marca. Refuerza la credibilidad antes del cierre. -->
    <section id="quienes-somos_coffiJean" class="py-20 bg-marca-oscuro border-t border-marca-gris-claro">
      <div class="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div v-revelar class="order-2 lg:order-1 relative">
          <img
            src="https://images.unsplash.com/photo-1526738549149-8e07eca6c147?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Taller técnico de reacondicionamiento de Refurbished"
            class="rounded-3xl border border-marca-gris-claro shadow-2xl hover:scale-[1.02] transition duration-500"
          />
        </div>
        <div v-revelar="150" class="order-1 lg:order-2">
          <span class="text-marca-lima font-bold uppercase tracking-wider text-sm">Quiénes somos</span>
          <h2 class="text-3xl md:text-4xl font-bold text-white mt-2 mb-6">
            Técnicos obsesionados con la <span class="text-marca-lima">perfección</span>
          </h2>
          <p class="text-gray-400 leading-relaxed mb-6">
            Somos un equipo de ingenieros y técnicos certificados apasionados por la tecnología
            sostenible. Cada equipo que vendes pasa por nuestro laboratorio, donde lo restauramos,
            probamos en 40 puntos y certificamos antes de enviarlo a tu casa.
          </p>
          <!-- Sellos de autoridad / confianza -->
          <div class="grid grid-cols-3 gap-4 text-center">
            <div class="bg-marca-gris border border-marca-gris-claro rounded-xl py-4">
              <p class="text-2xl font-extrabold text-marca-lima">40</p>
              <p class="text-xs text-gray-500 mt-1">Puntos de prueba</p>
            </div>
            <div class="bg-marca-gris border border-marca-gris-claro rounded-xl py-4">
              <p class="text-2xl font-extrabold text-marca-lima">ISO</p>
              <p class="text-xs text-gray-500 mt-1">Calidad certificada</p>
            </div>
            <div class="bg-marca-gris border border-marca-gris-claro rounded-xl py-4">
              <p class="text-2xl font-extrabold text-marca-lima">24h</p>
              <p class="text-xs text-gray-500 mt-1">Envío express</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== 7. TESTIMONIOS ===================== -->
    <section id="testimonios_coffiJean" class="py-20 bg-marca-negro">
      <div class="container mx-auto px-4">
        <h2 v-revelar class="text-3xl md:text-4xl font-bold text-center text-white mb-14">
          Lo que dice <span class="text-marca-lima">la comunidad</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <figure
            v-for="(testimonio_jc, indice_jc) in testimonios_jc"
            :key="testimonio_jc.id"
            v-revelar="indice_jc * 130"
            class="elevar_coffiJean bg-marca-gris p-6 rounded-2xl border border-marca-gris-claro hover:border-marca-lima/60"
          >
            <div class="flex text-marca-lima mb-4">
              <svg v-for="n_jc in testimonio_jc.estrellas" :key="n_jc" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" />
              </svg>
            </div>
            <blockquote class="text-gray-300 italic mb-4">"{{ testimonio_jc.texto }}"</blockquote>
            <figcaption class="text-white font-bold">- {{ testimonio_jc.autor }}</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- ===================== 8. FAQ ===================== -->
    <section id="faq_coffiJean" class="py-20 bg-marca-oscuro border-t border-marca-gris-claro">
      <div class="container mx-auto px-4 max-w-3xl">
        <h2 v-revelar class="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Preguntas <span class="text-marca-lima">frecuentes</span>
        </h2>
        <div class="space-y-5">
          <details
            v-for="(faq_jc, indice_jc) in preguntas_jc"
            :key="faq_jc.id"
            v-revelar="indice_jc * 90"
            class="bg-marca-gris border border-marca-gris-claro p-6 rounded-xl group hover:border-marca-lima/50 transition"
          >
            <summary class="text-lg font-bold text-white cursor-pointer flex justify-between items-center">
              {{ faq_jc.pregunta }}
              <span class="text-marca-lima group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
            </summary>
            <p class="text-gray-400 mt-3 pt-3 border-t border-marca-gris-claro">{{ faq_jc.respuesta }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- ===================== 9. CTA FINAL ===================== -->
    <section id="cta-final_coffiJean" class="py-24 bg-marca-negro relative overflow-hidden text-center rejilla-fondo_coffiJean">
      <div class="absolute inset-0 bg-marca-lima opacity-5 blur-3xl scale-150"></div>
      <div v-revelar class="container mx-auto px-4 relative z-10">
        <h2 class="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          ¿Listo para <span class="texto-gradiente_coffiJean">evolucionar</span>?
        </h2>
        <p class="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Conecta con la mejor tecnología sostenible y dile adiós a los precios exorbitantes.
        </p>
        <button
          @click="irATienda_jc"
          class="bg-marca-lima hover:bg-marca-lima-hover text-marca-negro font-bold py-4 px-10 rounded-xl transition text-xl brillo-energia_coffiJean hover:scale-105"
        >
          Ver el catalogo
        </button>
      </div>
    </section>
  </div>
</template>
