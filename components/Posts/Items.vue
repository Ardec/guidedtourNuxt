<template>
  <PostsFiltersTabs
    :filters="filters"
    :tags="tags"
    :lang="lang"
    :isTimeFilterActive="true"
    :isEventFilterActive="true"
    :isStartEndFilterActive="true" />
    <div class="results-count">
      {{ filteredCount }} / {{ count }} {{ lang.chipSearchResults == null ? 'Wyników filtrowania' : lang.chipSearchResults }}
    </div>
  <div class="wiz_container">
    <div v-for="item in items" :key="item.id">
      <PostsItem :item="item" :lang="lang" />
    </div>
  </div>
</template>

<script setup>
const lang = useState('lang');
const route = useRoute();
const attrs = useAttrs();
const items = ref([]);
const count = ref(0);
const filteredCount = ref(0);
const tags = ref([]);

const filters = reactive({
  name: null,
  isOpenNow: false,
  isOpenToday: false,
  isOpenTomorow: false,
  isOpenSaturaday: false,
  isOpenSunday: false,
  promoOpenNow: false,
  promoOpenToday: false,
  promoOpenTomorow: false,
  promoOpenThisWeek: false,
  promoOpenThisMonth: false,
  promoOpenNextMonth: false,
  startFilter: {
    date: undefined,
    time: undefined,
  },
  endFilter: {
    date: undefined,
    time: undefined,
  },
});

const mapFilters = (filters) => {
  let f = {
    ...filters,
    categoryId: attrs.from === 'category' ? route.params.itemid : null,
    subCategoryId: attrs.from === 'subcategory' ? route.params.itemid : null,
    buttonId: attrs.from === 'button' ? route.params.itemid : null,
    groupId: attrs.from === 'group' ? route.params.itemid : null,
  };
  for (const [key, value] of Object.entries(f)) {
    f[key] = value === false ? null : value;
  }
  if (filters.startFilter.date) {
    f.startAt = filters.startFilter.date + (filters.startFilter.time ? ` ${filters.startFilter.time}` : '');
  } else {
    f.startAt = null;
  }
  if (filters.endFilter.date) {
    f.endAt = filters.endFilter.date + (filters.endFilter.time ? ` ${filters.endFilter.time}` : '');
  } else {
    f.endAt = null;
  }
  delete f.startFilter;
  delete f.endFilter;
  return f;
};

const mapTags = (tagsFromBe) => {
  if (!tags.value?.length) {
    tags.value = tagsFromBe?.map((t) => ({name: t.name, value: false}))
  }
};

const findPosts = async (filters, tags) => {
  const cards = await useFetchFilteredCards(mapFilters(filters), tags);
  items.value = cards?.value?.data?.filteredVisitingCards;
  filteredCount.value = cards.value?.data?.filteredVisitingCardsCount;
  count.value = cards.value?.data?.allVisitingCardsCount;
  mapTags(cards.value?.data.restOfTagsData);
};

watch(
  filters,
  (newVal, oldVal) => {
    findPosts(newVal, tags);
  },
  { deep: true }
);

watch(
  tags,
  (newVal, oldVal) => {
    findPosts(filters, newVal);
  },
  { deep: true }
);

await findPosts(filters);
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
