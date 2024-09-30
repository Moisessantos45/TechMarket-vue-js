<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import getProducts from "./api/api";
import Cards from "./components/Cards.vue";
import { onMounted, ref } from "vue";
import { Product, ProductCart } from "./entitis/entitis";
import showToastNotification from "./service/notification";

const products = ref<Product[]>([]);
const productListRef = ref<ProductCart[]>([]);
// const productListRef = ref<ProductCart[]>([]);

onMounted(async () => {
  const data: Product[] = await getProducts();
  const newList = data.slice(0, 36);
  const filteredImagesWithQuotes = newList.map((item) => {
    const images: string[] = item.images.map((image) =>
      image.replace(/[\[\]\"]/g, "")
    );
    item.images = images;
    return item;
  });

  products.value = filteredImagesWithQuotes;
   const productListLocal = localStorage.getItem("productList") || "[]";
  productListRef.value = JSON.parse(productListLocal);
});

const addToCart = (product: Product) => {
  const existingItem = productListRef.value.find(
    (item) => item.id === product.id
  );
  if (existingItem) {
    existingItem.quantity++;
    showToastNotification("Product added to cart", true);
  } else {
    const newProduct: ProductCart = {
      ...product,
      quantity: 1,
    };
    productListRef.value.push(newProduct);
    showToastNotification("Product added to cart", true);
  }
  localStorage.setItem("productList", JSON.stringify(productListRef.value));
};
</script>

<template>
  <Header :products="productListRef" />
  <main class="w-11/12 mx-auto mt-5">
    <div class="flex justify-center items-center p-3">
      <h1 class="text-2xl font-bold uppercase">Welcome to TechMarket</h1>
    </div>
    <Cards :products="products" @add-to-cart="addToCart" />
  </main>
  <Footer />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
