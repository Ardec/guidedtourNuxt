<template>
  <div class="main-container">
   <FastSearchCore v-if="owner?.enableSearching !== false" :lang="lang"/>
   <Core :coreData="pageData.data"/>
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

const lang = useState('lang');
const owner = useState('owner');

const pageData = await useFetchMainPage();

// console.log(pageData)
// console.log(ownerData)
// console.log(assosiatedData.value.data)




</script>

<style lang="scss" scoped>

</style>