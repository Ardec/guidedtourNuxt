<template>
  <div
    v-if="!$attrs.item.ofcourceAlwaysOpen && $attrs.item.openHours != '' && $attrs.item.openHoursVisible != false"
    class="open-hours main-container">
    <h6 v-if="$attrs.lang?.titleOpenHours == null && $attrs.item != ''">Godziny otwarcia obiektu:</h6>
    <h6 v-else>{{ $attrs.lang?.titleOpenHours }}</h6>
    <p v-for="item3 in $attrs.item.openHours" :key="item3.id">
      <b>{{ $attrs.lang[daysTransKey(item3.openHours.dayNumber)] + ' : ' }}</b>
      <span v-if="item3.openHours.twentyFourHour == true">24/7</span>
      <span v-else>
        {{ Math.floor(item3.openHours.openAt / 60) + ':'
        }}{{ item3.openHours.openAt % 60 < 10 ? (item3.openHours.openAt % 60) + '0' : item3.openHours.openAt % 60
        }}{{ ' - ' + Math.floor(item3.openHours.closeAt / 60) + ':'
        }}{{
          item3.openHours.closeAt % 60 < 10 ? (item3.openHours.closeAt % 60) + '0' : item3.openHours.closeAt % 60
        }}</span
      >
    </p>
  </div>
</template>
<script setup>
const daysMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const daysTransKey = (dayNumber) => {
  return daysMap[dayNumber];
};
</script>
<style scoped lang="scss">
.open-hours {
  font-size: 14px;
}
</style>
