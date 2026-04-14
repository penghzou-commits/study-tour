// finance.js - 费用管理模块（学生研学报名费用）
import { showToast, showModal, closeModal, showConfirm, renderPagination, bindPaginationEvents } from './layout.js';

// 模拟学生研学报名费用数据
let finances = [
    { id: 'FEE001', studentName: '张明远', studentId: 'STU001', school: '北京市第一中学', grade: '初二', activity: '2026春季延安红色研学报名', project: '红色革命教育研学之旅', feeType: '报名费', amount: 2800, discount: 0, actualAmount: 2800, payMethod: '微信支付', payDate: '2026-02-22', status: '已缴费', refundAmount: 0, invoiceNo: 'INV20260222001', remark: '' },
    { id: 'FEE002', studentName: '李思涵', studentId: 'STU002', school: '北京市实验中学', grade: '初一', activity: '海洋科学探索营报名', project: '海洋科学探索营', feeType: '报名费', amount: 3500, discount: 200, actualAmount: 3300, payMethod: '支付宝', payDate: '2026-04-08', status: '已缴费', refundAmount: 0, invoiceNo: 'INV20260408002', remark: '早鸟优惠减200' },
    { id: 'FEE003', studentName: '王浩然', studentId: 'STU003', school: '清华附中', grade: '初三', activity: '科技创新营第一期报名', project: '科技创新探索营', feeType: '报名费', amount: 3200, discount: 0, actualAmount: 3200, payMethod: '银行转账', payDate: '2026-03-20', status: '已缴费', refundAmount: 0, invoiceNo: 'INV20260320003', remark: '' },
    { id: 'FEE004', studentName: '赵雨萱', studentId: 'STU004', school: '北京市海淀小学', grade: '六年级', activity: '传统文化体验营春季班', project: '传统文化体验营', feeType: '报名费', amount: 2500, discount: 0, actualAmount: 2500, payMethod: '微信支付', payDate: '2026-03-12', status: '已缴费', refundAmount: 0, invoiceNo: 'INV20260312004', remark: '' },
    { id: 'FEE005', studentName: '刘子轩', studentId: 'STU005', school: '人大附中', grade: '初二', activity: '暑期雨林探秘营报名', project: '自然生态探秘之旅', feeType: '报名费', amount: 4200, discount: 300, actualAmount: 3900, payMethod: '支付宝', payDate: '2026-05-10', status: '已缴费', refundAmount: 0, invoiceNo: 'INV20260510005', remark: '团报优惠减300' },
    { id: 'FEE006', studentName: '陈思琪', studentId: 'STU006', school: '北京四中', grade: '初一', activity: '传统文化体验营春季班', project: '传统文化体验营', feeType: '报名费', amount: 2500, discount: 0, actualAmount: 2500, payMethod: '银行转账', payDate: '2026-03-14', status: '已缴费', refundAmount: 0, invoiceNo: 'INV20260314006', remark: '' },
    { id: 'FEE007', studentName: '杨博文', studentId: 'STU007', school: '北师大附中', grade: '初三', activity: '军事素质拓展营报名', project: '军事素质拓展营', feeType: '报名费', amount: 3800, discount: 0, actualAmount: 3800, payMethod: '微信支付', payDate: '2026-04-18', status: '待缴费', refundAmount: 0, invoiceNo: '', remark: '已提交报名，等待缴费' },
    { id: 'FEE008', studentName: '吴佳怡', studentId: 'STU008', school: '北京市第一中学', grade: '初二', activity: '2026春季延安红色研学报名', project: '红色革命教育研学之旅', feeType: '报名费', amount: 2800, discount: 0, actualAmount: 2800, payMethod: '微信支付', payDate: '2026-02-25', status: '已退费', refundAmount: 2800, invoiceNo: 'INV20260225008', remark: '因病休学，全额退费' },
    { id: 'FEE009', studentName: '黄梓涵', studentId: 'STU009', school: '北京市朝阳小学', grade: '六年级', activity: '暑期雨林探秘营报名', project: '自然生态探秘之旅', feeType: '报名费', amount: 4200, discount: 500, actualAmount: 3700, payMethod: '支付宝', payDate: '2026-05-12', status: '已缴费', refundAmount: 0, invoiceNo: 'INV20260512009', remark: '贫困生优惠减500' },
    { id: 'FEE010', studentName: '周雅琪', studentId: 'STU010', school: '北京市实验中学', grade: '初一', activity: '海洋科学探索营报名', project: '海洋科学探索营', feeType: '报名费', amount: 3500, discount: 0, actualAmount: 3500, payMethod: '银行转账', payDate: '2026-04-10', status: '已缴费', refundAmount: 0, invoiceNo: 'INV20260410010', remark: '' },
    { id: 'FEE011', studentName: '孙宇航', studentId: 'STU011', school: '清华附中', grade: '初二', activity: '科技创新营第二期报名', project: '科技创新探索营', feeType: '报名费', amount: 3200, discount: 0, actualAmount: 3200, payMethod: '微信支付', payDate: '2026-05-15', status: '待缴费', refundAmount: 0, invoiceNo: '', remark: '已提交报名表' },
    { id: 'FEE012', studentName: '马晓彤', studentId: 'STU012', school: '人大附中', grade: '初三', activity: '航天科普营暑期报名', project: '航天科普研学营', feeType: '报名费', amount: 3600, discount: 0, actualAmount: 3600, payMethod: '支付宝', payDate: '2026-06-05', status: '待缴费', refundAmount: 0, invoiceNo: '', remark: '' },
    { id: 'FEE013', studentName: '张明远', studentId: 'STU001', school: '北京市第一中学', grade: '初二', activity: '2026春季延安红色研学报名', project: '红色革命教育研学之旅', feeType: '材料费', amount: 350, discount: 0, actualAmount: 350, payMethod: '微信支付', payDate: '2026-03-02', status: '已缴费', refundAmount: 0, invoiceNo: 'INV20260302013', remark: '研学手册+实验材料' },
    { id: 'FEE014', studentName: '王浩然', studentId: 'STU003', school: '清华附中', grade: '初三', activity: '科技创新营第一期报名', project: '科技创新探索营', feeType: '材料费', amount: 500, discount: 0, actualAmount: 500, payMethod: '微信支付', payDate: '2026-03-25', status: '已缴费', refundAmount: 0, invoiceNo: 'INV20260325014', remark: '编程套件+实验器材' },
    { id: 'FEE015', studentName: '李思涵', studentId: 'STU002', school: '北京市实验中学', grade: '初一', activity: '海洋科学探索营报名', project: '海洋科学探索营', feeType: '保险费', amount: 120, discount: 0, actualAmount: 120, payMethod: '微信支付', payDate: '2026-04-09', status: '已缴费', refundAmount: 0, invoiceNo: 'INV20260409015', remark: '研学意外险' },
    { id: 'FEE016', studentName: '赵雨萱', studentId: 'STU004', school: '北京市海淀小学', grade: '六年级', activity: '传统文化体验营春季班', project: '传统文化体验营', feeType: '交通费', amount: 280, discount: 0, actualAmount: 280, payMethod: '支付宝', payDate: '2026-03-13', status: '已缴费', refundAmount: 0, invoiceNo: 'INV20260313016', remark: '往返大巴费用' },
    { id: 'FEE017', studentName: '刘子轩', studentId: 'STU005', school: '人大附中', grade: '初二', activity: '暑期雨林探秘营报名', project: '自然生态探秘之旅', feeType: '住宿费', amount: 600, discount: 0, actualAmount: 600, payMethod: '支付宝', payDate: '2026-05-11', status: '已缴费', refundAmount: 0, invoiceNo: 'INV20260511017', remark: '3晚住宿' },
    { id: 'FEE018', studentName: '陈思琪', studentId: 'STU006', school: '北京四中', grade: '初一', activity: '传统文化体验营春季班', project: '传统文化体验营', feeType: '餐饮费', amount: 200, discount: 0, actualAmount: 200, payMethod: '微信支付', payDate: '2026-03-15', status: '已缴费', refundAmount: 0, invoiceNo: 'INV20260315018', remark: '两天午餐' },
];

