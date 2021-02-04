<template>
    <div id="container">
        <v-list 
            dense
            class="container"
            width="auto"
        >
            <h1 id="title" class="h1 font-weight-light"
            :style="$vuetify.breakpoint.lg ? 'font-size:3vw' : 'font-size:5vw'">{{sport_name}}</h1>
            <v-list-item
                v-for="(article, id) in articles_sport"
                :key="id"
                ripple
                @click="onArticleClick(article.id_article, article.title)"
                class="tile"
                dense
                style="margin-bottom:1%"
            >
                <v-img
                    :src="article.thumbnail"
                        style="margin-right:1%"
                    :max-width="$vuetify.breakpoint.lg ? '30%' : '40%'">
                </v-img>
                <v-list-item-content>
                    <h1
                        v-text="article.title"
                        class="h4"
                        :style="$vuetify.breakpoint.lg ? 'font-size:1.5vw' : 'font-size:2.5vw'">
                    </h1>
                    <p
                    v-if="$vuetify.breakpoint.lg"
                    class="font-weight-light white--text"
                    :style="'font-size:1vw'"
                    >
                        {{ article.content | textPreview }}
                    </p>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>

<script>
import http from "@/http"

export default {
    name:'ArticlesSport',
    props:['id_sport'],
    data(){
        return{
            articles_sport:[],
            sport_name:null,
            images:[],
            metaDescription: 'Website berita olahraga terlengkap, terupdate, dan terpercaya',
        }
    },
    methods:{
        onArticleClick(id, title) {
      title = title.replace(/-|;|,|:|'|"|’|‘|“|”/g, '');
      title = title.replace(/\s+/g, '-');
      if (this.$route.path !== "/article/" + id + "/" + title) {
        this.$router.push("/article/" + id + "/" + title);
        this.$router.go();
      }
    }
    },
    mounted() {
        http.get('/articles/sports/' + this.id_sport)
        .then((response) => {
            this.articles_sport = response['data']
            this.metaDescription = this.articles_sport.map(article => article.title).join()
        })

        http.get('/sports/' + this.id_sport)
        .then((response) => {
            const sport = response['data']
            this.sport_name = sport[0].name
        })

        http.get('/images')
        .then((response) => {
            this.images = response['data']
        })
    },
    metaInfo(){
        return{
            meta: [
                {vmid: 'description', name: 'description', content: this.metaDescription }
            ]
        }
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