import {
  createRouter,
  createWebHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title:  'PoliWeb ToDo-App'
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        title:  'About Me'
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: {
        title:  'Contact'
      }
    },
    {
      path: '/thanks',
      name: 'thanks',
      component: () => import('../views/thanks.vue'),
      meta: {
        title:  'Thanks! Your email has been sent!'
      }
    }
  ],

  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },

})
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`,
  next()
})

export default router