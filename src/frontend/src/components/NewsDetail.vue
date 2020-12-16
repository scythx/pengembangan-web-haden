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
                   Hello
                </v-col>
                <v-spacer></v-spacer>
                <v-col class="text-right my-auto mx-3 amber--text accent-3">
                    dd/mm/yy
                </v-col>
            </v-row>
        </v-container>
        <v-container class="white--text">
            {{ article.text }}
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'NewsDetail',
    data() {
        return {
            newsId: 1,
            article: {
                title: "Lorem ipsum dolor sit amet",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed urna magna, finibus vitae efficitur quis, sagittis ac metus. Aliquam tincidunt eget lorem et consectetur. Suspendisse ut lacus dui. Nullam sed malesuada eros. Praesent hendrerit at quam at dictum. Sed non efficitur leo. Aliquam placerat elit vitae purus sagittis, sit amet suscipit velit fringilla. Etiam sodales elit vel ornare eleifend. Suspendisse potenti. Ut non turpis sed urna porttitor tincidunt. Vivamus sit amet eros fermentum arcu ultrices auctor vitae in ante. Nam sapien nisl, ullamcorper eu ante a, consequat bibendum libero. Pellentesque eu sapien efficitur sem aliquet consequat a eu velit. Nullam a orci risus. Nulla tempus lorem sed sapien dapibus tempus. Aliquam erat volutpat."
            }
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
    .black-base {
        background-color: #222831;    
    }
</style>