<template>
  <div>

    <div>
      <div class="form-group">
        <legend>VỊ TRÍ ĐÓN KHÁCH</legend>
      </div>         
      <b-input-group prepend="">
        <b-form-input placeholder="Địa chỉ đón khách" :value="CusInfo.Address"></b-form-input>
        <b-input-group-append>
          <b-btn variant="btn btn-primary" @click="addMarker">Định vị</b-btn>         
        </b-input-group-append>
      </b-input-group> 
      <!--<button @click="addMarker">Định vị</button>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Địa chỉ đón khách" :value="CusInfo.Address" @change="addMarker" >
        
      </div>
      <gmap-autocomplete
        @place_changed="addMarker" :value="CusInfo.Address" @changed="addMarker">
      </gmap-autocomplete>  --> 
    </div>
    <gmap-map
      :center="center"
      :zoom="16"
      map-type-id="terrain"
      style="width:100%;  height: 500px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"  
        @dragend="updatePosition"      
      ></gmap-marker>
    </gmap-map>   
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "GoogleMap",
  
  props: [
    'CusInfo',
    'AccessToken',
  ],

  data() {
    return {      
      center: {},
      markers: [],
      places: [],
      currentPlace: null    
    };
  },  

  mounted() {
    this.geolocate();
  },

  update(){
    
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },

    addMarker() {     
      var self = this;
      self.markers = [];

      if (self.$props.CusInfo) {        
        self.center = {
          lat: parseFloat(self.$props.CusInfo.Latitude),
          lng: parseFloat(self.$props.CusInfo.Longitude)
        };
        self.markers.push({ position: self.center });     
      }
    },

    geolocate() {
      if(navigator.geolocation) {
         var self = this;
         navigator.geolocation.getCurrentPosition(function(position){
          self.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          self.markers.push({ position: self.center });
        })
      }
    },

    updatePosition(location) {
      var self = this;
      self.center = {
          lat: location.latLng.lat(),
          lng: location.latLng.lng(),
      };
      self.$props.CusInfo.Latitude = self.center.lat;
      self.$props.CusInfo.Longitude = self.center.lng;
      //console.log(self.$props.CusInfo);

      //update db
      axios.post('http://localhost:6300/request/updatelatlng'
                ,{
                  latitude: self.$props.CusInfo.Latitude,
                  longitude: self.$props.CusInfo.Longitude,
                  updateby: "hoangcp",
                  id: self.$props.CusInfo.ID
                }
                ,{
                    headers: {'access-token': self.$props.AccessToken }
                  }
                 )
            .then(res => {                   
              console.log(res);
              alert(res.data.msg);
            })
            .catch(err => {
              console.log(err);
            })         


    },  
  },

  /*watch: {
    Cure: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    }
  },*/

};
</script>

<style scoped>
</style>