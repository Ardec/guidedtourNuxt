<template>
  <div class="overlay-menu" v-if="menuVisible">
    <!-- Tutaj dodaj zawartość menu, np. linki nawigacyjne -->
    <nav>
      <ul>
        <li><a href="#home" @click="toggleMenu">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { useGlobalState } from '~/composables/useGlobalState';
const { menuVisible, toggleMenu } = useGlobalState();

// Zmienna kontrolująca widoczność menu
const isVisible = ref(true);

// Tutaj możesz dodać logikę otwierania/zamykania menu
</script>

<style scoped>
.overlay-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Półprzezroczyste tło */
  display: flex;
  justify-content: center;
  align-items: center;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-size: 20px;
}
</style>
