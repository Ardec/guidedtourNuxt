<template>
  <div class="main-container">
   <TopBar v-if="ownerData != null" :ownerData="ownerData" :leftIcon="true" :rightIcon="false" />
   <SideMenu :coreData="pageData.data" />
   <FastSearch/>
   <Core :coreData="pageData.data" />
   <Footer :assosiatedData="assosiatedData.data" :ownerData="ownerData.data" />
    <ClientOnly>
      <!-- Adres mojego API z ENV: {{ baseUrl }}
      MenuVisiblesss {{ menuVisible }} -->
        <!-- {{assosiatedData}} -->
      <div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
const baseUrl = useBaseUrl();
const { menuVisible } = useGlobalState();

const { data: pageData } = await useFetch(baseUrl + 'main-page/');
const { data: ownerData } = await useFetch(baseUrl + 'owner/info');
const { data: assosiatedData } = await useFetch(baseUrl + 'assosiated/sites');

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