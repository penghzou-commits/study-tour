// mobile-app.js - 研学家长端移动应用核心逻辑

// ==================== 数据层 ====================

// 当前登录家长信息
let parentInfo = {
    id: 'P001',
    name: '清风',
    engName: '',
    phone: '138****0001',
    avatar: ''
};

// 已绑定的研学人列表
let children = [
    { id: 'C001', name: '张明远', studentId: 'STU001', school: '北京市第一中学', grade: '初二', gender: '男', age: 14, bindDate: '2026-01-10', avatar: '' },
];

// 公告数据（与管理台同步）
const announcements = [
    { id: 'ANN001', title: '2026年春季研学活动报名正式开启', type: '通知公告', isTop: true, coverImage: 'https://picsum.photos/seed/ann1spring/600/300', summary: '2026年春季研学活动现已开放报名，涵盖红色教育、科技创新、自然生态等多个主题，欢迎各校师生踊跃参与。', publishDate: '2026-03-01', viewCount: 1286 },
    { id: 'ANN002', title: '关于加强研学旅行安全管理的通知', type: '安全提醒', isTop: true, coverImage: 'https://picsum.photos/seed/ann2safe/600/300', summary: '为确保研学旅行安全，现就加强安全管理工作提出相关要求，请各基地和学校严格执行。', publishDate: '2026-02-20', viewCount: 2034 },
    { id: 'ANN003', title: '延安红色教育基地荣获"全国优秀研学基地"称号', type: '新闻资讯', isTop: false, coverImage: 'https://picsum.photos/seed/ann3yanan/600/300', summary: '热烈祝贺延安红色教育基地在2025年度全国研学基地评选中荣获"全国优秀研学基地"荣誉称号。', publishDate: '2026-02-15', viewCount: 856 },
    { id: 'ANN004', title: '暑期海洋科学探索营开始招募', type: '活动预告', isTop: false, coverImage: 'https://picsum.photos/seed/ann4ocean/600/300', summary: '2026年暑期海洋科学探索营即将开营，带领学生走进海洋世界，探索海洋奥秘。', publishDate: '2026-03-10', viewCount: 643 },
    { id: 'ANN005', title: '研学管理平台系统升级公告', type: '系统公告', isTop: false, coverImage: '', summary: '研学管理平台将于2026年3月15日凌晨进行系统升级，届时平台将暂停服务约2小时。', publishDate: '2026-03-12', viewCount: 432 },
    { id: 'ANN006', title: '关于规范研学活动收费标准的通知', type: '政策法规', isTop: false, coverImage: '', summary: '根据教育主管部门最新要求，现就规范研学活动收费标准相关事项进行通知。', publishDate: '2026-02-28', viewCount: 1120 },
];

// 可报名活动数据（与管理台同步）
const activities = [
    { id: 'ACT001', name: '2026春季延安红色研学报名', project: '红色革命教育研学之旅', school: '北京市第一中学', startDate: '2026-03-01', endDate: '2026-03-15', quota: 60, enrolled: 48, status: '报名中', price: 2800, duration: '5天4晚', location: '延安', coverImage: 'https://picsum.photos/seed/act1yanan/600/300', tags: ['红色教育', '历史文化'], desc: '走进延安，重温革命历史，传承红色精神。包含宝塔山、杨家岭、枣园等经典景点参观及互动体验课程。' },
    { id: 'ACT003', name: '暑期雨林探秘营报名', project: '自然生态探秘之旅', school: '人大附中', startDate: '2026-05-01', endDate: '2026-06-15', quota: 45, enrolled: 12, status: '报名中', price: 4200, duration: '7天6晚', location: '西双版纳', coverImage: 'https://picsum.photos/seed/act3forest/600/300', tags: ['自然生态', '科学探索'], desc: '深入热带雨林，观察珍稀动植物，学习生态保护知识，体验原始森林的神奇魅力。' },
    { id: 'ACT004', name: '传统文化体验营春季班', project: '传统文化体验营', school: '北京四中', startDate: '2026-03-10', endDate: '2026-03-25', quota: 55, enrolled: 38, status: '报名中', price: 2500, duration: '3天2晚', location: '北京', coverImage: 'https://picsum.photos/seed/act4culture/600/300', tags: ['传统文化', '手工体验'], desc: '体验书法、国画、茶艺、陶艺等传统文化项目，感受中华文化的博大精深。' },
    { id: 'ACT005', name: '海洋科学探索营报名', project: '海洋科学探索营', school: '北京市实验中学', startDate: '2026-04-05', endDate: '2026-04-20', quota: 50, enrolled: 25, status: '报名中', price: 3500, duration: '5天4晚', location: '青岛', coverImage: 'https://picsum.photos/seed/act5ocean/600/300', tags: ['海洋科学', '科普教育'], desc: '参观国家海洋博物馆，海洋生物标本制作，潮间带生态考察，海洋环保主题讲座。' },
    { id: 'ACT009', name: '科技创新营第二期报名', project: '科技创新探索营', school: '人大附中', startDate: '2026-05-10', endDate: '2026-05-25', quota: 50, enrolled: 18, status: '报名中', price: 3200, duration: '4天3晚', location: '北京', coverImage: 'https://picsum.photos/seed/act9tech/600/300', tags: ['科技创新', '编程实践'], desc: '走进中关村科技园，体验AI、机器人编程、3D打印等前沿科技，激发创新思维。' },
    { id: 'ACT007', name: '军事素质拓展营报名', project: '军事素质拓展营', school: '北师大附中', startDate: '2026-04-15', endDate: '2026-05-01', quota: 60, enrolled: 0, status: '未开始', price: 3800, duration: '6天5晚', location: '怀柔', coverImage: 'https://picsum.photos/seed/act7army/600/300', tags: ['军事训练', '素质拓展'], desc: '军事化管理体验，野外生存训练，团队协作挑战，培养坚韧品格和团队精神。' },
    { id: 'ACT008', name: '航天科普营暑期报名', project: '航天科普研学营', school: '北京市朝阳中学', startDate: '2026-06-01', endDate: '2026-07-01', quota: 40, enrolled: 0, status: '未开始', price: 3600, duration: '4天3晚', location: '北京/文昌', coverImage: 'https://picsum.photos/seed/act8space/600/300', tags: ['航天科普', '科学探索'], desc: '参观航天城，了解火箭发射原理，模拟太空实验，近距离感受中国航天事业的伟大成就。' },
];

// 周边商品数据（与管理台同步）
const surroundings = [
    { id: 'SUR001', name: '长城文化冰箱贴套装', type: '文创纪念品', price: 39.9, image: 'https://picsum.photos/seed/sur1a/400/300', base: '长城文化研学营地', stock: 200, sales: 156, desc: '精选长城经典元素设计，包含烽火台、城墙、箭楼等6款造型，采用环保树脂材质，色彩鲜艳持久，是研学旅行的完美纪念品。' },
    { id: 'SUR002', name: '故宫文化笔记本礼盒', type: '文具用品', price: 68.0, image: 'https://picsum.photos/seed/sur2a/400/300', base: '故宫博物院研学中心', stock: 150, sales: 98, desc: '以故宫经典纹样为设计灵感，内含精装笔记本、书签、贴纸套装，采用优质纸张，书写流畅，是学习与收藏的佳品。' },
    { id: 'SUR003', name: '科技探索主题T恤', type: '服饰配件', price: 89.0, image: 'https://picsum.photos/seed/sur3a/400/300', base: '北京科技研学基地', stock: 300, sales: 210, desc: '100%纯棉面料，舒适透气。正面印有科技探索主题图案，融合电路板、火箭、机器人等元素，尺码齐全。' },
    { id: 'SUR004', name: '航天模型拼装套件', type: '手工艺品', price: 128.0, image: 'https://picsum.photos/seed/sur4a/400/300', base: '航天科普教育基地', stock: 80, sales: 65, desc: '1:100比例还原长征五号运载火箭，含详细拼装说明书，适合8岁以上青少年，锻炼动手能力和空间思维。' },
    { id: 'SUR005', name: '生态农场蜂蜜礼盒', type: '食品特产', price: 158.0, image: 'https://picsum.photos/seed/sur5a/400/300', base: '密云生态农业基地', stock: 100, sales: 78, desc: '密云山区天然百花蜜，经过严格质检，口感醇厚，营养丰富。礼盒装含2瓶500g装蜂蜜，送礼自用皆宜。' },
    { id: 'SUR006', name: '植物标本书签套装', type: '文创纪念品', price: 45.0, image: 'https://picsum.photos/seed/sur6a/400/300', base: '国家植物园研学点', stock: 250, sales: 180, desc: '真实植物标本封装于透明树脂中，每套6枚，包含银杏叶、枫叶、四叶草等品种，独一无二的自然之美。' },
    { id: 'SUR007', name: '户外探索水壶', type: '生活用品', price: 79.0, image: 'https://picsum.photos/seed/sur7a/400/300', base: '怀柔户外拓展基地', stock: 180, sales: 120, desc: '500ml大容量，304不锈钢内胆，双层真空保温，户外研学必备装备，印有研学基地专属LOGO。' },
    { id: 'SUR009', name: '长城主题帆布包', type: '服饰配件', price: 55.0, image: 'https://picsum.photos/seed/sur9a/400/300', base: '长城文化研学营地', stock: 200, sales: 145, desc: '加厚帆布材质，容量大，结实耐用。正面印有长城水墨画风格图案，文艺范十足，日常出行研学两用。' },
    { id: 'SUR011', name: '研学纪念徽章盲盒', type: '文创纪念品', price: 19.9, image: 'https://picsum.photos/seed/sur11a/400/300', base: '北京科技研学基地', stock: 500, sales: 380, desc: '每盒随机包含1枚精美金属徽章，共12款不同设计，涵盖各研学基地特色元素，集齐全套更有惊喜。' },
];

