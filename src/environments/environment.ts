// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Initialize Firebase
  firebase: {
    apiKey: "AIzaSyBd_4q-q5Lvfnb1f8J5dRdZBtpBltyb5LQ",
    authDomain: "test1-28e5f.firebaseapp.com",
    databaseURL: "https://test1-28e5f.firebaseio.com",
    projectId: "test1-28e5f",
    storageBucket: "test1-28e5f.appspot.com",
    messagingSenderId: "285761751675"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
