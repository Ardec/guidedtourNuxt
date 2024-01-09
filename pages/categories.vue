<template>
  <Categories :items="categories?.data?.simpleCategories" type="category"/>
</template>

<script setup>
const categories = await useFetchCategories();
</script>
