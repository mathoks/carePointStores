

export const authConfig = {
    basePath: "/api/auth",
    debug: process.env.NODE_ENV !== "production" ? true : false,
    pages: {
      signIn: "/login",
    },
       
  }