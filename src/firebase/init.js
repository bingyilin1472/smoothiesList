// firebase各項服務產品都可以在他的module資料夾裡面看到
// 譬如auth、app、database、firestore ...
// 譬如要auth大概就是import auth from 'firebase/auth'
import firebase from "firebase"
import 'firebase/firestore'

//
const firebaseConfig = {
  apiKey: "AIzaSyB1JgkHfwe16_YaberaTKyTKax-wsJaAv0",
  authDomain: "smoothies-list-811ab.firebaseapp.com",
  databaseURL: "https://smoothies-list-811ab.firebaseio.com",
  projectId: "smoothies-list-811ab",
  storageBucket: "smoothies-list-811ab.appspot.com",
  messagingSenderId: "963886914524",
  appId: "1:963886914524:web:e3b0a398107acdf593cd19",
  measurementId: "G-CHH3M4HLWY"
};

// 初始化服務應用，並保存到常數const firebaseApp之中
const firebaseApp = firebase.initializeApp(firebaseConfig)
// export firestore database，這樣我們才能interactive with the database
// 因為希望於指定的component呼叫firestore，以export default
// 讓他能被引入，被任意assign給任何一個名稱的variable
export default firebaseApp.firestore()
