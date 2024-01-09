<template>
  <div class="pictograms">
    <div v-for="(item, index) in $attrs.items" :key="item.id">
      <div v-if="index < 9">
        <!-- <div @click="change_location(item.flag.url)"> -->
        <img :src="baseUrl + item.image" class="pictogram" />
        <!-- <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
            <strong>{{ item.flag.name }}</strong>
            <em> {{ item.flag.url }}</em>
          </q-tooltip> -->
      </div>
    </div>
  </div>
</template>

<script setup>
const baseUrl = useBaseUrl();
</script>

<style scoped lang="scss">
.pictograms {
  display: flex;
}
.pictogram {
  height: 31px;
  width: 31px;
  border-radius: 3px;
  cursor: pointer;
  margin: 4px 4px 0 0;
}
</style>
