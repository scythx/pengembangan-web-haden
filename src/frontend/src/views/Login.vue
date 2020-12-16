<template>
 <v-container>
   <h1>Login Page</h1>
   <v-text-field
     placeholder="example@domain.tld"
     solo
     v-model="email"></v-text-field>
   <v-text-field
     v-model="password"
     :append-icon="passwordField.visible ? 'mdi-eye' : 'mdi-eye-off'"
     :rules="[passwordField.rules.required, passwordField.rules.min]"
     :type="passwordField.visible ? 'text' : 'password'"
     hint="Password terdiri dari 8 sampai 16 karakter"
     @click:append="passwordField.visible = !passwordField.visible"></v-text-field>
   <v-btn
     block
     elevation="2"
     :loading="loginBtn.loading"
     @click="login({email, password})">Log In</v-btn>
 </v-container>
</template>

<script>
 export default {
   name: 'Login',
   data: () => ({
     email: '',
     password: '',
     loginBtn: {
       loading: false
     },
     passwordField: {
       visible: false,
       rules: {
         min: v => (v.length >= 8 && v.length <= 16),
         required: v => !!v
       }
     }
   }),
   computed: {
     authenticating: function () {
       return this.$store.state.authentication.authenticating
     },
     identity: function() {
       return this.$store.state.authentication.identity
     }
   },
   methods: {
     login({email, password}) {
       this
         .$store
         .dispatch('authentication/login', {email, password})
     }
   },
   watch: {
     authenticating (newValue, oldValue) {
       if (newValue === true) {
         this.loginBtn.loading = true
       } else {
         this.loginBtn.loading = false
       }
     },
     identity (newValue, oldValue) {
       if (newValue !== undefined)
         this.$router.replace({path: this.$route.query.redirect || '/'})
     }
   }
 }
</script>
