<template lang="pug">
  v-container(fluid fill-height style="padding: 0;")
    v-layout.my-account(column)
      v-container(
        fluid
        fill-height
        v-bind:grid-list-sm="$vuetify.breakpoint.smAndDown"
        v-bind:grid-list-lg="$vuetify.breakpoint.mdAndUp"
        style="position: relative;"
      )
        v-layout(v-show="showPage" row wrap)
          v-flex(d-flex xs12)
            v-layout(column)
              v-flex(d-flex)
                v-card(flat)
                  v-card-title
                    v-btn(flat @click.native="addMarker()") Xác định vị trí
                    v-btn(flat @click.native="online()" v-show="isOnline") Online
                    v-btn(flat @click.native="online()" v-show="!isOnline") Offline
                    v-btn(flat @click.native="updatestatus(2)" v-show="isStart") {{driverName}}
              v-flex(d-flex)
                v-card
                  v-card-text
                    v-layout
                      v-flex
                        gmap-map(
                          :center="center"
                          :zoom="17"
                          style="width:100%;  height: 780px;"
                        )
                          gmap-marker(
                            v-for="(m, index) in markers"
                            :key="index"
                            :position="m.position"
                            :draggable= "true"
                            :clickable= "true"
                            @click="openDialogFull()"
                          )

        v-dialog(
          v-model="dialogFullActive"
          fullscreen
          transition="dialog-bottom-transition"
          :overlay=false
          scrollable
        )
          component(:is="dialogFullComp" :active.sync="dialogFullActive")
</template>

<script>
import ViewInfo from './viewinfo'
import * as constants from '@/constants'
import Service from '../service'
import store from '@/store'

const io = require('socket.io-client')
const ioClient = io.connect(constants.API_URL)

export default {
  service: new Service(),
  data () {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 10.730717, lng: 106.732022 },
      markers: [],
      places: [],
      currentPlace: null,
      dialogFullActive: false,
      dialogFullComp: null,
      showPage: false,
      isOnline: false,
      isStart: store.state.auth.requestInfo.isStart,
      driverName: store.state.auth.requestInfo.driverName
    }
  },

  mounted () {
    this.geolocate()
    this.showPage = true
  },
  created () {
    this.$socket.emit('change_username', { username: store.state.auth.user.name })
    // console.log(this.$socket)
    ioClient.on('TT_Khach_Hang', (reqInfo) => {
      if (reqInfo.Assign === store.state.auth.user.name) {
        store.state.auth.requestInfo = reqInfo
        this.openDialogFull()
      }
      // console.info(this.requestInfo)
    })
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
        this.$options.service.updatelocation({Latitude: this.center.lat, Longitude: this.center.lng})
          .then((data) => {
            console.log(data)
          })
      })
    },
    sendMessage: function (message) {
      this.$socket.emit('new_message', { message: 'khong biet noi gi' })
    },
    changeUser: function (val) {
      this.$socket.emit('change_username', { username: store.state.auth.user.name })
      console.log(this.$socket)
    },
    openDialogFull () {
      this.dialogFullComp = ViewInfo
      this.dialogFullActive = true
    },
    online: function () {
      console.log(store.state.auth.requestInfo)
      var value = 0
      if (this.isOnline) {
        value = 1
      }
      this.$options.service.updateisonline({isOnline: value})
        .then((data) => {
          if (data.status === 200) {
            if (data.data.error === 0) {
              this.isOnline = !this.isOnline
            } else {
              alert(data.data.message)
            }
          }
        })
    }
  }
}
</script>
