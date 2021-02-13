import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Gallery from '../components/Gallery.vue'
import ArticleInputForm from '../components/ArticleInputForm.vue'
import ArticleList from '../components/ArticleList.vue'
import CategoriesPage from '../components/CategoriesPage.vue'
import Stats from '../components/Dashboard.vue'
import MainPage from '../views/MainPage.vue'
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
        //Lazy loaded when route is visited
        component: () => import(/* webpackChunkName : main_page_component*/"../components/MainPage.vue")
      },
      {
        path: 'articles/league/:id_league',
        name: 'league_articles',
        //Lazy loaded when route is visited
        component: () => import(/* webpackChunkName : league_articles*/"../components/ArticlesLeague.vue"),
        props: true
      },
      {
        path: 'articles/sport/:id_sport',
        name: 'sport_articles',
        //Lazy loaded when route is visited
        component: () => import(/* webpackChunkName : articles_sport*/"../components/ArticlesSport.vue"),
        props: true
      },
      {
        path: 'articles/team/:id_team',
        name: 'team_articles',
        //Lazy loaded when route is visited
        component: () => import(/* webpackChunkName : articles_sport*/"../components/ArticlesTeam.vue"),
        props: true
      },
      {
        path: 'article/:id_article/:title',
        name: 'news_page',
        //Lazy loaded when route is visited
        component: () => import(/* webpackChunkName : news_page*/"../views/NewsPage.vue"),
        props: true
      },
      {
        path: 'profile',
        name: 'profile_page',
        //Lazy loaded when route is visited
        component: () => import(/* webpackChunkName : profile*/"../components/Profile.vue"),
        props: true,
      },
      {
        path: 'profile/add_edit_favorite',
        name: 'addeditfavorite',
        //Lazy loaded when route is visited
        component: () => import(/* webpackChunkName : addEditFav*/"../components/AddEditFav.vue"),
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
