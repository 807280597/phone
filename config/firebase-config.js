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

// 默认进行匿名登录以获取数据库访问权限
auth.signInAnonymously()
  .then(() => {
    console.log('匿名登录成功，已获取数据库访问权限');
  })
  .catch((error) => {
    console.error('匿名登录失败:', error);
  });