<template>
  <div class="main-container">
    <div v-if="lang.filterByCardName == null" class="text-h6">By Card name</div>
    <div v-else class="text-h6">{{ lang.filterByCardName }}</div>
    <UInput v-model="filters.name" />
    <div v-if="filters.timeFilters.isActive">
      <span v-if="lang.filterIsOpen == null">Is open</span>
      <span v-else>{{ lang.filterIsOpen }}</span>
      <div class="toggle-container">
        <div class="toggle-item">
          <UToggle v-model="filters.timeFilters.now" />
          <div>{{ lang.labelOpenNow == null ? 'Now' : lang.labelOpenNow }}</div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.timeFilters.today" />
          <div>{{ lang.labelOpenToday == null ? 'Today' : lang.labelOpenToday }}</div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.timeFilters.tomorrow" />
          <div>{{ lang.labelOpenTomorrow == null ? 'Tomorrow' : lang.labelOpenTomorrow }}</div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.timeFilters.inSaturday" />
          <div>{{ lang.labelOpenInStaurday == null ? 'At Saturday' : lang.labelOpenInStaurday }}</div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.timeFilters.inSunday" />
          <div>{{ lang.labelOpenInSunday == null ? 'At Sunday' : lang.labelOpenInSunday }}</div>
        </div>
      </div>
    </div>
    <div v-if="filters.eventFilters.isActive">
      <span v-if="lang.filterIsPromotion == null">Is promotion</span>
      <span v-else>{{ lang.filterIsPromotion }}</span>
      <div class="toggle-container">
        <div class="toggle-item">
          <UToggle v-model="filters.eventFilters.now" />
          <div>{{ lang.labelEventNow == null ? 'Now' : lang.labelEventNow }}</div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.eventFilters.today" />
          <div>{{ lang.labelEventToday == null ? 'Today' : lang.labelEventToday }}</div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.eventFilters.tomorrow" />
          <div>{{ lang.labelEventTomorrow == null ? 'Tomorrow' : lang.labelEventTomorrow }}</div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.eventFilters.inWeekend" />
          <div>{{ lang.labelEventNextWeekend == null ? 'In This Weekend' : lang.labelEventNextWeekend }}</div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.eventFilters.inThisMonth" />
          <div>{{ lang.labelEventThisMonth == null ? 'At Saturday' : lang.labelEventThisMonth }}</div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.eventFilters.inNextMonth" />
          <div>{{ lang.labelEventNextMonth == null ? 'At Sunday' : lang.labelEventNextMonth }}</div>
        </div>
      </div>
    </div>
    <div>
      <div>
        <span v-if="lang.labelStartTime == null">Start date</span>
        <span v-else>{{ lang.labelStartTime }}</span>
        <div>
          <input type="date" v-model="filters.startFilter.date" />
          <input type="time" v-model="filters.startFilter.time" />
        </div>
      </div>
      <div>
        <span v-if="lang.labelEndTime == null">End date</span>
        <span v-else>{{ lang.labelEndTime }}</span>
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
const lang = attrs.lang;
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
