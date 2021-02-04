import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Gallery from '../components/Gallery.vue'
import ArticleInputForm from '../components/ArticleInputForm.vue'
import ArticleList from '../components/ArticleList.vue'
import CategoriesPage from '../components/CategoriesPage.vue'
import Stats from '../components/Dashboard.vue'
import MainPage from '../views/MainPage.vue'
import MainPageComponent from '../components/MainPage.vue'
import ArticlesLeague from '../components/ArticlesLeague.vue'
import ArticlesSport from '../components/ArticlesSport.vue'
import ArticlesTeam from '../components/ArticlesTeam.vue'
import NewsPage from '../views/NewsPage.vue'
import Profile from '../components/Profile.vue'
import AddEditFav from '../components/AddEditFav.vue'
import store from '../store/'
import VueMeta from 'vue-meta';

Vue.use(VueRouter)
Vue.use(VueMeta)

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: '',
        name: 'dashboard_status',
        component: Stats
      },
      {
        path: '/dashboard/add_article',
        name: 'add_article',
        component: ArticleInputForm,
        props: true
      },
      {
        path: '/dashboard/edit_article/:article_id',
        name: 'edit_article',
        component: ArticleInputForm,
        props: true
      },
      {
        path: '/dashboard/list_article',
        name: 'list_article',
        component: ArticleList,
        children: [
          {
            path: '/dashboard/add_article',
            component: ArticleInputForm
          },
          {
            path: '/dashboard/edit_article/:article_id',
            component: ArticleInputForm,
          },
        ]
      },
      {
        path: 'categories',
        component: CategoriesPage
      },
      {
        path: 'gallery',
        component: Gallery
      }
    ]
  },
  {
    path: '',
    name: 'main_page',
    component: MainPage,
    children: [
      {
        path: '',
        name: 'main_page_component',
        component: MainPageComponent
      },
      {
        path: 'articles/league/:id_league',
        name: 'league_articles',
        component: ArticlesLeague,
        props: true
      },
      {
        path: 'articles/sport/:id_sport',
        name: 'sport_articles',
        component: ArticlesSport,
        props: true
      },
      {
        path: 'articles/team/:id_team',
        name: 'team_articles',
        component: ArticlesTeam,
        props: true
      },
      {
        path: 'article/:id_article/:title',
        name: 'news_page',
        component: NewsPage,
        props: true
      },
      {
        path: 'profile',
        name: 'profile_page',
        component: Profile,
        props: true,
      },
      {
        path: 'profile/add_edit_favorite',
        name: 'addeditfavorite',
        component: AddEditFav,
        props: true
      }
    ]
  },
  {
    path: '/login',
    component: () => import(
      /* webpackChunkName: "login" */
      '../views/Login.vue')
  },
  {
    path: '/register',
    component: () => import(
      /* webpackChunkName: "register" */
      '../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
