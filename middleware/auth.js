import getUserFromCookie from '~/helpers/getUserFromCookie'

// Middleware to block unauthorized users to access certain pages
export default function ({ req, redirect }) {
  const user = getUserFromCookie(req)
  if (!user) {
    return redirect('/login')
  }
}
