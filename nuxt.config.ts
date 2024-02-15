// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // head: {
  //   link: [
  //     { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css' }
  //   ]
  // },
  modules: ["@nuxt/content"],
  content: {
    markdown: {
      remarkPlugins: [
        'remark-math', // Assuming you're using remark-math
      ],
      rehypePlugins: [
        'rehype-katex', // Correct way without passing specific options
      ]
    }
  }
});
