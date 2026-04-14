// surrounding.js - 周边管理模块（研学基地商品周边）
import { showToast, showModal, closeModal, showConfirm, renderPagination, bindPaginationEvents } from './layout.js';

// 周边类型配置
const typeOptions = ['文创纪念品', '文具用品', '服饰配件', '生活用品', '手工艺品', '食品特产', '数码周边', '其他'];

// 周边类型图标与颜色映射
const typeStyleMap = {
    '文创纪念品': { icon: 'fa-palette', color: 'purple' },
    '文具用品': { icon: 'fa-pen-fancy', color: 'blue' },
    '服饰配件': { icon: 'fa-tshirt', color: 'pink' },
    '生活用品': { icon: 'fa-mug-hot', color: 'orange' },
    '手工艺品': { icon: 'fa-hand-sparkles', color: 'yellow' },
    '食品特产': { icon: 'fa-cookie-bite', color: 'red' },
    '数码周边': { icon: 'fa-headphones', color: 'cyan' },
    '其他': { icon: 'fa-box-open', color: 'gray' },
};

// 模拟基地列表
const baseList = [
    '北京科技研学基地', '长城文化研学营地', '密云生态农业基地',
    '故宫博物院研学中心', '中科院科学探索营', '怀柔户外拓展基地',
    '国家植物园研学点', '航天科普教育基地'
];

// 模拟活动列表
const activityList = [
    '2026春季延安红色研学报名', '科技创新营第一期报名', '暑期雨林探秘营报名',
    '传统文化体验营春季班', '海洋科学探索营报名', '军事素质拓展营报名',
    '航天科普营暑期报名', '科技创新营第二期报名'
];

// 最大图片数量
const MAX_IMAGES = 9;

