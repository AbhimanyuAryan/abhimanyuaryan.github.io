<template>
  <main>
    <ContentRenderer :value="deeplearning">
    </ContentRenderer>
  </main>
</template>

<script setup>
  const slug = useRoute().params.slug.toString().replace(/,/g, "/");
  const { data: deeplearning } = await useAsyncData(slug, () => {
		return queryContent(slug).findOne();
	});

  useHead({
		title: `${deeplearning.value.title}`,
	});
</script>