import store from '@/store'
import Vue from 'vue'
import * as constants from '@/constants'
import auth from '../../auth/helpers'

const LOGIN_DRIVER = constants.API_URL + '/driver/'
export default class Service {
  constructor (options) {
    this.id = store.state.auth.user.id
  }
  updatelocation (creds, callback) {
    const authinfo = store.state.auth
    console.log({
      'access-token': authinfo.accessToken,
      'Content-Type': 'application/json'
    })
    return Vue.http({
      method: 'POST',
      url: LOGIN_DRIVER + 'updatelocation',
      headers: {
        'access-token': authinfo.accessToken,
        'Content-Type': 'application/json'
      },
      data: {
        Username: authinfo.user.name,
        Latitude: creds.Latitude,
        Longitude: creds.Longitude
      }
    })
      .then((response) => {
        return response
      })
      .catch((error) => {
        if (error.response.status === 403) {
          auth.logout()
        }
        let errorMessage = null
        if (error.response) errorMessage = error.response.status
        else if (error.request) errorMessage = 'no response from server'
        else errorMessage = error.message

        return errorMessage
      })
  }

  updatesocket (creds, callback) {
    const authinfo = store.state.auth
    console.log({
      'access-token': authinfo.accessToken,
      'Content-Type': 'application/json'
    })
    return Vue.http({
      method: 'POST',
      url: LOGIN_DRIVER + 'updatesocket',
      headers: {
        'access-token': authinfo.accessToken,
        'Content-Type': 'application/json'
      },
      data: {
        Username: authinfo.user.name,
        SocketID: authinfo.user.socketid
      }
    })
      .then((response) => {
        return response
      })
      .catch((error) => {
        if (error.response.status === 403) {
          auth.logout()
        }
        let errorMessage = null
        if (error.response) errorMessage = error.response.status
        else if (error.request) errorMessage = 'no response from server'
        else errorMessage = error.message

        return errorMessage
      })
  }

  updateisonline (creds, callback) {
    const authinfo = store.state.auth
    console.log({
      'access-token': authinfo.accessToken,
      'Content-Type': 'application/json'
    })
    return Vue.http({
      method: 'POST',
      url: LOGIN_DRIVER + 'updateisonline',
      headers: {
        'access-token': authinfo.accessToken,
        'Content-Type': 'application/json'
      },
      data: {
        Username: authinfo.user.name,
        isOnline: creds.isOnline
      }
    })
      .then((response) => {
        return response
      })
      .catch((error) => {
        if (error.response.status === 403) {
          auth.logout()
        }
        let errorMessage = null
        if (error.response) errorMessage = error.response.status
        else if (error.request) errorMessage = 'no response from server'
        else errorMessage = error.message

        return errorMessage
      })
  }
}
