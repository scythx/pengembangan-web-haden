<template>
  <div class="full-height p-3 dark-blue-base">
    <v-container class="m-auto">
      <v-img
          contain
          max-height="35"
          max-width="150"
          class="img-responsive pt-5 my-5 mx-auto" src="@/assets/harden-logo.svg">
      </v-img>
      <v-form 
        color="white"
        class="rounded border border-dark p-4 form-signin">
        <h3 class="my-6 text-center white--text">Masuk</h3>
        <v-text-field
          label="Alamat email"
          outlined
          autofocus
          dark
          append-icon="mdi-email-outline"
          v-model="email" >
        </v-text-field>
        <v-text-field
          label="Password"
          dark
          outlined
          v-model="password"
          :append-icon="passwordField.visible ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[passwordField.rules.required, passwordField.rules.min]"
          :type="passwordField.visible ? 'text' : 'password'"
          hint="Password terdiri dari 8 sampai 16 karakter"
          @click:append="passwordField.visible = !passwordField.visible"></v-text-field>
        <v-btn
          color="primary"
          block
          elevation="2"
          :loading="loginBtn.loading"
          @click="login({email, password})">Masuk</v-btn>
        <v-divider dark></v-divider>
        <p class="text-center white--text caption">Belum punya akun? <a @click="onRegisterClick">Daftar di sini.</a> </p>
      </v-form>
    </v-container>
  </div>
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
       return this.$store.state.authentication.isAuthenticating
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
     },
     onRegisterClick() {
       this.$router.replace({path: '/register'})
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
     identity: {
       immediate: true,
       handler: function (newValue, oldValue) {
         if (newValue === undefined)
           return;

         this
           .$http
           .get(`/users/${newValue['id']}/is_writer`)
           .then((res) => {
             if (res.data == true) {
               this.$router.replace({path: '/dashboard'})
             }
             else {
               this.$router.replace({path: this.$route.query.redirect || '/'})
             }
           })
       }
     }
   }
 }
</script>

<style scoped>
  .dark-blue-base {
    background-color: #1A2634;
  }

  .full-height {
    height: 100%;
    display: -ms-flexbox;
      display: -webkit-box;
      display: flex;
      -ms-flex-align: center;
      -ms-flex-pack: center;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
  }

  .form-signin {
    width: 100%;
    max-width: 330px;
    margin: 0 auto;
  }

</style>
