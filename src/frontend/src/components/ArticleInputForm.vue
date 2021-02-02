<template>
  <div class="container mt-4 my-2">
    <h3 v-if="article_id">Edit article</h3>
    <h3 v-else>Add new article</h3>
    <h4 class="mt-3">Category</h4>
    <div v-if="edit_category" class="d-flex justify-start">
      <v-select
        class="mr-2"
        :items="sports"
        name="sport-select"
        item-text="name"
        item-value="id_sport"
        v-model="article.sport_id"
        label="Sport"
        dense
        solo
      ></v-select>
      <v-select
        :items="teams"
        name="team-select"
        item-text="name"
        item-value="id_team"
        v-model="article.team_id"
        label="Team"
        dense
        solo
      ></v-select>
      <v-select
        class="ml-2"
        :items="leagues"
        name="league-select"
        item-text="name"
        item-value="id_league"
        v-model="article.league_id"
        label="League"
        dense
        solo
      ></v-select>
    </div>
    <div v-else class="d-flex justify-start">
      <v-select
        class="mr-2"
        :items="sports"
        name="sport-select"
        item-text="name"
        item-value="id_sport"
        v-model="article.sport_id"
        label="Sport"
        dense
        solo
      ></v-select>
      <v-select
        :items="teams"
        name="team-select"
        item-text="name"
        item-value="id_team"
        v-model="article.team_id"
        label="Team"
        dense
        solo
      ></v-select>
      <v-select
        class="ml-2"
        :items="leagues"
        name="league-select"
        item-text="name"
        item-value="id_league"
        v-model="article.league_id"
        label="League"
        dense
        solo
      ></v-select>
    </div>
    <h4>Content</h4>
    <div class="mb-2">
      <ckeditor
        v-if="article_id"
        tag-name="textarea"
        aria-label="With textarea"
        :editor="editor"
        :config="editorConfig"
        @ready="onEditorReady"
        @input="onEditorInput"
      ></ckeditor>
      <ckeditor
        v-else
        tag-name="textarea"
        aria-label="With textarea"
        :editor="editor"
        :config="editorConfig"
        @input="onEditorInput"
      ></ckeditor>
    </div>
    <div class="d-flex flex-row-reverse align-items-center">
      <v-btn v-if="article_id" elevation="1" @click="save" color="primary" class="mx-2" medium
        >Save Changes</v-btn
      >
      <v-btn v-else elevation="1" @click="add" color="primary" class="mx-2" medium
        >Publish</v-btn
      >
      <div class="d-flex flex-row-reverse align-items-center">
        <input
          class="mr-3 mb-1"
          type="checkbox"
          aria-label="Checkbox for following text input"
          v-model="article.is_headline"
        />
        <h6 class="mr-2">Headline</h6>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/http";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import EssentialsPlugin from "@ckeditor/ckeditor5-essentials/src/essentials";
import BoldPlugin from "@ckeditor/ckeditor5-basic-styles/src/bold";
import ItalicPlugin from "@ckeditor/ckeditor5-basic-styles/src/italic";
import LinkPlugin from "@ckeditor/ckeditor5-link/src/link";
import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Title from "@ckeditor/ckeditor5-heading/src/title.js";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
//import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
import UploadAdapter from "../uploadAdapter";
export default {
  props:['article_id'],
  components: {
    ClassicEditor,
  },
  data() {
    return {
      edit_category: false,
      defaultSelected: {
          id_sport: undefined
        },
      article: {
        id_author: undefined,
        title: "",
        content: "",
        data: "",
        thumbnail: "",
        sport_id: undefined,
        team_id: undefined,
        league_id: undefined,
        is_headline: false,
      },
      sports: undefined,
      teams: undefined,
      leagues: undefined,
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
        plugins: [
          Title,
          Heading,
          EssentialsPlugin,
          BoldPlugin,
          ItalicPlugin,
          LinkPlugin,
          ParagraphPlugin,
          Image,
          ImageUpload,
          Alignment
        ],
        extraPlugins: [this.uploader],
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
            "alignment",
            "|",
            "bold",
            "italic",
            "link",
            "imageUpload",
          ],
        }
      },
    };
  },
  mounted() {
    this.load_sports();
    this.load_teams();
    this.load_leagues();
  },
  methods: {
    uploader(editor) {
      editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return new UploadAdapter(loader);
      };
    },
    async onEditorReady(editor){
      await http.get('/articles/' + this.article_id)
      .then((response) => {
          const articles = response['data']
          this.article = articles[0]
      })
      .then(() => {
          this.article.sport_id = String(this.article.id_sport);
          this.article.league_id = String(this.article.id_league);
          this.article.team_id = String(this.article.id_team);
          this.edit_category = true;
          editor.setData( '<h1>'+ this.article.title + '</h1>' + this.article.content );
      })
    },
    save() {
      http.put("/articles/"+this.article.id_article, this.article).then((res) => {
        this.onListArticleMenuClick()
      });
    },
    add() {
      this.article.id_author = this.$store.state.authentication.identity.id
      const domparser = new DOMParser();
      let el = domparser.parseFromString(this.article.data, "text/html");
      try {
        this.article.thumbnail = el.getElementsByTagName("img")[0].src;
      } catch {
        this.article.thumbnail = "null";
      }

      http.post("/articles/", this.article).then((res) => {
        this.onListArticleMenuClick()
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
    onListArticleMenuClick() {
      if (this.$route.path !== "/dashboard/list_article")
        this.$router.push("/dashboard/list_article");
    },
  },
};
</script>

<style>
.ck-editor__editable {
  min-height: 400px;
}
</style>
