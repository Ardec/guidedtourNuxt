<template>
  <Categories :items="items" type="subcategory" />
</template>

<script setup>
const route = useRoute();
const category = await useFetchCategory(route.params.itemid);
const items = category?.value?.data?.category?.subcategory?.map((item) => ({
  ...item.subCategory,
  searchEngine: item.subCategory?.searchEngine?.id,
}));
</script>
