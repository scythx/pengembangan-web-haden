<template>
    <div class="newsletter p-3">
        <v-container>
            <v-divider class="white"></v-divider>
            <h2 class="white--text">{{ joinHead }}</h2>
            <p class="white--text lighten-5">{{ joinText }}</p>
            <div class="input-group">
                <input type="email" class="form-control" placeholder="your.email@example.com">
                <v-btn class="success">Join!</v-btn>
            </div>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            joinHead: 'Join our newsletter!',
            joinText: 'Never miss updates from your favourites club by signing up to our email newsletter. It\'s free! '
        }
    }
}
</script>

<style>
.newsletter {
    background-color: #222831;
}

</style>