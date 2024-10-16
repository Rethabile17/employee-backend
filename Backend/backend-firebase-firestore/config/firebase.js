const {initializeApp , getApps} = require('firebase/app') ;
require ("dotenv").config() ;
const {getFirestore} =  require('firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyDE_DDwatEUUXWU-USM6pAMqgiESE5TQik",
  authDomain: "employeeregistrationwithnodejs.firebaseapp.com",
  projectId: "employeeregistrationwithnodejs",
  storageBucket: "employeeregistrationwithnodejs.appspot.com",
  messagingSenderId: "721174694713",
  appId: "1:721174694713:web:e7211282527507a8b436e8"
};
 
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const  db =  getFirestore(app) ;

module.exports =  {
    db 
}