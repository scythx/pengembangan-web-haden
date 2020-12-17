<template>
    <div>
        <NewsHeader />
        <NewsDetail :id_article="this.id_article"/>
        <Newsletter />
        <Footer />
    </div>
</template>

<script>
import NewsHeader from '@/components/NewsHeader'
import NewsDetail from '@/components/NewsDetail'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'

export default {
    props: ['id_article'],
    components: {
        NewsHeader,
        NewsDetail,
        Newsletter,
        Footer
    }
}
</script>

<style>

</style>
