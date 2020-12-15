<template>
  <div class="container mt-4 my-2">
    <h3>Add new article</h3>
    <h4 class="mt-3">Category</h4>
    <div class="d-flex justify-start">
      <v-select class="mr-2" :items="sports" name="sport-select" item-text="name" item-value="id_sport" v-model="article.sport_id" label="Sport" dense solo></v-select>
      <v-select  :items="teams" name="team-select" item-text="name" item-value="id_team" v-model="article.team_id" label="Team" dense solo></v-select>
      <v-select class="ml-2" :items="leagues" name="league-select" item-text="name" item-value="id_league" v-model="article.league_id" label="League" dense solo></v-select>
    </div>
    <h4>Content</h4>
    <div class="mb-2">
      <ckeditor
        tag-name="textarea"
        aria-label="With textarea"
        :editor="editor"
        :config="editorConfig"
        @input="onEditorInput"
      ></ckeditor>
    </div>
    <div class="d-flex flex-row-reverse align-items-center">
      <v-btn elevation="1" @click="add()" color="primary" class="mx-2" medium
        >Publish</v-btn
      >
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
import $ from "jquery";
import http from "@/http";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import EssentialsPlugin from "@ckeditor/ckeditor5-essentials/src/essentials";
import BoldPlugin from "@ckeditor/ckeditor5-basic-styles/src/bold";
import ItalicPlugin from "@ckeditor/ckeditor5-basic-styles/src/italic";
import LinkPlugin from "@ckeditor/ckeditor5-link/src/link";
import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Title from "@ckeditor/ckeditor5-heading/src/title.js";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
export default {
  components: {
    ClassicEditor,
  },
  data() {
    return {
      article: {
        title: "",
        content: "",
        data: "",
        sport_id: undefined,
        team_id: undefined,
        league_id: undefined,
        is_header: false,
      },
      sports: undefined,
      teams: undefined,
      leagues: undefined,
      editor: ClassicEditor,
      editorConfig: {
        plugins: [
          Title,
          Heading,
          EssentialsPlugin,
          BoldPlugin,
          ItalicPlugin,
          LinkPlugin,
          ParagraphPlugin,
        ],
        title: {
          placeholder: "Tittle",
        },
        toolbar: {
          items: [
            "heading",
            "|",
            "undo",
            "redo",
            "|",
            "bold",
            "italic",
            "link",
          ],
        },
        placeholder: "Type your content here.",
      },
    };
  },
  mounted() {
    this.load_sports();
    this.load_teams();
    this.load_leagues();
  },
  methods: {
    add() {
      http.post("/articles/", this.article).then((res) => {
        this.article.title = "";
        this.article.content = "";
        this.article.is_header = false;
      });
    },
    onEditorInput(data, event, editor) {
      this.article.title = editor.plugins.get("Title").getTitle();
      this.article.content = editor.plugins.get("Title").getBody();
      this.article.data = editor.getData();
    },
    load_sports() {
      http
        .get("/sports/")
        .then((res) => {
          this.sports = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    load_teams() {
      http
        .get("/teams/")
        .then((res) => {
          this.teams = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    load_leagues() {
      http
        .get("/leagues/")
        .then((res) => {
          this.leagues = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.ck-editor__editable {
  min-height: 400px;
}
</style>
