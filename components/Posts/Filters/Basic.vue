<template>
  <div class="main-container">
    <div v-if="$attrs.lang.filterByCardName == null" class="text-h6">By Card name</div>
    <div v-else class="text-h6">{{ $attrs.lang.filterByCardName }}</div>
    <UInput v-model="filters.name" />
    <div v-if="$attrs.isTimeFilterActive" class="mt-3">
      <span v-if="$attrs.lang.filterIsOpen == null">Is open</span>
      <span v-else>{{ $attrs.lang.filterIsOpen }}</span>
      <div class="toggle-container">
        <div class="toggle-item">
          <UToggle v-model="filters.isOpenNow" />
          <div>
            {{ $attrs.lang.labelOpenNow == null ? 'Now' : $attrs.lang.labelOpenNow }}
            <span>({{ $attrs?.filterCounts['isOpenNow'] }})</span>
          </div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.isOpenToday" />
          <div>
            {{ $attrs.lang.labelOpenToday == null ? 'Today' : $attrs.lang.labelOpenToday }}
            <span>({{ $attrs?.filterCounts['isOpenToday'] }})</span>
          </div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.isOpenTomorow" />
          <div>
            {{ $attrs.lang.labelOpenTomorrow == null ? 'Tomorrow' : $attrs.lang.labelOpenTomorrow }}
            <span>({{ $attrs?.filterCounts['isOpenTomorow'] }})</span>
          </div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.isOpenSaturaday" />
          <div>
            {{ $attrs.lang.labelOpenInStaurday == null ? 'At Saturday' : $attrs.lang.labelOpenInStaurday }}
            <span>({{ $attrs?.filterCounts['isOpenSaturaday'] }})</span>
          </div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.isOpenSunday" />
          <div>
            {{ $attrs.lang.labelOpenInSunday == null ? 'At Sunday' : $attrs.lang.labelOpenInSunday }}
            <span>({{ $attrs?.filterCounts['isOpenSunday'] }})</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="$attrs.isEventFilterActive" class="mt-3">
      <span v-if="$attrs.lang.filterIsPromotion == null">Is promotion</span>
      <span v-else>{{ $attrs.lang.filterIsPromotion }}</span>
      <div class="toggle-container">
        <div class="toggle-item">
          <UToggle v-model="filters.promoOpenNow" />
          <div>
            {{ $attrs.lang.labelEventNow == null ? 'Now' : $attrs.lang.labelEventNow }}
            <span>({{ $attrs?.filterCounts['promoOpenNow'] }})</span>
          </div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.promoOpenToday" />
          <div>
            {{ $attrs.lang.labelEventToday == null ? 'Today' : $attrs.lang.labelEventToday }}
            <span>({{ $attrs?.filterCounts['promoOpenToday'] }})</span>
          </div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.promoOpenTomorow" />
          <div>
            {{ $attrs.lang.labelEventTomorrow == null ? 'Tomorrow' : $attrs.lang.labelEventTomorrow }}
            <span>({{ $attrs?.filterCounts['promoOpenTomorow'] }})</span>
          </div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.promoOpenThisWeek" />
          <div>
            {{ $attrs.lang.labelEventNextWeekend == null ? 'In This Weekend' : $attrs.lang.labelEventNextWeekend }}
            <span>({{ $attrs?.filterCounts['promoOpenThisWeek'] }})</span>
          </div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.promoOpenThisMonth" />
          <div>
            {{ $attrs.lang.labelEventThisMonth == null ? 'At Saturday' : $attrs.lang.labelEventThisMonth }}
            <span>({{ $attrs?.filterCounts['promoOpenThisMonth'] }})</span>
          </div>
        </div>
        <div class="toggle-item">
          <UToggle v-model="filters.promoOpenNextMonth" />
          <div>
            {{ $attrs.lang.labelEventNextMonth == null ? 'At Sunday' : $attrs.lang.labelEventNextMonth }}
            <span>({{ $attrs?.filterCounts['promoOpenNextMonth'] }})</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="$attrs.isEventFilterActive" class="mt-3">
      <div>
        <span v-if="$attrs.lang.labelStartTime == null">Start date</span>
        <span v-else>{{ $attrs.lang.labelStartTime }}</span>
        <div>
          <input type="date" v-model="filters.startFilter.date" :min="date.toISOString().split('T')[0]"/>
          <input type="time" v-model="filters.startFilter.time" />
        </div>
      </div>
      <div>
        <span v-if="$attrs.lang.labelEndTime == null">End date</span>
        <span v-else>{{ $attrs.lang.labelEndTime }}</span>
        <div>
          <input type="date" v-model="filters.endFilter.date" :min="date.toISOString().split('T')[0]"/>
          <input type="time" v-model="filters.endFilter.time" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const attrs = useAttrs();
const filters = attrs.filters;
const date = ref(new Date());
</script>
<style scoped lang="scss">
.main-container {
  background: rgba(255, 255, 255, 0.6);
  padding: 15px;
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

.dark {
  .main-container {
    background: rgb(38, 38, 38);
  }
}
</style>
