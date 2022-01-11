<template>
  <nav
    v-bind:class="[
      navScroll ? 'lg:shadow-md bg-opacity-70' : 'bg-opacity-80',
      ' absolute bg-white w-full top-0 md:sticky flex flex-wrap items-center z-50 transition ease-in duration-500 delay-150',
    ]"
  >
    <div
      class="container flex flex-wrap items-center py-4 align-middle justify-between"
    >
      <div class="flex flex-shrink-0 mr-6 self-center">
        <nuxt-link to="/">
          <div class="inline-block w-8 align-middle ml-6">
            <img src="~assets/images/logo.png" alt="" />
          </div>
          <h1
            class="inline-block font-bold text-xl font-bold align-middle ml-2"
          >
            BOBBY'S <span class="text-[#f1ac18]">COOK</span>BOOK
          </h1></nuxt-link
        >
      </div>
      <!-- Expandable hamburger menu part -->
      <div class="block lg:hidden">
        <button
          @click="handleHamburger"
          class="flex items-center py-2 mr-4 text-2xl"
        >
          <i v-if="this.navbarOpen === false" class="material-icons">menu</i
          ><i v-else class="material-icons">close</i>
        </button>
      </div>
      <div
        v-if="this.navbarOpen"
        class="flex-grow w-full text-center space-y-1 pt-2 lg:hidden bg-gray-100 bg-opacity-80 mx-2 mt-2 rounded-md shadow-md"
      >
        <div
          v-for="menu in navigation"
          :key="menu.name"
          @click="navbarOpen = false"
        >
          <nuxt-link
            :to="menu.to"
            class="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-gray-700 hover:bg-gray-50"
            >{{ menu.name }}</nuxt-link
          >
        </div>
        <div class="block flex flex-wrap pt-1 justify-center">
          <NavAuthLinksVue
            v-if="isAuthenticated === true"
            @close="navbarOpen = false"
          />
          <NavGuestLinksVue v-else @close="navbarOpen = false" />
        </div>
      </div>
      <!-- Menu elements in larger screen -->
      <div
        class="hidden lg:block flex flex-row flex-grow mx-auto justify-start ml-8"
      >
        <nuxt-link
          v-for="menu in navigation"
          :key="menu.name"
          :to="menu.to"
          class="inline-block text-black align-middle text-lg hover:text-[#f1ac18] mr-4"
          >{{ menu.name }}</nuxt-link
        >
      </div>
      <div class="hidden lg:block flex flex-wrap pb-0 pt-1 justify-center">
        <NavAuthLinksVue v-if="isAuthenticated === true" />
        <NavGuestLinksVue v-else />
      </div>
    </div>
  </nav>
</template>

<script>
import NavAuthLinksVue from './Nav-AuthLinks.vue'
import NavGuestLinksVue from './Nav-GuestLinks.vue'
export default {
  components: {
    NavAuthLinksVue,
    NavGuestLinksVue,
  },
  data() {
    return {
      navbarOpen: false,
      isAuthenticated: false,
      navigation: [
        { name: 'Home', to: '/' },
        { name: 'Recipes', to: '/recipes' },
        { name: 'About', to: '/about' },
        { name: 'Contact', to: '/contact' },
      ],
      navScroll: false,
    }
  },
  methods: {
    handleHamburger() {
      this.navbarOpen = !this.navbarOpen
    },
    checkAuth() {
      if (this.$store.state.authStore.isAuthenticated === true) {
        this.isAuthenticated = true
      } else {
        this.isAuthenticated = false
      }
    },
    handleScroll() {
      if (window.scrollY >= 50) {
        this.navScroll = true
      } else {
        this.navScroll = false
      }
    },
  },
  computed: {},
  watch: {
    '$store.authStore': {
      handler() {
        this.checkAuth()
      },
      immediate: true,
    },
  },
  mounted() {
    this.checkAuth()
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>
