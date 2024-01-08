<template>
  <div class="sections">
    <div class="section">
      <div class="section-title">
        <div class="title">Categories</div>
        <NuxtLink to="/categories"><div class="all">all ></div></NuxtLink>
      </div>
      <div class="section-box">
        <div class="item" v-for="item in $attrs.coreData.categories" :key="item.id">
          <NuxtLink to="/">
            <div class="image">
              <img
                :src="baseUrl + item.image"
                onerror="this.onerror=null; this.src='assets/project.jpeg';"
              />
            </div>
            <div class="description">{{ item.name }}</div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section-title">
        <div class="title">Promotions</div> 
      </div>
      <div class="section-box">
        <div class="item" v-for="item in $attrs.coreData.promotions" :key="item.id">
          <NuxtLink to="/">
            <div class="image">
              <img
                :src="baseUrl + item.image"
                onerror="this.onerror=null; this.src='assets/project.jpeg';"
              />
            </div>
            <div class="description">{{ item.name }}</div>
            <!-- <div class="badge">7 dni</div> -->
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section-title">Events</div>
      <div class="section-box">
        <div class="item" v-for="item in $attrs.coreData.events" :key="item.id">
          <NuxtLink to="/">
            <div class="image">
              <img
                :src="baseUrl + item.image"
                onerror="this.onerror=null; this.src='assets/project.jpeg';"
              />
            </div>
            <div class="description">{{ item.name }}</div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="section">

      <div class="section-title">Top Rated</div>
      <div class="section-box">
        <div class="item" v-for="item in $attrs.coreData.ratings" :key="item.id">
          <NuxtLink to="/">
            <div class="image">
              <img
                :src="baseUrl + item.image"
                onerror="this.onerror=null; this.src='assets/project.jpeg';"
              />
            </div>
            <div class="description desc-big">{{ item.name }}</div>
            <div class="ratings">
              <div class="star" v-for="(star, index) in 5" :key="index">
                <svg
                v-if="index < item.rating"
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_352_347)">
                    <path
                      d="M9 13.9702L13.635 16.9853L12.405 11.3027L16.5 7.47926L11.1075 6.98617L9 1.62692L6.8925 6.98617L1.5 7.47926L5.595 11.3027L4.365 16.9853L9 13.9702Z"
                      fill="#F2B90F"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_352_347">
                      <rect
                        width="18"
                        height="19.4"
                        fill="white"
                        transform="translate(0 0.0102539)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <svg 
                v-else
                width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_352_351)">
<path d="M16.5 7.47926L11.1075 6.97809L9.00001 1.62692L6.89251 6.98617L1.50001 7.47926L5.59501 11.3027L4.36501 16.9853L9.00001 13.9702L13.635 16.9853L12.4125 11.3027L16.5 7.47926ZM9.00001 12.4586L6.18001 14.2935L6.93001 10.8338L4.44001 8.50584L7.72501 8.19867L9.00001 4.94109L10.2825 8.20676L13.5675 8.51392L11.0775 10.8419L11.8275 14.3016L9.00001 12.4586Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_352_351">
<rect width="18" height="19.4" fill="white" transform="translate(7.62939e-06 0.0102539)"/>
</clipPath>
</defs>
</svg>

              </div>
            </div>
            <div class="description"> <span v-if="item.rating <=5"> {{item.rating}} / 5 </span> <span v-else> 5 / 5 </span></div>
          </NuxtLink>
        </div>
      </div>
    </div>
     <div class="section">
      <div class="section-title">Sponsors</div>
      <div class="section-box">
        <div class="item" v-for="item in $attrs.coreData.sponsors" :key="item.id">
          <NuxtLink v-if="item.mainPage == true" :to="item.url">
            <div class="image">
              <img
                :src="baseUrl + item.icon"
                onerror="this.onerror=null; this.src='assets/project.jpeg';"
              />
            </div>
            <div class="description">{{ item.name }}</div>
            <!-- <div class="badge">7 dni</div> -->
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const baseUrl = useBaseUrl();
</script>

<style lang="scss" scoped>
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
.all {
  color: $accent;
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
.description {
  color: #000;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 14px; /* 158.333% */
}
.desc-big{
    height: 40px;
}
a {
  text-decoration: none;
}
.ratings{
    display:flex;
}
.badge{
color:white;
display: flex;
height: 22px;
padding: 2px 8px;
justify-content: center;
align-items: center;
gap: 2px; 
border-radius: 36px;
background: #000;
box-shadow: 0px 1px 2px 0px rgba(105, 81, 255, 0.05);
}
</style>
