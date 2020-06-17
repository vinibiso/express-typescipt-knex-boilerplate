// Change in production
const BASE_URL = 'http://localhost:3333';
const STATIC_BASE = '/static';
const STATIC_URL = `${BASE_URL}${STATIC_BASE}/`;
// JWT Confit
const JWT_SECRET = '6ce200bf4bc7b8240352131bbcf0859b';
const JWT_EXPIRES_IN = 86400; // Default to 24hours in seconds

export {
  BASE_URL,
  STATIC_BASE,
  STATIC_URL,
  JWT_SECRET,
  JWT_EXPIRES_IN,
};
