export default defineNuxtRouteMiddleware(async (to) => {
  const { isLoggedIn } = useAuth()

  // Allow access to public routes
  if (to.meta.public) {
    return
  }

  // Redirect logged-in users away from guest-only pages
  if (to.meta.guest && isLoggedIn.value) {
    // make sure '/' is not a guest route to avoid infinite loop
    return navigateTo('/')
  }

  // Redirect unauthenticated users to the sign-in page for protected routes
  if (!to.meta.guest && !isLoggedIn.value) {
    return navigateTo('/auth/signin')
  }
})
