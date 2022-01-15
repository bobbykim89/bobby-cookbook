<template>
  <section class="lg:w-2/3 mx-auto py-20">
    <div class="mb-8 shadow-xl grid">
      <img
        :src="postData.cover ? postData.cover : this.placeholderImages.cover"
        alt="cover"
        class="max-h-[40vh] lg:max-h-[70vh] w-full object-cover object-center"
      />
    </div>
    <div class="w-[90%] lg:w-full mx-auto mb-8">
      <h1
        class="text-4xl lg:text-7xl capitalize font-bold tracking-wider ml-3 mb-4"
      >
        {{ postData.title }}
      </h1>
      <div class="mb-8">
        <div
          class="inline-block mb-6 items-center bg-white border border-gray-300 shadow-lg rounded-lg px-2 py-2"
        >
          <nuxt-link to="/recipes">
            <i
              class="material-icons text-4xl text-[#f1ac18] hover:text-[#f25b0a] transition ease-in duration-150 align-middle"
              >arrow_back</i
            >
          </nuxt-link>
          <div
            v-if="this.$store.state.authStore.isAuthenticated"
            class="inline-block"
          >
            <div
              v-if="
                this.$store.getters['authStore/getUser'].uid ===
                postData.author.userId
              "
              class="inline-block"
            >
              <a :href="`/recipes/post/${postId}/edit`"
                ><i
                  class="material-icons text-4xl text-[#d45464] hover:text-[#cc080b] transition ease-in duration-150 align-middle"
                  >edit</i
                >
              </a>
              <i
                @click="handleDelete"
                class="material-icons text-4xl text-[#f1ac18] hover:text-[#f25b0a] transition ease-in duration-150 align-middle cursor-pointer"
                >delete</i
              >
            </div>
            <i
              v-on="
                !checkLike ? { click: handleLike } : { click: handleUnlike }
              "
              class="material-icons text-4xl text-[#d45464] hover:text-[#cc080b] transition ease-in duration-150 align-middle cursor-pointer"
              >{{ !checkLike ? 'star_border' : 'star' }}</i
            >
          </div>
          <button>
            <i
              @click="copyURL"
              class="material-icons text-4xl text-[#f1ac18] hover:text-[#f25b0a] transition ease-in duration-150 align-middle"
              >share</i
            >
          </button>
          <nuxt-link
            :to="`/recipes/category/${postData.category}`"
            class="inline-block px-3 py-2 ml-2 rounded bg-[#d45464] hover:bg-[#cc080b] text-white capitalize border border-[#d45464] hover:border-[#cc080b] transition ease-in duration-150 capitalize"
          >
            {{ postData.categoryName }}
          </nuxt-link>
        </div>

        <div class="flex justify-end items-center mb-2">
          <img
            :src="
              postData.author.avatar
                ? postData.author.avatar
                : this.placeholderImages.authorProfile
            "
            alt="avatar"
            class="ml-2 mr-4 w-10 h-10 object-cover rounded-full block"
          />
          <h3 class="text-gray-700 font-semibold">
            {{ postData.author.username }}
          </h3>
        </div>
        <p v-if="!postData.updatedAt" class="text-right mb-4">
          Posted on
          {{
            $moment(new Date(postData.createdAt.seconds * 1000)).format(
              'MMMM Do YYYY'
            )
          }}
        </p>
        <p v-else class="text-right mb-4">
          Edited on
          {{
            $moment(new Date(postData.updatedAt.seconds * 1000)).format(
              'MMMM Do YYYY'
            )
          }}
        </p>
      </div>
      <RecipeTabs
        :ingredients="postData.ingredients"
        :direction="postData.direction"
      />
    </div>
    <CommentSection :comments="loadComments" :postId="postId" />
  </section>
</template>

<script>
import { db } from '@/plugins/firebase'
import { doc, getDoc } from 'firebase/firestore'
import RecipeTabs from '@/components/recipe-parts/RecipeTabs.vue'
import CommentSection from '@/components/comment-parts/CommentSection.vue'

export default {
  components: {
    RecipeTabs,
    CommentSection,
  },
  data() {
    return {
      placeholderImages: {
        cover: '/images/default.jpg',
        authorProfile: '/images/defaultProfile.jpg',
      },
      postId: this.$route.params.id,
    }
  },
  head() {
    return {
      title: `${
        this.postData.title.charAt(0).toUpperCase() +
        this.postData.title.slice(1)
      }`,
    }
  },
  async asyncData(context) {
    const docRef = doc(db, 'recipes', context.params.id)
    const docSnap = await getDoc(docRef)
    const result = await docSnap.data()
    const getCategory = await getDoc(doc(db, 'categories', result.category))
    return {
      postData: { ...result, categoryName: getCategory.data().name },
    }
  },
  computed: {
    loadComments() {
      const getComments = this.$store.getters['commentStore/getComments']
      const currentComments = getComments.filter((comment) => {
        return comment.postId === this.postId
      })
      return currentComments
    },
    checkLike() {
      if (
        !this.postData.liked ||
        !this.$store.getters['authStore/getAuthentication']
      ) {
        return false
      } else {
        const checker =
          this.postData.liked &&
          this.postData.liked.includes(
            this.$store.getters['authStore/getUser'].uid
          )
        return checker
      }
    },
  },
  methods: {
    handleDelete() {
      if (
        this.$store.state.authStore.user.uid !== this.postData.author.userId
      ) {
        console.log('You are not authorized to do so')
        this.$router.go()
      } else {
        if (
          confirm(
            'This will permanently delete this recipe and related comments. Please confirm to proceed.'
          )
        ) {
          this.$store
            .dispatch('postsStore/deletePost', {
              id: this.postId,
            })
            .then(() => {
              this.$router.push('/recipes')
            })
        }
      }
    },
    copyURL() {
      const currentUrl = window.location.href
      navigator.clipboard.writeText(currentUrl)
    },
    handleLike() {
      if (!this.$store.state.authStore.isAuthenticated) {
        console.log('Please login to do so')
        return
      } else {
        this.$store
          .dispatch('postsStore/likePost', {
            id: this.postId,
          })
          .then(() => {
            this.$router.go()
          })
      }
    },
    handleUnlike() {
      if (!this.$store.state.authStore.isAuthenticated) {
        console.log('Please login to do so')
        return
      } else {
        this.$store
          .dispatch('postsStore/unlikePost', {
            id: this.postId,
          })
          .then(() => {
            this.$router.go()
          })
      }
    },
  },
}
</script>
