<template>
    <div>
        <UserArticle/>
        <Topheadline/>
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
    name: 'MainPage',
    components: {
        UserArticle,
        Topheadline, 
        Thumbnail,
        Newsletter}
}
</script>