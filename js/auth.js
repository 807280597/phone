// 用户认证相关API
const authAPI = {
    // 用户登录
    login: async function(account, password) {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ account, password }),
                credentials: 'include' // 包含cookies
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || '登录失败');
            }
            
            return await response.json();
        } catch (error) {
            console.error('登录请求失败:', error);
            throw error;
        }
    },
    
    // 用户注册
    register: async function(account, password) {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ account, password }),
                credentials: 'include'
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || '注册失败');
            }
            
            return await response.json();
        } catch (error) {
            console.error('注册请求失败:', error);
            throw error;
        }
    },
    
    // 用户退出
    logout: async function() {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                credentials: 'include'
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || '退出失败');
            }
            
            return await response.json();
        } catch (error) {
            console.error('退出请求失败:', error);
            throw error;
        }
    },
    
    // 获取用户信息
    getUserInfo: async function() {
        try {
            const response = await fetch('/api/user/profile', {
                method: 'GET',
                credentials: 'include'
            });
            
            if (!response.ok) {
                if (response.status === 401) {
                    // 未登录状态
                    return null;
                }
                const error = await response.json();
                throw new Error(error.message || '获取用户信息失败');
            }
            
            return await response.json();
        } catch (error) {
            console.error('获取用户信息失败:', error);
            return null;
        }
    }
};

// 修改登录处理函数
async function handleLogin(event) {
    event.preventDefault();
    const account = document.getElementById('loginAccount').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // 验证账号格式
    if (!validateAccount(account)) {
        alert('请输入正确的手机号或邮箱');
        return false;
    }

    try {
        // 调用登录API
        const result = await authAPI.login(account, password);
        
        // 登录成功
        currentUser = result.user;
        
        // 如果选择记住密码，保存到localStorage
        if (rememberMe) {
            localStorage.setItem('savedAccount', account);
            localStorage.setItem('savedPassword', password);
        } else {
            localStorage.removeItem('savedAccount');
            localStorage.removeItem('savedPassword');
        }
        
        // 更新UI
        updateUIForLoggedInUser();
        
        // 关闭登录模态框
        closeModal('login');
        
        alert('登录成功！');
    } catch (error) {
        alert('登录失败: ' + error.message);
    }
    
    return false;
}

// 修改注册处理函数
async function handleRegister(event) {
    event.preventDefault();
    const account = document.getElementById('registerAccount').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPwd = document.getElementById('confirmPassword').value;

    // 验证账号格式
    if (!validateAccount(account)) {
        alert('请输入正确的手机号或邮箱');
        return false;
    }

    // 验证密码
    if (password.length < 6) {
        alert('密码长度不能少于6位');
        return false;
    }
    
    if (password !== confirmPwd) {
        alert('两次输入的密码不一致');
        return false;
    }

    try {
        // 调用注册API
        const result = await authAPI.register(account, password);
        
        // 注册成功，自动登录
        currentUser = result.user;
        
        // 更新UI
        updateUIForLoggedInUser();
        
        // 关闭注册模态框
        closeModal('register');
        
        alert('注册成功并已自动登录！');
    } catch (error) {
        alert('注册失败: ' + error.message);
    }
    
    return false;
}

// 修改退出登录处理函数
async function handleLogout() {
    try {
        // 调用退出API
        await authAPI.logout();
        
        // 清除当前用户
        currentUser = null;
        
        // 恢复未登录状态的UI
        const userMenu = document.getElementById('userMenu');
        if (userMenu) {
            userMenu.innerHTML = `
                <a href="#" onclick="showModal('login'); return false;">登录</a>
                <a href="#" onclick="showModal('register'); return false;">注册</a>
            `;
        }
        
        alert('已退出登录');
    } catch (error) {
        alert('退出失败: ' + error.message);
    }
}

// 初始化用户状态
async function initUserState() {
    try {
        // 获取用户信息
        const userInfo = await authAPI.getUserInfo();
        
        if (userInfo) {
            currentUser = userInfo;
            updateUIForLoggedInUser();
        }
    } catch (error) {
        console.error('初始化用户状态失败:', error);
    }
}