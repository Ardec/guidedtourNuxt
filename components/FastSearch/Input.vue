<template>
  <div class="search-content">
    <div class="searcher">
      <input
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @click="click"
        v-on:keyup.enter="change(modelValue)" />
      <UIcon name="i-heroicons-magnifying-glass-16-solid" class="search-icon" @click="change(modelValue)"/>
    </div>
    <div class="divider"></div>
    <div class="suggests-list">
      <div v-for="item in $attrs.items" :key="item" @click="change(item)" class="item">
        {{ item }}
      </div>
      <div class="divider" v-if="$attrs.items?.length > 0"></div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: String,
  },
});

const emit = defineEmits(['click', 'change']);

const click = () => {
  emit('click');
};

const change = (item) => {
  emit('change', item);
};
</script>

<style lang="scss" scoped>
.search-content {
  position: relative;
}
.searcher {
  height: 42px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.5);
  padding: 8px;
  position: relative;
  margin-bottom: 5px;

  input {
    background: transparent;
    height: 26px;
    width: 100%;
    &:focus-visible {
      outline: none;
      border: none;
    }
  }

  .search-icon {
    position: absolute;
    right: 8px;
    top: 6px;
    width: 30px;
    height: 30px;
    color: $accent;
    cursor: pointer;
  }
}

.divider {
  border-bottom: 1px solid $accent;
  height: 1px;
}

.suggests-list {
  position: absolute;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1;
  .item {
    padding: 2px 4px;
    background: $backgorund;
    color: $accent;
    border-bottom: 1px solid #e2e2e2;
    cursor: pointer;
  }
}

.suggests-list {
  overflow-x: hiden; /* Enable horizontal scrolling */
  overflow-y: auto; /* Hide vertical scrollbar */
  scrollbar-width: thin; /* Można ustawić 'auto', 'thin' lub 'none' */
  scrollbar-color: $accent transparent; /* Kolor suwaka i tła (ścieżki) */
}
/* Stylizowanie paska przewijania dla przeglądarek WebKit */
.suggests-list::-webkit-scrollbar {
  width: 8px; /* Grubość paska przewijania */
}

.suggests-list::-webkit-scrollbar-track {
  background: transparent; /* Kolor tła ścieżki paska przewijania */
}

.suggests-list::-webkit-scrollbar-thumb {
  background: orange; /* Kolor suwaka paska przewijania */
  border-radius: 2px; /* Zaokrąglenie krawędzi suwaka */
  min-height: 20px; /* Minimalna długość suwaka */
}
</style>
