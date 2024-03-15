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
          <li><NuxtLink class="menu-item" to="/language" @click="toggleMenu">Change Language</NuxtLink></li>
        </ul>
    </nav>
    </div>
    <div class="partners">
      <div class="description">
      </div>
      <div class="section">
      <div class="section-title">Sponsors</div>
      <div class="section-box">
        <div class="item" v-for="item in $attrs.coreData.sponsors" :key="item.id">
          <NuxtLink v-if="item.sideMenu == true" :to="item.url">
            <div class="image">
              <img
                :src="baseUrl + item.icon"
                onerror="this.onerror=null; this.src='assets/project.jpeg';"
              />
            </div>
            <!-- <div class="description">{{ item.name }}</div> -->
            <!-- <div class="badge">7 dni</div> -->
          </NuxtLink>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { useGlobalState } from '~/composables/useGlobalState';
const { menuVisible, toggleMenu } = useGlobalState();
const baseUrl = useBaseUrl();

// Zmienna kontrolująca widoczność menu
const isVisible = ref(true);

// Tutaj możesz dodać logikę otwierania/zamykania menu
</script>

<style lang="scss" scoped>
.overlay-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 320px;
  height: 100%;
  background: #E2E2E2;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 9999;
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
.partners{
  padding:0px 20px;
}

nav ul {
  list-style: none;
  padding: 0;
}
nav ul li a {
  text-decoration: none;
}
.sections{
    padding:0px 10px;
}
.section-title {
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  color: #000;
  font-family: Poppins;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px; /* 114.286% */
  margin-top: 8px;
}
.item {
  // height: 100px;
  width: 100px;
  // background-color: black;
  border-radius: 4px;
}
.image {
  border-radius: 4px;
}
img {
  width: 100px;
  height: 100px;
  border-radius: 4px;
}
.section-box {
  // background-color: red;
  padding: 8px 0px;
  display: flex;
  flex-direction: row;
  gap: 12px;
  overflow-x: auto; /* Enable horizontal scrolling */
  overflow-y: hidden; /* Hide vertical scrollbar */
  scrollbar-width: thin; /* Można ustawić 'auto', 'thin' lub 'none' */
  scrollbar-color: $accent transparent; /* Kolor suwaka i tła (ścieżki) */
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

.dark {
  .overlay-menu {
    background: #000;
  }

  .menu-item {
    color: #fff;

    &.active {
      background: $darkModeGray;
    }
  }
}
</style>
