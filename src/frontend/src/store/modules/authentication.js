import http from '@/http'

const module = {
  namespaced: true,
  state: () => ({
    identity: undefined,
    isAuthenticating: true
  }),
  mutations: {
    SET_IDENTITY (state, identity) {
      state.identity = identity
    },

    SET_ISAUTHENTICATING (state, status) {
      state.isAuthenticating = status
    }
  },
  actions: {
    initialize ({commit}) {
      commit('SET_ISAUTHENTICATING', true)

      const instance = new Promise ((resolve, reject) => {
        // Post without credentials to get identity from existing sessions if
        // there is any.
        http
          .post('/sessions')
          .then((response) => {
            if (response.status === 200)
              commit('SET_IDENTITY', response.data)

            resolve(response)
          })
          .catch ((error) => {
            // ignore error.
          })
          .finally(() => {
            commit('SET_ISAUTHENTICATING', false)
          })
      })

      return instance
    },

    login ({commit}, {email, password}) {
      const instance = new Promise((resolve, reject) => {
        commit('SET_ISAUTHENTICATING', true)

        http
          .post('/sessions', {"email": email, "password": password})
          .then((response) => {
            if (response.status === 200)
              commit('SET_IDENTITY', response.data)

            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => {
            commit('SET_ISAUTHENTICATING', false)
          })
      })

      return instance
    },

    logout ({commit}) {
      http.delete('/sessions')

      commit('SET_IDENTITY', undefined)
    }
  }
}

export default module
