<template>
    <div>
        <UserArticle/>
        <Topheadline/>
        <Thumbnail/>
    </div>
</template>

<script>
import UserArticle from '@/components/UserArticle.vue'
import Topheadline from '@/components/Topheadline.vue'
import Thumbnail from '@/components/Thumbnail.vue'

export default {
    name: 'MainPage',
    components: {
        UserArticle,
        Topheadline, 
        Thumbnail}
}
</script>