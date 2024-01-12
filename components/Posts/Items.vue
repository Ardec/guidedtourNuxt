<template>
  <PostsFiltersTabs :filters="filters" :lang="lang" />
  <div class="wiz_container">
    <div v-for="item in items" :key="item.id">
      <PostsItem :item="item" :lang="lang" />
    </div>
  </div>
</template>

<script setup>
const lang = await useFetchLang();
const route = useRoute();
const attrs = useAttrs();
let items;

const filters = reactive({
  name: '',
  start: null,
  end: null,
  timeFilters: {
    isActive: true,
    now: false,
    today: false,
    tomorrow: false,
    inSaturday: false,
    inSunday: false,
  },
  eventFilters: {
    isActive: true,
    now: false,
    today: false,
    tomorrow: false,
    inWeekend: false,
    inThisMonth: false,
    inNextMonth: false,
  },
  startFilter: {
    date: undefined,
    time: undefined,
  },
  endFilter: {
    date: undefined,
    time: undefined,
  },
});

const findPosts = async (filters) => {
  //FIXME use filters
  if (attrs.from === 'category') {
    const category = await useFetchCategory(route.params.itemid);
    items = category?.value?.data?.category?.visitingCard
      ?.map((item) => item.visitingCard)
      .filter((item) => item.isActive !== false);
  }
  if (attrs.from === 'subcategory') {
    const subcategory = await useFetchSubCategory(route.params.itemid);
    items = subcategory?.value?.data?.subCategory?.visitingCard
      ?.map((item) => item.visitingCard)
      .filter((item) => item.isActive !== false);
  }
    if (attrs.from === 'button') {
    const button = await useFetchButton(route.params.itemid);
    items = button?.value?.data?.button?.visitingCard
      ?.map((item) => item.visitingCard)
      .filter((item) => item.isActive !== false);
  }
};

watch(
  filters,
  (newVal, oldVal) => {
    console.log('Zmiana w obiekcie filters:', newVal);
    // trigger endpoint with filters
    // findPosts(newVal);
  },
  { deep: true }
);

await findPosts(filters);
</script>

<style scoped lang="scss">
.wiz_container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>
