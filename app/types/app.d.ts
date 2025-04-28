declare module '#app' {
  interface PageMeta {
    /** Whether to allow anyone to access the page */
    public?: boolean
    /** Whether to allow only unauthenticated users to access the page */
    guest?: boolean
  }
}

export {}
