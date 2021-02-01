import Vue from 'vue'
import VueRouter from 'vue-router'
import Tv from '../views/Tv.vue'
import Music from '../views/Music.vue'
import Book from '../views/Book.vue'
import Chat from '../views/Chat.vue'
import TvDetails from '../views/TvDetails.vue'


Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Tv', component: Tv },
  { path: '/music', name: 'Music', component: Music },
  { path: '/book', name: 'Book', component: Book },
  { path: '/chat', name: 'Chat', component: Chat },
  { path: '/tvDetails/:id', name: 'TvDetails', component: TvDetails },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
