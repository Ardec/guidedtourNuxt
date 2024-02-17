<template>
  <div class="results-count">
    {{ count }}
    {{ lang.chipSearchResults == null ? 'Wyników wyszukiwania' : lang.chipSearchResults }}
  </div>
  <PostsItems :items="items"></PostsItems>
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
.results-count {
  background: $accent;
  color: #fff;
  padding: 2px 5px;
}
</style>