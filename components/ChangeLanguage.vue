<template>
  <div class="section-box">
    <div v-for="item in allLang?.data?.addresses" :key="item.id" @click="change(item)">
      <img
        class="lang-icon"
        :src="item.icon == null || item.icon == '' ? '/assets/project.jpeg' : baseUrl + item.icon"
        onerror="this.onerror=null; this.src='assets/project.jpeg';" />
    </div>
  </div>
  <div v-if="!!$attrs.lang">
    <p class="lang-name">{{ $attrs.lang.name }}</p>
    <div class="selected-lang">
      <img
        class="big-lang-icon"
        :src="
          $attrs.lang.icon == null || $attrs.lang.icon == '' ? '/assets/project.jpeg' : baseUrl + $attrs.lang.icon
        "
        onerror="this.onerror=null; this.src='assets/project.jpeg';" />
      <div class="selected-label">{{$attrs.label ? $attrs.label : 'Wybierz domyślny język startowy aplikacji. Wybór możesz później zmienić w menu.'}}</div>
    </div>
  </div>
</template>
<script setup>
const baseUrl = useBaseUrl();
const emit = defineEmits(['changeLang']);
const { data: allLang } = useFetch(`${baseUrl}language/`, {
  lazy: true,
});

const change = (item) => {
  if (item) {
    localStorage.setItem('lang', JSON.stringify(item));
    emit('changeLang', item);
  }
};
</script>
<style lang="scss" scoped>
img {border-radius:4px;}
.lang-name {
  font-size: 18px;
  font-weight: 600;
  margin-top: 20px;
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
  gap: 10px;
  align-items: center;
}
.selected-label {
  font-size: 12px;
}
</style>
