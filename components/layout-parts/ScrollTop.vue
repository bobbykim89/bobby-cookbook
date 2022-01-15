<template>
  <div
    @click="scrollTop"
    v-bind:class="[
      pageScroll ? ' block' : ' hidden',
      'fixed bg-gray-200 bg-opacity-70 rounded-lg bottom-0 right-0 mb-4 mr-4 transition ease-in duration-400 delay-150 hover:text-[#d45464]',
    ]"
  >
    <span class="material-icons mx-2 mt-2 cursor-pointer">expand_less</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageScroll: false,
    }
  },
  methods: {
    handleScroll() {
      if (window.scrollY >= 50) {
        this.pageScroll = true
      } else {
        this.pageScroll = false
      }
    },
    scrollTop() {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    },
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>
