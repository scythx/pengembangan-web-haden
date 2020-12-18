<template>
  <div id="container">
    <div
        v-for="(item, index) in mapped.slice(0,3)"
        :key="index"
    >
        <v-list 
            dense
            class="container"
            width="auto"
        >
        <h1 id="title" class="h1 font-weight-light"
          :style="$vuetify.breakpoint.lg ? 'font-size:3vw' : 'font-size:5vw'">{{getLeagueName(item.id_league)}}</h1>
        <v-list-item
            v-for="(article, id) in item.articles.slice(0,2)"
            :key="id"
            ripple
            @click="onArticleClick(article.id_article)"
            class="tile"
            dense
            style="margin-bottom:1%"
        >
           <v-img
              :src="images[id].url"
                style="margin-right:1%"
              :max-width="$vuetify.breakpoint.lg ? '30%' : '40%'"
            >
            </v-img>
            <v-list-item-content>
                <h1
                v-text="article.title"
                class="h4 font-weight-light"
                :style="$vuetify.breakpoint.lg ? 'font-size:1.5vw' : 'font-size:2.5vw'"></h1>
            </v-list-item-content>
            
        </v-list-item>
        <v-btn
            block
            dense
            rounded
            color="#FFCC00"
            dark
            @click="onLihatSemuaClick(item.id_league)"
            :height="$vuetify.breakpoint.lg ? '2vw' : '4vw'"
        >
        <span id="lihatsemua" class="font-weight-light"
        :style="$vuetify.breakpoint.lg ? 'font-size:1vw' : 'font-size:2vw'">Lihat Semua</span>
        </v-btn>
        <hr v-if="index < 2">
        </v-list>
    </div>
  </div>
</template>

<script>
import http from "@/http"

export default {
  name: 'Thumbnail',
  components: {},
  data(){
      return{
        articles: [],
        leagues: [],
        mapped:[],
        images:[]
      }
  },
  methods:{
    getLeagueName(id) {
      var i = 0
      while(i < this.leagues.length){
        if(this.leagues[i].id_league == id){
          return this.leagues[i].name
        }
        i++
      }
    },
    onArticleClick(id){
      if (this.$route.path !== '/article/'+id){
        this.$router.push('/article/'+id)
        this.$router.go()
      }
    },
    onLihatSemuaClick(id){
      if (this.$route.path !== '/articles/league/'+id){
        this.$router.push('/articles/league/'+id)
        this.$router.go()
      }
        
    }
  },
  mounted(){
    http.get('/articles')
      .then((response) => {
        this.articles = response['data']
        
        http.get('/leagues')
          .then((res) => {
            this.leagues = res['data']
            
            
            let temp = new Array()
            var i = 0, j = 0

            while(i < this.leagues.length){
              while(j < this.articles.length){
                if(this.leagues[i].id_league == this.articles[j].id_league){
                    temp.push(this.articles[j])
                }
                j++
              }

              if(temp.length > 0){
                var obj = new Object()
                obj.id_league = this.leagues[i].id_league
                obj.articles = temp
                this.mapped.push(obj)
                temp = new Array()
              }

              i++
              j = 0
            }
          })
    })

    http.get('/images')
      .then((response) => {
        this.images = response['data']
    })
  }
}
</script>

<style scoped>
#container, .container, .tile{
  background: #222831;
}
.tile:hover {
  background: #203E5F;
}

h1, .display-2{
  color: #FFFFFF;
}

hr { 
  display: block;
  margin-top: 1%;
  margin-bottom: 0.1%;
  border-style: inset;
  border-width: 1px;
}

#lihatsemua{
    color: black;
}
</style>