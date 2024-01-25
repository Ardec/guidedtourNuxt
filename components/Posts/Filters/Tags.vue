<template>
  <div class="flex flex-wrap gap-x-5 tags-container">
    <div class="flex gap-x-1" v-for="item of tags" :key="item"><UToggle v-model="item.value" />{{ item.name }}</div>
  </div>
</template>
<script setup>
const attrs = useAttrs();
const tags = attrs.tags;
</script>
<style scoped>
.tags-container {
  background: rgba(255, 255, 255, 0.6);
  padding: 15px;
  border-radius: 8px;
}
</style>
