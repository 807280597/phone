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
    
    // 存储留言
    let messages = JSON.parse(localStorage.getItem('customerMessages')) || [];
    messages.push({
        contactInfo,
        message: messageContent,
        time: new Date().toISOString()
    });
    
    localStorage.setItem('customerMessages', JSON.stringify(messages));
    
    closeCustomerModal();
    alert('留言已提交，我们会尽快联系您！');
    
    return false;
}

// 导出客服留言
function exportMessages() {
    if (!currentUser) {
        alert('请先登录！');
        return;
    }
    
    let messages = JSON.parse(localStorage.getItem('customerMessages')) || [];
    
    // 创建留言数据CSV
    let csvContent = "联系方式,留言内容,提交时间\n";
    messages.forEach(msg => {
        csvContent += `${msg.contactInfo},"${msg.message.replace(/"/g, '""')}",${msg.time}\n`;
    });
    
    // 创建下载链接
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'customer_messages.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化用户状态
    initUserState();
    
    // 检查是否有记住的用户
    const rememberedUser = JSON.parse(localStorage.getItem('rememberedUser'));
    if (rememberedUser && !currentUser) {
        document.getElementById('loginAccount').value = rememberedUser.account;
        document.getElementById('loginPassword').value = rememberedUser.password;
        document.getElementById('rememberMe').checked = true;
    }
    
    // 修改客服模态框，添加导出留言按钮
    const customerModal = document.getElementById('customerModal');
    if (customerModal) {
        const modalContent = customerModal.querySelector('.modal-content');
        if (modalContent && currentUser) {
            const exportButton = document.createElement('button');
            exportButton.className = 'btn-secondary';
            exportButton.style.marginTop = '10px';
            exportButton.textContent = '导出留言数据';
            exportButton.onclick = exportMessages;
            modalContent.appendChild(exportButton);
        }
    }
    
    // ... 其他初始化代码 ...
});

// ... 现有代码 ...