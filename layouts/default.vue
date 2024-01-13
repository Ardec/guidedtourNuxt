<template>
  <ClientOnly>
    {{ getLanguage() }}
  </ClientOnly>
  <div class="main-container">
    <TopBar v-if="ownerData != null" :ownerData="ownerData" :leftIcon="true" :rightIcon="false" />
    <SideMenu :coreData="pageData.data" />
    <slot />
    <Footer :assosiatedData="assosiatedData.data" :ownerData="ownerData.data" />
  </div>
</template>

<script setup>
const lang = useState('lang', () => ({}));

const baseUrl = useBaseUrl();

const pageData = await useFetchMainPage();

const { data: ownerData } = useFetch(baseUrl + 'owner/info', {
  lazy: true,
});
const { data: assosiatedData } = useFetch(baseUrl + 'assosiated/sites', {
  lazy: true,
});

const getLanguage = () => {
  useFetchLang().then((data) => {
    lang.value = JSON.parse(data);
  });
};
</script>

<style lang="scss" scoped>
.main-container {
  width: 100%;
}
</style>
