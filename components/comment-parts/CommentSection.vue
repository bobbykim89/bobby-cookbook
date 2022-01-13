<template>
  <div class="w-[90%] lg:w-full mx-auto">
    <CommentForm />
    <p class="ml-2 mb-4 font-semibold">Comments:</p>
    <div v-if="comments.length !== 0">
      <CommentItem
        v-for="comment in comments"
        :key="comment.name"
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
  data() {
    return {
      comments: [
        { author: 'Manguito Lovebird', message: 'Pio pio', createdAt: '111' },
        { author: "Kartik's Cat", message: 'Miau miau', createdAt: '222' },
      ],
    }
  },
}
</script>

<style></style>
