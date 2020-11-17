<template>
    <div>
        <div class="container">
            <img :src="imageUrl" alt="" class="responsive">
            <h2>{{ title }}</h2>
            <h3>{{ titleDesc }}</h3>
        </div>
    </div>
</template>

<script>
export default {
    name : 'UserArticle',
    props : ["imageUrl", "title", "titleDesc"],
}
</script>

<style scoped>
    .container{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .responsive{
        width: 50%;
        height: auto;
    }
</style>