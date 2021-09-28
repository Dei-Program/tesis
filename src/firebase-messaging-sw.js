importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

firebase.initializeApp(
    {
        apiKey: 'AIzaSyA3ZXilF3LDc7uuWCKJI5mgY6DAJvorGPs',
        authDomain: 'tactile-phalanx-327320.firebaseapp.com',
        projectId: 'tactile-phalanx-327320',
        storageBucket: 'tactile-phalanx-327320.appspot.com',
        messagingSenderId: '206492351216',
        appId: '1:206492351216:web:1ca33bb903a4396f392035',
        measurementId: 'G-NJHHNWP0MJ'
        /*
        ANTERIOR FIREBASE
        apiKey: 'AIzaSyB-_gZ7BZO8MnZIPtbf6W8mn5mSsnmJqec',
        authDomain: 'guardias-8683b.firebaseapp.com',
        projectId: 'guardias-8683b',
        storageBucket: 'guardias-8683b.appspot.com',
        messagingSenderId: '123851671896',
        appId: '1:123851671896:web:b175a1e1e9cb3391803d2d',
        measurementId: 'G-4BP9HFVK0B'*/}
)
const messaging = firebase.messaging(firebase);