<template>
  <UTabs :items="tabsItems" :default-index="0">
    <template #item="{ item }">
      <PostsFiltersBasic
        v-if="item.key === 'basic'"
        :filters="$attrs.filters"
        :lang="$attrs.lang"
        :isTimeFilterActive="$attrs.isTimeFilterActive"
        :isEventFilterActive="$attrs.isEventFilterActive" />
      <PostsFiltersTags
        v-if="item.key === 'tags'"
        :localisationTags="$attrs.localisationTags"
        :restOfTags="$attrs.restOfTags"
        :lang="$attrs.lang" />
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

if (false) {
  tabsItems.push({
    label: 'Map',
    key: 'map',
  });
}
</script>
