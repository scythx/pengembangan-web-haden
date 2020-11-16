<template>
  <div id="container" >
    <hr>
    <h1>Top Headline</h1>
    <ul class="list-unstyled">
      <div class="item-container">
        <a href="#" v-for="(item, index) in topheadline.slice(0,5)">
          <li class="media">
              <div class="media-body">
                <h5 class="text-sm-left">{{item.title}}</h5>
              </div>
              <img v-bind:src="images[index].url" class="mr-3" alt="...">
          </li>
        </a>
      </div> 
    </ul>
    
    <div v-for="(i, index) in mapped.slice(0,3)">
      <hr>
      <h1>{{getLeagueName(i.id_league)}}</h1>
      <ul class="list-unstyled">
        <div class="item-container">
          <a href="#" v-for="(item, idx) in i.articles.slice(0,2)">
            <li class="media">
                <img v-bind:src="images[index+idx].url" class="ml-3" alt="...">
                <div class="media-body">
                  <h5 class="text-sm-left">{{item.title}}</h5>
                </div>
            </li>
          </a>
          <button type="button" class="btn btn-warning btn-lg btn-block">Lihat Semua</button>
        </div> 
      </ul>
    </div>
    <hr>
  </div>
</template>

<script>
import http from "@/http"

export default {
  name: 'Topheadlinethumbnail',
  components: {},
  data(){
      return{
        articles: [],
        leagues: [],
        mapped: [],
        topheadline: [],
        images: []
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

            while(i < this.articles.length){
              if(this.articles[i].is_headline){
                this.topheadline.push(this.articles[i])
              }
              i++;
            }
            
            i = 0

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

.ml-3{
  width: 40%;
  height: 40%;
  border-radius: 0.5vw;
}

.mr-3{
  width: 30%;
  height: 30%;
  border-radius: 0.5vw;
}

button{
  margin-top: 3%;
  width: 98%;
  margin-left: 1%;
  font-family: 'Open Sans', sans-serif;
  font-size: 2vw;
}
</style>
