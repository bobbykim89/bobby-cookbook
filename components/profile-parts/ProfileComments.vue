<template>
  <nuxt-link :to="`/recipes/post/${comment.postId}`">
    <div
      class="w-[95%] xl:w-[80%] 2xl:w-[60%] bg-white border border-gray-300 shadow-lg mb-4 mx-auto p-4 lg:px-8 lg:pt-8 rounded-lg hover:scale-105 transition ease-in duration-300"
    >
      <p class="mb-4">{{ comment.message }}</p>
      <div class="flex justify-end text-gray-600 items-center">
        <img
          :src="
            comment.author.avatar
              ? comment.author.avatar
              : this.placeholderImages.authorProfile
          "
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
          $moment(
            new Date(comment.createdAt && comment.createdAt.seconds * 1000)
          ).format('MMMM Do YYYY h:mm a')
        }}
      </small>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    comment: { type: Object, required: true },
  },
}
</script>
