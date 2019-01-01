
<template>
  <div>
    <app-googlemap/>
  </div>
</template>

<script>
import Vue from 'vue'
// import store from '../../store'
import googlemap from './components/googlemap'
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
        console.log(message)
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
  name: 'Gps',
  components: {
    'app-googlemap': googlemap
  },
  data () {
    return {
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null
    }
  }
}
</script>
