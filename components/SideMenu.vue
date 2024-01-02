<template>
  <div class="overlay-menu" v-if="menuVisible">
    <!-- Tutaj dodaj zawartość menu, np. linki nawigacyjne -->
    <div class="header-container">
      <div class="button"><svg
          @click="toggleMenu"
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.0833 3.12623L22.5571 0.599976L12.5417 10.6154L2.52625 0.599976L0 3.12623L10.0154 13.1416L0 23.1571L2.52625 25.6833L12.5417 15.6679L22.5571 25.6833L25.0833 23.1571L15.0679 13.1416L25.0833 3.12623Z"
            fill="#F2A413"
          />
        </svg></div>
      <div class="title">Guidedtour</div>
      <div class="sub-title">Discover the world with a guide!</div>
    </div>
    <div class="navigation">
        <nav>
       <ul>
          <li><NuxtLink class="menu-item active" to="/" @click="toggleMenu">Home</NuxtLink></li>
          <li><NuxtLink class="menu-item" to="/about">Change Language</NuxtLink></li>
        </ul>
    </nav>
    </div>
    <div class="partners">
      <div class="description">
        Official Partners
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGlobalState } from '~/composables/useGlobalState';
const { menuVisible, toggleMenu } = useGlobalState();

// Zmienna kontrolująca widoczność menu
const isVisible = ref(true);

// Tutaj możesz dodać logikę otwierania/zamykania menu
</script>

<style lang="scss" scoped>
.overlay-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  background: #E2E2E2;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
}

.overlay-menu::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('assets/img/background.png'); /* Obrazek tła */
  background-size: cover;
  z-index: -1;
  opacity: 0.5; /* Dostosuj wartość dla odpowiedniego poziomu przyciemnienia */
}
.header-container{
  margin:45px 24px;
  display:flex;
  flex-direction: column;
  }
  .title{
font-family: Poppins;
font-size: 34px;
font-style: normal;
font-weight: 700;
line-height: 39px; /* 114.706% */
  }
.description {
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 29px; /* 161.111% */
  align-self: start;
}
.button{
  align-self: flex-end;
  cursor:pointer;
}
.menu-item {
  color:black;
  display: flex;
  align-items: center;
  margin-bottom:2px;
  padding: 12px 0px 12px 16px;
  border-radius: 6px;
  font-size:16px;
  line-height: 24px;
}
.menu-item:hover {
  cursor:pointer;
  opacity:0.6;

}
.active{
color:$accent;
background: var(--Gray-050, #F7F8F9); 
}
.navigation{
  margin-top:200px;
  padding: 0px 20px;
}

nav ul {
  list-style: none;
  padding: 0;
}
nav ul li a {
  text-decoration: none;
}
</style>
