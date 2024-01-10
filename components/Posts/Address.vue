<template>
  <div v-for="address in $attrs.item.address" :key="address.id">
    <div class="address">
      <span>
        <span v-if="$attrs.item.postCodeVisible != false">{{ address.address.postCode + ' ' }} </span>
        <span v-if="$attrs.item.cityVisible != false">{{ address.address.city + ' ' }}</span>
        <span v-if="address.street != '' && $attrs.item.streetVisible != false"
          >ul. {{ address.address.streetName + ' ' }}</span
        >
        <span
          v-if="
            address.address.streetNumber != '' &&
            address.address.streetNumber != null &&
            $attrs.item.streetNumberVisible != false
          "
          >{{ address.address.streetNumber }}</span
        >
        <span
          v-if="
            address.address.streetLocal != '' &&
            address.address.streetLocal != null &&
            $attrs.item.streetLocalVisible != false
          "
          >{{ address.address.streetLocal + ' ' }}</span
        >
      </span>
      <span>
        <span
          v-if="
            address.address.customFieldName != '' &&
            address.address.customFieldName != null &&
            $attrs.item.customFieldNameVisible != false
          "
          ><b>{{ address.address.customFieldName }}</b></span
        ><span
          v-if="
            $attrs.item.customFieldVisible != false &&
            address.address.customField != '' &&
            address.address.customField != null
          "
          ><span v-if="$attrs.item.customFieldNameVisible != false && $attrs.item.customFieldVisible != false">:</span
          >{{ address.address.customField }}</span
        >
      </span>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.address {
  font-size: 14px;
  padding-top: 4px;
}
</style>
