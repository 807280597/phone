// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化导航菜单
    initNavMenu();
    
    // 初始化页脚
    initFooter();
    
    // 初始化客服信息
    initCustomerService();
    
    // 设置移动端菜单切换
    setupMobileMenu();
    
    // 设置用户菜单
    setupUserMenu();
    
    // 初始化用户状态
    initUserState();
});

// 初始化导航菜单
function initNavMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileLinks = document.querySelector('.mobile-menu-links');
    
    if (navLinks && commonConfig.navMenu) {
        navLinks.innerHTML = '';
        
        commonConfig.navMenu.forEach(item => {
            const link = document.createElement('a');
            link.href = item.link;
            link.textContent = item.text;
            navLinks.appendChild(link);
        });
    }
    
    // 同时初始化移动端菜单
    if (mobileLinks && commonConfig.navMenu) {
        mobileLinks.innerHTML = '';
        
        commonConfig.navMenu.forEach(item => {
            const link = document.createElement('a');
            link.href = item.link;
            link.textContent = item.text;
            mobileLinks.appendChild(link);
        });
    }
}

// 初始化页脚
function initFooter() {
    const footerContact = document.querySelector('.footer-contact');
    const footerCopyright = document.querySelector('.footer-copyright');
    
    if (footerContact && commonConfig.contactInfo) {
        footerContact.innerHTML = '';
        
        if (commonConfig.contactInfo.phone) {
            footerContact.innerHTML += `
                <p><i class="fas fa-phone"></i> ${commonConfig.contactInfo.phone}</p>
            `;
        }
        
        if (commonConfig.contactInfo.email) {
            footerContact.innerHTML += `
                <p><i class="fas fa-envelope"></i> ${commonConfig.contactInfo.email}</p>
            `;
        }
        
        if (commonConfig.contactInfo.whatsapp) {
            footerContact.innerHTML += `
                <p><i class="fab fa-whatsapp"></i> ${commonConfig.contactInfo.whatsapp}</p>
            `;
        }
    }
    
    if (footerCopyright && commonConfig.copyright) {
        footerCopyright.textContent = commonConfig.copyright;
    }
}

// 初始化客服信息
function initCustomerService() {
    const customerWorkTime = document.getElementById('customerWorkTime');
    const customerPhone = document.getElementById('customerPhone');
    const customerEmail = document.getElementById('customerEmail');
    const customerWhatsapp = document.getElementById('customerWhatsapp');
    
    if (customerWorkTime && commonConfig.customerService && commonConfig.customerService.workTime) {
        customerWorkTime.textContent = commonConfig.customerService.workTime;
    }
    
    if (customerPhone && commonConfig.customerService && commonConfig.customerService.phone) {
        customerPhone.textContent = commonConfig.customerService.phone;
    }
    
    if (customerEmail && commonConfig.customerService && commonConfig.customerService.email) {
        customerEmail.textContent = commonConfig.customerService.email;
    }
    
    if (customerWhatsapp && commonConfig.customerService && commonConfig.customerService.whatsapp) {
        customerWhatsapp.textContent = commonConfig.customerService.whatsapp;
    }
}

