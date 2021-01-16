<template>
    <nav>
        <v-app-bar fixed app-bar app color="#1A2634">
            <v-app-bar-nav-icon light class="white--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="white--text">
                <img src="../assets/harden-logo.svg" alt="" @click="onHardenLogoClick">
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon text color="#FFCC00"
              @click="onProfileClick">
                <v-icon>mdi-account-circle</v-icon>
            </v-btn>
            <v-btn icon flat color="#FFCC00">
                <v-icon>mdi-scoreboard-outline</v-icon>
            </v-btn>
        </v-app-bar>
        
        <v-navigation-drawer color="#234A75" v-model="drawer" app left temporary>
        <v-list nav dense>
            <v-list-item v-for="(link, idx) in links" :key="link.text" @click="onSidebarItemClick(idx, link.text)" active-class="blue--text text--darken-3">
                <v-list-item-action>
                    <v-icon flat color="#FFCC00">{{ link.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-title class="amber--text text--accent-3"> {{ link.text }} </v-list-item-title>
            </v-list-item>
        </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
import http from "@/http"

export default {
    name: 'NewsHeader',
    data() {
        return {
            drawer: false,
            links: [
                { icon: 'mdi-basketball-hoop-outline', text: 'Basketball', route: '/articles/sports/1'},
                { icon: 'mdi-football', text: 'American Football', route: '/articles/sports/2'},
                { icon: 'mdi-baseball-bat', text: 'Baseball', route: '/articles/sports/3'},
                { icon: 'mdi-football-helmet', text: 'NCAAF', route: '/articles//sports/4'},
                { icon: 'mdi-soccer', text: 'Soccer', route: '/articles/sports/5'},
                { icon: 'mdi-mixed-martial-arts', text: 'MMA', route: '/articles/sports/6'},
                { icon: 'mdi-tennis', text: 'Tennis', route: '/articles/sports/7'}
            ],
            sports:[],
            leagues:[]
        }
    },
    computed: {
      identity: function() {
        return this.$store.state.authentication.identity
      }
    },
    methods: {
        onProfileClick() {
          if (this.identity === undefined) {
            this.$router.push({path: '/login', query: {redirect: this.$route.path}})

            return
          }

          this
            .$http
            .get(`/users/${this.identity['id']}/is_writer`)
            .then((res) => {
              if (res.data == true) {
                this.$router.push({path: '/dashboard'})
              }
              else {
                // TODO: route to user profile
                this.$router.push({path: '/profile'})
              }
            })
        },
        onScoreClick(){

        },
        onHardenLogoClick(){
        if (this.$route.path !== '/')
            this.$router.push('/')
            this.$router.go()
        },
        onSidebarItemClick(index, name){
            //name : league name or sport name
            //NCAAF -> leagues
            //Basketball, Baseball, American Football, soccer, MMA, tennis -> sports
            
            if(index == 3){ //karena index ke 4, 5 6 itu termasuk sport
                var i = 0;
                while(i < this.leagues.length){
                    if(name == this.leagues[i].name){
                        if (this.$route.path !== '/articles/league/'+this.leagues[i].id_league){
                            this.$router.push('/articles/league/'+this.leagues[i].id_league)
                            this.$router.go()
                        }
                    }
                    i++
                }
            }
            else{
                var i = 0;
                while(i < this.sports.length){
                    if(name == this.sports[i].name){
                        if (this.$route.path !== '/articles/sport/'+this.sports[i].id_sport){
                            this.$router.push('/articles/sport/'+this.sports[i].id_sport)
                            this.$router.go()
                        }
                    }
                    i++
                }
            }
        }
    },
    mounted() {
        http.get('/sports')
        .then((response) => {
            this.sports = response['data']
        })

        http.get('/leagues')
        .then((response) => {
            this.leagues = response['data']
        })
    }
}

</script>

<style scoped>
    .dark-blue-base {
        background-color: #1A2634;
    }
</style>
