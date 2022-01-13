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
      <i
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
      console.log('Deleting this comment!')
      console.log(this.comment.id, this.$route.params.id)
      this.$store
        .dispatch('commentStore/deleteComment', {
          id: this.comment.id,
          postId: this.$route.params.id,
        })
        .then(() => {
          this.$router.go()
        })
    },
  },
}
</script>
