export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useAuth()

  // Skip auth check for login page and public routes
  const publicRoutes = ['/login']
  if (publicRoutes.includes(to.path)) {
    return
  }

  // Redirect to login if not authenticated
  if (!isLoggedIn.value) {
    return navigateTo('/login')
  }
})