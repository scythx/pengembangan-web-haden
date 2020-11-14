<template>
  <div id="container">
    <hr>
    <h1>Top Headline</h1>
    <ul class="list-unstyled">
      <div class="item-container">
        <a href="#" v-for="item in topheadline.slice(0,5)">
          <li class="media">
              <div class="media-body">
                <h5 class="text-sm-left">{{item.title}}</h5>
              </div>
              <img v-bind:src="item.image" class="mr-3" alt="...">
          </li>
        </a>
      </div> 
    </ul>
    <hr>  
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
  }
}
</script>

<style scoped>
hr { 
  display: block;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: 5%;
  margin-right: 5%;
  border-style: inset;
  border-width: 1px;
}

h1{
  color: white;
  margin-left: 8%;
  margin-right: 5%;
  font-family: 'Open Sans', sans-serif;
  font-size:4vw;
}

#container{
  width: 100%;
  position: absolute;
  background-color: #222831;
}

.item-container{
  margin-left: 5%;
  margin-right: 5%;
  width: 90%;
}

.media{
  margin-top: 1%;
  align-items: center;
  border-radius: 0.5vw;
}

.media:hover{
  background-color: #203E5F;
}

.media-body{
  margin-left:3%;
  margin-right:3%;
  color: white;
  text-align: left;
  font-family: 'Open Sans', sans-serif;
}

h5{
  font-size:2.5vw;
}

img{
  width: 30%;
  height: 30%;
  border-radius: 0.5vw;
}
</style>
