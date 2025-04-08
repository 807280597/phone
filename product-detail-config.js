const productDetailConfig = {
    // 导航菜单配置
    navMenu: [
        { text: "Redmi 14C", link: "product-detail.html?id=Redmi14C" },
        { text: "Redmi 13C", link: "product-detail.html?id=Redmi13C" },
        { text: "Galaxy A14", link: "product-detail.html?id=GalaxyA14" },
    ],    
    products: {
        "Redmi14C": {
            mainImage: "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1735279484.79977296.png",
            thumbnails: [
                "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1735279484.82964217.png",
                "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1735279484.83039321.png",
                "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1735279484.79977296.png",  // 添加逗号
                "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1735279484.89555373.png"
            ],
            name: "Redmi 14C",
            price: "₦150.000",
            description: "8GB+256GB大存储，5000mAh大电池",
            specs: {
                "处理器": "Helio G85",
                "内存": "8GB",
                "存储": "256GB",
                "电池": "5000mAh",
                "屏幕": "6.74英寸 LCD",
                "摄像头": "5000万像素主摄"
            },
            recommendations: [
                {
                    id: "Redmi13C",
                    image: "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1703560943.5374455.png",
                    name: "Redmi 13C",
                    price: "₦140.000"
                },
                {
                    id: "GalaxyA14",
                    image: "https://img12.360buyimg.com/n7/jfs/t1/177319/37/47471/79447/66d2e3d7F8f07308f/734b9ca49353e3c3.jpg",
                    name: "Galaxy A14",
                    price: "₦150.000"
                }
            ]
        },
        "Redmi13C": {
            mainImage: "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1703560943.5374455.png",
            thumbnails: [
                "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1703560943.5374455.png",
                "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1703560944.44484704.png",
                "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1703560944.38274159.png"
            ],
            name: "Redmi 13C",
            price: "₦140.000",
            description: "8GB+256GB大存储，5000mAh大电池",
            specs: {
                "处理器": "Helio G85",
                "内存": "8GB",
                "存储": "256GB",
                "电池": "5000mAh",
                "屏幕": "6.74英寸 LCD",
                "摄像头": "5000万像素主摄"
            },
            recommendations: [
                {
                    id: "Redmi14C",
                    image: "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1735279484.79977296.png",
                    name: "Redmi 14C",
                    price: "₦150.000"
                },
                {
                    id: "GalaxyA14",
                    image: "https://img12.360buyimg.com/n7/jfs/t1/177319/37/47471/79447/66d2e3d7F8f07308f/734b9ca49353e3c3.jpg",
                    name: "Galaxy A14",
                    price: "₦150.000"
                }
            ]
        },
        "GalaxyA14": {
            mainImage: "https://img2.baidu.com/it/u=2517218372,1077362798&fm=253&fmt=auto&app=120&f=JPEG?w=638&h=500",
            thumbnails: [
                "https://img2.baidu.com/it/u=2517218372,1077362798&fm=253&fmt=auto&app=120&f=JPEG?w=638&h=500",
                "https://img1.baidu.com/it/u=1291044698,658670669&fm=253&fmt=auto&app=120&f=JPEG?w=554&h=500",
                "https://img2.baidu.com/it/u=2772155995,3478083210&fm=253&fmt=auto&app=120&f=JPEG?w=808&h=500"
            ],
            name: "Galaxy A14",
            price: "₦150.000",
            description: "6GB+128GB，5000mAh大电池，6.6英寸全面屏",
            specs: {
                "处理器": "Exynos 850",
                "内存": "6GB",
                "存储": "128GB",
                "电池": "5000mAh",
                "屏幕": "6.6英寸 LCD",
                "摄像头": "5000万像素主摄",
                "系统": "Android 13",
                "重量": "201g"
            },
            recommendations: [
                {
                    id: "Redmi14C",
                    image: "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1735279484.79977296.png",
                    name: "Redmi 14C",
                    price: "₦150.000"
                },
                {
                    id: "Redmi13C",
                    image: "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1703560943.5374455.png",
                    name: "Redmi 13C",
                    price: "₦140.000"
                }
            ]
        }
    }
};