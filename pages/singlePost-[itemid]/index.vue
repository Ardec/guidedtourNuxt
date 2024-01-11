<template>
  <div class="pictograms-container">
    <PostsPictograms :items="activeFlags" />
  </div>
  <div class="pictograms-container">
    <PostsPictograms :items="activePictograms" />
  </div>
  <div v-if="item.extraDescription != '' && item.extraDescription != null && item.longDescriptionVisible != false" class="card_text_container">
    <div v-html="item.extraDescription"></div>
  </div>
  <PostsConnectedCard :items="connectedVisitingCards" :lang="lang"/> 
  <PostsContact :item="item" :lang="lang"/> 
  <PostsOpenHours :item="item" :lang="lang"/> 
  <PostsAddress :item="item" :lang="lang" :withTitle="true"/> 
</template>

<script setup>
const route = useRoute();
const card = await useFetchCard(route.params.itemid);
const lang = await useFetchLang();

const item = card.value.data.visitingCard;

const activeFlags = item?.flag?.map((item) => item.flag).filter((item) => item.isActive);
const activePictograms = item?.pictograms
  ?.map((item) => item.pictogram)
  .filter((item) => item.isActive);

const connectedVisitingCards = item.connectedVisitingCards.map(item => item.card);
</script>

<style scoped lang="scss">
.pictograms-container,
.card_text_container {
  padding: 16px;
}

.card_text_container {
  word-wrap: break-word !important;
}
</style>
