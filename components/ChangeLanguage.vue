<template>
  <ClientOnly>
    {{ getSelectedLangFromLocalStorage() }}
  </ClientOnly>
  <div class="section-box">
    <div v-for="item in allLang" :key="item.id" @click="change(item)">
      <img
        class="lang-icon"
        :src="item.icon == null || item.icon == '' ? '/assets/project.jpeg' : baseUrl + item.icon"
        onerror="this.onerror=null; this.src='assets/project.jpeg';" />
    </div>
  </div>
  <p class="lang-name">{{selectedLang.name}}</p>
  <div class="selected-lang">
    <img
      class="big-lang-icon"
      :src="selectedLang.icon == null || selectedLang.icon == '' ? '/assets/project.jpeg' : baseUrl + selectedLang.icon"
      onerror="this.onerror=null; this.src='assets/project.jpeg';" />
      <div>Aktualnie wybrany jezyk</div>
  </div>
</template>
<script setup>
const baseUrl = useBaseUrl();
const allLang = await useFetchAllLang();
const selectedLang = ref(allLang[0]);

const getSelectedLangFromLocalStorage = () => {
  if (process.client && localStorage.getItem('lang')) {
    selectedLang.value = JSON.parse(localStorage.getItem('lang'));
  }
};

const change = (item) => {
  if (item) {
    localStorage.setItem('lang', JSON.stringify(item));
    selectedLang.value = item;
  }
};
</script>
<style lang="scss" scoped>
.lang-name {
  font-size: 20px;
}
.langs-container {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-block: 10px;
}
.lang-icon {
  width: 100px;
  cursor: pointer;
}
.big-lang-icon {
  width: 40px;
}
.selected-lang {
  display: flex;
  gap:10px;
  align-items: center;
}
</style>
