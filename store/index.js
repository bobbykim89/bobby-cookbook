import Vuex from 'vuex'
import { posts as POSTS } from '@/store/modules/posts'
import { auth as AUTH } from '@/store/modules/auth'

export default () =>
  new Vuex.Store({
    modules: {
      POSTS,
      AUTH,
    },
  })
