<template>
  <UAlert
  class="mb-2"
    v-if="$attrs.error"
    :ui="ui"
    color="red"
    icon="i-heroicons-exclamation-circle"
    :description="$attrs.error.message"
    :title="$attrs.error.statusCode" />
</template>
<script setup>
const attrs = useAttrs();
const ui = ref({});
if(attrs.error) {
  ui.value = {
  color: {
    red: {
      solid: 'bg-[#c82603] text-white',
    },
  },
};
}
</script>
