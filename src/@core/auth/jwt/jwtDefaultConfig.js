// ** Auth Endpoints
export default {
  // loginEndpoint: '/jwt/login',
  // registerEndpoint: '/jwt/register',
  // refreshEndpoint: '/jwt/refresh-token',
  // logoutEndpoint: '/jwt/logout',

  loginEndpoint: `${process.env.REACT_APP_BASE_URL}/jwt/login`,
  registerEndpoint: `${process.env.REACT_APP_BASE_URL}/jwt/register`,
  refreshEndpoint: `${process.env.REACT_APP_BASE_URL}/jwt/refresh-token`,
  logoutEndpoint: '/jwt/logout',

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}
