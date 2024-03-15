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
        <UCheckbox v-model="allowEnabled" name="showMap" label="Dostępny" class="mt-2 mb-2" />

        <div class="flex items-center">
          <UCheckbox
            v-model="allowDistance"
            name="allowDistance"
            :label="
              $attrs.lang.filterUseDistanceFilter == null ? 'Use distance filter' : $attrs.lang.filterUseDistanceFilter
            " />
          <span class="distance" v-if="distance > 0">&nbsp;({{ parseFloat(distance / 1000).toFixed(1) }} km)</span>
        </div>
        <URange class="mt-2 mb-2" v-model="distance" name="distance" :min="0" :max="30000" />
        <UBadge v-if="allowDistance && (!userCords[0] || !userCords[1])" class="mb-2">
          Location access denied. Some features related to maps in this application may not work. Please check if your
          device and browser allow geolocation.
        </UBadge>
        <div class="main-body">
          <FastSearchResultItems :items="results.categories" type="category" :count="categoriesCount" />
          <FastSearchResultItems :items="results.subcategories" type="subcategory" :count="subcategoriesCount" />
          <FastSearchResultItems :items="results.buttons" type="button" :count="buttonsCount" />
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
const GLOBAL_SEARCH_KEY = 'globalSearch';
const baseUrl = useBaseUrl();
const isOpen = ref(false);
const query = ref('');
const suggests = ref([]);
const results = ref([]);
const categoriesCount = ref(0);
const subcategoriesCount = ref(0);
const buttonsCount = ref(0);
const distance = ref(0);
const allowEnabled = ref(false);
const allowDistance = ref(false);
const userCords = ref([]);
const router = useRouter();
const route = useRoute();

const setPosition = (position) => {
  userCords.value = [position.coords?.latitude, position.coords?.longitude];
  if (query.value) {
    change(query.value);
  }
};

const openDialog = () => {
  results.value = [];
  isOpen.value = true;
  router.replace({ query: { globalSearch: true } });
  checkLocalStorage();
};
const closeDialog = () => {
  isOpen.value = false;
  query.value = '';
  router.replace({ query: {} });
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
  let payload = { name: item };
  if (allowEnabled.value) {
    payload.isEnable = true;
  }
  if (allowDistance.value && userCords.value[0] && userCords.value[1]) {
    payload = { ...payload, latitude: userCords.value[0], longitude: userCords.value[1], distance: distance.value };
  }
  useFetch(`${baseUrl}search/`, { method: 'POST', body: payload }).then((response) => {
    results.value = response?.data?.value.data;
    setCounts();
    localStorage.setItem(GLOBAL_SEARCH_KEY, JSON.stringify({ ...payload, allowDistance: allowDistance.value }));
  });
};

const clear = () => {
  query.value = '';
  results.value = [];
};

watch(query, (newVal, oldVal) => {
  if (newVal?.length > 0) {
    useFetch(`${baseUrl}search/suggests/`, { method: 'POST', body: { name: newVal } }).then((response) => {
      suggests.value = response?.data?.value.data.suggests;

      if (suggests.value.length === 1 && suggests.value[0] === query.value) {
        suggests.value = [];
      }
    });
  } else {
    suggests.value = [];
  }
});

watch(allowDistance, (newVal, oldVal) => {
  console.log(allowDistance);
  if (newVal && (!userCords.value[0] || !userCords.value[1])) {
    askForLocation(setPosition);
  } else {
    if (query.value) {
      change(query.value);
    }
  }
});

watch(distance, (newVal, oldVal) => {
  if (query.value) {
    change(query.value);
  }
});

watch(allowEnabled, (newVal, oldVal) => {
  if (query.value) {
    change(query.value);
  }
});

const checkLocalStorage = () => {
  if (process.client) {
    if (localStorage.getItem(GLOBAL_SEARCH_KEY)) {
      const globalSearchFromStore = JSON.parse(localStorage.getItem(GLOBAL_SEARCH_KEY));
      query.value = globalSearchFromStore.name;
      allowEnabled.value = globalSearchFromStore.isEnable;
      allowDistance.value = globalSearchFromStore.allowDistance;
      if (globalSearchFromStore.latitude) {
        userCords.value = [globalSearchFromStore.latitude, globalSearchFromStore.longitude];
      }
      distance.value = globalSearchFromStore.distance;
      change(query.value);
    }
  }
};

if(route.query.globalSearch) {
  openDialog();
}
</script>

<style lang="scss">
// .transparent,
// div[role='dialog'] {
//   div {
//     background: transparent;

// aa
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
  margin-top:100px;

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

.distance {
  font-size: 0.85rem;
}

.dark {
  .search-container {
    background: none;
  }
  .main-body {
    color: #fff;
  }
  .clear {
    .clear-button-container {
      .clear-button {
        background: $darkModeGray;
        color: #fff;
      }
    }
  }
}
</style>
