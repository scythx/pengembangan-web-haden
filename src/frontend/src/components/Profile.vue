<template>
    <div v-if="identity" id="container">
        <v-container
        class="p-3">
            <h1 class="font-weight-light white--text"
            :style="$vuetify.breakpoint.lg ? 'font-size:3vw' : 'font-size:7vw'">Welcome, {{this.username}}</h1>

            <div
            class="d-flex justify-space-between"
            :style="$vuetify.breakpoint.lg ? 'margin-top:5%' : 'margin-top:20%'">
                <h4
                class="font-weight-light white--text"
                :style="$vuetify.breakpoint.lg ? 'font-size:1.5vw' : 'font-size:5vw'">
                    My Favorite
                </h4>

                <v-btn
                text
                color="primary"
                class="font-weight-light"
                :style="$vuetify.breakpoint.lg ? 'font-size:1.5vw' : 'font-size:5vw'"
                @click="onEditClick"
                v-if="favSports.length !== 0 || favLeagues.length !== 0 || favTeams.length !== 0">
                    Edit
                </v-btn>
            </div>
            <v-card
            class="mx-auto mt-2"
            :class="(favSports.length == 0 && favLeagues.length == 0 && favTeams.length == 0) ? 'd-flex align-center justify-center' : '' "
            color="#1C3856"
            :style="$vuetify.breakpoint.lg ? 'min-height:20vw' : 'min-height:70vw'"
            elevation="24">
                <v-btn
                    rounded
                    color="#FFCC00"
                    dark
                    class="font-weight-light white--text"
                    elevation="24"
                    :style="$vuetify.breakpoint.lg ? 'font-size:1.5vw; width:30vw; height:5vw;' : 'font-size:5vw; height:15vw'"
                    v-if="favSports.length == 0 && favLeagues.length == 0 && favTeams.length == 0"
                    @click="onAddFavoriteClick">
                        <v-icon
                            left
                            dark>
                            mdi-plus
                        </v-icon>
                        Add Favorite
                </v-btn>
                <div
                v-else>
                    <v-card
                    class="font-weight-light white--text p-4"
                    flat
                    color="#1C3856"
                    :style="$vuetify.breakpoint.lg ? 'font-size:1.5vw;' : 'font-size:5vw'"
                    v-if="favSports.length !== 0">
                        Sports
                        <div
                        class="d-flex justify-space-between align-center"
                        :style="$vuetify.breakpoint.lg ? 'margin-top:2%' : 'margin-top:5%'"
                        v-for="item in favSports"
                        :key="item.id_fav_sport">
                            <h1
                            class="font-weight-light white--text"
                            :style="$vuetify.breakpoint.lg ? 'font-size:1.2vw; margin-left:2%' : 'font-size:5vw; margin-left:5%; margin-right:4%'">
                                {{getSportName(item.sport_id)}}
                            </h1>

                            <v-btn
                            rounded
                            color="red"
                            class="font-weight-light white--text"
                            :style="$vuetify.breakpoint.lg ? 'font-size:0.8vw' : 'font-size:3vw'"
                            @click="onUnfollowSportClick(item.id_fav_sport)">
                                Unfollow
                            </v-btn>
                        </div>
                    </v-card>
                    <v-card
                    class="font-weight-light white--text p-4"
                    flat
                    color="#1C3856"
                    :style="$vuetify.breakpoint.lg ? 'font-size:1.5vw;' : 'font-size:5vw'"
                    v-if="favLeagues.length !== 0">
                        Leagues
                        <div
                        class="d-flex justify-space-between align-center"
                        :style="$vuetify.breakpoint.lg ? 'margin-top:2%' : 'margin-top:5%'"
                        v-for="item in favLeagues"
                        :key="item.id_fav_league">
                            <h1
                            class="font-weight-light white--text"
                            :style="$vuetify.breakpoint.lg ? 'font-size:1.2vw; margin-left:2%' : 'font-size:5vw; margin-left:5%; margin-right:4%'">
                                {{getLeagueName(item.league_id)}}
                            </h1>

                            <v-btn
                            rounded
                            color="red"
                            class="font-weight-light white--text"
                            :style="$vuetify.breakpoint.lg ? 'font-size:0.8vw' : 'font-size:3vw'"
                            @click="onUnfollowLeagueClick(item.id_fav_league)">
                                Unfollow
                            </v-btn>
                        </div>
                    </v-card>
                    <v-card
                    class="font-weight-light white--text p-4"
                    flat
                    color="#1C3856"
                    :style="$vuetify.breakpoint.lg ? 'font-size:1.5vw;' : 'font-size:5vw'"
                    v-if="favTeams.length !== 0">
                        Teams
                        <div
                        class="d-flex justify-space-between align-center"
                        :style="$vuetify.breakpoint.lg ? 'margin-top:2%' : 'margin-top:5%'"
                        v-for="item in favTeams"
                        :key="item.id_fav_team">
                            <h1
                            class="font-weight-light white--text"
                            :style="$vuetify.breakpoint.lg ? 'font-size:1.2vw; margin-left:2%' : 'font-size:5vw; margin-left:5%; margin-right:4%'">
                                {{getTeamName(item.team_id)}}
                            </h1>

                            <v-btn
                            rounded
                            color="red"
                            class="font-weight-light white--text"
                            :style="$vuetify.breakpoint.lg ? 'font-size:0.8vw' : 'font-size:3vw'"
                            @click="onUnfollowTeamClick(item.id_fav_team)">
                                Unfollow
                            </v-btn>
                        </div>
                    </v-card>
                </div>
                
            </v-card>

            <v-btn
            text
            color="error"
            class="font-weight-light"
            :style="$vuetify.breakpoint.lg ? 'font-size:1.5vw; margin-top:2vw' : 'font-size:5vw; margin-top:10%'"
            dense
            @click="onSignoutClick">
                Sign Out
            </v-btn>
        </v-container>
    </div>
