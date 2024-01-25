<template>
  <UTabs :items="tabsItems" :default-index="0">
    <template #item="{ item }">
      <PostsFiltersBasic
        v-if="item.key === 'basic'"
        :filters="$attrs.filters"
        :lang="$attrs.lang"
        :isTimeFilterActive="$attrs.isTimeFilterActive"
        :isEventFilterActive="$attrs.isEventFilterActive"
        :isStartEndFilterActive="$attrs.isStartEndFilterActive" />
      <PostsFiltersTags v-if="item.key === 'tags'" :tags="$attrs.tags" :lang="$attrs.lang" />
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
