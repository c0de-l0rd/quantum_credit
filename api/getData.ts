import {db} from '@/firebase-config'
import { ref, onValue } from 'firebase/database';

function GetData (){

    // Get a database reference to our posts
const DB = db;
const dbRef = ref(db, 'clients');


// Attach an asynchronous callback to read the data at our posts reference
onValue(dbRef, (snapshot) => {
    console.log(snapshot.val());
  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
  });
}  

export default GetData