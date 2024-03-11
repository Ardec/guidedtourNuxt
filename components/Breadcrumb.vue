<template>
  <UBreadcrumb :links="items" />
</template>
<script setup>
const { history } = useRouteHistoryState();
const items = ref([]);

const updateCrumbs = () => {
  let lastRoutes = history.value.slice(Math.max(history.value.length - 2, 0));
  if(lastRoutes[0]?.to === lastRoutes[1]?.to) {
    lastRoutes.pop();
  }
  if(!lastRoutes.some(r => r.to === '/')) {
    lastRoutes = [{label: 'Home', to: '/'}, ...lastRoutes];
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
