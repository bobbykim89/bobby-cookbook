<template>
  <section class="lg:w-2/3 xl:w-3/5 2xl:w-1/2 mx-auto py-20 text-gray-700">
    <div
      class="w-[95%] lg:w-full mx-auto mb-8 bg-white rounded-lg shadow-xl py-12 px-4 lg:px-8 border-gray-300 border"
    >
      <h1 class="text-4xl font-bold mb-8 ml-3">Edit Recipe</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="title" class="text-lg font-semibold"> Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            v-model="postData.title"
            required
            class="block w-full p-3 outline-none bg-gray-100 shadow-md"
          />
        </div>
        <div class="mb-4">
          <label for="category" class="text-lg font-semibold">
            Category:
          </label>
          <select
            name="category"
            id="category"
            v-model="postData.category"
            required
            class="block w-full p-3 outline-none bg-gray-100 shadow-md"
          >
            <option class="p-3" value="">Select Category</option>
            <option
              v-for="category in getCategoryList"
              :key="category.name"
              v-bind:value="category.id"
            >
              {{
                category.name.charAt(0).toUpperCase() + category.name.slice(1)
              }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label for="ingredients" class="text-lg font-semibold">
            Ingredients:
          </label>
          <textarea
            name="ingredients"
            id="ingredients"
            v-model="postData.ingredients"
            required
            class="block w-full p-3 outline-none bg-gray-100 shadow-md h-40 lg:h-60"
          />
        </div>
        <div class="mb-4">
          <label for="direction" class="text-lg font-semibold">
            Direction:
          </label>
          <textarea
            name="direction"
            id="direction"
            v-model="postData.direction"
            required
            class="block w-full p-3 outline-none bg-gray-100 shadow-md h-40 lg:h-60"
          />
        </div>
        <div class="grid grid-cols-2 gap-3 items-center">
          <div>
            <input
              type="submit"
              value="Submit"
              class="block w-full px-4 py-2 bg-[#d45464] hover:bg-[#cc080b] text-lg text-white font-semibold tracking-wider shadow-md transition ease-in duration-150 cursor-pointer"
            />
          </div>
          <div
            class="block w-full text-center px-4 py-2 bg-[#f1ac18] hover:bg-[#f25b0a] text-lg text-white font-semibold tracking-wider shadow-md transition ease-in duration-150 cursor-pointer"
            @click="$router.push('/recipes')"
          >
            Cancel
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { db } from '@/plugins/firebase'
import { doc, getDoc } from 'firebase/firestore'

export default {
  data() {
    return {
      postId: this.$route.params.id,
      inputData: {
        title: '',
        category: '',
        ingredients: '',
        direction: '',
      },
    }
  },
  async asyncData(context) {
    const docRef = doc(db, 'recipes', context.params.id)
    const docSnap = await getDoc(docRef)

    const result = await docSnap.data()
    // const getCategory = await getDoc(doc(db, 'categories', result.category))

    return {
      postData: { ...result },
    }
  },
  methods: {
    handleSubmit() {
      const { title, category, ingredients, direction, author } = this.postData
      if (!this.$store.state.authStore.isAuthenticated) {
        console.log('Please Login to create new category!')
        this.$router.push('/login')
      } else if (this.$store.state.authStore.user.uid !== author.userId) {
        console.log('You are not authorized to do so.')
      } else {
        this.$store
          .dispatch('postsStore/editPost', {
            id: this.postId,
            title: title,
            category: category,
            ingredients: ingredients,
            direction: direction,
          })
          .then(() => {
            this.$router.push(`/recipes/post/${this.postId}`)
          })
      }
    },
  },
  computed: {
    getCategoryList() {
      return this.$store.state.categoryStore.categories
    },
  },
}
</script>

<style></style>