// 订单数据
let orders = [
    { id: 'ORD20260301001', childName: '张明远', childId: 'C001', activityId: 'ACT001', activityName: '2026春季延安红色研学报名', project: '红色革命教育研学之旅', amount: 2800, status: '已支付', payMethod: '微信支付', createDate: '2026-03-01 10:23:45', payDate: '2026-03-01 10:25:12', remark: '' },
];

let orderIdCounter = 2;

// 当前Tab
let currentTab = 'home';
// Banner当前索引
let bannerIndex = 0;
let bannerTimer = null;

// ==================== 工具函数 ====================

function showMobileToast(msg, duration = 2000) {
    const toast = document.getElementById('mobile-toast');
    toast.querySelector('div').textContent = msg;
    toast.classList.remove('hidden');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.add('hidden'), duration);
}

function generateOrderId() {
    const now = new Date();
    const dateStr = now.getFullYear().toString() +
        String(now.getMonth() + 1).padStart(2, '0') +
        String(now.getDate()).padStart(2, '0');
    return 'ORD' + dateStr + String(orderIdCounter++).padStart(3, '0');
}

// ==================== 初始化 ====================

function initApp() {
    loadUserInfo();
    bindGlobalEvents();
    renderTab('home');
}

async function loadUserInfo() {
    // 昵称固定为"清风"，头像使用图标
    parentInfo.name = '清风';
}

function bindGlobalEvents() {
    // Tab切换
    document.getElementById('mobile-tabbar').addEventListener('click', (e) => {
        const tabItem = e.target.closest('.tab-item');
        if (!tabItem) return;
        const tab = tabItem.dataset.tab;
        if (tab && tab !== currentTab) {
            currentTab = tab;
            document.querySelectorAll('#mobile-tabbar .tab-item').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
            renderTab(tab);
        }
    });

    // 搜索切换
    document.getElementById('btn-search-toggle').addEventListener('click', () => {
        document.getElementById('search-bar').classList.toggle('hidden');
        const input = document.getElementById('mobile-search-input');
        if (!document.getElementById('search-bar').classList.contains('hidden')) input.focus();
    });
    document.getElementById('btn-search-close').addEventListener('click', () => {
        document.getElementById('search-bar').classList.add('hidden');
        document.getElementById('mobile-search-input').value = '';
    });

    // 通知
    document.getElementById('btn-notification').addEventListener('click', () => {
        showMobileToast('暂无新通知');
    });
}

// ==================== Tab路由 ====================

function renderTab(tab) {
    stopBanner();
    const main = document.getElementById('mobile-main');
    switch (tab) {
        case 'home': renderHomePage(main); break;
        case 'activities': renderActivitiesPage(main); break;
        case 'orders': renderOrdersPage(main); break;
        case 'profile': renderProfilePage(main); break;
        default: main.innerHTML = '<div class="mobile-empty"><i class="fas fa-tools"></i><p>页面开发中...</p></div>';
    }
}

// ==================== 首页 ====================

