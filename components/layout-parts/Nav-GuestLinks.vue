<template>
  <div
    class="w-full py-2 text-base lg:text-lg bg-gray-200 lg:bg-transparent rounded-b-md lg:rounded-none"
  >
    <div @click="$emit('close')" class="inline-block">
      <a
        href="/login"
        class="text-[#d45464] align-middle mx-3 hover:text-black transition ease-in duration-150"
      >
        <i class="fas fa-sign-in-alt mr-1" /> Login
      </a>
    </div>
    <div @click="$emit('close')" class="inline-block">
      <a
        href="/signup"
        class="text-[#d45464] align-middle mx-3 hover:text-black transition ease-in duration-150"
      >
        <i class="fas fa-user-plus mr-1" /> Signup
      </a>
    </div>
  </div>
</template>

<script>
export default {}
</script>
