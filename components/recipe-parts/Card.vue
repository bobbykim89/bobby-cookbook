<template>
  <div
    class="w-[95%] lg:w-full mx-auto overflow-hidden border-black border rounded shadow-xl font-inter mb-4 bg-white hover:scale-105 transition ease-in duration-300"
  >
    <div class="aspect-w-3 aspect-h-2">
      <img
        :src="this.recipe.cover"
        alt="card picture"
        class="object-cover object-center max-w-[150%]"
      />
    </div>
    <div class="mx-6 my-4">
      <h1 class="text-2xl font-semibold mb-3 capitalize">
        {{ this.recipe.title }}
      </h1>
      <div class="text-right mb-4">
        <nuxt-link
          to="/recipes"
          class="inline-block px-6 py-2 rounded bg-[#d45464] hover:bg-[#cc080b] text-white capitalize transition ease-in duration-150"
        >
          {{ this.recipe.category }}
        </nuxt-link>
      </div>
      <p class="mb-3">{{ this.recipe.direction.substring(0, 100) }}...</p>
      <div class="flex flex-center items-center mb-4">
        <img
          :src="this.recipe.authorProfile"
          alt="avatar"
          class="ml-2 mr-4 w-10 h-10 object-cover rounded-full block"
        />
        <h3 class="text-gray-700 font-semibold">
          {{ this.recipe.author }}
        </h3>
      </div>
      <div class="items-center w-full text-center">
        <nuxt-link
          to="/recipes"
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
  data() {
    return {
      recipe: {
        cover: '/images/default.jpg',
        title: 'Mexican Taco',
        category: 'Mexican',
        direction:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ratione veniam unde eaque ad, itaque natus ab delectus neque explicabo possimus minima quod harum nihil nisi omnis velit quo ducimus quisquam aliquid nam vitae, saepe a. Ad, aut nisi. Tempore quaerat nulla, necessitatibus libero rem animi quis reprehenderit officiis sed qui adipisci quibusdam quos autem illum reiciendis odit sit eos deleniti quae? Sint odio tenetur in. Repellat debitis reiciendis blanditiis corrupti accusamus doloremque placeat adipisci, atque veniam assumenda cum, ullam eius. Saepe, cum at nisi error inventore ipsa tempora optio alias autem repudiandae possimus nesciunt, quisquam minima, magnam rem debitis.',
        author: 'Manguito Lovebird',
        authorProfile: '/images/defaultProfile.jpg',
      },
    }
  },
}
</script>
