<template>
  <div class="w-full">
    <div
      class="w-[95%] lg:w-full max-w-md p-2 mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg"
    >
      <button
        @click="toggleNav"
        class="flex justify-between w-full px-4 py-2 text-2xl font-semibold text-left text-white bg-[#f1ac18] rounded-lg hover:bg-[#f25b0a] items-center"
      >
        <span>Categories</span>
        <i
          v-bind:class="[
            navOpen ? 'transform rotate-180' : '',
            'fas fa-chevron-up w-5 h-5 text-white',
          ]"
        />
      </button>
      <div
        v-if="navOpen"
        class="px-4 pt-4 pb-2 text-xl text-gray-600 font-semibold"
      >
        <button
          class="block mb-2 text-center hover:text-gray-900 transition ease-in duration-150"
        >
          MyPosts
        </button>
        <button
          class="block mb-2 text-center hover:text-gray-900 transition ease-in duration-150"
        >
          Liked Posts
        </button>
        <button
          class="block mb-2 text-center hover:text-gray-900 transition ease-in duration-150"
        >
          Update profile
        </button>
        <button
          class="block mb-2 text-center hover:text-gray-900 transition ease-in duration-150"
        >
          Change Password
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navOpen: true,
    }
  },
  methods: {
    toggleNav() {
      this.navOpen = !this.navOpen
    },
  },
}
</script>

<style></style>
