<template>
  <div class="tags-container">
    <div v-if="localisationTags?.length > 0" class="mb-2">
      <span v-if="lang?.filterLocalisationTags == null">Localisation tags ( OR )</span>
      <span v-else>{{ lang?.filterLocalisationTags }}</span>
      <div class="flex flex-wrap gap-x-5">
        <div class="flex gap-x-1" v-for="item of localisationTags" :key="item">
          <UToggle v-model="item.value" />{{ item.name }}
          <span
            >({{
              $attrs.filterCounts['localisationTags'] &&
              ($attrs.filterCounts['localisationTags'][item.name.trim()] ||
                $attrs.filterCounts['localisationTags'][item.name.trim()] === 0)
                ? $attrs.filterCounts['localisationTags'][item.name.trim()]
                : $attrs.allFilteredCount
            }})</span
          >
        </div>
      </div>
    </div>
    <div v-if="restOfTags?.length > 0">
      <span v-if="lang?.filterRestOfTags == null">Rest of Tags (AND) </span>
      <span v-else>{{ lang?.filterRestOfTags }}</span>
      <div class="flex flex-wrap gap-x-5">
        <div class="flex gap-x-1" v-for="item of restOfTags" :key="item">
          <UToggle v-model="item.value" />{{ item.name }}
          <span
            >({{
              $attrs.filterCounts['restOfTags'] &&
              ($attrs.filterCounts['restOfTags'][item.name.trim()] ||
                $attrs.filterCounts['restOfTags'][item.name.trim()] === 0)
                ? $attrs.filterCounts['restOfTags'][item.name.trim()]
                : $attrs.allFilteredCount
            }})</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const attrs = useAttrs();
const localisationTags = attrs.localisationTags;
const restOfTags = attrs.restOfTags;
</script>
<style scoped lang="scss">
.tags-container {
  background: rgba(255, 255, 255, 0.6);
  padding: 15px;
  border-radius: 8px;
}
.dark {
  .tags-container {
    background: rgb(38, 38, 38);
  }
}
</style>
