<script setup>
// ============================================================
// TarjetaComparador_jc - Tarjeta de un producto tecnologico REAL
// del mercado (API DummyJSON). Muestra marca, imagen, precio nuevo,
// rating y stock. Es informativa (comparativa): sirve para que el
// cliente vea cuanto cuesta nuevo frente a nuestro precio refurbished.
// ============================================================
defineProps({
  producto_jc: { type: Object, required: true },
})
</script>

<template>
  <article
    class="elevar_coffiJean bg-marca-gris border border-marca-gris-claro rounded-2xl overflow-hidden flex flex-col h-full hover:border-marca-cyan hover:shadow-[0_0_22px_rgba(46,230,255,0.28)]"
  >
    <!-- Imagen del producto sobre fondo oscuro (acorde al tema, no blanco) -->
    <div class="relative bg-marca-oscuro aspect-square flex items-center justify-center p-4">
      <img
        :src="producto_jc.imagen_jc"
        :alt="producto_jc.nombre_jc"
        loading="lazy"
        class="max-h-full max-w-full object-contain"
      />
      <!-- Distintivo "Nuevo" (es precio de mercado sin reacondicionar) -->
      <span
        class="absolute top-3 left-3 bg-marca-cyan text-marca-negro text-xs font-bold px-2 py-1 rounded"
      >
        Nuevo
      </span>
    </div>

    <!-- Informacion del producto -->
    <div class="p-4 flex flex-col flex-grow">
      <span class="text-xs text-marca-cyan font-semibold uppercase tracking-wider mb-1 line-clamp-1">
        {{ producto_jc.marca_jc }}
      </span>
      <h3 class="text-sm font-bold text-white mb-3 line-clamp-2 flex-grow" :title="producto_jc.nombre_jc">
        {{ producto_jc.nombre_jc }}
      </h3>

      <!-- Precio de mercado + rating (datos reales redondeados de la API) -->
      <div class="flex items-center justify-between mb-3">
        <span class="text-marca-lima font-extrabold text-xl">${{ producto_jc.precio_jc }}</span>
        <span class="flex items-center gap-1 text-yellow-400 text-sm font-bold">
          <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" />
          </svg>
          {{ producto_jc.rating_jc }}
        </span>
      </div>

      <!-- Stock disponible -->
      <p class="text-[11px] text-gray-500 uppercase tracking-wide">
        Stock mercado: <span class="text-gray-300 font-bold">{{ producto_jc.stock_jc }}</span>
      </p>
    </div>
  </article>
</template>
