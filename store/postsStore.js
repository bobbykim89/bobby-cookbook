import { db, storage } from '@/plugins/firebase'
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

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

// Collection ref
const colRef = collection(db, 'recipes')

// Queries
const colQuery = query(colRef, orderBy('createdAt', 'desc'))

// State
export const state = () => ({
  recipes: [],
  postError: null,
})

// Mutations
export const mutations = {
  setPosts(state, payload) {
    state.recipes = payload
  },
  setPostError(state, payload) {
    state.postError = payload
  },
}

// Actions
export const actions = {
  async addPost(
    context,
    { title, category, ingredients, direction, author, cover }
  ) {
    try {
      // Upload image to store
      const storeRef = ref(storage, `cover/${cover.name}`)
      const imageRes = await uploadBytes(storeRef, cover)
      const imgUrl = await getDownloadURL(ref(storeRef, imageRes.fullPath))

      // Create post
      const res = await addDoc(colRef, {
        title,
        category,
        ingredients,
        direction,
        author,
        createdAt: serverTimestamp(),
        cover: imgUrl,
      })

      // Add post id to corresponding category
      await updateDoc(doc(db, 'categories', category), {
        recipes: arrayUnion(res.id),
      })
    } catch (err) {
      console.log(err.message)
      context.commit('setPostError', err.message)
    }
  },
  async editPost(context, { id, title, category, ingredients, direction }) {
    try {
      // remove id from current category
      await updateDoc(doc(db, 'categories', category), {
        recipes: arrayRemove(id),
      })
      // update the post
      const res = await updateDoc(doc(db, 'recipes', id), {
        title: title,
        category: category,
        ingredients: ingredients,
        direction: direction,
        updatedAt: serverTimestamp(),
      })
      // add post id to updated corresponding category
      await updateDoc(doc(db, 'categories', category), {
        recipes: arrayUnion(res.id),
      })
    } catch (err) {
      console.log(err.message)
      context.commit('setPostError', err.message)
    }
  },
  async loadPosts(context) {
    try {
      await onSnapshot(colQuery, (snap) => {
        let recipes = []
        snap.docs.forEach((doc) => {
          const categoryName =
            context.rootState.categoryStore.categories.filter((category) => {
              return category.id === doc.data().category
            })
          recipes.push({
            ...doc.data(),
            id: doc.id,
            categoryName: categoryName[0].name,
          })
        })

        context.commit('setPosts', recipes)
      })
    } catch (err) {
      console.log(err.message)
      context.commit('setPostError', err.message)
    }
  },
}

// Getters
export const getters = {
  getPosts() {
    return state.recipes
  },
  getPostError() {
    return state.postError
  },
}
