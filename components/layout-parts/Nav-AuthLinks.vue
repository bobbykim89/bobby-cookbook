<template>
  <div
    class="w-full py-2 text-base lg:text-lg bg-gray-200 lg:bg-transparent rounded-b-md lg:rounded-none"
  >
    <li
      class="inline-block text-[#d45464] align-middle mx-2 rounded-b-md lg:rounded-none"
    >
      <span>Welcome! </span>
      {{ this.user.username }}
    </li>
    <li
      class="inline-block text-[#d45464] align-middle mx-2 hover:text-black transition ease-in duration-150"
    >
      <button @click="$emit('close')">
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