</template>

<script>
import http from "@/http"

export default {
    name: "Profile",
    data() {
        return{
            id_user:null,
            username:null,
            favSports:[],
            favLeagues:[],
            favTeams:[],
            sports:[],
            leagues:[],
            teams:[]
        }
    },
   computed: {
     identity: function () {
       return this.$store.state.authentication.identity
     }
   },
    methods: {
        onAddFavoriteClick(){
            if (this.$route.path !== '/profile/add_edit_favorite'){
                this.$router.push('/profile/add_edit_favorite')
            }
        },
        onEditClick(){
            if (this.$route.path !== '/profile/add_edit_favorite'){
                this.$router.push('/profile/add_edit_favorite')
            }
        },
        onSignoutClick(){
            this
            .$store
            .dispatch('authentication/logout')
            this.$router.push('/')
            this.$router.go()
        },
        async onUnfollowSportClick(id){
            await http.delete('/fav-sports/'+id)
            http.get('/fav-sports/'+this.id_user)
            .then((response) => {
                this.favSports = response['data']
            })
        },
        async onUnfollowLeagueClick(id){
            await http.delete('/fav-leagues/'+id)
            http.get('/fav-leagues/'+this.id_user)
            .then((response) => {
                this.favLeagues = response['data']
            })
        },
        async onUnfollowTeamClick(id){
            await http.delete('/fav-teams/'+id)
            http.get('/fav-teams/'+this.id_user)
            .then((response) => {
                this.favTeams = response['data']
            })
        },
        getSportName(id){
            var i = 0
            while(i < this.sports.length){
                if(this.sports[i].id_sport == id){
                return this.sports[i].name
                }
                i++
            }
        },
        getLeagueName(id) {
            var i = 0
            while(i < this.leagues.length){
                if(this.leagues[i].id_league == id){
                return this.leagues[i].name
                }
                i++
            }
        },
        getTeamName(id) {
            var i = 0
            while(i < this.teams.length){
                if(this.teams[i].id_team == id){
                return this.teams[i].name
                }
                i++
            }
        }
    },
   created () {
     if (this.identity === undefined) {
       this.$router.replace({path: '/'})
       return
     }

     http
       .get('/users/'+this.id_user)
       .then((response) => {
         var user = response['data']
         this.username = user[0].fullname
       })

     http
       .get('/fav-sports/'+this.id_user)
       .then((response) => {
         this.favSports = response['data']
       })

     http
       .get('/fav-leagues/'+this.id_user)
       .then((response) => {
         this.favLeagues = response['data']
       })

     http
       .get('/fav-teams/'+this.id_user)
       .then((response) => {
         this.favTeams = response['data']
       })

     http
       .get('/sports')
       .then((response) => {
         this.sports = response['data']
       })

     http
       .get('/leagues')
       .then((response) => {
         this.leagues = response['data']
       })

     http
       .get('/teams')
       .then((response) => {
         this.teams = response['data']
       })
   }
 }
</script>

<style scoped>
#container{
    background: #222831;
}
</style>
