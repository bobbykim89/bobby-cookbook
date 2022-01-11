<template>
  <div
    class="w-full py-2 text-base lg:text-lg bg-gray-200 lg:bg-transparent rounded-b-md lg:rounded-none"
  >
    <li
      class="inline-block text-[#d45464] align-middle mx-2 rounded-b-md lg:rounded-none"
    >
      <span>Welcome! </span>
      {{ getUserInfo.username }}
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
  computed: {
    getUserInfo() {
      const userInfo = this.$store.state.authStore.user

      return {
        email: userInfo.email,
        username: userInfo.displayName,
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
