<template>
  <section
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6"
  >
    <div
      class="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105 flex flex-col"
      v-for="item in products"
      :key="item.id"
    >
      <figure class="relative">
        <img
          class="w-full h-48 object-cover"
          :src="
            item.images[1] ??
            'https://www.tecnobytemx.com/cdn/shop/files/X3360.png?v=1694191607&width=675'
          "
          :alt="item.title"
        />
        <figcaption
          class="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 w-full text-center"
        >
          {{ item.title }}
        </figcaption>
      </figure>
      <div class="p-4 flex flex-col flex-grow">
        <p class="text-gray-700 mb-2 flex-grow">
          {{
            (item.description.length > 20
              ? item.description
              : description
            ).substring(0, 100)
          }}
        </p>
        <h1 class="text-lg font-bold text-gray-900 mb-4">${{ item.price }}</h1>
        <button
          @click="$emit('addToCart', item)"
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Add to cart
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Product } from "../entitis/entitis";

defineProps({
  products: {
    type: Array<Product>,
    required: true,
  },
});

defineEmits(["addToCart"]);

const description = ` Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          animi perferendis veniam fugiat magnam et, veritatis minima quisquam
          voluptatem dolorum culpa dolor ipsum maxime inventore. Repellat
          numquam hic voluptatibus? Fugit.`;
</script>
