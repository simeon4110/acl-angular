// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  oauthAuthorizeUrl: 'http://127.0.0.1:8080/oauth/authorize',
  oauthTokenUrl: 'http://127.0.0.1:8080/oauth/token',
  oauthCheckTokenUrl: 'http://127.0.0.1:8080/oauth/check_token',
  userDetailsUrl: 'http://127.0.0.1:8080/secure/user/user_details',
  apiBaseUrl: 'http://127.0.0.1:8080/',
  publicationPeriods: ['1300-1399', '1400-1499', '1500-1599', '1600-1699', '1700-1799', '1800-1899', '1900-1999', '2000-present'],
  poemForms: {
    'Sonnet': 'SONNET',
    'Free Verse': 'OPEN'
  },
  itemTypes: ['Poem', 'Book', 'Chapter / Section'],
  bookTypes: {
    'Fiction': 'FICTION',
    'Non-fiction': 'NON-FICTION',
    'Other': 'OTHER'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
