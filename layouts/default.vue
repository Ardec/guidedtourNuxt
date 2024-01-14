<template>
  <ClientOnly>
    {{ checkAcceptInfo() }}
    {{ getLanguage() }}
  </ClientOnly>
  <div class="main-container">
    <TopBar v-if="ownerData != null" :ownerData="ownerData" :leftIcon="true" :rightIcon="false" />
    <SideMenu :coreData="pageData.data" />
    <slot />
    <Footer :assosiatedData="assosiatedData.data" :ownerData="ownerData.data" />
    <AcceptDialog :isOpen="showAcceptDialog" :lang="lang" @changeLang="changeLang" @closeDialog="closeDialog" />
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

const showAcceptDialog = ref(false);

const getLanguage = () => {
  setTimeout(() => {
    useFetchLang().then((data) => {
      lang.value = data;
    });
  });
};

const checkAcceptInfo = () => {
  if (!localStorage.getItem('storagerights')) {
    showAcceptDialog.value = true;
  }
};

const changeLang = (data) => {
  lang.value = data;
};

const closeDialog = () => {
  showAcceptDialog.value = false;
};
</script>

<style lang="scss" scoped>
.main-container {
  width: 100%;
}
</style>
