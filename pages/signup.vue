<template>
  <section class="bg-white text-gray-700">
    <div class="grid lg:grid-cols-5">
      <div class="lg:col-span-2 self-center order-2 lg:order-1">
        <div class="container w-[90%] lg:w-[70%] 2xl:w-[60%] mx-auto">
          <h1 class="text-center text-4xl font-bold mb-4 tracking-wider">
            Sign up
          </h1>
          <form @submit.prevent="onSubmit" class="flex flex-col mb-4">
            <div class="mb-4">
              <label for="username" class="text-lg font-semibold"
                >Username:</label
              >
              <input
                type="text"
                id="username"
                v-model="username"
                required
                class="block w-full p-3 outline-none bg-gray-100 shadow-md"
              />
            </div>
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
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Password must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters"
                minlength="8"
                maxlength="116"
                class="block w-full p-3 outline-none bg-gray-100 shadow-md"
              />
            </div>
            <div class="mb-6">
              <label for="password2" class="text-lg font-semibold"
                >Confirm Password:
              </label>
              <input
                type="password"
                id="password2"
                v-model="password2"
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
            Already got an account?
            <nuxt-link
              to="/login"
              class="font-semibold hover:text-gray-600 hover:underline"
              >Login</nuxt-link
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
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=781&q=80',
      username: '',
      email: '',
      password: '',
      password2: '',
    }
  },
  methods: {
    onSubmit() {
      if (this.username === '' || this.email === '' || this.password === '') {
        console.log('Please fill all fields')
      } else if (this.password !== this.password2) {
        console.log('Please check password again')
      } else {
        this.$store
          .dispatch('authStore/signUp', {
            email: this.email,
            password: this.password,
            username: this.username,
          })
          .then(() => {
            this.$router.push('/recipes')
          })
      }
    },
  },
}
</script>
