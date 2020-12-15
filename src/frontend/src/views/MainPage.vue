<template>
    <div>
        <NewsHeader/>
        <router-view/>
    </div>
</template>

<script>
import NewsHeader from '@/components/NewsHeader.vue'

export default {
    name: 'MainPage',
    components: {
        NewsHeader}
}
</script>