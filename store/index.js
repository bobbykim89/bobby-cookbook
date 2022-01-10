import Vuex from 'vuex'
import { posts } from '@/store/modules/posts'

export default () =>
  new Vuex.Store({
    modules: {
      posts,
    },
  })
