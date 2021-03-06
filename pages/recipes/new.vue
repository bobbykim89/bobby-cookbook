<template>
  <section class="lg:w-2/3 xl:w-3/5 2xl:w-1/2 mx-auto py-20 text-gray-700">
    <div
      class="w-[95%] lg:w-full mx-auto mb-8 bg-white rounded-lg shadow-xl py-12 px-4 lg:px-8 border-gray-300 border"
    >
      <h1 class="text-4xl font-bold mb-8 ml-3">New Recipe</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="title" class="text-lg font-semibold"> Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            v-model="inputData.title"
            required
            class="block w-full p-3 outline-none bg-gray-100 shadow-md"
          />
        </div>
        <div class="mb-4">
          <label
            for="cover"
            class="block w-full outline-none bg-gray-100 shadow-md flex justify-between"
          >
            <span class="py-3 pl-3">{{
              inputData.cover !== '' ? inputData.cover.name : ''
            }}</span>
            <div
              class="px-6 py-3 h-full bg-gray-200 hover:bg-gray-300 inline-block font-semibold"
            >
              Browse
            </div>
            <input
              type="file"
              name="cover"
              id="cover"
              @change="handleFile"
              accept="image/*"
              required
              class="hidden"
            />
          </label>
        </div>
        <div class="mb-4">
          <label for="category" class="text-lg font-semibold">
            Category:
          </label>
          <select
            name="category"
            id="category"
            v-model="inputData.category"
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
            v-model="inputData.ingredients"
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
            v-model="inputData.direction"
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
export default {
  data() {
    return {
      inputData: {
        title: '',
        category: '',
        ingredients: '',
        direction: '',
        cover: '',
      },
    }
  },
  head() {
    return {
      title: "Add New Recipe - Bobby's Cookbook",
    }
  },
  middleware: 'auth',
  methods: {
    handleSubmit() {
      const { title, category, ingredients, direction, cover } = this.inputData
      const user = this.$store.getters['authStore/getUser']
      if (!this.$store.getters['authStore/getAuthentication']) {
        console.log('Please Login to create new post!')
        this.$router.push('/login')
      } else {
        this.$store
          .dispatch('postsStore/addPost', {
            title: title,
            author: {
              username: user.displayName,
              userId: user.uid,
              avatar: (user.photoURL && user.photoURL) || null,
            },
            category: category,
            ingredients: ingredients,
            direction: direction,
            cover: cover,
          })
          .then(() => {
            this.$router.push('/recipes')
          })
      }
    },
    handleFile(e) {
      const types = ['image/png', 'image/jpeg', 'image/jpg ']
      const selectedFile = e.target.files[0]
      if (selectedFile && types.includes(selectedFile.type)) {
        this.inputData.cover = selectedFile
      } else this.inputData.cover = ''
    },
  },
  computed: {
    getCategoryList() {
      return this.$store.getters['categoryStore/getCategories']
    },
  },
}
</script>
