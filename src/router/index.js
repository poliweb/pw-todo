import {
  createRouter,
  createWebHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/404.vue';



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
      path: '/devto',
      name: 'devto',
      component: () => import('../views/DevtoView.vue'),
      meta: {
        title:  'Articles Dev To'
      }
    },
    {
      path: '/about',
      name: 'about',
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
      path: '/:userId', // Динамический маршрут с параметрами `userId`
      name: 'UserDetail',
      component: () => import('../views/username/index.vue'),
      props: true,
      meta: {
        title:  'User Detail'
      }
    },
    {
      path: '/:userId/:postId', // Динамический маршрут с параметрами `userId` и `postId`
      name: 'PostDetail',
      component: () => import('../views/username/PostDetailView.vue'),
      props: true,
      meta: {
        title:  'Post Detail'
      }
    },
    {
      path: '/tag/:tagId', // Динамический маршрут с параметрами `userId` и `postId`
      name: 'TagDetail',
      component: () => import('../views/tag/TagArticlesView.vue'),
      props: true,
      meta: {
        title:  'Tag Detail'
      }
    },
    {
      path: '/thanks',
      name: 'thanks',
      component: () => import('../views/thanks.vue'),
      meta: {
        title:  'Thanks! Your email has been sent!'
      }
    },
   
    // { path: '/error', name: 'ErrorPage', component: ErrorPage, meta: { title: 'ERROR!' } },
    { path: '/404', name: 'NotFound', component: NotFound, meta: { title: '404 - Page Not Found' } },
  ],

  // Настраиваем поведение прокрутки
  scrollBehavior(to, from, savedPosition) {
    // Если есть сохранённая позиция (например, при использовании кнопки "назад")
    if (savedPosition) {
      return savedPosition;
    } else {
      // Всегда прокручиваем в начало
      return { top: 0 };
    }
  },
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`,
  next()
})

export default router