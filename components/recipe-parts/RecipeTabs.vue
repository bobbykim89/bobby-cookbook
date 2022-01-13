<template>
  <section
    class="w-full px-2 py-2 rounded-xl bg-white border-gray-300 border shadow-xl"
  >
    <div class="flex p-1 space-x-1 bg-[#f1ac18] rounded-xl">
      <div
        @click="tabHandler(1)"
        v-bind:class="[
          showIngredients
            ? 'text-gray-800 bg-white shadow ring-4 ring-white ring-opacity-60'
            : 'text-white hover:bg-[#f25b0a]',
          'text-center focus:outline-none w-full py-2.5 text-lg leading-5 font-medium rounded-lg',
        ]"
      >
        Ingredients
      </div>
      <div
        @click="tabHandler(0)"
        v-bind:class="[
          !showIngredients
            ? 'text-gray-800 bg-white shadow ring-4 ring-white ring-opacity-60'
            : 'text-white hover:bg-[#f25b0a]',
          'text-center focus:outline-none w-full py-2.5 text-lg leading-5 font-medium rounded-lg',
        ]"
      >
        Direction
      </div>
    </div>
    <div class="mt-2">
      <div class="bg-white rounded p-3">
        <div
          v-if="showIngredients"
          class="relative p-3 leading-5 whitespace-pre-line"
        >
          {{ ingredients }}
        </div>
        <div v-else class="relative p-3 leading-5 whitespace-pre-line">
          {{ direction }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    ingredients: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showIngredients: {
        type: Boolean,
        default: true,
      },
    }
  },
  methods: {
    tabHandler(e) {
      this.showIngredients = e
    },
  },
}
</script>
