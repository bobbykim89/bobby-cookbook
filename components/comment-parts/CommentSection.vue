<template>
  <div class="w-[90%] lg:w-full mx-auto">
    <CommentForm :postId="postId" />
    <p class="ml-2 mb-4 font-semibold">Comments:</p>
    <div v-if="comments !== null">
      <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
    </div>
    <p v-else class="text-center mb-4">No comment yet!</p>
  </div>
</template>

<script>
import CommentForm from '@/components/comment-parts/CommentForm.vue'
import CommentItem from '@/components/comment-parts/CommentItem.vue'
export default {
  components: {
    CommentForm,
    CommentItem,
  },
  props: {
    comments: {
      default: null,
    },
    postId: {
      required: true,
    },
  },
}
</script>

<style></style>
