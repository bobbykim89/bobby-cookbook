<template>
  <section class="py-20 text-white font-semibold min-h-[85vh] relative">
    <!-- Background -->
    <div
      class="absolute bg-gradient-to-br from-[#f1ac18] to-[#f25b0a] via-[#d45464] inset-0 pointer-events-none overflow-hidden"
    >
      <div
        class="grid grid-cols-4 lg:grid-cols-6 grid-rows-4 h-full w-full transform -skew-y-12 opacity-75"
      >
        <div class="hidden lg:block bg-pink-600 row-span-2 bg-gradient-to-bl" />
        <div class="hidden lg:block bg-gradient-to-tr" />
        <div class="bg-gradient-to-br col-span-2" />
        <div class="bg-gradient-to-bl col-span-2 row-span-2" />
        <div class="bg-gradient-to-tr row-span-3 row-start-2 lg:col-start-3" />
        <div class="bg-gradient-to-tl row-start-3 col-start-4 lg:col-start-6" />
        <div class="hidden lg:block bg-gradient-to-br row-start-4 col-span-2" />
        <div
          class="bg-gradient-to-br row-start-4 col-start-2 lg:col-start-4 col-span-2"
        />
      </div>
    </div>
    <div class="lg:w-2/3 mx-auto px-4 relative">
      <div class="inline-block items-center grid grid-flow-row lg:grid-cols-2">
        <!-- Left -->
        <div class="inline-block py-20 justify-center">
          <img
            src="~assets/images/about.jpg"
            alt="bird on monitor"
            class="w-2/3 mx-auto rounded-full border-4 border-white shadow-lg"
          />
        </div>
        <div class="flex flex-col inline-block px-2 mx-auto">
          <h2 class="text-3xl tracking-wider text-center mb-2">
            About Bobby's Cookbook
          </h2>
          <div class="mb-4">
            <p class="text-md">Recipe webapp</p>
            <p class="text-md">Version: 0.1.0(Beta)</p>
            <p class="text-md">Made by: Bobby Kim</p>
          </div>
          <ul class="text-6xl flex flex-wrap justify-center">
            <li
              class="mx-2 hover:text-gray-300 transition ease-in duration-150"
            >
              <a
                href="https://github.com/bobbykim89"
                target="_blank"
                rel="noreferrer"
              >
                <i class="fab fa-github-square" />
              </a>
            </li>
            <li
              class="mx-2 hover:text-gray-300 transition ease-in duration-150"
            >
              <a
                href="https://www.linkedin.com/in/bobby-kim-9baa17165/"
                target="_blank"
                rel="noreferrer"
              >
                <i class="fab fa-linkedin" />
              </a>
            </li>
            <li
              class="mx-2 hover:text-gray-300 transition ease-in duration-150"
            >
              <a
                href="mailto:bobby.sihun.kim@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                <i class="fas fa-envelope-square" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  head() {
    return {
      title: "About - Bobby's Cookbook",
    }
  },
}
</script>
