<template>
 <div id="container">
   <v-container @click="onArticleClick(article.id_article, article.title)" class="tile">
     <!-- img -->
     <v-row>
       <v-col cols="12">
         <v-img :src="article.thumbnail"></v-img>
       </v-col>
     </v-row>
     
     <!-- Title -->
     <div class="row">
       <div class="col-12 text-h6 text-sm-h5 text-md-h2 white--text">
         {{ article.title }}
       </div>
     </div>

   </v-container>
 </div>
</template>

<script>
 export default {
   name : 'UserArticle',
   props : ["article"],
   methods:{
      onArticleClick(id, title) {
      title = title.replace(/-|;|,|:|'|"|’|‘|“|”/g, '');
      title = title.replace(/\s+/g, '-');
      if (this.$route.path !== "/article/" + id + "/" + title) {
        this.$router.push("/article/" + id + "/" + title);
      }
    }
   }
 }
</script>

<style scoped>
 #container{
   background-color: #222831;
 }

 .tile:hover{
   background: #203E5F;
 }
</style>
