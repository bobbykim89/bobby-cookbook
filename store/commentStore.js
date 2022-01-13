import { db } from '@/plugins/firebase'
import {
  collection,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
  doc,
  updateDoc,
  addDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore'

// Collection ref
const colRef = collection(db, 'comments')

// Queries
const colQuery = query(colRef, orderBy('createdAt'))

// State
export const state = () => ({
  comments: [],
  commentError: null,
})

// Mutations
export const mutations = {
  setComments(state, payload) {
    state.comments = payload
  },
  addComment(state, payload) {
    state.comments.push(payload)
  },
  setCommentError(state, payload) {
    state.postError = payload
  },
}

// Actions
export const actions = {
  async addComment(context, { message, author, postId }) {
    try {
      // Create post
      const res = await addDoc(colRef, {
        message,
        author,
        postId,
        createdAt: serverTimestamp(),
      })

      // Add post id to corresponding category
      await updateDoc(doc(db, 'recipes', postId), {
        recipes: arrayUnion(res.id),
      })
      await context.commit('addComment', { ...res.data(), id: res.id })
    } catch (err) {
      console.log(err.message)
      context.commit('setCommentError', err.message)
    }
  },
  async loadComments(context, { postId }) {
    try {
      await onSnapshot(colQuery, (snap) => {
        let comments = []
        const filteredComments = snap.docs.filter((doc) => {
          return doc.data().postId === postId
        })
        filteredComments.forEach((doc) => {
          comments.push({
            ...doc.data(),
            id: doc.id,
          })
        })
        context.commit('setComments', comments)
      })
    } catch (err) {
      console.log(err.message)
      context.commit('setPostError', err.message)
    }
  },
}

// Getters
export const getters = {
  getComments() {
    return state.comments
  },
  getCommentError() {
    return state.commentError
  },
}
