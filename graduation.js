// graduation.js - 结营核验模块（以活动为维度）
import { showToast, showModal, closeModal, showConfirm, renderPagination, bindPaginationEvents } from './layout.js';

// 模拟活动维度的结营核验数据
// checkinStatus: 已核验 / 未核验 —— 只有入营"已核验"的学生才能进行结营
const activitiesForCheckOut = [
    {
        id: 'ACT001',
        name: '2026春季延安红色研学',
        project: '红色革命教育研学之旅',
        startDate: '2026-03-18',
        endDate: '2026-03-20',
        leader: '王建军',
        leaderPhone: '13800010001',
        location: '延安革命纪念馆',
        status: '已结束',
        students: [
            { id: 'STU001', name: '张明远', gender: '男', school: '北京市第一中学', grade: '初二', phone: '13800001001', checkinStatus: '已核验', checkStatus: '已结营', checkTime: '2026-03-20 16:30', operator: '王建军', evaluation: '优秀', certificate: '已发放', remark: '表现突出，获最佳探索奖' },
            { id: 'STU002', name: '李思涵', gender: '女', school: '北京市实验中学', grade: '初一', phone: '13800001002', checkinStatus: '已核验', checkStatus: '已结营', checkTime: '2026-03-20 16:32', operator: '王建军', evaluation: '良好', certificate: '已发放', remark: '' },
            { id: 'STU003', name: '王浩然', gender: '男', school: '清华附中', grade: '初三', phone: '13800001003', checkinStatus: '已核验', checkStatus: '已结营', checkTime: '2026-03-20 16:35', operator: '王建军', evaluation: '优秀', certificate: '已发放', remark: '自然笔记作品被评为一等奖' },
            { id: 'STU004', name: '赵雨萱', gender: '女', school: '北京市海淀小学', grade: '六年级', phone: '13800001004', checkinStatus: '已核验', checkStatus: '未结营', checkTime: '', operator: '', evaluation: '', certificate: '未发放', remark: '' },
            { id: 'STU005', name: '刘子轩', gender: '男', school: '人大附中', grade: '初二', phone: '13800001005', checkinStatus: '未核验', checkStatus: '未结营', checkTime: '', operator: '', evaluation: '', certificate: '未发放', remark: '' },
            { id: 'STU006', name: '陈思琪', gender: '女', school: '北京四中', grade: '初一', phone: '13800001006', checkinStatus: '未核验', checkStatus: '未结营', checkTime: '', operator: '', evaluation: '', certificate: '未发放', remark: '' },
        ]
    },
    {
        id: 'ACT004',
        name: '传统文化体验营春季班',
        project: '传统文化体验营',
        startDate: '2026-03-10',
        endDate: '2026-03-14',
        leader: '赵文静',
        leaderPhone: '13800010004',
        location: '故宫博物院',
        status: '已结束',
        students: [
            { id: 'STU016', name: '谢雨欣', gender: '女', school: '北京市海淀小学', grade: '六年级', phone: '13800001016', checkinStatus: '已核验', checkStatus: '已结营', checkTime: '2026-03-14 16:00', operator: '赵文静', evaluation: '优秀', certificate: '已发放', remark: '书法作品获一等奖' },
            { id: 'STU017', name: '韩子墨', gender: '男', school: '北师大附中', grade: '初一', phone: '13800001017', checkinStatus: '已核验', checkStatus: '已结营', checkTime: '2026-03-14 16:05', operator: '赵文静', evaluation: '良好', certificate: '已发放', remark: '' },
            { id: 'STU018', name: '冯诗雅', gender: '女', school: '人大附中', grade: '初二', phone: '13800001018', checkinStatus: '已核验', checkStatus: '已结营', checkTime: '2026-03-14 16:08', operator: '赵文静', evaluation: '优秀', certificate: '已发放', remark: '传统手工艺作品优秀' },
        ]
    },
    {
        id: 'ACT002',
        name: '科技创新营第一期',
        project: '科技创新探索营',
        startDate: '2026-04-01',
        endDate: '2026-04-05',
        leader: '李明辉',
        leaderPhone: '13800010002',
        location: '中关村科技园',
        status: '进行中',
        students: [
            { id: 'STU007', name: '杨博文', gender: '男', school: '北师大附中', grade: '初三', phone: '13800001007', checkinStatus: '未核验', checkStatus: '未结营', checkTime: '', operator: '', evaluation: '', certificate: '未发放', remark: '' },
            { id: 'STU008', name: '吴佳怡', gender: '女', school: '北京市第一中学', grade: '初二', phone: '13800001008', checkinStatus: '已核验', checkStatus: '未结营', checkTime: '', operator: '', evaluation: '', certificate: '未发放', remark: '' },
            { id: 'STU009', name: '黄梓涵', gender: '男', school: '北京市朝阳小学', grade: '六年级', phone: '13800001009', checkinStatus: '已核验', checkStatus: '未结营', checkTime: '', operator: '', evaluation: '', certificate: '未发放', remark: '' },
            { id: 'STU010', name: '周雅琪', gender: '女', school: '北京市实验中学', grade: '初一', phone: '13800001010', checkinStatus: '未核验', checkStatus: '未结营', checkTime: '', operator: '', evaluation: '', certificate: '未发放', remark: '' },
            { id: 'STU011', name: '孙宇航', gender: '男', school: '清华附中', grade: '初二', phone: '13800001011', checkinStatus: '未核验', checkStatus: '未结营', checkTime: '', operator: '', evaluation: '', certificate: '未发放', remark: '' },
        ]
    },
    {
        id: 'ACT003',
        name: '暑期雨林探秘营',
        project: '自然生态探秘之旅',
        startDate: '2026-07-10',
        endDate: '2026-07-15',
        leader: '张秀英',
        leaderPhone: '13800010003',
        location: '西双版纳热带雨林',
        status: '未开始',
        students: [
            { id: 'STU012', name: '马晓彤', gender: '女', school: '人大附中', grade: '初三', phone: '13800001012', checkinStatus: '未核验', checkStatus: '未结营', checkTime: '', operator: '', evaluation: '', certificate: '未发放', remark: '' },
            { id: 'STU013', name: '林浩宇', gender: '男', school: '北京四中', grade: '初二', phone: '13800001013', checkinStatus: '未核验', checkStatus: '未结营', checkTime: '', operator: '', evaluation: '', certificate: '未发放', remark: '' },
            { id: 'STU014', name: '郑雨桐', gender: '女', school: '北京市实验中学', grade: '初一', phone: '13800001014', checkinStatus: '未核验', checkStatus: '未结营', checkTime: '', operator: '', evaluation: '', certificate: '未发放', remark: '' },
            { id: 'STU015', name: '何俊杰', gender: '男', school: '清华附中', grade: '初三', phone: '13800001015', checkinStatus: '未核验', checkStatus: '未结营', checkTime: '', operator: '', evaluation: '', certificate: '未发放', remark: '' },
        ]
    },
    {
        id: 'ACT005',
        name: '海洋科学探索营',
        project: '海洋科学探索营',
        startDate: '2026-04-15',
        endDate: '2026-04-19',
        leader: '孙海波',
        leaderPhone: '13800010005',
        location: '青岛海洋科学馆',
        status: '未开始',
        students: [
            { id: 'STU019', name: '曹天翔', gender: '男', school: '北京市朝阳中学', grade: '初三', phone: '13800001019', checkinStatus: '未核验', checkStatus: '未结营', checkTime: '', operator: '', evaluation: '', certificate: '未发放', remark: '' },
            { id: 'STU020', name: '邓紫琳', gender: '女', school: '北京四中', grade: '初一', phone: '13800001020', checkinStatus: '未核验', checkStatus: '未结营', checkTime: '', operator: '', evaluation: '', certificate: '未发放', remark: '' },
            { id: 'STU021', name: '彭浩然', gender: '男', school: '清华附中', grade: '初二', phone: '13800001021', checkinStatus: '未核验', checkStatus: '未结营', checkTime: '', operator: '', evaluation: '', certificate: '未发放', remark: '' },
            { id: 'STU022', name: '罗雅文', gender: '女', school: '北京市实验中学', grade: '初一', phone: '13800001022', checkinStatus: '未核验', checkStatus: '未结营', checkTime: '', operator: '', evaluation: '', certificate: '未发放', remark: '' },
            { id: 'STU023', name: '蒋明轩', gender: '男', school: '北师大附中', grade: '初三', phone: '13800001023', checkinStatus: '未核验', checkStatus: '未结营', checkTime: '', operator: '', evaluation: '', certificate: '未发放', remark: '' },
            { id: 'STU024', name: '唐诗韵', gender: '女', school: '人大附中', grade: '初二', phone: '13800001024', checkinStatus: '未核验', checkStatus: '未结营', checkTime: '', operator: '', evaluation: '', certificate: '未发放', remark: '' },
        ]
    },
];

