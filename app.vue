<script setup>


</script>

<template>
  <div class="app-container">
     <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <!-- <img class="animate__animated animate__bounce logo-container" src="~/assets/img/kdev.png" alt="Discover Nuxt 3" />
    Template K-Development SoftwareHouse -->
  </div>
</template>

<style lang="scss" scoped>

body {
    margin: 0;
    padding: 16px; // Ustawienie paddingu na 16px
    display: flex;
    box-sizing: border-box;
    min-width: 100vw; // Minimalna szerokość na 100% szerokości widoku
}

.logo-container {
    display: flex;
    justify-content: center; // Wyśrodkowanie w poziomie
    align-items: center; // Wyśrodkowanie w pionie
}

.app-container {
    display: flex;
    flex-direction: column; // Elementy ułożone pionowo
    justify-content: center; // Wyśrodkowanie w pionie
    align-items: center; // Wyśrodkowanie w poziomie
    height: 100%;
    margin: 0 auto; // Automatyczne wyśrodkowanie poziome
    padding: 0 16px; // Ustawienie paddingu poziomego na 16px
    width: 100%; // Szerokość na 100%
    max-width: 100vw; // Maksymalna szerokość na 100% szerokości widoku
}

</style>

<style lang="scss">
* {
    box-sizing: border-box; // Ustawienie box-sizing na border-box dla wszystkich elementów
}

body {
  background: #e2e2e2; /* Podstawowy szary kolor tła */
  background: url('assets/img/background.png') no-repeat center center fixed, #e2e2e2; /* Dodanie obrazu tła na wierzch */
  background-size: cover; /* Zapewnia pokrycie całego tła obrazem */
  font-family: 'Inter', sans-serif; /* Zastosowanie czcionki Inter */
}

</style>
