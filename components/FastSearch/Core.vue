<template>
  <FastSearchInput @click="openDialog" class="mb-8" />
  <div class="transparent">
    <UModal v-model="isOpen" fullscreen>
      <div class="search-container">
        <div class="header">
          <p class="title">Global search</p>
          <UIcon name="i-heroicons-x-mark-16-solid" class="close-icon" @click="closeDialog" />
        </div>
        <FastSearchInput v-model="query" :items="suggests" @change="change" />
        <div class="main-body">
          <FastSearchResultItems :items="results.categories" :title="'Categories'" :count="categoriesCount" />
          <FastSearchResultItems :items="results.subcategories" :title="'Subcategories'" :count="subcategoriesCount" />
          <FastSearchResultItems :items="results.buttons" :title="'Buttons'" :count="buttonsCount" />
        </div>
        <div class="clear">
          <div class="divider"></div>
          <div class="clear-button-container">
            <div class="clear-button" @click="clear">
              <UIcon name="i-heroicons-x-mark-16-solid" class="clear-icon" />Clear
            </div>
          </div>
        </div>
      </div>
    </UModal>
  </div>
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
};

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

<style lang="scss">
// .transparent,
// div[role='dialog'] {
//   div {
//     background: transparent;
//   }
// }
</style>

<style lang="scss" scoped>
.search-container {
  //background: rgba(226, 226, 226, 0.9) !important; //#e2e2e2;
  background: url('assets/img/background.png') no-repeat center center fixed, #e2e2e2;
  background-size: cover;
  height: 100%;
  padding: 50px 40px;

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
    cursor: pointer;
  }
}

.main-body {
  position: relative;
  font-family: 'Poppins';
  color: #000;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100% - 140px);
}

.clear {
  position: sticky;
  bottom: 0;
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

    .clear-button {
      background: #fff;
      padding: 8px 16px;
      display: flex;
      color: rgba(91, 91, 96, 0.4);
      cursor: pointer;
    }

    .clear-icon {
      width: 25px;
      height: 25px;
      color: $accent;
    }
  }
}
</style>
