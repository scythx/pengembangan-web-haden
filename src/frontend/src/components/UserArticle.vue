<template>
 <div id="container">
   <v-container @click="onArticleClick(article.id_article)" class="tile">
     <!-- img -->
     <v-row>
       <v-col cols="12">
         <v-img src="https://picsum.photos/id/11/500/300"></v-img>
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
       onArticleClick(id){
           if(this.$route.path !== '/article/'+id){
               this.$router.push('/article/'+id)
               this.$$router.go()
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
