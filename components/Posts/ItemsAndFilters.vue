<template>
  <Alert v-if="error" :error="error"></Alert>
  <PostsFiltersTabs
    :filters="filters"
    :lang="lang"
    :cardsItems="items"
    :localisationTags="localisationTags"
    :restOfTags="restOfTags"
    :isMapFilterActive="isMapFilterActive"
    :isTimeFilterActive="isTimeFilterActive"
    :isEventFilterActive="isEventFilterActive"
    :filterCounts="filterCounts" />
  <div class="results-count">
    {{ filteredCount }} / {{ count }}
    {{ lang.chipSearchResults == null ? 'Wyników filtrowania' : lang.chipSearchResults }}
  </div>
  <PostsItems :items="items"></PostsItems>
</template>

<script setup>
const lang = useState('lang');
const route = useRoute();
const attrs = useAttrs();
const items = ref([]);
const count = ref(0);
const filteredCount = ref(0);
const restOfTags = ref([]);
const localisationTags = ref([]);
const filterCounts = ref({});

const isTimeFilterActive = ref(false);
const isEventFilterActive = ref(false);
const isMapFilterActive = ref(false);

const error = ref(null);

const filters = ref({
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
  lattitude: null,
  longtitude: null,
  distance: null,
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
    type: attrs.from === 'promotion' ? 2 : attrs.from === 'events' ? 3 : null,
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

const mapTags = (localisationTagsData, restOfTagsData) => {
  restOfTags.value = [];
  localisationTags.value = [];
  if (restOfTagsData?.length > 0) {
    restOfTags.value = restOfTagsData?.map((t) => ({
      name: t.name,
      value: false
    }));
  }
  if (localisationTagsData?.length > 0) {
    localisationTags.value = localisationTagsData?.map((t) => ({
      name: t.name,
      value: false,
    }));
  }
};

const checkAvailabilityFilters = () => {
  if (filteredCount.value === count.value) {
    isTimeFilterActive.value = items.value.some((el) => el.openHours?.length > 0);
    isEventFilterActive.value = items.value.some((el) => el.events?.length > 0);
    isMapFilterActive.value = items.value.some((el) => !!el.longtitude && !!el.lattitude);
  }
};

const saveFiltersInCookie = (f, localisationTags, restOfTags) => {
  const filtersCookie = useCookie('filters', {
    default: () => {},
    watch: true,
  });
  filtersCookie.value = {
    filters: { ...f },
    localisationTags: localisationTags || [],
    restOfTags: restOfTags || [],
  };
};

const checkFiltersInCookie = async () => {
  const filtersCookie = useCookie('filters');
  if (filtersCookie && filtersCookie.value) {
    Object.assign(filters.value, filtersCookie.value.filters);
    Object.assign(localisationTags.value, filtersCookie.value.localisationTag);
    Object.assign(restOfTags.value, filtersCookie.value.restOfTags);
    await findFilteredItems(
      filtersCookie.value.filters,
      filtersCookie.value.localisationTags,
      filtersCookie.value.restOfTags
    );
  }

  watch(
    filters,
    (newVal, oldVal) => {
      findFilteredItemsAndSaveInCookie(newVal, localisationTags.value, restOfTags.value);
    },
    { deep: true }
  );

  watch(
    localisationTags,
    (newVal, oldVal) => {
      findFilteredItemsAndSaveInCookie(filters.value, newVal, restOfTags.value);
    },
    { deep: true }
  );

  watch(
    restOfTags,
    (newVal, oldVal) => {
      findFilteredItemsAndSaveInCookie(filters.value, localisationTags.value, newVal);
    },
    { deep: true }
  );
};

const setItemsAndCounts = (cards) => {
  items.value = cards?.value?.data?.filteredVisitingCards;
  filteredCount.value = cards.value?.data?.filteredVisitingCardsCount;
  count.value = cards.value?.data?.allVisitingCardsCount;
};

const findAllPosts = async (filters) => {
  try {
    const cards = await useFetchFilteredCards(mapFilters(filters));
    setItemsAndCounts(cards);
    mapTags(cards.value?.data.localisationTagsData, cards.value?.data.restOfTagsData);
    filterCounts.value = cards.value?.data?.filterCounts;
    checkAvailabilityFilters();
  } catch (err) {
    error.value = err;
  }
};

const findFilteredItemsAndSaveInCookie = async (filters, localisationTags, restOfTags) => {
  try {
  saveFiltersInCookie(filters, localisationTags, restOfTags);
  await findFilteredItems(filters, localisationTags, restOfTags);
  } catch (err) {
    error.value = err;
  }
};

const findFilteredItems = async (filters, localisationTags, restOfTags) => {
  try {
  const cards = await useFetchFilteredCards(mapFilters(filters), localisationTags, restOfTags);
  filterCounts.value = cards.value?.data?.filterCounts;
  setItemsAndCounts(cards);
  } catch (err) {
    error.value = err;
  }
};

//first call must be without filters from cookie to check availability of filters options
await findAllPosts(filters.value);

await checkFiltersInCookie();
</script>

<style scoped lang="scss">
.results-count {
  background: $accent;
  color: #fff;
  padding: 2px 5px;
}
</style>
