<template>
  <div id="container">
    <div
        v-for="(item, index) in mapped.slice(0,3)"
        :key="index"
    >
        <div id="title" class="display-2 font-weight-light">{{getLeagueName(item.id_league)}}</div>
        <v-list 
            dense
            three-line
            class="container"
        >
        <v-list-item
            v-for="(article, id) in item.articles.slice(0,2)"
            :key="id"
            ripple
            @click="() => {}"
            class="tile mb-3"
            dense
        >
           <v-img
                :src="images[id].url"
                class="mr-4 ml-5"
                max-width="384"
                min-width="384"
            >
            </v-img>
            <v-list-item-content>
                <h1
                v-text="article.title"
                class="h4 font-weight-light white--text"></h1>
            </v-list-item-content>
            
        </v-list-item>
        <v-btn
            block
            dense
            elevation="2"
            rounded
            color="#FFCC00"
            dark
            @click="() => {}"
        >
        <span id="lihatsemua" class="font-weight-light">Lihat Semua</span>
        </v-btn>
        <hr>
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
#title{
  margin-left: 200px;
}
.tile:hover {
  background: #203E5F;
}

h1, .display-2{
  color: #FFFFFF;
}

hr { 
  display: block;
  margin-top: 1em;
  border-style: inset;
  border-width: 1px;
}

#lihatsemua{
    color: black;
}
</style>