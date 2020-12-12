<template>
  <div id="container">
    <div
        v-for="(league,i) in leagues.slice(0,3)"
        :key="i"
    >
        <div id="title" class="display-4 font-weight-light" v-text="league.name"></div>
        <v-list 
            dense
            three-line
            class="container"
        >
        <v-list-item
            v-for="(item, index) in topheadline.slice(0,2)"
            :key="index"
            ripple
            @click="() => {}"
            class="tile mb-3"
            dense
        >
           <v-img
                :src="images[index].url"
                class="mr-4 ml-5"
                max-width="384"
                min-width="384"
            >
            </v-img>
            <v-list-item-content>
                <h1
                v-text="item.title"
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
        topheadline:[],
        images:[],
        leagues:[]
      }
  },
  methods:{
  },
  mounted(){
    http.get('/articles')
      .then((response) => {
        this.articles = response['data']
        var i = 0
        while(i < this.articles.length){
          if(this.articles[i].is_headline){
            this.topheadline.push(this.articles[i])
          }
          i++;
        }
    })

    http.get('/images')
      .then((response) => {
        this.images = response['data']
    })

    http.get('/leagues')
      .then((response) => {
        this.leagues = response['data']
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

h1, .display-4{
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