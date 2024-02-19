<template>
  <div v-if="$attrs.item.tag != ''" class="main-container">
    <h6 v-if="$attrs.lang.titleContact == null && $attrs.item != ''">Kontakt:</h6>
    <h6 v-else>{{ $attrs.lang.titleContact }}</h6>
    <div v-for="(tag, index) in activeTags" :key="tag.id" :title="`${tag.name} ${slice_prenounces(tag.url)}`">
      <div v-if="index < 9" class="contact-content">
        <NuxtLink v-if="tag.url != '' && tag.url != null" :to="tag.url">
          <!-- FIXME icon? -->
          <!-- <div v-if="tag.icon != '' && tag.icon != null">
            <q-icon size="25px" class="my_pictogram" center :name="tag.icon"></q-icon>
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
              <strong>{{ tag.name }}</strong>
              <em> {{ slice_prenounces(tag.url) }}</em>
            </q-tooltip>
            - {{ slice_prenounces(tag.url) }}
          </div> -->

          <div v-if="tag.icon == '' || tag.icon == null" class="contact-item">
            <img :src="baseUrl + tag.image" class="pictogram"  />
            - {{ slice_prenounces(tag.url) }}
          </div>
        </NuxtLink>

        <div v-if="tag.url == '' || tag.url == null">
          <!-- FIXME icon? -->
          <!-- <div v-if="tag.icon != '' && tag.icon != null">
            <q-icon size="25px" class="my_pictogram" center :name="tag.icon"></q-icon>
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
              <strong>{{ tag.name }}</strong>
              <em> {{ slice_prenounces(tag.url) }}</em>
            </q-tooltip>
            - {{ slice_prenounces(tag.url) }}
          </div> -->

          <div v-if="tag.icon == '' || tag.icon == null" class="contact-item">
            <img :src="baseUrl + tag.image" class="pictogram"/>
            - {{ slice_prenounces(tag.url) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const baseUrl = useBaseUrl();
const attrs = useAttrs();
const activeTags = attrs.item?.tag?.map((item) => item.tag).filter((item) => item.isActive);

const slice_prenounces = (prenounce) => {
  if (prenounce == null) {
    prenounce = '';
  }
  if (prenounce.startsWith('https://')) {
    prenounce = prenounce.slice(8, prenounce.lenght);
  }
  if (prenounce.startsWith('tel:')) {
    prenounce = prenounce.slice(4, prenounce.lenght);
  }
  if (prenounce.startsWith('mailto:')) {
    prenounce = prenounce.slice(7, prenounce.lenght);
  }
  if (prenounce.includes('instagram.com')) {
    prenounce = 'instagram.com';
  }
  if (prenounce.includes('facebook.com')) {
    prenounce = 'facebook.com';
  }
  return prenounce;
};
</script>
<style scoped lang="scss">

.pictogram {
  height: 31px;
  width: 31px;
  border-radius: 3px;
  cursor: pointer;
}

.contact-content {
  a {
    text-decoration: none;
    color: #000;
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }
  }
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 3px;

  img {
    margin-right: 5px;
  }
}

.dark {
  .contact-content {
    color: #fff;
    a {
      color: #fff;
    }
  }
}
</style>