let currentView = 'list'; // 'list' | 'detail'
let currentActivityId = null;
let listPage = 1;
let detailPage = 1;
const listPageSize = 8;
const detailPageSize = 10;
let listSearch = '';
let listFilterStatus = '';
let detailSearch = '';
let detailFilterStatus = '';
let detailFilterCheckin = '';
let selectedStudents = new Set();

function getFilteredActivities() {
    return activitiesForCheckOut.filter(a => {
        const matchSearch = !listSearch || a.name.includes(listSearch) || a.id.includes(listSearch) || a.leader.includes(listSearch) || a.project.includes(listSearch);
        const matchStatus = !listFilterStatus || a.status === listFilterStatus;
        return matchSearch && matchStatus;
    });
}

function getActivityStats(activity) {
    const total = activity.students.length;
    const graduated = activity.students.filter(s => s.checkStatus === '已结营').length;
    const pending = total - graduated;
    const rate = total > 0 ? Math.round(graduated / total * 100) : 0;
    const certIssued = activity.students.filter(s => s.certificate === '已发放').length;
    const checkedInCount = activity.students.filter(s => s.checkinStatus === '已核验').length;
    const notCheckedInCount = activity.students.filter(s => s.checkinStatus === '未核验').length;
    // 可结营人数 = 入营已核验且未结营
    const canGraduateCount = activity.students.filter(s => s.checkinStatus === '已核验' && s.checkStatus === '未结营').length;
    return { total, graduated, pending, rate, certIssued, checkedInCount, notCheckedInCount, canGraduateCount };
}

