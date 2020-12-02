<template>
  <div class="container mt-4">
    <h3>Add new article</h3>
    <div class="input-group mb-1">
      <input
        type="text"
        class="form-control"
        placeholder="Article title"
        v-model="article.title"
        style="font-weight: bold; color:black;"
      />
    </div>
    <div class="mb-2" style=".c">
      <ckeditor
        tag-name="textarea"
        aria-label="With textarea"
        :editor="editor"
        v-model="article.content"
        :config="editorConfig"
        placeholder="Article body"
      ></ckeditor>
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
import http from "@/http";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  components: {
    ClassicEditor,
  },
  data() {
    return {
      article: {
        title: "",
        content: "",
        is_header: false,
      },
      editor: ClassicEditor,
      editorConfig: {
        //toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'clipboard','image' ],
        //The configuration of the editor.
        fillEmptyBlocks: false,
        basicEntities: false,
        entities: false,
        entities_greek: false,
        entities_latin: false,
        entities_additional: "",
        language: "en",
        wordCount: {
          container: document.getElementById("wordcount"),
        },
        ckfinder: {
          // Upload the images to the server using the CKFinder QuickUpload command.
          uploadUrl:
            "https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json",

          // Define the CKFinder configuration (if necessary).
          options: {
            resourceType: "Images",
          },
        },
        mediaEmbed: {
          previewsInData: true,
        },
      },
    };
  },
  mounted() {},
  methods: {
    add() {
      http
        .post("/articles/", this.article)
        .then((res) => {
          this.article.title = "";
          this.article.content = "";
          this.article.is_header = false;
        });
    },
  },
};
</script>

<style>
.ck-editor__editable {
  min-height: 300px;
}
</style>