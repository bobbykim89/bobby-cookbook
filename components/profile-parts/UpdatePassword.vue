<template>
  <div class="lg:w-2/3 xl:w-3/5 2xl:w-1/2 mx-auto text-gray-700">
    <div
      class="w-[95%] lg:w-full mx-auto mb-8 bg-white rounded-lg shadow-xl py-12 px-4 lg:px-8 border-gray-300 border"
    >
      <h1 class="text-4xl font-bold mb-8 ml-3">Update Password</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="currentPassword" class="text-lg font-semibold">
            Current Password:
          </label>
          <input
            type="password"
            name="currentPassword"
            id="currentPassword"
            v-model="inputData.currentPassword"
            required
            class="block w-full p-3 outline-none bg-gray-100 shadow-md"
          />
        </div>
        <div class="mb-4">
          <label for="newPassword" class="text-lg font-semibold">
            New Password:
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            v-model="inputData.newPassword"
            required
            class="block w-full p-3 outline-none bg-gray-100 shadow-md"
          />
        </div>
        <div class="mb-4">
          <label for="newPassword2" class="text-lg font-semibold">
            Check New Password:
          </label>
          <input
            type="password"
            name="newPassword2"
            id="newPassword2"
            v-model="inputData.newPassword2"
            required
            class="block w-full p-3 outline-none bg-gray-100 shadow-md"
          />
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
  data() {
    return {
      inputData: {
        currentPassword: '',
        newPassword: '',
        newPassword2: '',
      },
    }
  },
  methods: {
    handleSubmit() {
      console.log(this.inputData)
    },
  },
}
</script>
