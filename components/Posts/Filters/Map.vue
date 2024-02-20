<template>
  <ClientOnly>
    {{ askForLocation() }}
  </ClientOnly>
  <div class="map-container">
    <UCheckbox
      v-model="showMap"
      name="showMap"
      :label="$attrs.lang.labelShowOnMap == null ? 'pokaz na mapie' : $attrs.lang.labelShowOnMap" />
    <UCheckbox
      class="mb-2 mt-2"
      v-model="allowDistance"
      name="allowDistance"
      :label="
        $attrs.lang.filterUseDistanceFilter == null ? 'Use distance filter' : $attrs.lang.filterUseDistanceFilter
      " />
    <UCheckbox v-model="showAllMarkerBoxes" name="showMap" label="Pokaż wszystkie dymki" />
    {{ $attrs.lang.filterDistance == null ? 'distance filter (km)' : $attrs.lang.filterDistance }} ({{ distance }})
    <URange class="mt-2 mb-2" v-model="distance" name="distance" :min="0" :max="30" />
    <UBadge v-if="!geoPerm" class="mb-2">
      Location access denied. Some features related to maps in this application may not work. Please check if your
      device and browser allow geolocation.
    </UBadge>
    <div class="map" v-if="showMap">
      <LMap ref="map" :zoom="zoom" :center="center" :minZoom="3" :zoomSnap="1.0">
        <LTileLayer
          :url="url"
          :attribution="attribution"
          :maxZoom="19"
          :zoomSnap="1.0"
          layer-type="base"
          name="OpenStreetMap" />
        <LMarker
          v-for="item in markers"
          :key="item.id"
          :lat-lng="[item.lattitude, item.longtitude]"
          @click="showMarkerbox($event, item)">
          <LIcon :icon-anchor="staticAnchor" :icon-size="[28, 28]" class-name="someExtraClass flex-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 48 48">
              <path
                fill="#000"
                fill-rule="evenodd"
                d="M23.424 41.817L24 41zm1.152 0l.004-.002l.01-.007l.03-.023l.118-.085c.1-.074.246-.182.43-.324c.368-.282.89-.697 1.513-1.23a43.403 43.403 0 0 0 4.575-4.54C34.564 31.78 38 26.32 38 20.076c0-3.73-1.474-7.31-4.098-9.95A13.962 13.962 0 0 0 24 6a13.962 13.962 0 0 0-9.902 4.125A14.117 14.117 0 0 0 10 20.077c0 6.243 3.436 11.703 6.744 15.529a43.403 43.403 0 0 0 4.575 4.54c.624.533 1.145.948 1.513 1.23a25.536 25.536 0 0 0 .547.41l.032.022l.009.007l.004.002c.345.243.807.243 1.152 0M24 41l.576.817zm5-21a5 5 0 1 1-10 0a5 5 0 0 1 10 0"
                clip-rule="evenodd" />
            </svg>

            <NuxtLink v-if="item.isBig !== false" :to="`/singlePost-${item.id}/${item.name}`">
              <div class="markerbox headline flex inline q-ml-xs" :class="{ show_markerbox: showAllMarkerBoxes }">
                {{ item.name }}
                <br />
                <br />
                <span v-if="item.distance != NaN && item.distance != undefined && item.distance != null">{{
                  (item.distance / 1000).toFixed(2) + ' km'
                }}</span>
              </div>
            </NuxtLink>
          </LIcon>
        </LMarker>
        <LMarker v-if="userCords" :lat-lng="userCords">
          <LIcon :icon-anchor="staticAnchor" :icon-size="[48, 48]" class-name="someExtraClass flex-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16">
              <path
                fill="#000"
                fill-rule="evenodd"
                d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265a.3.3 0 0 0-.057.09V14l.002.008l.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395c.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09a1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977c-.29.228-.68.413-1.116.558c-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243c.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411" />
            </svg>
          </LIcon>
        </LMarker>
      </LMap>
    </div>
  </div>
