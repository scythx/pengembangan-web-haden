<template>
    <div>
        <NewsHeader />
        <NewsDetail />
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