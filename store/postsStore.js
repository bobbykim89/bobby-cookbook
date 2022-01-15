import { db, storage, auth } from '@/plugins/firebase'
import {
  collection,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  addDoc,
  arrayUnion,
  arrayRemove,
  where,
  getDocs,
} from 'firebase/firestore'

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'

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
  setPost(state, payload) {
    state.currentPost = payload
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
        coverName: cover.name,
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
      const postOld = await getDoc(doc(db, 'recipes', id))
      const categoryOld = postOld.data().category

      await updateDoc(doc(db, 'categories', categoryOld), {
        recipes: arrayRemove(id),
      })
      // update the post
      await updateDoc(doc(db, 'recipes', id), {
        title: title,
        category: category,
        ingredients: ingredients,
        direction: direction,
        updatedAt: serverTimestamp(),
      })
      // add post id to updated corresponding category
      await updateDoc(doc(db, 'categories', category), {
        recipes: arrayUnion(id),
      })
    } catch (err) {
      console.log(err.message)
      context.commit('setPostError', err.message)
    }
  },
  async deletePost(context, { id }) {
    try {
      const currentPost = await (await getDoc(doc(db, 'recipes', id))).data()
      // delete all the related comments
      const relatedComments = await query(
        collection(db, 'comments'),
        where('postId', '==', id)
      )
      const querySnapshot = await getDocs(relatedComments)
      await querySnapshot.docs.map((snap) => {
        return deleteDoc(doc(db, 'comments', snap.id))
      })
      // pop id from category recipe array
      await updateDoc(doc(db, 'categories', currentPost.category), {
        recipes: arrayRemove(id),
      })
      // delete cover image file from storage
      const storeRef = ref(storage, `cover/${currentPost.coverName}`)
      await deleteObject(storeRef)

      // delete post
      await deleteDoc(doc(db, 'recipes', id))
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
  async likePost(context, { id }) {
    try {
      // Get current user data
      const user = auth.currentUser

      // add user uid to liked user list
      await updateDoc(doc(db, 'recipes', id), {
        liked: arrayUnion(user.uid),
      })
    } catch (err) {
      console.log(err.message)
      context.commit('setPostError', err.message)
    }
  },
  async unlikePost(context, { id }) {
    try {
      // Get current user data
      const user = auth.currentUser

      // pop user uid to liked user list
      await updateDoc(doc(db, 'recipes', id), {
        liked: arrayRemove(user.uid),
      })
    } catch (err) {
      console.log(err.message)
      context.commit('setPostError', err.message)
    }
  },
}

// Getters
export const getters = {
  getPosts(state) {
    return state.recipes
  },
  getPostError(state) {
    return state.postError
  },
}
