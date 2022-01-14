<template>
  <div class="relative font-inter">
    <Navbar />

    <div
      class="bg-image absolute inset-0 z-[-1] h-full bg-repeat opacity-5"
    ></div>
    <div class="relative min-h-[85vh]">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/layout-parts/Navbar.vue'
import Footer from '@/components/layout-parts/Footer.vue'
export default {
  components: {
    Navbar,
    Footer,
  },
  // middleware: ['loadData', 'loadUserInfo'],
  mounted() {
    this.onPageLoad()
  },
  methods: {
    onPageLoad() {
      this.$store.dispatch('authStore/loadUser')
      this.$store.dispatch('categoryStore/loadCategories')
      this.$store.dispatch('postsStore/loadPosts')
      this.$store.dispatch('commentStore/loadComments')
    },
  },
}
</script>

<style>
.bg-image {
  background-image: url('~assets/images/pattern.svg');
}
</style>
