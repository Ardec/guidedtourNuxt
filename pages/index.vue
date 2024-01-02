<template>
  <div class="main-container">
   <TopBar :leftIcon="true" :rightIcon="false" />
   <SideMenu />
   <FastSearch/>
    <ClientOnly>
      <!-- Adres mojego API z ENV: {{ baseUrl }}
      MenuVisiblesss {{ menuVisible }} -->
      <div>
        <!-- <div v-for="category in categories.data.categories" :key="category.id">
          {{ category.name }}
        </div> -->
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
import { useBaseUrl } from '~/composables/useBaseUrl';
const baseUrl = useBaseUrl();
import { useGlobalState } from '~/composables/useGlobalState.ts'
const { menuVisible } = useGlobalState();
</script>

<style lang="scss" scoped>
.main-container{
  display:flex;
  flex-direction: column;
  justify-content: center;
}
</style>