// 模拟周边商品数据（images为图片数组，最多9张）
let surroundings = [
    {
        id: 'SUR001', name: '长城文化冰箱贴套装', type: '文创纪念品',
        base: '长城文化研学营地', activity: '2026春季延安红色研学报名',
        images: [
            'https://picsum.photos/seed/sur1a/400/300',
            'https://picsum.photos/seed/sur1b/400/300',
            'https://picsum.photos/seed/sur1c/400/300'
        ],
        desc: '以八达岭长城为设计灵感，采用金属烤漆工艺，包含烽火台、城墙、箭楼三款造型，精致小巧，是研学旅行的绝佳纪念品。',
        buyLink: 'https://example.com/shop/sur001',
        price: 39.9, status: '在售', createDate: '2026-01-15'
    },
    {
        id: 'SUR002', name: '故宫文化笔记本礼盒', type: '文具用品',
        base: '故宫博物院研学中心', activity: '传统文化体验营春季班',
        images: [
            'https://picsum.photos/seed/sur2a/400/300',
            'https://picsum.photos/seed/sur2b/400/300',
            'https://picsum.photos/seed/sur2c/400/300',
            'https://picsum.photos/seed/sur2d/400/300',
            'https://picsum.photos/seed/sur2e/400/300'
        ],
        desc: '复古绒布封面，烫金宫殿纹样，内含空白页笔记本、书签、贴纸，适合记录研学心得与灵感。',
        buyLink: 'https://example.com/shop/sur002',
        price: 68.0, status: '在售', createDate: '2026-01-20'
    },
    {
        id: 'SUR003', name: '科技探索主题T恤', type: '服饰配件',
        base: '北京科技研学基地', activity: '科技创新营第一期报名',
        images: [
            'https://picsum.photos/seed/sur3a/400/300',
            'https://picsum.photos/seed/sur3b/400/300'
        ],
        desc: '纯棉材质，印有中关村科技元素图案，舒适透气，研学营统一着装或日常穿着均可，有多种尺码可选。',
        buyLink: 'https://example.com/shop/sur003',
        price: 89.0, status: '在售', createDate: '2026-02-10'
    },
    {
        id: 'SUR004', name: '航天模型拼装套件', type: '手工艺品',
        base: '航天科普教育基地', activity: '航天科普营暑期报名',
        images: [
            'https://picsum.photos/seed/sur4a/400/300',
            'https://picsum.photos/seed/sur4b/400/300',
            'https://picsum.photos/seed/sur4c/400/300',
            'https://picsum.photos/seed/sur4d/400/300',
            'https://picsum.photos/seed/sur4e/400/300',
            'https://picsum.photos/seed/sur4f/400/300',
            'https://picsum.photos/seed/sur4g/400/300',
            'https://picsum.photos/seed/sur4h/400/300',
            'https://picsum.photos/seed/sur4i/400/300'
        ],
        desc: '1:100比例长征五号火箭拼装模型，含详细说明书，锻炼动手能力，了解航天知识，适合8岁以上学生。',
        buyLink: 'https://example.com/shop/sur004',
        price: 128.0, status: '在售', createDate: '2026-02-18'
    },
    {
        id: 'SUR005', name: '生态农场蜂蜜礼盒', type: '食品特产',
        base: '密云生态农业基地', activity: '暑期雨林探秘营报名',
        images: [
            'https://picsum.photos/seed/sur5a/400/300',
            'https://picsum.photos/seed/sur5b/400/300',
            'https://picsum.photos/seed/sur5c/400/300',
            'https://picsum.photos/seed/sur5d/400/300'
        ],
        desc: '密云山区天然蜂蜜，纯手工采集，无添加，含荆花蜜和枣花蜜两种口味，精美礼盒包装。',
        buyLink: 'https://example.com/shop/sur005',
        price: 158.0, status: '在售', createDate: '2026-03-01'
    },
    {
        id: 'SUR006', name: '植物标本书签套装', type: '文创纪念品',
        base: '国家植物园研学点', activity: '科技创新营第二期报名',
        images: [
            'https://picsum.photos/seed/sur6a/400/300',
            'https://picsum.photos/seed/sur6b/400/300',
            'https://picsum.photos/seed/sur6c/400/300',
            'https://picsum.photos/seed/sur6d/400/300',
            'https://picsum.photos/seed/sur6e/400/300',
            'https://picsum.photos/seed/sur6f/400/300'
        ],
        desc: '真实植物标本封装于透明树脂中，每片书签独一无二，包含银杏叶、枫叶、薰衣草等6款，附赠收纳袋。',
        buyLink: 'https://example.com/shop/sur006',
        price: 45.0, status: '在售', createDate: '2026-03-05'
    },
    {
        id: 'SUR007', name: '户外探索水壶', type: '生活用品',
        base: '怀柔户外拓展基地', activity: '军事素质拓展营报名',
        images: [
            'https://picsum.photos/seed/sur7a/400/300'
        ],
        desc: '304不锈钢材质，500ml容量，印有研学基地专属LOGO，保温保冷双效，配备登山扣，户外必备。',
        buyLink: 'https://example.com/shop/sur007',
        price: 79.0, status: '在售', createDate: '2026-03-10'
    },
    {
        id: 'SUR008', name: '科学实验桌面摆件', type: '数码周边',
        base: '中科院科学探索营', activity: '科技创新营第一期报名',
        images: [
            'https://picsum.photos/seed/sur8a/400/300',
            'https://picsum.photos/seed/sur8b/400/300',
            'https://picsum.photos/seed/sur8c/400/300'
        ],
        desc: 'LED发光牛顿摆，USB供电，底座刻有科学名言，既是桌面装饰也是科学教具，激发探索兴趣。',
        buyLink: 'https://example.com/shop/sur008',
        price: 99.0, status: '已下架', createDate: '2026-02-25'
    },
    {
        id: 'SUR009', name: '长城主题帆布包', type: '服饰配件',
        base: '长城文化研学营地', activity: '2026春季延安红色研学报名',
        images: [
            'https://picsum.photos/seed/sur9a/400/300',
            'https://picsum.photos/seed/sur9b/400/300',
            'https://picsum.photos/seed/sur9c/400/300',
            'https://picsum.photos/seed/sur9d/400/300',
            'https://picsum.photos/seed/sur9e/400/300',
            'https://picsum.photos/seed/sur9f/400/300',
            'https://picsum.photos/seed/sur9g/400/300'
        ],
        desc: '加厚帆布材质，水墨长城图案印花，大容量设计，可装书本和研学用品，文艺范十足。',
        buyLink: 'https://example.com/shop/sur009',
        price: 55.0, status: '在售', createDate: '2026-03-15'
    },
    {
        id: 'SUR010', name: '故宫藻井纹样鼠标垫', type: '数码周边',
        base: '故宫博物院研学中心', activity: '传统文化体验营春季班',
        images: [
            'https://picsum.photos/seed/sur10a/400/300',
            'https://picsum.photos/seed/sur10b/400/300'
        ],
        desc: '超大尺寸900x400mm，天然橡胶底防滑，表面精密锁边，高清印刷故宫藻井纹样，兼具美观与实用。',
        buyLink: 'https://example.com/shop/sur010',
        price: 49.9, status: '在售', createDate: '2026-03-20'
    },
    {
        id: 'SUR011', name: '研学纪念徽章盲盒', type: '文创纪念品',
        base: '北京科技研学基地', activity: '科技创新营第二期报名',
        images: [
            'https://picsum.photos/seed/sur11a/400/300',
            'https://picsum.photos/seed/sur11b/400/300',
            'https://picsum.photos/seed/sur11c/400/300',
            'https://picsum.photos/seed/sur11d/400/300',
            'https://picsum.photos/seed/sur11e/400/300'
        ],
        desc: '金属珐琅工艺，含8款不同主题徽章（科技、历史、自然、航天等），随机发放，集齐可兑换限定款。',
        buyLink: 'https://example.com/shop/sur011',
        price: 19.9, status: '在售', createDate: '2026-04-01'
    },
    {
        id: 'SUR012', name: '密云有机果干礼包', type: '食品特产',
        base: '密云生态农业基地', activity: '暑期雨林探秘营报名',
        images: [
            'https://picsum.photos/seed/sur12a/400/300',
            'https://picsum.photos/seed/sur12b/400/300',
            'https://picsum.photos/seed/sur12c/400/300'
        ],
        desc: '精选密云本地有机水果，低温烘干锁住营养，含苹果干、山楂片、柿饼三种口味，健康美味。',
        buyLink: 'https://example.com/shop/sur012',
        price: 36.0, status: '在售', createDate: '2026-04-05'
    },
];

