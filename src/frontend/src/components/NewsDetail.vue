<template>
    <div class="news-detail black-base p-3">
        <!-- title sama gambar urang pindahin ke paling atas-->
        <v-container>
            <h1 class="news-heading white--text">{{ article.title }}</h1>
            <v-img	
                contain	
                lazy-src="https://picsum.photos/id/11/10/6"	
                max-height="400"	
                :src="article.thumbnail"	
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
                   {{authorname}}
                </v-col>
                <v-spacer></v-spacer>
                <v-col class="text-right my-auto mx-3 amber--text accent-3">
                    {{article.date_published.substring(0,10) | formatDate}}
                </v-col>
            </v-row>
        </v-container>
        <v-container id="content" class="white--text">
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
            article: {},
            authorname : null
        }
    },
    methods: {
    },
    async mounted() {
        await http.get('/articles/' + this.id_article)
        .then((response) => {
            const articles = response['data']
            this.article = articles[0]
        })
        .then(() =>{
            var content = document.querySelector("#content");
            content.innerHTML = this.article.content
        })
        .then(()=>{
            var content = document.querySelector("#content");
            var element = content.getElementsByTagName("img")[0]
            element.parentNode.removeChild(element);
        })

        await http.get('/users/' + this.article.id_author)
        .then((response) => {
            const author = response['data']
            this.authorname = author[0].fullname
        })
    }
}

</script>

<style scoped>
    .black-base {
        background-color: #222831;    
    }
</style>
