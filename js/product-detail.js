// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取URL中的产品ID
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // 初始化产品详情
    initProductDetail(productId);
    
    // 设置图片自动轮播
    setupImageCarousel();
});

// 初始化产品详情
function initProductDetail(productId) {
    // 获取产品配置
    const product = productDetailConfig.products[productId];
    if (!product) {
        console.error('产品不存在:', productId);
        return;
    }
    
    // 更新页面标题
    document.title = `${product.name} - GetPhoneHub.com`;
    
    // 更新主图
    const mainImage = document.querySelector('.main-image');
    if (mainImage) {
        mainImage.src = product.mainImage;
        mainImage.alt = product.name;
    }
    
    // 更新缩略图
    const thumbnailGrid = document.querySelector('.thumbnail-grid');
    if (thumbnailGrid && product.thumbnails && product.thumbnails.length > 0) {
        thumbnailGrid.innerHTML = product.thumbnails.map((thumb, index) => `
            <img src="${thumb}" alt="${product.name} 缩略图${index + 1}" class="thumbnail" data-index="${index}">
        `).join('');
        
        // 添加缩略图点击事件
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => switchImage(index));
        });
        
        // 默认选中第一个缩略图
        if (thumbnails.length > 0) {
            switchImage(0);
        }
    } else if (thumbnailGrid) {
        thumbnailGrid.style.display = 'none';
    }
    
    // 更新产品标题
    const productTitle = document.querySelector('.product-title');
    if (productTitle) {
        productTitle.textContent = product.name;
    }
    
    // 更新产品价格
    const productPrice = document.querySelector('.product-price');
    if (productPrice) {
        productPrice.textContent = product.price;
    }
    
    // 更新产品描述
    const productDescription = document.querySelector('.product-description p');
    if (productDescription) {
        productDescription.textContent = product.description;
    }
    
    // 更新规格参数标题
    const specsTitle = document.querySelector('.specs-title');
    if (specsTitle) {
        specsTitle.textContent = productDetailConfig.specsTitle || '规格参数';
    }
    
    // 更新规格参数
    const specsGrid = document.querySelector('.specs-grid');
    const specsSection = document.querySelector('.product-specs');
    
    if (specsGrid && specsSection) {
        if (product.specs && Object.keys(product.specs).length > 0) {
            specsGrid.innerHTML = '';
            for (let [label, value] of Object.entries(product.specs)) {
                specsGrid.innerHTML += `
                    <div class="spec-item">
                        <div class="spec-label">${label}</div>
                        <div class="spec-value">${value}</div>
                    </div>
                `;
            }
            specsSection.style.display = 'block';
        } else {
            specsSection.style.display = 'none';
        }
    }
    
    // 更新相关推荐标题
    const relatedTitle = document.querySelector('.related-title');
    if (relatedTitle) {
        relatedTitle.textContent = productDetailConfig.relatedTitle || '相关推荐';
    }
    
    // 更新相关推荐
    const relatedGrid = document.querySelector('.related-grid');
    const relatedSection = document.querySelector('.related-products');
    
    if (relatedGrid && relatedSection) {
        if (product.recommendations && product.recommendations.length > 0) {
            relatedGrid.innerHTML = product.recommendations.map(item => `
                <div class="product-card">
                    <a href="product-detail.html?id=${item.id}" style="text-decoration: none; color: inherit;">
                        <img src="${item.image}" alt="${item.name}" class="product-image">
                        <div class="product-info">
                            <h3 class="product-title">${item.name}</h3>
                            <div class="product-price">${item.price}</div>
                        </div>
                    </a>
                </div>
            `).join('');
            relatedSection.style.display = 'block';
        } else {
            relatedSection.style.display = 'none';
        }
    }
}

// 图片切换函数
function switchImage(index) {
    const mainImage = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (!mainImage || !thumbnails || thumbnails.length === 0) return;
    
    const targetThumb = thumbnails[index];
    if (!targetThumb) return;
    
    // 更新主图
    mainImage.src = targetThumb.src;
    
    // 更新选中状态
    thumbnails.forEach(t => t.style.borderColor = 'transparent');
    targetThumb.style.borderColor = '#007bff';
    
    // 更新当前索引
    mainImage.dataset.currentIndex = index;
}

// 设置图片自动轮播
function setupImageCarousel() {
    // 每秒切换一次图片
    setInterval(() => {
        const mainImage = document.querySelector('.main-image');
        const thumbnails = document.querySelectorAll('.thumbnail');
        
        if (!mainImage || !thumbnails || thumbnails.length <= 1) return;
        
        // 获取当前索引
        let currentIndex = parseInt(mainImage.dataset.currentIndex || 0);
        
        // 计算下一个索引
        let nextIndex = (currentIndex + 1) % thumbnails.length;
        
        // 切换到下一张图片
        switchImage(nextIndex);
    }, 3000);
}