let currentPage = 1;
const pageSize = 6;
let searchKeyword = '';
let filterType = '';
let filterStatus = '';
let filterBase = '';

function getFilteredData() {
    return surroundings.filter(s => {
        const matchSearch = !searchKeyword ||
            s.name.includes(searchKeyword) ||
            s.id.includes(searchKeyword) ||
            s.base.includes(searchKeyword) ||
            s.desc.includes(searchKeyword);
        const matchType = !filterType || s.type === filterType;
        const matchStatus = !filterStatus || s.status === filterStatus;
        const matchBase = !filterBase || s.base === filterBase;
        return matchSearch && matchType && matchStatus && matchBase;
    });
}

export function render() {
    const container = document.getElementById('main-content');
    const filtered = getFilteredData();
    const total = filtered.length;
    const start = (currentPage - 1) * pageSize;
    const pageData = filtered.slice(start, start + pageSize);

    const types = [...new Set(surroundings.map(s => s.type))];
    const bases = [...new Set(surroundings.map(s => s.base))];
    const onSaleCount = surroundings.filter(s => s.status === '在售').length;
    const totalTypes = types.length;
    const avgPrice = (surroundings.reduce((sum, s) => sum + s.price, 0) / surroundings.length).toFixed(1);

    container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">周边管理</h1>
            <p class="page-desc">管理研学基地相关的文创商品与周边产品</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="stat-card">
                <div class="stat-icon bg-blue-50 text-blue-500"><i class="fas fa-box-open"></i></div>
                <div class="stat-info"><h3>${surroundings.length}</h3><p>商品总数</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-green-50 text-green-500"><i class="fas fa-shopping-bag"></i></div>
                <div class="stat-info"><h3>${onSaleCount}</h3><p>在售商品</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-purple-50 text-purple-500"><i class="fas fa-tags"></i></div>
                <div class="stat-info"><h3>${totalTypes}</h3><p>商品类型</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-orange-50 text-orange-500"><i class="fas fa-yen-sign"></i></div>
                <div class="stat-info"><h3>¥${avgPrice}</h3><p>平均价格</p></div>
            </div>
        </div>

        <div class="table-container" id="surrounding-table-container">
            <div class="table-toolbar">
                <div class="flex items-center gap-3 flex-wrap">
                    <div class="table-search">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="搜索商品名称/编号/基地..." id="surrounding-search" value="${searchKeyword}">
                    </div>
                    <select class="form-select" style="width:auto;min-width:120px;padding:8px 32px 8px 12px;" id="surrounding-filter-type">
                        <option value="">全部类型</option>
                        ${types.map(t => `<option value="${t}" ${filterType === t ? 'selected' : ''}>${t}</option>`).join('')}
                    </select>
                    <select class="form-select" style="width:auto;min-width:140px;padding:8px 32px 8px 12px;" id="surrounding-filter-base">
                        <option value="">全部基地</option>
                        ${bases.map(b => `<option value="${b}" ${filterBase === b ? 'selected' : ''}>${b}</option>`).join('')}
                    </select>
                    <select class="form-select" style="width:auto;min-width:110px;padding:8px 32px 8px 12px;" id="surrounding-filter-status">
                        <option value="">全部状态</option>
                        <option value="在售" ${filterStatus === '在售' ? 'selected' : ''}>在售</option>
                        <option value="已下架" ${filterStatus === '已下架' ? 'selected' : ''}>已下架</option>
                    </select>
                </div>
                <div class="table-actions">
                    <button class="btn btn-primary" id="btn-add-surrounding"><i class="fas fa-plus"></i> 添加商品</button>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 p-5">
                ${pageData.length === 0 ? `
                    <div class="col-span-full">
                        <div class="empty-state"><i class="fas fa-inbox"></i><p>暂无周边商品数据</p></div>
                    </div>` :
                pageData.map(s => renderProductCard(s)).join('')}
            </div>
            ${renderPagination(currentPage, total, pageSize)}
        </div>
    `;
    bindEvents();
}

function renderProductCard(s) {
    const typeStyle = typeStyleMap[s.type] || typeStyleMap['其他'];
    const statusClass = s.status === '在售' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500';
    const coverImg = (s.images && s.images.length > 0) ? s.images[0] : 'https://picsum.photos/seed/default/400/300';
    const imgCount = s.images ? s.images.length : 0;
    return `
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
            <!-- 商品封面图 -->
            <div class="relative overflow-hidden cursor-pointer btn-view-surrounding" data-id="${s.id}" style="height:180px;">
                <img src="${coverImg}" alt="${s.name}"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onerror="this.src='https://picsum.photos/seed/default/400/300';this.onerror=null;">
                <div class="absolute top-3 left-3">
                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 shadow-sm">
                        <i class="fas ${typeStyle.icon} text-${typeStyle.color}-500"></i>
                        ${s.type}
                    </span>
                </div>
                <div class="absolute top-3 right-3">
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusClass}">
                        ${s.status}
                    </span>
                </div>
                <!-- 图片数量角标 -->
                ${imgCount > 1 ? `
                <div class="absolute bottom-3 left-3">
                    <span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-black/60 text-white backdrop-blur-sm">
                        <i class="fas fa-images"></i>
                        ${imgCount}张
                    </span>
                </div>` : ''}
                <div class="absolute bottom-3 right-3">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-sm font-bold bg-red-500/90 text-white backdrop-blur-sm shadow">
                        ¥${s.price.toFixed(1)}
                    </span>
                </div>
            </div>
            <!-- 商品信息 -->
            <div class="p-4">
                <h3 class="font-semibold text-gray-900 text-base mb-1.5 truncate" title="${s.name}">${s.name}</h3>
                <p class="text-sm text-gray-500 mb-3 line-clamp-2" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;" title="${s.desc}">${s.desc}</p>
                <div class="space-y-1.5 text-sm mb-3">
                    <div class="flex items-center gap-2 text-gray-500">
                        <i class="fas fa-building text-xs text-blue-400 w-4 text-center"></i>
                        <span class="text-gray-600 truncate" title="${s.base}">${s.base}</span>
                    </div>
                    <div class="flex items-center gap-2 text-gray-500">
                        <i class="fas fa-calendar-check text-xs text-green-400 w-4 text-center"></i>
                        <span class="text-gray-600 truncate" title="${s.activity}">${s.activity}</span>
                    </div>
                </div>
                <div class="flex items-center justify-between pt-3 border-t border-gray-100">
                    <a href="${s.buyLink}" target="_blank" class="inline-flex items-center gap-1 text-sm text-blue-500 hover:text-blue-700 transition-colors" title="前往购买">
                        <i class="fas fa-shopping-cart"></i>
                        <span>购买链接</span>
                        <i class="fas fa-external-link-alt text-xs"></i>
                    </a>
                    <div class="flex gap-1">
                        <button class="btn btn-sm btn-outline btn-view-surrounding" data-id="${s.id}" title="查看详情"><i class="fas fa-eye"></i></button>
                        <button class="btn btn-sm btn-outline btn-edit-surrounding" data-id="${s.id}" title="编辑"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-outline btn-del-surrounding" data-id="${s.id}" title="删除" style="color:#ef4444;border-color:#fca5a5;"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getStatusTag(status) {
    if (status === '在售') return '<span class="tag tag-green">在售</span>';
    return '<span class="tag tag-gray">已下架</span>';
}

