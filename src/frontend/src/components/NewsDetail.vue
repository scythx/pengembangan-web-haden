<template>
    <div class="news-detail black-base p-3">
        <v-container>
            <v-row no-gutters>
                <v-img class="rounded-circle d-inline-block"
                    max-width="50"
                    max-height="50"
                    :aspect-ratio="1/1"
                    src="https://picsum.photos/id/11/500/300">
                </v-img>
                <v-col class="text-left my-auto mx-3 amber--text accent-3">
                   {{article.author}}
                </v-col>
                <v-spacer></v-spacer>
                <v-col class="text-right my-auto mx-3 amber--text accent-3">
                    {{article.date_published.substring(0,10)}}
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <h1 class="news-heading white--text my-3">{{ article.title }}</h1>
        </v-container>
        <v-container id="content" class="white--text">
        </v-container>
    </div>
</template>

<script>
import http from "@/http"

export default {
    name: 'NewsDetail',
    props:['id_article'],
    data() {
        return {
            article: {}
        }
    },
    methods: {
    },
    async mounted() {
        http.get('/articles/' + this.id_article)
        .then((response) => {
            const articles = response['data']
            this.article = articles[0]
        })
        .then(() =>{
            var content = document.querySelector("#content");
            content.innerHTML = this.article.content
        })
    }
}

</script>

<style scoped>
    .black-base {
        background-color: #222831;    
    }
</style>
