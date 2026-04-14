// project.js - 研学项目管理模块
import { showToast, showModal, closeModal, showConfirm, renderPagination, bindPaginationEvents } from './layout.js';

// 模拟研学项目数据
let projects = [
    { id: 'PRJ001', name: '红色革命教育研学之旅', type: '红色教育', base: '延安革命纪念馆基地', duration: '5天4晚', targetGrade: '初中', minStudents: 30, maxStudents: 60, price: 2800, status: '进行中', startDate: '2026-03-01', endDate: '2026-06-30', desc: '走进延安，感受革命精神，传承红色基因。', createDate: '2026-01-15' },
    { id: 'PRJ002', name: '科技创新探索营', type: '科技探索', base: '中关村科技园基地', duration: '3天2晚', targetGrade: '高中', minStudents: 20, maxStudents: 50, price: 3200, status: '进行中', startDate: '2026-04-01', endDate: '2026-08-31', desc: '走进科技前沿，体验AI、机器人等高新技术。', createDate: '2026-02-20' },
    { id: 'PRJ003', name: '自然生态探秘之旅', type: '自然生态', base: '西双版纳热带雨林基地', duration: '7天6晚', targetGrade: '小学高年级', minStudents: 25, maxStudents: 45, price: 4500, status: '筹备中', startDate: '2026-07-01', endDate: '2026-08-31', desc: '深入热带雨林，探索自然奥秘，培养环保意识。', createDate: '2026-03-10' },
    { id: 'PRJ004', name: '传统文化体验营', type: '文化传承', base: '曲阜孔子文化基地', duration: '4天3晚', targetGrade: '初中', minStudents: 30, maxStudents: 55, price: 2500, status: '进行中', startDate: '2026-03-15', endDate: '2026-07-15', desc: '学习儒家文化，体验传统礼仪，感悟国学经典。', createDate: '2026-01-20' },
    { id: 'PRJ005', name: '航天科普研学营', type: '科技探索', base: '酒泉卫星发射中心基地', duration: '6天5晚', targetGrade: '高中', minStudents: 20, maxStudents: 40, price: 5800, status: '筹备中', startDate: '2026-08-01', endDate: '2026-09-30', desc: '走进航天基地，了解航天科技，点燃航天梦想。', createDate: '2026-03-25' },
    { id: 'PRJ006', name: '农耕文化体验营', type: '劳动实践', base: '成都天府农耕基地', duration: '3天2晚', targetGrade: '小学高年级', minStudents: 30, maxStudents: 60, price: 1800, status: '已结束', startDate: '2025-09-01', endDate: '2025-12-31', desc: '体验农耕生活，了解农业知识，培养劳动意识。', createDate: '2025-07-10' },
    { id: 'PRJ007', name: '海洋科学探索营', type: '自然生态', base: '青岛海洋科学基地', duration: '5天4晚', targetGrade: '初中', minStudents: 25, maxStudents: 50, price: 3600, status: '进行中', startDate: '2026-04-01', endDate: '2026-09-30', desc: '探索海洋世界，学习海洋科学，增强海洋保护意识。', createDate: '2026-02-28' },
    { id: 'PRJ008', name: '军事素质拓展营', type: '素质拓展', base: '南京军事训练基地', duration: '5天4晚', targetGrade: '高中', minStudents: 30, maxStudents: 60, price: 3000, status: '已暂停', startDate: '2026-05-01', endDate: '2026-10-31', desc: '军事化训练，培养纪律意识和团队协作能力。', createDate: '2026-03-05' },
];

let currentPage = 1;
const pageSize = 6;
let searchKeyword = '';
let filterStatus = '';
let filterType = '';

function getFilteredData() {
    return projects.filter(p => {
        const matchSearch = !searchKeyword || p.name.includes(searchKeyword) || p.id.includes(searchKeyword) || p.base.includes(searchKeyword);
        const matchStatus = !filterStatus || p.status === filterStatus;
        const matchType = !filterType || p.type === filterType;
        return matchSearch && matchStatus && matchType;
    });
}

