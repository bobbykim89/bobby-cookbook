<template>
  <div>
    <li class="inline-block text-[#f1ac18] align-middle text-lg mx-2">
      <span>Welcome! </span>
      {{ this.user.username }}
    </li>
    <li
      class="inline-block text-[#f1ac18] align-middle text-lg mx-2 hover:text-black transition ease-in duration-150"
    >
      <button>
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
      user: { username: 'Manguito' },
    }
  },
}
</script>
