<template>
  <ChangeLanguage :lang="lang" @changeLang="changeLang" label="Wybrany język"/>
</template>
<script setup>
const lang = useState('lang');
const emit = defineEmits(['changeLang']);
const changeLang = (data) => {
  lang.value = data;
};
</script>
