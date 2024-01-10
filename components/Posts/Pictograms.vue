<template>
  <div class="pictograms">
    <div v-for="(item, index) in $attrs.items" :key="item.id">
      <div v-if="index < 9" :title="`${item.name} ${item.url}`">
        <NuxtLink v-if="item.url" :to="item.url">
          <img :src="baseUrl + item.image" class="pictogram" />
        </NuxtLink>
        <img v-if="!item.url" :src="baseUrl + item.image" class="pictogram" />
      </div>
    </div>
  </div>
</template>

<script setup>
const baseUrl = useBaseUrl();
</script>

<style scoped lang="scss">
.pictograms {
  display: flex;
}
.pictogram {
  height: 31px;
  width: 31px;
  border-radius: 3px;
  cursor: pointer;
  margin: 4px 4px 0 0;
}
</style>
