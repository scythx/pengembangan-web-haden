<template>
    <div>
        <NewsDetail :id_article="this.id_article"/>
        <ShareButton  :id_article="this.id_article" />
        <Newsletter />
    </div>
</template>

<script>
import NewsDetail from '@/components/NewsDetail'
import Newsletter from '@/components/Newsletter'
import ShareButton from '@/components/ShareButton'

export default {
    props: ['id_article', 'title'],
    components: {
        NewsDetail,
        Newsletter,
        ShareButton
    }
}
</script>

<style>

</style>
