<template>
  <div id="container">
    <div
      v-if="
        this.$store.state.authentication.identity != undefined &&
          (favSports != null || favLeagues != null || favTeams != null)
      "
    >
      <div v-if="mappedArticlesSport != null">
        <div v-for="(item, index) in mappedArticlesSport" :key="index">
          <v-list dense class="container" width="auto">
            <h1
              id="title"
              class="h1 font-weight-light"
              :style="
                $vuetify.breakpoint.lg ? 'font-size:3vw' : 'font-size:5vw'
              "
            >
              {{ getSportName(item.id_sport) }}
            </h1>
            <v-list-item
              v-for="(article, id) in item.articles.slice(0, 2)"
              :key="id"
              ripple
              @click="onArticleClick(article.id_article, article.title)"
              class="tile"
              dense
              style="margin-bottom:1%"
            >
              <v-img
                class="rounded-sm"
                :src="article.thumbnail"
                style="margin-right:1%"
                :max-width="$vuetify.breakpoint.lg ? '30%' : '40%'"
              >
              </v-img>
              <v-list-item-content>
                <h1
                  v-text="article.title"
                  class="h4"
                  :style="
                    $vuetify.breakpoint.lg
                      ? 'font-size:1.5vw'
                      : 'font-size:2.5vw'
                  "
                ></h1>
                <p
                  v-if="$vuetify.breakpoint.lg"
                  class="font-weight-light white--text"
                  :style="'font-size:1vw'"
                >
                  {{ article.content | textPreview }}
                </p>
              </v-list-item-content>
            </v-list-item>
            <v-btn
              block
              dense
              rounded
              color="#FFCC00"
              dark
              @click="onLihatSemuaSportClick(item.id_sport)"
              :height="$vuetify.breakpoint.lg ? '2vw' : '4vw'"
            >
              <span
                id="lihatsemua"
                class="font-weight-light"
                :style="
                  $vuetify.breakpoint.lg ? 'font-size:1vw' : 'font-size:2vw'
                "
                >Lihat Semua</span
              >
            </v-btn>
            <hr />
          </v-list>
        </div>
      </div>
      <div v-if="mappedArticlesLeague.length != 0">
        <div v-for="(item, index) in mappedArticlesLeague" :key="index">
          <v-list dense class="container" width="auto">
            <h1
              id="title"
              class="h1 font-weight-light"
              :style="
                $vuetify.breakpoint.lg ? 'font-size:3vw' : 'font-size:5vw'
              "
            >
              {{ getLeagueName(item.id_league) }}
            </h1>
            <v-list-item
              v-for="(article, id) in item.articles.slice(0, 2)"
              :key="id"
              ripple
              @click="onArticleClick(article.id_article, article.title)"
              class="tile"
              dense
              style="margin-bottom:1%"
            >
              <v-img
                class="rounded-sm"
                :src="article.thumbnail"
                style="margin-right:1%"
                :max-width="$vuetify.breakpoint.lg ? '30%' : '40%'"
              >
              </v-img>
              <v-list-item-content>
                <h1
                  v-text="article.title"
                  class="h4"
                  :style="
                    $vuetify.breakpoint.lg
                      ? 'font-size:1.5vw'
                      : 'font-size:2.5vw'
                  "
                ></h1>
                <p
                  v-if="$vuetify.breakpoint.lg"
                  class="font-weight-light white--text"
                  :style="'font-size:1vw'"
                >
                  {{ article.content | textPreview }}
                </p>
              </v-list-item-content>
            </v-list-item>
            <v-btn
              block
              dense
              rounded
              color="#FFCC00"
              dark
              @click="onLihatSemuaLeagueClick(item.id_league)"
              :height="$vuetify.breakpoint.lg ? '2vw' : '4vw'"
            >
              <span
                id="lihatsemua"
                class="font-weight-light"
                :style="
                  $vuetify.breakpoint.lg ? 'font-size:1vw' : 'font-size:2vw'
                "
                >Lihat Semua</span
              >
            </v-btn>
            <hr />
          </v-list>
        </div>
      </div>
      <div v-if="mappedArticlesTeam != null">
        <div v-for="(item, index) in mappedArticlesTeam" :key="index">
          <v-list dense class="container" width="auto">
            <h1
              id="title"
              class="h1 font-weight-light"
              :style="
                $vuetify.breakpoint.lg ? 'font-size:3vw' : 'font-size:5vw'
              "
            >
              {{ getTeamName(item.id_team) }}
            </h1>
            <v-list-item
              v-for="(article, id) in item.articles.slice(0, 2)"
              :key="id"
              ripple
              @click="onArticleClick(article.id_article, article.title)"
              class="tile"
              dense
              style="margin-bottom:1%"
            >
              <v-img
                class="rounded-sm"
                :src="article.thumbnail"
                style="margin-right:1%"
                :max-width="$vuetify.breakpoint.lg ? '30%' : '40%'"
              >
              </v-img>
              <v-list-item-content>
                <h1
                  v-text="article.title"
                  class="h4"
                  :style="
                    $vuetify.breakpoint.lg
                      ? 'font-size:1.5vw'
                      : 'font-size:2.5vw'
                  "
                ></h1>
                <p
                  v-if="$vuetify.breakpoint.lg"
                  class="font-weight-light white--text"
                  :style="'font-size:1vw'"
                >
                  {{ article.content | textPreview }}
                </p>
              </v-list-item-content>
            </v-list-item>
            <v-btn
              block
              dense
              rounded
              color="#FFCC00"
              dark
              @click="onLihatSemuaTeamClick(item.id_league)"
              :height="$vuetify.breakpoint.lg ? '2vw' : '4vw'"
            >
              <span
                id="lihatsemua"
                class="font-weight-light"
                :style="
                  $vuetify.breakpoint.lg ? 'font-size:1vw' : 'font-size:2vw'
                "
                >Lihat Semua</span
              >
            </v-btn>
            <hr />
          </v-list>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-for="(item, index) in mapped" :key="index">
        <v-list dense class="container" width="auto">
          <h1
            id="title"
            class="h1 font-weight-light"
            :style="$vuetify.breakpoint.lg ? 'font-size:3vw' : 'font-size:5vw'"
          >
            {{ getLeagueName(item.id_league) }}
          </h1>
          <v-list-item
            v-for="(article, id) in item.articles.slice(0, 2)"
            :key="id"
            ripple
            @click="onArticleClick(article.id_article, article.title)"
            class="tile"
            dense
            style="margin-bottom:1%"
          >
            <v-img
              class="rounded-sm"
              :src="article.thumbnail"
              style="margin-right:1%"
              :max-width="$vuetify.breakpoint.lg ? '30%' : '40%'"
            >
            </v-img>
            <v-list-item-content>
              <h1
                v-text="article.title"
                class="h4"
                :style="
                  $vuetify.breakpoint.lg ? 'font-size:1.5vw' : 'font-size:2.5vw'
                "
              ></h1>
              <p
                v-if="$vuetify.breakpoint.lg"
                class="font-weight-light white--text"
                :style="'font-size:1vw'"
              >
                {{ article.content | textPreview }}
              </p>
            </v-list-item-content>
          </v-list-item>
          <v-btn
            block
            dense
            rounded
            color="#FFCC00"
            dark
            @click="onLihatSemuaClick(item.id_league)"
            :height="$vuetify.breakpoint.lg ? '2vw' : '4vw'"
          >
            <span
              id="lihatsemua"
              class="font-weight-light"
              :style="
                $vuetify.breakpoint.lg ? 'font-size:1vw' : 'font-size:2vw'
              "
              >Lihat Semua</span
            >
          </v-btn>
          <hr />
        </v-list>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/http";

