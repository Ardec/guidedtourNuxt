<template>
  <div
    v-if="!$attrs.item.ofcourceAlwaysOpen && check($attrs.item.openHours).name != ''"
    class="chip"
    :class="check($attrs.item.openHours).color">
    {{ translate(check($attrs.item.openHours)) }}
  </div>
  <div
    v-if="!$attrs.item.ofcourceAlwaysOpen && $attrs.item.openHours != '' && check($attrs.item.openHours).name == ''"
    class="chip red">
    Zamknięte dzisiaj
  </div>
</template>

<script setup>
const translate = (zmienna) => {
  const attrs = useAttrs();
  const lang = attrs.lang;
  if (zmienna.name == 'Otwarte teraz' && lang.labelOpenNow != null) {
    zmienna.name = lang.labelOpenNow;
  }
  if (zmienna.name == 'Zamknięte dzisiaj' && lang.chipClosedToday != null) {
    zmienna.name = lang.chipClosedToday;
  }
  if (zmienna.name == 'Otwarte dzisiaj' && lang.labelOpenToday != null) {
    zmienna.name = lang.labelOpenToday;
  }
  if (zmienna.name.startsWith('Otwarte - za') && lang.chipOpenOn != null) {
    zmienna.name = zmienna.name.replace('Otwarte - za', lang.chipOpenOn);
  }
  if (zmienna.name.startsWith('Zamknięte, będzie otwarte') && lang.chipClosedWillBeOpen != null) {
    zmienna.name = zmienna.name.replace('Otwarte - za', lang.chipClosedWillBeOpen);
  }
  return zmienna.name;
};

const currentDay = () => {
  const f_current = new Date();
  const f_day = f_current.getDay();
  return f_day;
};
const currentTime = () => {
  const f_current = new Date();
  const f_time = f_current.getTime();
  return f_time;
};
const currentHour = () => {
  const f_current = new Date();
  const f_time_hours = f_current.getHours();
  return f_time_hours;
};
const currentMinute = () => {
  const f_current = new Date();
  const f_time_minutes = f_current.getMinutes();
  return f_time_minutes;
};

const check = (zm) => {
  /// FIXME it is not possible to check if time filters should be set if pagination will be used in the future
  // if (zm != '') {
  //   time_filters = true;
  // }
  const my_time = currentHour() * 60 + currentMinute();
  let zmienna = { name: '', color: '' };
  let tomorrow_morning = 2000;

  zm.forEach((zm9) => {
    if (zm9.openHours.dayNumber == currentDay() + 1 && tomorrow_morning > zm9.openHours.openAt) {
      tomorrow_morning = zm9.openHours.openAt;
    }
  });

  zm.forEach((zm2) => {
    if (zm2.openHours.dayNumber == currentDay() && zm2.openHours.twentyFourHour == true) {
      zmienna.name = 'Otwarte dzisiaj';
      zmienna.color = 'green';
      //console.log('24/7', zm2.openHours, zmienna.name);
    }
    if (
      zm2.openHours.dayNumber == currentDay() &&
      zm2.openHours.openAt < my_time &&
      zm2.openHours.closeAt > my_time &&
      zmienna.name != 'Otwarte dzisiaj'
    ) {
      zmienna.name = 'Otwarte teraz';
      zmienna.color = 'green';
      if (
        zm2.openHours.dayNumber == currentDay() &&
        zm2.openHours.closeAt - my_time < 120 &&
        zm2.openHours.closeAt - my_time > 0
      ) {
        if (zm2.openHours.closeAt > 1435 && tomorrow_morning < 5) {
          zmienna.name = 'Otwarte teraz';
          zmienna.color = 'green';
        } else {
          zmienna.name = 'Zamknięte - za ' + (zm2.openHours.closeAt - my_time) + ' min';
          zmienna.color = 'orange';
        }
      }
      if (zmienna.name == 'Otwarte teraz') {
        const my_time = currentHour() * 60 + currentMinute();
        zm.forEach((zm3) => {
          if (zm3.openHours.openAt > my_time && zm3.openHours.dayNumber == currentDay()) {
            zmienna.name = 'Otwarte dzisiaj';
            zmienna.color = 'green';
          }
        });
      }
    }

    if (zmienna.name == '' || zmienna.name == 'Zamknięte dzisiaj') {
      zmienna.name = 'Zamknięte dzisiaj';
      zmienna.color = 'red';

      if (zm2.openHours.dayNumber == currentDay() && zm2.openHours.closeAt > my_time) {
        zmienna.name = 'Zamknięte, będzie otwarte';
        zmienna.color = 'orange';
      }
    }
    if (zmienna.name == 'Zamknięte, będzie otwarte') {
      if (
        zm2.openHours.dayNumber == currentDay() &&
        zm2.openHours.openAt - my_time < 120 &&
        zm2.openHours.openAt - my_time > 0
      ) {
        zmienna.name = 'Otwarte - za ' + (zm2.openHours.openAt - my_time) + ' min';
        zmienna.color = 'primary';
      }
    }
  });

  return zmienna;
};
</script>

<style scoped lang="scss">
.chip {
  display: inline-flex;
  border-radius: 4px;
  height: 20px;
  margin-top: 2px;
  margin-bottom: 1px;
  padding: 8px;
  font-size: 10px;
  color: #fff;
  align-items: center;

  &.red {
    background: #f44336;
  }

  &.green {
    background: #4caf50;
  }

  &.orange {
    background: #ff9800;
  }

  &.primary {
    background: #0f5694;
  }
}
</style>
