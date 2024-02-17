<template>
  <div class="results-count">
    {{ count }}
    {{ lang.chipSearchResults == null ? 'Wyników wyszukiwania' : lang.chipSearchResults }}
  </div>
  <div class="wiz_container">
    <div v-for="item in items" :key="item.id">
      <PostsItem :item="item" :lang="lang" />
    </div>
  </div>
</template>
<script setup>
const lang = useState('lang');
const items = ref([]);
const count = ref(0);

const events = await useFetchEvents();
items.value = events.value.data.events;
count.value = items.value.length;
</script>
<style scoped lang="scss">
.wiz_container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.results-count {
  background: $accent;
  color: #fff;
  padding: 2px 5px;
}
</style>