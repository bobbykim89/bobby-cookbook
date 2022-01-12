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
              v-for="option in options"
              :key="option.name"
              v-bind:value="option.id"
            >
              {{ option.name }}
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
      },
      options: [
        { name: 'Mexican', id: '1' },
        { name: 'Korean', id: '2' },
        { name: 'Indian', id: '3' },
      ],
    }
  },
  methods: {
    handleSubmit() {
      const { title, category, ingredients, direction } = this.inputData
      console.log(
        'title: ',
        title,
        'category: ',
        category,
        'ingredients: ',
        ingredients,
        'direction: ',
        direction
      )
    },
  },
}
</script>
