<template>
  <div class="main-container">
   <FastSearch/>
   <Core :coreData="pageData.data" />
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

const pageData = await useFetchMainPage();

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