<template>
    <div class="news-detail black-base p-3">
        <v-container>
            <h1 class="news-heading white--text my-3">{{ article.title }}</h1>
            <v-img
                contain
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="400"
                src="https://picsum.photos/id/11/500/300"
                class="img-fluid"
            ></v-img>
        </v-container>
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
        <v-container class="white--text">
            {{ article.content }}
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
    }
}
    
</script>

<style scoped>
    .black-base {
        background-color: #222831;    
    }
</style>
