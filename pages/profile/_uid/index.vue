<template>
  <section>
    <div
      class="w-full items-center shadow-lg mb-20 relative grid w-full h-[45vh] lg:h-[30vh] h-full"
    >
      <img
        :src="this.imageUrl"
        alt="vegetables"
        class="absolute object-cover h-full w-full object-center overflow-hidden opacity-80"
      />
      <div class="relative inline-block mx-auto self-center text-center">
        <img
          :src="
            this.$store.state.authStore.isAuthenticated &&
            this.$store.state.authStore.user.photoURL
              ? this.$store.state.authStore.user.photoURL
              : this.defaultProfile
          "
          alt="profile"
          class="w-28 h-28 object-cover rounded-full border-4 border-white inline-block mb-4"
        />
        <h1
          class="self-center text-white font-semibold text-xl capitalize text-shadow-lg"
        >
          {{
            this.$store.state.authStore.user &&
            this.$store.state.authStore.user.displayName
          }}
        </h1>
      </div>
    </div>
    <div class="lg:w-[90%] mx-auto">
      <div class="grid grid-flow-row lg:grid-cols-4 gap-8 mb-20">
        <div class="w-full">
          <ProfileNav v-on:toggle="menuToggler($event)" />
        </div>
        <div v-if="toggleMenu === 1" class="lg:col-span-3 grid gap-4">
          <!-- My posts -->
          <h1 class="text-4xl font-bold mb-8 ml-3">My Recipes</h1>
          <div v-if="checkAuth" class="grid lg:grid-cols-3 gap-4">
            <Card
              v-for="recipe in loadMyPosts"
              :key="recipe.id"
              :post="recipe"
            />
          </div>
        </div>
        <div v-if="toggleMenu === 2" class="lg:col-span-3 gap-4">
          <!-- Liked posts -->
          <h1 class="text-4xl font-bold mb-8 ml-3">Liked Recipes</h1>
          <div v-if="checkAuth" class="grid lg:grid-cols-3 gap-4">
            <Card
              v-for="recipe in loadLikedPosts"
              :key="recipe.id"
              :post="recipe"
            />
          </div>
        </div>
        <div v-if="toggleMenu === 3" class="lg:col-span-3">
          <UpdateProfile v-if="checkAuth" />
        </div>
        <div v-if="toggleMenu === 4" class="lg:col-span-3">
          <UpdatePassword v-if="checkAuth" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProfileNav from '@/components/profile-parts/ProfileNav.vue'
import Card from '@/components/recipe-parts/Card.vue'
import UpdateProfile from '@/components/profile-parts/UpdateProfile.vue'
import UpdatePassword from '@/components/profile-parts/UpdatePassword.vue'

export default {
  components: {
    ProfileNav,
    Card,
    UpdateProfile,
    UpdatePassword,
  },
  data() {
    return {
      imageUrl:
        'https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1997&q=80',
      defaultProfile: '/images/defaultProfile.jpg',
      toggleMenu: 1,
    }
  },
  middleware: 'auth',
  methods: {
    menuToggler(e) {
      this.toggleMenu = e
    },
  },
  computed: {
    checkAuth() {
      return this.$store.state.authStore.isAuthenticated
    },
    loadMyPosts() {
      const checkAuth = this.$store.state.authStore.isAuthenticated
      const myPosts = this.$store.state.postsStore.recipes.filter((post) => {
        return post.author.userId === this.$store.state.authStore.user.uid
      })
      return checkAuth && myPosts
    },
    loadLikedPosts() {
      const checkAuth = this.$store.state.authStore.isAuthenticated
      const likedPosts = this.$store.state.postsStore.recipes.filter((post) => {
        return (
          post.liked &&
          post.liked.includes(this.$store.state.authStore.user.uid)
        )
      })
      return checkAuth && likedPosts
    },
  },
}
</script>
