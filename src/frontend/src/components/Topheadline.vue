<template>
  <div id="container">
    <v-list
      dense 
      class="container"
      color="#222831"
      width="auto"
    >
      <h1 id="title" class="h1 font-weight-light"
      :style="$vuetify.breakpoint.lg ? 'font-size:3vw' : 'font-size:5vw'">Top Headlines</h1>
      <v-list-item
            v-for="(item, index) in topheadline.slice(0,5)"
            :key="index"
            ripple
            @click="onArticleClick"
            class="tile"
            dense
            style="margin-bottom:1%"
        >
          <v-list-item-content>
              <h1
                v-text="item.title"
                class="h4 font-weight-light"
                :style="$vuetify.breakpoint.lg ? 'font-size:1.5vw' : 'font-size:2.5vw'">
              </h1>
          </v-list-item-content>
          <v-img
              :src="images[index].url"
              style="margin-left:1%"
              :max-width="$vuetify.breakpoint.lg ? '30%' : '40%'"
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
        images:[],
        attrs: {
          boilerplate: true,
          elevation: 2,
        },
      }
  },
  methods:{
    onArticleClick(){

    }
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
.tile:hover {
  background: #203E5F;
}

h1, .display-2{
  color: #FFFFFF;
}

hr { 
  display: block;
  margin-top: 1%;
  margin-bottom: 1%;
  border-style: inset;
  border-width: 1px;
}
</style>