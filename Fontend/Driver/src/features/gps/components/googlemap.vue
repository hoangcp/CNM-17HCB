<template>
  <div class="row">
    <div class="col-xs-6 col-md-3">
      <h2>Search and add a pin</h2>
      <gmap-autocomplete @place_changed="setPlace"/>
      <button @click="addMarker">Add</button>
      <button @click="changeUser">Set user</button>
      <button @click="sendMessage">sendMessage</button>
    </div>
    <div class="col-xs-6 col-md-3">
      <gmap-map
        :center="center"
        :zoom="12"
        style="width:100%;  height: 780px;">
        <gmap-marker
          v-for="(m, index) in markers"
          :key="index"
          :position="m.position"
          :draggable= "true"
          :clickable= "true"
          @click="center=m.position"/>
      </gmap-map>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 10.730717, lng: 106.732022 },
      markers: [],
      places: [],
      currentPlace: null
    }
  },

  mounted () {
    this.geolocate()
  },
  created () {
    this.$options.sockets.hello_world = (data) => {
      console.log(data)
      this.response = data
    }
  },
  methods: {
    // receives a place object via the autocomplete component
    setPlace (place) {
      console.log(place)
      this.currentPlace = place
    },
    addMarker (location) {
      if (this.currentPlace || location) {
        var marker = location
        if (marker == null) {
          marker = {
            lat: this.currentPlace.geometry.location.lat(),
            lng: this.currentPlace.geometry.location.lng()
          }
        }
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.addMarker(this.center)
      })
    },
    sendMessage: function (val) {
      this.created()
      this.$socket.emit('new_message', { message: 'khong biet noi gi' })
    },
    changeUser: function (val) {
      this.$socket.emit('change_username', { username: 'giautq' })
    }
  }
}
</script>