let currentPage = 1;
const pageSize = 8;
let searchKeyword = '';
let filterFeeType = '';
let filterStatus = '';
let filterActivity = '';

// 费用类型选项
const feeTypeOptions = ['报名费', '材料费', '交通费', '餐饮费', '住宿费', '保险费', '服装费', '其他'];
// 支付方式选项
const payMethodOptions = ['微信支付', '支付宝', '银行转账', '现金', '对公转账'];
// 状态选项
const statusOptions = ['已缴费', '待缴费', '已退费', '缴费中'];

// 获取所有不重复的活动名称
function getActivityOptions() {
    return [...new Set(finances.map(f => f.activity))];
}

function getFilteredData() {
    return finances.filter(f => {
        const matchSearch = !searchKeyword ||
            f.studentName.includes(searchKeyword) ||
            f.studentId.includes(searchKeyword) ||
            f.school.includes(searchKeyword) ||
            f.id.includes(searchKeyword) ||
            f.activity.includes(searchKeyword) ||
            f.project.includes(searchKeyword);
        const matchFeeType = !filterFeeType || f.feeType === filterFeeType;
        const matchStatus = !filterStatus || f.status === filterStatus;
        const matchActivity = !filterActivity || f.activity === filterActivity;
        return matchSearch && matchFeeType && matchStatus && matchActivity;
    });
}

