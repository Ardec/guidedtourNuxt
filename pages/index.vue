<template>
  <div class="main-container">
   <TopBar v-if="ownerData != null" :ownerData="ownerData" :leftIcon="true" :rightIcon="false" />
   <SideMenu :coreData="pageData" />
   <FastSearch/>
   <Core :coreData="pageData.data" />
   <Footer :assosiatedData="assosiatedData.data" :ownerData="ownerData.data" />
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

const { data: pageData } = useFetch(baseUrl + 'main-page/', {
  lazy: true
});
const { data: ownerData } = useFetch(baseUrl + 'owner/info', {
  lazy: true
});
const { data: assosiatedData } = useFetch(baseUrl + 'assosiated/sites', {
  lazy: true
});

// console.log(pageData)
// console.log(ownerData)
// console.log(assosiatedData.value.data)




</script>

<style lang="scss" scoped>
.main-container{
  display:flex;
  flex-direction: column;
  justify-content: center;
}
</style>