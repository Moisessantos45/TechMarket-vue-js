<template>
  <header class="header">
    <div class="overlay"></div>
    <div class="content">
      <h1 class="title">TechMarket</h1>
      <p class="subtitle">
        Enjoy the best shopping experience with us and get the best deals on the
        market.
      </p>
    </div>
    <div
      class="absolute top-5 right-5 p-3 rounded-full content_card cursor-pointer"
      @click="toggleCart"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M17 17h-11v-14h-2" />
        <path d="M6 5l14 1l-1 7h-13" />
      </svg>
      <span
        class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
      >
        {{ cartItemCount }}
      </span>
    </div>

    <!-- Cart Modal -->
    <div
      v-if="isCartOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
    >
      <div class="bg-white w-full max-w-md h-full overflow-y-auto p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-gray-800">Your Cart</h2>
          <button @click="toggleCart" class="text-gray-600 hover:text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          v-if="products.length === 0"
          class="text-center text-gray-600 my-8"
        >
          Your cart is empty
        </div>
        <div v-else>
          <div
            v-for="item in products"
            :key="item.id"
            class="flex items-center justify-between border-b border-gray-200 py-4"
          >
            <div class="flex items-center">
              <img
                :src="item.images[1]"
                :alt="item.title"
                class="w-16 h-16 object-cover mr-4"
              />
              <div>
                <h3 class="text-lg font-semibold text-gray-800">
                  {{ item.title }}
                </h3>
                <p class="text-gray-600">${{ item.price.toFixed(2) }}</p>
                <div class="flex items-center mt-2">
                  <button
                    @click="decrementQuantity(item)"
                    class="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-minus"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M5 12l14 0" />
                    </svg>
                  </button>
                  <span class="mx-2 text-gray-800">{{ item.quantity }}</span>
                  <button
                    @click="incrementQuantity(item)"
                    class="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-plus"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 5l0 14" />
                      <path d="M5 12l14 0" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <button
              @click="removeFromCart(item)"
              class="text-red-500 hover:text-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div class="mt-6">
            <div
              class="flex justify-between items-center text-lg font-semibold text-gray-800"
            >
              <span>Total:</span>
              <span>${{ totalPrice.toFixed(2) }}</span>
            </div>
            <button
              class="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ProductCart } from "../entitis/entitis";
import showToastNotification from "../service/notification";

const isCartOpen = ref(false);
const props = defineProps({
  products: {
    type: Array as () => ProductCart[],
    required: true,
  },
});

const emit = defineEmits(["update:products"]);

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

const removeFromCart = (item: ProductCart) => {
  const index = props.products.findIndex((cartItem) => cartItem.id === item.id);
  if (index !== -1) {
    props.products.splice(index, 1);
  }
  emit("update:products", props.products);
  localStorage.setItem("productList", JSON.stringify(props.products));
  showToastNotification("Product removed from cart", true);
};

const incrementQuantity = (item: ProductCart) => {
  item.quantity++;
  localStorage.setItem("productList", JSON.stringify(props.products));
  emit("update:products", props.products);
};

const decrementQuantity = (item: ProductCart) => {
  if (item.quantity > 1) {
    item.quantity--;
  } else {
    removeFromCart(item);
  }
  localStorage.setItem("productList", JSON.stringify(props.products));
  emit("update:products", props.products);
};

const cartItemCount = computed(() => {
  return props.products.reduce((total, item) => total + item.quantity, 0);
});

const totalPrice = computed(() => {
  return props.products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
});
</script>

<style scoped>
.header {
  position: relative;
  width: 100%;
  height: 60vh;
  background-image: url("https://static.vecteezy.com/system/resources/previews/001/750/557/non_2x/online-shopping-and-e-commerce-banner-vector.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 1rem;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.25rem;
  max-width: 600px;
  margin: 0 auto;
}

.content_card {
  z-index: 2;
}

@media (max-width: 768px) {
  .header {
    height: 50vh;
  }

  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .header {
    height: 40vh;
  }

  .title {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 0.875rem;
  }
}
</style>
