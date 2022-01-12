import { db } from '@/plugins/firebase'
import {
  collection,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
  addDoc,
} from 'firebase/firestore'

// Collection ref
const colRef = collection(db, 'categories')

// Queries
const colQuery = query(colRef, orderBy('createdAt'))

export const state = () => ({
  categories: [],
  categoryError: null,
})

export const mutations = {
  setCategories(state, payload) {
    state.categories = payload
  },
  addCategory(state, payload) {
    state.categories.push(payload)
  },
  setCategoryError(state, payload) {
    state.categoryError = payload
  },
}

export const actions = {
  async addCategory(context, { name }) {
    try {
      const res = await addDoc(colRef, {
        name,
        createdAt: serverTimestamp(),
      })
      await context.commit('addCategory', res)
    } catch (err) {
      console.log(err.message)
      context.commit('setCategoryError', err.message)
    }
  },
  async loadCategories(context) {
    try {
      const res = await onSnapshot(colQuery, (snapshot) => {
        let categories = []
        snapshot.docs.forEach((doc) => {
          categories.push({ ...doc.data(), id: doc.id })
        })
        return categories
      })
      await context.commit('setCategories', res)
    } catch (err) {
      console.log(err.message)
      context.commit('setCategoryError', err.message)
    }
  },
}

export const getters = {
  getCategories(state) {
    return state.categories
  },
}
