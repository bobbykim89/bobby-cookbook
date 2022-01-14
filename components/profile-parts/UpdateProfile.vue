<template>
  <div class="lg:w-2/3 xl:w-3/5 2xl:w-1/2 mx-auto text-gray-700">
    <div
      class="w-[95%] lg:w-full mx-auto mb-8 bg-white rounded-lg shadow-xl py-12 px-4 lg:px-8 border-gray-300 border"
    >
      <h1 class="text-4xl font-bold mb-8 ml-3">Update Profile</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="username" class="text-lg font-semibold">
            Username:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            v-model="profileInfo.displayName"
            required
            class="block w-full p-3 outline-none bg-gray-100 shadow-md"
          />
        </div>
        <div class="mb-4">
          <label
            for="profileImage"
            class="block w-full outline-none bg-gray-100 shadow-md flex justify-between"
          >
            <span class="py-3 pl-3">{{
              profileInfo.profileImage !== ''
                ? profileInfo.profileImage.name
                : ''
            }}</span>
            <div
              class="px-6 py-3 h-full bg-gray-200 inline-block font-semibold"
            >
              Browse
            </div>
            <input
              type="file"
              name="profileImage"
              id="profileImage"
              @change="handleFile"
              accept="image/*"
              required
              class="hidden"
            />
          </label>
        </div>
        <div>
          <input
            type="submit"
            value="Submit"
            class="block w-full px-4 py-2 bg-[#d45464] hover:bg-[#cc080b] text-lg text-white font-semibold tracking-wider shadow-md transition ease-in duration-150 cursor-pointer"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  // props: {
  //   currentUser,
  // },
  data() {
    return {
      profileInfo: {
        profileImage: '',
        displayName: this.$store.state.authStore.user.displayName || '',
      },
    }
  },
  methods: {
    handleSubmit() {
      console.log(this.profileInfo.displayName, this.profileInfo.profileImage)
    },
    handleFile(e) {
      const types = ['image/png', 'image/jpeg', 'image/jpg ']
      const selectedFile = e.target.files[0]
      if (selectedFile && types.includes(selectedFile.type)) {
        this.profileInfo.profileImage = selectedFile
      } else this.profileInfo.profileImage = ''
    },
  },
}
</script>
