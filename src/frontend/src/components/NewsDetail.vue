<template>
    <div class="news-detail black-base">
        <!--  top conatiner -->
        <section id="#top-container" class="py-3">
            <h1 class="news-heading gray-text my-5">{{ article.title }}</h1>
            <img class="news-image my-5" src="http://placehold.it/950x500?text=News Image" alt="">
        </section>

        <!-- news author and timestamp -->
        <section id="#author">
            <div class="container my-3">
                <div class="row">
                    <div class="news-author col-6 ">
                        <img class="author-profile" src="http://placehold.it/50x50?text=Auth" alt="">
                        <p class="author-name px-3 amber--text accent-3">Auth<!-- {{ article.author }} --></p>
                    </div>
                    <v-spacer></v-spacer>
                    <p class="news-date white--text">{{ article.date_published }}</p>
                </div>
            </div>
        </section>

        <!-- news text -->
        <section class="news-text py-3">
            <p class="main-content grey--text lighten-4">{{ article.content }}</p>
        </section>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'NewsDetail',
    data() {
        return {
            newsId: 1,
            article: {}
        }
    },
    methods: {
        async load() {
            const response = await axios.get('/articles/' + newsId)
            this.article = response.data
            console.log(this.article)
        }
    },
    async mounted() {
        this.load()
    }
}

</script>

<style scoped>
    section {
        padding: 0% 10%;
    }

    .black-base {
        background-color: #222831;
    }

    .news-date {
        text-align: right;
    } 

    .news-detail {
        padding: 0 10%;
    }

    .news-image {
        width: 100%;
        margin: 0 auto;
        display: block;
    }

    .author-name {
        display: inline-block;
        vertical-align: middle
    }

    .author-profile {
        border-radius: 50%;
        padding: 3%;
        display: inline-block;
        vertical-align: middle
    }

    .main-content {
        font-family: serif;
        font-weight: lighter;
        font-size: 1.20rem;
    }

    .news-heading {
        /* font family */
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 500;
        font-size: 2.5rem;
    }

</style>