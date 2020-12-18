<template>
 <div>
   <UserArticle
     :title="firstTopHeadline.title"
     description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde ipsa nemo laborum?"
     src="https://picsum.photos/id/11/500/300"/>
   <Topheadline
     :articles="restTopHeadline"/>
   <Thumbnail/>
   <Newsletter/>
 </div>
</template>

<script>
 import UserArticle from '@/components/UserArticle.vue'
 import Topheadline from '@/components/Topheadline.vue'
 import Thumbnail from '@/components/Thumbnail.vue'
 import Newsletter from '@/components/Newsletter'

 export default {
   components: {
     UserArticle,
     Topheadline,
     Thumbnail,
     Newsletter
   },
   data: () => ({
     articles: []
   }),
   computed: {
     topHeadline: function () {
       return this.articles.filter(article => article.is_headline)
     },
     firstTopHeadline: function () {
       return this.topHeadline[0] || {title: ''}
     },
     restTopHeadline: function () {
       return this.topHeadline.slice(1)
     },
   },
   mounted () {
     this
     .$http
     .get('/articles')
     .then((response) => {
        this.articles = response['data']
     })
   }
 }
</script>
