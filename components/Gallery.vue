<template>
  <div class="section-box" v-if="$attrs.items?.length > 0">
    <div class="image" v-for="item in $attrs.items" :key="item.id" @click="changePhoto(item)">
      <img :src="baseUrl + item" onerror="this.onerror=null; this.src='assets/project.jpeg';" />
    </div>
  </div>
  <img v-if="bigPhotoUrl" class="big-photo" :src="baseUrl + bigPhotoUrl" onerror="this.onerror=null; this.src='assets/project.jpeg';" />
</template>

<script setup>
const baseUrl = useBaseUrl();
const attrs = useAttrs();
const bigPhotoUrl = ref(attrs.items?.length > 0 ? attrs.items[0] : '');
const changePhoto = (path) => {
  bigPhotoUrl.value = path;
};
</script>

<style lang="scss" scoped>
.section-box {
  padding: 8px 0px;
  display: flex;
  flex-direction: row;
  gap: 12px;
  overflow-x: auto; /* Enable horizontal scrolling */
  overflow-y: hidden; /* Hide vertical scrollbar */
  scrollbar-width: thin; /* Można ustawić 'auto', 'thin' lub 'none' */
  scrollbar-color: $accent transparent; /* Kolor suwaka i tła (ścieżki) */
  justify-content: center;

  img {
    max-width: 50px;
    max-height: 50px;
  }
}
//FIXME MOVE scrollbar style to global place
/* Stylizowanie paska przewijania dla przeglądarek WebKit */
.section-box::-webkit-scrollbar {
  height: 8px; /* Grubość paska przewijania */
}

.section-box::-webkit-scrollbar-track {
  background: transparent; /* Kolor tła ścieżki paska przewijania */
}

.section-box::-webkit-scrollbar-thumb {
  background: orange; /* Kolor suwaka paska przewijania */
  border-radius: 2px; /* Zaokrąglenie krawędzi suwaka */
  min-height: 20px; /* Minimalna długość suwaka */
}

.big-photo {
  width: 100%;
}
</style>
