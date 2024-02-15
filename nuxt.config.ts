// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // head: {
  //   link: [
  //     { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css' }
  //   ]
  // },
  modules: ["@nuxt/content"],
  // content: {
  //   markdown: {
  //     rehypePlugins: [
  //       ['rehype-katex', {/* options here if needed*/ }]
  //     ]
  //   }
  // }
});
