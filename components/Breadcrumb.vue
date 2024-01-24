<template>
  <UBreadcrumb :links="items" />
</template>
<script setup>
const { history } = useRouteHistoryState();
const items = ref([]);

const updateCrumbs = () => {
  items.value = history.value.slice(Math.max(history.value.length - 2, 0));
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
