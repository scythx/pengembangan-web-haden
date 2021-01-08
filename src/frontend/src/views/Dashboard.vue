<template>
<v-card
    class="mx-auto overflow-hidden"
    height="100%"
    width="100%"
  >
    <v-app-bar
      color="#1A2634"
      dark
      dense
      height="70px"
    >
      <v-app-bar-nav-icon class="ml-3" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title >
        <v-img
        class="mr-5" 
        src="../assets/harden-logo.svg"/>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn
        rounded
        disabled
        height="50px"
        color="#1A2634">
          <v-icon
          large
          class="mr-2">mdi-account</v-icon>
          {{username}}
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      bottom
      temporary
      width="20%"
      color="#1C3856"
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="white--text text--accent-4"
        >
          <v-list-item 
          class="p-2"
          @click="onHomeClick"
          >
            <v-icon
            x-large
            color="white"
            class="ml-3">mdi-home</v-icon>
            <v-list-item-title
            class="text-h5 white--text ml-8 pt-2 pb-2 font-weight-light">
              Home
            </v-list-item-title>
          </v-list-item>

          <v-list-group
            :value="false"
            no-action
          >
            <template
            v-slot:activator>
              <v-list-item
              class="p-2"
              >
                <v-icon
                x-large
                color="white"
                class="ml-1">mdi-newspaper-variant-multiple</v-icon>
                <v-list-item-title
                class="text-h5 white--text ml-8 pt-2 pb-2 font-weight-light">
                  Article
                </v-list-item-title>
              </v-list-item>
            </template>
  
            <v-list-item
              class="p-2 ml-16"
              @click="onAddArticleMenuClick">
              <v-list-item-title
              class="text-subtitle-1 white--text ml-8 pt-2 pb-2 font-weight-light">
                Post new Article
              </v-list-item-title>
            </v-list-item>

            <v-list-item
              class="p-2 ml-16"
              @click="onListArticleMenuClick">
              <v-list-item-title
              class="text-subtitle-1 white--text ml-8 pt-2 pb-2 font-weight-light">
                All Article
              </v-list-item-title>
            </v-list-item>

            <v-list-item
              class="p-2 ml-16"
              @click="onCategoriesMenuClick">
              <v-list-item-title
              class="text-subtitle-1 white--text ml-8 pt-2 pb-2 font-weight-light">
                Categories
              </v-list-item-title>
            </v-list-item>
          </v-list-group>

          <v-list-item 
          class="p-2"
          @click="onMediaMenuClick">
            <v-icon
            x-large
            color="white"
            class="ml-3">mdi-folder-multiple-image</v-icon>
            <v-list-item-title
            class="text-h5 white--text ml-8 pt-2 pb-2 font-weight-light">
              Media
            </v-list-item-title>
          </v-list-item>

          <v-list-item class="p-2 "
            @click="onLogoutClick">
            <v-icon
            x-large
            color="white"
            class="ml-3">mdi-logout</v-icon>
            <v-list-item-title
            class="text-h5 white--text ml-8 pt-2 pb-2 font-weight-light">
              Sign out
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-card-text>
        <router-view></router-view>
    </v-card-text>
  </v-card>
</template>

<script>
import http from "@/http"

export default {
    name: 'Dashboard',
    data(){
        return{
          userid:null,
          username:null,
          selectedItem: 1,
          drawer: false,
          group: null,
        }
    },
   computed: {
     identity: function() {
       return this.$store.state.authentication.identity
     }
   },
    methods: {
        onMediaMenuClick() {
        if (this.$route.path !== '/dashboard/gallery')
            this.$router.push('/dashboard/gallery')
        },
        onHomeClick(){
          if (this.$route.path !== '/dashboard')
            this.$router.push('/dashboard')
          
          this.drawer = false
        },
        onAddArticleMenuClick() {
        if (this.$route.path !== '/dashboard/add_article')
            this.$router.push('/dashboard/add_article')
        },
        onListArticleMenuClick() {
        if (this.$route.path !== '/dashboard/list_article')
            this.$router.push('/dashboard/list_article')
        },
        onCategoriesMenuClick() {
            console.log("Got HEre")
            if (this.$route.path !== '/dashboard/categories')
                this.$router.push('/dashboard/categories')
        },
        onLogoutClick() {
          this
            .$store
            .dispatch('authentication/logout')
        }
    },
   watch: {
     identity (newValue, oldValue) {
       if (newValue !== undefined)
         return

       this.$router.replace({path: '/'})
     }
   },
  mounted() {
    this.userid = this.$store.state.authentication.identity.id

    http.get('/users/'+this.userid)
    .then((response) => {
        
        var user = response['data']
        this.username = user[0].fullname
    })
  }
}
</script>
