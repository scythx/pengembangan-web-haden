<template>
    <div id="CategoriesPage">
        <SportTable v-if="dataSport" :theData="dataSport" :theHeader="headerSport"/>
        <LeagueTable v-if="dataLeague" :theData="dataLeague" :theHeader="headerLeague"/>
        <TeamTable v-if="dataTeam" :theData="dataTeam" :theHeader="headerTeam"/>
    </div>
</template>

<script>
import SportTable from './SportTable'
import LeagueTable from './LeagueTable'
import TeamTable from './TeamTable'
import http from '@/http'

export default {

    name:'CategoriesPage',
    components: {
    SportTable, LeagueTable, TeamTable
  },

  data(){
    return{
      dataSport:[],
      dataLeague:[],
      dataTeam:[],
      headerSport: [
        {
          key: 'id_sport',
          title: 'ID'
        },
        {
          key:'name',
          title:'Sport Name'
        }
      ],
      headerTeam: [
        {
          key: 'id_team',
          title: 'ID'
        },
        {
          key:'name',
          title:'Team Name'
        },
        {
            key:'sport_name',
            title:'Sport Name'
        },
        {
            key:'country',
            title:'Country'
        }
      ],
      headerLeague: [
        {
          key: 'id_league',
          title: 'ID'
        },
        {
          key:'name',
          title:'League Name'
        },
        {
            key:'sport_name',
            title:'Sport Name'
        },
        {
            key:'country',
            title:'Country'
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

    //get Team
    http.get('/leagues-sport')
    .then((response) => {
      this.dataLeague = response.data
    })
}
}
</script>

<style scoped>

</style>