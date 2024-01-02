<template>
  <div class="topbar">
   <div class="sub-title">Andorra</div>
   <div class="title-container">
    <div class="left-icon" @click="toggleMenu">menu {{menuVisible}}</div>
    <div class="title">Guidedtour</div>
    <div class="right-icon" @click="toggleMenu">close</div>
   </div>
   <div class="description">description</div>
  </div>
</template>

<script setup>
import { useGlobalState } from '~/composables/useGlobalState';
const { menuVisible, toggleMenu } = useGlobalState();
console.log('menuVisible.value in component:', menuVisible.value
);
</script>

<style lang="scss" scoped>
.topbar{
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-width:300px;
    padding:10px;
    }
    .sub-title {
  color: #000;
  text-align: center;
  font-family: 'Poppins', sans-serif; // Użycie Poppins
  font-size: 18px;
  font-style: normal;
  font-weight: 700; // Waga 700 odpowiada wersji SemiBold
  line-height: 29px; // 161.111%
}
    .title-container{
        width:100%;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
    }
        .left-icon{
            /* background-color: white; */
            cursor:pointer;
        }

</style>