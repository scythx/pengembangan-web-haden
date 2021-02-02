<template>
    <v-container>
        <v-row>
            <!-- Card jumlah artikel -->
            <v-col cols="12" sm="6">
                <v-card tile color="#58ACFA" min-height="175">
                    <v-list-item>
                        <v-list-item-content class="white--text">
                            <div class="text-h4 mb-4 font-weight-light">
                                {{ jumlahArtikel }}
                            </div>
                            <div class="text-h5 font-weight-light">
                                Articles
                            </div>
                        </v-list-item-content>
                        <v-icon color="#2493F9" size="100">mdi-chart-bar</v-icon>
                    </v-list-item>
                </v-card>
            </v-col>

            <!-- Card jumlah pembaca -->
            <v-col cols="12" sm="6">
                <v-card tile color="#0A8945" min-height="175">
                    <v-list-item>
                        <v-list-item-content class="white--text">
                            <div class="text-h4 mb-4 font-weight-light">
                                {{ jumlahPengguna }}
                            </div>
                            <div class="text-h5 font-weight-light">
                                Users
                            </div>
                        </v-list-item-content>
                        <v-icon color="#05612F" size="100">mdi-account</v-icon>
                    </v-list-item>
                </v-card>
            </v-col>

            <!-- Card email subscriber -->
            <v-col cols="12" sm="6">
                <v-card tile color="#CC2015" min-height="175">
                    <v-list-item>
                        <v-list-item-content class="white--text">
                            <div class="text-h4 mb-4 font-weight-light">
                                {{ jumlahSubs }}
                            </div>
                            <div class="text-h5 font-weight-light">
                                Subscribed
                            </div>
                        </v-list-item-content>
                        <v-icon color="#B41313" size="100">mdi-email</v-icon>
                    </v-list-item>
                </v-card>
            </v-col>

            <!-- Card Share -->
            <v-col cols="12" sm="6">
                <v-card tile color="#FF8A00" min-height="175">
                    <v-list-item>
                        <v-list-item-content class="white--text">
                            <div class="text-h4 mb-4 font-weight-light">
                                {{ jumlahShare }}
                            </div> 
                            <div class="text-h5 font-weight-light">
                                Share
                            </div>
                        </v-list-item-content>
                        <v-icon color="#D07000" size="100">mdi-share-variant</v-icon>
                    </v-list-item>
                </v-card>
            </v-col>
        </v-row>
        
        <v-row>
            <!-- Card Users per Day-->
            <v-col>
                <v-card class="pa-5">
                    <h3 class="font-weight-light">Users per Day</h3>
                    <div id="chart-users-per-day-container"></div>
                </v-card>
            </v-col>
            <!-- Card Average Session Duration-->
            <v-col>
                <v-card class="pa-5">
                    <h3 class="font-weight-light">Average Session Duration</h3>
                    <div id="chart-average-session"></div>
                </v-card>
            </v-col>
        </v-row>
        <v-row> 
            <!--Card Session-Region-->
            <v-col>
                <v-card class="pa-5">
                    <h3 class="font-weight-light">Session per Region</h3>
                    <div id="chart-session-region-container"></div>
                </v-card>
            </v-col>
            <!-- Card Device-->
            <!-- <v-col>
                <v-card class="pa-5">
                    <h3>Device</h3>
                    <div id="chart-device"></div>
                </v-card>
            </v-col> -->
        </v-row>
        
        <v-row>
        <v-btn block
             @click="broadcastNewsletter"
             class="font-weight-light">
              Broadcast Newsletter
        </v-btn>
        </v-row>
    </v-container>
</template>

<script>
import http from "@/http"
import GoogleAPI from '../services/GoogleAPI.js'

export default {
    name : 'Dashboard',
    components : {},
    data(){
        return{
            jumlahArtikel : 0,
            jumlahPengguna : 0,
            jumlahSubs : 0,
            jumlahShare : 0
        }
    },
    methods: {
        broadcastNewsletter () {
          this.$http.post('/actions/broadcast')
        },

        async createChartFromGoogle(){
            const gapi = window.gapi;

            const gtoken = await GoogleAPI.getAccessToken();
            await gapi.analytics.ready( function(){
                gapi.analytics.auth.authorize({
                    'serverAuth' : {
                        'access_token' : gtoken.data
                    }
                });

                var sessionCountry = new gapi.analytics.googleCharts.DataChart({
                    query : {
                        'ids': 'ga:235883167',
                        'start-date' : '28daysAgo',
                        'end-date' : 'today',
                        'metrics': 'ga:sessions',
                        'dimensions': 'ga:country'
                    },
                    chart : {
                        'container': 'chart-session-region-container',
                        'type': 'GEO',
                        'options': {
                            'width': '100%'
                        }
                    }
                })

                var usersPerDay = new gapi.analytics.googleCharts.DataChart({
                    query: {
                        'ids': 'ga:235883167',
                        'start-date': '7daysAgo',
                        'end-date': 'today',
                        'metrics': 'ga:users',
                        'dimensions': 'ga:date'
                    },
                    chart: {
                        'container': 'chart-users-per-day-container',
                        'type': 'LINE',
                        'options': {
                            'width': '100%'
                        }
                    }
                });

                var averageSession = new gapi.analytics.googleCharts.DataChart({
                    query: {
                        'ids': 'ga:235883167', 
                        'start-date': '7daysAgo',
                        'end-date': 'today',
                        'metrics': 'ga:avgSessionDuration',
                        'dimensions': 'ga:date'
                    },
                    chart: {
                        'container': 'chart-average-session',
                        'type': 'LINE',
                        'options': {
                            'width': '100%'
                        }
                    }
                });

                // var deviceUsed = new gapi.analytics.googleCharts.DataChart({
                //     query: {
                //         'ids': 'ga:235883167', 
                //         'start-date': '90daysAgo',
                //         'end-date': 'today',
                //         'metrics': 'ga:deviceCategory'
                //     },
                //     chart: {
                //         'container': 'chart-device',
                //         'type': 'PIE',
                //         'options': {
                //             'width': '100%'
                //         }
                //     }
                // });

                sessionCountry.execute()
                usersPerDay.execute()
                averageSession.execute()
                //deviceUsed.execute()
            })
        }
    },

    mounted(){
        http.get('/articles')
            .then(response => {
                this.jumlahArtikel = response['data'].length
        })

        http.get('/users')
            .then(response => {
                this.jumlahPengguna = response['data'].length
        })

        http.get('/subscribers')
            .then(response => {
                this.jumlahSubs = response['data'].length
        })

        this.createChartFromGoogle()
    }
}
</script>