function renderHomePage(container) {
    const topAnns = announcements.filter(a => a.isTop);
    const recentAnns = announcements.slice(0, 5);
    const hotActivities = activities.filter(a => a.status === '报名中').slice(0, 4);
    const hotProducts = surroundings.slice(0, 6);

    container.innerHTML = `
        <!-- Banner轮播 -->
        <div class="banner-container" id="home-banner">
            <div class="banner-slide" id="banner-slide">
                ${topAnns.map((a, i) => `
                    <div class="banner-item" data-id="${a.id}">
                        <img src="${a.coverImage || 'https://picsum.photos/seed/banner/600/300'}" alt="${a.title}">
                        <div class="banner-overlay">
                            <h3>${a.title}</h3>
                            <p>${a.publishDate}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="banner-dots" id="banner-dots">
                ${topAnns.map((_, i) => `<div class="banner-dot ${i === 0 ? 'active' : ''}" data-idx="${i}"></div>`).join('')}
            </div>
        </div>

        <!-- 公告滚动条 -->
        <div class="notice-bar" id="notice-bar">
            <div class="notice-icon"><i class="fas fa-volume-up"></i></div>
            <div class="notice-text" id="notice-text">${recentAnns[0]?.title || '暂无公告'}</div>
            <div class="notice-more">更多 <i class="fas fa-chevron-right" style="font-size:10px;"></i></div>
        </div>

        <!-- 快捷入口 -->
        <div class="quick-grid">
            <div class="quick-item" data-action="enroll">
                <div class="quick-icon bg-blue-50 text-blue-500"><i class="fas fa-clipboard-list"></i></div>
                <span>活动报名</span>
            </div>
            <div class="quick-item" data-action="children">
                <div class="quick-icon bg-green-50 text-green-500"><i class="fas fa-child"></i></div>
                <span>我的研学人</span>
            </div>
            <div class="quick-item" data-action="orders">
                <div class="quick-icon bg-orange-50 text-orange-500"><i class="fas fa-receipt"></i></div>
                <span>我的订单</span>
            </div>
            <div class="quick-item" data-action="shop">
                <div class="quick-icon bg-purple-50 text-purple-500"><i class="fas fa-store"></i></div>
                <span>研学周边</span>
            </div>
        </div>

        <!-- 绑定研学人提示（如果没有绑定） -->
        ${children.length === 0 ? `
        <div class="mx-4 mb-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100" id="bind-child-hint">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-user-plus text-blue-500"></i>
                </div>
                <div class="flex-1">
                    <h4 class="text-sm font-semibold text-gray-800">还未绑定研学人</h4>
                    <p class="text-xs text-gray-500 mt-0.5">绑定研学人后即可为其报名研学活动</p>
                </div>
                <button class="px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-full" id="btn-bind-child-hint">去绑定</button>
            </div>
        </div>` : ''}

        <!-- 热门活动 -->
        <div class="mt-4 mb-3">
            <div class="section-header">
                <div class="section-title">热门活动</div>
                <div class="section-more" id="btn-more-activities">查看全部 <i class="fas fa-chevron-right"></i></div>
            </div>
        </div>
        <div class="activity-scroll" id="home-activities">
            ${hotActivities.map(a => renderActivityScrollCard(a)).join('')}
        </div>

        <!-- 最新公告 -->
        <div class="mt-2 mb-3">
            <div class="section-header">
                <div class="section-title">最新公告</div>
                <div class="section-more" id="btn-more-announcements">更多 <i class="fas fa-chevron-right"></i></div>
            </div>
        </div>
        <div id="home-announcements">
            ${recentAnns.slice(0, 3).map(a => renderAnnouncementItem(a)).join('')}
        </div>

        <!-- 研学周边 -->
        <div class="mt-4 mb-3">
            <div class="section-header">
                <div class="section-title">研学周边</div>
                <div class="section-more" id="btn-more-products">更多 <i class="fas fa-chevron-right"></i></div>
            </div>
        </div>
        <div class="grid grid-cols-3 gap-2 px-4 pb-4" id="home-products">
            ${hotProducts.map(p => renderProductMiniCard(p)).join('')}
        </div>
    `;

    bindHomeEvents();
    startBanner(topAnns.length);
}

function renderActivityScrollCard(a) {
    const progress = a.quota > 0 ? Math.round(a.enrolled / a.quota * 100) : 0;
    const statusTag = a.status === '报名中'
        ? '<span class="card-tag bg-green-50 text-green-600">报名中</span>'
        : a.status === '已满员'
            ? '<span class="card-tag bg-red-50 text-red-500">已满员</span>'
            : '<span class="card-tag bg-gray-100 text-gray-500">' + a.status + '</span>';
    return `
        <div class="activity-scroll-card" data-id="${a.id}">
            <img src="${a.coverImage}" alt="${a.name}" onerror="this.src='https://picsum.photos/seed/activity/600/300'">
            <div class="card-info">
                <h5>${a.name}</h5>
                <div class="meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${a.location}</span>
                    <span><i class="fas fa-clock"></i> ${a.duration}</span>
                </div>
                <div class="card-bottom">
                    <div class="card-price">¥${a.price}<span>/人</span></div>
                    ${statusTag}
                </div>
            </div>
        </div>
    `;
}

function renderAnnouncementItem(a) {
    return `
        <div class="announcement-item" data-id="${a.id}">
            ${a.coverImage ? `<img src="${a.coverImage}" alt="" class="ann-img" onerror="this.onerror=null;this.style.display='none';this.parentElement.insertAdjacentHTML('afterbegin','<div class=\\'ann-img bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center\\'><i class=\\'fas fa-bullhorn text-blue-300 text-xl\\'></i></div>');">` : `<div class="ann-img bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center"><i class="fas fa-bullhorn text-blue-300 text-xl"></i></div>`}
            <div class="ann-content">
                <h5>${a.title}</h5>
                <p>${a.summary}</p>
                <div class="ann-meta">
                    <span><i class="fas fa-tag mr-1"></i>${a.type}</span>
                    <span><i class="fas fa-clock mr-1"></i>${a.publishDate}</span>
                </div>
            </div>
        </div>
    `;
}

function renderProductMiniCard(p) {
    return `
        <div class="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-50 cursor-pointer product-card-mini" data-product-id="${p.id}">
            <div class="h-24 overflow-hidden">
                <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover" onerror="this.src='https://picsum.photos/seed/default/400/300'">
            </div>
            <div class="p-2">
                <h5 class="text-xs font-medium text-gray-800 truncate">${p.name}</h5>
                <div class="flex items-center justify-between mt-1">
                    <span class="text-sm font-bold text-red-500">¥${p.price}</span>
                    <span class="text-xs text-gray-400">${p.type}</span>
                </div>
            </div>
        </div>
    `;
}

function bindHomeEvents() {
    const main = document.getElementById('mobile-main');

    // 快捷入口
    main.querySelectorAll('.quick-item').forEach(item => {
        item.addEventListener('click', () => {
            const action = item.dataset.action;
            if (action === 'enroll') { switchTab('activities'); }
            else if (action === 'children') { switchTab('profile'); setTimeout(() => showChildrenManager(), 100); }
            else if (action === 'orders') { switchTab('orders'); }
            else if (action === 'shop') { showAllProducts(); }
        });
    });

    // 绑定研学人提示
    const bindHint = document.getElementById('btn-bind-child-hint');
    if (bindHint) bindHint.addEventListener('click', () => showAddChildForm());

    // 查看更多活动
    const moreAct = document.getElementById('btn-more-activities');
    if (moreAct) moreAct.addEventListener('click', () => switchTab('activities'));

    // 查看更多公告
    const moreAnn = document.getElementById('btn-more-announcements');
    if (moreAnn) moreAnn.addEventListener('click', () => showAllAnnouncements());

    // 查看更多周边
    const moreProd = document.getElementById('btn-more-products');
    if (moreProd) moreProd.addEventListener('click', () => showAllProducts());

    // 活动卡片点击
    main.querySelectorAll('.activity-scroll-card').forEach(card => {
        card.addEventListener('click', () => {
            const a = activities.find(x => x.id === card.dataset.id);
            if (a) showActivityDetail(a);
        });
    });

    // 公告点击
    main.querySelectorAll('.announcement-item').forEach(item => {
        item.addEventListener('click', () => {
            const a = announcements.find(x => x.id === item.dataset.id);
            if (a) showAnnouncementDetail(a);
        });
    });

    // 公告栏点击
    const noticeBar = document.getElementById('notice-bar');
    if (noticeBar) noticeBar.addEventListener('click', () => showAllAnnouncements());

    // 首页周边商品点击
    main.querySelectorAll('.product-card-mini').forEach(card => {
        card.addEventListener('click', () => {
            const p = surroundings.find(x => x.id === card.dataset.productId);
            if (p) showProductDetail(p);
        });
    });

    // Banner点击
    main.querySelectorAll('.banner-item').forEach(item => {
        item.addEventListener('click', () => {
            const a = announcements.find(x => x.id === item.dataset.id);
            if (a) showAnnouncementDetail(a);
        });
    });
}

// Banner轮播
function startBanner(count) {
    if (count <= 1) return;
    bannerIndex = 0;
    bannerTimer = setInterval(() => {
        bannerIndex = (bannerIndex + 1) % count;
        updateBanner();
    }, 4000);
}

function stopBanner() {
    if (bannerTimer) { clearInterval(bannerTimer); bannerTimer = null; }
}

function updateBanner() {
    const slide = document.getElementById('banner-slide');
    const dots = document.querySelectorAll('#banner-dots .banner-dot');
    if (slide) slide.style.transform = `translateX(-${bannerIndex * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === bannerIndex));
}

function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('#mobile-tabbar .tab-item').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
    renderTab(tab);
}

// ==================== 活动报名页 ====================

function renderActivitiesPage(container) {
    const enrollable = activities.filter(a => a.status === '报名中');
    const upcoming = activities.filter(a => a.status === '未开始');

    container.innerHTML = `
        <div class="px-4 pt-3 pb-2">
            <div class="flex items-center gap-2 bg-white rounded-full px-4 py-2.5 shadow-sm border border-gray-100">
                <i class="fas fa-search text-gray-300 text-sm"></i>
                <input type="text" placeholder="搜索活动名称、项目..." class="flex-1 text-sm outline-none bg-transparent" id="activity-search-input">
            </div>
        </div>

        <!-- 筛选标签 -->
        <div class="flex gap-2 px-4 pb-3 overflow-x-auto" id="activity-filter-tags" style="-webkit-overflow-scrolling:touch;">
            <span class="act-filter-tag active" data-filter="all">全部</span>
            <span class="act-filter-tag" data-filter="报名中">报名中</span>
            <span class="act-filter-tag" data-filter="未开始">即将开始</span>
            <span class="act-filter-tag" data-filter="红色教育">红色教育</span>
            <span class="act-filter-tag" data-filter="科技创新">科技创新</span>
            <span class="act-filter-tag" data-filter="自然生态">自然生态</span>
        </div>

        <div id="activity-list">
            ${activities.map(a => renderActivityCard(a)).join('')}
        </div>

        ${activities.length === 0 ? '<div class="mobile-empty"><i class="fas fa-calendar-times"></i><p>暂无可报名活动</p></div>' : ''}
    `;

    bindActivitiesEvents(container);
}

