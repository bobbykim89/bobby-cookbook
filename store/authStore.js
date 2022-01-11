import { auth } from '~/plugins/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

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
      await res.user.updateProfile({ username })
      context.commit('setUser', res.user)
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
      console.log(err.value)
      const errMessage = 'Incorrect login credentials'
      context.commit('setAuthError', errMessage)
    }
  },
  async logout(context) {
    await signOut(auth)
    context.commit('setUser', null)
  },
  async loadUser(context) {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        context.commit('setUser', user)
        context.commit('setAuthentication', true)
      } else {
        context.commit('setUser', null)
        context.commit('setAuthentication', false)
      }
      unSub()
    })
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

// export const authStore = {
//   state: {
//     user: null,
//     isAuthenticated: false,
//     authError: null,
//   },
//   mutations: {
//     setUser(state, payload) {
//       state.user = payload
//       console.log('user state changed: ', state.user)
//     },
//     setAuthentication(state, payload) {
//       state.isAuthenticated = payload
//     },
//     setAuthError(state, payload) {
//       state.authError = payload
//     },
//   },
//   actions: {
//     async signUp(context, { email, password, username }) {
//       try {
//         const res = await createUserWithEmailAndPassword(auth, email, password)
//         if (!res) {
//           throw new Error('Could not complete the signup')
//         }
//         await res.user.updateProfile({ username })
//         context.commit('setUser', res.user)
//       } catch (err) {
//         console.log(err.message)
//         context.commit('setAuthError', err.message)
//       }
//     },
//     async login(context, { email, password }) {
//       try {
//         const res = await signInWithEmailAndPassword(auth, email, password)
//         context.commit('setUser', res.user)
//       } catch (err) {
//         console.log(err.value)
//         const errMessage = 'Incorrect login credentials'
//         context.commit('setAuthError', errMessage)
//       }
//     },
//     async logout(context) {
//       await signOut(auth)
//       context.commit('setUser', null)
//     },
//     async loadUser(context) {
//       const unSub = onAuthStateChanged(auth, (user) => {
//         if (user) {
//           context.commit('setUser', user)
//           context.commit('setAuthentication', true)
//         } else {
//           context.commit('setUser', null)
//           context.commit('setAuthentication', false)
//         }
//         unSub()
//       })
//     },
//   },
//   getters: {
//     getUser(state) {
//       return state.user
//     },
//     getAuthentication(state) {
//       return state.isAuthenticated
//     },
//     getError(state) {
//       return state.authError
//     },
//   },
// }
