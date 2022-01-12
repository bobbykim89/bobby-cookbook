<template>
  <section>
    <div class="w-full shadow-lg mb-20">
      <img
        :src="this.imageUrl"
        alt="vegetables"
        class="object-cover object-center w-full h-[30vh] lg:h-full lg:max-h-[40vh]"
      />
    </div>
    <div class="lg:w-[90%] mx-auto">
      <h1 class="text-4xl font-bold mb-8 ml-3">Recipes</h1>
      <div class="grid grid-flow-row lg:grid-cols-4 gap-8 mb-20">
        <div class="lg:col-span-3 grid lg:grid-cols-3 gap-4 order-2 lg:order-1">
          <Card />
        </div>
        <div class="w-full order-1 lg:order-2">
          <nuxt-link
            to="/recipes/new"
            class="text-center text-2xl font-semibold block py-2 rounded-lg bg-[#d45464] text-white hover:bg-[#cc080b] transition ease-in duration-150 mb-4 mx-2"
          >
            Add New Recipe
          </nuxt-link>

          <CategoryBox @toggle="toggleModal" />
        </div>
      </div>
    </div>
    <CategoryModal @toggle="toggleModal" v-if="showModal" />
  </section>
</template>

<script>
import Card from '@/components/recipe-parts/Card.vue'
import CategoryBox from '@/components/recipe-parts/CategoryBox.vue'
import CategoryModal from '@/components/recipe-parts/CategoryModal.vue'
export default {
  components: {
    Card,
    CategoryBox,
    CategoryModal,
  },
  data() {
    return {
      imageUrl:
        'https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1997&q=80',
      showModal: false,
    }
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal
      console.log(this.showModal)
    },
  },
}
</script>

<style></style>