// 渲染图片网格（详情页用）
function renderImageGrid(images, name) {
    if (!images || images.length === 0) {
        return '<div class="text-gray-400 text-sm text-center py-8">暂无图片</div>';
    }
    const count = images.length;
    // 根据图片数量决定网格列数
    let gridCols = 'grid-cols-1';
    if (count === 2) gridCols = 'grid-cols-2';
    else if (count >= 3 && count <= 4) gridCols = 'grid-cols-2';
    else if (count >= 5) gridCols = 'grid-cols-3';

    return `
        <div class="grid ${gridCols} gap-2">
            ${images.map((img, idx) => `
                <div class="relative rounded-lg overflow-hidden border border-gray-100 cursor-pointer sur-detail-img-item group/img"
                    data-idx="${idx}" style="${count === 1 ? 'max-height:260px;' : 'height:140px;'}">
                    <img src="${img}" alt="${name} - 图${idx + 1}"
                        class="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                        onerror="this.src='https://picsum.photos/seed/default/400/300';this.onerror=null;">
                    <div class="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                        <i class="fas fa-search-plus text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 text-lg drop-shadow-lg"></i>
                    </div>
                    <div class="absolute bottom-1 right-1">
                        <span class="text-xs text-white bg-black/50 px-1.5 py-0.5 rounded">${idx + 1}/${count}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// 图片灯箱查看器
function showImageLightbox(images, startIdx = 0) {
    let currentIdx = startIdx;
    const overlay = document.createElement('div');
    overlay.id = 'sur-lightbox-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s ease;';

    function renderLightbox() {
        const total = images.length;
        overlay.innerHTML = `
            <div style="position:absolute;top:16px;right:20px;z-index:10001;">
                <button id="sur-lb-close" style="color:#fff;font-size:28px;background:none;border:none;cursor:pointer;padding:8px;opacity:0.8;transition:opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div style="position:absolute;top:16px;left:50%;transform:translateX(-50%);color:#fff;font-size:14px;opacity:0.7;">
                ${currentIdx + 1} / ${total}
            </div>
            ${total > 1 ? `
            <button id="sur-lb-prev" style="position:absolute;left:16px;top:50%;transform:translateY(-50%);color:#fff;font-size:32px;background:rgba(255,255,255,0.1);border:none;cursor:pointer;padding:12px 16px;border-radius:8px;transition:background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button id="sur-lb-next" style="position:absolute;right:16px;top:50%;transform:translateY(-50%);color:#fff;font-size:32px;background:rgba(255,255,255,0.1);border:none;cursor:pointer;padding:12px 16px;border-radius:8px;transition:background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
                <i class="fas fa-chevron-right"></i>
            </button>` : ''}
            <img src="${images[currentIdx]}" alt="图片预览"
                style="max-width:90vw;max-height:85vh;object-fit:contain;border-radius:8px;box-shadow:0 8px 32px rgba(0,0,0,0.5);"
                onerror="this.src='https://picsum.photos/seed/default/400/300';this.onerror=null;">
            ${total > 1 ? `
            <div style="position:absolute;bottom:20px;left:50%;transform:translateX(-50%);display:flex;gap:6px;">
                ${images.map((_, i) => `
                    <div class="sur-lb-dot" data-idx="${i}" style="width:8px;height:8px;border-radius:50%;background:${i === currentIdx ? '#fff' : 'rgba(255,255,255,0.4)'};cursor:pointer;transition:background 0.2s;"></div>
                `).join('')}
            </div>` : ''}
        `;

        // 绑定事件
        overlay.querySelector('#sur-lb-close').addEventListener('click', () => overlay.remove());
        const prevBtn = overlay.querySelector('#sur-lb-prev');
        const nextBtn = overlay.querySelector('#sur-lb-next');
        if (prevBtn) prevBtn.addEventListener('click', () => { currentIdx = (currentIdx - 1 + total) % total; renderLightbox(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { currentIdx = (currentIdx + 1) % total; renderLightbox(); });
        overlay.querySelectorAll('.sur-lb-dot').forEach(dot => {
            dot.addEventListener('click', () => { currentIdx = parseInt(dot.dataset.idx); renderLightbox(); });
        });
    }

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });

    // 键盘事件
    const keyHandler = (e) => {
        if (!document.getElementById('sur-lightbox-overlay')) { document.removeEventListener('keydown', keyHandler); return; }
        if (e.key === 'Escape') overlay.remove();
        if (e.key === 'ArrowLeft') { currentIdx = (currentIdx - 1 + images.length) % images.length; renderLightbox(); }
        if (e.key === 'ArrowRight') { currentIdx = (currentIdx + 1) % images.length; renderLightbox(); }
    };
    document.addEventListener('keydown', keyHandler);

    renderLightbox();
    document.body.appendChild(overlay);
}

function bindEvents() {
    const container = document.getElementById('surrounding-table-container');

    document.getElementById('surrounding-search').addEventListener('input', (e) => {
        searchKeyword = e.target.value.trim();
        currentPage = 1;
        render();
    });

    document.getElementById('surrounding-filter-type').addEventListener('change', (e) => {
        filterType = e.target.value;
        currentPage = 1;
        render();
    });

    document.getElementById('surrounding-filter-base').addEventListener('change', (e) => {
        filterBase = e.target.value;
        currentPage = 1;
        render();
    });

    document.getElementById('surrounding-filter-status').addEventListener('change', (e) => {
        filterStatus = e.target.value;
        currentPage = 1;
        render();
    });

    document.getElementById('btn-add-surrounding').addEventListener('click', () => showSurroundingForm());

    container.addEventListener('click', (e) => {
        const viewBtn = e.target.closest('.btn-view-surrounding');
        const editBtn = e.target.closest('.btn-edit-surrounding');
        const delBtn = e.target.closest('.btn-del-surrounding');

        if (viewBtn) {
            const s = surroundings.find(x => x.id === viewBtn.dataset.id);
            if (s) showSurroundingDetail(s);
        }
        if (editBtn) {
            const s = surroundings.find(x => x.id === editBtn.dataset.id);
            if (s) showSurroundingForm(s);
        }
        if (delBtn) {
            const id = delBtn.dataset.id;
            showConfirm('确定要删除该周边商品吗？此操作不可恢复。', () => {
                surroundings = surroundings.filter(x => x.id !== id);
                showToast('商品删除成功', 'success');
                render();
            });
        }
    });

    bindPaginationEvents(container, (page) => { currentPage = page; render(); });
}

function showSurroundingDetail(s) {
    const typeStyle = typeStyleMap[s.type] || typeStyleMap['其他'];
    const body = `
        <div class="space-y-5">
            <!-- 商品图片（多图网格） -->
            <div>
                <div class="flex items-center justify-between mb-2">
                    <label class="form-label mb-0" style="margin-bottom:0;">周边图片</label>
                    <span class="text-xs text-gray-400">${s.images ? s.images.length : 0}张图片（最多${MAX_IMAGES}张）</span>
                </div>
                <div id="sur-detail-images">
                    ${renderImageGrid(s.images, s.name)}
                </div>
            </div>
            <!-- 基本信息 -->
            <div class="grid grid-cols-2 gap-4">
                <div class="form-group">
                    <label class="form-label">商品编号</label>
                    <p class="text-gray-700 font-mono text-sm">${s.id}</p>
                </div>
                <div class="form-group">
                    <label class="form-label">周边名称</label>
                    <p class="text-gray-700 font-medium">${s.name}</p>
                </div>
                <div class="form-group">
                    <label class="form-label">周边类型</label>
                    <p class="flex items-center gap-1.5">
                        <i class="fas ${typeStyle.icon} text-${typeStyle.color}-500"></i>
                        <span class="text-gray-700">${s.type}</span>
                    </p>
                </div>
                <div class="form-group">
                    <label class="form-label">价格</label>
                    <p class="text-red-500 font-bold text-lg">¥${s.price.toFixed(1)}</p>
                </div>
                <div class="form-group">
                    <label class="form-label">出品基地</label>
                    <p class="text-gray-700">${s.base}</p>
                </div>
                <div class="form-group">
                    <label class="form-label">关联研学活动</label>
                    <p class="text-gray-700">${s.activity}</p>
                </div>
                <div class="form-group">
                    <label class="form-label">状态</label>
                    <p>${getStatusTag(s.status)}</p>
                </div>
                <div class="form-group">
                    <label class="form-label">创建日期</label>
                    <p class="text-gray-700">${s.createDate}</p>
                </div>
                <div class="form-group col-span-2">
                    <label class="form-label">周边简介</label>
                    <p class="text-gray-700 leading-relaxed">${s.desc}</p>
                </div>
                <div class="form-group col-span-2">
                    <label class="form-label">购买链接</label>
                    <a href="${s.buyLink}" target="_blank" class="text-blue-500 hover:text-blue-700 hover:underline break-all">
                        <i class="fas fa-external-link-alt mr-1"></i>${s.buyLink}
                    </a>
                </div>
            </div>
        </div>
    `;
    showModal('商品详情 - ' + s.name, body, '', { maxWidth: '780px' });

    // 绑定图片点击事件（灯箱查看）
    setTimeout(() => {
        const imgItems = document.querySelectorAll('.sur-detail-img-item');
        imgItems.forEach(item => {
            item.addEventListener('click', () => {
                const idx = parseInt(item.dataset.idx);
                showImageLightbox(s.images, idx);
            });
        });
    }, 100);
}

function showSurroundingForm(s = null) {
    const isEdit = !!s;
    const title = isEdit ? '编辑周边商品' : '添加周边商品';
    const existingImages = (s && s.images) ? s.images : [];

    const body = `
        <form id="surrounding-form">
            <div class="grid grid-cols-2 gap-4">
                <div class="form-group col-span-2">
                    <label class="form-label">周边名称 <span class="required">*</span></label>
                    <input type="text" class="form-input" id="sf-name" value="${s ? s.name : ''}" placeholder="请输入周边商品名称">
                </div>
                <div class="form-group">
                    <label class="form-label">周边类型 <span class="required">*</span></label>
                    <select class="form-select" id="sf-type">
                        ${typeOptions.map(t => `<option value="${t}" ${s && s.type === t ? 'selected' : ''}>${t}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">出品基地 <span class="required">*</span></label>
                    <select class="form-select" id="sf-base">
                        <option value="">请选择出品基地</option>
                        ${baseList.map(b => `<option value="${b}" ${s && s.base === b ? 'selected' : ''}>${b}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group col-span-2">
                    <label class="form-label">关联研学活动 <span class="required">*</span></label>
                    <select class="form-select" id="sf-activity">
                        <option value="">请选择关联研学活动</option>
                        ${activityList.map(a => `<option value="${a}" ${s && s.activity === a ? 'selected' : ''}>${a}</option>`).join('')}
                    </select>
                </div>
                <!-- 多图上传区域 -->
                <div class="form-group col-span-2">
                    <div class="flex items-center justify-between mb-1">
                        <label class="form-label mb-0" style="margin-bottom:0;">周边图（最多${MAX_IMAGES}张） <span class="required">*</span></label>
                        <span class="text-xs text-gray-400" id="sf-img-count">${existingImages.length}/${MAX_IMAGES}</span>
                    </div>
                    <div id="sf-images-container">
                        ${renderFormImageList(existingImages)}
                    </div>
                    <div class="mt-2" id="sf-add-image-wrapper" ${existingImages.length >= MAX_IMAGES ? 'style="display:none;"' : ''}>
                        <div class="flex gap-2">
                            <input type="text" class="form-input flex-1" id="sf-new-image-url" placeholder="请输入图片URL地址，按回车或点击添加">
                            <button type="button" class="btn btn-outline" id="sf-add-image-btn" title="添加图片">
                                <i class="fas fa-plus"></i> 添加
                            </button>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">价格（元）</label>
                    <input type="number" class="form-input" id="sf-price" value="${s ? s.price : ''}" min="0" step="0.1" placeholder="请输入价格">
                </div>
                <div class="form-group">
                    <label class="form-label">状态</label>
                    <select class="form-select" id="sf-status">
                        ${['在售', '已下架'].map(st => `<option value="${st}" ${s && s.status === st ? 'selected' : ''}>${st}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group col-span-2">
                    <label class="form-label">购买链接</label>
                    <input type="text" class="form-input" id="sf-buylink" value="${s ? s.buyLink : ''}" placeholder="请输入购买链接URL">
                </div>
                <div class="form-group col-span-2">
                    <label class="form-label">周边简介 <span class="required">*</span></label>
                    <textarea class="form-input" id="sf-desc" rows="3" placeholder="请输入周边商品简介">${s ? s.desc : ''}</textarea>
                </div>
            </div>
        </form>
    `;
    const footer = `<button class="btn btn-outline" id="sf-cancel">取消</button><button class="btn btn-primary" id="sf-save">保存</button>`;
    showModal(title, body, footer, { maxWidth: '780px' });

    // 当前图片列表（用于动态管理）
    let formImages = [...existingImages];

    // 更新图片列表UI
    function refreshImageList() {
        document.getElementById('sf-images-container').innerHTML = renderFormImageList(formImages);
        document.getElementById('sf-img-count').textContent = `${formImages.length}/${MAX_IMAGES}`;
        const addWrapper = document.getElementById('sf-add-image-wrapper');
        if (addWrapper) {
            addWrapper.style.display = formImages.length >= MAX_IMAGES ? 'none' : '';
        }
        bindFormImageEvents();
    }

    // 绑定图片列表内的事件
    function bindFormImageEvents() {
        // 删除按钮
        document.querySelectorAll('.sf-remove-img').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.idx);
                formImages.splice(idx, 1);
                refreshImageList();
            });
        });
        // 上移按钮
        document.querySelectorAll('.sf-move-up-img').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.idx);
                if (idx > 0) {
                    [formImages[idx - 1], formImages[idx]] = [formImages[idx], formImages[idx - 1]];
                    refreshImageList();
                }
            });
        });
        // 下移按钮
        document.querySelectorAll('.sf-move-down-img').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.idx);
                if (idx < formImages.length - 1) {
                    [formImages[idx], formImages[idx + 1]] = [formImages[idx + 1], formImages[idx]];
                    refreshImageList();
                }
            });
        });
        // 预览按钮
        document.querySelectorAll('.sf-preview-img').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.idx);
                showImageLightbox(formImages, idx);
            });
        });
    }

    // 添加图片
    function addImage() {
        const input = document.getElementById('sf-new-image-url');
        const url = input.value.trim();
        if (!url) { showToast('请输入图片URL', 'warning'); return; }
        if (formImages.length >= MAX_IMAGES) { showToast(`最多只能添加${MAX_IMAGES}张图片`, 'warning'); return; }
        if (formImages.includes(url)) { showToast('该图片已存在', 'warning'); return; }
        formImages.push(url);
        input.value = '';
        refreshImageList();
        showToast('图片添加成功', 'success');
    }

    // 添加按钮事件
    document.getElementById('sf-add-image-btn').addEventListener('click', addImage);
    // 回车添加
    document.getElementById('sf-new-image-url').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); addImage(); }
    });

    // 初始绑定
    bindFormImageEvents();

    document.getElementById('sf-cancel').addEventListener('click', closeModal);
    document.getElementById('sf-save').addEventListener('click', () => {
        const name = document.getElementById('sf-name').value.trim();
        const base = document.getElementById('sf-base').value;
        const activity = document.getElementById('sf-activity').value;
        const desc = document.getElementById('sf-desc').value.trim();

        if (!name) { showToast('请输入周边名称', 'warning'); return; }
        if (!base) { showToast('请选择出品基地', 'warning'); return; }
        if (!activity) { showToast('请选择关联研学活动', 'warning'); return; }
        if (formImages.length === 0) { showToast('请至少添加一张周边图片', 'warning'); return; }
        if (!desc) { showToast('请输入周边简介', 'warning'); return; }

        const data = {
            name,
            type: document.getElementById('sf-type').value,
            base,
            activity,
            images: [...formImages],
            desc,
            price: parseFloat(document.getElementById('sf-price').value) || 0,
            status: document.getElementById('sf-status').value,
            buyLink: document.getElementById('sf-buylink').value.trim(),
        };

        if (isEdit) {
            Object.assign(s, data);
            showToast('商品更新成功', 'success');
        } else {
            data.id = 'SUR' + String(surroundings.length + 1).padStart(3, '0');
            data.createDate = new Date().toISOString().split('T')[0];
            surroundings.push(data);
            showToast('商品添加成功', 'success');
        }
        closeModal();
        render();
    });
}

// 渲染表单中的图片列表
function renderFormImageList(images) {
    if (!images || images.length === 0) {
        return `
            <div class="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center text-gray-400">
                <i class="fas fa-cloud-upload-alt text-3xl mb-2"></i>
                <p class="text-sm">暂无图片，请在下方输入图片URL添加</p>
                <p class="text-xs mt-1">支持最多${MAX_IMAGES}张图片</p>
            </div>
        `;
    }
    return `
        <div class="grid grid-cols-3 gap-2">
            ${images.map((img, idx) => `
                <div class="relative group/formimg rounded-lg overflow-hidden border border-gray-200 bg-gray-50" style="height:100px;">
                    <img src="${img}" alt="图片${idx + 1}" class="w-full h-full object-cover"
                        onerror="this.src='https://picsum.photos/seed/default/400/300';this.onerror=null;">
                    <!-- 序号标签 -->
                    <div class="absolute top-1 left-1">
                        <span class="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${idx === 0 ? 'bg-blue-500 text-white' : 'bg-black/50 text-white'}">${idx + 1}</span>
                    </div>
                    ${idx === 0 ? '<div class="absolute top-1 right-1"><span class="text-xs bg-blue-500 text-white px-1.5 py-0.5 rounded">封面</span></div>' : ''}
                    <!-- 操作按钮（悬浮显示） -->
                    <div class="absolute inset-0 bg-black/0 group-hover/formimg:bg-black/40 transition-colors duration-200 flex items-center justify-center gap-1 opacity-0 group-hover/formimg:opacity-100">
                        <button type="button" class="sf-preview-img w-7 h-7 rounded-full bg-white/90 text-gray-700 hover:bg-white flex items-center justify-center text-xs transition-colors" data-idx="${idx}" title="预览">
                            <i class="fas fa-search-plus"></i>
                        </button>
                        ${idx > 0 ? `<button type="button" class="sf-move-up-img w-7 h-7 rounded-full bg-white/90 text-gray-700 hover:bg-white flex items-center justify-center text-xs transition-colors" data-idx="${idx}" title="上移">
                            <i class="fas fa-arrow-left"></i>
                        </button>` : ''}
                        ${idx < images.length - 1 ? `<button type="button" class="sf-move-down-img w-7 h-7 rounded-full bg-white/90 text-gray-700 hover:bg-white flex items-center justify-center text-xs transition-colors" data-idx="${idx}" title="下移">
                            <i class="fas fa-arrow-right"></i>
                        </button>` : ''}
                        <button type="button" class="sf-remove-img w-7 h-7 rounded-full bg-red-500/90 text-white hover:bg-red-600 flex items-center justify-center text-xs transition-colors" data-idx="${idx}" title="删除">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}
