<template>
  <div
    class="w-[95%] lg:w-full mx-auto overflow-hidden border-gray-300 border rounded shadow-xl font-inter mb-4 bg-white hover:scale-105 transition ease-in duration-300"
  >
    <div class="aspect-w-3 aspect-h-2">
      <img
        :src="post.cover ? post.cover : this.placeholderImages.cover"
        alt="card picture"
        class="object-cover object-center max-w-[150%]"
      />
    </div>
    <div class="mx-6 my-4">
      <h1 class="text-2xl font-semibold mb-3 capitalize">
        {{ post.title }}
      </h1>
      <div class="text-right mb-4">
        <nuxt-link
          :to="'/recipes/category/' + post.category"
          class="inline-block px-6 py-2 rounded bg-[#d45464] hover:bg-[#cc080b] text-white capitalize transition ease-in duration-150"
        >
          {{
            post.categoryName.charAt(0).toUpperCase() +
            post.categoryName.slice(1)
          }}
        </nuxt-link>
      </div>
      <p class="mb-3">{{ post.direction.substring(0, 100) }}...</p>
      <div class="flex flex-center items-center mb-4">
        <img
          :src="
            post.author.avatar
              ? post.author.avatar
              : this.placeholderImages.authorProfile
          "
          alt="avatar"
          class="ml-2 mr-4 w-10 h-10 object-cover rounded-full block"
        />
        <h3 class="text-gray-700 font-semibold">
          {{ post.author.username }}
        </h3>
      </div>
      <div class="items-center w-full text-center">
        <nuxt-link
          :to="'/recipes/post/' + post.id"
          class="block py-2 rounded bg-[#f1ac18] text-white hover:bg-[#f25b0a] transition ease-in duration-150"
        >
          See Recipe
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: { type: Object, required: true },
  },
  data() {
    return {
      placeholderImages: {
        cover: '/images/default.jpg',
        authorProfile: '/images/defaultProfile.jpg',
      },
    }
  },
}
</script>
