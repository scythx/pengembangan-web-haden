<template>
    <v-container>
        <v-row>
            <!-- Card jumlah artikel -->
            <v-col cols="12" sm="6">
                <v-card tile color="#58ACFA" min-height="175">
                    <v-list-item>
                        <v-list-item-content class="white--text">
                            <div class="text-h4 mb-4">
                                {{ jumlahArtikel }}
                            </div>
                            <div class="text-h5">
                                Jumlah Artikel
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
                            <div class="text-h4 mb-4">
                                {{ jumlahPembaca }}
                            </div>
                            <div class="text-h5">
                                Jumlah Artikel
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
                            <div class="text-h4 mb-4">
                                {{ jumlahSubs }}
                            </div>
                            <div class="text-h5">
                                Jumlah Artikel
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
                            <div class="text-h4 mb-4">
                                {{ jumlahShare }}
                            </div>
                            <div class="text-h5">
                                Jumlah Artikel
                            </div>
                        </v-list-item-content>
                        <v-icon color="#D07000" size="100">mdi-share-variant</v-icon>
                    </v-list-item>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
          <v-btn block
             @click="broadcastNewsletter">
              Broadcast Newsletter
          </v-btn>
        </v-row>
    </v-container>
</template>

<script>
import http from "@/http"

export default {
    name : 'Dashboard',
    components : {},
    data(){
        return{
            jumlahArtikel : 0,
            jumlahPembaca : 0,
            jumlahSubs : 0,
            jumlahShare : 0
        }
    },
    methods: {
        broadcastNewsletter () {
          this.$http.post('/actions/broadcast')
        }
    },
    mounted(){
        http.get('/articles')
            .then(response => {
                this.jumlahArtikel = response['data'].length
            })
    }
}
</script>

