import getUserFromCookie from '~/helpers/getUserFromCookie'

// Middleware to block users to access page while authenticated
export default function ({ req, redirect }) {
  const user = getUserFromCookie(req)
  if (user) {
    return redirect('/recipes')
  }
}
