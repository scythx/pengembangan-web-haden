<template>
 <v-container>
   <h2 class="white--text font-weight-light">{{ joinHead }}</h2>
   <p class="white--text lighten-5 font-weight-light">{{ joinText }}</p>
   <v-row no-gutters>
     <v-col>
       <v-text-field
         light
         placeholder="your.email@example.com"
         solo
         v-model="email">
       </v-text-field>
     </v-col>
     <v-col md="auto">
       <v-btn
         block
         class="success font-weight-light"
         tile
         @click="onJoinBtnClick({email})">Join!</v-btn>
     </v-col>
   </v-row>
 </v-container>
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
        if (email === '')
          return

        this
          .$http
          .post('/newsletter_subscribers', {email})
          .then((res) => {
            alert('Thanks for following us ' + email + '!')
          })
          .finally(() => {
            this.email = ''
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
