<template>
 <v-container>
   <h1>Halaman Pendaftaran</h1>
   <v-text-field
     placeholder="Nama Lengkap"
     solo
     v-model="fullname"></v-text-field>
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
   <v-text-field
     v-model="passwordConfirmation"
     :append-icon="passwordConfirmationField.visible ? 'mdi-eye' : 'mdi-eye-off'"
     :rules="[passwordConfirmationField.rules.required, passwordConfirmationField.rules.min]"
     :type="passwordConfirmationField.visible ? 'text' : 'password'"
     hint="Password terdiri dari 8 sampai 16 karakter"
     @click:append="passwordConfirmationField.visible = !passwordConfirmationField.visible"></v-text-field>
   <v-btn
     block
     elevation="2"
     :loading="registerBtn.loading"
     @click="register({fullname, email, password})">Register</v-btn>
 </v-container>
</template>

<script>
 export default {
   name: 'Daftar',
   data: () => ({
     fullname: '',
     email: '',
     password: '',
     passwordConfirmation: '',
     registerBtn: {
       loading: false
     },
     passwordField: {
       visible: false,
       rules: {
         min: v => (v.length >= 8 && v.length <= 16),
         required: v => !!v
       }
     },
     passwordConfirmationField: {
       visible: false,
       rules: {
         min: v => (v.length >= 8 && v.length <= 16),
         required: v => !!v
       }
     }
   }),
   methods: {
     register({fullname, email, password}) {
       this
         .$http
         .post('/users', {
           fullname,
           email,
           password,
           "is_subscribed_newsletter": false,
           "is_writer": true
         })
         .then((response) => {
           //
         })
         .catch((error) => {
           //
         })
     }
   }
 }
</script>
