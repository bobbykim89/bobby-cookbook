<template>
  <section
    @click="closeModal"
    class="backdrop fixed inset-0 z-10 overflow-y-auto bg-gray-800 bg-opacity-70"
  >
    <div class="min-h-screen px-4 text-center">
      <span
        class="inline-block h-[30vh] lg:h-screen align-middle"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        @click.stop
        class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
      >
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">
          Add a new category
        </h1>
        <div class="mt-4">
          <form @submit.prevent="handleSubmit">
            <div>
              <label for="categoryName" class="text-gray-500 text-lg">
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="categoryName"
                v-model="name"
                class="block w-full bg-transparent border-gray-300 mb-2 p-2 outline-none border-b-2"
              />
            </div>
            <div class="mt-4">
              <input
                type="submit"
                value="Add"
                class="inline-flex justify-center px-6 py-2 text-lg font-medium text-white bg-[#f1ac18] border border-transparent rounded-md hover:bg-[#f25b0a] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 mr-4 cursor-pointer"
              />
              <p
                @click="closeModal"
                class="inline-flex justify-center px-4 py-2 text-lg font-medium text-white bg-[#d45464] border border-transparent rounded-md hover:bg-[#cc080b] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 cursor-pointer"
              >
                Cancel
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      name: '',
    }
  },
  methods: {
    closeModal() {
      this.$emit('toggle')
      this.name = ''
    },
    handleSubmit() {
      if (this.name === '') {
        console.log('Please write category name.')
      } else {
        this.$store
          .dispatch('categoryStore/addCategory', { name: this.name })
          .then(() => {
            this.$emit('toggle')
            this.name = ''
          })
      }
    },
  },
}
</script>

<style></style>
