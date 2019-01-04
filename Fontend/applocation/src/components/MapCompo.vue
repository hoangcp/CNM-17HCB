<template>
  <div>

    <div>
      <div class="form-group">
        <legend>VỊ TRÍ ĐÓN KHÁCH</legend>
      </div>         
      <b-input-group prepend="" hidden>
        <b-form-input placeholder="Địa chỉ đón khách" :value="CusInfo.Address" v-model="Address" disabled="disabled"></b-form-input>
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
    <gmap-map ref="mapRef"
      :center="center"
      :zoom="16"
      map-type-id="terrain"
      style="width:100%;  height: 700px;"
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
      <!--<gmap-polyline v-bind:path.sync="path" v-bind:options="{ strokeColor:'#008000'}">
      </gmap-polyline>-->
    </gmap-map>   
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: "GoogleMap",
  
  props: [
    'CusInfo',    
  ],

  data() {
    return {      
      center: {},
      markers: [],
      places: [],
      currentPlace: null,
      Address: this.$props.CusInfo.Address,   
      path: [
        { lat: 10.762658, lng: 106.6649511 }, 
        { lat: 10.7526639, lng: 106.7314304 }
      ]
    };
  },  

  mounted() {
    this.geolocate();   
    //this.getRoute(); 
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
      //console.log(self.Address);
      self.markers = [];

      if (self.$props.CusInfo) {        
        self.center = {
          lat: parseFloat(self.$props.CusInfo.Latitude),
          lng: parseFloat(self.$props.CusInfo.Longitude)
        };
        self.markers.push({ position: self.center });     
      }
    },

    addMarkerFromParent(CusInfo) {     
      var self = this;
      //console.log(self.Address);
      self.markers = [];

      if (CusInfo) {        
        self.center = {
          lat: parseFloat(CusInfo.Latitude),
          lng: parseFloat(CusInfo.Longitude)
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
      if(parseInt(self.$props.CusInfo.ID) > 0)
      {
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
                    updateby: localStorage.username,
                    id: self.$props.CusInfo.ID
                  }
                  ,{
                      headers: {'access-token': localStorage.access_token }
                    }
                   )
              .then(res => {                   
                console.log(res);
                alert(res.data.msg);
              })
              .catch(err => {
                console.log(err.response);
                alert(err.response.data.msg);
                localStorage.clear();
                self.$router.push('/login');
              })         
        }
    },  

    /*getRoute: function () {
      var self = this;
      var directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer();
      self.directionsDisplay.setMap(self.$refs.mapRef.$mapObject);
     
      function calculateAndDisplayRoute(directionsService, directionsDisplay, start, destination) {
        directionsService.route({
          origin: start,
          destination: destination,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

      console.log(self.path[0]);
      console.log(self.path[1]);
      console.log('hmmm yha');
      calculateAndDisplayRoute(directionsService, directionsDisplay, self.path[0], self.path[1]);

    }*/
  },

  watch: {
    Address: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    }
  },

};
</script>

<style scoped>
</style>