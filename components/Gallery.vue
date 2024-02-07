<template>
  <img v-if="bigPhotoUrl" class="big-photo" :src="baseUrl + bigPhotoUrl" onerror="this.onerror=null; this.src='assets/project.jpeg';" />
   <div class="section-box" v-if="$attrs.items?.length > 0">
    <div class="image" v-for="item in $attrs.items" :key="item.id" @click="changePhoto(item)">
      <img :src="baseUrl + item" onerror="this.onerror=null; this.src='assets/project.jpeg';" />
    </div>
  </div>
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
  justify-content: center;
  img {
    max-width: 50px;
    max-height: 50px;
  }
}

.big-photo {
  width: 100%;
}
</style>
