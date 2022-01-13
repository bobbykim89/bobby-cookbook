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
import { connectStorageEmulator } from 'firebase/storage'

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
    } catch (err) {
      console.log(err.message)
      context.commit('setCommentError', err.message)
    }
  },
  async loadComments(context) {
    try {
      await onSnapshot(colQuery, (snap) => {
        // let comments = []
        const comments = snap.docs.map((doc) => {
          //   comments.push({
          //     ...doc.data(),
          //     id: doc.id,
          //   })
          return { ...doc.data(), id: doc.id }
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
