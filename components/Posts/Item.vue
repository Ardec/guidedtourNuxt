<template>
  <div class="wiz_box_container card_gradient">
    <PostsPictograms :items="activeFlags" />
    <div class="image-info">
      <NuxtLink v-if="$attrs.item.isBig !== false" :to="`/singlePost-${$attrs.item.id}/${$attrs.item.name}`">
        <img
          class="main-image"
          :src="
            $attrs.item.image == null || $attrs.item.image == '' ? '/assets/project.jpeg' : baseUrl + $attrs.item.image
          "
          onerror="this.onerror=null; this.src='assets/project.jpeg';" />
      </NuxtLink>
      <img
        v-if="$attrs.item.isBig === false"
        class="main-image"
        :src="
          $attrs.item.image == null || $attrs.item.image == '' ? '/assets/project.jpeg' : baseUrl + $attrs.item.image
        "
        onerror="this.onerror=null; this.src='assets/project.jpeg';" />
      <div class="main-info">
        <p v-html="preserveNewlines($attrs.item.longDescription)" class="wiz_slogan"></p>
        <p v-html="preserveNewlines($attrs.item.name)" class="wiz_header"></p>
        <p v-html="preserveNewlines($attrs.item.shortDescription)" class="wiz_desc"></p>
        <PostsOpenCloseIndicator :item="$attrs.item" :lang="$attrs.lang" />
        <PostsEventsIndicator :item="$attrs.item" :lang="$attrs.lang" />
        <PostsPictograms :items="activePictograms" />
      </div>
    </div>
    <PostsPictograms :items="activeTags" />
    <PostsAddress :item="$attrs.item" />
  </div>
</template>

<script setup>
const baseUrl = useBaseUrl();
const attrs = useAttrs();
const activeFlags = attrs.item?.flag?.map((item) => item.flag).filter((item) => item.isActive);
const activePictograms = attrs.item?.pictograms?.map((item) => item.pictogram).filter((item) => item.isActive);
const activeTags = attrs.item?.tag?.map((item) => item.tag).filter((item) => item.isActive);

const preserveNewlines = (text) => {
  if (text != null && text != undefined && text != '') {
    return text.replace(/\n/g, '<br>');
  } else {
    return '';
  }
};
</script>

<style scoped lang="scss">
.wiz_box_container {
  width: 400px;
  border-radius: 8px;
  margin: 3px;
  padding: 16px;

  .image-info {
    display: flex;
    margin-top: 3px;
  }

  .main-image {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    margin-right: 4px;
  }

  .main-info {
    word-wrap: break-word;
    overflow: hidden;
  }
}

.card_gradient {
  background: linear-gradient(135deg, #ffffff 0%, #dcdcdc 100%);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.45);
}
.card_gradient:hover {
  background: linear-gradient(135deg, #ffffff 0%, #e8e8e8 100%);
}

p.wiz_header {
  margin: 0px 0px 0px 4px;
  font-size: 1rem;
  line-height: 1rem;
  font-weight: 500;
}

p.wiz_slogan {
  margin: 0px 0px 0px 4px;
  font-size: 0.8rem;
  line-height: 0.8rem;
  color: #414141;
}
p.wiz_desc {
  padding: 2px 0px 2px 0px;
  margin: 0px 0px 0px 4px;
  font-size: 0.8rem;
  line-height: 0.8rem;
  color: #414141;
}

.dark {
  p.wiz_slogan,
  p.wiz_desc {
    color: #fff;
  }
  .card_gradient {
    background: rgb(38, 38, 38);
  }
}
</style>
