// Firebase配置
const firebaseConfig = {
    apiKey: "AIzaSyCyV8vMvkv6WvIe8rDU3-vOAPnCk1Zc_OM",
    authDomain: "getphonehub.firebaseapp.com",
    databaseURL: "https://getphonehub-default-rtdb.firebaseio.com",
    projectId: "getphonehub",
    storageBucket: "getphonehub.firebasestorage.app",
    messagingSenderId: "829298237948",
    appId: "1:829298237948:web:2f9db3ab8ce11779589279",
};

// 初始化Firebase
firebase.initializeApp(firebaseConfig);

// 获取Auth和Database实例
const auth = firebase.auth();
const database = firebase.database();