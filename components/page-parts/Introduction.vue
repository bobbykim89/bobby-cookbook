<template>
  <section class="my-12 text-white">
    <div
      class="relative z-10 top-auto bottom-0 left-0 right-0 w-full pointer-events-none overflow-hidden h-[80px]"
    >
      <svg
        class="absolute bottom-0 overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        version="1.1"
        viewBox="0 0 2560 100"
        x="0"
        y="0"
      >
        <polygon
          class="text-[#d45464] fill-current"
          points="0 0 2560 100 0 100"
        />
      </svg>
    </div>
    <div class="bg-[#d45464] py-12">
      <div
        class="grid lg:grid-cols-2 grid-flow-row gap-12 mx-auto w-[95%] lg:w-2/3"
      >
        <div class="aspect-w-1 aspect-h-1">
          <img
            :src="this.imageUrl"
            alt="intro image"
            class="shadow-xl rounded"
          />
        </div>
        <div class="w-full self-center">
          <h1 class="text-3xl lg:text-5xl font-bold mb-2">
            Hi, this is Bobby!
          </h1>
          <h1 class="text-2xl lg:text-4xl font-semibold mb-4">
            Just a guy who loves to cook
          </h1>
          <p class="mb-6">
            I am a web developer, and cooking is one of my favorite hobbies. My
            first cooking experience was when I was serving military as a cook.
            I found cooking really destressing, and it is always great
            experience for me to see my family and friends enjoying my food. I
            like to try cooking different foods from different countries and
            improve my skills.
          </p>
          <p class="block p-2 bg-white shadow-xl" />
        </div>
      </div>
    </div>
    <div
      class="relative top-auto bottom-0 left-0 right-0 w-full pointer-events-none overflow-hidden h-[80px]"
    >
      <svg
        class="absolute top-0 overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        version="1.1"
        viewBox="0 0 2560 100"
        x="0"
        y="0"
      >
        <polygon
          class="text-[#d45464] fill-current"
          points="0 0 2560 0 0 100"
        />
      </svg>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      imageUrl:
        'https://images.unsplash.com/photo-1564844536308-50b114a1d946?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=994&q=80',
    }
  },
}
</script>

<style></style>
