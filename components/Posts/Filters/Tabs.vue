<template>
  <UTabs :items="tabsItems" :default-index="0">
    <template #item="{ item }">
      <PostsFiltersBasic
        v-if="item.key === 'basic'"
        :filters="$attrs.filters"
        :lang="$attrs.lang"
        :filterCounts="$attrs.filterCounts"
        :isTimeFilterActive="$attrs.isTimeFilterActive"
        :isEventFilterActive="$attrs.isEventFilterActive" />
      <PostsFiltersTags
        v-if="item.key === 'tags'"
        :localisationTags="$attrs.localisationTags"
        :restOfTags="$attrs.restOfTags"
        :filterCounts="$attrs.filterCounts"
        :lang="$attrs.lang" />
      <PostsFiltersMap
        v-if="item.key === 'map'"
        :lang="$attrs.lang"
        :filters="$attrs.filters"
        :items="$attrs.cardsItems" />
    </template>
  </UTabs>
</template>
<script setup>
const attrs = useAttrs();
const localisationTags = attrs.localisationTags;
const restOfTags = attrs.restOfTags;

const tabsItems = [
  {
    label: 'Basic',
    key: 'basic',
  },
];

if (localisationTags?.length > 0 || restOfTags?.length > 0) {
  tabsItems.push({
    label: 'Tags',
    key: 'tags',
  });
}

if (attrs.isMapFilterActive) {
  tabsItems.push({
    label: 'Map',
    key: 'map',
  });
}
</script>
