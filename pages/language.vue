<template>
  <!-- {{ selectedLang }}
  <USelect v-model="selectedLang" :options="alllang" option-attribute="name" value-attribute="id" /> -->
  <ChangeLanguage />
</template>
<script setup>
// const lang = await useFetchLang();
// const alllang = await useFetchAllLang();
// const selectedLang = ref(alllang[0].id);
// console.log(lang);
// console.log(alllang);

// watch(selectedLang, (newVal, oldVal) => {
//   let newLang = alllang.find((item) => {
//     console.log(item.id);

//     return item.id == selectedLang.value;
//   });
//   if (newLang) {
//     localStorage.setItem('lang', JSON.stringify(newLang));
//   }
// });
</script>
