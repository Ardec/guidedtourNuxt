<template>
  <ClientOnly>
    {{ checkAcceptInfo() }}
    {{ getLanguage() }}
  </ClientOnly>
  <div class="main-container">
    <TopBar v-if="ownerData != null" :ownerData="ownerData" :leftIcon="true" :rightIcon="false" />
    <SideMenu :coreData="pageData.data" />
    <Breadcrumb/>
    <slot />
    <Footer :assosiatedData="assosiatedData.data" :ownerData="ownerData.data" />
    <AcceptDialog :isOpen="showAcceptDialog" :lang="lang" @changeLang="changeLang" @closeDialog="closeDialog" />
    <CookieControl locale="pl" v-if="!showAcceptDialog" />
  </div>
</template>

<script setup>
const lang = useState('lang', () => ({}));
const owner = useState('owner', () => ({}));

const baseUrl = useBaseUrl();

const pageData = await useFetchMainPage();

const { data: ownerData } = useFetch(baseUrl + 'owner/info', {
  lazy: true,
});
owner.value = ownerData?.value?.data?.ownerInfos[0];

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

// more info check https://nuxt.com/modules/cookie-control
const cookieControl = useCookieControl();

watch(
  () => cookieControl,
  (current, previous) => {
    if (process.client) {
      if (current.isConsentGiven.value) {
        localStorage.setItem('cookies_perm', true);
      } else {
        localStorage.setItem('cookies_perm', false);
      }
    }
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.main-container {
  width: 100%;
}
</style>

<style lang="scss">
.cookieControl__BarButtons {
  button:nth-child(3) {
    display: none;
  }
}
</style>