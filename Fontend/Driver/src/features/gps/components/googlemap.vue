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
import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import * as constants from '@/constants'

Vue.use(new VueSocketIO({
  debug: true,
  connection: constants.API_URL,
  vuex: {
    state: {
      connect: false,
      message: null
    },
    mutations: {
      SOCKET_CONNECT: (state, status) => {
        state.connect = true
      },
      SOCKET_USER_MESSAGE: (state, message) => {
        state.message = message
      }
    },
    actions: {
      otherAction: (context, type) => {
        return true
      },
      socket_userMessage: (context, message) => {
        context.dispatch('newMessage', message)
        context.commit('NEW_MESSAGE_RECEIVED', message)
        if (message.is_important) {
          context.dispatch('alertImportantMessage', message)
        }
      }
    }
  }
}))

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

  methods: {
    // receives a place object via the autocomplete component
    setPlace (place) {
      console.log(place)
      this.currentPlace = place
    },
    addMarker () {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
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
      })
    },
    sendMessage: function (val) {
      this.$socket.emit('new_message', { message: 'khong biet noi gi' })
    },
    changeUser: function (val) {
      this.$socket.emit('change_username', { username: 'giautq' })
    }
  }
}
</script>
