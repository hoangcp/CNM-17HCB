<template>
  <div>    
    <gmap-map ref="mapRef"
      :center="center"
      :zoom="16"
      map-type-id="terrain"
      style="width:100%;  height: 400px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"        
      ></gmap-marker>
      <gmap-polyline v-bind:path.sync="path" v-bind:options="{ strokeColor:'#008000'}">
      </gmap-polyline>
    </gmap-map>   
  </div>
</template>
<script>
//import axios from 'axios'

export default {
  name: "GoogleMap",
  
  data() {
    return {      
      center: { lat: 10.762658, lng: 106.6649511 },
      markers: [
        { lat: 10.762658, lng: 106.6649511 }, 
        { lat: 10.7526639, lng: 106.7314304 }
      ],
      places: [],
      currentPlace: null,
      Address: "",   
      path: []
    };
  },  

  mounted() {
    
  },

  update(){
    
  },

  methods: {
    // receives a place object via the autocomplete component
    addMarkerFromParent(CusInfo) {     
      var self = this;
      //console.log(self.Address);
      self.markers = [];

      if (CusInfo) {        
        self.center = {
          lat: parseFloat(CusInfo.Latitude),
          lng: parseFloat(CusInfo.Longitude)
        };
        var AccPosition = {
          lat: parseFloat(CusInfo.AccLatitude),
          lng: parseFloat(CusInfo.AccLongitude)
        };
        self.markers.push({ position: self.center });     
        self.markers.push({ position: AccPosition });   
        self.path.push(self.center, AccPosition);
      }
    },
  },

};
</script>

<style scoped>
</style>