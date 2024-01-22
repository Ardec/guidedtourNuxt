<template>
  <FastSearchInput @click="openDialog" class="mb-8" />

  <UModal v-model="isOpen" fullscreen>
    <div class="main-container">
      <div class="header">
        <p class="title">Global search</p>
        <UIcon name="i-heroicons-x-mark-16-solid" class="close-icon" @click="closeDialog" />
      </div>
      <FastSearchInput v-model="query" :items="suggests" @change="change" />
      <FastSearchResultItems :items="results.categories" :title="'Categories'" :count="categoriesCount" />
      <FastSearchResultItems :items="results.subcategories" :title="'Subcategories'" :count="subcategoriesCount" />
      <FastSearchResultItems :items="results.buttons" :title="'Buttons'" :count="buttonsCount" />
      <!-- <div class="clear">
        <div class="divider"></div>
        <div class="clear-button-container">
          <UButton icon="i-heroicons-x-mark-16-solid" color="white" variant="solid" label="Clear" @click="clear"/>
        </div>
      </div> -->
    </div>
  </UModal>
</template>

<script setup>
const baseUrl = useBaseUrl();
const isOpen = ref(false);
const query = ref('');
const suggests = ref([]);
const results = ref([]);
const categoriesCount = ref(1);
const subcategoriesCount = ref(0);
const buttonsCount = ref(0);

const openDialog = () => {
  results.value = [];
  isOpen.value = true;
};
const closeDialog = () => {
  isOpen.value = false;
  query.value = '';
};
const getCounts = (tab) => {
  return tab?.reduce(
    (acc, currentV) => acc + (currentV.visitingCards.length > 0 ? currentV.visitingCards.length : 1),
    0
  );
};

const setCounts = () => {
  categoriesCount.value = getCounts(results.value.categories);
  subcategoriesCount.value = getCounts(results.value.subcategories);
  buttonsCount.value = getCounts(results.value.buttons);
};

const change = (item) => {
  query.value = item;
  suggests.value = [];
  useFetch(`${baseUrl}search/${item}`).then((response) => {
    results.value = response?.data?.value.data;
    setCounts();
  });
};

const clear = () => {
  query.value = '';
  results.value = [];
}

watch(query, (newVal, oldVal) => {
  if (newVal?.length > 0) {
    useFetch(`${baseUrl}search/suggests/${newVal}`).then((response) => {
      suggests.value = response?.data?.value.data.suggests;

      if (suggests.value.length === 1 && suggests.value[0] === query.value) {
        suggests.value = [];
      }
    });
  } else {
    suggests.value = [];
  }
});
</script>

<style lang="scss" scoped>
.main-container {
  position: relative;
  font-family: 'Poppins';
  color: #000;
  padding: 50px 40px;
  overflow-y: auto;
  overflow-x: hidden;

  height: 100%;
  min-height: 100%;
  background: #e2e2e2;
  background: url('assets/img/background.png') no-repeat center center fixed, #e2e2e2;
  background-size: cover;

  .header {
    display: flex;
    justify-content: center;
    position: relative;
    margin-bottom: 40px;
  }

  .title {
    font-size: 34px;
    font-weight: 700;
    line-height: 39px; /* 114.706% */
  }

  .close-icon {
    width: 43px;
    height: 43px;
    color: $accent;
    position: absolute;
    right: 0;
  }

  .clear {
    position: sticky;
    bottom: -40px;
    left: 0;
    background: transparent;
    width: 100%;

    .divider {
      border-bottom: 1px solid $accent;
      height: 1px;
      margin-bottom: 8px;
    }

    .clear-button-container {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
