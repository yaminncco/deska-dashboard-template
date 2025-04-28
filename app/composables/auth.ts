export const useAuth = () => {
  const { loggedIn: isLoggedIn, user, session, clear: logout, fetch: refreshSession } = useUserSession()

  const login = async (credentials: { email: string, password: string }) => {
    await $fetch('/api/login', {
      method: 'POST',
      body: {
        email: credentials.email,
        password: credentials.password,
      },
    })
    await refreshSession()
  }

  return {
    isLoggedIn,
    user,
    session,
    refreshSession,
    login,
    logout,
  }
}
