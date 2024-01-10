<template>
  <PostsItems :items="items"/>
</template>

<script setup>
const route = useRoute();
const category = await useFetchCategory(route.params.itemid);
const items = category?.value?.data?.category?.visitingCard?.map(item => item.visitingCard);
</script>

<style lang="scss" scoped>
.wiz_container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