// 设置移动端菜单
function setupMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const menuClose = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    if (menuToggle && mobileMenu && overlay) {
        // 打开菜单
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // 关闭菜单（通过X按钮）
        if (menuClose) {
            menuClose.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // 关闭菜单（通过遮罩层）
        overlay.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

// 设置用户菜单
function setupUserMenu() {
    document.addEventListener('click', function(event) {
        const userMenu = document.getElementById('userMenu');
        if (!userMenu) return;
        
        // 如果点击的不是用户菜单或其子元素，且不是用户按钮，则隐藏菜单
        if (!event.target.closest('#userMenu') && !event.target.closest('.btn-user')) {
            userMenu.classList.remove('active');
        }
    });
}

// 显示用户菜单
function showUserMenu(event) {
    event.preventDefault();
    const userMenu = document.getElementById('userMenu');
    if (userMenu) {
        userMenu.classList.toggle('active');
    }
}

// 显示模态框
function showModal(type) {
    const modal = document.getElementById(`${type}Modal`);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// 关闭模态框
function closeModal(type) {
    const modal = document.getElementById(`${type}Modal`);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// 切换表单
function switchForm(type) {
    if (type === 'login') {
        closeModal('register');
        showModal('login');
    } else if (type === 'register') {
        closeModal('login');
        showModal('register');
    }
}

// 显示客服模态框
function showCustomerModal() {
    const modal = document.getElementById('customerModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// 关闭客服模态框
function closeCustomerModal() {
    const modal = document.getElementById('customerModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// 处理客服留言
function handleMessage(event) {
    event.preventDefault();
    const contactInfo = document.getElementById('contactInfo').value;
    const messageContent = document.getElementById('messageContent').value;
    
    // 验证联系方式
    if (!validateAccount(contactInfo)) {
        alert('请输入正确的手机号或邮箱');
        return false;
    }
    
    // 验证留言内容
    if (messageContent.trim().length < 10) {
        alert('留言内容不能少于10个字符');
        return false;
    }
    
    // 模拟提交留言
    alert('留言已提交，我们会尽快联系您！');
    
    // 关闭模态框
    closeCustomerModal();
    
    // 清空表单
    document.getElementById('contactInfo').value = '';
    document.getElementById('messageContent').value = '';
    
    return false;
}

// 验证账号格式（手机号或邮箱）
function validateAccount(account) {
    // 手机号正则（简化版）
    const phoneRegex = /^1[3-9]\d{9}$/;
    
    // 邮箱正则
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    return phoneRegex.test(account) || emailRegex.test(account);
}

// 用户状态管理
let currentUser = null;

// 初始化用户状态
function initUserState() {
    // 从localStorage获取用户信息
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            updateUIForLoggedInUser();
        } catch (e) {
            console.error('解析用户信息失败', e);
            localStorage.removeItem('currentUser');
        }
    }
}

// 更新已登录用户的UI
function updateUIForLoggedInUser() {
    if (!currentUser) return;
    
    // 更新用户菜单
    const userMenu = document.getElementById('userMenu');
    if (userMenu) {
        userMenu.innerHTML = `
            <div class="user-info">
                <span>欢迎，${currentUser.account}</span>
            </div>
            <a href="#" onclick="handleLogout(); return false;">退出登录</a>
        `;
    }
}

// 处理登录
function handleLogin(event) {
    event.preventDefault();
    const account = document.getElementById('loginAccount').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // 验证账号格式
    if (!validateAccount(account)) {
        alert('请输入正确的手机号或邮箱');
        return false;
    }

    // 判断是邮箱还是手机号
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(account);
    const isPhone = /^\d{10,15}$/.test(account);
    
    // 显示加载中
    showLoading();
    
    if (isEmail) {
        // 使用邮箱登录
        auth.signInWithEmailAndPassword(account, password)
            .then((userCredential) => {
                // 登录成功
                hideLoading();
                closeModal('login');
                alert('登录成功！');
                
                // 更新UI
                currentUser = { account: account };
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                updateUIForLoggedInUser();
            })
            .catch((error) => {
                // 登录失败
                hideLoading();
                console.error('登录错误:', error);
                alert('账号或密码错误，请重试！');
            });
    } else if (isPhone) {
        // 查询手机号用户
        database.ref('phoneUsers').orderByChild('phone').equalTo(account).once('value')
            .then((snapshot) => {
                if (snapshot.exists()) {
                    // 找到手机号对应的用户
                    let userData;
                    snapshot.forEach((childSnapshot) => {
                        userData = childSnapshot.val();
                    });
                    
                    // 验证密码
                    if (userData && userData.password === password) {
                        // 登录成功
                        hideLoading();
                        closeModal('login');
                        alert('登录成功！');
                        
                        // 更新UI
                        currentUser = { account: account };
                        localStorage.setItem('currentUser', JSON.stringify(currentUser));
                        updateUIForLoggedInUser();
                    } else {
                        // 密码错误
                        hideLoading();
                        alert('密码错误，请重试！');
                    }
                } else {
                    // 未找到用户
                    hideLoading();
                    alert('该手机号未注册，请先注册！');
                }
            })
            .catch((error) => {
                hideLoading();
                console.error('查询用户失败:', error);
                alert('登录失败，请稍后重试！');
            });
    }
    
    return false;
}

// 处理注册
function handleRegister(event) {
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

    // 判断是邮箱还是手机号
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(account);
    const isPhone = /^\d{10,15}$/.test(account);
    
    // 显示加载中
    showLoading();
    
    if (isEmail) {
        // 使用邮箱注册
        auth.createUserWithEmailAndPassword(account, password)
            .then((userCredential) => {
                // 注册成功
                const user = userCredential.user;
                
                // 保存额外用户信息到数据库
                return database.ref('users/' + user.uid).set({
                    email: account,
                    registerDate: new Date().toISOString()
                });
            })
            .then(() => {
                hideLoading();
                closeModal('register');
                alert('注册成功！');
                
                // 自动登录
                currentUser = { account: account };
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                updateUIForLoggedInUser();
            })
            .catch((error) => {
                hideLoading();
                console.error('注册错误:', error);
                alert('注册失败: ' + error.message);
            });
    } else if (isPhone) {
        // 使用手机号注册
        // 先检查手机号是否已注册
        database.ref('phoneUsers').orderByChild('phone').equalTo(account).once('value')
            .then((snapshot) => {
                if (snapshot.exists()) {
                    // 手机号已注册
                    hideLoading();
                    alert('该手机号已注册，请直接登录！');
                } else {
                    // 手机号未注册，创建新用户
                    const newUserRef = database.ref('phoneUsers').push();
                    
                    newUserRef.set({
                        phone: account,
                        password: password,
                        registerDate: new Date().toISOString()
                    })
                    .then(() => {
                        hideLoading();
                        closeModal('register');
                        alert('注册成功！');
                        
                        // 自动登录
                        currentUser = { account: account };
                        localStorage.setItem('currentUser', JSON.stringify(currentUser));
                        updateUIForLoggedInUser();
                    })
                    .catch((error) => {
                        hideLoading();
                        console.error('保存用户数据失败:', error);
                        alert('注册失败，请稍后重试！');
                    });
                }
            })
            .catch((error) => {
                hideLoading();
                console.error('查询用户失败:', error);
                alert('注册失败，请稍后重试！');
            });
    }
    
    return false;
}

// 显示加载中
function showLoading() {
    // 创建加载元素
    if (!document.getElementById('loadingOverlay')) {
        const loading = document.createElement('div');
        loading.id = 'loadingOverlay';
        loading.innerHTML = '<div class="loading-spinner"></div>';
        document.body.appendChild(loading);
    }
    document.getElementById('loadingOverlay').style.display = 'flex';
}

// 隐藏加载中
function hideLoading() {
    const loading = document.getElementById('loadingOverlay');
    if (loading) {
        loading.style.display = 'none';
    }
}

// 更新用户界面
function updateUserUI(userData) {
    const userMenu = document.getElementById('userMenu');
    
    if (userData || auth.currentUser) {
        // 已登录状态
        const user = userData || auth.currentUser;
        const displayName = user.email || user.phone || user.phoneNumber || '用户';
        
        userMenu.innerHTML = `
            <span>欢迎，${displayName}</span>
            <a href="#" onclick="logout(); return false;">退出登录</a>
        `;
    } else {
        // 未登录状态
        userMenu.innerHTML = `
            <a href="#" onclick="showModal('login'); return false;">Login</a>
            <a href="#" onclick="showModal('register'); return false;">Register</a>
        `;
    }
}

// 退出登录
function logout() {
    // 清除本地存储的手机用户信息
    localStorage.removeItem('phoneUser');
    
    // Firebase退出登录
    auth.signOut()
        .then(() => {
            updateUserUI(null);
            showToast('已退出登录！');
        })
        .catch((error) => {
            console.error('退出登录失败:', error);
        });
}

// 获取错误信息
function getErrorMessage(error) {
    switch (error.code) {
        case 'auth/email-already-in-use':
            return '该邮箱已被注册，请直接登录！';
        case 'auth/invalid-email':
            return '邮箱格式不正确！';
        case 'auth/weak-password':
            return '密码强度太弱，请使用更复杂的密码！';
        case 'auth/user-not-found':
            return '该账号不存在，请先注册！';
        case 'auth/wrong-password':
            return '密码错误，请重试！';
        default:
            return '操作失败，请稍后重试！';
    }
}

// 显示加载中
function showLoading() {
    // 创建加载元素
    if (!document.getElementById('loadingOverlay')) {
        const loading = document.createElement('div');
        loading.id = 'loadingOverlay';
        loading.innerHTML = '<div class="loading-spinner"></div>';
        document.body.appendChild(loading);
    }
    document.getElementById('loadingOverlay').style.display = 'flex';
}

// 隐藏加载中
function hideLoading() {
    const loading = document.getElementById('loadingOverlay');
    if (loading) {
        loading.style.display = 'none';
    }
}

// 显示提示消息
function showToast(message) {
    // 创建toast元素
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 显示toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // 3秒后隐藏并移除
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// 监听认证状态变化
auth.onAuthStateChanged((user) => {
    // 检查是否有手机用户登录
    const phoneUser = JSON.parse(localStorage.getItem('phoneUser'));
    
    if (user || phoneUser) {
        // 用户已登录
        updateUserUI(user || phoneUser);
    } else {
        // 用户未登录
        updateUserUI(null);
    }
});