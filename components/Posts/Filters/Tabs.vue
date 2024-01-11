<template>
  <UTabs :items="tabsItems" :default-index="0">
    <template #item="{ item }">
      <PostsFiltersBasic v-if="item.key === 'basic'" :filters="$attrs.filters" :lang="$attrs.lang" />
    </template>
  </UTabs>
</template>
<script setup>
const tabsItems = [
  {
    label: 'Basic',
    key: 'basic',
  },
  {
    label: 'Tags',
    key: 'tags',
  },
  {
    label: 'Map',
    key: 'map',
  },
];
</script>
