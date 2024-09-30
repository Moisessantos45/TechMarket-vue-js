<template>
  <footer class="w-full p-5 flex flex-col items-center bg-gray-800 text-white">
    <span class="w-full border-t border-gray-700 my-4"></span>
    <h1 class="text-2xl uppercase font-bold mb-2">TechMarket</h1>
    <nav class="flex space-x-4">
      <a href="#" class="hover:text-gray-400">Home</a>
      <a href="#" class="hover:text-gray-400">About</a>
      <a href="#" class="hover:text-gray-400">Services</a>
      <a href="#" class="hover:text-gray-400">Contact</a>
    </nav>
    <div class="mt-4">
      <p class="text-sm">&copy; 2023 TechMarket. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  transition: background-color 0.3s ease;
}
footer:hover {
  background-color: #1a202c;
}
</style>
