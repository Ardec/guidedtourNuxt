<template>
  <div v-if="$attrs?.items?.length >0">
    <h6 v-if="$attrs.lang?.titleBeSureNotMiss == null">Be sure not to miss</h6>
    <h6 v-else>{{ $attrs.lang?.titleBeSureNotMiss }}</h6>
  </div>
  <div class="card_container">
    <div v-for="item in $attrs?.items" :key="item.id">
      <NuxtLink :to="`/singlePost-${item.id}`">
        <div class="card_container_box">
          <div class="card">
            <img
              class="card_container_box card_text_container"
              :src="item.image == null || item.image == '' ? '/assets/project.jpeg' : baseUrl + item.image"
              onerror="this.onerror=null; this.src='assets/project.jpeg';" />
            <div class="overlay">
              {{
                item.alternativeMustSeeName != null && item.alternativeMustSeeName != ''
                  ? item.alternativeMustSeeName
                  : item.name
              }}
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const baseUrl = useBaseUrl();
</script>

<style scoped lang="scss">
.card_container {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}
.card_container_box:hover {
  opacity: 0.8;
  cursor: pointer;
}
.card_container_box {
  display: block;
  margin: 1px;
  width: 160px;
  height: 160px;
}

.card {
  position: relative;

  .overlay {
    position: absolute;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.47);
    width: 160px;
    height: 160px;
    color: #fff;
    padding: 16px;
    font-size: 14px;
    text-transform: uppercase;
    line-height: 21px;

    .description {
      text-transform: none;
      font-size: 0.75rem;
      font-weight: 300;
    }
  }
}
</style>
