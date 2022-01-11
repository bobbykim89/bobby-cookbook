<template>
  <section class="bg-white text-gray-700">
    <div class="grid lg:grid-cols-5">
      <div class="lg:col-span-2 self-center order-2 lg:order-1">
        <div class="container w-[90%] lg:w-[70%] 2xl:w-[60%] mx-auto">
          <h1 class="text-center text-4xl font-bold mb-4 tracking-wider">
            Login
          </h1>
          <form @submit.prevent="onSubmit" class="flex flex-col mb-4">
            <div class="mb-4">
              <label for="email" class="text-lg font-semibold"
                >Email Address:</label
              >
              <input
                type="email"
                id="email"
                v-model="email"
                required
                class="block w-full p-3 outline-none bg-gray-100 shadow-md"
              />
            </div>
            <div class="mb-6">
              <label for="password" class="text-lg font-semibold"
                >Password:
              </label>
              <input
                type="password"
                id="password"
                v-model="password"
                required
                class="block w-full p-3 outline-none bg-gray-100 shadow-md"
              />
            </div>
            <input
              type="submit"
              value="Login"
              class="px-4 py-2 bg-[#d45464] hover:bg-[#cc080b] text-lg text-white font-semibold tracking-wider shadow-md transition ease-in duration-150"
            />
          </form>
          <p class="text-center mb-20">
            Don't have an account?
            <nuxt-link
              to="/signup"
              class="font-semibold hover:text-gray-600 hover:underline"
              >Sign Up</nuxt-link
            >
          </p>
        </div>
      </div>
      <div
        class="relative lg:col-span-3 overflow-hidden mb-6 lg:mb-0 order-1 lg:order-2"
      >
        <svg
          class="hidden lg:block absolute left-0 inset-y-0 h-full w-24 text-white"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon points="0,0 100,0 0,100" />
        </svg>
        <img
          :src="imgUrl"
          alt="steak"
          class="w-full object-center object-cover h-[40vh] lg:h-[85vh]"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      imgUrl:
        'https://images.unsplash.com/photo-1565299715199-866c917206bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=780&q=80',
      email: '',
      password: '',
    }
  },
  methods: {
    onSubmit() {
      if (this.email === '' || this.password === '') {
        console.log('Please fill all fields')
      } else {
        this.$store
          .dispatch('authStore/login', {
            email: this.email,
            password: this.password,
          })
          .then(() => {
            this.$router.push('/recipes')
          })
      }
    },
  },
}
</script>
