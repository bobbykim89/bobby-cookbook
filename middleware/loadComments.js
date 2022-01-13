export default function (context) {
  context.store.dispatch('commentStore/loadComments')
}
