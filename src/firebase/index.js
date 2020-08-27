import firebase from 'firebase/app'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyC-08IKTznOguvv0pWghfBrnTmVaho6fP4",
    authDomain: "padfinder.firebaseapp.com",
    databaseURL: "https://padfinder.firebaseio.com",
    projectId: "padfinder",
    storageBucket: "padfinder.appspot.com",
    messagingSenderId: "499309295701",
    appId: "1:499309295701:web:525fb58643ee43d911bcdc",
    measurementId: "G-FHD61Z5C8E"
  };

firebase.initializeApp(firebaseConfig);

//create a reference to the storage service.    
const storage = firebase.storage();

export { storage, firebase as default }