function renderActivityCard(a) {
    const progress = a.quota > 0 ? Math.round(a.enrolled / a.quota * 100) : 0;
    const remaining = a.quota - a.enrolled;
    return `
        <div class="activity-card" data-id="${a.id}">
            <div class="relative">
                <img src="${a.coverImage}" alt="${a.name}" class="activity-card-img" onerror="this.src='https://picsum.photos/seed/activity/600/300'">
                <div class="absolute top-3 left-3 flex gap-1.5">
                    ${a.tags.map(t => `<span class="px-2 py-0.5 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700">${t}</span>`).join('')}
                </div>
                <div class="absolute top-3 right-3">
                    ${a.status === '报名中' ? '<span class="px-2.5 py-1 rounded-full text-xs font-bold bg-green-500 text-white">报名中</span>' : '<span class="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-400 text-white">' + a.status + '</span>'}
                </div>
            </div>
            <div class="activity-card-body">
                <h4>${a.name}</h4>
                <p>${a.desc}</p>
                <div class="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    <span><i class="fas fa-map-marker-alt mr-1"></i>${a.location}</span>
                    <span><i class="fas fa-clock mr-1"></i>${a.duration}</span>
                    <span><i class="fas fa-calendar mr-1"></i>截止 ${a.endDate}</span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <div class="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div class="h-full rounded-full ${progress >= 90 ? 'bg-red-400' : progress >= 60 ? 'bg-blue-400' : 'bg-green-400'}" style="width:${Math.min(100, progress)}%"></div>
                    </div>
                    <span class="text-xs text-gray-400">${remaining > 0 ? '剩余' + remaining + '个名额' : '已满员'}</span>
                </div>
            </div>
            <div class="activity-card-footer">
                <div class="price">¥${a.price}<span>/人</span></div>
                ${a.status === '报名中' && remaining > 0 ? `<button class="enroll-btn" data-id="${a.id}">立即报名</button>` : `<button class="enroll-btn disabled" disabled>${remaining <= 0 ? '已满员' : '暂未开放'}</button>`}
            </div>
        </div>
    `;
}

function bindActivitiesEvents(container) {
    // 搜索
    const searchInput = document.getElementById('activity-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const keyword = searchInput.value.trim().toLowerCase();
            filterActivities(keyword, getCurrentActivityFilter());
        });
    }

    // 筛选标签
    container.querySelectorAll('.act-filter-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            container.querySelectorAll('.act-filter-tag').forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            const keyword = searchInput ? searchInput.value.trim().toLowerCase() : '';
            filterActivities(keyword, tag.dataset.filter);
        });
    });

    // 活动卡片点击
    container.addEventListener('click', (e) => {
        const enrollBtn = e.target.closest('.enroll-btn:not(.disabled)');
        const card = e.target.closest('.activity-card');

        if (enrollBtn) {
            e.stopPropagation();
            const a = activities.find(x => x.id === enrollBtn.dataset.id);
            if (a) showEnrollForm(a);
            return;
        }
        if (card) {
            const a = activities.find(x => x.id === card.dataset.id);
            if (a) showActivityDetail(a);
        }
    });
}

function getCurrentActivityFilter() {
    const active = document.querySelector('.act-filter-tag.active');
    return active ? active.dataset.filter : 'all';
}

function filterActivities(keyword, filter) {
    const list = document.getElementById('activity-list');
    if (!list) return;
    const filtered = activities.filter(a => {
        const matchKeyword = !keyword || a.name.toLowerCase().includes(keyword) || a.project.toLowerCase().includes(keyword) || a.location.toLowerCase().includes(keyword);
        const matchFilter = filter === 'all' || a.status === filter || a.tags.some(t => t.includes(filter));
        return matchKeyword && matchFilter;
    });
    list.innerHTML = filtered.length > 0 ? filtered.map(a => renderActivityCard(a)).join('') : '<div class="mobile-empty"><i class="fas fa-search"></i><p>没有找到匹配的活动</p></div>';
}

// ==================== 订单页 ====================

function renderOrdersPage(container) {
    container.innerHTML = `
        <div class="px-4 pt-3 pb-2">
            <h2 class="text-lg font-bold text-gray-800">我的订单</h2>
        </div>

        <!-- 订单状态Tab -->
        <div class="flex gap-0 bg-white mx-4 rounded-xl overflow-hidden shadow-sm border border-gray-100 mb-3">
            <div class="order-tab active flex-1 text-center py-2.5 text-sm font-medium cursor-pointer" data-status="all">全部</div>
            <div class="order-tab flex-1 text-center py-2.5 text-sm font-medium cursor-pointer" data-status="待支付">待支付</div>
            <div class="order-tab flex-1 text-center py-2.5 text-sm font-medium cursor-pointer" data-status="已支付">已支付</div>
            <div class="order-tab flex-1 text-center py-2.5 text-sm font-medium cursor-pointer" data-status="已取消">已取消</div>
        </div>

        <div id="order-list">
            ${renderOrderList(orders)}
        </div>
    `;

    bindOrdersEvents(container);
}

function renderOrderList(list) {
    if (list.length === 0) {
        return '<div class="mobile-empty"><i class="fas fa-receipt"></i><p>暂无订单记录</p></div>';
    }
    return list.map(o => {
        const statusColor = o.status === '已支付' ? 'text-green-500' : o.status === '待支付' ? 'text-orange-500' : 'text-gray-400';
        const activity = activities.find(a => a.id === o.activityId);
        return `
            <div class="bg-white mx-4 mb-3 rounded-xl shadow-sm border border-gray-50 overflow-hidden order-card" data-id="${o.id}">
                <div class="flex items-center justify-between px-4 py-3 border-b border-gray-50">
                    <span class="text-xs text-gray-400 font-mono">${o.id}</span>
                    <span class="text-xs font-medium ${statusColor}">${o.status}</span>
                </div>
                <div class="flex gap-3 p-4">
                    <div class="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        <img src="${activity?.coverImage || 'https://picsum.photos/seed/order/600/300'}" alt="" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-1 min-w-0">
                        <h4 class="text-sm font-semibold text-gray-800 truncate">${o.activityName}</h4>
                        <p class="text-xs text-gray-400 mt-1">报名学生：${o.childName}</p>
                        <p class="text-xs text-gray-400 mt-0.5">${o.createDate}</p>
                    </div>
                    <div class="flex flex-col items-end justify-center">
                        <span class="text-base font-bold text-red-500">¥${o.amount}</span>
                    </div>
                </div>
                ${o.status === '待支付' ? `
                <div class="flex border-t border-gray-50">
                    <button class="flex-1 py-2.5 text-sm text-gray-500 border-r border-gray-50 btn-cancel-order" data-id="${o.id}">取消订单</button>
                    <button class="flex-1 py-2.5 text-sm text-blue-500 font-medium btn-pay-order" data-id="${o.id}">立即支付</button>
                </div>` : ''}
            </div>
        `;
    }).join('');
}

function bindOrdersEvents(container) {
    // 订单Tab切换
    container.querySelectorAll('.order-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            container.querySelectorAll('.order-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const status = tab.dataset.status;
            const filtered = status === 'all' ? orders : orders.filter(o => o.status === status);
            document.getElementById('order-list').innerHTML = renderOrderList(filtered);
            bindOrderCardEvents();
        });
    });

    bindOrderCardEvents();
}

function bindOrderCardEvents() {
    // 支付按钮
    document.querySelectorAll('.btn-pay-order').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const order = orders.find(o => o.id === btn.dataset.id);
            if (order) {
                order.status = '已支付';
                order.payDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
                order.payMethod = '微信支付';
                showMobileToast('支付成功！');
                renderOrdersPage(document.getElementById('mobile-main'));
            }
        });
    });

    // 取消按钮
    document.querySelectorAll('.btn-cancel-order').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const order = orders.find(o => o.id === btn.dataset.id);
            if (order) {
                order.status = '已取消';
                showMobileToast('订单已取消');
                renderOrdersPage(document.getElementById('mobile-main'));
            }
        });
    });

    // 订单卡片点击查看详情
    document.querySelectorAll('.order-card').forEach(card => {
        card.addEventListener('click', () => {
            const order = orders.find(o => o.id === card.dataset.id);
            if (order) showOrderDetail(order);
        });
    });
}

// ==================== 我的页面 ====================

