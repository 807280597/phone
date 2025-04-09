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

    // 模拟登录验证
    if (password.length < 6) {
        alert('密码长度不能少于6位');
        return false;
    }

    // 模拟登录成功
    currentUser = { account: account };
    
    // 保存用户状态
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
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

    // 模拟检查账号是否已存在
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    if (registeredUsers.some(user => user.account === account)) {
        alert('该账号已被注册');
        return false;
    }

    // 模拟注册成功，保存用户信息
    registeredUsers.push({ account, password });
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

    // 自动登录
    currentUser = { account: account };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // 更新UI
    updateUIForLoggedInUser();
    
    // 关闭注册模态框
    closeModal('register');
    
    alert('注册成功并已自动登录！');
    return false;
}

// 处理退出登录
function handleLogout() {
    // 清除当前用户
    currentUser = null;
    localStorage.removeItem('currentUser');
    
    // 恢复未登录状态的UI
    const userMenu = document.getElementById('userMenu');
    if (userMenu) {
        userMenu.innerHTML = `
            <a href="#" onclick="showModal('login'); return false;">登录</a>
            <a href="#" onclick="showModal('register'); return false;">注册</a>
        `;
    }
    
    alert('已退出登录');
}