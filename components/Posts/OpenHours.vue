<template>
  <div
    v-if="!$attrs.item.ofcourceAlwaysOpen && $attrs.item.openHours != '' && $attrs.item.openHoursVisible != false"
    class="open-hours">
    <h6 v-if="$attrs.lang?.titleOpenHours == null && $attrs.item != ''">Godziny otwarcia obiektu:</h6>
    <h6 v-else>{{ $attrs.lang?.titleOpenHours }}</h6>
    <p v-for="item3 in $attrs.item.openHours" :key="item3.id">
      <b>{{ days[item3.openHours.dayNumber].name + ' : ' }}</b>
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
const days = [
  { name: 'Niedziela', value: 0 },
  { name: 'Poniedziałek', value: 1 },
  { name: 'Wtorek', value: 2 },
  { name: 'Środa', value: 3 },
  { name: 'Czwartek', value: 4 },
  { name: 'Piątek', value: 5 },
  { name: 'Sobota', value: 6 },
];
const attrs = useAttrs();
const lang = attrs.lang;
if (lang) {
  days[1].name = lang.monday;
  days[2].name = lang.tuesday;
  days[3].name = lang.wednesday;
  days[4].name = lang.thursday;
  days[5].name = lang.friday;
  days[6].name = lang.saturday;
  days[0].name = lang.sunday;
}
</script>
<style scoped lang="scss">
.open-hours {
  font-size: 14px;
}
</style>
