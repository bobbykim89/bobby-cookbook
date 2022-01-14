<template>
  <div
    class="bg-white border border-gray-300 shadow-lg mb-4 p-4 lg:px-8 lg:pt-8 rounded-lg"
  >
    <form @submit.prevent="handleSubmit">
      <textarea
        name="message"
        v-model="message"
        placeholder="Please write comment here"
        class="block w-full bg-transparent h-28 border-gray-500 outline-none border-b-2 p-2 mb-2"
      />
      <div class="text-right">
        <button
          type="submt"
          class="align-middle text-gray-600 hover:text-gray-500 mr-2 cursor-pointer text-2xl"
        >
          <i class="material-icons">done</i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    postId: {
      required: true,
    },
  },
  data() {
    return {
      message: '',
    }
  },
  methods: {
    handleSubmit() {
      const user = this.$store.state.authStore.user
      if (!this.$store.state.authStore.isAuthenticated) {
        console.log('Please Login to create new post!')
        this.$router.push('/login')
      } else {
        this.$store
          .dispatch('commentStore/addComment', {
            message: this.message,
            author: {
              username: user.displayName,
              userId: user.uid,
              avatar: user.photoURL,
            },
            postId: this.postId,
          })
          .then(() => {
            this.$router.go()
          })
      }
    },
  },
}
</script>
