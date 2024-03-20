<template>
  <div class="flex items-center">
    <ol class="flex items-center gap-x-1.5">
      <li class="flex items-center gap-x-1.5 text-gray-500 dark:text-gray-400 text-sm">
        <NuxtLink to="/" class="flex items-center gap-x-1.5 group font-semibold hover:text-gray-700 dark:hover:text-gray-200">Home</NuxtLink>
        <span class="i-heroicons-chevron-right-20-solid rtl:i-heroicons-chevron-left-20-solid flex-shrink-0 w-5 h-5" role="presentation"></span>
        <span class="b-arrow i-heroicons-chevron-right-20-solid rtl:i-heroicons-chevron-left-20-solid flex-shrink-0 w-5 h-5" role="presentation"></span>
      </li>
    </ol>

    <UBreadcrumb :links="items" />
  </div>
</template>
<script setup>
const { history } = useRouteHistoryState();
const items = ref([]);
const showHome = ref(false);

const updateCrumbs = () => {
  let lastRoutes = history.value.slice(Math.max(history.value.length - 2, 0));
  if (decodeURIComponent(lastRoutes[0]?.to) === decodeURIComponent(lastRoutes[1]?.to)) {
    lastRoutes.pop();
  }
  
  items.value = lastRoutes;
};

updateCrumbs();

watch(
  history,
  (newVal, oldVal) => {
    updateCrumbs();
  },
  { deep: true }
);
</script>
<style scoped lang="scss">
.b-arrow {
  margin-left: -20px;
  margin-right: 8px;
}
</style>
