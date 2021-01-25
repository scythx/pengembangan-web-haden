<template>
    <div class="news-detail black-base p-3">
        <!-- title sama gambar urang pindahin ke paling atas-->
        <v-container>
            <h1 class="news-heading white--text font-weight-light">{{ article.title }}</h1>
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
                <v-icon 
                x-large
                color="#FFCC00">mdi-account-circle</v-icon>
                <v-col class="text-left my-auto mx-3 amber--text accent-3 font-weight-light">
                   {{authorname}}
                </v-col>
                <v-spacer></v-spacer>
                <v-col class="text-right my-auto mx-3 amber--text accent-3 font-weight-light">
                    {{article.date_published.substring(0,10) | formatDate}}
                </v-col>
            </v-row>
        </v-container>
        <v-container id="content" class="white--text font-weight-light">
            {{ article.content }}
        </v-container>
    </div>
</template>

<script>
import http from "@/http"
import $ from 'jquery'
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
            var index = 0
            var content = document.querySelector("#content");
            content.innerHTML = this.article.content

            var content = document.querySelector("#content");
            var element = content.getElementsByTagName("figure")[index]
            element.parentNode.removeChild(element);

            var elements = content.getElementsByTagName("img")
            if (elements[index]){
                for(var i = 0; i < elements.length; i++){
                    console.log(elements[i])
                    $(elements[i]).css("max-width", "100%");
                }
            }
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
