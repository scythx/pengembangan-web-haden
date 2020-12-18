import http from '@/http'

const module = {
  namespaced: true,
  state: () => ({
    identity: undefined,
    authenticating: false
  }),
  mutations: {
    SET_IDENTITY (state, identity) {
      state.identity = identity
    },
    SET_AUTHENTICATING (state, status) {
      state.authenticating = status
    }
  },
  actions: {
    login ({commit}, {email, password}) {
      commit('SET_AUTHENTICATING', true)

      http
        .post('/sessions', {"email": email, "password": password})
        .then((response) => {
          if (response.status === 200) {
            commit('SET_IDENTITY', response.data)
          }
          commit('SET_AUTHENTICATING', false)
        })
        .catch((error) => {
          commit('SET_AUTHENTICATING', false)
        })
    },
    logout ({commit}) {
      http.delete('/sessions')

      commit('SET_IDENTITY', undefined)
    }
  }
}

export default module
