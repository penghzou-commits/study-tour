// announcement.js - 公告管理模块（用于移动端首页显示）
import { showToast, showModal, closeModal, showConfirm, renderPagination, bindPaginationEvents } from './layout.js';

// 公告类型配置
const announcementTypes = [
    { value: '通知公告', color: 'tag-blue', icon: 'fa-bullhorn' },
    { value: '活动预告', color: 'tag-green', icon: 'fa-calendar-star' },
    { value: '政策法规', color: 'tag-purple', icon: 'fa-gavel' },
    { value: '安全提醒', color: 'tag-red', icon: 'fa-shield-alt' },
    { value: '系统公告', color: 'tag-yellow', icon: 'fa-cog' },
    { value: '新闻资讯', color: 'tag-gray', icon: 'fa-newspaper' },
];

// 模拟公告数据
let announcements = [
    {
        id: 'ANN001', title: '2026年春季研学活动报名正式开启',
        type: '通知公告', status: '已发布', isTop: true, sortWeight: 100,
        coverImage: 'https://picsum.photos/seed/ann001/600/300',
        summary: '2026年春季研学活动现已开放报名，涵盖红色教育、科技创新、自然生态等多个主题，欢迎各校师生踊跃参与。',
        content: '各位同学、家长及老师：\n\n2026年春季研学活动现已正式开放报名！本次研学活动涵盖红色教育、科技创新、自然生态等多个主题方向，旨在丰富学生课外实践体验，提升综合素质。\n\n报名时间：2026年3月1日 - 2026年3月31日\n活动时间：2026年4月 - 2026年6月\n\n请各校教务处统一组织报名，详情请登录研学管理平台查看。',
        publishDate: '2026-03-01', createDate: '2026-02-25', author: '管理员',
        viewCount: 1286, targetAudience: '全体师生'
    },
    {
        id: 'ANN002', title: '关于加强研学旅行安全管理的通知',
        type: '安全提醒', status: '已发布', isTop: true, sortWeight: 95,
        coverImage: 'https://picsum.photos/seed/ann002/600/300',
        summary: '为确保研学旅行安全，现就加强安全管理工作提出相关要求，请各基地和学校严格执行。',
        content: '各研学基地、合作学校：\n\n为进一步加强研学旅行安全管理，保障师生人身安全，现就有关事项通知如下：\n\n一、各基地须在活动前完成安全隐患排查\n二、每次活动须配备不少于1:15的师生比\n三、所有参与学生须购买研学旅行保险\n四、建立应急预案并定期演练\n\n请各单位高度重视，严格落实。',
        publishDate: '2026-02-20', createDate: '2026-02-18', author: '安全管理部',
        viewCount: 2034, targetAudience: '基地管理员'
    },
    {
        id: 'ANN003', title: '延安红色教育基地荣获"全国优秀研学基地"称号',
        type: '新闻资讯', status: '已发布', isTop: false, sortWeight: 80,
        coverImage: 'https://picsum.photos/seed/ann003/600/300',
        summary: '热烈祝贺延安红色教育基地在2025年度全国研学基地评选中荣获"全国优秀研学基地"荣誉称号。',
        content: '近日，在教育部组织的2025年度全国研学基地评选活动中，延安红色教育基地凭借优质的研学课程体系、完善的安全保障措施和良好的社会口碑，荣获"全国优秀研学基地"荣誉称号。\n\n延安红色教育基地自成立以来，已累计接待研学团队500余批次，服务学生超过3万人次，开发了"重走长征路""延安精神传承"等多个精品研学课程。',
        publishDate: '2026-02-15', createDate: '2026-02-14', author: '宣传部',
        viewCount: 856, targetAudience: '全体师生'
    },
    {
        id: 'ANN004', title: '暑期海洋科学探索营开始招募',
        type: '活动预告', status: '已发布', isTop: false, sortWeight: 75,
        coverImage: 'https://picsum.photos/seed/ann004/600/300',
        summary: '2026年暑期海洋科学探索营即将开营，带领学生走进海洋世界，探索海洋奥秘。',
        content: '2026年暑期海洋科学探索营现已开始招募！\n\n活动亮点：\n1. 参观国家海洋博物馆\n2. 海洋生物标本制作体验\n3. 潮间带生态考察\n4. 海洋环保主题讲座\n\n招募对象：初中一年级至高中二年级学生\n活动时间：2026年7月15日 - 7月20日\n活动费用：详见报名页面\n名额有限，先到先得！',
        publishDate: '2026-03-10', createDate: '2026-03-08', author: '活动策划部',
        viewCount: 643, targetAudience: '全体学生'
    },
    {
        id: 'ANN005', title: '研学管理平台系统升级公告',
        type: '系统公告', status: '已发布', isTop: false, sortWeight: 70,
        coverImage: '',
        summary: '研学管理平台将于2026年3月15日凌晨进行系统升级，届时平台将暂停服务约2小时。',
        content: '尊敬的用户：\n\n为提升平台服务质量和用户体验，研学管理平台将于2026年3月15日凌晨02:00-04:00进行系统升级维护。\n\n升级内容：\n1. 优化报名流程，支持批量导入\n2. 新增移动端公告推送功能\n3. 完善费用管理模块\n4. 修复已知问题\n\n升级期间平台将暂停服务，请提前做好相关安排。给您带来的不便，敬请谅解。',
        publishDate: '2026-03-12', createDate: '2026-03-11', author: '技术部',
        viewCount: 432, targetAudience: '全体用户'
    },
    {
        id: 'ANN006', title: '关于规范研学活动收费标准的通知',
        type: '政策法规', status: '已发布', isTop: false, sortWeight: 65,
        coverImage: '',
        summary: '根据教育主管部门最新要求，现就规范研学活动收费标准相关事项进行通知。',
        content: '各研学基地、合作学校：\n\n根据《关于进一步规范中小学研学旅行的指导意见》，现就研学活动收费标准通知如下：\n\n一、研学活动收费须公开透明，明码标价\n二、不得强制学生参加收费研学活动\n三、收费项目须经学校和家长委员会审核\n四、建立费用公示和退费机制\n\n请各单位严格遵照执行。',
        publishDate: '2026-02-28', createDate: '2026-02-26', author: '政策研究室',
        viewCount: 1120, targetAudience: '基地管理员'
    },
    {
        id: 'ANN007', title: '五一劳动节研学基地开放时间调整',
        type: '通知公告', status: '草稿', isTop: false, sortWeight: 60,
        coverImage: '',
        summary: '五一劳动节期间，各研学基地开放时间将做相应调整，请各校合理安排研学行程。',
        content: '各位师生：\n\n五一劳动节期间（5月1日-5月5日），各研学基地开放时间调整如下：\n\n延安红色教育基地：08:00-18:00\n科技创新体验中心：09:00-17:00\n自然生态研学园：08:30-17:30\n\n请各校提前做好行程安排。',
        publishDate: '', createDate: '2026-04-01', author: '管理员',
        viewCount: 0, targetAudience: '全体师生'
    },
    {
        id: 'ANN008', title: '2026年秋季研学项目征集启事',
        type: '活动预告', status: '草稿', isTop: false, sortWeight: 55,
        coverImage: 'https://picsum.photos/seed/ann008/600/300',
        summary: '现面向全国征集2026年秋季研学项目方案，欢迎各研学基地和教育机构积极申报。',
        content: '为丰富2026年秋季研学活动内容，现面向全国征集优质研学项目方案。\n\n征集要求：\n1. 项目主题明确，教育意义突出\n2. 课程设计科学合理\n3. 安全保障措施完善\n4. 具备接待100人以上团队的能力\n\n申报截止日期：2026年6月30日\n联系邮箱：yanxue@edu.cn',
        publishDate: '', createDate: '2026-04-05', author: '项目管理部',
        viewCount: 0, targetAudience: '研学基地'
    },
    {
        id: 'ANN009', title: '研学旅行保险服务升级通知',
        type: '通知公告', status: '已下线', isTop: false, sortWeight: 30,
        coverImage: '',
        summary: '研学旅行保险服务已完成升级，新增多项保障内容，请各校及时了解。',
        content: '各合作学校：\n\n我平台研学旅行保险服务已完成升级，主要变化如下：\n\n1. 保额由原来的20万提升至50万\n2. 新增意外医疗费用直付服务\n3. 增加行程取消保障\n4. 7×24小时紧急救援热线\n\n新保险方案自2026年1月1日起生效。',
        publishDate: '2025-12-20', createDate: '2025-12-18', author: '保险服务部',
        viewCount: 768, targetAudience: '全体用户'
    },
    {
        id: 'ANN010', title: '关于开展研学导师资格认证的通知',
        type: '政策法规', status: '已发布', isTop: false, sortWeight: 60,
        coverImage: 'https://picsum.photos/seed/ann010/600/300',
        summary: '为提升研学导师专业水平，现启动研学导师资格认证工作，请各基地积极组织参与。',
        content: '各研学基地：\n\n为进一步提升研学导师专业素养和服务水平，经研究决定启动研学导师资格认证工作。\n\n认证要求：\n1. 具备教育学或相关专业背景\n2. 从事研学教育工作满1年\n3. 通过安全管理培训考核\n4. 完成不少于40学时的专业培训\n\n首批认证报名截止：2026年5月31日',
        publishDate: '2026-03-05', createDate: '2026-03-03', author: '人力资源部',
        viewCount: 534, targetAudience: '研学导师'
    },
];

