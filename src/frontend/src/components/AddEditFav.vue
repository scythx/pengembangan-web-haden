<template>
    <div id="container">
        <v-container
        class="p-3">
            <v-text-field
                dark
                outlined
                label="Search"
                prepend-inner-icon="mdi-magnify"
                color="#FFCC00"
            ></v-text-field>
            
            <v-card
            class="mx-auto mt-2"
            color="#1C3856"
            :style="$vuetify.breakpoint.lg ? 'min-height:20vw' : 'min-height:70vw'"
            elevation="24">
                <v-card
                class="font-weight-light white--text p-4"
                flat
                color="#1C3856"
                :style="$vuetify.breakpoint.lg ? 'font-size:1.5vw;' : 'font-size:5vw'"
                v-if="sports.length > 0">
                    Sports
                    <div
                    class="d-flex justify-space-between align-center"
                    :style="$vuetify.breakpoint.lg ? 'margin-top:2%' : 'margin-top:5%'"
                    v-for="item in sports"
                    :key="item.id_sport">
                        <h1
                        class="font-weight-light white--text"
                        :style="$vuetify.breakpoint.lg ? 'font-size:1.2vw; margin-left:2%' : 'font-size:5vw; margin-left:5%; margin-right:4%'">
                            {{getSportName(item.id_sport)}}
                        </h1>

                        <v-btn
                        rounded
                        color="primary"
                        class="font-weight-light white--text"
                        :style="$vuetify.breakpoint.lg ? 'font-size:0.8vw' : 'font-size:3vw'"
                        @click="onFollowSportClick(item.id_sport)">
                            <v-icon left>
                                mdi-plus
                            </v-icon>
                            Follow
                        </v-btn>
                    </div>
                </v-card>
                <v-card
                class="font-weight-light white--text p-4"
                flat
                color="#1C3856"
                :style="$vuetify.breakpoint.lg ? 'font-size:1.5vw;' : 'font-size:5vw'"
                v-if="leagues.length > 0">
                    Leagues
                    <div
                    class="d-flex justify-space-between align-center"
                    :style="$vuetify.breakpoint.lg ? 'margin-top:2%' : 'margin-top:5%'"
                    v-for="item in leagues"
                    :key="item.id_league">
                        <h1
                        class="font-weight-light white--text"
                        :style="$vuetify.breakpoint.lg ? 'font-size:1.2vw; margin-left:2%' : 'font-size:5vw; margin-left:5%; margin-right:4%'">
                            {{getLeagueName(item.id_league)}}
                        </h1>

                        <v-btn
                        rounded
                        color="primary"
                        class="font-weight-light white--text"
                        :style="$vuetify.breakpoint.lg ? 'font-size:0.8vw' : 'font-size:3vw'"
                        @click="onFollowLeagueClick(item.id_league)">
                            <v-icon left>
                                mdi-plus
                            </v-icon>
                            Follow
                        </v-btn>
                    </div>
                </v-card>
                <v-card
                class="font-weight-light white--text p-4"
                flat
                color="#1C3856"
                :style="$vuetify.breakpoint.lg ? 'font-size:1.5vw;' : 'font-size:5vw'"
                v-if="teams.length > 0">
                    Teams
                    <div
                    class="d-flex justify-space-between align-center"
                    :style="$vuetify.breakpoint.lg ? 'margin-top:2%' : 'margin-top:5%'"
                    v-for="item in teams"
                    :key="item.id_team">
                        <h1
                        class="font-weight-light white--text"
                        :style="$vuetify.breakpoint.lg ? 'font-size:1.2vw; margin-left:2%' : 'font-size:5vw; margin-left:5%; margin-right:4%'">
                            {{getTeamName(item.id_team)}}
                        </h1>

                        <v-btn
                        rounded
                        color="primary"
                        class="font-weight-light white--text"
                        :style="$vuetify.breakpoint.lg ? 'font-size:0.8vw' : 'font-size:3vw'"
                        @click="onFollowTeamClick(item.id_team)">
                            <v-icon left>
                                mdi-plus
                            </v-icon>
                            Follow
                        </v-btn>
                    </div>
                </v-card>
                <v-card
                class="font-weight-light white--text p-4"
                flat
                color="#1C3856"
                :style="$vuetify.breakpoint.lg ? 'font-size:1.5vw;' : 'font-size:5vw'">
                    My Sports
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
                    <div
                    v-if="favSports.length == 0"
                    :style="$vuetify.breakpoint.lg ? 'margin-top:2%' : 'margin-top:5%'">
                        <h1
                        class="font-weight-light white--text"
                        :style="$vuetify.breakpoint.lg ? 'font-size:1.2vw; margin-left:2%' : 'font-size:5vw; margin-left:5%; margin-right:4%'">
                            You have not added any favorites to my sports
                        </h1>
                    </div>
                </v-card>
                <v-card
                class="font-weight-light white--text p-4"
                flat
                color="#1C3856"
                :style="$vuetify.breakpoint.lg ? 'font-size:1.5vw;' : 'font-size:5vw'">
                    My Leagues
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
                    <div
                    v-if="favLeagues.length == 0"
                    :style="$vuetify.breakpoint.lg ? 'margin-top:2%' : 'margin-top:5%'">
                        <h1
                        class="font-weight-light white--text"
                        :style="$vuetify.breakpoint.lg ? 'font-size:1.2vw; margin-left:2%' : 'font-size:5vw; margin-left:5%; margin-right:4%'">
                            You have not added any favorites to my leagues
                        </h1>
                    </div>
                </v-card>
                <v-card
                class="font-weight-light white--text p-4"
                flat
                color="#1C3856"
                :style="$vuetify.breakpoint.lg ? 'font-size:1.5vw;' : 'font-size:5vw'">
                    My Teams
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
                    <div
                    v-if="favTeams.length == 0"
                    :style="$vuetify.breakpoint.lg ? 'margin-top:2%' : 'margin-top:5%'">
                        <h1
                        class="font-weight-light white--text"
                        :style="$vuetify.breakpoint.lg ? 'font-size:1.2vw; margin-left:2%' : 'font-size:5vw; margin-left:5%; margin-right:4%'">
                            You have not added any favorites to my teams
                        </h1>
                    </div>
                </v-card>
                
            </v-card>
        </v-container>
    </div>
