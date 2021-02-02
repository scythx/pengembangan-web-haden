<template>
    <div>
      <NewsHeader/>
      <v-main>
        <router-view/>
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
        Footer}
}
</script>
