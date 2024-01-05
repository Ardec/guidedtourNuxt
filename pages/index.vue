<template>
  <div class="main-container">
   <!-- <TopBar v-if="ownerData.data" :ownerData="ownerData.data" :leftIcon="true" :rightIcon="false" /> -->
   <!-- <SideMenu :coreData="pageData.data" /> -->
   <FastSearch/>
   <!-- <Core :coreData="pageData.data" /> -->
   <!-- <Footer :assosiatedData="assosiatedData.data" :ownerData="ownerData.data" /> -->
      {{pageData}}
      {{ownerData}}
    <ClientOnly>
      Adres mojego API z ENV: {{ baseUrl }}
      MenuVisiblesss {{ menuVisible }}
        {{assosiatedData}}
      <div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
const baseUrl = useBaseUrl();
const { menuVisible } = useGlobalState();
const { data: pageData = "", executePageData } = useFetch(baseUrl + 'main-page/', {
  lazy: true
});
const { data: ownerData = "", executeOwnerData } = useFetch(baseUrl + 'owner/info', {
  lazy: true
});
const { data: assosiatedData = "", executeAssosiated } = useFetch(baseUrl + 'assosiated/sites', {
  lazy: true
});

console.log(pageData)
console.log(ownerData)
console.log(assosiatedData)




</script>

<style lang="scss" scoped>
.main-container{
  display:flex;
  flex-direction: column;
  justify-content: center;
}
</style>