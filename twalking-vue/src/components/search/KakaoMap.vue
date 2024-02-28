<script setup>
import { ref, watch, onMounted } from 'vue';

let map;
const positions = ref([]);
const markers = ref([]);
const props = defineProps({ places: Array, selectPlace: Object });

watch(
  () => props.selectPlace.value,
  () => {
    let moveLatLon = new kakao.maps.LatLng(
      props.selectPlace.raw.latitude,
      props.selectPlace.raw.longitude
    );
    map.panTo(moveLatLon);
  },
  { deep: true }
);

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement('script');
    /* global kakao */
    script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
      import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
    }`;
    script.onload = () => kakao.maps.load(() => initMap());
    document.head.appendChild(script);
  }
});

watch(
  () => props.places.value,
  () => {
    positions.value = [];
    props.places.forEach((palce) => {
      let obj = {};
      obj.latlng = new kakao.maps.LatLng(palce.latitude, palce.longitude);
      obj.title = palce.title;

      positions.value.push(obj);
    });
    loadMarkers();
  },
  { deep: true }
);

const initMap = () => {
  const container = document.getElementById('map');
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3
  };

  map = new kakao.maps.Map(container, options);
  map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
};

const loadMarkers = () => {
  deleteMarkers();

  // 마커 이미지를 생성합니다
  //   const imgSrc = require("@/assets/map/markerStar.png");
  // 마커 이미지의 이미지 크기 입니다
  //   const imgSize = new kakao.maps.Size(24, 35);
  //   const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);

  markers.value = [];
  positions.value.forEach((position) => {
    const marker = new kakao.maps.Marker({
      map: map,
      position: position.latlng,
      title: position.title,
      clickable: true
      // image: markerImage,
    });
    markers.value.push(marker);
  });

  const bounds = positions.value.reduce(
    (bounds, position) => bounds.extend(position.latlng),
    new kakao.maps.LatLngBounds()
  );

  map.setBounds(bounds);
};

const deleteMarkers = () => {
  if (markers.value.length > 0) {
    markers.value.forEach((marker) => marker.setMap(null));
  }
};
</script>

<template>
  <div id="map"></div>
</template>

<style>
#map {
  height: 84vh;
}
</style>
