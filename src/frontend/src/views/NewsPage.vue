<template>
    <div>
        <NewsDetail :id_article="this.id_article"/>
        <Newsletter />
    </div>
</template>

<script>
import NewsDetail from '@/components/NewsDetail'
import Newsletter from '@/components/Newsletter'

export default {
    props:['id_article'],
    components: {
        NewsDetail,
        Newsletter
    }
}
</script>

<style>

</style>