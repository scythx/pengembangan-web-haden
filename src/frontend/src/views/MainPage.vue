<template>
 <div>
   <NewsHeader/>
   <v-main>
     <v-container fluid>
       <router-view/>
     </v-container>
   </v-main>
   <Footer/>
 </div>
</template>

<script>
 import NewsHeader from '@/components/NewsHeader.vue'
 import Footer from '@/components/Footer'

 export default {
   name: 'MainPage',
   components: {
     NewsHeader,
     Footer
   }
 }
</script>
