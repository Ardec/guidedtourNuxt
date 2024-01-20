<template>
  <div class="main-container">
    <PostsPictograms :items="activeFlags" />
  </div>
  <div class="main-container">
    <PostsPictograms :items="activePictograms" />
  </div>
  <div
    :class="{
      'gallery-description':
        item.extraDescription != '' &&
        item.extraDescription != null &&
        item.longDescriptionVisible != false &&
        images?.length > 0,
    }">
    <div class="main-container" v-if="images?.length > 0">
      <Gallery :items="images" />
    </div>
    <div
      v-if="item.extraDescription != '' && item.extraDescription != null && item.longDescriptionVisible != false"
      class="card_text_container">
      <UAccordion :items="accordionItems">
        <template #item="{ i }">
          <div v-html="item.extraDescription"></div>
        </template>
      </UAccordion>
    </div>
  </div>
  <div class="main-container" v-if="connectedVisitingCards?.length > 0">
    <PostsConnectedCard :items="connectedVisitingCards" :lang="lang" />
  </div>
  <div class="main-container" v-if="item.groups?.length > 0">
    <PostsConnectedCard :items="item.groups" :lang="lang" imageField="picture" type="group" />
  </div>

  <PostsContact :item="item" :lang="lang" />

  <PostsOpenHours :item="item" :lang="lang" />

  <div class="main-container" v-if="item?.address?.length > 0">
    <PostsAddress :item="item" :lang="lang" :withTitle="true" />
  </div>

  <PostsLocation :item="item" :lang="lang" />
</template>

<script setup>
const route = useRoute();
const card = await useFetchCard(route.params.itemid);

const lang = useState('lang');

const item = card.value.data.visitingCard;

const activeFlags = item?.flag?.map((item) => item.flag).filter((item) => item.isActive);
const activePictograms = item?.pictograms?.map((item) => item.pictogram).filter((item) => item.isActive);

const connectedVisitingCards = item.connectedVisitingCards.map((item) => item.card);

const images = item.gallery?.map((item) => item.image?.path);

const accordionItems = [
  {
    label: lang.labelLongDescription == null ? 'Długi opis' : lang.labelLongDescription,
    defaultOpen: true,
    content: '',
  },
];
</script>

<style scoped lang="scss">
.main-container,
.card_text_container {
  padding: 16px;
}

.card_text_container {
  word-wrap: break-word !important;
}

.gallery-description {
  display: grid;
  grid-template-columns: 50% 50%;
}

@media (max-width: 600px) {
  .gallery-description {
    display: block;
  }
}
</style>

<style lang="scss">
.main-container {
  padding: 16px;
}
</style>