export default {
  name: "Thumbnail",
  props: ["articles"],
  data() {
    return {
      sports: [],
      leagues: [],
      teams: [],
      mapped: [],
      images: [],
      favSports: [],
      favLeagues: [],
      favTeams: [],
      mappedArticlesSport: [],
      mappedArticlesLeague: [],
      mappedArticlesTeam: [],
    };
  },
  methods: {
    getSportName(id) {
      var i = 0;
      while (i < this.sports.length) {
        if (this.sports[i].id_sport == id) {
          return this.sports[i].name;
        }
        i++;
      }
    },
    getLeagueName(id) {
      var i = 0;
      while (i < this.leagues.length) {
        if (this.leagues[i].id_league == id) {
          return this.leagues[i].name;
        }
        i++;
      }
    },
    getTeamName(id) {
      var i = 0;
      while (i < this.teams.length) {
        if (this.teams[i].id_team == id) {
          return this.teams[i].name;
        }
        i++;
      }
    },
    onArticleClick(id, title) {
      title = title.replace(/-|;|,|:|'|"|’|‘|“|”/g, '');
      title = title.replace(/\s+/g, '-');
      if (this.$route.path !== "/article/" + id + "/" + title) {
        this.$router.push("/article/" + id + "/" + title);
        this.$router.go();
      }
    },
    onLihatSemuaClick(id) {
      if (this.$route.path !== "/articles/league/" + id) {
        this.$router.push("/articles/league/" + id);
        this.$router.go();
      }
    },
    onLihatSemuaSportClick(id) {
      if (this.$route.path !== "/articles/sport/" + id) {
        this.$router.push("/articles/sport/" + id);
        this.$router.go();
      }
    },
    onLihatSemuaLeagueClick(id) {
      if (this.$route.path !== "/articles/league/" + id) {
        this.$router.push("/articles/league/" + id);
        this.$router.go();
      }
    },
    onLihatSemuaTeamClick(id) {
      if (this.$route.path !== "/articles/team/" + id) {
        this.$router.push("/articles/team/" + id);
        this.$router.go();
      }
    },
  },
  async mounted() {
    await http.get("/sports").then((response) => {
      this.sports = response["data"];
    });
    await http.get("/leagues").then((response) => {
      this.leagues = response["data"];
    });
    await http.get("/teams").then((response) => {
      this.teams = response["data"];
    });
    if (this.$store.state.authentication.identity != undefined) {
      var id = this.$store.state.authentication.identity.id;
      await http.get("/fav-sports/" + id).then((response) => {
        this.favSports = response["data"];

        if (this.favSports.length != 0) {
          let temp = new Array();
          var i = 0,
            j = 0;

          while (i < this.favSports.length) {
            while (j < this.articles.length) {
              if (this.favSports[i].sport_id == this.articles[j].id_sport) {
                temp.push(this.articles[j]);
              }
              j++;
            }

            if (temp.length > 0) {
              var obj = new Object();
              obj.id_sport = this.favSports[i].sport_id;
              obj.articles = temp;
              this.mappedArticlesSport.push(obj);
              temp = new Array();
            }

            i++;
            j = 0;
          }
        }
      });

      await http.get("/fav-leagues/" + id).then((response) => {
        this.favLeagues = response["data"];

        if (this.favLeagues.length != 0) {
          let temp = new Array();
          var i = 0,
            j = 0;

          while (i < this.favLeagues.length) {
            while (j < this.articles.length) {
              if (this.favLeagues[i].league_id == this.articles[j].id_league) {
                temp.push(this.articles[j]);
              }
              j++;
            }

            if (temp.length > 0) {
              var obj = new Object();
              obj.id_league = this.favLeagues[i].league_id;
              obj.articles = temp;
              this.mappedArticlesLeague.push(obj);
              temp = new Array();
            }

            i++;
            j = 0;
          }
        }
      });

      await http.get("/fav-teams/" + id).then((response) => {
        this.favTeams = response["data"];

        if (this.favTeams.length != 0) {
          let temp = new Array();
          var i = 0,
            j = 0;

          while (i < this.favTeams.length) {
            while (j < this.articles.length) {
              if (this.favTeams[i].team_id == this.articles[j].id_team) {
                temp.push(this.articles[j]);
              }
              j++;
            }

            if (temp.length > 0) {
              var obj = new Object();
              obj.id_team = this.favTeams[i].team_id;
              obj.articles = temp;
              this.mappedArticlesTeam.push(obj);
              temp = new Array();
            }

            i++;
            j = 0;
          }
        }
      });
    } else {
      let temp = new Array();
      var i = 0,
        j = 0;

      while (i < this.leagues.length) {
        while (j < this.articles.length) {
          if (this.leagues[i].id_league == this.articles[j].id_league) {
            temp.push(this.articles[j]);
          }
          j++;
        }

        if (temp.length > 0) {
          var obj = new Object();
          obj.id_league = this.leagues[i].id_league;
          obj.articles = temp;
          this.mapped.push(obj);
          temp = new Array();
        }

        i++;
        j = 0;
      }
    }
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
  margin-bottom: 0.1%;
  border-style: inset;
  border-width: 1px;
}

#lihatsemua {
  color: black;
}
</style>
