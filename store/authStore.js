import { auth, storage } from '~/plugins/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const state = () => ({
  user: null,
  isAuthenticated: false,
  authError: null,
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
    console.log('user state changed: ', state.user)
  },
  setAuthentication(state, payload) {
    state.isAuthenticated = payload
  },
  setAuthError(state, payload) {
    state.authError = payload
  },
}

export const actions = {
  async signUp(context, { email, password, username }) {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      if (!res) {
        throw new Error('Could not complete the signup')
      }
      await updateProfile(res.user, { displayName: username })
      await context.commit('setUser', res.user)
    } catch (err) {
      console.log(err.message)
      context.commit('setAuthError', err.message)
    }
  },
  async login(context, { email, password }) {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      context.commit('setUser', res.user)
    } catch (err) {
      console.log(err.message)
      const errMessage = 'Incorrect login credentials'
      context.commit('setAuthError', errMessage)
    }
  },
  async logout(context) {
    await signOut(auth)
    context.commit('setUser', null)
  },
  async loadUser(context) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        context.commit('setUser', user)
        context.commit('setAuthentication', true)
      } else {
        context.commit('setUser', null)
        context.commit('setAuthentication', false)
      }
    })
  },
  async updateUserProfile(context, { displayName, profileImage }) {
    try {
      // Get current user data
      const user = auth.currentUser

      if (profileImage === '') {
        // Update user profile info without profile image
        updateProfile(user, {
          displayName: displayName,
        }).then(() => {
          console.log('Profile has updated successfully!')
        })
      } else {
        // upload image and get download path
        const storeRef = ref(
          storage,
          `profile/${user.uid}/${profileImage.name}`
        )
        const imageRes = await uploadBytes(storeRef, profileImage)
        const imgUrl = await getDownloadURL(ref(storeRef, imageRes.fullPath))

        // Update user profile info
        updateProfile(user, {
          displayName: displayName,
          photoURL: imgUrl,
        }).then(() => {
          console.log('Profile has updated successfully!')
        })
      }
    } catch (err) {
      console.log(err.message)
      context.commit('setAuthError', err.message)
    }
  },
}

export const getters = {
  getUser(state) {
    return state.user
  },
  getAuthentication(state) {
    return state.isAuthenticated
  },
  getError(state) {
    return state.authError
  },
}
