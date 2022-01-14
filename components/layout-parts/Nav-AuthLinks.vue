<template>
  <div
    class="w-full py-2 text-base lg:text-lg bg-gray-200 lg:bg-transparent rounded-b-md lg:rounded-none"
  >
    <li
      @click="$emit('close')"
      class="inline-block text-[#d45464] align-middle mx-2 rounded-b-md lg:rounded-none"
    >
      <div
        @click="$router.push(`/profile/${getUserInfo.uid}`)"
        class="flex items-center cursor-pointer"
      >
        <img
          :src="
            this.$store.state.authStore.isAuthenticated &&
            this.$store.state.authStore.user.photoURL
              ? this.$store.state.authStore.user.photoURL
              : this.placeholderImages.authorProfile
          "
          alt="avatar"
          class="mr-4 w-8 h-8 object-cover rounded-full inline-block"
        />
        {{ getUserInfo.username }}
      </div>
    </li>
    <li
      @click="$emit('close')"
      class="inline-block text-[#d45464] align-middle mx-2 hover:text-black transition ease-in duration-150"
    >
      <button @click="handleLogout">
        <i class="fas fa-sign-out-alt" />
        <span class="hidden md:inline ml-1 text-lg">Logout</span>
      </button>
    </li>
  </div>
</template>

<script>
export default {
  data() {
    return {
      placeholderImages: {
        authorProfile: '/images/defaultProfile.jpg',
      },
    }
  },
  computed: {
    getUserInfo() {
      const userInfo = this.$store.state.authStore.user

      return {
        email: userInfo.email,
        username: userInfo.displayName,
        uid: userInfo.uid,
      }
    },
  },
  methods: {
    async handleLogout() {
      await this.$store.dispatch('authStore/logout')
      await this.$router.go()
    },
  },
}
</script>