function renderProfilePage(container) {
    const paidOrders = orders.filter(o => o.status === '已支付').length;
    const totalSpent = orders.filter(o => o.status === '已支付').reduce((s, o) => s + o.amount, 0);

    container.innerHTML = `
        <div class="profile-header">
            <div class="profile-avatar">
                <div class="profile-avatar-icon"><i class="fas fa-user"></i></div>
            </div>
            <div class="profile-name">${parentInfo.name || '清风'}</div>
            <div class="profile-dept">欢迎使用研学家长端</div>
        </div>

        <div class="profile-stats">
            <div class="profile-stat-item">
                <div class="num">${children.length}</div>
                <div class="label">绑定研学人</div>
            </div>
            <div class="profile-stat-item">
                <div class="num">${orders.length}</div>
                <div class="label">报名订单</div>
            </div>
            <div class="profile-stat-item">
                <div class="num">${paidOrders}</div>
                <div class="label">已支付</div>
            </div>
            <div class="profile-stat-item">
                <div class="num">¥${totalSpent}</div>
                <div class="label">总消费</div>
            </div>
        </div>

        <!-- 我的研学人 -->
        <div class="profile-menu" id="profile-children-section">
            <div class="flex items-center justify-between px-4 py-3 border-b border-gray-50">
                <span class="text-sm font-semibold text-gray-800"><i class="fas fa-child text-blue-500 mr-2"></i>我的研学人</span>
                <button class="text-xs text-blue-500 font-medium" id="btn-add-child-profile"><i class="fas fa-plus mr-1"></i>添加</button>
            </div>
            ${children.length === 0 ? `
                <div class="text-center py-8 text-gray-400">
                    <i class="fas fa-user-plus text-3xl mb-2 block"></i>
                    <p class="text-sm">还未绑定研学人</p>
                    <button class="mt-2 px-4 py-1.5 bg-blue-500 text-white text-xs rounded-full" id="btn-bind-first-child">立即绑定</button>
                </div>
            ` : children.map(c => `
                <div class="profile-menu-item child-item" data-id="${c.id}">
                    <div class="menu-icon bg-blue-50 text-blue-500">
                        <i class="fas ${c.gender === '女' ? 'fa-female' : 'fa-male'}"></i>
                    </div>
                    <div class="flex-1">
                        <div class="menu-text">${c.name}</div>
                        <div class="text-xs text-gray-400 mt-0.5">${c.school} · ${c.grade} · ${c.gender}</div>
                    </div>
                    <button class="text-xs text-red-400 px-2 py-1 btn-remove-child" data-id="${c.id}"><i class="fas fa-times"></i></button>
                </div>
            `).join('')}
        </div>

        <!-- 功能菜单 -->
        <div class="profile-menu">
            <div class="profile-menu-item" id="menu-orders">
                <div class="menu-icon bg-orange-50 text-orange-500"><i class="fas fa-receipt"></i></div>
                <div class="menu-text">我的订单</div>
                ${orders.filter(o => o.status === '待支付').length > 0 ? `<span class="menu-badge">${orders.filter(o => o.status === '待支付').length}</span>` : ''}
                <i class="fas fa-chevron-right menu-arrow"></i>
            </div>
            <div class="profile-menu-item" id="menu-announcements">
                <div class="menu-icon bg-blue-50 text-blue-500"><i class="fas fa-bullhorn"></i></div>
                <div class="menu-text">公告通知</div>
                <i class="fas fa-chevron-right menu-arrow"></i>
            </div>
            <div class="profile-menu-item" id="menu-shop">
                <div class="menu-icon bg-purple-50 text-purple-500"><i class="fas fa-store"></i></div>
                <div class="menu-text">研学周边</div>
                <i class="fas fa-chevron-right menu-arrow"></i>
            </div>
            <div class="profile-menu-item" id="menu-about">
                <div class="menu-icon bg-gray-50 text-gray-500"><i class="fas fa-info-circle"></i></div>
                <div class="menu-text">关于平台</div>
                <i class="fas fa-chevron-right menu-arrow"></i>
            </div>
        </div>

        <!-- 返回管理台 -->
        <div class="mx-4 mt-4 mb-4">
            <a href="index.html" class="block w-full py-3 text-center text-sm text-gray-500 bg-white rounded-xl border border-gray-200 shadow-sm">
                <i class="fas fa-desktop mr-2"></i>返回管理台
            </a>
        </div>
    `;

    bindProfileEvents(container);
}

function bindProfileEvents(container) {
    // 添加研学人
    const addBtn = document.getElementById('btn-add-child-profile');
    if (addBtn) addBtn.addEventListener('click', () => showAddChildForm());

    const bindFirst = document.getElementById('btn-bind-first-child');
    if (bindFirst) bindFirst.addEventListener('click', () => showAddChildForm());

    // 删除研学人
    container.querySelectorAll('.btn-remove-child').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.dataset.id;
            const child = children.find(c => c.id === id);
            if (child && confirm(`确定要解绑 ${child.name} 吗？`)) {
                children = children.filter(c => c.id !== id);
                showMobileToast('已解绑');
                renderProfilePage(container);
            }
        });
    });

    // 菜单项
    document.getElementById('menu-orders')?.addEventListener('click', () => switchTab('orders'));
    document.getElementById('menu-announcements')?.addEventListener('click', () => showAllAnnouncements());
    document.getElementById('menu-shop')?.addEventListener('click', () => showAllProducts());
    document.getElementById('menu-about')?.addEventListener('click', () => showMobileToast('研学管理平台 v2.0'));
}

// ==================== 详情页 / 弹窗 ====================

// 活动详情页
function showActivityDetail(a) {
    const progress = a.quota > 0 ? Math.round(a.enrolled / a.quota * 100) : 0;
    const remaining = a.quota - a.enrolled;
    const main = document.getElementById('mobile-main');

    const detailHtml = `
        <div class="detail-page" id="detail-page">
            <div class="detail-header">
                <button class="back-btn" id="detail-back"><i class="fas fa-arrow-left"></i></button>
                <h2>活动详情</h2>
                <div style="width:32px;"></div>
            </div>
            <div class="pb-20">
                <div class="relative">
                    <img src="${a.coverImage}" alt="${a.name}" class="w-full" style="height:200px;object-fit:cover;" onerror="this.src='https://picsum.photos/seed/detail/600/300'">
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <div class="flex gap-1.5 mb-1">
                            ${a.tags.map(t => `<span class="px-2 py-0.5 rounded-full text-xs bg-white/20 text-white backdrop-blur-sm">${t}</span>`).join('')}
                        </div>
                    </div>
                </div>

                <div class="px-4 py-4">
                    <h1 class="text-lg font-bold text-gray-900 mb-2">${a.name}</h1>
                    <div class="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span><i class="fas fa-map-marker-alt text-red-400 mr-1"></i>${a.location}</span>
                        <span><i class="fas fa-clock text-blue-400 mr-1"></i>${a.duration}</span>
                        <span><i class="fas fa-school text-green-400 mr-1"></i>${a.school}</span>
                    </div>

                    <!-- 报名进度 -->
                    <div class="bg-gray-50 rounded-xl p-4 mb-4">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-sm font-medium text-gray-700">报名进度</span>
                            <span class="text-sm text-gray-500">${a.enrolled}/${a.quota}人</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div class="h-full rounded-full transition-all ${progress >= 90 ? 'bg-red-400' : progress >= 60 ? 'bg-blue-400' : 'bg-green-400'}" style="width:${Math.min(100, progress)}%"></div>
                        </div>
                        <div class="flex items-center justify-between mt-2 text-xs text-gray-400">
                            <span>报名截止：${a.endDate}</span>
                            <span>${remaining > 0 ? '剩余' + remaining + '个名额' : '已满员'}</span>
                        </div>
                    </div>

                    <!-- 活动信息 -->
                    <div class="space-y-3 mb-4">
                        <h3 class="text-base font-semibold text-gray-800">活动介绍</h3>
                        <p class="text-sm text-gray-600 leading-relaxed">${a.desc}</p>
                    </div>

                    <div class="space-y-2 mb-4">
                        <h3 class="text-base font-semibold text-gray-800">活动信息</h3>
                        <div class="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
                            <div class="flex items-center justify-between px-4 py-3">
                                <span class="text-sm text-gray-500">关联项目</span>
                                <span class="text-sm text-gray-800">${a.project}</span>
                            </div>
                            <div class="flex items-center justify-between px-4 py-3">
                                <span class="text-sm text-gray-500">活动时长</span>
                                <span class="text-sm text-gray-800">${a.duration}</span>
                            </div>
                            <div class="flex items-center justify-between px-4 py-3">
                                <span class="text-sm text-gray-500">报名时间</span>
                                <span class="text-sm text-gray-800">${a.startDate} ~ ${a.endDate}</span>
                            </div>
                            <div class="flex items-center justify-between px-4 py-3">
                                <span class="text-sm text-gray-500">活动费用</span>
                                <span class="text-sm font-bold text-red-500">¥${a.price}/人</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 底部操作栏 -->
            ${a.status === '报名中' && remaining > 0 ? `
            <div class="fixed bottom-0 left-0 right-0 w-full max-w-[480px] mx-auto bg-white border-t border-gray-100 px-4 py-3 flex items-center justify-between z-10">
                <div>
                    <span class="text-xs text-gray-400">活动费用</span>
                    <div class="text-xl font-bold text-red-500">¥${a.price}</div>
                </div>
                <button class="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full shadow-lg" id="detail-enroll-btn" data-id="${a.id}">立即报名</button>
            </div>` : ''}
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', detailHtml);

    document.getElementById('detail-back').addEventListener('click', () => {
        document.getElementById('detail-page')?.remove();
    });

    const enrollBtn = document.getElementById('detail-enroll-btn');
    if (enrollBtn) {
        enrollBtn.addEventListener('click', () => {
            document.getElementById('detail-page')?.remove();
            showEnrollForm(a);
        });
    }
}

// 公告详情
function showAnnouncementDetail(a) {
    const detailHtml = `
        <div class="detail-page" id="detail-page">
            <div class="detail-header">
                <button class="back-btn" id="detail-back"><i class="fas fa-arrow-left"></i></button>
                <h2>公告详情</h2>
                <div style="width:32px;"></div>
            </div>
            <div class="px-4 py-4">
                ${a.coverImage ? `<div class="rounded-xl overflow-hidden mb-4" style="height:180px;"><img src="${a.coverImage}" alt="" class="w-full h-full object-cover"></div>` : ''}
                <span class="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 mb-3">${a.type}</span>
                <h1 class="text-lg font-bold text-gray-900 mb-2">${a.title}</h1>
                <div class="flex items-center gap-4 text-xs text-gray-400 mb-4 pb-4 border-b border-gray-100">
                    <span><i class="fas fa-clock mr-1"></i>${a.publishDate}</span>
                    <span><i class="fas fa-eye mr-1"></i>${a.viewCount}次浏览</span>
                </div>
                <div class="bg-blue-50 rounded-lg p-3 mb-4">
                    <p class="text-sm text-blue-700 leading-relaxed">${a.summary}</p>
                </div>
                <div class="text-sm text-gray-700 leading-relaxed">
                    <p>${a.summary}</p>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', detailHtml);
    document.getElementById('detail-back').addEventListener('click', () => {
        document.getElementById('detail-page')?.remove();
    });
}

