export default function (context) {
  console.log(context.params)
  context.store.dispatch('commentStore/loadComments', {
    postId: context.params.id,
  })
}
