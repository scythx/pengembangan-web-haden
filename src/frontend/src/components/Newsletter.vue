<template>
    <div class="newsletter p-3">
        <v-container>
            <h2 class="white--text">{{ joinHead }}</h2>
            <p class="white--text lighten-5">{{ joinText }}</p>
            <div class="input-group">
                <input type="email" class="form-control" placeholder="your.email@example.com" v-model="email">
                <v-btn class="success"
                  @click="onJoinBtnClick({email})">Join!</v-btn>
            </div>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            joinHead: 'Join our newsletter!',
            joinText: 'Never miss updates from your favourites club by signing up to our email newsletter. It\'s free! '
        }
    },
    methods: {
      onJoinBtnClick ({email}) {
        if (this.email === '')
          return

        this
          .$http
          .post('/newsletter_subscribers', {email})
          .then((res) => {
            alert('Thanks for following us ' + email + '!')
          })

          //send event to google analytics
          this.$gtag.event('subscribe_newsletter', {
              'event_category' : 'User',
              'event_label' : 'Subscribe for newsletter'
          })
      }
    }
}
</script>

<style>
.newsletter {
    background-color: #222831;
}
</style>
