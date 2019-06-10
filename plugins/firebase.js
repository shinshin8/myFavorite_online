import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyCDrP9PapjmgmekBjk6qhYSgxBj3pz-gQQ',
    authDomain: 'myfavoriteonline.firebaseapp.com',
    databaseURL: 'https://myfavoriteonline.firebaseio.com',
    projectId: 'myfavoriteonline',
    storageBucket: 'myfavoriteonline.appspot.com',
    messagingSenderId: '205755853082',
    appId: '1:205755853082:web:80a840c92bb5d0f3'
  })
}

export default firebase