function getGlobalStats() {
    let totalStudents = 0, totalGraduated = 0, totalCerts = 0, totalCheckedIn = 0, totalCanGraduate = 0;
    activitiesForCheckOut.forEach(a => {
        totalStudents += a.students.length;
        totalGraduated += a.students.filter(s => s.checkStatus === '已结营').length;
        totalCerts += a.students.filter(s => s.certificate === '已发放').length;
        totalCheckedIn += a.students.filter(s => s.checkinStatus === '已核验').length;
        totalCanGraduate += a.students.filter(s => s.checkinStatus === '已核验' && s.checkStatus === '未结营').length;
    });
    return {
        activityCount: activitiesForCheckOut.length,
        totalStudents,
        totalGraduated,
        totalPending: totalStudents - totalGraduated,
        totalCerts,
        totalCheckedIn,
        totalCanGraduate
    };
}

// 入营核验状态标签
function getCheckinStatusTag(status) {
    if (status === '已核验') return '<span class="tag tag-green"><i class="fas fa-check-circle mr-1"></i>已核验</span>';
    return '<span class="tag tag-yellow"><i class="fas fa-clock mr-1"></i>未核验</span>';
}

export function render() {
    if (currentView === 'detail' && currentActivityId) {
        renderDetail();
    } else {
        renderList();
    }
}

