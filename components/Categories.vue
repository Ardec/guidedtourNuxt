<template>
  <h6 v-if="!$attrs?.items || !$attrs?.items.length" class="empty-list">Brak przypisanych obiektów pod {{ route.params.itemname }}</h6>
  <div class="category_container">
    <div v-for="item in $attrs?.items" :key="item.id">
      <div v-if="item.isActive == '1'">
        <NuxtLink
          :to="
            item.searchEngine === '1' || item.searchEngine === 1 
              ? `/buttonsPage/${$attrs?.type}-${item.id}/${item.name}`
              : item.searchEngine === '2' || item.searchEngine === 2 
              ? `/subcategorypage/${$attrs?.type}-${item.id}/${item.name}`
              : `/postsPage/${$attrs?.type}-${item.id}/${item.name}`
          ">
          <div class="category_container_box">
            <div class="category">
              <img
                class="category_container_box card_text_container"
                :src="item.image == null || item.image == '' ? '/assets/project.jpeg' : baseUrl + item.image"
                onerror="this.onerror=null; this.src='assets/project.jpeg';" />
              <div class="overlay">
                {{ item.name }}
                <div class="description">{{ item.description }}</div>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const baseUrl = useBaseUrl();
</script>

<style scoped lang="scss">
.category_container {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.category_container_box:hover {
  opacity: 0.8;
  cursor: pointer;
}
.category_container_box {
  display: block;
  border-radius: 8px;
  margin: 1px;
  width: 160px;
  height: 160px;
}

.category {
  position: relative;

  .overlay {
    position: absolute;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.47);
    width: 160px;
    height: 160px;
    border-radius: 8px;
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

.empty-list {
    font-size: 14px;
}
</style>
