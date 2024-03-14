<template>
  <UModal v-model="$attrs.isOpen" fullscreen>
    <div class="main-container">
      <div class="title">Guidedtour</div>
      <h6 v-if="$attrs.lang.welcomeText == null" class="welcome-text">Odkrywaj świat z przewodnikiem</h6>
      <h6 v-else class="welcome-text">
        {{ $attrs.lang.welcomeText }}
      </h6>
      <p class="sub-text" v-if="$attrs.lang.welcomeSubText == null">
        Witaj w aplikacji elektronicznego przewodnika turystycznego. Ta innowacyjna platforma zaprasza Cię do odkrywania
        niezwykłych miejsc. Zintegrowane narzędzia nawigacyjne, interaktywne mapy oraz bogata treść kulturowa
        umożliwiają głębsze zanurzenie się w historii i atrakcjach regionu, które zamierzasz odwiedzić. Bez względu na
        Twój poziom doświadczenia podróżniczego, aplikacja ta stanowi niezastąpione wsparcie, pomagając Ci czerpać
        pełnię radości z podróży i tworzyć niezapomniane wspomnienia.
      </p>
      <p class="sub-text" v-else>
        {{ $attrs.lang?.welcomeSubText }}
      </p>
      <ChangeLanguage :lang="$attrs.lang" @changeLang="changeLang" />
      <UButton class="accept-button" label="Akceptuję i wchodzę" block @click="accept()" />
      <UBadge v-if="showHelpInfo">
        Korzystanie z aplikacji wymaga ukończenia 18 lat i zaakceptowania regulaminu
      </UBadge>
      <div :class="{'checkbox-red': showHelpInfo}">
        <UCheckbox
          required
          config.base="h-5 w-5"
          class="accept-checkbox"
          v-model="isEighteen"
          label="Oświadczam, ze mam ukończone 18 lat." />
        <UCheckbox
          class="accept-checkbox"
          v-model="acceptTerms"
          required
          label="Akceptuję regulamin i politykę prywatności" />
      </div>
    </div>
  </UModal>
</template>
<script setup>
const isEighteen = ref(false);
const acceptTerms = ref(false);
const showHelpInfo = ref(false);
const emit = defineEmits(['changeLang', 'closeDialog']);

const accept = () => {
  if (!isEighteen.value || !acceptTerms.value) {
    showHelpInfo.value = true;
  } else {
    localStorage.setItem('storagerights', true);
    emit('closeDialog');
  }
};

const changeLang = (item) => {
  emit('changeLang', item);
};
</script>
<style scoped lang="scss">
.main-container {
  font-family: 'Poppins';
  color: #000;
  padding: 50px 40px;

  height: 100%;
  background: #e2e2e2;
  background: url('assets/img/background.png') no-repeat center center fixed, #e2e2e2;
  background-size: cover;

  .title {
    font-size: 34px;
    font-weight: 700;
    line-height: 39px; /* 114.706% */
  }

  .welcome-text {
    font-size: 18px;
    font-weight: 600;
    line-height: 29px;
    margin: 10px 0;
  }

  .sub-text {
    font-size: 12px;
    font-weight: 400;
    line-height: 18px; /* 150% */
  }

  .accept-button {
    color: #000;
    height: 45px;
    font-size: 18px;
    margin-top: 20px;
    margin-bottom: 25px;
  }
}

.dark {
  .main-container {
    background: none;
    color: #fff;
  }
}

</style>
<style lang="scss">
.accept-checkbox {
  margin: 10px 0;
  input {
    width: 25px;
    height: 25px;
  }
}

.checkbox-red {
  label {
    color: red;
  }
}
</style>
