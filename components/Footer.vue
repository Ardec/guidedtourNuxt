<template>
  <div class="sections">
    <div class="section">
      <div class="section-title"><div class="title">Featured sites</div></div>
      <div class="assosiated-container">
        <div v-for="item in $attrs.assosiatedData?.assosiatedSites" :key="item.id" class="assosiated-item"><NuxtLink :to="item.url">{{item.name}}</NuxtLink></div>
      </div>
    </div>
    <div class="section">
      <div class="section-title">Management</div>
      <div class="section-description">
        <b>{{ $attrs.ownerData.ownerInfos[0].name }}</b
        ><br />
        {{ $attrs.ownerData.ownerInfos[0].shortDescription }} <br />
        <br />
        {{ $attrs.ownerData.ownerInfos[0].phone }} <br />
        {{ $attrs.ownerData.ownerInfos[0].email }} <br />
      </div>
    </div>
    <div class="section">
      <div class="section-title">Technical Support</div>
      <div class="section-description">
        Kamil Kaczmarczyk <br />
        K-Development <br />
        <br />
        +48 508-786-884 <br />
        kamil.kaczmarczyk.box@gmail.com <br />
        <br />
        Application errors can be reported via the above email address
      </div>
    </div>
    <div class="section">
      <div class="footer-title">
        <div class="title">Guidedtour.app</div>
        <div class="sub-title">all rights reserved 2023</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const baseUrl = useBaseUrl();
const { data: ownerData, execute } = useFetch(baseUrl + "owner/info", {
  lazy: true,
});
</script>

<style lang="scss" scoped>
.sections {
  padding:10px 10px;
  margin-top:20px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius:4px;
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
  margin-bottom:8px;
  margin-top:16px;
}
.footer-title {
  color: $accent;
  display: flex;
  flex-direction: column;
  font-family: Poppins;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px; /* 114.286% */
  margin-top: 24px;
}
.sub-title {
  color: #000;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 29px; /* 161.111% */
}
.dark {
  .section-title,
  .sub-title {
    color: #fff;
  }
}
</style>
