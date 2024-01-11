<template>
  <div class="wiz_container">
    <div v-for="item in $attrs.items" :key="item.id">
      <PostsItem :item="item" :lang="lang"/>
    </div>
  </div>
</template>

<script setup>
const lang = await useFetchLang();
</script>

<style scoped lang="scss">
.wiz_container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>
