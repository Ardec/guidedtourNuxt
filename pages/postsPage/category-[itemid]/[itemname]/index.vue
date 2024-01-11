<template>
  <PostsFiltersTabs :filters="filters" :lang="lang"/>
  <PostsItems :items="items"/>
</template>

<script setup>
const lang = await useFetchLang();
const route = useRoute();
const category = await useFetchCategory(route.params.itemid);
const items = category?.value?.data?.category?.visitingCard?.map((item) => item.visitingCard);

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

watch(
  filters,
  (newVal, oldVal) => {
    console.log('Zmiana w obiekcie filters:', newVal);
    // trigger endpoint with filters
    //const items = await useFetchCategory(route.params.itemid, filters);
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.wiz_container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