// 全部公告
function showAllAnnouncements() {
    const detailHtml = `
        <div class="detail-page" id="detail-page">
            <div class="detail-header">
                <button class="back-btn" id="detail-back"><i class="fas fa-arrow-left"></i></button>
                <h2>全部公告</h2>
                <div style="width:32px;"></div>
            </div>
            <div class="py-3">
                ${announcements.map(a => renderAnnouncementItem(a)).join('')}
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', detailHtml);
    document.getElementById('detail-back').addEventListener('click', () => {
        document.getElementById('detail-page')?.remove();
    });
    document.querySelectorAll('#detail-page .announcement-item').forEach(item => {
        item.addEventListener('click', () => {
            const a = announcements.find(x => x.id === item.dataset.id);
            if (a) {
                document.getElementById('detail-page')?.remove();
                showAnnouncementDetail(a);
            }
        });
    });
}

// 全部周边商品
function showAllProducts() {
    const detailHtml = `
        <div class="detail-page" id="detail-page">
            <div class="detail-header">
                <button class="back-btn" id="detail-back"><i class="fas fa-arrow-left"></i></button>
                <h2>研学周边</h2>
                <div style="width:32px;"></div>
            </div>
            <div class="grid grid-cols-2 gap-3 p-4" id="all-products-grid">
                ${surroundings.map(p => `
                    <div class="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-50 cursor-pointer product-card-all" data-product-id="${p.id}">
                        <div class="h-32 overflow-hidden">
                            <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover" onerror="this.src='https://picsum.photos/seed/default/400/300'">
                        </div>
                        <div class="p-3">
                            <h5 class="text-sm font-medium text-gray-800 truncate">${p.name}</h5>
                            <p class="text-xs text-gray-400 mt-1 truncate">${p.base}</p>
                            <div class="flex items-center justify-between mt-2">
                                <span class="text-base font-bold text-red-500">¥${p.price}</span>
                                <span class="text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-500">${p.type}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', detailHtml);
    document.getElementById('detail-back').addEventListener('click', () => {
        document.getElementById('detail-page')?.remove();
    });
    // 绑定商品卡片点击事件
    document.querySelectorAll('#detail-page .product-card-all').forEach(card => {
        card.addEventListener('click', () => {
            const p = surroundings.find(x => x.id === card.dataset.productId);
            if (p) {
                document.getElementById('detail-page')?.remove();
                showProductDetail(p);
            }
        });
    });
}

// 商品详情页
function showProductDetail(p) {
    const detailHtml = `
        <div class="detail-page" id="detail-page">
            <div class="detail-header">
                <button class="back-btn" id="detail-back"><i class="fas fa-arrow-left"></i></button>
                <h2>商品详情</h2>
                <div style="width:32px;"></div>
            </div>
            <div class="pb-20">
                <!-- 商品图片 -->
                <div class="relative">
                    <img src="${p.image}" alt="${p.name}" class="w-full" style="height:240px;object-fit:cover;" onerror="this.src='https://picsum.photos/seed/default/400/300'">
                    <div class="absolute top-3 right-3">
                        <span class="px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700">${p.type}</span>
                    </div>
                </div>

                <!-- 价格与名称 -->
                <div class="bg-white px-4 py-4 mb-2">
                    <div class="flex items-baseline gap-2 mb-2">
                        <span class="text-2xl font-bold text-red-500 cursor-pointer product-price-tap">¥${p.price}</span>
                        <span class="text-sm text-gray-400 line-through cursor-pointer product-price-tap">¥${(p.price * 1.3).toFixed(1)}</span>
                        <span class="px-1.5 py-0.5 bg-red-50 text-red-500 text-xs rounded font-medium">研学价</span>
                    </div>
                    <h1 class="text-lg font-bold text-gray-900 mb-1">${p.name}</h1>
                    <div class="flex items-center gap-4 text-xs text-gray-400 mt-2">
                        <span><i class="fas fa-store mr-1"></i>${p.base}</span>
                        <span><i class="fas fa-fire mr-1 text-orange-400"></i>已售${p.sales || 0}件</span>
                        <span>库存${p.stock || 0}件</span>
                    </div>
                </div>

                <!-- 商品信息 -->
                <div class="bg-white px-4 py-4 mb-2">
                    <h3 class="text-sm font-semibold text-gray-800 mb-3">商品信息</h3>
                    <div class="divide-y divide-gray-50">
                        <div class="flex items-center justify-between py-2.5">
                            <span class="text-sm text-gray-500">商品编号</span>
                            <span class="text-sm text-gray-800 font-mono">${p.id}</span>
                        </div>
                        <div class="flex items-center justify-between py-2.5">
                            <span class="text-sm text-gray-500">商品分类</span>
                            <span class="text-sm text-gray-800">${p.type}</span>
                        </div>
                        <div class="flex items-center justify-between py-2.5">
                            <span class="text-sm text-gray-500">所属基地</span>
                            <span class="text-sm text-gray-800">${p.base}</span>
                        </div>
                        <div class="flex items-center justify-between py-2.5">
                            <span class="text-sm text-gray-500">库存数量</span>
                            <span class="text-sm ${(p.stock || 0) > 50 ? 'text-green-500' : 'text-orange-500'}">${p.stock || 0}件</span>
                        </div>
                    </div>
                </div>

                <!-- 商品详情 -->
                <div class="bg-white px-4 py-4 mb-2">
                    <h3 class="text-sm font-semibold text-gray-800 mb-3">商品详情</h3>
                    <p class="text-sm text-gray-600 leading-relaxed">${p.desc || '暂无详细描述'}</p>
                </div>

                <!-- 推荐商品 -->
                <div class="bg-white px-4 py-4">
                    <h3 class="text-sm font-semibold text-gray-800 mb-3">你可能还喜欢</h3>
                    <div class="flex gap-3 overflow-x-auto pb-2" style="-webkit-overflow-scrolling:touch;">
                        ${surroundings.filter(s => s.id !== p.id).slice(0, 4).map(s => `
                            <div class="min-w-[120px] max-w-[120px] flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden cursor-pointer recommend-product" data-product-id="${s.id}">
                                <div class="h-20 overflow-hidden">
                                    <img src="${s.image}" alt="${s.name}" class="w-full h-full object-cover" onerror="this.src='https://picsum.photos/seed/default/400/300'">
                                </div>
                                <div class="p-2">
                                    <h6 class="text-xs text-gray-700 truncate">${s.name}</h6>
                                    <span class="text-xs font-bold text-red-500">¥${s.price}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- 底部操作栏 -->
            <div class="fixed bottom-0 left-0 right-0 w-full max-w-[480px] mx-auto bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3 z-10">
                <button class="w-full py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold rounded-full text-sm shadow-lg" id="product-go-buy">
                    <i class="fas fa-external-link-alt mr-1"></i>去购买
                </button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', detailHtml);

    document.getElementById('detail-back').addEventListener('click', () => {
        document.getElementById('detail-page')?.remove();
    });

    // 价格点击toast
    document.querySelectorAll('#detail-page .product-price-tap').forEach(el => {
        el.addEventListener('click', () => {
            showMobileToast('当前价格：¥' + p.price);
        });
    });

    // 去购买 - 跳转第三方平台
    document.getElementById('product-go-buy')?.addEventListener('click', () => {
        showMobileToast('正在跳转第三方购买平台...');
        setTimeout(() => {
            window.open('https://mall.jd.com/', '_blank');
        }, 800);
    });

    // 推荐商品点击
    document.querySelectorAll('#detail-page .recommend-product').forEach(card => {
        card.addEventListener('click', () => {
            const s = surroundings.find(x => x.id === card.dataset.productId);
            if (s) {
                document.getElementById('detail-page')?.remove();
                showProductDetail(s);
            }
        });
    });
}

// 订单详情
function showOrderDetail(o) {
    const activity = activities.find(a => a.id === o.activityId);
    const statusColor = o.status === '已支付' ? 'text-green-500' : o.status === '待支付' ? 'text-orange-500' : 'text-gray-400';
    const statusBg = o.status === '已支付' ? 'bg-green-50' : o.status === '待支付' ? 'bg-orange-50' : 'bg-gray-50';

    const detailHtml = `
        <div class="detail-page" id="detail-page">
            <div class="detail-header">
                <button class="back-btn" id="detail-back"><i class="fas fa-arrow-left"></i></button>
                <h2>订单详情</h2>
                <div style="width:32px;"></div>
            </div>
            <div class="px-4 py-4">
                <!-- 状态 -->
                <div class="${statusBg} rounded-xl p-4 mb-4 text-center">
                    <i class="fas ${o.status === '已支付' ? 'fa-check-circle text-green-500' : o.status === '待支付' ? 'fa-hourglass-half text-orange-500' : 'fa-times-circle text-gray-400'} text-3xl mb-2"></i>
                    <div class="text-lg font-bold ${statusColor}">${o.status}</div>
                </div>

                <!-- 活动信息 -->
                <div class="bg-white rounded-xl border border-gray-100 p-4 mb-4">
                    <div class="flex gap-3">
                        <div class="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img src="${activity?.coverImage || ''}" alt="" class="w-full h-full object-cover">
                        </div>
                        <div class="flex-1">
                            <h4 class="text-sm font-semibold text-gray-800">${o.activityName}</h4>
                            <p class="text-xs text-gray-400 mt-1">${o.project}</p>
                        </div>
                    </div>
                </div>

                <!-- 订单信息 -->
                <div class="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50 mb-4">
                    <div class="flex items-center justify-between px-4 py-3">
                        <span class="text-sm text-gray-500">订单编号</span>
                        <span class="text-sm text-gray-800 font-mono">${o.id}</span>
                    </div>
                    <div class="flex items-center justify-between px-4 py-3">
                        <span class="text-sm text-gray-500">报名学生</span>
                        <span class="text-sm text-gray-800">${o.childName}</span>
                    </div>
                    <div class="flex items-center justify-between px-4 py-3">
                        <span class="text-sm text-gray-500">订单金额</span>
                        <span class="text-sm font-bold text-red-500">¥${o.amount}</span>
                    </div>
                    <div class="flex items-center justify-between px-4 py-3">
                        <span class="text-sm text-gray-500">支付方式</span>
                        <span class="text-sm text-gray-800">${o.payMethod || '未支付'}</span>
                    </div>
                    <div class="flex items-center justify-between px-4 py-3">
                        <span class="text-sm text-gray-500">创建时间</span>
                        <span class="text-sm text-gray-800">${o.createDate}</span>
                    </div>
                    <div class="flex items-center justify-between px-4 py-3">
                        <span class="text-sm text-gray-500">支付时间</span>
                        <span class="text-sm text-gray-800">${o.payDate || '-'}</span>
                    </div>
                    ${o.remark ? `<div class="flex items-center justify-between px-4 py-3">
                        <span class="text-sm text-gray-500">备注</span>
                        <span class="text-sm text-gray-800">${o.remark}</span>
                    </div>` : ''}
                </div>

                ${o.status === '待支付' ? `
                <button class="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg" id="detail-pay-btn" data-id="${o.id}">立即支付 ¥${o.amount}</button>
                ` : ''}
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', detailHtml);
    document.getElementById('detail-back').addEventListener('click', () => {
        document.getElementById('detail-page')?.remove();
    });

    const payBtn = document.getElementById('detail-pay-btn');
    if (payBtn) {
        payBtn.addEventListener('click', () => {
            o.status = '已支付';
            o.payDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
            o.payMethod = '微信支付';
            showMobileToast('支付成功！');
            document.getElementById('detail-page')?.remove();
            renderOrdersPage(document.getElementById('mobile-main'));
        });
    }
}

// ==================== 报名流程 ====================

function showEnrollForm(activity) {
    if (children.length === 0) {
        showMobileToast('请先绑定研学人再报名');
        setTimeout(() => showAddChildForm(), 500);
        return;
    }

    const detailHtml = `
        <div class="detail-page" id="detail-page">
            <div class="detail-header">
                <button class="back-btn" id="detail-back"><i class="fas fa-arrow-left"></i></button>
                <h2>确认报名</h2>
                <div style="width:32px;"></div>
            </div>
            <div class="px-4 py-4">
                <!-- 活动信息 -->
                <div class="bg-white rounded-xl border border-gray-100 p-4 mb-4">
                    <div class="flex gap-3">
                        <div class="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img src="${activity.coverImage}" alt="" class="w-full h-full object-cover">
                        </div>
                        <div class="flex-1">
                            <h4 class="text-sm font-semibold text-gray-800">${activity.name}</h4>
                            <p class="text-xs text-gray-400 mt-1"><i class="fas fa-map-marker-alt mr-1"></i>${activity.location} · ${activity.duration}</p>
                        </div>
                    </div>
                </div>

                <!-- 选择研学人 -->
                <div class="bg-white rounded-xl border border-gray-100 p-4 mb-4">
                    <h3 class="text-sm font-semibold text-gray-800 mb-3"><i class="fas fa-child text-blue-500 mr-2"></i>选择报名研学人</h3>
                    <div class="space-y-2" id="enroll-children-list">
                        ${children.map((c, i) => `
                            <label class="flex items-center gap-3 p-3 rounded-lg border ${i === 0 ? 'border-blue-300 bg-blue-50' : 'border-gray-100'} cursor-pointer enroll-child-option" data-id="${c.id}">
                                <input type="radio" name="enroll-child" value="${c.id}" ${i === 0 ? 'checked' : ''} class="accent-blue-500">
                                <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-sm">
                                    <i class="fas ${c.gender === '女' ? 'fa-female' : 'fa-male'}"></i>
                                </div>
                                <div class="flex-1">
                                    <div class="text-sm font-medium text-gray-800">${c.name}</div>
                                    <div class="text-xs text-gray-400">${c.school} · ${c.grade}</div>
                                </div>
                            </label>
                        `).join('')}
                    </div>
                    <button class="mt-3 text-xs text-blue-500 font-medium" id="enroll-add-child"><i class="fas fa-plus mr-1"></i>添加新的研学人</button>
                </div>

                <!-- 费用明细 -->
                <div class="bg-white rounded-xl border border-gray-100 p-4 mb-4">
                    <h3 class="text-sm font-semibold text-gray-800 mb-3"><i class="fas fa-receipt text-orange-500 mr-2"></i>费用明细</h3>
                    <div class="space-y-2">
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-gray-500">活动报名费</span>
                            <span class="text-gray-800">¥${activity.price}</span>
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-gray-500">优惠减免</span>
                            <span class="text-green-500">-¥0</span>
                        </div>
                        <div class="border-t border-gray-100 pt-2 flex items-center justify-between">
                            <span class="text-sm font-medium text-gray-700">应付金额</span>
                            <span class="text-lg font-bold text-red-500">¥${activity.price}</span>
                        </div>
                    </div>
                </div>

                <!-- 备注 -->
                <div class="bg-white rounded-xl border border-gray-100 p-4 mb-4">
                    <h3 class="text-sm font-semibold text-gray-800 mb-3"><i class="fas fa-edit text-gray-400 mr-2"></i>备注信息</h3>
                    <textarea class="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-blue-300 resize-none" rows="2" placeholder="选填，如有特殊需求请备注" id="enroll-remark"></textarea>
                </div>

                <!-- 提交按钮 -->
                <button class="w-full py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg text-base" id="enroll-submit-btn">
                    提交订单 ¥${activity.price}
                </button>

                <p class="text-center text-xs text-gray-400 mt-3">提交订单后请在30分钟内完成支付</p>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', detailHtml);

    // 返回
    document.getElementById('detail-back').addEventListener('click', () => {
        document.getElementById('detail-page')?.remove();
    });

    // 选择研学人高亮
    document.querySelectorAll('.enroll-child-option').forEach(opt => {
        opt.addEventListener('click', () => {
            document.querySelectorAll('.enroll-child-option').forEach(o => {
                o.classList.remove('border-blue-300', 'bg-blue-50');
                o.classList.add('border-gray-100');
            });
            opt.classList.remove('border-gray-100');
            opt.classList.add('border-blue-300', 'bg-blue-50');
            opt.querySelector('input[type="radio"]').checked = true;
        });
    });

    // 添加研学人
    document.getElementById('enroll-add-child').addEventListener('click', () => {
        document.getElementById('detail-page')?.remove();
        showAddChildForm(() => showEnrollForm(activity));
    });

    // 提交订单
    document.getElementById('enroll-submit-btn').addEventListener('click', () => {
        const selectedRadio = document.querySelector('input[name="enroll-child"]:checked');
        if (!selectedRadio) {
            showMobileToast('请选择报名学生');
            return;
        }
        const childId = selectedRadio.value;
        const child = children.find(c => c.id === childId);
        const remark = document.getElementById('enroll-remark').value.trim();

        // 检查是否已报名
        const existOrder = orders.find(o => o.childId === childId && o.activityId === activity.id && o.status !== '已取消');
        if (existOrder) {
            showMobileToast('该学生已报名此活动');
            return;
        }

        // 生成订单
        const order = {
            id: generateOrderId(),
            childName: child.name,
            childId: childId,
            activityId: activity.id,
            activityName: activity.name,
            project: activity.project,
            amount: activity.price,
            status: '待支付',
            payMethod: '',
            createDate: new Date().toISOString().replace('T', ' ').substring(0, 19),
            payDate: '',
            remark: remark,
        };
        orders.unshift(order);

        // 更新报名人数
        activity.enrolled = Math.min(activity.quota, activity.enrolled + 1);

        document.getElementById('detail-page')?.remove();
        showMobileToast('订单已生成，请尽快支付');

        // 跳转到订单详情
        setTimeout(() => showOrderDetail(order), 300);
    });
}

// ==================== 绑定研学人 ====================

function showAddChildForm(callback) {
    const detailHtml = `
        <div class="detail-page" id="detail-page">
            <div class="detail-header">
                <button class="back-btn" id="detail-back"><i class="fas fa-arrow-left"></i></button>
                <h2>绑定研学人</h2>
                <div style="width:32px;"></div>
            </div>
            <div class="px-4 py-4">
                <div class="bg-blue-50 rounded-xl p-4 mb-4">
                    <div class="flex items-center gap-2 text-sm text-blue-700">
                        <i class="fas fa-info-circle"></i>
                        <span>绑定研学人后即可为其报名研学活动</span>
                    </div>
                </div>

                <div class="bg-white rounded-xl border border-gray-100 p-4 space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1.5">研学人姓名 <span class="text-red-500">*</span></label>
                        <input type="text" class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-300" placeholder="请输入研学人真实姓名" id="child-name">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1.5">学号 <span class="text-red-500">*</span></label>
                        <input type="text" class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-300" placeholder="请输入学号（如STU001）" id="child-student-id">
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1.5">性别</label>
                            <select class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-300 bg-white" id="child-gender">
                                <option value="男">男</option>
                                <option value="女">女</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1.5">年龄</label>
                            <input type="number" class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-300" placeholder="年龄" min="6" max="18" id="child-age">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1.5">学校 <span class="text-red-500">*</span></label>
                        <select class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-300 bg-white" id="child-school">
                            <option value="">请选择学校</option>
                            <option value="北京市第一中学">北京市第一中学</option>
                            <option value="北京市实验中学">北京市实验中学</option>
                            <option value="清华附中">清华附中</option>
                            <option value="人大附中">人大附中</option>
                            <option value="北京四中">北京四中</option>
                            <option value="北师大附中">北师大附中</option>
                            <option value="北京市海淀小学">北京市海淀小学</option>
                            <option value="北京市朝阳小学">北京市朝阳小学</option>
                            <option value="北京市朝阳中学">北京市朝阳中学</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1.5">年级 <span class="text-red-500">*</span></label>
                        <select class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-300 bg-white" id="child-grade">
                            <option value="">请选择年级</option>
                            <option value="五年级">五年级</option>
                            <option value="六年级">六年级</option>
                            <option value="初一">初一</option>
                            <option value="初二">初二</option>
                            <option value="初三">初三</option>
                            <option value="高一">高一</option>
                            <option value="高二">高二</option>
                        </select>
                    </div>
                </div>

                <button class="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg" id="child-submit-btn">确认绑定</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', detailHtml);

    document.getElementById('detail-back').addEventListener('click', () => {
        document.getElementById('detail-page')?.remove();
    });

    document.getElementById('child-submit-btn').addEventListener('click', () => {
        const name = document.getElementById('child-name').value.trim();
        const studentId = document.getElementById('child-student-id').value.trim();
        const school = document.getElementById('child-school').value;
        const grade = document.getElementById('child-grade').value;
        const gender = document.getElementById('child-gender').value;
        const age = parseInt(document.getElementById('child-age').value) || 12;

        if (!name) { showMobileToast('请输入研学人姓名'); return; }
        if (!studentId) { showMobileToast('请输入学号'); return; }
        if (!school) { showMobileToast('请选择学校'); return; }
        if (!grade) { showMobileToast('请选择年级'); return; }

        // 检查是否已绑定
        if (children.find(c => c.studentId === studentId)) {
            showMobileToast('该学号已绑定');
            return;
        }

        const child = {
            id: 'C' + String(children.length + 2).padStart(3, '0'),
            name, studentId, school, grade, gender, age,
            bindDate: new Date().toISOString().split('T')[0],
            avatar: ''
        };
        children.push(child);

        showMobileToast('绑定成功！');
        document.getElementById('detail-page')?.remove();

        if (callback) {
            callback();
        } else {
            renderTab(currentTab);
        }
    });
}

function showChildrenManager() {
    // 直接滚动到研学人区域
    const section = document.getElementById('profile-children-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
}

// ==================== 启动 ====================

document.addEventListener('DOMContentLoaded', initApp);
