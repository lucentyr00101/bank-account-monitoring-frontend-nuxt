export default function ({ app, route, redirect }) {
  const path = route.fullPath
  console.log(route)
  if (path === '/') {
    // if user is not authenticated, redirect to login
    if (!app.auth.isAuthenticated()) {
      redirect({
        path: '/login'
      })
    } else {
      // if user is authenticated redirect to home
      redirect({
        path: '/home'
      })
    }
  } else if (route.matched[0].meta.forVisitors) {
    if (app.auth.isAuthenticated()) {
      redirect({
        path: '/home'
      })
    }
  } else if (route.matched[0].meta.forAuth) {
    if (!app.auth.isAuthenticated()) {
      redirect({
        path: '/login'
      })
    }
  }
}
