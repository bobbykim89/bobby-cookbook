<template>
  <section>
    <div class="lg:w-[90%] mx-auto">
      <h1 class="text-4xl font-bold mb-8 ml-3">
        {{ categoryName.charAt(0).toUpperCase() + categoryName.slice(1) }}
      </h1>
      <div class="grid grid-flow-row lg:grid-cols-4 gap-8 mb-20">
        <div class="lg:col-span-3 grid lg:grid-cols-3 gap-4 order-2 lg:order-1">
          <Card v-for="recipe in loadedPosts" :key="recipe.id" :post="recipe" />
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
      showModal: false,
      pageId: this.$route.params.id,
    }
  },
  head() {
    return {
      title: `${this.categoryName}`,
    }
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal
    },
  },
  computed: {
    loadedPosts() {
      const getPosts = this.$store.getters['postsStore/getPosts']
      const currentCategory = getPosts.filter((recipe) => {
        return recipe.category === this.$route.params.id
      })
      return currentCategory
    },
    categoryName() {
      const getCategories = this.$store.getters['categoryStore/getCategories']
      const filterCategory = getCategories.filter((category) => {
        return category.id === this.$route.params.id
      })
      return filterCategory[0].name
    },
  },
}
</script>