export function render() {
    const container = document.getElementById('main-content');
    const filtered = getFilteredData();
    const total = filtered.length;
    const start = (currentPage - 1) * pageSize;
    const pageData = filtered.slice(start, start + pageSize);

    const statusCounts = {
        total: projects.length,
        ongoing: projects.filter(p => p.status === '进行中').length,
        preparing: projects.filter(p => p.status === '筹备中').length,
        ended: projects.filter(p => p.status === '已结束').length,
    };

    container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">研学项目</h1>
            <p class="page-desc">管理和维护所有研学项目信息</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="stat-card">
                <div class="stat-icon bg-blue-50 text-blue-500"><i class="fas fa-project-diagram"></i></div>
                <div class="stat-info"><h3>${statusCounts.total}</h3><p>项目总数</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-green-50 text-green-500"><i class="fas fa-play-circle"></i></div>
                <div class="stat-info"><h3>${statusCounts.ongoing}</h3><p>进行中</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-yellow-50 text-yellow-500"><i class="fas fa-tools"></i></div>
                <div class="stat-info"><h3>${statusCounts.preparing}</h3><p>筹备中</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-gray-100 text-gray-500"><i class="fas fa-flag-checkered"></i></div>
                <div class="stat-info"><h3>${statusCounts.ended}</h3><p>已结束</p></div>
            </div>
        </div>

        <div class="table-container" id="project-table-container">
            <div class="table-toolbar">
                <div class="flex items-center gap-3 flex-wrap">
                    <div class="table-search">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="搜索项目名称/编号/基地..." id="project-search" value="${searchKeyword}">
                    </div>
                    <select class="form-select" style="width:auto;min-width:120px;padding:8px 32px 8px 12px;" id="project-filter-status">
                        <option value="">全部状态</option>
                        <option value="进行中" ${filterStatus === '进行中' ? 'selected' : ''}>进行中</option>
                        <option value="筹备中" ${filterStatus === '筹备中' ? 'selected' : ''}>筹备中</option>
                        <option value="已结束" ${filterStatus === '已结束' ? 'selected' : ''}>已结束</option>
                        <option value="已暂停" ${filterStatus === '已暂停' ? 'selected' : ''}>已暂停</option>
                    </select>
                    <select class="form-select" style="width:auto;min-width:120px;padding:8px 32px 8px 12px;" id="project-filter-type">
                        <option value="">全部类型</option>
                        ${[...new Set(projects.map(p => p.type))].map(t => `<option value="${t}" ${filterType === t ? 'selected' : ''}>${t}</option>`).join('')}
                    </select>
                </div>
                <div class="table-actions">
                    <button class="btn btn-primary" id="btn-add-project"><i class="fas fa-plus"></i> 新建项目</button>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
                ${pageData.length === 0 ? `<div class="col-span-full"><div class="empty-state"><i class="fas fa-inbox"></i><p>暂无项目数据</p></div></div>` :
                pageData.map(p => `
                    <div class="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden project-card" data-id="${p.id}">
                        <div class="p-5">
                            <div class="flex items-start justify-between mb-3">
                                <div class="flex-1 min-w-0">
                                    <h3 class="font-semibold text-gray-900 text-base truncate">${p.name}</h3>
                                    <p class="text-xs text-gray-400 mt-1">${p.id}</p>
                                </div>
                                ${getProjectStatusTag(p.status)}
                            </div>
                            <p class="text-sm text-gray-500 mb-3 line-clamp-2" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${p.desc}</p>
                            <div class="grid grid-cols-2 gap-2 text-sm mb-3">
                                <div class="flex items-center gap-1.5 text-gray-500"><i class="fas fa-tag text-xs text-blue-400"></i><span>${p.type}</span></div>
                                <div class="flex items-center gap-1.5 text-gray-500"><i class="fas fa-clock text-xs text-green-400"></i><span>${p.duration}</span></div>
                                <div class="flex items-center gap-1.5 text-gray-500"><i class="fas fa-building text-xs text-purple-400"></i><span class="truncate">${p.base}</span></div>
                                <div class="flex items-center gap-1.5 text-gray-500"><i class="fas fa-users text-xs text-orange-400"></i><span>${p.minStudents}-${p.maxStudents}人</span></div>
                            </div>
                            <div class="flex items-center justify-between pt-3 border-t border-gray-50">
                                <div class="text-lg font-bold text-primary-600">¥${p.price.toLocaleString()}<span class="text-xs text-gray-400 font-normal">/人</span></div>
                                <div class="flex gap-1">
                                    <button class="btn btn-sm btn-outline btn-view-project" data-id="${p.id}" title="查看"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-sm btn-outline btn-edit-project" data-id="${p.id}" title="编辑"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-sm btn-outline btn-del-project" data-id="${p.id}" title="删除" style="color:#ef4444;border-color:#fca5a5;"><i class="fas fa-trash"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            ${renderPagination(currentPage, total, pageSize)}
        </div>
    `;
    bindEvents();
}

function getProjectStatusTag(status) {
    const map = { '进行中': 'tag-green', '筹备中': 'tag-yellow', '已结束': 'tag-gray', '已暂停': 'tag-red' };
    return `<span class="tag ${map[status] || 'tag-gray'}">${status}</span>`;
}

function bindEvents() {
    const container = document.getElementById('project-table-container');

    document.getElementById('project-search').addEventListener('input', (e) => {
        searchKeyword = e.target.value.trim();
        currentPage = 1;
        render();
    });

    document.getElementById('project-filter-status').addEventListener('change', (e) => {
        filterStatus = e.target.value;
        currentPage = 1;
        render();
    });

    document.getElementById('project-filter-type').addEventListener('change', (e) => {
        filterType = e.target.value;
        currentPage = 1;
        render();
    });

    document.getElementById('btn-add-project').addEventListener('click', () => showProjectForm());

    container.addEventListener('click', (e) => {
        const viewBtn = e.target.closest('.btn-view-project');
        const editBtn = e.target.closest('.btn-edit-project');
        const delBtn = e.target.closest('.btn-del-project');

        if (viewBtn) {
            const p = projects.find(x => x.id === viewBtn.dataset.id);
            if (p) showProjectDetail(p);
        }
        if (editBtn) {
            const p = projects.find(x => x.id === editBtn.dataset.id);
            if (p) showProjectForm(p);
        }
        if (delBtn) {
            const id = delBtn.dataset.id;
            showConfirm('确定要删除该研学项目吗？此操作不可恢复。', () => {
                projects = projects.filter(x => x.id !== id);
                showToast('项目删除成功', 'success');
                render();
            });
        }
    });

    bindPaginationEvents(container, (page) => { currentPage = page; render(); });
}

function showProjectDetail(p) {
    const body = `
        <div class="grid grid-cols-2 gap-4">
            <div class="form-group"><label class="form-label">项目编号</label><p class="text-gray-700">${p.id}</p></div>
            <div class="form-group"><label class="form-label">项目名称</label><p class="text-gray-700">${p.name}</p></div>
            <div class="form-group"><label class="form-label">项目类型</label><p class="text-gray-700">${p.type}</p></div>
            <div class="form-group"><label class="form-label">所属基地</label><p class="text-gray-700">${p.base}</p></div>
            <div class="form-group"><label class="form-label">研学时长</label><p class="text-gray-700">${p.duration}</p></div>
            <div class="form-group"><label class="form-label">适用年级</label><p class="text-gray-700">${p.targetGrade}</p></div>
            <div class="form-group"><label class="form-label">人数范围</label><p class="text-gray-700">${p.minStudents}-${p.maxStudents}人</p></div>
            <div class="form-group"><label class="form-label">费用/人</label><p class="text-gray-700 font-bold text-primary-600">¥${p.price.toLocaleString()}</p></div>
            <div class="form-group"><label class="form-label">开始日期</label><p class="text-gray-700">${p.startDate}</p></div>
            <div class="form-group"><label class="form-label">结束日期</label><p class="text-gray-700">${p.endDate}</p></div>
            <div class="form-group"><label class="form-label">状态</label><p>${getProjectStatusTag(p.status)}</p></div>
            <div class="form-group"><label class="form-label">创建日期</label><p class="text-gray-700">${p.createDate}</p></div>
            <div class="form-group col-span-2"><label class="form-label">项目描述</label><p class="text-gray-700">${p.desc}</p></div>
        </div>
    `;
    showModal('项目详情 - ' + p.name, body, '', { maxWidth: '700px' });
}

function showProjectForm(p = null) {
    const isEdit = !!p;
    const title = isEdit ? '编辑项目' : '新建项目';
    const types = ['红色教育', '科技探索', '自然生态', '文化传承', '劳动实践', '素质拓展', '艺术体验', '其他'];
    const body = `
        <form id="project-form">
            <div class="grid grid-cols-2 gap-4">
                <div class="form-group col-span-2">
                    <label class="form-label">项目名称 <span class="required">*</span></label>
                    <input type="text" class="form-input" id="pf-name" value="${p ? p.name : ''}" placeholder="请输入项目名称">
                </div>
                <div class="form-group">
                    <label class="form-label">项目类型 <span class="required">*</span></label>
                    <select class="form-select" id="pf-type">
                        ${types.map(t => `<option value="${t}" ${p && p.type === t ? 'selected' : ''}>${t}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">所属基地 <span class="required">*</span></label>
                    <input type="text" class="form-input" id="pf-base" value="${p ? p.base : ''}" placeholder="请输入所属基地">
                </div>
                <div class="form-group">
                    <label class="form-label">研学时长</label>
                    <input type="text" class="form-input" id="pf-duration" value="${p ? p.duration : ''}" placeholder="如：3天2晚">
                </div>
                <div class="form-group">
                    <label class="form-label">适用年级</label>
                    <select class="form-select" id="pf-grade">
                        ${['小学高年级', '初中', '高中', '不限'].map(g => `<option value="${g}" ${p && p.targetGrade === g ? 'selected' : ''}>${g}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">最少人数</label>
                    <input type="number" class="form-input" id="pf-min" value="${p ? p.minStudents : '20'}" min="1">
                </div>
                <div class="form-group">
                    <label class="form-label">最多人数</label>
                    <input type="number" class="form-input" id="pf-max" value="${p ? p.maxStudents : '50'}" min="1">
                </div>
                <div class="form-group">
                    <label class="form-label">费用/人（元）</label>
                    <input type="number" class="form-input" id="pf-price" value="${p ? p.price : ''}" placeholder="请输入费用" min="0">
                </div>
                <div class="form-group">
                    <label class="form-label">状态</label>
                    <select class="form-select" id="pf-status">
                        ${['筹备中', '进行中', '已结束', '已暂停'].map(s => `<option value="${s}" ${p && p.status === s ? 'selected' : ''}>${s}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">开始日期</label>
                    <input type="date" class="form-input" id="pf-start" value="${p ? p.startDate : ''}">
                </div>
                <div class="form-group">
                    <label class="form-label">结束日期</label>
                    <input type="date" class="form-input" id="pf-end" value="${p ? p.endDate : ''}">
                </div>
                <div class="form-group col-span-2">
                    <label class="form-label">项目描述</label>
                    <textarea class="form-input" id="pf-desc" rows="3" placeholder="请输入项目描述">${p ? p.desc : ''}</textarea>
                </div>
            </div>
        </form>
    `;
    const footer = `<button class="btn btn-outline" id="pf-cancel">取消</button><button class="btn btn-primary" id="pf-save">保存</button>`;
    showModal(title, body, footer, { maxWidth: '720px' });

    document.getElementById('pf-cancel').addEventListener('click', closeModal);
    document.getElementById('pf-save').addEventListener('click', () => {
        const name = document.getElementById('pf-name').value.trim();
        const base = document.getElementById('pf-base').value.trim();
        if (!name || !base) { showToast('请填写必填项', 'warning'); return; }

        const data = {
            name,
            type: document.getElementById('pf-type').value,
            base,
            duration: document.getElementById('pf-duration').value.trim(),
            targetGrade: document.getElementById('pf-grade').value,
            minStudents: parseInt(document.getElementById('pf-min').value) || 20,
            maxStudents: parseInt(document.getElementById('pf-max').value) || 50,
            price: parseInt(document.getElementById('pf-price').value) || 0,
            status: document.getElementById('pf-status').value,
            startDate: document.getElementById('pf-start').value,
            endDate: document.getElementById('pf-end').value,
            desc: document.getElementById('pf-desc').value.trim(),
        };

        if (isEdit) {
            Object.assign(p, data);
            showToast('项目更新成功', 'success');
        } else {
            data.id = 'PRJ' + String(projects.length + 1).padStart(3, '0');
            data.createDate = new Date().toISOString().split('T')[0];
            projects.push(data);
            showToast('项目创建成功', 'success');
        }
        closeModal();
        render();
    });
}
