export default function (context) {
  context.app.router.beforeEach(
    (to, from, next) => {
      // if user navigates to root path
      if (to.fullPath === '/') {
        // if user is not authenticated, redirect to login
        if (!context.app.auth.isAuthenticated()) {
          next({
            name: 'login'
          })
        } else {
          // if user is authenticated redirect to home
          next({
            name: 'home'
          })
        }
      } else if (to.matched.some(component => component.meta.forVisitors)) {
        if (context.app.auth.isAuthenticated()) {
          next({
            name: 'home'
          })
        } else { next() }
      } else if (to.matched.some(component => component.meta.forAuth)) {
        if (!context.app.auth.isAuthenticated()) {
          next({
            name: 'login'
          })
        } else { next() }
      } else { next() }
    }
  )
}
