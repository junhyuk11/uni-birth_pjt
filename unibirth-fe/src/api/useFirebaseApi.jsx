import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getDatabase, ref, push, onChildAdded, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCyOsqoZjmx3f75EIqqrrcFQrN2XsDZbeQ",
  authDomain: "uni-birth.firebaseapp.com",
  databaseURL: "https://uni-birth-default-rtdb.firebaseio.com",
  projectId: "uni-birth",
  storageBucket: "uni-birth.appspot.com",
  messagingSenderId: "157033568661",
  appId: "1:157033568661:web:bf12dbf7828658a87c3e9c",
  measurementId: "G-914K1QHY2Y",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const database = getDatabase(app);

function sendMessage(message, sender) {
  const chatRef = ref(database, "chats");
  const newMessageRef = push(chatRef);

  const messageData = {
    text: message,
    sender: sender,
    timestamp: Date.now(),
  };

  set(newMessageRef, messageData);
}

function listenForMessages(callback) {
  const chatRef = ref(database, "chats");
  const offChildAdded = onChildAdded(chatRef, (snapshot) => {
    const newMessage = snapshot.val();
    callback(newMessage);
  });

  return () => {
    offChildAdded();
  };
}

export { app, analytics, storage, database, sendMessage, listenForMessages };
