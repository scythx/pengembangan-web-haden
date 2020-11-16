<template>
  <div class="container">
    <div class="container m-2 " style="padding">
      <h2 class="align-self-center m-2" style="float: left;">Articles</h2>
      <button
        class="btn btn-success"
        style="float: right; position: relative; top: 10px; right: 10px;"
        @click="add()"
      >
        + Add New
      </button>
    </div>
    <div class="container">
      <table class="table table-bordered">
        <tr>
          <th>Title</th>
          <th>Authors</th>
          <th>Categories</th>
          <th>Date Published</th>
          <th>Action</th>
        </tr>
        <tr v-for="article in articles" :key="article.id_article">
          <th>{{ article.title }}</th>
          <td>{{ article.user_id }}</td>
          <td>
            <ul class="list-unstyled">
              <li>{{ article.id_sport }}</li>
              <li>{{ article.id_league }}</li>
              <li>{{ article.id_team }}</li>
            </ul>
          </td>
          <td>{{ article.date_published }}</td>
          <td>
            <button
              class="btn btn-sm btn-info edit mr-1"
              @click="edit(article)"
            >
              Edit
            </button>
            <button type="button" class="btn btn-sm btn-danger delete" data-toggle="modal" data-target="#articleDelete" @click="toBeDeleted(article)">
              Delete
            </button>
          </td>
        </tr>
      </table>
    </div>
    <div
      class="modal fade"
      id="articleDelete"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Delete Article</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Are you sure about that?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-danger" @click="del()">Yeah, delete it!</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/http";
import "bootstrap/dist/css/bootstrap.css";
export default {
  data() {
    return {
      articles: undefined,
      articleDeleted: undefined
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      http
        .get("http://localhost:4000/api/articles")
        .then((res) => {
          this.articles = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    add() {
      //call vue add new article page
    },
    edit(article) {
      //call vue edit article page
      console.log(article.id_article);
    },
    del(){
      return http.delete('http://localhost:4000/api/articles/'+ this.articleDeleted.id_article).then(res =>{
          this.load()
          this.articleDeleted = undefined;
      })
    },
    toBeDeleted(article) {
      this.articleDeleted = article;
    },
  },
};
</script>