</template>
<script setup>
const attrs = useAttrs();
const filters = attrs.filters;
const showMap = ref(false);
const allowDistance = ref(false);
const showAllMarkerBoxes = ref(false);
const distance = ref(filters.distance ? filters.distance: 0);
const attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const url = ref('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
const zoom = ref(17);
const markers = ref([]);
let userCords;
if(filters.lattitude && filters.longtitude) {
  userCords = [filters.lattitude, filters.longtitude];

  if(filters.distance > 0) {
    showMap.value = true;
    allowDistance.value = true;
  }
}

let watchId;
let geoPerm;
let firstElWithGeo = attrs.items?.find((el) => !!el.longtitude && !!el.lattitude);
const center = ref([firstElWithGeo?.lattitude, firstElWithGeo?.longtitude]);
markers.value = attrs.items
  ?.filter((el) => !!el.longtitude && !!el.lattitude)
  .map((el) => ({
    ...el,
    name: el.alternativeMapName || el.name,
  }));

const setPosition = (position) => {
  userCords = [position.coords?.latitude, position.coords?.longitude];
  filters.lattitude = userCords[0];
  filters.longtitude = userCords[1];
};

const errorPosition = (position) => {
  console.warn('Nie udalo sie pobrac pozycji');
};

const askForLocation = () => {
  if (
    navigator.permissions != undefined &&
    navigator.permissions &&
    typeof navigator.permissions.query === 'function'
  ) {
    navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
      if (permissionStatus.state === 'granted') {
        // Użytkownik udzielił zgody, możemy śledzić lokalizację
        watchId = navigator.geolocation.watchPosition(setPosition, errorPosition, { timeout: 3000 });
        geoPerm = true;
        localStorage.setItem('geo_perm', 'true');
      } else if (permissionStatus.state === 'prompt') {
        // Użytkownik jeszcze nie udzielił zgody, wyświetlamy prośbę o zgodę tylko raz
        navigator.geolocation.getCurrentPosition(setPosition, errorPosition);
        watchId = navigator.geolocation.watchPosition(setPosition, errorPosition, { timeout: 3000 });
        // Zapisujemy informację w localStorage, że użytkownik nie udzielił zgody
        localStorage.setItem('geo_perm', 'false');
        geoPerm = false;
      } else {
        // Użytkownik nie udzielił zgody, wyświetlamy komunikat
        alert(
          'Location access denied. Some features related to maps in this application may not work. Please check if your device and browser allow geolocation.'
        );
        // Zapisujemy informację w localStorage, że użytkownik nie udzielił zgody
        localStorage.setItem('geo_perm', 'false');
        geoPerm = false;
      }
    });
  } else {
    // Jeśli navigator.permissions lub navigator.permissions.query nie istnieją, po prostu próbujemy uzyskać lokalizację
    navigator.geolocation.getCurrentPosition(setPosition, errorPosition);
  }
};

const goToSinglePost = async (item) => {
  await navigateTo(`/singlePost-${item.id}/${item.name}`);
  // $router.push(`/singlePost-${item.id}/${item.name}`);
};

const showMarkerbox = (event, item) => {
  event.originalEvent.srcElement.parentElement.parentElement.classList.toggle('show_markerbox');
};

watch(allowDistance, (newVal, oldVal) => {
  filters.distance = newVal ? distance : 0;
});
</script>
<style scoped lang="scss">
.map {
  height: 300px;

  .leaflet-container a {
    color: #000;
  }
}

.markerbox {
  background-color: white;
  border: solid black 1px;
  border-radius: 6px;
  padding: 4px;
  font-size: 10px;
  line-height: 10px;
  width: 100px;
  opacity: 0.73;
}

.markerbox:not(.show_markerbox) {
  visibility: hidden;
}

.show_markerbox {
  .markerbox {
    visibility: visible;
  }
}

.markerbox:hover {
  cursor: pointer;
  opacity: 1;
  background-color: rgb(232, 232, 232);
}

.map-container {
  background: rgba(255, 255, 255, 0.6);
  padding: 15px;
  border-radius: 8px;
}
.dark {
  .map-container {
    background: rgb(38, 38, 38);
  }
}
</style>
