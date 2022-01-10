<template>
  <div>
    <Hero />
    <section class="lg:w-[80%] mx-auto my-12">
      <h1 class="text-4xl font-bold mb-8 ml-3">Newest Recipes</h1>
      <div class="grid grid-flow-row lg:grid-cols-4 gap-4 mx-auto"></div>
    </section>
    <h1 class="text-xl text-[#f1ac18] text-center">Hello World!</h1>
    <Introduction />
    <section class="text-center my-16 text-gray-800">
      <h1 class="text-3xl lg:text-7xl items-center">
        <i class="fas fa-utensils inline-block text-2xl lg:text-6xl" />
        <span class="font-bold">Thanks for coming!</span>
        <i class="fas fa-smile-wink inline-block text-2xl lg:text-6xl" />
      </h1>
    </section>
  </div>
</template>

<script>
import Hero from '@/components/page-parts/Hero.vue'
import Introduction from '@/components/page-parts/Introduction.vue'
export default {
  name: 'Home',
  components: {
    Hero,
    Introduction,
  },
}
</script>
