<template>
  <div class="container mt-4">
    <h3>Add new article</h3>
    <div class="input-group mb-1">
      <input
        type="text"
        class="form-control"
        placeholder="Article title"
        aria-label="Username"
        aria-describedby="basic-addon1"
        v-model="article.title"
      />
    </div>
    <div class="input-group mb-3">
      <textarea
        rows="15"
        class="form-control"
        placeholder="Article body"
        aria-label="With textarea"
        aria-describedby="inputGroup-sizing-sm"
        v-model="article.content"
      ></textarea>
    </div>
    <div class="d-flex flex-row-reverse align-items-center">
      <button class="btn btn-primary" @click="add()">Publish</button>
      <button class="btn btn-secondary mr-2" @click="">Categories</button>
      <div class="d-flex flex-row-reverse align-items-center">
        <input
          class="mr-3 mb-1"
          type="checkbox"
          aria-label="Checkbox for following text input"
          v-model="article.is_header"
        />
        <h6 class="mr-2">Headline</h6>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/http'
export default {
  data() {
    return {
      article: {
        title: "",
        content: "",
        is_header: false
      },
    };
  },
  mounted() {

  },
  methods: {
    add() {
      http.post("http://localhost:4000/api/articles/", this.article).then((res) => {
        this.article.title = "";
        this.article.content = "";
        this.article.is_header = false;
      });
    },
  },
};
</script>
