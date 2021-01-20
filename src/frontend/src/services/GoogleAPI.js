import http from '../http.js'

class GoogleAPI {
    getAccessToken(){
        return http.get('/accessGoogleTokens');
    }
}

export default new GoogleAPI();