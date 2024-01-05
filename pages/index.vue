<template>
  <div class="main-container">
   <TopBar :leftIcon="true" :rightIcon="false" />
   <SideMenu :sponsorsData="pageData.data.sponsors" />
   <FastSearch/>
   <Core :coreData="pageData.data" />
   <Footer />
    <ClientOnly>
      <!-- Adres mojego API z ENV: {{ baseUrl }}
      MenuVisiblesss {{ menuVisible }} -->
      <div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
const baseUrl = useBaseUrl();
const { menuVisible } = useGlobalState();
const { data: pageData, execute } = useFetch(baseUrl + 'main-page/', {
  lazy: true
});



</script>

<style lang="scss" scoped>
.main-container{
  display:flex;
  flex-direction: column;
  justify-content: center;
}
</style>