function renderList() {
    const container = document.getElementById('main-content');
    const stats = getGlobalStats();
    const filtered = getFilteredActivities();
    const total = filtered.length;
    const start = (listPage - 1) * listPageSize;
    const pageData = filtered.slice(start, start + listPageSize);

    container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">结营核验</h1>
            <p class="page-desc">按活动维度管理学生结营核验，只有入营已核验的学生才能进行结营</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="stat-card">
                <div class="stat-icon bg-blue-50 text-blue-500"><i class="fas fa-calendar-alt"></i></div>
                <div class="stat-info"><h3>${stats.activityCount}</h3><p>活动总数</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-green-50 text-green-500"><i class="fas fa-graduation-cap"></i></div>
                <div class="stat-info"><h3>${stats.totalGraduated}</h3><p>已结营人数</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-orange-50 text-orange-500"><i class="fas fa-clipboard-check"></i></div>
                <div class="stat-info"><h3>${stats.totalCanGraduate}</h3><p>待结营(已核验)</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-purple-50 text-purple-500"><i class="fas fa-certificate"></i></div>
                <div class="stat-info"><h3>${stats.totalCerts}</h3><p>已发证书</p></div>
            </div>
        </div>

        <div class="table-container" id="checkout-list-container">
            <div class="table-toolbar">
                <div class="flex items-center gap-3 flex-wrap">
                    <div class="table-search">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="搜索活动名称/编号/带队人/项目..." id="checkout-list-search" value="${listSearch}">
                    </div>
                    <select class="form-select" style="width:auto;min-width:120px;padding:8px 32px 8px 12px;" id="checkout-list-filter">
                        <option value="">全部状态</option>
                        <option value="未开始" ${listFilterStatus === '未开始' ? 'selected' : ''}>未开始</option>
                        <option value="进行中" ${listFilterStatus === '进行中' ? 'selected' : ''}>进行中</option>
                        <option value="已结束" ${listFilterStatus === '已结束' ? 'selected' : ''}>已结束</option>
                    </select>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>活动编号</th>
                            <th>活动名称</th>
                            <th>研学项目</th>
                            <th>带队人</th>
                            <th>活动时间</th>
                            <th>入营核验</th>
                            <th>结营进度</th>
                            <th>活动状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${pageData.length === 0 ? `<tr><td colspan="9"><div class="empty-state"><i class="fas fa-inbox"></i><p>暂无结营核验活动</p></div></td></tr>` :
                        pageData.map(a => {
                            const s = getActivityStats(a);
                            return `
                            <tr>
                                <td><span class="font-mono text-xs text-gray-500">${a.id}</span></td>
                                <td><span class="font-medium text-gray-900">${a.name}</span></td>
                                <td><span class="text-sm text-gray-600">${a.project}</span></td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <div class="w-7 h-7 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">${a.leader.charAt(0)}</div>
                                        <div>
                                            <div class="text-sm font-medium">${a.leader}</div>
                                            <div class="text-xs text-gray-400">${a.leaderPhone}</div>
                                        </div>
                                    </div>
                                </td>
                                <td><span class="text-sm text-gray-500">${a.startDate} ~ ${a.endDate}</span></td>
                                <td>
                                    <div class="flex flex-col gap-0.5">
                                        <span class="text-xs text-green-600"><i class="fas fa-user-check mr-1"></i>已核验 ${s.checkedInCount}人</span>
                                        ${s.notCheckedInCount > 0 ? `<span class="text-xs text-yellow-600"><i class="fas fa-user-clock mr-1"></i>未核验 ${s.notCheckedInCount}人</span>` : ''}
                                    </div>
                                </td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <div class="w-24 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                            <div class="h-full rounded-full transition-all ${s.rate >= 100 ? 'bg-green-500' : s.rate >= 50 ? 'bg-blue-500' : 'bg-orange-400'}" style="width:${s.rate}%"></div>
                                        </div>
                                        <span class="text-xs font-medium ${s.rate >= 100 ? 'text-green-600' : 'text-gray-500'}">${s.graduated}/${s.total}</span>
                                    </div>
                                </td>
                                <td>${getActivityStatusTag(a.status)}</td>
                                <td>
                                    <button class="btn btn-sm btn-primary btn-enter-checkout-detail" data-id="${a.id}">
                                        <i class="fas fa-arrow-right mr-1"></i> 进入结营
                                    </button>
                                </td>
                            </tr>`;
                        }).join('')}
                    </tbody>
                </table>
            </div>
            ${renderPagination(listPage, total, listPageSize)}
        </div>
    `;
    bindListEvents();
}

function renderDetail() {
    const container = document.getElementById('main-content');
    const activity = activitiesForCheckOut.find(a => a.id === currentActivityId);
    if (!activity) { currentView = 'list'; renderList(); return; }

    const stats = getActivityStats(activity);
    const filteredStudents = activity.students.filter(s => {
        const matchSearch = !detailSearch || s.name.includes(detailSearch) || s.id.includes(detailSearch) || s.school.includes(detailSearch);
        const matchStatus = !detailFilterStatus || s.checkStatus === detailFilterStatus;
        const matchCheckin = !detailFilterCheckin || s.checkinStatus === detailFilterCheckin;
        return matchSearch && matchStatus && matchCheckin;
    });
    const total = filteredStudents.length;
    const start = (detailPage - 1) * detailPageSize;
    const pageData = filteredStudents.slice(start, start + detailPageSize);
    // 可结营的学生：入营已核验且未结营
    const canGraduateStudents = activity.students.filter(s => s.checkinStatus === '已核验' && s.checkStatus === '未结营');
    const canGraduate = activity.status === '已结束' || activity.status === '进行中';

    container.innerHTML = `
        <div class="page-header">
            <div class="flex items-center gap-3 mb-2">
                <button class="btn btn-outline btn-sm" id="btn-back-checkout-list"><i class="fas fa-arrow-left mr-1"></i> 返回列表</button>
                <span class="text-gray-300">|</span>
                <span class="text-sm text-gray-500">结营核验</span>
            </div>
            <h1 class="page-title">${activity.name}</h1>
            <p class="page-desc">${activity.project} · ${activity.location} · ${activity.startDate} ~ ${activity.endDate}</p>
        </div>

        <!-- 活动信息卡片 -->
        <div class="grid grid-cols-1 lg:grid-cols-6 gap-4 mb-6">
            <div class="stat-card">
                <div class="stat-icon bg-indigo-50 text-indigo-500"><i class="fas fa-user-tie"></i></div>
                <div class="stat-info"><h3 class="text-base">${activity.leader}</h3><p>带队人</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-purple-50 text-purple-500"><i class="fas fa-users"></i></div>
                <div class="stat-info"><h3>${stats.total}</h3><p>学生总数</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-blue-50 text-blue-500"><i class="fas fa-user-check"></i></div>
                <div class="stat-info"><h3>${stats.checkedInCount}</h3><p>入营已核验</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-green-50 text-green-500"><i class="fas fa-graduation-cap"></i></div>
                <div class="stat-info"><h3>${stats.graduated}</h3><p>已结营</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-orange-50 text-orange-500"><i class="fas fa-clipboard-check"></i></div>
                <div class="stat-info"><h3>${stats.canGraduateCount}</h3><p>待结营(已核验)</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-yellow-50 text-yellow-500"><i class="fas fa-certificate"></i></div>
                <div class="stat-info"><h3>${stats.certIssued}</h3><p>已发证书</p></div>
            </div>
        </div>

        <!-- 结营进度条 -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
            <div class="flex items-center justify-between mb-3">
                <span class="text-sm font-medium text-gray-700">结营进度</span>
                <span class="text-sm font-bold ${stats.rate >= 100 ? 'text-green-600' : 'text-blue-600'}">${stats.graduated} / ${stats.total} 人已结营</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                <div class="h-full rounded-full transition-all duration-500 ${stats.rate >= 100 ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gradient-to-r from-orange-400 to-orange-500'}" style="width:${stats.rate}%"></div>
            </div>
            <div class="flex justify-between mt-2 text-xs text-gray-400">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
            </div>
            ${!canGraduate ? `<div class="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200 text-sm text-yellow-700"><i class="fas fa-info-circle mr-1"></i> 活动尚未开始，暂不可进行结营操作</div>` : ''}
            ${canGraduate && stats.canGraduateCount === 0 && stats.pending > 0 ? `<div class="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200 text-sm text-yellow-700"><i class="fas fa-exclamation-triangle mr-1"></i> 剩余未结营学生中无入营已核验的学生，请先完成入营核验后再进行结营</div>` : ''}
        </div>

        <!-- 学生结营列表 -->
        <div class="table-container" id="checkout-detail-container">
            <div class="table-toolbar">
                <div class="flex items-center gap-3 flex-wrap">
                    <div class="table-search">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="搜索姓名/学号/学校..." id="checkout-detail-search" value="${detailSearch}">
                    </div>
                    <select class="form-select" style="width:auto;min-width:120px;padding:8px 32px 8px 12px;" id="checkout-detail-filter">
                        <option value="">全部结营状态</option>
                        <option value="已结营" ${detailFilterStatus === '已结营' ? 'selected' : ''}>已结营</option>
                        <option value="未结营" ${detailFilterStatus === '未结营' ? 'selected' : ''}>未结营</option>
                    </select>
                    <select class="form-select" style="width:auto;min-width:130px;padding:8px 32px 8px 12px;" id="checkout-detail-checkin-filter">
                        <option value="">全部入营状态</option>
                        <option value="已核验" ${detailFilterCheckin === '已核验' ? 'selected' : ''}>入营已核验</option>
                        <option value="未核验" ${detailFilterCheckin === '未核验' ? 'selected' : ''}>入营未核验</option>
                    </select>
                </div>
                <div class="table-actions">
                    <button class="btn btn-outline btn-sm" id="btn-select-all-pending-co" ${canGraduateStudents.length === 0 || !canGraduate ? 'disabled' : ''}>
                        <i class="fas fa-check-square mr-1"></i> 全选可结营
                    </button>
                    <button class="btn btn-primary" id="btn-batch-checkout" ${canGraduateStudents.length === 0 || !canGraduate ? 'disabled' : ''}>
                        <i class="fas fa-check-double mr-1"></i> 批量结营 <span id="batch-co-count" class="ml-1 bg-white bg-opacity-20 rounded px-1.5 py-0.5 text-xs">${selectedStudents.size > 0 ? selectedStudents.size : ''}</span>
                    </button>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th style="width:40px"><input type="checkbox" id="co-check-all" class="w-4 h-4 rounded" ${!canGraduate ? 'disabled' : ''}></th>
                            <th>学号</th>
                            <th>姓名</th>
                            <th>性别</th>
                            <th>学校</th>
                            <th>年级</th>
                            <th>入营核验</th>
                            <th>结营时间</th>
                            <th>综合评价</th>
                            <th>证书</th>
                            <th>结营状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${pageData.length === 0 ? `<tr><td colspan="12"><div class="empty-state"><i class="fas fa-inbox"></i><p>暂无学生数据</p></div></td></tr>` :
                        pageData.map(s => {
                            const canDoGrad = s.checkinStatus === '已核验' && s.checkStatus === '未结营' && canGraduate;
                            const isNotCheckedIn = s.checkinStatus !== '已核验';
                            return `
                            <tr class="${s.checkStatus === '已结营' ? 'bg-green-50 bg-opacity-30' : isNotCheckedIn ? 'bg-gray-50 bg-opacity-50' : ''}">
                                <td><input type="checkbox" class="student-co-check w-4 h-4 rounded" data-id="${s.id}" ${selectedStudents.has(s.id) ? 'checked' : ''} ${!canDoGrad ? 'disabled' : ''}></td>
                                <td><span class="font-mono text-xs text-gray-500">${s.id}</span></td>
                                <td><span class="font-medium text-gray-900">${s.name}</span></td>
                                <td>${s.gender === '男' ? '<span class="tag tag-blue">男</span>' : '<span class="tag tag-red">女</span>'}</td>
                                <td><span class="text-sm">${s.school}</span></td>
                                <td><span class="text-sm text-gray-600">${s.grade}</span></td>
                                <td>${getCheckinStatusTag(s.checkinStatus)}</td>
                                <td><span class="text-sm text-gray-500">${s.checkTime || '<span class="text-gray-300">-</span>'}</span></td>
                                <td>${s.evaluation ? getEvalTag(s.evaluation) : '<span class="text-gray-300">-</span>'}</td>
                                <td>${getCertTag(s.certificate)}</td>
                                <td>${getGradStatusTag(s.checkStatus)}</td>
                                <td>
                                    <div class="flex gap-1">
                                        ${canDoGrad ? 
                                            `<button class="btn btn-sm btn-success btn-do-checkout" data-id="${s.id}" title="结营核验"><i class="fas fa-graduation-cap"></i> 结营</button>` : 
                                            s.checkStatus === '已结营' ?
                                            `<button class="btn btn-sm btn-outline btn-view-checkout" data-id="${s.id}" title="查看详情"><i class="fas fa-eye"></i></button>` :
                                            `<button class="btn btn-sm btn-outline" disabled title="${isNotCheckedIn ? '入营未核验，不可结营' : '活动未结束'}"><i class="fas fa-lock"></i></button>`
                                        }
                                    </div>
                                </td>
                            </tr>`;
                        }).join('')}
                    </tbody>
                </table>
            </div>
            ${renderPagination(detailPage, total, detailPageSize)}
        </div>
    `;
    bindDetailEvents(activity);
}

function getActivityStatusTag(status) {
    const map = { '未开始': 'tag-yellow', '进行中': 'tag-blue', '已结束': 'tag-green' };
    return `<span class="tag ${map[status] || 'tag-gray'}">${status}</span>`;
}

function getGradStatusTag(status) {
    return status === '已结营' ? '<span class="tag tag-green"><i class="fas fa-check-circle mr-1"></i>已结营</span>' : '<span class="tag tag-yellow"><i class="fas fa-clock mr-1"></i>未结营</span>';
}

function getEvalTag(evaluation) {
    const map = { '优秀': 'tag-green', '良好': 'tag-blue', '合格': 'tag-yellow', '不合格': 'tag-red' };
    return `<span class="tag ${map[evaluation] || 'tag-gray'}">${evaluation}</span>`;
}

function getCertTag(cert) {
    return cert === '已发放' ? '<span class="tag tag-green"><i class="fas fa-certificate mr-1"></i>已发放</span>' : '<span class="tag tag-gray">未发放</span>';
}

function bindListEvents() {
    const container = document.getElementById('checkout-list-container');
    if (!container) return;

    document.getElementById('checkout-list-search').addEventListener('input', (e) => {
        listSearch = e.target.value.trim();
        listPage = 1;
        renderList();
    });

    document.getElementById('checkout-list-filter').addEventListener('change', (e) => {
        listFilterStatus = e.target.value;
        listPage = 1;
        renderList();
    });

    container.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-enter-checkout-detail');
        if (btn) {
            currentActivityId = btn.dataset.id;
            currentView = 'detail';
            detailPage = 1;
            detailSearch = '';
            detailFilterStatus = '';
            detailFilterCheckin = '';
            selectedStudents.clear();
            render();
        }
    });

    bindPaginationEvents(container, (page) => { listPage = page; renderList(); });
}

function bindDetailEvents(activity) {
    const container = document.getElementById('checkout-detail-container');
    if (!container) return;

    // 返回列表
    document.getElementById('btn-back-checkout-list').addEventListener('click', () => {
        currentView = 'list';
        currentActivityId = null;
        selectedStudents.clear();
        render();
    });

    // 搜索
    document.getElementById('checkout-detail-search').addEventListener('input', (e) => {
        detailSearch = e.target.value.trim();
        detailPage = 1;
        renderDetail();
    });

    // 结营状态筛选
    document.getElementById('checkout-detail-filter').addEventListener('change', (e) => {
        detailFilterStatus = e.target.value;
        detailPage = 1;
        renderDetail();
    });

    // 入营核验状态筛选
    document.getElementById('checkout-detail-checkin-filter').addEventListener('change', (e) => {
        detailFilterCheckin = e.target.value;
        detailPage = 1;
        renderDetail();
    });

    // 全选/取消全选（只选可结营的：入营已核验且未结营）
    const checkAll = document.getElementById('co-check-all');
    if (checkAll) {
        checkAll.addEventListener('change', (e) => {
            const checkboxes = container.querySelectorAll('.student-co-check:not(:disabled)');
            checkboxes.forEach(cb => {
                cb.checked = e.target.checked;
                if (e.target.checked) {
                    selectedStudents.add(cb.dataset.id);
                } else {
                    selectedStudents.delete(cb.dataset.id);
                }
            });
            updateBatchCount();
        });
    }

    // 单个勾选
    container.addEventListener('change', (e) => {
        if (e.target.classList.contains('student-co-check')) {
            if (e.target.checked) {
                selectedStudents.add(e.target.dataset.id);
            } else {
                selectedStudents.delete(e.target.dataset.id);
            }
            updateBatchCount();
        }
    });

    // 全选可结营（入营已核验且未结营）
    document.getElementById('btn-select-all-pending-co').addEventListener('click', () => {
        selectedStudents.clear();
        activity.students.forEach(s => {
            if (s.checkinStatus === '已核验' && s.checkStatus === '未结营') selectedStudents.add(s.id);
        });
        renderDetail();
    });

    // 批量结营 - 只结营入营已核验且未结营的
    document.getElementById('btn-batch-checkout').addEventListener('click', () => {
        const toGraduate = activity.students.filter(s => selectedStudents.has(s.id) && s.checkinStatus === '已核验' && s.checkStatus === '未结营');
        if (toGraduate.length === 0) {
            showToast('请先勾选入营已核验且待结营的学生', 'warning');
            return;
        }
        showBatchGraduationForm(toGraduate, activity);
    });

    // 单个结营 / 查看
    container.addEventListener('click', (e) => {
        const doBtn = e.target.closest('.btn-do-checkout');
        const viewBtn = e.target.closest('.btn-view-checkout');

        if (doBtn) {
            const student = activity.students.find(s => s.id === doBtn.dataset.id);
            if (student) {
                // 二次校验：只有入营已核验才能结营
                if (student.checkinStatus !== '已核验') {
                    showToast('该学生入营未核验，无法进行结营', 'error');
                    return;
                }
                showCheckOutForm(student, activity);
            }
        }
        if (viewBtn) {
            const student = activity.students.find(s => s.id === viewBtn.dataset.id);
            if (student) showCheckOutDetail(student, activity);
        }
    });

    bindPaginationEvents(container, (page) => { detailPage = page; renderDetail(); });
}

function updateBatchCount() {
    const countEl = document.getElementById('batch-co-count');
    if (countEl) {
        countEl.textContent = selectedStudents.size > 0 ? selectedStudents.size : '';
    }
}

// 单个结营表单
function showCheckOutForm(student, activity) {
    const body = `
        <form id="co-form">
            <div class="bg-green-50 rounded-lg p-4 mb-4">
                <div class="grid grid-cols-2 gap-3 text-sm">
                    <div><span class="text-gray-500">学号：</span><span class="font-medium">${student.id}</span></div>
                    <div><span class="text-gray-500">姓名：</span><span class="font-medium">${student.name}</span></div>
                    <div><span class="text-gray-500">学校：</span><span class="font-medium">${student.school}</span></div>
                    <div><span class="text-gray-500">年级：</span><span class="font-medium">${student.grade}</span></div>
                    <div><span class="text-gray-500">活动：</span><span class="font-medium">${activity.name}</span></div>
                    <div><span class="text-gray-500">带队人：</span><span class="font-medium">${activity.leader}</span></div>
                </div>
            </div>
            <div class="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div class="flex items-center gap-2 text-sm text-blue-700">
                    <i class="fas fa-user-check"></i>
                    <span>入营核验状态：<strong>已核验</strong>，可进行结营操作</span>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div class="form-group">
                    <label class="form-label">综合评价 <span class="required">*</span></label>
                    <select class="form-select" id="co-eval">
                        <option value="优秀">优秀</option>
                        <option value="良好" selected>良好</option>
                        <option value="合格">合格</option>
                        <option value="不合格">不合格</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">证书发放</label>
                    <select class="form-select" id="co-cert">
                        <option value="已发放" selected>已发放</option>
                        <option value="未发放">未发放</option>
                    </select>
                </div>
                <div class="form-group col-span-2">
                    <label class="form-label">结营评语</label>
                    <textarea class="form-input" id="co-remark" rows="3" placeholder="请输入结营评语或备注"></textarea>
                </div>
            </div>
        </form>
    `;
    const footer = `<button class="btn btn-outline" id="co-cancel">取消</button><button class="btn btn-success" id="co-confirm"><i class="fas fa-graduation-cap mr-1"></i>确认结营</button>`;
    showModal('结营核验 - ' + student.name, body, footer);

    document.getElementById('co-cancel').addEventListener('click', closeModal);
    document.getElementById('co-confirm').addEventListener('click', () => {
        student.checkStatus = '已结营';
        student.checkTime = getNowStr();
        student.operator = activity.leader;
        student.evaluation = document.getElementById('co-eval').value;
        student.certificate = document.getElementById('co-cert').value;
        student.remark = document.getElementById('co-remark').value.trim();

        showToast(`${student.name} 结营核验成功`, 'success');
        closeModal();
        renderDetail();
    });
}

// 批量结营表单
function showBatchGraduationForm(students, activity) {
    const body = `
        <form id="batch-co-form">
            <div class="bg-green-50 rounded-lg p-4 mb-4">
                <div class="flex items-center gap-2 mb-2">
                    <i class="fas fa-users text-green-600"></i>
                    <span class="font-medium text-green-800">即将批量结营 ${students.length} 名学生</span>
                </div>
                <div class="flex flex-wrap gap-2">
                    ${students.map(s => `<span class="inline-flex items-center px-2 py-1 bg-white rounded text-xs text-gray-700 border border-green-200">${s.name}</span>`).join('')}
                </div>
            </div>
            <div class="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div class="flex items-center gap-2 text-sm text-blue-700">
                    <i class="fas fa-info-circle"></i>
                    <span>以上学生均已通过入营核验，可进行结营操作</span>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div class="form-group">
                    <label class="form-label">统一综合评价 <span class="required">*</span></label>
                    <select class="form-select" id="batch-co-eval">
                        <option value="优秀">优秀</option>
                        <option value="良好" selected>良好</option>
                        <option value="合格">合格</option>
                        <option value="不合格">不合格</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">统一证书发放</label>
                    <select class="form-select" id="batch-co-cert">
                        <option value="已发放" selected>已发放</option>
                        <option value="未发放">未发放</option>
                    </select>
                </div>
                <div class="form-group col-span-2">
                    <label class="form-label">统一结营评语</label>
                    <textarea class="form-input" id="batch-co-remark" rows="3" placeholder="请输入统一的结营评语（可选）"></textarea>
                </div>
            </div>
        </form>
    `;
    const footer = `<button class="btn btn-outline" id="batch-co-cancel">取消</button><button class="btn btn-success" id="batch-co-confirm"><i class="fas fa-check-double mr-1"></i>确认批量结营 (${students.length}人)</button>`;
    showModal('批量结营核验', body, footer, { maxWidth: '640px' });

    document.getElementById('batch-co-cancel').addEventListener('click', closeModal);
    document.getElementById('batch-co-confirm').addEventListener('click', () => {
        const now = getNowStr();
        const evaluation = document.getElementById('batch-co-eval').value;
        const certificate = document.getElementById('batch-co-cert').value;
        const remark = document.getElementById('batch-co-remark').value.trim();

        students.forEach(s => {
            s.checkStatus = '已结营';
            s.checkTime = now;
            s.operator = activity.leader;
            s.evaluation = evaluation;
            s.certificate = certificate;
            s.remark = remark;
        });
        selectedStudents.clear();
        showToast(`成功结营 ${students.length} 名学生`, 'success');
        closeModal();
        renderDetail();
    });
}

// 结营详情查看
function showCheckOutDetail(student, activity) {
    const body = `
        <div class="grid grid-cols-2 gap-4">
            <div class="form-group"><label class="form-label">学号</label><p class="text-gray-700">${student.id}</p></div>
            <div class="form-group"><label class="form-label">姓名</label><p class="text-gray-700">${student.name}</p></div>
            <div class="form-group"><label class="form-label">性别</label><p class="text-gray-700">${student.gender}</p></div>
            <div class="form-group"><label class="form-label">学校</label><p class="text-gray-700">${student.school}</p></div>
            <div class="form-group"><label class="form-label">年级</label><p class="text-gray-700">${student.grade}</p></div>
            <div class="form-group"><label class="form-label">联系电话</label><p class="text-gray-700">${student.phone}</p></div>
            <div class="form-group"><label class="form-label">入营核验</label><p>${getCheckinStatusTag(student.checkinStatus)}</p></div>
            <div class="form-group"><label class="form-label">所属活动</label><p class="text-gray-700">${activity.name}</p></div>
            <div class="form-group"><label class="form-label">带队人</label><p class="text-gray-700">${activity.leader}</p></div>
            <div class="form-group"><label class="form-label">结营时间</label><p class="text-gray-700">${student.checkTime}</p></div>
            <div class="form-group"><label class="form-label">核验人</label><p class="text-gray-700">${student.operator}</p></div>
            <div class="form-group"><label class="form-label">综合评价</label><p>${getEvalTag(student.evaluation)}</p></div>
            <div class="form-group"><label class="form-label">证书</label><p>${getCertTag(student.certificate)}</p></div>
            <div class="form-group"><label class="form-label">&nbsp;</label></div>
            <div class="form-group col-span-2"><label class="form-label">结营评语</label><p class="text-gray-700">${student.remark || '无'}</p></div>
        </div>
    `;
    showModal('结营核验详情 - ' + student.name, body, '', { maxWidth: '640px' });
}

function getNowStr() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
}
