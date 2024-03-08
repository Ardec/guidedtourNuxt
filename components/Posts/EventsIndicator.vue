<template>
  <div>
    <UBadge v-if="isEvents" :ui="ui" color="pink" size="xs"
      ><UIcon name="i-heroicons-star-solid" />&nbsp;{{ lang.chipEventIs == null ? 'Event' : lang.chipEventIs }}</UBadge
    >
  </div>
</template>
<script setup>
const attrs = useAttrs();
const lang = attrs.lang;
const item = attrs.item;
const currenDate = new Date();
const isEvents = ref(
  item.events?.some((e) => {
    let startDate = new Date(e.event.startAt);
    let endDate = new Date(e.event.endAt);
    return startDate < currenDate && currenDate < endDate;
  })
);
const ui = ref({
  color: {
    pink: {
      solid: 'bg-[#c2185b] text-white',
    },
  },
});
</script>
