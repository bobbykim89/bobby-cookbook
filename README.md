# Bobby's Cook Book - Nuxt Ver. v0.1.0 (In Progress)

Small cookbook webpage using Nuxt.js, Vuex, Firebase and Tailwind CSS.

## Scripts

In the project directory, you can run:

### `npm run develop`

Runs app with css watcher concurrently localhost.\

App can be found in [http://localhost:3000](http://localhost:3000) for more information.

## Sample Design Layout

Layout can be found in following Links:\

[PDF Version](https://drive.google.com/file/d/1HIL0IOkn7GSX_48taIbAhtnk6SjPYrId/view?usp=sharing)

[Adobe XD](https://xd.adobe.com/view/97f6bf09-b82c-415d-afbd-d3ae0694106a-c2a5/)

## `Dependencies`

tailwindcss/aspect-ratio\
tailwindcss-textshadow\
autoprefixer\
moment\
postcss-cli\
tailwindcss\
Firebase\
js-cookie\
jwt-decoder\
cookieparser

## Changes

1. Initialize the project using Nuxt.js for frontend and Firebase on the backend.
2. Headless UI doesn't support Nuxt running on Vue 2, so I need to work the UI manually.
3. Authentication and some of functionalities of regarding posts are added. Some elements are now being dynamically displayed.
4. Added CRUD functionality for Recipes, and CRD for Comments. also Recipes can be sorted by categories.
5. Added User profile page that filters the posts that has been created by user, liked by user, and profile update which you can change profile picture and username.
6. Fixed bugs found while processing actions in Vuex store. now it is fixed and I will see if I can find more in the future.

## Known Issues

N/A

## Update Log

N/A
