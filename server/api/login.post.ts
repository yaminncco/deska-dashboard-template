import { z } from 'zod'

interface DBUser {
  id: number
  email: string
  password: string
}

const invalidCredentialsError = createError({
  statusCode: 401,
  message: 'Invalid email or password',
})

export default defineEventHandler(async (event) => {
  const db: DBUser[] = [
    {
      id: 1,
      email: 'test123@gmail.com',
      password: '$scrypt$n=16384,r=8,p=1$cV/FTWRsMXaqO3Cd50qxBQ$vJScfKwKoAuTtQ0bqKrxi5neGM0jjhZKUp7REEL2mPob7wPKXcBhT+oPcW7bRyB4d9S9s87pwpROVCzPiQZcrg', // password
    },
  ]

  const { success, data } = await readValidatedBody(event, z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }).safeParse)

  if (!success) {
    throw createError({
      statusCode: 400,
      message: 'Validation Failed!',
    })
  }

  const { email, password } = data

  const user = db.find(user => user.email === email)

  if (!user) {
    throw invalidCredentialsError
  }

  if (!(await verifyPassword(user.password, password))) {
    throw invalidCredentialsError
  }

  await setUserSession(event, {
    user: {
      email,
    },
    loggedInAt: Date.now(),
  })

  return setResponseStatus(event, 201)
})
