export const environment = {
  production: true,
  baseDomain: 'acriticismlab.org',
  oauthAuthorizeUrl: 'https://api.acriticismlab.org/oauth/authorize',
  oauthTokenUrl: 'https://api.acriticismlab.org/oauth/token',
  oauthCheckTokenUrl: 'https://api.acriticismlab.org/oauth/check_token',
  userDetailsUrl: 'https://api.acriticismlab.org/secure/user/user_details',
  apiBaseUrl: 'https://api.acriticismlab.org/',
  publicationPeriods: ['1300-1399', '1400-1499', '1500-1599', '1600-1699', '1700-1799', '1800-1899', '1900-1999', '2000-present'],
  poemForms: {
    'Sonnet': 'SONNET',
    'Free Verse': 'OPEN'
  },
  itemTypes: ['Poem', 'Book', 'Chapter / Section', 'Short Story'],
  bookTypes: {
    'Fiction': 'FICTION',
    'Non-fiction': 'NON-FICTION',
    'Other': 'OTHER'
  }
};
