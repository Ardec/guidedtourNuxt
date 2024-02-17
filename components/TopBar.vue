<template>
  <div class="topbar">
    <div class="flex justify-between w-full">
      <div></div>
      <div class="sub-title">{{$attrs.ownerData.data.ownerInfos[0].name}}</div>
      <div>
        <UIcon @click="zoomUp()" class="zoom" name="i-heroicons-magnifying-glass-plus-solid" style="font-size: 30px;"></UIcon>
        <UIcon @click="zoomDown()"  class="zoom" name="i-heroicons-magnifying-glass-minus-solid" style="font-size: 30px;"></UIcon>
      </div>
    </div>
    <div class="title-container">
      <div  class="left-icon">
        <svg
         @click="toggleMenu"
          v-if="$attrs.leftIcon"
          width="31"
          height="31"
          viewBox="0 0 31 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_150_473)">
            <line x1="0.5" y1="8" x2="30.5" y2="8" stroke="#F2A413" stroke-width="5" />
            <line x1="0.5" y1="17" x2="30.5" y2="17" stroke="#F2A413" stroke-width="5" />
            <line x1="0.5" y1="26" x2="30.5" y2="26" stroke="#F2A413" stroke-width="5" />
          </g>
          <defs>
            <clipPath id="clip0_150_473">
              <rect width="30" height="30" fill="white" transform="translate(0.5 0.5)" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div class="title">Guidedtour</div>
      <div class="right-icon">
        <svg v-if="$attrs.rightIcon"
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
        </svg>
      </div>
    </div>
    <div class="description">{{$attrs.ownerData.data.ownerInfos[0].shortDescription}}</div>
  </div>
</template>

<script setup>
const { menuVisible, toggleMenu } = useGlobalState();
let zoom = 1;

const zoomUp = () => {
  zoom = zoom + 0.1;
  document.body.style.zoom = zoom;
}

const zoomDown = () => {
  zoom = zoom - 0.1;
  document.body.style.zoom = zoom;
}
</script>

<style lang="scss" scoped>
.topbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-width: 300px;
  padding: 10px 0;
}
.sub-title {
  text-align: center;
  font-family: "Poppins", sans-serif; // Użycie Poppins
  font-size: 18px;
  font-style: normal;
  font-weight: 700; // Waga 700 odpowiada wersji SemiBold
  line-height: 29px; // 161.111%
}
.title-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.left-icon,
.right-icon {
  width: 31px; // Ustaw szerokość równą szerokości ikon
  height: 31px; // Ustaw wysokość równą wysokości ikon
  display: flex;
  align-items: center;
  justify-content: center;
}
.right-icon svg{
    cursor:pointer
}
.left-icon svg{
    cursor:pointer
}
.title {
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

.zoom {
  cursor: pointer;
}
</style>
