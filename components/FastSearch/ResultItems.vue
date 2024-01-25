<template>
  <p class="results-title" v-if="$attrs.items?.length > 0">
    <span v-if="$attrs?.type === 'category'">Categories</span>
    <span v-if="$attrs?.type === 'button'">Buttons</span>
    <span v-if="$attrs?.type === 'subcategory'">Subcategories</span>
    - {{ $attrs.count }} results
  </p>
  <div v-for="parent in $attrs.items" :key="parent.id">
    <div v-for="item in parent.visitingCards" :key="item.id" class="result-item">
      <NuxtLink
        :to="
          parent.searchEngine.value === 'ButtonPage'
            ? `/buttonsPage/${$attrs?.type}-${parent.id}/${parent.name}`
            : parent.searchEngine.value === 'SubCategoryPage'
            ? `/subcategorypage/${$attrs?.type}-${parent.id}/${parent.name}`
            : `/postsPage/${$attrs?.type}-${parent.id}/${parent.name}`
        ">
        <span class="parent">{{ parent.name }}</span> >
      </NuxtLink>
      <NuxtLink :to="`/singlePost-${item.id}/${item.name}`">
        <span class="child">{{ item.name }}</span>
      </NuxtLink>
    </div>
    <div v-if="parent.visitingCards?.length === 0" class="result-item">
      <NuxtLink
        :to="
          parent.searchEngine.value === 'ButtonPage'
            ? `/buttonsPage/${$attrs?.type}-${parent.id}/${parent.name}`
            : parent.searchEngine.value === 'SubCategoryPage'
            ? `/subcategorypage/${$attrs?.type}-${parent.id}/${parent.name}`
            : `/postsPage/${$attrs?.type}-${parent.id}/${parent.name}`
        ">
        {{ parent.name }}
      </NuxtLink>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.results-title {
  color: #000;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 100;
  line-height: 29px;
  margin-top: 14px;
}
.result-item {
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  margin: 5px 0;
}

.child {
  font-weight: 600;
}
</style>
