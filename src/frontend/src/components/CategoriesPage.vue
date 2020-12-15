<template>
<v-app>
  <v-main>
    <div id="CategoriesPage">
        <SportTable v-if="dataSport" :theData="dataSport" :theHeader="headerSport"/>
        <LeagueTable v-if="dataLeague" :theData="dataLeague" :theHeader="headerLeague" :sports="dataSport"/>
        <TeamTable v-if="dataTeam" :theData="dataTeam" :theHeader="headerTeam" :sports="dataSport"/>
    </div>
  </v-main>
</v-app>
</template>

<script>
import SportTable from './SportTable'
import LeagueTable from './LeagueTable'
import TeamTable from './TeamTable'
import Header from './HeaderCMS'
import http from '@/http'

export default {

    name:'CategoriesPage',
    components: {
    SportTable, LeagueTable, TeamTable, Header
  },

  data(){
    return{
      dataSport:[],
      dataLeague:[],
      dataTeam:[],
      headerSport: [
        {
          value: 'id_sport',
          text: 'ID'
        },
        {
          value:'name',
          text:'Sport Name'
        },
        {
          value:'actions',
          text:'Actions'
        }
      ],
      headerTeam: [
        {
          value: 'id_team',
          text: 'ID'
        },
        {
          value:'name',
          text:'Team Name'
        },
        {
            value:'sport_name',
            text:'Sport Name'
        },
        {
            value:'country',
            text:'Country'
        },
        {
          value:'actions',
          text:'Actions'
        }
      ],
      headerLeague: [
        {
          value: 'id_league',
          text: 'ID'
        },
        {
          value:'name',
          text:'League Name'
        },
        {
            value:'sport_name',
            text:'Sport Name'
        },
        {
            value:'country',
            text:'Country'
        },
        
        {
          value:'actions',
          text:'Actions'
        }
      ]
    }
  },

  mounted(){
    //get sport
    http.get('/sports')
    .then((response) => {
      this.dataSport = response.data
    })

    //get Team
    http.get('/teams-sport')
    .then((response) => {
      this.dataTeam = response.data
    })

    //get League
    http.get('/leagues-sport')
    .then((response) => {
      this.dataLeague = response.data
    })

    console.log(this.dataLeague)
}
}
</script>

<style scoped>

</style>
