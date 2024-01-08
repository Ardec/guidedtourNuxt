<template>
  <Buttons :items="subcategory.data.subCategory.button" />
</template>

<script setup>
const route = useRoute();
const subcategory = await useFetchSubCategory(route.params.itemid);
</script>
