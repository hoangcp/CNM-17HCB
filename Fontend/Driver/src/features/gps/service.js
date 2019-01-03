import store from '@/store'
import Vue from 'vue'
import * as constants from '@/constants'

const LOGIN_DRIVER = constants.API_URL + '/driver/'
export default class Service {
  constructor (options) {
    this.id = store.state.auth.user.id
  }
  updatelocation (creds, callback) {
    const auth = store.state.auth
    console.log({
      'access-token': auth.accessToken,
      'Content-Type': 'application/json'
    })
    return Vue.http({
      method: 'POST',
      url: LOGIN_DRIVER + 'updatelocation',
      headers: {
        'access-token': auth.accessToken,
        'Content-Type': 'application/json'
      },
      data: {
        Username: auth.user.name,
        Latitude: creds.Latitude,
        Longitude: creds.Longitude
      }
    })
      .then((response) => {
        return response
      })
      .catch((error) => {
        let errorMessage = null
        if (error.response) errorMessage = error.response.status
        else if (error.request) errorMessage = 'no response from server'
        else errorMessage = error.message

        return errorMessage
      })
  }
}
