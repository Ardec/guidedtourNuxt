<template>
  <div class="wiz_box_container card_gradient">
    <PostsPictograms :items="activeFlags"/>
    <img
      class="main-image"
      :src="$attrs.item.image == null || $attrs.item.image == '' ? '/assets/project.jpeg' : baseUrl + $attrs.item.image"
      onerror="this.onerror=null; this.src='assets/project.jpeg';" />
      <PostsPictograms :items="activePictograms"/>
    <PostsAddress :item="$attrs.item"/>
  </div>
</template>

<script setup>
const baseUrl = useBaseUrl();
const attrs = useAttrs();
const activeFlags = attrs.item?.flag?.map((item) => item.flag).filter((item) => item.isActive);
const activePictograms = attrs.item?.pictograms?.map((item) => item.pictogram).filter((item) => item.isActive);
</script>

<style scoped lang="scss">
.wiz_box_container {
  width: 400px;
  border-radius: 8px;
  margin: 3px;
  padding: 16px;

  .main-image {
    width: 150px;
    height: 150px;
    border-radius: 10px;
  }
}

.card_gradient{
  background:linear-gradient(135deg, #ffffff 0%,#dcdcdc 100%);
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.16), 0 2px 4px rgba(0,0,0,0.45);
}
.card_gradient:hover{
  background:linear-gradient(135deg, #ffffff 0%,#e8e8e8 100%);
  // opacity:0.6;
}
</style>
