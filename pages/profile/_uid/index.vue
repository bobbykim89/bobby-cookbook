<template>
  <section>
    <div
      class="w-full items-center shadow-lg mb-20 relative grid w-full h-[40vh] lg:h-[30vh] h-full"
    >
      <img
        :src="this.imageUrl"
        alt="vegetables"
        class="absolute object-cover h-full w-full object-center overflow-hidden opacity-80"
      />
      <div class="relative inline-block mx-auto self-center text-center">
        <img
          :src="this.defaultProfile"
          alt="profile"
          class="w-28 h-28 object-cover rounded-full border-2 border-white inline-block mb-4"
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
          <ProfileNav />
        </div>
        <div class="lg:col-span-3 grid gap-4">
          <h1 class="text-4xl font-bold mb-8 ml-3">My Recipes</h1>
          <div class="grid lg:grid-cols-3 gap-4">
            <Card
              v-for="recipe in loadedPosts"
              :key="recipe.id"
              :post="recipe"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProfileNav from '@/components/profile-parts/ProfileNav.vue'
import Card from '@/components/recipe-parts/Card.vue'
export default {
  components: {
    ProfileNav,
    Card,
  },
  data() {
    return {
      imageUrl:
        'https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1997&q=80',
      defaultProfile: '/images/defaultProfile.jpg',
    }
  },
  computed: {
    loadedPosts() {
      //   return this.$store.getters['postsStore/getPosts']
      return this.$store.state.postsStore.recipes
    },
  },
}
</script>