</template>

<script>
import http from "@/http"

export default {
    name: "AddEditFav",
    props: ['id_user'],
    data() {
        return{
            user:1,
            favSports:[],
            favLeagues:[],
            favTeams:[],
            sports:[],
            leagues:[],
            teams:[],
            sportsList:[],
            leaguesList:[],
            teamsList:[]
        }
    },
    methods: {
        onUnfollowSportClick(id){
            http.delete('/fav-sports/'+id)
            window.location.reload()
        },
        onUnfollowLeagueClick(id){
            http.delete('/fav-leagues/'+id)
            window.location.reload()
        },
        onUnfollowTeamClick(id){
            http.delete('/fav-teams/'+id)
            window.location.reload()
        },
        onFollowSportClick(id){
            http.post('/fav-sports/',{
                'id_user':this.user,
                'id_sport':id
            })
            window.location.reload()
        },
        onFollowLeagueClick(id){
            http.post('/fav-leagues/',{
                'id_user':this.user,
                'id_league':id
            })
            window.location.reload()
        },
        onFollowTeamClick(id){
            http.post('/fav-teams/',{
                'id_user':this.user,
                'id_team':id
            })
            window.location.reload()
        },
        getSportName(id){
            var i = 0
            while(i < this.sportsList.length){
                if(this.sportsList[i].id_sport == id){
                return this.sportsList[i].name
                }
                i++
            }
        },
        getLeagueName(id) {
            var i = 0
            while(i < this.leaguesList.length){
                if(this.leaguesList[i].id_league == id){
                return this.leaguesList[i].name
                }
                i++
            }
        },
        getTeamName(id) {
            var i = 0
            while(i < this.teamsList.length){
                if(this.teamsList[i].id_team == id){
                return this.teamsList[i].name
                }
                i++
            }
        }
    },
    mounted() {
        http.get('/fav-sports/'+this.user)
        .then((response) => {
            this.favSports = response['data']
        })

        http.get('/fav-leagues/'+this.user)
        .then((response) => {
            this.favLeagues = response['data']
        })

        http.get('/fav-teams/'+this.user)
        .then((response) => {
            this.favTeams = response['data']
        })

        http.get('/sports')
        .then((response) => {
            this.sportsList = response['data']
            
            var i = 0
            var j = 0
            var exist = false
            while(i < this.sportsList.length){
                j = 0
                while(j < this.favSports.length && !exist){
                    if(this.sportsList[i].id_sport == this.favSports[j].sport_id){
                        exist = true
                    }

                    j++
                }
                if(!exist){
                    this.sports.push(this.sportsList[i])
                }

                i++
                exist = false
            }
        })

        http.get('/leagues')
        .then((response) => {
            this.leaguesList = response['data']

            var i = 0
            var j = 0
            var exist = false
            while(i < this.leaguesList.length){
                j = 0
                while(j < this.favLeagues.length && !exist){
                    if(this.leaguesList[i].id_league == this.favLeagues[j].league_id){
                        exist = true
                    }

                    j++
                }
                if(!exist){
                    this.leagues.push(this.leaguesList[i])
                }

                i++
                exist = false
            }
        })

        http.get('/teams')
        .then((response) => {
            this.teamsList = response['data']

            var i = 0
            var j = 0
            var exist = false
            while(i < this.teamsList.length){
                j = 0
                while(j < this.favTeams.length && !exist){
                    if(this.teamsList[i].id_team == this.favTeams[j].team_id){
                        exist = true
                    }

                    j++
                }
                if(!exist){
                    this.teams.push(this.teamsList[i])
                }

                i++
                exist = false
            }
        })
    },
}
</script>

<style scoped>
#container{
    background: #222831;
}
</style>