let currentPage = 1;
const pageSize = 8;
let searchKeyword = '';
let filterType = '';
let filterStatus = '';

function getFilteredData() {
    return announcements.filter(a => {
        const matchSearch = !searchKeyword ||
            a.title.includes(searchKeyword) ||
            a.id.includes(searchKeyword) ||
            a.summary.includes(searchKeyword) ||
            a.author.includes(searchKeyword);
        const matchType = !filterType || a.type === filterType;
        const matchStatus = !filterStatus || a.status === filterStatus;
        return matchSearch && matchType && matchStatus;
    });
}

function getTypeConfig(type) {
    return announcementTypes.find(t => t.value === type) || { value: type, color: 'tag-gray', icon: 'fa-file-alt' };
}

function getStatusTag(status) {
    const map = {
        '已发布': 'tag-green',
        '草稿': 'tag-yellow',
        '已下线': 'tag-gray'
    };
    return `<span class="tag ${map[status] || 'tag-gray'}">${status}</span>`;
}

export function render() {
    const container = document.getElementById('main-content');
    const filtered = getFilteredData();
    const total = filtered.length;
    const start = (currentPage - 1) * pageSize;
    const pageData = filtered.slice(start, start + pageSize);

    // 统计数据
    const publishedCount = announcements.filter(a => a.status === '已发布').length;
    const draftCount = announcements.filter(a => a.status === '草稿').length;
    const topCount = announcements.filter(a => a.isTop && a.status === '已发布').length;
    const totalViews = announcements.reduce((sum, a) => sum + a.viewCount, 0);

    container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">公告管理</h1>
            <p class="page-desc">管理移动端首页展示的公告信息，支持置顶、排序和移动端预览</p>
        </div>

        <!-- 统计卡片 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="stat-card">
                <div class="stat-icon bg-blue-50 text-blue-500"><i class="fas fa-bullhorn"></i></div>
                <div class="stat-info"><h3>${announcements.length}</h3><p>公告总数</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-green-50 text-green-500"><i class="fas fa-check-circle"></i></div>
                <div class="stat-info"><h3>${publishedCount}</h3><p>已发布</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-yellow-50 text-yellow-500"><i class="fas fa-edit"></i></div>
                <div class="stat-info"><h3>${draftCount}</h3><p>草稿</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-purple-50 text-purple-500"><i class="fas fa-eye"></i></div>
                <div class="stat-info"><h3>${totalViews.toLocaleString()}</h3><p>总浏览量</p></div>
            </div>
        </div>

        <!-- 主内容区：左侧列表 + 右侧移动端预览 -->
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <!-- 左侧公告列表 -->
            <div class="xl:col-span-2">
                <div class="table-container" id="announcement-table-container">
                    <div class="table-toolbar">
                        <div class="flex items-center gap-3 flex-wrap">
                            <div class="table-search">
                                <i class="fas fa-search"></i>
                                <input type="text" placeholder="搜索公告标题/编号/内容..." id="ann-search" value="${searchKeyword}">
                            </div>
                            <select class="form-select" style="width:auto;min-width:120px;padding:8px 32px 8px 12px;" id="ann-filter-type">
                                <option value="">全部类型</option>
                                ${announcementTypes.map(t => `<option value="${t.value}" ${filterType === t.value ? 'selected' : ''}>${t.value}</option>`).join('')}
                            </select>
                            <select class="form-select" style="width:auto;min-width:120px;padding:8px 32px 8px 12px;" id="ann-filter-status">
                                <option value="">全部状态</option>
                                <option value="已发布" ${filterStatus === '已发布' ? 'selected' : ''}>已发布</option>
                                <option value="草稿" ${filterStatus === '草稿' ? 'selected' : ''}>草稿</option>
                                <option value="已下线" ${filterStatus === '已下线' ? 'selected' : ''}>已下线</option>
                            </select>
                        </div>
                        <div class="table-actions">
                            <button class="btn btn-outline" id="btn-preview-mobile" title="移动端预览">
                                <i class="fas fa-mobile-alt"></i> 预览
                            </button>
                            <button class="btn btn-primary" id="btn-add-ann">
                                <i class="fas fa-plus"></i> 发布公告
                            </button>
                        </div>
                    </div>

                    <!-- 公告列表 -->
                    <div class="divide-y divide-gray-100" id="ann-list">
                        ${pageData.length === 0 ? `
                            <div class="empty-state py-16">
                                <i class="fas fa-inbox"></i>
                                <p>暂无公告数据</p>
                            </div>
                        ` : pageData.map(a => renderAnnouncementCard(a)).join('')}
                    </div>

                    ${renderPagination(currentPage, total, pageSize)}
                </div>
            </div>

            <!-- 右侧移动端预览 -->
            <div class="xl:col-span-1">
                <div class="sticky top-20">
                    ${renderMobilePreview()}
                </div>
            </div>
        </div>
    `;
    bindEvents();
}

// 渲染单条公告卡片
function renderAnnouncementCard(a) {
    const typeConfig = getTypeConfig(a.type);
    return `
        <div class="p-5 hover:bg-gray-50 transition-colors cursor-pointer ann-card-item" data-id="${a.id}">
            <div class="flex gap-4">
                ${a.coverImage ? `
                    <div class="flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden bg-gray-100">
                        <img src="${a.coverImage}" alt="" class="w-full h-full object-cover">
                    </div>
                ` : ''}
                <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-3 mb-2">
                        <div class="flex items-center gap-2 flex-wrap">
                            ${a.isTop ? '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-red-50 text-red-500 border border-red-200"><i class="fas fa-thumbtack"></i> 置顶</span>' : ''}
                            <h3 class="font-semibold text-gray-900 text-base truncate">${a.title}</h3>
                        </div>
                        <div class="flex items-center gap-2 flex-shrink-0">
                            ${getStatusTag(a.status)}
                        </div>
                    </div>
                    <p class="text-sm text-gray-500 line-clamp-1 mb-2">${a.summary}</p>
                    <div class="flex items-center gap-4 text-xs text-gray-400">
                        <span class="tag ${typeConfig.color}"><i class="fas ${typeConfig.icon} mr-1"></i>${a.type}</span>
                        <span><i class="fas fa-user mr-1"></i>${a.author}</span>
                        <span><i class="fas fa-clock mr-1"></i>${a.publishDate || a.createDate}</span>
                        <span><i class="fas fa-eye mr-1"></i>${a.viewCount}</span>
                        <span><i class="fas fa-users mr-1"></i>${a.targetAudience}</span>
                    </div>
                </div>
                <div class="flex flex-col gap-1 flex-shrink-0">
                    <button class="btn btn-sm btn-outline btn-edit-ann" data-id="${a.id}" title="编辑"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-outline btn-del-ann" data-id="${a.id}" title="删除" style="color:#ef4444;border-color:#fca5a5;"><i class="fas fa-trash"></i></button>
                    ${a.status === '已发布' ? `<button class="btn btn-sm btn-outline btn-offline-ann" data-id="${a.id}" title="下线" style="color:#d97706;border-color:#fcd34d;"><i class="fas fa-eye-slash"></i></button>` : ''}
                    ${a.status === '草稿' ? `<button class="btn btn-sm btn-outline btn-publish-ann" data-id="${a.id}" title="发布" style="color:#16a34a;border-color:#86efac;"><i class="fas fa-paper-plane"></i></button>` : ''}
                    ${a.status === '已下线' ? `<button class="btn btn-sm btn-outline btn-publish-ann" data-id="${a.id}" title="重新发布" style="color:#16a34a;border-color:#86efac;"><i class="fas fa-redo"></i></button>` : ''}
                </div>
            </div>
        </div>
    `;
}

// 渲染移动端预览
function renderMobilePreview() {
    const publishedAnns = announcements
        .filter(a => a.status === '已发布')
        .sort((a, b) => {
            if (a.isTop !== b.isTop) return b.isTop ? 1 : -1;
            return b.sortWeight - a.sortWeight;
        })
        .slice(0, 6);

    return `
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden" style="max-width:375px;margin:0 auto;">
            <!-- 手机顶部状态栏 -->
            <div class="bg-gray-900 text-white px-4 py-1.5 flex items-center justify-between text-xs">
                <span>14:04</span>
                <div class="flex items-center gap-1.5">
                    <i class="fas fa-signal text-xs"></i>
                    <i class="fas fa-wifi text-xs"></i>
                    <i class="fas fa-battery-three-quarters text-xs"></i>
                </div>
            </div>
            <!-- 手机导航栏 -->
            <div class="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <i class="fas fa-graduation-cap text-lg"></i>
                    <span class="font-bold text-base">研学平台</span>
                </div>
                <div class="flex items-center gap-3">
                    <i class="fas fa-search text-sm"></i>
                    <i class="fas fa-bell text-sm"></i>
                </div>
            </div>

            <!-- 公告轮播区域 -->
            <div class="bg-blue-50 border-b border-blue-100">
                <div class="px-4 py-2.5 flex items-center gap-2">
                    <span class="inline-flex items-center justify-center w-5 h-5 rounded bg-red-500 text-white text-xs font-bold flex-shrink-0">
                        <i class="fas fa-volume-up" style="font-size:10px;"></i>
                    </span>
                    <div class="flex-1 overflow-hidden" id="mobile-marquee">
                        <span class="text-sm text-gray-700 font-medium truncate block">
                            ${publishedAnns.length > 0 ? publishedAnns[0].title : '暂无公告'}
                        </span>
                    </div>
                    <span class="text-xs text-blue-500 flex-shrink-0">更多 <i class="fas fa-chevron-right" style="font-size:10px;"></i></span>
                </div>
            </div>

            <!-- 公告列表 -->
            <div class="px-3 py-3" style="max-height:420px;overflow-y:auto;">
                <div class="flex items-center justify-between mb-3">
                    <h3 class="font-bold text-gray-800 text-sm flex items-center gap-1.5">
                        <i class="fas fa-bullhorn text-blue-500"></i> 最新公告
                    </h3>
                    <span class="text-xs text-gray-400">共${publishedAnns.length}条</span>
                </div>
                <div class="space-y-2.5">
                    ${publishedAnns.map((a, idx) => {
                        const typeConfig = getTypeConfig(a.type);
                        return `
                            <div class="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow transition-shadow">
                                ${a.coverImage ? `
                                    <div class="relative h-28 overflow-hidden">
                                        <img src="${a.coverImage}" alt="" class="w-full h-full object-cover">
                                        ${a.isTop ? '<span class="absolute top-2 left-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded font-bold">置顶</span>' : ''}
                                    </div>
                                ` : ''}
                                <div class="p-3">
                                    <div class="flex items-start gap-2">
                                        ${!a.coverImage && a.isTop ? '<span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-red-50 text-red-500 flex-shrink-0 mt-0.5">顶</span>' : ''}
                                        <h4 class="text-sm font-semibold text-gray-800 leading-snug ${a.coverImage ? '' : 'line-clamp-2'}">${a.title}</h4>
                                    </div>
                                    <p class="text-xs text-gray-500 mt-1.5 line-clamp-2">${a.summary}</p>
                                    <div class="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                                        <span class="text-xs px-1.5 py-0.5 rounded-full ${typeConfig.color}">${a.type}</span>
                                        <span class="text-xs text-gray-400">${a.publishDate}</span>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                    ${publishedAnns.length === 0 ? `
                        <div class="text-center py-10 text-gray-400">
                            <i class="fas fa-inbox text-3xl mb-2 block"></i>
                            <p class="text-sm">暂无已发布公告</p>
                        </div>
                    ` : ''}
                </div>
            </div>

            <!-- 手机底部导航 -->
            <div class="border-t border-gray-200 bg-white px-2 py-2 flex items-center justify-around">
                <div class="flex flex-col items-center gap-0.5 text-blue-500">
                    <i class="fas fa-home text-lg"></i>
                    <span class="text-xs font-medium">首页</span>
                </div>
                <div class="flex flex-col items-center gap-0.5 text-gray-400">
                    <i class="fas fa-compass text-lg"></i>
                    <span class="text-xs">发现</span>
                </div>
                <div class="flex flex-col items-center gap-0.5 text-gray-400">
                    <i class="fas fa-calendar-alt text-lg"></i>
                    <span class="text-xs">活动</span>
                </div>
                <div class="flex flex-col items-center gap-0.5 text-gray-400">
                    <i class="fas fa-user text-lg"></i>
                    <span class="text-xs">我的</span>
                </div>
            </div>
        </div>
        <p class="text-center text-xs text-gray-400 mt-3"><i class="fas fa-mobile-alt mr-1"></i>移动端首页预览效果</p>
    `;
}

function bindEvents() {
    const container = document.getElementById('announcement-table-container');

    // 搜索
    document.getElementById('ann-search').addEventListener('input', (e) => {
        searchKeyword = e.target.value.trim();
        currentPage = 1;
        render();
    });

    // 类型筛选
    document.getElementById('ann-filter-type').addEventListener('change', (e) => {
        filterType = e.target.value;
        currentPage = 1;
        render();
    });

    // 状态筛选
    document.getElementById('ann-filter-status').addEventListener('change', (e) => {
        filterStatus = e.target.value;
        currentPage = 1;
        render();
    });

    // 新建公告
    document.getElementById('btn-add-ann').addEventListener('click', () => showAnnouncementForm());

    // 移动端预览按钮
    document.getElementById('btn-preview-mobile').addEventListener('click', () => showMobilePreviewModal());

    // 列表事件委托
    container.addEventListener('click', (e) => {
        const editBtn = e.target.closest('.btn-edit-ann');
        const delBtn = e.target.closest('.btn-del-ann');
        const offlineBtn = e.target.closest('.btn-offline-ann');
        const publishBtn = e.target.closest('.btn-publish-ann');
        const cardItem = e.target.closest('.ann-card-item');

        if (editBtn) {
            e.stopPropagation();
            const a = announcements.find(x => x.id === editBtn.dataset.id);
            if (a) showAnnouncementForm(a);
            return;
        }
        if (delBtn) {
            e.stopPropagation();
            const id = delBtn.dataset.id;
            showConfirm('确定要删除该公告吗？此操作不可恢复。', () => {
                announcements = announcements.filter(x => x.id !== id);
                showToast('公告删除成功', 'success');
                render();
            });
            return;
        }
        if (offlineBtn) {
            e.stopPropagation();
            const a = announcements.find(x => x.id === offlineBtn.dataset.id);
            if (a) {
                a.status = '已下线';
                showToast('公告已下线', 'warning');
                render();
            }
            return;
        }
        if (publishBtn) {
            e.stopPropagation();
            const a = announcements.find(x => x.id === publishBtn.dataset.id);
            if (a) {
                a.status = '已发布';
                a.publishDate = new Date().toISOString().split('T')[0];
                showToast('公告已发布', 'success');
                render();
            }
            return;
        }
        if (cardItem && !e.target.closest('button')) {
            const a = announcements.find(x => x.id === cardItem.dataset.id);
            if (a) showAnnouncementDetail(a);
        }
    });

    // 分页
    bindPaginationEvents(container, (page) => { currentPage = page; render(); });
}

// 公告详情弹窗
function showAnnouncementDetail(a) {
    const typeConfig = getTypeConfig(a.type);
    const body = `
        <div class="space-y-4">
            ${a.coverImage ? `
                <div class="rounded-xl overflow-hidden h-48 bg-gray-100">
                    <img src="${a.coverImage}" alt="" class="w-full h-full object-cover">
                </div>
            ` : ''}
            <div class="flex items-center gap-3 flex-wrap">
                <span class="tag ${typeConfig.color}"><i class="fas ${typeConfig.icon} mr-1"></i>${a.type}</span>
                ${getStatusTag(a.status)}
                ${a.isTop ? '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-red-50 text-red-500 border border-red-200"><i class="fas fa-thumbtack"></i> 置顶</span>' : ''}
            </div>
            <h2 class="text-xl font-bold text-gray-900">${a.title}</h2>
            <div class="flex items-center gap-4 text-sm text-gray-500 pb-3 border-b border-gray-100">
                <span><i class="fas fa-user mr-1"></i>${a.author}</span>
                <span><i class="fas fa-clock mr-1"></i>${a.publishDate || '未发布'}</span>
                <span><i class="fas fa-eye mr-1"></i>${a.viewCount} 次浏览</span>
                <span><i class="fas fa-users mr-1"></i>${a.targetAudience}</span>
            </div>
            <div class="bg-blue-50 rounded-lg p-3">
                <p class="text-sm text-blue-700"><i class="fas fa-quote-left mr-1 text-blue-400"></i> ${a.summary}</p>
            </div>
            <div class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">${a.content}</div>
            <div class="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100 text-sm">
                <div><span class="text-gray-400">公告编号：</span><span class="text-gray-600">${a.id}</span></div>
                <div><span class="text-gray-400">排序权重：</span><span class="text-gray-600">${a.sortWeight}</span></div>
                <div><span class="text-gray-400">创建日期：</span><span class="text-gray-600">${a.createDate}</span></div>
                <div><span class="text-gray-400">发布日期：</span><span class="text-gray-600">${a.publishDate || '未发布'}</span></div>
            </div>
        </div>
    `;
    showModal('公告详情', body, '', { maxWidth: '720px' });
}

// 公告表单弹窗
function showAnnouncementForm(a = null) {
    const isEdit = !!a;
    const title = isEdit ? '编辑公告' : '发布新公告';
    const body = `
        <form id="ann-form">
            <div class="space-y-4">
                <div class="form-group">
                    <label class="form-label">公告标题 <span class="required">*</span></label>
                    <input type="text" class="form-input" id="annf-title" value="${a ? a.title : ''}" placeholder="请输入公告标题" maxlength="100">
                    <p class="text-xs text-gray-400 mt-1">建议不超过50个字，将在移动端首页显示</p>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="form-group">
                        <label class="form-label">公告类型 <span class="required">*</span></label>
                        <select class="form-select" id="annf-type">
                            ${announcementTypes.map(t => `<option value="${t.value}" ${a && a.type === t.value ? 'selected' : ''}>${t.value}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">目标受众</label>
                        <select class="form-select" id="annf-audience">
                            ${['全体师生', '全体学生', '全体用户', '基地管理员', '研学导师', '研学基地'].map(t => `<option value="${t}" ${a && a.targetAudience === t ? 'selected' : ''}>${t}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">公告摘要 <span class="required">*</span></label>
                    <textarea class="form-input" id="annf-summary" placeholder="请输入公告摘要，将在列表和移动端卡片中显示" rows="2">${a ? a.summary : ''}</textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">公告内容 <span class="required">*</span></label>
                    <textarea class="form-input" id="annf-content" placeholder="请输入公告正文内容" rows="6" style="min-height:150px;">${a ? a.content : ''}</textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">封面图片URL</label>
                    <div class="flex gap-2">
                        <input type="text" class="form-input flex-1" id="annf-cover" value="${a ? a.coverImage : ''}" placeholder="请输入封面图片链接（可选）">
                        <button type="button" class="btn btn-outline btn-sm flex-shrink-0" id="annf-preview-cover">预览</button>
                    </div>
                    <div id="annf-cover-preview" class="mt-2 rounded-lg overflow-hidden bg-gray-50 hidden" style="max-height:150px;">
                        <img src="" alt="" class="w-full object-cover" style="max-height:150px;">
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-4">
                    <div class="form-group">
                        <label class="form-label">排序权重</label>
                        <input type="number" class="form-input" id="annf-weight" value="${a ? a.sortWeight : '50'}" min="0" max="100" placeholder="0-100">
                        <p class="text-xs text-gray-400 mt-1">数值越大越靠前</p>
                    </div>
                    <div class="form-group">
                        <label class="form-label">是否置顶</label>
                        <select class="form-select" id="annf-top">
                            <option value="false" ${a && !a.isTop ? 'selected' : ''}>否</option>
                            <option value="true" ${a && a.isTop ? 'selected' : ''}>是</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">发布状态</label>
                        <select class="form-select" id="annf-status">
                            <option value="草稿" ${a && a.status === '草稿' ? 'selected' : ''}>草稿</option>
                            <option value="已发布" ${!a || a.status === '已发布' ? 'selected' : ''}>立即发布</option>
                        </select>
                    </div>
                </div>
            </div>
        </form>
    `;
    const footer = `
        <button class="btn btn-outline" id="annf-cancel">取消</button>
        <button class="btn btn-primary" id="annf-save"><i class="fas fa-save mr-1"></i>保存</button>
    `;
    showModal(title, body, footer, { maxWidth: '720px' });

    // 封面预览
    const coverInput = document.getElementById('annf-cover');
    const coverPreview = document.getElementById('annf-cover-preview');
    const previewBtn = document.getElementById('annf-preview-cover');

    function updateCoverPreview() {
        const url = coverInput.value.trim();
        if (url) {
            coverPreview.classList.remove('hidden');
            coverPreview.querySelector('img').src = url;
        } else {
            coverPreview.classList.add('hidden');
        }
    }

    if (a && a.coverImage) updateCoverPreview();
    previewBtn.addEventListener('click', updateCoverPreview);

    // 取消和保存
    document.getElementById('annf-cancel').addEventListener('click', closeModal);
    document.getElementById('annf-save').addEventListener('click', () => {
        const titleVal = document.getElementById('annf-title').value.trim();
        const summary = document.getElementById('annf-summary').value.trim();
        const content = document.getElementById('annf-content').value.trim();

        if (!titleVal) { showToast('请输入公告标题', 'warning'); return; }
        if (!summary) { showToast('请输入公告摘要', 'warning'); return; }
        if (!content) { showToast('请输入公告内容', 'warning'); return; }

        const data = {
            title: titleVal,
            type: document.getElementById('annf-type').value,
            targetAudience: document.getElementById('annf-audience').value,
            summary,
            content,
            coverImage: document.getElementById('annf-cover').value.trim(),
            sortWeight: parseInt(document.getElementById('annf-weight').value) || 50,
            isTop: document.getElementById('annf-top').value === 'true',
            status: document.getElementById('annf-status').value,
        };

        if (isEdit) {
            Object.assign(a, data);
            if (data.status === '已发布' && !a.publishDate) {
                a.publishDate = new Date().toISOString().split('T')[0];
            }
            showToast('公告更新成功', 'success');
        } else {
            data.id = 'ANN' + String(announcements.length + 1).padStart(3, '0');
            data.createDate = new Date().toISOString().split('T')[0];
            data.publishDate = data.status === '已发布' ? data.createDate : '';
            data.author = '管理员';
            data.viewCount = 0;
            announcements.unshift(data);
            showToast('公告发布成功', 'success');
        }
        closeModal();
        render();
    });
}

// 移动端全屏预览弹窗
function showMobilePreviewModal() {
    const publishedAnns = announcements
        .filter(a => a.status === '已发布')
        .sort((a, b) => {
            if (a.isTop !== b.isTop) return b.isTop ? 1 : -1;
            return b.sortWeight - a.sortWeight;
        });

    const body = `
        <div class="flex justify-center">
            <div class="bg-gray-900 rounded-3xl p-3 shadow-2xl" style="width:390px;">
                <div class="bg-white rounded-2xl overflow-hidden" style="height:680px;display:flex;flex-direction:column;">
                    <!-- 状态栏 -->
                    <div class="bg-gray-900 text-white px-5 py-1.5 flex items-center justify-between text-xs rounded-t-2xl">
                        <span>14:04</span>
                        <div class="w-20 h-5 bg-gray-800 rounded-full mx-auto"></div>
                        <div class="flex items-center gap-1.5">
                            <i class="fas fa-signal text-xs"></i>
                            <i class="fas fa-wifi text-xs"></i>
                            <i class="fas fa-battery-three-quarters text-xs"></i>
                        </div>
                    </div>
                    <!-- 导航栏 -->
                    <div class="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3 flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <i class="fas fa-graduation-cap text-lg"></i>
                            <span class="font-bold text-base">研学平台</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <i class="fas fa-search text-sm"></i>
                            <div class="relative">
                                <i class="fas fa-bell text-sm"></i>
                                ${publishedAnns.length > 0 ? '<span class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>' : ''}
                            </div>
                        </div>
                    </div>
                    <!-- 公告滚动条 -->
                    <div class="bg-blue-50 border-b border-blue-100">
                        <div class="px-4 py-2.5 flex items-center gap-2">
                            <span class="inline-flex items-center justify-center w-5 h-5 rounded bg-red-500 text-white text-xs font-bold flex-shrink-0">
                                <i class="fas fa-volume-up" style="font-size:10px;"></i>
                            </span>
                            <div class="flex-1 overflow-hidden">
                                <span class="text-sm text-gray-700 font-medium truncate block">
                                    ${publishedAnns.length > 0 ? publishedAnns[0].title : '暂无公告'}
                                </span>
                            </div>
                            <span class="text-xs text-blue-500 flex-shrink-0">更多 <i class="fas fa-chevron-right" style="font-size:10px;"></i></span>
                        </div>
                    </div>
                    <!-- 公告列表 -->
                    <div class="flex-1 overflow-y-auto px-3 py-3">
                        <div class="flex items-center justify-between mb-3">
                            <h3 class="font-bold text-gray-800 text-sm flex items-center gap-1.5">
                                <i class="fas fa-bullhorn text-blue-500"></i> 最新公告
                            </h3>
                            <span class="text-xs text-gray-400">共${publishedAnns.length}条</span>
                        </div>
                        <div class="space-y-2.5">
                            ${publishedAnns.map(a => {
                                const typeConfig = getTypeConfig(a.type);
                                return `
                                    <div class="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                                        ${a.coverImage ? `
                                            <div class="relative h-32 overflow-hidden">
                                                <img src="${a.coverImage}" alt="" class="w-full h-full object-cover">
                                                ${a.isTop ? '<span class="absolute top-2 left-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded font-bold">置顶</span>' : ''}
                                            </div>
                                        ` : ''}
                                        <div class="p-3">
                                            <div class="flex items-start gap-2">
                                                ${!a.coverImage && a.isTop ? '<span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-red-50 text-red-500 flex-shrink-0 mt-0.5">顶</span>' : ''}
                                                <h4 class="text-sm font-semibold text-gray-800 leading-snug">${a.title}</h4>
                                            </div>
                                            <p class="text-xs text-gray-500 mt-1.5 line-clamp-2">${a.summary}</p>
                                            <div class="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                                                <span class="text-xs px-1.5 py-0.5 rounded-full ${typeConfig.color}">${a.type}</span>
                                                <div class="flex items-center gap-2 text-xs text-gray-400">
                                                    <span><i class="fas fa-eye mr-0.5"></i>${a.viewCount}</span>
                                                    <span>${a.publishDate}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    <!-- 底部导航 -->
                    <div class="border-t border-gray-200 bg-white px-2 py-2 flex items-center justify-around flex-shrink-0">
                        <div class="flex flex-col items-center gap-0.5 text-blue-500">
                            <i class="fas fa-home text-lg"></i>
                            <span class="text-xs font-medium">首页</span>
                        </div>
                        <div class="flex flex-col items-center gap-0.5 text-gray-400">
                            <i class="fas fa-compass text-lg"></i>
                            <span class="text-xs">发现</span>
                        </div>
                        <div class="flex flex-col items-center gap-0.5 text-gray-400">
                            <i class="fas fa-calendar-alt text-lg"></i>
                            <span class="text-xs">活动</span>
                        </div>
                        <div class="flex flex-col items-center gap-0.5 text-gray-400">
                            <i class="fas fa-user text-lg"></i>
                            <span class="text-xs">我的</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    showModal('移动端首页预览', body, '', { maxWidth: '480px' });
}
