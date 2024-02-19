<script setup>
const setRemoveFiltersEvent = () => {
  window.addEventListener('beforeunload', (event) => {
    const filters = useCookie('filters');
    if (filters) {
      filters.value = null;
    }
  });
};
</script>

<template>
  <ClientOnly>{{ setRemoveFiltersEvent() }}</ClientOnly>
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

.dark {
  body {
    background: none;
  }
}

h6 {
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
}

img {
  max-width: none;
}

.section-box {
  padding: 8px 0px;
  display: flex;
  flex-direction: row;
  gap: 12px;
  overflow-x: auto; /* Enable horizontal scrolling */
  overflow-y: hidden; /* Hide vertical scrollbar */
  scrollbar-width: thin; /* Można ustawić 'auto', 'thin' lub 'none' */
  scrollbar-color: $accent transparent; /* Kolor suwaka i tła (ścieżki) */
  //justify-content: center;
}

/* Stylizowanie paska przewijania dla przeglądarek WebKit */
.section-box::-webkit-scrollbar {
  height: 8px; /* Grubość paska przewijania */
}

.section-box::-webkit-scrollbar-track {
  background: transparent; /* Kolor tła ścieżki paska przewijania */
}

.section-box::-webkit-scrollbar-thumb {
  background: orange; /* Kolor suwaka paska przewijania */
  border-radius: 2px; /* Zaokrąglenie krawędzi suwaka */
  min-height: 20px; /* Minimalna długość suwaka */
}
</style>
