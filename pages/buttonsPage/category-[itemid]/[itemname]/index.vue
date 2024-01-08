<template>
  <Buttons :items="category.data.category.button" :name="route.params.itemname" />
</template>

<script setup>
const route = useRoute();
const category = await useFetchCategory(route.params.itemid);
</script>
