<template>
  <section class="lg:w-2/3 mx-auto py-20">
    <Loading v-if="$fetchState.pending" />
    <div class="mb-8 shadow-xl">
      <img
        :src="this.placeholderImages.cover"
        alt="cover"
        class="max-h-[70vh] w-full object-cover object-center"
      />
    </div>
    <div class="w-[90%] lg:w-full mx-auto mb-8">
      <h1
        class="text-4xl lg:text-7xl capitalize font-bold tracking-wider ml-3 mb-4"
      >
        {{ this.postData.title }}
      </h1>
      <div class="mb-8">
        <div class="flex justify-start mb-6 items-center">
          <nuxt-link
            to="/recipes"
            class="inline-block px-3 lg:px-4 py-2 rounded border border-[#f1ac18] hover:border-[#f25b0a] text-[#f1ac18] hover:text-[#f25b0a] capitalize ml-1 lg:ml-2 mr-2 lg:mr-3 font-semibold transition ease-in duration-150"
          >
            Go Back
          </nuxt-link>
          <!-- {isAuthenticated && editAndDelete} -->
          <button onClick="{copyLink}">
            <i
              class="material-icons text-4xl text-[#d45464] hover:text-[#cc080b] text-shadow-xl transition ease-in duration-150"
              >share</i
            >
          </button>
        </div>

        <div class="text-right mb-6">
          <nuxt-link
            :to="`/recipes/category/${this.postData.category}`"
            class="inline-block px-4 py-2 rounded bg-[#d45464] hover:bg-[#cc080b] text-white capitalize border border-[#d45464] hover:border-[#cc080b] transition ease-in duration-150"
          >
            {{
              this.postData.categoryName.charAt(0).toUpperCase() +
              this.postData.categoryName.slice(1)
            }}
          </nuxt-link>
        </div>
        <div class="flex justify-end items-center mb-2">
          <img
            :src="this.placeholderImages.authorProfile"
            alt="avatar"
            class="ml-2 mr-4 w-10 h-10 object-cover rounded-full block"
          />
          <h3 class="text-gray-700 font-semibold">
            {{ this.postData.author.username }}
          </h3>
        </div>
        <p class="text-right mb-4">
          {{
            $moment(new Date(postData.createdAt.seconds * 1000)).format(
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
    <!-- <CommentSection comments={comments} /> -->
  </section>
</template>

<script>
import { db } from '@/plugins/firebase'
import { doc, getDoc } from 'firebase/firestore'
import Loading from '@/components/widgets/Loading.vue'
import RecipeTabs from '@/components/recipe-parts/RecipeTabs.vue'

export default {
  components: {
    Loading,
    RecipeTabs,
  },
  data() {
    return {
      placeholderImages: {
        cover: '/images/default.jpg',
        authorProfile: '/images/defaultProfile.jpg',
      },
      postId: this.$route.params.id,
      postData: {
        title: '',
        author: { username: '' },
        ingredients: '',
        direction: '',
        category: '',
        categoryName: '',
        createdAt: '',
      },
    }
  },
  async fetch() {
    await this.getSinglePost()
  },
  methods: {
    async getSinglePost() {
      const docRef = doc(db, 'recipes', this.postId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists) {
        const result = await docSnap.data()
        const getCategory = await getDoc(doc(db, 'categories', result.category))

        this.postData = { ...result, categoryName: getCategory.data().name }
      } else {
        this.$router.push('/recipes')
      }
    },
  },
}
</script>

<style></style>
