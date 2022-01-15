import jwtDecode from 'jwt-decode'
const cookieparser = require('cookieparser')

// a small helper to parse cookie/decode cookie and get user info
export default function (req) {
  if (process.server && process.static) {
    return
  }
  if (!req.headers.cookie) {
    return
  }
  if (req.headers.cookie) {
    const parsedCookies = cookieparser.parse(req.headers.cookie)
    const accessTokenCookie = parsedCookies.access_token
    if (!accessTokenCookie) {
      return
    }
    const decodedToken = jwtDecode(accessTokenCookie)
    if (!decodedToken) {
      return
    }
    return decodedToken
  }
}
