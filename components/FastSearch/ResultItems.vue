<template>
  <p class="results-title" v-if="$attrs.items?.length > 0">{{ $attrs.title }} - {{ $attrs.count }} results</p>
  <div v-for="parent in $attrs.items" :key="parent.id">
    <div v-for="item in parent.visitingCards" :key="item.id" class="result-item">
      <!-- <NuxtLink
        :to="
          item.searchEngine === '1' || item.searchEngine === 1
            ? `/buttonsPage/${$attrs?.type}-${item.id}/${item.name}`
            : item.searchEngine === '2' || item.searchEngine === 2
            ? `/subcategorypage/${$attrs?.type}-${item.id}/${item.name}`
            : `/postsPage/${$attrs?.type}-${item.id}/${item.name}`
        "> -->
      <span class="parent">{{ parent.name }}</span> >
      <!-- </NuxtLink> -->
      <NuxtLink :to="`/singlePost-${item.id}`">
        <span class="child">{{ item.name }}</span>
      </NuxtLink>
    </div>
    <div v-if="parent.visitingCards?.length === 0" class="result-item">{{ parent.name }}</div>
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
