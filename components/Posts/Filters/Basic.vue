<template>
  <div class="main-container">
    <div v-if="$attrs.lang.filterByCardName == null" class="text-h6">By Card name</div>
    <div v-else class="text-h6">{{ $attrs.lang.filterByCardName }}</div>
    <UInput v-model="filters.name" />
    <div v-if="filters.timeFilters.isActive">
      <span v-if="$attrs.lang.filterIsOpen == null">Is open</span>
      <span v-else>{{ $attrs.lang.filterIsOpen }}</span>
      <div class="toggle-container">
        <div class="toggle-item">
          <UToggle v-model="filters.timeFilters.now" />
          <div>{{ $attrs.lang.labelOpenNow == null ? 'Now' : $attrs.lang.labelOpenNow }}</div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.timeFilters.today" />
          <div>{{ $attrs.lang.labelOpenToday == null ? 'Today' : $attrs.lang.labelOpenToday }}</div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.timeFilters.tomorrow" />
          <div>{{ $attrs.lang.labelOpenTomorrow == null ? 'Tomorrow' : $attrs.lang.labelOpenTomorrow }}</div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.timeFilters.inSaturday" />
          <div>{{ $attrs.lang.labelOpenInStaurday == null ? 'At Saturday' : $attrs.lang.labelOpenInStaurday }}</div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.timeFilters.inSunday" />
          <div>{{ $attrs.lang.labelOpenInSunday == null ? 'At Sunday' : $attrs.lang.labelOpenInSunday }}</div>
        </div>
      </div>
    </div>
    <div v-if="filters.eventFilters.isActive">
      <span v-if="$attrs.lang.filterIsPromotion == null">Is promotion</span>
      <span v-else>{{ $attrs.lang.filterIsPromotion }}</span>
      <div class="toggle-container">
        <div class="toggle-item">
          <UToggle v-model="filters.eventFilters.now" />
          <div>{{ $attrs.lang.labelEventNow == null ? 'Now' : $attrs.lang.labelEventNow }}</div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.eventFilters.today" />
          <div>{{ $attrs.lang.labelEventToday == null ? 'Today' : $attrs.lang.labelEventToday }}</div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.eventFilters.tomorrow" />
          <div>{{ $attrs.lang.labelEventTomorrow == null ? 'Tomorrow' : $attrs.lang.labelEventTomorrow }}</div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.eventFilters.inWeekend" />
          <div>{{ $attrs.lang.labelEventNextWeekend == null ? 'In This Weekend' : $attrs.lang.labelEventNextWeekend }}</div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.eventFilters.inThisMonth" />
          <div>{{ $attrs.lang.labelEventThisMonth == null ? 'At Saturday' : $attrs.lang.labelEventThisMonth }}</div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.eventFilters.inNextMonth" />
          <div>{{ $attrs.lang.labelEventNextMonth == null ? 'At Sunday' : $attrs.lang.labelEventNextMonth }}</div>
        </div>
      </div>
    </div>
    <div>
      <div>
        <span v-if="$attrs.lang.labelStartTime == null">Start date</span>
        <span v-else>{{ $attrs.lang.labelStartTime }}</span>
        <div>
          <input type="date" v-model="filters.startFilter.date" />
          <input type="time" v-model="filters.startFilter.time" />
        </div>
      </div>
      <div>
        <span v-if="$attrs.lang.labelEndTime == null">End date</span>
        <span v-else>{{ $attrs.lang.labelEndTime }}</span>
        <div>
          <input type="date" v-model="filters.endFilter.date" />
          <input type="time" v-model="filters.endFilter.time" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const attrs = useAttrs();
const filters = attrs.filters;
</script>
<style scoped lang="scss">
.main-container {
  background: rgba(255, 255, 255, 0.6);
  padding: 5px;
  border-radius: 8px;
}

.toggle-container {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.toggle-item {
  display: flex;
  white-space: nowrap;
}
</style>
