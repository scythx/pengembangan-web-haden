<template>
    <div id="container">
        <v-list 
            dense
            class="container"
            width="auto"
        >
            <h1 id="title" class="h1 font-weight-light"
            :style="$vuetify.breakpoint.lg ? 'font-size:3vw' : 'font-size:5vw'">{{league_name}}</h1>
            <v-list-item
                v-for="(article, id) in articles_league"
                :key="id"
                ripple
                @click="onArticleClick"
                class="tile"
                dense
                style="margin-bottom:1%"
            >
                <v-img
                    :src="images[id].url"
                        style="margin-right:1%"
                    :max-width="$vuetify.breakpoint.lg ? '30%' : '40%'">
                </v-img>
                <v-list-item-content>
                    <h1
                        v-text="article.title"
                        class="h4 font-weight-light"
                        :style="$vuetify.breakpoint.lg ? 'font-size:1.5vw' : 'font-size:2.5vw'">
                    </h1>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>

<script>
import http from "@/http"

export default {
    name:'ThumbnailDetail',
    props:['id_league'],
    data(){
        return{
            articles_league:[],
            league_name:null,
            images:[]
        }
    },
    methods:{
        onArticleClick(){
            
        }
    },
    mounted() {
        http.get('/articles/leagues/' + this.id_league)
        .then((response) => {
            this.articles_league = response['data']
        })

        http.get('/leagues/' + this.id_league)
        .then((response) => {
            const league = response['data']
            this.league_name = league[0].name
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
</style>