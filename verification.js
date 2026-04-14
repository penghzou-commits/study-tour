// verification.js - 入营核验模块（以活动为维度）
import { showToast, showModal, closeModal, showConfirm, renderPagination, bindPaginationEvents } from './layout.js';

// 模拟活动维度的入营核验数据
// payStatus: 已付费 / 未付费 / 已退费 —— 只有"已付费"的学生才能进行入营核验
const activitiesForCheckIn = [
    {
        id: 'ACT001',
        name: '2026春季延安红色研学',
        project: '红色革命教育研学之旅',
        startDate: '2026-03-18',
        endDate: '2026-03-20',
        leader: '王建军',
        leaderPhone: '13800010001',
        location: '延安革命纪念馆',
        status: '进行中',
        students: [
            { id: 'STU001', name: '张明远', gender: '男', school: '北京市第一中学', grade: '初二', phone: '13800001001', payStatus: '已付费', checkStatus: '已核验', checkTime: '2026-03-18 08:32', operator: '王建军', temperature: '36.5', healthStatus: '健康', remark: '' },
            { id: 'STU002', name: '李思涵', gender: '女', school: '北京市实验中学', grade: '初一', phone: '13800001002', payStatus: '已付费', checkStatus: '已核验', checkTime: '2026-03-18 08:35', operator: '王建军', temperature: '36.3', healthStatus: '健康', remark: '' },
            { id: 'STU003', name: '王浩然', gender: '男', school: '清华附中', grade: '初三', phone: '13800001003', payStatus: '已付费', checkStatus: '已核验', checkTime: '2026-03-18 08:40', operator: '王建军', temperature: '36.7', healthStatus: '健康', remark: '' },
            { id: 'STU004', name: '赵雨萱', gender: '女', school: '北京市海淀小学', grade: '六年级', phone: '13800001004', payStatus: '已付费', checkStatus: '已核验', checkTime: '2026-03-18 08:45', operator: '王建军', temperature: '37.1', healthStatus: '轻微感冒', remark: '已服药，可参加' },
            { id: 'STU005', name: '刘子轩', gender: '男', school: '人大附中', grade: '初二', phone: '13800001005', payStatus: '已付费', checkStatus: '未核验', checkTime: '', operator: '', temperature: '', healthStatus: '', remark: '' },
            { id: 'STU006', name: '陈思琪', gender: '女', school: '北京四中', grade: '初一', phone: '13800001006', payStatus: '未付费', checkStatus: '未核验', checkTime: '', operator: '', temperature: '', healthStatus: '', remark: '' },
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
        status: '未开始',
        students: [
            { id: 'STU007', name: '杨博文', gender: '男', school: '北师大附中', grade: '初三', phone: '13800001007', payStatus: '未付费', checkStatus: '未核验', checkTime: '', operator: '', temperature: '', healthStatus: '', remark: '' },
            { id: 'STU008', name: '吴佳怡', gender: '女', school: '北京市第一中学', grade: '初二', phone: '13800001008', payStatus: '已付费', checkStatus: '未核验', checkTime: '', operator: '', temperature: '', healthStatus: '', remark: '' },
            { id: 'STU009', name: '黄梓涵', gender: '男', school: '北京市朝阳小学', grade: '六年级', phone: '13800001009', payStatus: '已付费', checkStatus: '未核验', checkTime: '', operator: '', temperature: '', healthStatus: '', remark: '' },
            { id: 'STU010', name: '周雅琪', gender: '女', school: '北京市实验中学', grade: '初一', phone: '13800001010', payStatus: '已退费', checkStatus: '未核验', checkTime: '', operator: '', temperature: '', healthStatus: '', remark: '' },
            { id: 'STU011', name: '孙宇航', gender: '男', school: '清华附中', grade: '初二', phone: '13800001011', payStatus: '未付费', checkStatus: '未核验', checkTime: '', operator: '', temperature: '', healthStatus: '', remark: '' },
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
            { id: 'STU012', name: '马晓彤', gender: '女', school: '人大附中', grade: '初三', phone: '13800001012', payStatus: '已付费', checkStatus: '未核验', checkTime: '', operator: '', temperature: '', healthStatus: '', remark: '' },
            { id: 'STU013', name: '林浩宇', gender: '男', school: '北京四中', grade: '初二', phone: '13800001013', payStatus: '已付费', checkStatus: '未核验', checkTime: '', operator: '', temperature: '', healthStatus: '', remark: '' },
            { id: 'STU014', name: '郑雨桐', gender: '女', school: '北京市实验中学', grade: '初一', phone: '13800001014', payStatus: '未付费', checkStatus: '未核验', checkTime: '', operator: '', temperature: '', healthStatus: '', remark: '' },
            { id: 'STU015', name: '何俊杰', gender: '男', school: '清华附中', grade: '初三', phone: '13800001015', payStatus: '已付费', checkStatus: '未核验', checkTime: '', operator: '', temperature: '', healthStatus: '', remark: '' },
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
            { id: 'STU016', name: '谢雨欣', gender: '女', school: '北京市海淀小学', grade: '六年级', phone: '13800001016', payStatus: '已付费', checkStatus: '已核验', checkTime: '2026-03-10 08:20', operator: '赵文静', temperature: '36.4', healthStatus: '健康', remark: '' },
            { id: 'STU017', name: '韩子墨', gender: '男', school: '北师大附中', grade: '初一', phone: '13800001017', payStatus: '已付费', checkStatus: '已核验', checkTime: '2026-03-10 08:25', operator: '赵文静', temperature: '36.6', healthStatus: '健康', remark: '' },
            { id: 'STU018', name: '冯诗雅', gender: '女', school: '人大附中', grade: '初二', phone: '13800001018', payStatus: '已付费', checkStatus: '已核验', checkTime: '2026-03-10 08:28', operator: '赵文静', temperature: '36.3', healthStatus: '健康', remark: '' },
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
            { id: 'STU019', name: '曹天翔', gender: '男', school: '北京市朝阳中学', grade: '初三', phone: '13800001019', payStatus: '已付费', checkStatus: '未核验', checkTime: '', operator: '', temperature: '', healthStatus: '', remark: '' },
            { id: 'STU020', name: '邓紫琳', gender: '女', school: '北京四中', grade: '初一', phone: '13800001020', payStatus: '已付费', checkStatus: '未核验', checkTime: '', operator: '', temperature: '', healthStatus: '', remark: '' },
            { id: 'STU021', name: '彭浩然', gender: '男', school: '清华附中', grade: '初二', phone: '13800001021', payStatus: '未付费', checkStatus: '未核验', checkTime: '', operator: '', temperature: '', healthStatus: '', remark: '' },
            { id: 'STU022', name: '罗雅文', gender: '女', school: '北京市实验中学', grade: '初一', phone: '13800001022', payStatus: '已付费', checkStatus: '未核验', checkTime: '', operator: '', temperature: '', healthStatus: '', remark: '' },
            { id: 'STU023', name: '蒋明轩', gender: '男', school: '北师大附中', grade: '初三', phone: '13800001023', payStatus: '已退费', checkStatus: '未核验', checkTime: '', operator: '', temperature: '', healthStatus: '', remark: '' },
            { id: 'STU024', name: '唐诗韵', gender: '女', school: '人大附中', grade: '初二', phone: '13800001024', payStatus: '已付费', checkStatus: '未核验', checkTime: '', operator: '', temperature: '', healthStatus: '', remark: '' },
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
let detailFilterPay = '';
let selectedStudents = new Set();

function getFilteredActivities() {
    return activitiesForCheckIn.filter(a => {
        const matchSearch = !listSearch || a.name.includes(listSearch) || a.id.includes(listSearch) || a.leader.includes(listSearch) || a.project.includes(listSearch);
        const matchStatus = !listFilterStatus || a.status === listFilterStatus;
        return matchSearch && matchStatus;
    });
}

function getActivityStats(activity) {
    const total = activity.students.length;
    const verified = activity.students.filter(s => s.checkStatus === '已核验').length;
    const pending = total - verified;
    const rate = total > 0 ? Math.round(verified / total * 100) : 0;
    const paidCount = activity.students.filter(s => s.payStatus === '已付费').length;
    const unpaidCount = activity.students.filter(s => s.payStatus === '未付费').length;
    const refundedCount = activity.students.filter(s => s.payStatus === '已退费').length;
    // 可核验人数 = 已付费且未核验
    const canVerifyCount = activity.students.filter(s => s.payStatus === '已付费' && s.checkStatus === '未核验').length;
    return { total, verified, pending, rate, paidCount, unpaidCount, refundedCount, canVerifyCount };
}

function getGlobalStats() {
    let totalStudents = 0, totalVerified = 0, totalPaid = 0, totalCanVerify = 0;
    activitiesForCheckIn.forEach(a => {
        totalStudents += a.students.length;
        totalVerified += a.students.filter(s => s.checkStatus === '已核验').length;
        totalPaid += a.students.filter(s => s.payStatus === '已付费').length;
        totalCanVerify += a.students.filter(s => s.payStatus === '已付费' && s.checkStatus === '未核验').length;
    });
    return {
        activityCount: activitiesForCheckIn.length,
        totalStudents,
        totalVerified,
        totalPending: totalStudents - totalVerified,
        totalPaid,
        totalCanVerify
    };
}

// 缴费状态标签
function getPayStatusTag(status) {
    if (status === '已付费') return '<span class="tag tag-green"><i class="fas fa-check-circle mr-1"></i>已付费</span>';
    if (status === '已退费') return '<span class="tag tag-red"><i class="fas fa-undo mr-1"></i>已退费</span>';
    return '<span class="tag tag-yellow"><i class="fas fa-clock mr-1"></i>未付费</span>';
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
            <h1 class="page-title">入营核验</h1>
            <p class="page-desc">按活动维度管理学生入营核验，只有已付费的学生才能进行核验</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="stat-card">
                <div class="stat-icon bg-blue-50 text-blue-500"><i class="fas fa-calendar-alt"></i></div>
                <div class="stat-info"><h3>${stats.activityCount}</h3><p>活动总数</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-green-50 text-green-500"><i class="fas fa-user-check"></i></div>
                <div class="stat-info"><h3>${stats.totalVerified}</h3><p>已核验人数</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-orange-50 text-orange-500"><i class="fas fa-clipboard-check"></i></div>
                <div class="stat-info"><h3>${stats.totalCanVerify}</h3><p>待核验(已付费)</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-purple-50 text-purple-500"><i class="fas fa-wallet"></i></div>
                <div class="stat-info"><h3>${stats.totalPaid}</h3><p>已付费学生</p></div>
            </div>
        </div>

        <div class="table-container" id="checkin-list-container">
            <div class="table-toolbar">
                <div class="flex items-center gap-3 flex-wrap">
                    <div class="table-search">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="搜索活动名称/编号/带队人/项目..." id="checkin-list-search" value="${listSearch}">
                    </div>
                    <select class="form-select" style="width:auto;min-width:120px;padding:8px 32px 8px 12px;" id="checkin-list-filter">
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
                            <th>缴费情况</th>
                            <th>核验进度</th>
                            <th>活动状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${pageData.length === 0 ? `<tr><td colspan="9"><div class="empty-state"><i class="fas fa-inbox"></i><p>暂无入营核验活动</p></div></td></tr>` :
                        pageData.map(a => {
                            const s = getActivityStats(a);
                            return `
                            <tr>
                                <td><span class="font-mono text-xs text-gray-500">${a.id}</span></td>
                                <td><span class="font-medium text-gray-900">${a.name}</span></td>
                                <td><span class="text-sm text-gray-600">${a.project}</span></td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <div class="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">${a.leader.charAt(0)}</div>
                                        <div>
                                            <div class="text-sm font-medium">${a.leader}</div>
                                            <div class="text-xs text-gray-400">${a.leaderPhone}</div>
                                        </div>
                                    </div>
                                </td>
                                <td><span class="text-sm text-gray-500">${a.startDate} ~ ${a.endDate}</span></td>
                                <td>
                                    <div class="flex flex-col gap-0.5">
                                        <span class="text-xs text-green-600"><i class="fas fa-check-circle mr-1"></i>已付费 ${s.paidCount}人</span>
                                        ${s.unpaidCount > 0 ? `<span class="text-xs text-yellow-600"><i class="fas fa-clock mr-1"></i>未付费 ${s.unpaidCount}人</span>` : ''}
                                        ${s.refundedCount > 0 ? `<span class="text-xs text-red-500"><i class="fas fa-undo mr-1"></i>已退费 ${s.refundedCount}人</span>` : ''}
                                    </div>
                                </td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <div class="w-24 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                            <div class="h-full rounded-full transition-all ${s.rate >= 100 ? 'bg-green-500' : s.rate >= 50 ? 'bg-blue-500' : 'bg-orange-400'}" style="width:${s.rate}%"></div>
                                        </div>
                                        <span class="text-xs font-medium ${s.rate >= 100 ? 'text-green-600' : 'text-gray-500'}">${s.verified}/${s.total}</span>
                                    </div>
                                </td>
                                <td>${getActivityStatusTag(a.status)}</td>
                                <td>
                                    <button class="btn btn-sm btn-primary btn-enter-detail" data-id="${a.id}">
                                        <i class="fas fa-arrow-right mr-1"></i> 进入核验
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
    const activity = activitiesForCheckIn.find(a => a.id === currentActivityId);
    if (!activity) { currentView = 'list'; renderList(); return; }

    const stats = getActivityStats(activity);
    const filteredStudents = activity.students.filter(s => {
        const matchSearch = !detailSearch || s.name.includes(detailSearch) || s.id.includes(detailSearch) || s.school.includes(detailSearch);
        const matchStatus = !detailFilterStatus || s.checkStatus === detailFilterStatus;
        const matchPay = !detailFilterPay || s.payStatus === detailFilterPay;
        return matchSearch && matchStatus && matchPay;
    });
    const total = filteredStudents.length;
    const start = (detailPage - 1) * detailPageSize;
    const pageData = filteredStudents.slice(start, start + detailPageSize);
    // 可核验的学生：已付费且未核验
    const canVerifyStudents = activity.students.filter(s => s.payStatus === '已付费' && s.checkStatus === '未核验');

    container.innerHTML = `
        <div class="page-header">
            <div class="flex items-center gap-3 mb-2">
                <button class="btn btn-outline btn-sm" id="btn-back-list"><i class="fas fa-arrow-left mr-1"></i> 返回列表</button>
                <span class="text-gray-300">|</span>
                <span class="text-sm text-gray-500">入营核验</span>
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
                <div class="stat-icon bg-green-50 text-green-500"><i class="fas fa-wallet"></i></div>
                <div class="stat-info"><h3>${stats.paidCount}</h3><p>已付费</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-blue-50 text-blue-500"><i class="fas fa-user-check"></i></div>
                <div class="stat-info"><h3>${stats.verified}</h3><p>已核验</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-orange-50 text-orange-500"><i class="fas fa-clipboard-check"></i></div>
                <div class="stat-info"><h3>${stats.canVerifyCount}</h3><p>待核验(已付费)</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon ${stats.rate >= 100 ? 'bg-green-50 text-green-500' : 'bg-blue-50 text-blue-500'}"><i class="fas fa-chart-pie"></i></div>
                <div class="stat-info"><h3>${stats.rate}%</h3><p>核验率</p></div>
            </div>
        </div>

        <!-- 核验进度条 -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
            <div class="flex items-center justify-between mb-3">
                <span class="text-sm font-medium text-gray-700">核验进度</span>
                <span class="text-sm font-bold ${stats.rate >= 100 ? 'text-green-600' : 'text-blue-600'}">${stats.verified} / ${stats.total} 人已核验</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                <div class="h-full rounded-full transition-all duration-500 ${stats.rate >= 100 ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gradient-to-r from-blue-400 to-blue-500'}" style="width:${stats.rate}%"></div>
            </div>
            <div class="flex justify-between mt-2 text-xs text-gray-400">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
            </div>
            ${stats.canVerifyCount === 0 && stats.pending > 0 ? `<div class="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200 text-sm text-yellow-700"><i class="fas fa-exclamation-triangle mr-1"></i> 剩余 ${stats.pending - stats.verified > 0 ? stats.pending : 0} 名未核验学生中无已付费学生，请先完成缴费后再进行核验</div>` : ''}
        </div>

        <!-- 学生核验列表 -->
        <div class="table-container" id="checkin-detail-container">
            <div class="table-toolbar">
                <div class="flex items-center gap-3 flex-wrap">
                    <div class="table-search">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="搜索姓名/学号/学校..." id="checkin-detail-search" value="${detailSearch}">
                    </div>
                    <select class="form-select" style="width:auto;min-width:120px;padding:8px 32px 8px 12px;" id="checkin-detail-filter">
                        <option value="">全部核验状态</option>
                        <option value="已核验" ${detailFilterStatus === '已核验' ? 'selected' : ''}>已核验</option>
                        <option value="未核验" ${detailFilterStatus === '未核验' ? 'selected' : ''}>未核验</option>
                    </select>
                    <select class="form-select" style="width:auto;min-width:120px;padding:8px 32px 8px 12px;" id="checkin-detail-pay-filter">
                        <option value="">全部缴费状态</option>
                        <option value="已付费" ${detailFilterPay === '已付费' ? 'selected' : ''}>已付费</option>
                        <option value="未付费" ${detailFilterPay === '未付费' ? 'selected' : ''}>未付费</option>
                        <option value="已退费" ${detailFilterPay === '已退费' ? 'selected' : ''}>已退费</option>
                    </select>
                </div>
                <div class="table-actions">
                    <button class="btn btn-outline btn-sm" id="btn-select-all-pending" ${canVerifyStudents.length === 0 ? 'disabled' : ''}>
                        <i class="fas fa-check-square mr-1"></i> 全选可核验
                    </button>
                    <button class="btn btn-primary" id="btn-batch-checkin" ${canVerifyStudents.length === 0 ? 'disabled' : ''}>
                        <i class="fas fa-check-double mr-1"></i> 批量核验 <span id="batch-count" class="ml-1 bg-white bg-opacity-20 rounded px-1.5 py-0.5 text-xs">${selectedStudents.size > 0 ? selectedStudents.size : ''}</span>
                    </button>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th style="width:40px"><input type="checkbox" id="check-all" class="w-4 h-4 rounded"></th>
                            <th>学号</th>
                            <th>姓名</th>
                            <th>性别</th>
                            <th>学校</th>
                            <th>年级</th>
                            <th>缴费状态</th>
                            <th>核验时间</th>
                            <th>体温(℃)</th>
                            <th>健康状态</th>
                            <th>核验状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${pageData.length === 0 ? `<tr><td colspan="12"><div class="empty-state"><i class="fas fa-inbox"></i><p>暂无学生数据</p></div></td></tr>` :
                        pageData.map(s => {
                            const canCheck = s.payStatus === '已付费' && s.checkStatus === '未核验';
                            const isNotPaid = s.payStatus !== '已付费';
                            return `
                            <tr class="${s.checkStatus === '已核验' ? 'bg-green-50 bg-opacity-30' : isNotPaid ? 'bg-gray-50 bg-opacity-50' : ''}">
                                <td><input type="checkbox" class="student-check w-4 h-4 rounded" data-id="${s.id}" ${selectedStudents.has(s.id) ? 'checked' : ''} ${!canCheck ? 'disabled' : ''}></td>
                                <td><span class="font-mono text-xs text-gray-500">${s.id}</span></td>
                                <td><span class="font-medium text-gray-900">${s.name}</span></td>
                                <td>${s.gender === '男' ? '<span class="tag tag-blue">男</span>' : '<span class="tag tag-red">女</span>'}</td>
                                <td><span class="text-sm">${s.school}</span></td>
                                <td><span class="text-sm text-gray-600">${s.grade}</span></td>
                                <td>${getPayStatusTag(s.payStatus)}</td>
                                <td><span class="text-sm text-gray-500">${s.checkTime || '<span class="text-gray-300">-</span>'}</span></td>
                                <td><span class="text-sm ${s.temperature && parseFloat(s.temperature) > 37 ? 'text-red-500 font-semibold' : 'text-gray-600'}">${s.temperature || '<span class="text-gray-300">-</span>'}</span></td>
                                <td>${s.healthStatus ? getHealthTag(s.healthStatus) : '<span class="text-gray-300">-</span>'}</td>
                                <td>${getCheckStatusTag(s.checkStatus)}</td>
                                <td>
                                    <div class="flex gap-1">
                                        ${canCheck ? 
                                            `<button class="btn btn-sm btn-success btn-do-checkin" data-id="${s.id}" title="核验入营"><i class="fas fa-check"></i> 核验</button>` : 
                                            s.checkStatus === '已核验' ?
                                            `<button class="btn btn-sm btn-outline btn-view-checkin" data-id="${s.id}" title="查看详情"><i class="fas fa-eye"></i></button>` :
                                            `<button class="btn btn-sm btn-outline" disabled title="${isNotPaid ? '未付费，不可核验' : ''}"><i class="fas fa-lock"></i></button>`
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
    const map = { '未开始': 'tag-yellow', '进行中': 'tag-green', '已结束': 'tag-gray' };
    return `<span class="tag ${map[status] || 'tag-gray'}">${status}</span>`;
}

function getCheckStatusTag(status) {
    return status === '已核验' ? '<span class="tag tag-green"><i class="fas fa-check-circle mr-1"></i>已核验</span>' : '<span class="tag tag-yellow"><i class="fas fa-clock mr-1"></i>未核验</span>';
}

function getHealthTag(health) {
    if (health === '健康') return '<span class="tag tag-green">健康</span>';
    if (health === '发热') return '<span class="tag tag-red">发热</span>';
    return `<span class="tag tag-yellow">${health}</span>`;
}

function bindListEvents() {
    const container = document.getElementById('checkin-list-container');
    if (!container) return;

    document.getElementById('checkin-list-search').addEventListener('input', (e) => {
        listSearch = e.target.value.trim();
        listPage = 1;
        renderList();
    });

    document.getElementById('checkin-list-filter').addEventListener('change', (e) => {
        listFilterStatus = e.target.value;
        listPage = 1;
        renderList();
    });

    container.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-enter-detail');
        if (btn) {
            currentActivityId = btn.dataset.id;
            currentView = 'detail';
            detailPage = 1;
            detailSearch = '';
            detailFilterStatus = '';
            detailFilterPay = '';
            selectedStudents.clear();
            render();
        }
    });

    bindPaginationEvents(container, (page) => { listPage = page; renderList(); });
}

function bindDetailEvents(activity) {
    const container = document.getElementById('checkin-detail-container');
    if (!container) return;

    // 返回列表
    document.getElementById('btn-back-list').addEventListener('click', () => {
        currentView = 'list';
        currentActivityId = null;
        selectedStudents.clear();
        render();
    });

    // 搜索
    document.getElementById('checkin-detail-search').addEventListener('input', (e) => {
        detailSearch = e.target.value.trim();
        detailPage = 1;
        renderDetail();
    });

    // 核验状态筛选
    document.getElementById('checkin-detail-filter').addEventListener('change', (e) => {
        detailFilterStatus = e.target.value;
        detailPage = 1;
        renderDetail();
    });

    // 缴费状态筛选
    document.getElementById('checkin-detail-pay-filter').addEventListener('change', (e) => {
        detailFilterPay = e.target.value;
        detailPage = 1;
        renderDetail();
    });

    // 全选/取消全选（只选可核验的：已付费且未核验）
    const checkAll = document.getElementById('check-all');
    if (checkAll) {
        checkAll.addEventListener('change', (e) => {
            const checkboxes = container.querySelectorAll('.student-check:not(:disabled)');
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
        if (e.target.classList.contains('student-check')) {
            if (e.target.checked) {
                selectedStudents.add(e.target.dataset.id);
            } else {
                selectedStudents.delete(e.target.dataset.id);
            }
            updateBatchCount();
        }
    });

    // 全选可核验（已付费且未核验）
    document.getElementById('btn-select-all-pending').addEventListener('click', () => {
        selectedStudents.clear();
        activity.students.forEach(s => {
            if (s.payStatus === '已付费' && s.checkStatus === '未核验') selectedStudents.add(s.id);
        });
        renderDetail();
    });

    // 批量核验 - 只核验已付费且未核验的
    document.getElementById('btn-batch-checkin').addEventListener('click', () => {
        const toVerify = activity.students.filter(s => selectedStudents.has(s.id) && s.payStatus === '已付费' && s.checkStatus === '未核验');
        if (toVerify.length === 0) {
            showToast('请先勾选已付费且待核验的学生', 'warning');
            return;
        }
        showConfirm(`确定要批量核验选中的 ${toVerify.length} 名学生入营吗？`, () => {
            const now = getNowStr();
            toVerify.forEach(s => {
                s.checkStatus = '已核验';
                s.checkTime = now;
                s.operator = activity.leader;
                s.temperature = (36 + Math.random() * 0.8).toFixed(1);
                s.healthStatus = '健康';
            });
            selectedStudents.clear();
            showToast(`成功核验 ${toVerify.length} 名学生入营`, 'success');
            renderDetail();
        });
    });

    // 单个核验 / 查看
    container.addEventListener('click', (e) => {
        const doBtn = e.target.closest('.btn-do-checkin');
        const viewBtn = e.target.closest('.btn-view-checkin');

        if (doBtn) {
            const student = activity.students.find(s => s.id === doBtn.dataset.id);
            if (student) {
                // 二次校验：只有已付费才能核验
                if (student.payStatus !== '已付费') {
                    showToast('该学生未付费，无法进行入营核验', 'error');
                    return;
                }
                showCheckInForm(student, activity);
            }
        }
        if (viewBtn) {
            const student = activity.students.find(s => s.id === viewBtn.dataset.id);
            if (student) showCheckInDetail(student, activity);
        }
    });

    bindPaginationEvents(container, (page) => { detailPage = page; renderDetail(); });
}

function updateBatchCount() {
    const countEl = document.getElementById('batch-count');
    if (countEl) {
        countEl.textContent = selectedStudents.size > 0 ? selectedStudents.size : '';
    }
}

function showCheckInForm(student, activity) {
    const body = `
        <form id="ci-form">
            <div class="bg-blue-50 rounded-lg p-4 mb-4">
                <div class="grid grid-cols-2 gap-3 text-sm">
                    <div><span class="text-gray-500">学号：</span><span class="font-medium">${student.id}</span></div>
                    <div><span class="text-gray-500">姓名：</span><span class="font-medium">${student.name}</span></div>
                    <div><span class="text-gray-500">学校：</span><span class="font-medium">${student.school}</span></div>
                    <div><span class="text-gray-500">年级：</span><span class="font-medium">${student.grade}</span></div>
                    <div><span class="text-gray-500">活动：</span><span class="font-medium">${activity.name}</span></div>
                    <div><span class="text-gray-500">带队人：</span><span class="font-medium">${activity.leader}</span></div>
                </div>
            </div>
            <div class="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div class="flex items-center gap-2 text-sm text-green-700">
                    <i class="fas fa-check-circle"></i>
                    <span>缴费状态：<strong>已付费</strong>，可进行入营核验</span>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div class="form-group">
                    <label class="form-label">体温(℃) <span class="required">*</span></label>
                    <input type="number" class="form-input" id="ci-temp" value="36.5" step="0.1" min="35" max="42" placeholder="请输入体温">
                </div>
                <div class="form-group">
                    <label class="form-label">健康状态 <span class="required">*</span></label>
                    <select class="form-select" id="ci-health">
                        <option value="健康">健康</option>
                        <option value="轻微感冒">轻微感冒</option>
                        <option value="发热">发热</option>
                        <option value="其他">其他</option>
                    </select>
                </div>
                <div class="form-group col-span-2">
                    <label class="form-label">备注</label>
                    <textarea class="form-input" id="ci-remark" rows="3" placeholder="请输入备注信息（如特殊情况说明）"></textarea>
                </div>
            </div>
        </form>
    `;
    const footer = `<button class="btn btn-outline" id="ci-cancel">取消</button><button class="btn btn-success" id="ci-confirm"><i class="fas fa-check mr-1"></i>确认入营核验</button>`;
    showModal('入营核验 - ' + student.name, body, footer);

    document.getElementById('ci-cancel').addEventListener('click', closeModal);
    document.getElementById('ci-confirm').addEventListener('click', () => {
        const temp = document.getElementById('ci-temp').value;
        if (!temp) { showToast('请填写体温', 'warning'); return; }

        student.checkStatus = '已核验';
        student.checkTime = getNowStr();
        student.operator = activity.leader;
        student.temperature = temp;
        student.healthStatus = document.getElementById('ci-health').value;
        student.remark = document.getElementById('ci-remark').value.trim();

        showToast(`${student.name} 入营核验成功`, 'success');
        closeModal();
        renderDetail();
    });
}

function showCheckInDetail(student, activity) {
    const body = `
        <div class="grid grid-cols-2 gap-4">
            <div class="form-group"><label class="form-label">学号</label><p class="text-gray-700">${student.id}</p></div>
            <div class="form-group"><label class="form-label">姓名</label><p class="text-gray-700">${student.name}</p></div>
            <div class="form-group"><label class="form-label">性别</label><p class="text-gray-700">${student.gender}</p></div>
            <div class="form-group"><label class="form-label">学校</label><p class="text-gray-700">${student.school}</p></div>
            <div class="form-group"><label class="form-label">年级</label><p class="text-gray-700">${student.grade}</p></div>
            <div class="form-group"><label class="form-label">联系电话</label><p class="text-gray-700">${student.phone}</p></div>
            <div class="form-group"><label class="form-label">缴费状态</label><p>${getPayStatusTag(student.payStatus)}</p></div>
            <div class="form-group"><label class="form-label">所属活动</label><p class="text-gray-700">${activity.name}</p></div>
            <div class="form-group"><label class="form-label">带队人</label><p class="text-gray-700">${activity.leader}</p></div>
            <div class="form-group"><label class="form-label">核验时间</label><p class="text-gray-700">${student.checkTime}</p></div>
            <div class="form-group"><label class="form-label">核验人</label><p class="text-gray-700">${student.operator}</p></div>
            <div class="form-group"><label class="form-label">体温</label><p class="text-gray-700 ${parseFloat(student.temperature) > 37 ? 'text-red-500 font-semibold' : ''}">${student.temperature}℃</p></div>
            <div class="form-group"><label class="form-label">健康状态</label><p>${getHealthTag(student.healthStatus)}</p></div>
            <div class="form-group"><label class="form-label">&nbsp;</label></div>
            <div class="form-group col-span-2"><label class="form-label">备注</label><p class="text-gray-700">${student.remark || '无'}</p></div>
        </div>
    `;
    showModal('入营核验详情 - ' + student.name, body, '', { maxWidth: '640px' });
}

function getNowStr() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
}
