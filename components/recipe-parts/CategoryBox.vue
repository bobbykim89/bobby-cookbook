<template>
  <div class="w-full">
    <div
      class="w-[95%] lg:w-full max-w-md p-2 mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg"
    >
      <button
        @click="toggleCategoryBox"
        class="flex justify-between w-full px-4 py-2 text-2xl font-semibold text-left text-white bg-[#f1ac18] rounded-lg hover:bg-[#f25b0a] items-center"
      >
        <span>Categories</span>
        <i
          v-bind:class="[
            categoryOpen ? 'transform rotate-180' : '',
            'fas fa-chevron-up w-5 h-5 text-white',
          ]"
        />
      </button>
      <div
        v-if="categoryOpen"
        class="px-4 pt-4 pb-2 text-xl text-gray-600 font-semibold"
      >
        <nuxt-link
          to="/recipes"
          class="block mb-2 text-center hover:text-gray-900 transition ease-in duration-150"
          >See All</nuxt-link
        >
        <nuxt-link
          v-for="category in getCategoryList"
          :key="category.id"
          :to="'/recipes/category/' + category.id"
          class="block mb-2 text-center hover:text-gray-900 transition ease-in duration-150"
          >{{ category.name.charAt(0).toUpperCase() + category.name.slice(1) }}
        </nuxt-link>
        <button
          @click="$emit('toggle')"
          class="block w-full text-center hover:text-gray-900 cursor-pointer transition ease-in duration-150"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryOpen: true,
    }
  },
  methods: {
    toggleCategoryBox() {
      this.categoryOpen = !this.categoryOpen
    },
    // onLoadCategoryList() {

    // },
  },
  computed: {
    getCategoryList() {
      return this.$store.state.categoryStore.categories
    },
  },
  // mounted() {
  //   this.onLoadCategoryList()
  // },
}
</script>

<style></style>
