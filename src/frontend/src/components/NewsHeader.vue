<template>
    <nav>
        <v-toolbar app-bar app color="#1A2634">
            <v-app-bar-nav-icon light class="white--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="white--text">
                <img src="../assets/harden-logo.svg" alt="">
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon flat color="#FFCC00">
                <v-icon>mdi-account-circle</v-icon>
            </v-btn>
            <v-btn icon flat color="#FFCC00">
                <v-icon>mdi-scoreboard-outline</v-icon>
            </v-btn>
        </v-toolbar>
        
        <v-navigation-drawer color="#234A75" v-model="drawer" app bottom temporary>
        <v-list nav dense>
            <v-list-item v-for="link in links" :key="link.text" router :to="link.route" active-class="blue--text text--darken-3">
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
export default {
    name: 'NewsHeader',
    data() {
        return {
            drawer: false,
            links: [
                { icon: 'mdi-basketball-hoop-outline', text: 'NBA', route: '/articles/sports/1'},
                { icon: 'mdi-football', text: 'NFL', route: '/articles//sports/2'},
                { icon: 'mdi-baseball-bat', text: 'MLB', route: '/articles//sports/3'},
                { icon: 'mdi-football-helmet', text: 'NCAAF', route: '/articles//sports/4'},
                { icon: 'mdi-soccer', text: 'Soccer', route: '/articles//sports/5'},
                { icon: 'mdi-mixed-martial-arts', text: 'MMA', route: '/articles/sports/6'},
                { icon: 'mdi-tennis', text: 'Tennis', route: '/articles/ sports/7'}
            ]
        }
    },
    methods: {
        onProfileClick(){
            
        },
        onScoreClick(){

        }
    }
}

</script>

<style scoped>
    .dark-blue-base {
        background-color: #1A2634;
    }
</style>