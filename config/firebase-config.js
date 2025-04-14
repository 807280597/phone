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
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// 设置全局变量
window.auth = firebase.auth();
window.database = firebase.database();
// 获取Auth和Database实例
const auth = firebase.auth();
const database = firebase.database();

// 导出实例供其他文件使用
window.firebaseAuth = auth;
window.firebaseDatabase = database;
// 创建messages节点（如果不存在）
database.ref('messages').once('value')
    .then((snapshot) => {
        if (!snapshot.exists()) {
            database.ref('messages').set({
                created: new Date().toISOString()
            });
        }
    });