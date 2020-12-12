<template>
  <div id="container">
    <div id="title" class="display-4 font-weight-light">Top Headlines</div>
    <v-list 
      dense
      three-line
      class="container"
      color="#222831"
    >
      <v-list-item
            v-for="(item, index) in topheadline.slice(0,5)"
            :key="index"
            ripple
            @click="() => {}"
            class="tile mb-3"
        >
          <v-list-item-content>
              <h1
            v-text="item.title"
            class="h4 font-weight-light white--text"></h1>
          </v-list-item-content>
          <v-img
              :src="images[index].url"
              class="mr-4 ml-5"
              max-width="256"
              min-width="256"
          >
          </v-img>
        </v-list-item>
        <hr>
    </v-list>
  </div>
</template>

<script>
import http from "@/http"

export default {
  name: 'Topheadline',
  components: {},
  data(){
      return{
        articles: [],
        topheadline:[],
        images:[]
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
  margin-bottom: 0.5em;
  border-style: inset;
  border-width: 1px;
}
</style>