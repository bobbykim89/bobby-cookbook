<template>
  <div
    class="bg-white border border-gray-300 shadow-lg mb-3 p-4 lg:px-8 lg:pt-8 rounded-lg"
  >
    <p class="mb-4">{{ comment.message }}</p>
    <div class="flex justify-end text-gray-600 items-center">
      <img
        :src="this.placeholderImages.authorProfile"
        alt="avatar"
        class="ml-2 mr-4 w-8 h-8 object-cover rounded-full block"
      />
      <small class="text-gray-600 font-semibold">{{
        comment.author.username
      }}</small>
    </div>
    <small class="flex justify-end text-gray-600 mb-2">
      Posted on
      {{
        $moment(new Date(comment.createdAt.seconds * 1000)).format(
          'MMMM Do YYYY h:mm a'
        )
      }}
    </small>
    <div class="flex justify-end">
      <span class="text-2xl"></span>
      <i
        v-if="
          this.$store.state.authStore.isAuthenticated &&
          this.$store.state.authStore.user.uid === this.comment.author.userId
        "
        @click="handleDelete"
        class="material-icons text-2xl text-gray-600 hover:text-gray-500 cursor-pointer"
        >delete</i
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      default: null,
    },
  },
  data() {
    return {
      placeholderImages: {
        authorProfile: '/images/defaultProfile.jpg',
      },
    }
  },
  methods: {
    handleDelete() {
      if (!this.$store.state.authStore.isAuthenticated) {
        console.log('Please Login to create new post!')
        this.$router.push('/login')
      } else if (
        this.$store.state.authStore.user.uid !== this.comment.author.userId
      ) {
        console.log('You are not authorized to do so')
        this.$router.go()
      } else {
        if (
          confirm(
            'This will permanently delete this comment. Please confirm to proceed.'
          )
        ) {
          this.$store.dispatch('commentStore/deleteComment', {
            id: this.comment.id,
            postId: this.$route.params.id,
          })
        }
      }
    },
  },
}
</script>
