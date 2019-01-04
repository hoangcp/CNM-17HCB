
<template>
  <div>
    <app-googlemap/>
  </div>
</template>

<script>
// import store from '../../store'
import googlemap from './components/googlemap'
import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import * as constants from '@/constants'
export const bus = new Vue()

Vue.use(new VueSocketIO({
  debug: true,
  connection: constants.API_URL,
  vuex: {
    state: {
      connect: false,
      message: null
    },
    mutations: {
      SOCKET_CONNECT (state) {
        state.connected = true
      },
      SOCKET_DISCONNECT (state) {
        state.connected = false
      },
      SOCKET_MESSAGE (state, message) {
        console.log(message)
        state.message = message
      },
      SOCKET_HELLO_WORLD (state, message) {
        state.message = message
      },
      SOCKET_ERROR (state, message) {
        state.error = message.error
      }
    }
    /* ,
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
    } */
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
