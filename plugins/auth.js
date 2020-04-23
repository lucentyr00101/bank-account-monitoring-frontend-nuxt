import Vue from 'vue'

const obj = {
  setToken (token, expiration) {
    localStorage.setItem('token', token)
    localStorage.setItem('expiration', expiration)
  },
  getToken () {
    const token = localStorage.getItem('token')
    const expiration = localStorage.getItem('expiration')
    if (!token || !expiration) {
      return null
    }
    if (Date.now() > parseInt(expiration)) {
      this.destroyToken()
      return null
    } else {
      return token
    }
  },
  destroyToken () {
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
  },
  isAuthenticated () {
    if (this.getToken()) {
      return true
    } else {
      return false
    }
  },
  getHeader () {
    const headers = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.getToken()}`
      }
    }
    return headers
  }
}

Vue.prototype.$auth = obj

export default ({ app }, inject) => {
  app.auth = obj
}
