<template>
  <div class="wiz_container">
    <div v-for="item in $attrs.items" :key="item.id">
      <PostsItem :item="item" :lang="lang" />
    </div>
  </div>
</template>
<script setup>
const lang = useState('lang');
</script>
<style scoped lang="scss">
.wiz_container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
