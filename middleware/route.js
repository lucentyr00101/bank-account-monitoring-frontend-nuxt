export default function ({ store }) {
  console.log(store.app.router)
  store.app.router.beforeEach((to, from, next) => {
    console.log(to)
    // if user navigates to root path
    if (to.fullPath === '/') {
      // if user is not authenticated, redirect to login
      if (!store.app.auth.isAuthenticated()) {
        next({
          path: '/login'
        })
      } else {
        // if user is authenticated redirect to home
        next({
          path: '/home'
        })
      }
    } else if (to.matched.some(component => component.meta.forVisitors)) {
      if (store.app.auth.isAuthenticated()) {
        next({
          path: '/home'
        })
      } else { next() }
    } else if (to.matched.some(component => component.meta.forAuth)) {
      if (!store.app.auth.isAuthenticated()) {
        next({
          path: '/login'
        })
      } else { next() }
    } else { next() }
  })
}
