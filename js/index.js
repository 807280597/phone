// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化海报区域
    initBanner();
    
    // 初始化产品展示区域
    initProducts();
});

// 初始化海报区域
function initBanner() {
    const banner = document.querySelector('.banner');
    const bannerTitle = document.querySelector('.banner-title');
    const bannerSubtitle = document.querySelector('.banner-subtitle');
    const bannerButton = document.querySelector('.banner-button');
    
    // 设置海报背景图
    if (banner && indexConfig.banner.image) {
        banner.style.backgroundImage = `url(${indexConfig.banner.image})`;
        
        // 添加点击事件
        if (indexConfig.banner.link) {
            banner.style.cursor = 'pointer';
            banner.addEventListener('click', function() {
                window.location.href = indexConfig.banner.link;
            });
        }
    } else if (banner) {
        // 兜底样式
        banner.style.backgroundImage = 'linear-gradient(135deg, #007bff, #00c6ff)';
    }
    
    // 设置标题
    if (bannerTitle && indexConfig.banner.title) {
        bannerTitle.textContent = indexConfig.banner.title;
        bannerTitle.style.display = 'block';
    } else if (bannerTitle) {
        bannerTitle.style.display = 'none';
    }
    
    // 设置副标题
    if (bannerSubtitle && indexConfig.banner.subtitle) {
        bannerSubtitle.textContent = indexConfig.banner.subtitle;
        bannerSubtitle.style.display = 'block';
    } else if (bannerSubtitle) {
        bannerSubtitle.style.display = 'none';
    }
    
    // 设置按钮
    if (bannerButton && indexConfig.banner.buttonText) {
        bannerButton.textContent = indexConfig.banner.buttonText;
        bannerButton.href = indexConfig.banner.buttonLink || '#';
        bannerButton.style.display = 'inline-block';
    } else if (bannerButton) {
        bannerButton.style.display = 'none';
    }
}

// 初始化产品展示区域
function initProducts() {
    const sectionTitle = document.querySelector('.section-title');
    const productGrid = document.querySelector('.product-grid');
    const productSection = document.querySelector('.products');
    
    // 设置标题
    if (sectionTitle && indexConfig.productSection.title) {
        sectionTitle.textContent = indexConfig.productSection.title;
    }
    
    // 设置产品卡片
    if (productGrid && indexConfig.productSection.products && indexConfig.productSection.products.length > 0) {
        productGrid.innerHTML = '';
        
        indexConfig.productSection.products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            let cardContent = `
                <a href="product-detail.html?id=${product.id}" class="product-link">
            `;
            
            // 产品图片
            if (product.image) {
                cardContent += `<img src="${product.image}" alt="${product.name}" class="product-image">`;
            } else {
                // 兜底图片
                cardContent += `<img src="images/placeholder.jpg" alt="${product.name}" class="product-image">`;
            }
            
            cardContent += `<div class="product-info">`;
            
            // 产品名称
            if (product.name) {
                cardContent += `<h3 class="product-title">${product.name}</h3>`;
            }
            
            // 产品描述
            if (product.description) {
                cardContent += `<p class="product-description">${product.description}</p>`;
            }
            
            // 产品价格
            if (product.price) {
                cardContent += `<div class="product-price">${product.price}</div>`;
            }
            
            cardContent += `
                    </div>
                </a>
            `;
            
            card.innerHTML = cardContent;
            productGrid.appendChild(card);
        });
        
        productSection.style.display = 'block';
    } else if (productSection) {
        productSection.style.display = 'none';
    }
}