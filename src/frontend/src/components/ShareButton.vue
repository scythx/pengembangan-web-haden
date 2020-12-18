<template>
    
    <div class="black-base">
        <v-container>
            <TwitterButton :url="getCurrentURL" :description="title" class="share-button--circle" btnText />
            <FacebookButton :url="getCurrentURL" :description="title" class="share-button--circle" btnText />
            <WhatsAppButton :url="getCurrentURL" class="share-button--circle" btnText/>
        </v-container>
    </div>


</template>

<script>
import http from '@/http'
import TwitterButton from 'vue-share-buttons/src/components/TwitterButton'
import FacebookButton from 'vue-share-buttons/src/components/FacebookButton'
import WhatsAppButton from 'vue-share-buttons/src/components/WhatsAppButton'

export default {

    props : ['id_article'],
    data(){
        return{
            title : ''
        }
    },
    components : {
        TwitterButton,
        FacebookButton,
        WhatsAppButton
    },
    methods : {

    },
    async mounted(){
        http.get('/articles/' + this.id_article)
        .then((response) => {
            const articles = response['data']
            const article = articles[0]
            this.title = article.title 
        })

    }
    ,
    computed : {
        getCurrentURL(){
            return this.$route.query.page
        }
    }
}
</script>

<style scoped>
    .black-base {
        background-color: #222831;    
    }
</style>