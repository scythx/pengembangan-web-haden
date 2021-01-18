<template>
  <div class="container">
    <v-data-table
      :headers="headers"
      :items="articles"
      :loading="articleLoad"
      loading-text="Loading articles... Please wait"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Articles</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                @click="add()"
              >
                + Add New
              </v-btn>
            </template>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this article?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.title="{ item }">
        <div class="my-2" style="text-align:justify;">
          <h6>{{ item.title | title }}</h6>
        </div>
      </template>

      <template v-slot:item.author="{ item }">
        {{ item.fullname }}
      </template>

      <template v-slot:item.sport="{ item }">
        <div class="my-2">
          <ul>
            <li v-if="item.sportName">Sport: {{ item.sportName }}</li>
            <li v-else>Sport: <p class="font-weight-thin" style="display:inline">unselected</p></li>
            <li v-if="item.teamName">Team: {{ item.teamName }}</li>
            <li v-else>Team: <p class="font-weight-thin" style="display:inline">unselected</p></li>
            <li v-if="item.leagueName">League: {{ item.leagueName }}</li>
            <li v-else>League: <p class="font-weight-thin" style="display:inline">unselected</p></li>
          </ul>
        </div>
      </template>

      <template v-slot:item.date_published="{ item }">
        {{ item.date_published | formatDate }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:no-data>
        <p class="mt-4">
          There is no article to load.
        </p>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import http from "@/http";
import "bootstrap/dist/css/bootstrap.css";
export default {
  data() {
    return {
      users: undefined,
      articles: undefined,
      articleDeleted: undefined,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "Title",
          align: "left",
          value: "title",
          width: "50%"
        },
        { text: "Authors", value: "author", width: "10%"},
        { text: "Categories", value: "sport", sortable: false, width: "20%"},
        { text: "Date Published", value: "date_published", width: "10%"},
        { text: "Actions", value: "actions", sortable: false, width: "10%"},
      ],
      desserts: [],
      articleLoad: true,
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    load() {},
  },
  mounted() {
    this.load();
  },
  methods: {
     load() {
      http
        .get("/articles")
        .then((res) => {
          this.articles = res.data;
        })
        .then(async () => {
          for (var i = 0; i < this.articles.length; i++) {
            if(this.articles[i].id_sport){
              await http.get("/sports/" + this.articles[i].id_sport).then((res) => {
                this.articles[i].sportName = res.data[0].name
              })
            }
            else{
              this.articles[i].sportName = ""
            }
            if(this.articles[i].teamName){
              await http.get("/teams/" + this.articles[i].id_team).then((res) => {
                this.articles[i].teamName = res.data[0].name
              })
            }
            else{
              this.articles[i].teamName = ""
            }
            if(this.articles[i].leagueName){
                await http.get("/leagues/" + this.articles[i].id_league).then((res) => {
                this.articles[i].leagueName = res.data[0].name
              })
            }
            else{
              this.articles[i].leagueName = ""
            }
          }
        })
        .then(() => {
          this.articleLoad = false;
        })
        .catch((err) => {
          console.log(err);
        });
      http
        .get("/users")
        .then((res) => {
          this.users = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getName(id) {
      http
        .get("/users/" + id)
        .then((res) => {
          this.user = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(user);
    },
    add() {
      if (this.$route.path !== "/dashboard/add_article")
        this.$router.push("/dashboard/add_article");
    },
    edit(article) {
      //call vue edit article page
      console.log(article.id_article);
    },
    del() {
      return http
        .delete("/articles/" + this.articleDeleted.id_article)
        .then((res) => {
          this.load();
          this.articleDeleted = undefined;
        });
    },
    toBeDeleted(article) {
      this.articleDeleted = article;
    },
    deleteItem(article) {
      this.articleDeleted = article;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      return http
        .delete("/articles/" + this.articleDeleted.id_article)
        .then((res) => {
          this.load();
          this.articleDeleted = undefined;
          this.closeDelete();
          this.load();
        });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
