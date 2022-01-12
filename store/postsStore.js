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
} from 'firebase/firestore'

// Collection ref
const colRef = collection(db, 'recipes')

// Queries
const colQuery = query(colRef, orderBy('createdAt', 'desc'))

export const state = () => ({
  recipes: [],
  postError: null,
})

export const mutations = {
  setPosts(state, payload) {
    state.recipes = payload
  },
  setPostError(state, payload) {
    state.postError = payload
  },
}

export const actions = {
  async addPost(context, { title, category, ingredients, direction, author }) {
    try {
      const res = await addDoc(colRef, {
        title,
        category,
        ingredients,
        direction,
        author,
        createdAt: serverTimestamp(),
      })
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

export const getters = {}
