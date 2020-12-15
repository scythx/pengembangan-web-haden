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
import ThumbnailDetail from '../components/ThumbnailDetail'

Vue.use(VueRouter)

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
        component: ArticleInputForm
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
        name: 'thumbnail_detail',
        component: ThumbnailDetail,
        props: true
      }
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
