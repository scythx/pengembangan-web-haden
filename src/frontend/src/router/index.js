import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Gallery from '../components/Gallery.vue'
import ArticleInputForm from '../components/ArticleInputForm.vue'
import ArticleList from '../components/ArticleList.vue'
import CategoriesPage from '../components/CategoriesPage.vue'
import Stats from '../components/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: 'gallery',
        component: Gallery
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
        path : 'home',
        component: Stats
      },
      {
        path : 'gallery',
        component : Gallery
      },
      {
        path: '/stats',
        component : Stats
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
