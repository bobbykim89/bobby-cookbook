<template>
  <section>
    <div
      class="w-full items-center shadow-lg mb-20 relative grid h-[40vh] lg:h-[35vh] h-full"
    >
      <img
        :src="this.imageUrl"
        alt="vegetables"
        class="absolute object-cover h-full w-full object-center overflow-hidden"
      />
      <div
        class="relative inline-block mx-auto self-center text-center self-center w-[80%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%]"
      >
        <input
          type="text"
          name="search"
          v-model="searchInput"
          placeholder="Search"
          class="inline-block w-full py-3 px-6 rounded-full outline-none bg-gray-100 shadow-md self-center"
        />
      </div>
    </div>
    <div class="lg:w-[90%] mx-auto">
      <h1 class="text-4xl font-bold mb-8 ml-3">Recipes</h1>
      <div class="grid grid-flow-row lg:grid-cols-4 gap-8 mb-20">
        <div class="lg:col-span-3 grid lg:grid-cols-3 gap-4 order-2 lg:order-1">
          <Card v-for="recipe in loadedPosts" :key="recipe.id" :post="recipe" />
        </div>
        <div class="w-full order-1 lg:order-2">
          <div
            class="w-[95%] lg:w-full max-w-md p-2 mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg mb-4"
          >
            <nuxt-link
              to="/recipes/new"
              class="text-center text-2xl font-semibold block py-2 rounded-lg bg-[#d45464] text-white hover:bg-[#cc080b] transition ease-in duration-150 w-full px-4 font-semibold items-center"
            >
              Add New Recipe
            </nuxt-link>
          </div>

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
      searchInput: '',
    }
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal
    },
  },
  computed: {
    loadedPosts() {
      // const dataList = this.$store.state.postsStore.recipes
      const dataList = this.$store.getters['postsStore/getPosts']
      if (this.searchInput === '') {
        return dataList
      } else {
        const filtered = dataList.filter((recipe) => {
          const search = new RegExp(`${this.searchInput}`, 'gi')
          return (
            recipe.title.match(search) ||
            recipe.direction.match(search) ||
            recipe.ingredients.match(search)
          )
        })
        return filtered
      }
    },
  },
}
</script>

<style></style>