export function render() {
    const container = document.getElementById('main-content');
    const filtered = getFilteredData();
    const total = filtered.length;
    const start = (currentPage - 1) * pageSize;
    const pageData = filtered.slice(start, start + pageSize);

    // 统计数据
    const totalActual = finances.filter(f => f.status === '已缴费').reduce((s, f) => s + f.actualAmount, 0);
    const totalPending = finances.filter(f => f.status === '待缴费').reduce((s, f) => s + f.actualAmount, 0);
    const totalRefund = finances.filter(f => f.status === '已退费').reduce((s, f) => s + f.refundAmount, 0);
    const paidCount = finances.filter(f => f.status === '已缴费').length;
    const pendingCount = finances.filter(f => f.status === '待缴费').length;
    const refundCount = finances.filter(f => f.status === '已退费').length;
    const totalDiscount = finances.reduce((s, f) => s + f.discount, 0);

    const activityOptions = getActivityOptions();

    container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">费用管理</h1>
            <p class="page-desc">管理学生参与研学报名活动的缴费记录</p>
        </div>

        <!-- 统计卡片 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="stat-card">
                <div class="stat-icon bg-green-50 text-green-500"><i class="fas fa-check-circle"></i></div>
                <div class="stat-info">
                    <h3 class="text-green-600">¥${totalActual.toLocaleString()}</h3>
                    <p>已收费用 <span class="text-xs text-gray-400">(${paidCount}笔)</span></p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-yellow-50 text-yellow-500"><i class="fas fa-hourglass-half"></i></div>
                <div class="stat-info">
                    <h3 class="text-yellow-600">¥${totalPending.toLocaleString()}</h3>
                    <p>待收费用 <span class="text-xs text-gray-400">(${pendingCount}笔)</span></p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-red-50 text-red-500"><i class="fas fa-undo-alt"></i></div>
                <div class="stat-info">
                    <h3 class="text-red-500">¥${totalRefund.toLocaleString()}</h3>
                    <p>已退费用 <span class="text-xs text-gray-400">(${refundCount}笔)</span></p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-purple-50 text-purple-500"><i class="fas fa-tags"></i></div>
                <div class="stat-info">
                    <h3 class="text-purple-600">¥${totalDiscount.toLocaleString()}</h3>
                    <p>优惠总额</p>
                </div>
            </div>
        </div>

        <!-- 费用类型分布 -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            ${renderFeeTypeSummary()}
        </div>

        <!-- 费用表格 -->
        <div class="table-container" id="finance-table-container">
            <div class="table-toolbar">
                <div class="flex items-center gap-3 flex-wrap">
                    <div class="table-search">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="搜索学生/学号/学校/活动..." id="finance-search" value="${searchKeyword}">
                    </div>
                    <select class="form-select" style="width:auto;min-width:120px;padding:8px 32px 8px 12px;" id="finance-filter-feetype">
                        <option value="">全部类型</option>
                        ${feeTypeOptions.map(t => `<option value="${t}" ${filterFeeType === t ? 'selected' : ''}>${t}</option>`).join('')}
                    </select>
                    <select class="form-select" style="width:auto;min-width:120px;padding:8px 32px 8px 12px;" id="finance-filter-status">
                        <option value="">全部状态</option>
                        ${statusOptions.map(s => `<option value="${s}" ${filterStatus === s ? 'selected' : ''}>${s}</option>`).join('')}
                    </select>
                    <select class="form-select" style="width:auto;min-width:160px;padding:8px 32px 8px 12px;" id="finance-filter-activity">
                        <option value="">全部活动</option>
                        ${activityOptions.map(a => `<option value="${a}" ${filterActivity === a ? 'selected' : ''}>${a}</option>`).join('')}
                    </select>
                </div>
                <div class="table-actions">
                    <button class="btn btn-primary" id="btn-add-finance"><i class="fas fa-plus"></i> 新增缴费</button>
                    <button class="btn btn-outline" id="btn-export-finance"><i class="fas fa-file-export"></i> 导出</button>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>缴费编号</th>
                            <th>学生信息</th>
                            <th>报名活动</th>
                            <th>费用类型</th>
                            <th>应缴金额</th>
                            <th>优惠</th>
                            <th>实缴金额</th>
                            <th>缴费方式</th>
                            <th>缴费日期</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${pageData.length === 0 ? `<tr><td colspan="11"><div class="empty-state"><i class="fas fa-inbox"></i><p>暂无缴费记录</p></div></td></tr>` :
                        pageData.map(f => `
                            <tr>
                                <td><span class="font-mono text-xs text-gray-500">${f.id}</span></td>
                                <td>
                                    <div class="flex flex-col">
                                        <span class="font-medium text-gray-900">${f.studentName}</span>
                                        <span class="text-xs text-gray-400">${f.school} · ${f.grade}</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="flex flex-col">
                                        <span class="text-sm text-gray-700" style="max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${f.activity}">${f.activity}</span>
                                        <span class="text-xs text-gray-400">${f.project}</span>
                                    </div>
                                </td>
                                <td>${getFeeTypeTag(f.feeType)}</td>
                                <td><span class="text-sm text-gray-600">¥${f.amount.toLocaleString()}</span></td>
                                <td>${f.discount > 0 ? `<span class="text-sm text-orange-500">-¥${f.discount.toLocaleString()}</span>` : '<span class="text-xs text-gray-300">-</span>'}</td>
                                <td><span class="font-semibold text-gray-900">¥${f.actualAmount.toLocaleString()}</span></td>
                                <td><span class="text-sm text-gray-600">${getPayMethodIcon(f.payMethod)} ${f.payMethod}</span></td>
                                <td><span class="text-sm text-gray-500">${f.payDate}</span></td>
                                <td>${getFinanceStatusTag(f.status)}</td>
                                <td>
                                    <div class="flex gap-1">
                                        <button class="btn btn-sm btn-outline btn-view-finance" data-id="${f.id}" title="查看"><i class="fas fa-eye"></i></button>
                                        <button class="btn btn-sm btn-outline btn-edit-finance" data-id="${f.id}" title="编辑"><i class="fas fa-edit"></i></button>
                                        ${f.status === '已缴费' ? `<button class="btn btn-sm btn-outline btn-refund-finance" data-id="${f.id}" title="退费" style="color:#f59e0b;border-color:#fcd34d;"><i class="fas fa-undo"></i></button>` : ''}
                                        <button class="btn btn-sm btn-outline btn-del-finance" data-id="${f.id}" title="删除" style="color:#ef4444;border-color:#fca5a5;"><i class="fas fa-trash"></i></button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            ${renderPagination(currentPage, total, pageSize)}
        </div>
    `;
    bindEvents();
}

// 费用类型分布卡片
function renderFeeTypeSummary() {
    const typeMap = {};
    finances.forEach(f => {
        if (!typeMap[f.feeType]) typeMap[f.feeType] = { count: 0, total: 0, paid: 0 };
        typeMap[f.feeType].count++;
        typeMap[f.feeType].total += f.actualAmount;
        if (f.status === '已缴费') typeMap[f.feeType].paid += f.actualAmount;
    });

    const typeColors = {
        '报名费': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', icon: 'fa-ticket-alt' },
        '材料费': { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', icon: 'fa-box-open' },
        '交通费': { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', icon: 'fa-bus' },
        '餐饮费': { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', icon: 'fa-utensils' },
        '住宿费': { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', icon: 'fa-bed' },
        '保险费': { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', icon: 'fa-shield-alt' },
    };

    const types = Object.entries(typeMap).sort((a, b) => b[1].total - a[1].total);
    const totalAll = types.reduce((s, [, v]) => s + v.total, 0);

    return types.slice(0, 3).map(([type, data]) => {
        const color = typeColors[type] || { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200', icon: 'fa-receipt' };
        const percent = totalAll > 0 ? Math.round(data.total / totalAll * 100) : 0;
        return `
            <div class="bg-white rounded-xl border ${color.border} p-4 hover:shadow-md transition-shadow">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-2">
                        <div class="w-9 h-9 rounded-lg ${color.bg} flex items-center justify-center">
                            <i class="fas ${color.icon} ${color.text} text-sm"></i>
                        </div>
                        <span class="font-medium text-gray-800">${type}</span>
                    </div>
                    <span class="text-xs ${color.text} font-medium">${data.count}笔</span>
                </div>
                <div class="text-xl font-bold text-gray-900 mb-2">¥${data.total.toLocaleString()}</div>
                <div class="flex items-center gap-2">
                    <div class="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div class="h-full rounded-full ${color.bg.replace('50', '400')}" style="width:${percent}%;background:currentColor;" class="${color.text}"></div>
                    </div>
                    <span class="text-xs text-gray-500">占比${percent}%</span>
                </div>
            </div>
        `;
    }).join('');
}

// 费用类型标签
function getFeeTypeTag(type) {
    const map = {
        '报名费': 'tag-blue',
        '材料费': 'tag-green',
        '交通费': 'tag-yellow',
        '餐饮费': 'tag-red',
        '住宿费': 'tag-purple',
        '保险费': 'tag-gray',
        '服装费': 'tag-blue',
        '其他': 'tag-gray',
    };
    return `<span class="tag ${map[type] || 'tag-gray'}">${type}</span>`;
}

// 支付方式图标
function getPayMethodIcon(method) {
    const icons = {
        '微信支付': '<i class="fab fa-weixin text-green-500"></i>',
        '支付宝': '<i class="fab fa-alipay text-blue-500"></i>',
        '银行转账': '<i class="fas fa-university text-gray-500"></i>',
        '现金': '<i class="fas fa-money-bill text-green-600"></i>',
        '对公转账': '<i class="fas fa-building text-blue-600"></i>',
    };
    return icons[method] || '<i class="fas fa-credit-card text-gray-400"></i>';
}

// 状态标签
function getFinanceStatusTag(status) {
    const map = {
        '已缴费': 'tag-green',
        '待缴费': 'tag-yellow',
        '已退费': 'tag-red',
        '缴费中': 'tag-blue',
    };
    return `<span class="tag ${map[status] || 'tag-gray'}">${status}</span>`;
}

function bindEvents() {
    const container = document.getElementById('finance-table-container');

    document.getElementById('finance-search').addEventListener('input', (e) => {
        searchKeyword = e.target.value.trim();
        currentPage = 1;
        render();
    });

    document.getElementById('finance-filter-feetype').addEventListener('change', (e) => {
        filterFeeType = e.target.value;
        currentPage = 1;
        render();
    });

    document.getElementById('finance-filter-status').addEventListener('change', (e) => {
        filterStatus = e.target.value;
        currentPage = 1;
        render();
    });

    document.getElementById('finance-filter-activity').addEventListener('change', (e) => {
        filterActivity = e.target.value;
        currentPage = 1;
        render();
    });

    document.getElementById('btn-add-finance').addEventListener('click', () => showFinanceForm());

    document.getElementById('btn-export-finance').addEventListener('click', () => {
        showToast('缴费数据导出成功', 'success');
    });

    container.addEventListener('click', (e) => {
        const viewBtn = e.target.closest('.btn-view-finance');
        const editBtn = e.target.closest('.btn-edit-finance');
        const delBtn = e.target.closest('.btn-del-finance');
        const refundBtn = e.target.closest('.btn-refund-finance');

        if (viewBtn) {
            const fin = finances.find(f => f.id === viewBtn.dataset.id);
            if (fin) showFinanceDetail(fin);
        }
        if (editBtn) {
            const fin = finances.find(f => f.id === editBtn.dataset.id);
            if (fin) showFinanceForm(fin);
        }
        if (refundBtn) {
            const fin = finances.find(f => f.id === refundBtn.dataset.id);
            if (fin) showRefundForm(fin);
        }
        if (delBtn) {
            const id = delBtn.dataset.id;
            showConfirm('确定要删除该缴费记录吗？此操作不可恢复。', () => {
                finances = finances.filter(f => f.id !== id);
                showToast('删除成功', 'success');
                render();
            });
        }
    });

    bindPaginationEvents(container, (page) => { currentPage = page; render(); });
}

// 查看缴费详情
function showFinanceDetail(fin) {
    const body = `
        <div class="mb-4 p-4 rounded-xl ${fin.status === '已缴费' ? 'bg-green-50 border border-green-200' : fin.status === '待缴费' ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}">
            <div class="flex items-center justify-between">
                <div>
                    <span class="text-sm text-gray-500">实缴金额</span>
                    <div class="text-2xl font-bold ${fin.status === '已退费' ? 'text-red-500 line-through' : 'text-gray-900'}">¥${fin.actualAmount.toLocaleString()}</div>
                </div>
                <div>${getFinanceStatusTag(fin.status)}</div>
            </div>
            ${fin.status === '已退费' ? `<div class="mt-2 text-sm text-red-500"><i class="fas fa-undo mr-1"></i>已退费 ¥${fin.refundAmount.toLocaleString()}</div>` : ''}
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div class="form-group"><label class="form-label">缴费编号</label><p class="text-gray-700 font-mono text-sm">${fin.id}</p></div>
            <div class="form-group"><label class="form-label">学生学号</label><p class="text-gray-700 font-mono text-sm">${fin.studentId}</p></div>
            <div class="form-group"><label class="form-label">学生姓名</label><p class="text-gray-700 font-medium">${fin.studentName}</p></div>
            <div class="form-group"><label class="form-label">所属学校</label><p class="text-gray-700">${fin.school}</p></div>
            <div class="form-group"><label class="form-label">年级</label><p class="text-gray-700">${fin.grade}</p></div>
            <div class="form-group"><label class="form-label">费用类型</label><p>${getFeeTypeTag(fin.feeType)}</p></div>
            <div class="form-group col-span-2"><label class="form-label">报名活动</label><p class="text-gray-700">${fin.activity}</p></div>
            <div class="form-group col-span-2"><label class="form-label">所属项目</label><p class="text-gray-700">${fin.project}</p></div>
            <div class="form-group"><label class="form-label">应缴金额</label><p class="text-gray-700">¥${fin.amount.toLocaleString()}</p></div>
            <div class="form-group"><label class="form-label">优惠金额</label><p class="${fin.discount > 0 ? 'text-orange-500' : 'text-gray-400'}">${fin.discount > 0 ? '-¥' + fin.discount.toLocaleString() : '无优惠'}</p></div>
            <div class="form-group"><label class="form-label">缴费方式</label><p class="text-gray-700">${getPayMethodIcon(fin.payMethod)} ${fin.payMethod}</p></div>
            <div class="form-group"><label class="form-label">缴费日期</label><p class="text-gray-700">${fin.payDate}</p></div>
            <div class="form-group"><label class="form-label">发票号</label><p class="text-gray-700 font-mono text-sm">${fin.invoiceNo || '暂无'}</p></div>
            <div class="form-group"><label class="form-label">&nbsp;</label></div>
            <div class="form-group col-span-2"><label class="form-label">备注</label><p class="text-gray-700">${fin.remark || '无'}</p></div>
        </div>
    `;
    showModal('缴费详情 - ' + fin.studentName, body, '', { maxWidth: '700px' });
}

// 新增/编辑缴费表单
function showFinanceForm(fin = null) {
    const isEdit = !!fin;
    const title = isEdit ? '编辑缴费记录' : '新增缴费记录';

    // 活动选项
    const activityList = [
        '2026春季延安红色研学报名',
        '科技创新营第一期报名',
        '暑期雨林探秘营报名',
        '传统文化体验营春季班',
        '海洋科学探索营报名',
        '军事素质拓展营报名',
        '航天科普营暑期报名',
        '科技创新营第二期报名',
        '延安红色研学秋季班',
    ];

    // 学生选项
    const studentList = [
        { id: 'STU001', name: '张明远', school: '北京市第一中学', grade: '初二' },
        { id: 'STU002', name: '李思涵', school: '北京市实验中学', grade: '初一' },
        { id: 'STU003', name: '王浩然', school: '清华附中', grade: '初三' },
        { id: 'STU004', name: '赵雨萱', school: '北京市海淀小学', grade: '六年级' },
        { id: 'STU005', name: '刘子轩', school: '人大附中', grade: '初二' },
        { id: 'STU006', name: '陈思琪', school: '北京四中', grade: '初一' },
        { id: 'STU007', name: '杨博文', school: '北师大附中', grade: '初三' },
        { id: 'STU008', name: '吴佳怡', school: '北京市第一中学', grade: '初二' },
        { id: 'STU009', name: '黄梓涵', school: '北京市朝阳小学', grade: '六年级' },
        { id: 'STU010', name: '周雅琪', school: '北京市实验中学', grade: '初一' },
        { id: 'STU011', name: '孙宇航', school: '清华附中', grade: '初二' },
        { id: 'STU012', name: '马晓彤', school: '人大附中', grade: '初三' },
    ];

    const body = `
        <form id="finance-form">
            <div class="grid grid-cols-2 gap-4">
                <div class="form-group col-span-2">
                    <label class="form-label">选择学生 <span class="required">*</span></label>
                    <select class="form-select" id="ff-student">
                        <option value="">请选择学生</option>
                        ${studentList.map(s => `<option value="${s.id}" data-name="${s.name}" data-school="${s.school}" data-grade="${s.grade}" ${fin && fin.studentId === s.id ? 'selected' : ''}>${s.name} (${s.id}) - ${s.school} ${s.grade}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group col-span-2">
                    <label class="form-label">报名活动 <span class="required">*</span></label>
                    <select class="form-select" id="ff-activity">
                        <option value="">请选择报名活动</option>
                        ${activityList.map(a => `<option value="${a}" ${fin && fin.activity === a ? 'selected' : ''}>${a}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">费用类型 <span class="required">*</span></label>
                    <select class="form-select" id="ff-feetype">
                        ${feeTypeOptions.map(t => `<option value="${t}" ${fin && fin.feeType === t ? 'selected' : ''}>${t}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">应缴金额(元) <span class="required">*</span></label>
                    <input type="number" class="form-input" id="ff-amount" value="${fin ? fin.amount : ''}" placeholder="请输入应缴金额" min="0" step="0.01">
                </div>
                <div class="form-group">
                    <label class="form-label">优惠金额(元)</label>
                    <input type="number" class="form-input" id="ff-discount" value="${fin ? fin.discount : '0'}" placeholder="优惠金额" min="0" step="0.01">
                </div>
                <div class="form-group">
                    <label class="form-label">实缴金额(元)</label>
                    <input type="number" class="form-input" id="ff-actual" value="${fin ? fin.actualAmount : ''}" placeholder="自动计算" readonly style="background:#f9fafb;">
                </div>
                <div class="form-group">
                    <label class="form-label">缴费方式</label>
                    <select class="form-select" id="ff-method">
                        ${payMethodOptions.map(m => `<option value="${m}" ${fin && fin.payMethod === m ? 'selected' : ''}>${m}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">缴费日期</label>
                    <input type="date" class="form-input" id="ff-date" value="${fin ? fin.payDate : new Date().toISOString().split('T')[0]}">
                </div>
                <div class="form-group">
                    <label class="form-label">缴费状态</label>
                    <select class="form-select" id="ff-status">
                        ${statusOptions.map(s => `<option value="${s}" ${fin && fin.status === s ? 'selected' : ''}>${s}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">发票号</label>
                    <input type="text" class="form-input" id="ff-invoice" value="${fin ? fin.invoiceNo : ''}" placeholder="请输入发票号（选填）">
                </div>
                <div class="form-group col-span-2">
                    <label class="form-label">备注</label>
                    <textarea class="form-input" id="ff-remark" rows="2" placeholder="请输入备注信息">${fin ? fin.remark : ''}</textarea>
                </div>
            </div>
        </form>
    `;
    const footer = `<button class="btn btn-outline" id="ff-cancel">取消</button><button class="btn btn-primary" id="ff-save">保存</button>`;
    showModal(title, body, footer, { maxWidth: '720px' });

    // 自动计算实缴金额
    const calcActual = () => {
        const amount = parseFloat(document.getElementById('ff-amount').value) || 0;
        const discount = parseFloat(document.getElementById('ff-discount').value) || 0;
        document.getElementById('ff-actual').value = Math.max(0, amount - discount);
    };
    document.getElementById('ff-amount').addEventListener('input', calcActual);
    document.getElementById('ff-discount').addEventListener('input', calcActual);

    document.getElementById('ff-cancel').addEventListener('click', closeModal);
    document.getElementById('ff-save').addEventListener('click', () => {
        const studentSelect = document.getElementById('ff-student');
        const studentId = studentSelect.value;
        const activity = document.getElementById('ff-activity').value;
        const amount = document.getElementById('ff-amount').value;

        if (!studentId || !activity || !amount) {
            showToast('请填写必填项（学生、活动、金额）', 'warning');
            return;
        }

        const selectedOption = studentSelect.options[studentSelect.selectedIndex];
        const data = {
            studentId,
            studentName: selectedOption.dataset.name,
            school: selectedOption.dataset.school,
            grade: selectedOption.dataset.grade,
            activity,
            project: getProjectByActivity(activity),
            feeType: document.getElementById('ff-feetype').value,
            amount: parseFloat(amount),
            discount: parseFloat(document.getElementById('ff-discount').value) || 0,
            actualAmount: parseFloat(document.getElementById('ff-actual').value) || 0,
            payMethod: document.getElementById('ff-method').value,
            payDate: document.getElementById('ff-date').value,
            status: document.getElementById('ff-status').value,
            invoiceNo: document.getElementById('ff-invoice').value.trim(),
            remark: document.getElementById('ff-remark').value.trim(),
            refundAmount: 0,
        };

        if (isEdit) {
            data.refundAmount = fin.refundAmount;
            Object.assign(fin, data);
            showToast('缴费记录更新成功', 'success');
        } else {
            data.id = 'FEE' + String(finances.length + 1).padStart(3, '0');
            finances.push(data);
            showToast('缴费记录添加成功', 'success');
        }
        closeModal();
        render();
    });
}

// 退费表单
function showRefundForm(fin) {
    const body = `
        <div class="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div class="flex items-center gap-2 mb-2">
                <i class="fas fa-exclamation-triangle text-yellow-500"></i>
                <span class="font-medium text-yellow-700">退费确认</span>
            </div>
            <p class="text-sm text-yellow-600">请确认以下退费信息，退费操作提交后将更新缴费状态。</p>
        </div>
        <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="form-group"><label class="form-label">学生姓名</label><p class="text-gray-700 font-medium">${fin.studentName}</p></div>
            <div class="form-group"><label class="form-label">报名活动</label><p class="text-gray-700 text-sm">${fin.activity}</p></div>
            <div class="form-group"><label class="form-label">费用类型</label><p>${getFeeTypeTag(fin.feeType)}</p></div>
            <div class="form-group"><label class="form-label">实缴金额</label><p class="text-gray-700 font-bold">¥${fin.actualAmount.toLocaleString()}</p></div>
        </div>
        <div class="form-group">
            <label class="form-label">退费金额(元) <span class="required">*</span></label>
            <input type="number" class="form-input" id="rf-amount" value="${fin.actualAmount}" min="0" max="${fin.actualAmount}" step="0.01">
            <p class="text-xs text-gray-400 mt-1">最大可退 ¥${fin.actualAmount.toLocaleString()}</p>
        </div>
        <div class="form-group">
            <label class="form-label">退费原因</label>
            <textarea class="form-input" id="rf-reason" rows="2" placeholder="请输入退费原因"></textarea>
        </div>
    `;
    const footer = `<button class="btn btn-outline" id="rf-cancel">取消</button><button class="btn btn-danger" id="rf-confirm">确认退费</button>`;
    showModal('退费处理 - ' + fin.studentName, body, footer, { maxWidth: '560px' });

    document.getElementById('rf-cancel').addEventListener('click', closeModal);
    document.getElementById('rf-confirm').addEventListener('click', () => {
        const refundAmount = parseFloat(document.getElementById('rf-amount').value);
        const reason = document.getElementById('rf-reason').value.trim();

        if (!refundAmount || refundAmount <= 0) {
            showToast('请输入有效的退费金额', 'warning');
            return;
        }
        if (refundAmount > fin.actualAmount) {
            showToast('退费金额不能超过实缴金额', 'warning');
            return;
        }

        fin.status = '已退费';
        fin.refundAmount = refundAmount;
        if (reason) fin.remark = (fin.remark ? fin.remark + '；' : '') + '退费原因：' + reason;

        showToast(`已退费 ¥${refundAmount.toLocaleString()}`, 'success');
        closeModal();
        render();
    });
}

// 根据活动名称获取项目名称
function getProjectByActivity(activity) {
    const map = {
        '2026春季延安红色研学报名': '红色革命教育研学之旅',
        '科技创新营第一期报名': '科技创新探索营',
        '暑期雨林探秘营报名': '自然生态探秘之旅',
        '传统文化体验营春季班': '传统文化体验营',
        '海洋科学探索营报名': '海洋科学探索营',
        '军事素质拓展营报名': '军事素质拓展营',
        '航天科普营暑期报名': '航天科普研学营',
        '科技创新营第二期报名': '科技创新探索营',
        '延安红色研学秋季班': '红色革命教育研学之旅',
    };
    return map[activity] || '';
}
