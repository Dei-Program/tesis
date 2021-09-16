importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

firebase.initializeApp(
    {
        apiKey: 'AIzaSyB-_gZ7BZO8MnZIPtbf6W8mn5mSsnmJqec',
        authDomain: 'guardias-8683b.firebaseapp.com',
        projectId: 'guardias-8683b',
        storageBucket: 'guardias-8683b.appspot.com',
        messagingSenderId: '123851671896',
        appId: '1:123851671896:web:b175a1e1e9cb3391803d2d',
        measurementId: 'G-4BP9HFVK0B'}
)
const messaging = firebase.messaging(firebase);