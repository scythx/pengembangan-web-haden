<template>
  <div id="container">
    <v-list dense class="container" color="#222831" width="auto">
      <hr />
      <h1
        class="h1 font-weight-light"
        :style="$vuetify.breakpoint.lg ? 'font-size:3vw' : 'font-size:5vw'"
      >
        Top Headlines
      </h1>
      <v-row dense class="mx-0">
        <v-col
          v-for="(item, index) in articles.slice(0, 5)"
          :key="index"
          cols="12"
        >
          <v-card color="rgb(0, 0, 0, 0)" outlined @click="onArticleClick(item.id_article, item.title)">
            <div id="headline" class="d-flex flex-no-wrap justify-space-between">
              <div class="ma-2 my-3">
                <h1
                  class="h4"
                  :style="
                    $vuetify.breakpoint.lg
                      ? 'font-size:1.5vw'
                      : 'font-size:2.5vw'
                  "
                >
                  {{ item.title | title }}
                </h1>
                <h1
                  class="h4 font-weight-light"
                  :style="
                    $vuetify.breakpoint.lg
                      ? 'font-size:1.3vw'
                      : 'font-size:2.3vw'
                  "
                >
                  {{ item.content | textPreview }}
                </h1>
              </div>
              <v-img
                class="rounded-sm"
                :src="item.thumbnail"
                style="margin:1%;"
                :max-width="$vuetify.breakpoint.lg ? '30%' : '40%'"
              >
              </v-img>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <hr />
    </v-list>
  </div>
</template>

<script>
import http from "@/http";

export default {
  props: ["articles"],
  data() {
    return {
      //        images:[],
      attrs: {
        boilerplate: true,
        elevation: 2,
      },
      items: [
        {
          color: "#1F7087",
          src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          title: "Supermodel",
          artist: "Foster the People",
        },
        {
          color: "#952175",
          src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
          title: "Halcyon Days",
          artist: "Ellie Goulding",
        },
      ],
    };
  },
  methods: {
    onArticleClick(id, title) {
      title = title.replace(/-|;|,|:|'|"|’|‘|“|”/g, '');
      title = title.replace(/\s+/g, '-');
      if (this.$route.path !== "/article/" + id + "/" + title) {
        this.$router.push("/article/" + id + "/" + title);
        this.$router.go();
      }
    }
  },
  mounted() {
    const domparser = new DOMParser();
    let el = domparser.parseFromString(this.articles, "text/html");
    //    http.get('/images')
    //      .then((response) => {
    //        this.images = response['data']
    //    })
  },
};
</script>

<style scoped>
#container,
.container,
.tile {
  background: #222831;
}
.tile:hover {
  background: #203e5f;
}

h1,
.display-2 {
  color: #ffffff;
}

hr {
  display: block;
  margin-top: 1%;
  margin-bottom: 1%;
  border-style: inset;
  border-width: 1px;
}

#headline:hover {
  background-color: #203e5f;
}

</style>