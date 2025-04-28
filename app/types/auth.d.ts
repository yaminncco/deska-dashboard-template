declare module '#auth-utils' {
  interface User {
    email: string
  }

  interface UserSession {
    loggedInAt: number
  }
}

export {}
