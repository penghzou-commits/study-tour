// activity.js - 研学报名活动管理模块
import { showToast, showModal, closeModal, showConfirm, renderPagination, bindPaginationEvents } from './layout.js';

// 模拟报名活动数据
let activities = [
    { id: 'ACT001', name: '2026春季延安红色研学报名', project: '红色革命教育研学之旅', school: '北京市第一中学', startDate: '2026-03-01', endDate: '2026-03-15', quota: 60, enrolled: 48, status: '报名中', contact: '王老师', contactPhone: '13800002001', createDate: '2026-02-20', remark: '限初中学生报名' },
    { id: 'ACT002', name: '科技创新营第一期报名', project: '科技创新探索营', school: '清华附中', startDate: '2026-04-01', endDate: '2026-04-10', quota: 50, enrolled: 50, status: '已满员', contact: '李老师', contactPhone: '13800002002', createDate: '2026-03-15', remark: '' },
    { id: 'ACT003', name: '暑期雨林探秘营报名', project: '自然生态探秘之旅', school: '人大附中', startDate: '2026-05-01', endDate: '2026-06-15', quota: 45, enrolled: 12, status: '报名中', contact: '张老师', contactPhone: '13800002003', createDate: '2026-04-01', remark: '需家长签署安全协议' },
    { id: 'ACT004', name: '传统文化体验营春季班', project: '传统文化体验营', school: '北京四中', startDate: '2026-03-10', endDate: '2026-03-25', quota: 55, enrolled: 38, status: '报名中', contact: '赵老师', contactPhone: '13800002004', createDate: '2026-02-28', remark: '' },
    { id: 'ACT005', name: '海洋科学探索营报名', project: '海洋科学探索营', school: '北京市实验中学', startDate: '2026-04-05', endDate: '2026-04-20', quota: 50, enrolled: 25, status: '报名中', contact: '孙老师', contactPhone: '13800002005', createDate: '2026-03-20', remark: '' },
    { id: 'ACT006', name: '2025秋季农耕体验报名', project: '农耕文化体验营', school: '北京市海淀小学', startDate: '2025-08-15', endDate: '2025-08-30', quota: 60, enrolled: 55, status: '已结束', contact: '刘老师', contactPhone: '13800002006', createDate: '2025-07-20', remark: '' },
    { id: 'ACT007', name: '军事素质拓展营报名', project: '军事素质拓展营', school: '北师大附中', startDate: '2026-04-15', endDate: '2026-05-01', quota: 60, enrolled: 0, status: '未开始', contact: '陈老师', contactPhone: '13800002007', createDate: '2026-04-01', remark: '需体检合格证明' },
    { id: 'ACT008', name: '航天科普营暑期报名', project: '航天科普研学营', school: '北京市朝阳中学', startDate: '2026-06-01', endDate: '2026-07-01', quota: 40, enrolled: 0, status: '未开始', contact: '周老师', contactPhone: '13800002008', createDate: '2026-04-10', remark: '限高中生报名' },
    { id: 'ACT009', name: '科技创新营第二期报名', project: '科技创新探索营', school: '人大附中', startDate: '2026-05-10', endDate: '2026-05-25', quota: 50, enrolled: 18, status: '报名中', contact: '李老师', contactPhone: '13800002009', createDate: '2026-04-05', remark: '' },
    { id: 'ACT010', name: '延安红色研学秋季班', project: '红色革命教育研学之旅', school: '北京市第一中学', startDate: '2026-08-01', endDate: '2026-08-20', quota: 60, enrolled: 0, status: '未开始', contact: '王老师', contactPhone: '13800002010', createDate: '2026-04-12', remark: '' },
];

let currentPage = 1;
const pageSize = 8;
let searchKeyword = '';
let filterStatus = '';

function getFilteredData() {
    return activities.filter(a => {
        const matchSearch = !searchKeyword || a.name.includes(searchKeyword) || a.id.includes(searchKeyword) || a.project.includes(searchKeyword) || a.school.includes(searchKeyword);
        const matchStatus = !filterStatus || a.status === filterStatus;
        return matchSearch && matchStatus;
    });
}

export function render() {
    const container = document.getElementById('main-content');
    const filtered = getFilteredData();
    const total = filtered.length;
    const start = (currentPage - 1) * pageSize;
    const pageData = filtered.slice(start, start + pageSize);

    const totalEnrolled = activities.reduce((sum, a) => sum + a.enrolled, 0);
    const totalQuota = activities.reduce((sum, a) => sum + a.quota, 0);

    container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">研学报名活动</h1>
            <p class="page-desc">管理研学项目的报名活动和学生报名情况</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="stat-card">
                <div class="stat-icon bg-blue-50 text-blue-500"><i class="fas fa-calendar-check"></i></div>
                <div class="stat-info"><h3>${activities.length}</h3><p>活动总数</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-green-50 text-green-500"><i class="fas fa-clipboard-list"></i></div>
                <div class="stat-info"><h3>${activities.filter(a => a.status === '报名中').length}</h3><p>报名中</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-purple-50 text-purple-500"><i class="fas fa-user-plus"></i></div>
                <div class="stat-info"><h3>${totalEnrolled}</h3><p>已报名人数</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-orange-50 text-orange-500"><i class="fas fa-percentage"></i></div>
                <div class="stat-info"><h3>${totalQuota > 0 ? Math.round(totalEnrolled / totalQuota * 100) : 0}%</h3><p>总报名率</p></div>
            </div>
        </div>

        <div class="table-container" id="activity-table-container">
            <div class="table-toolbar">
                <div class="flex items-center gap-3 flex-wrap">
                    <div class="table-search">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="搜索活动名称/编号/项目/学校..." id="activity-search" value="${searchKeyword}">
                    </div>
                    <select class="form-select" style="width:auto;min-width:120px;padding:8px 32px 8px 12px;" id="activity-filter-status">
                        <option value="">全部状态</option>
                        <option value="报名中" ${filterStatus === '报名中' ? 'selected' : ''}>报名中</option>
                        <option value="已满员" ${filterStatus === '已满员' ? 'selected' : ''}>已满员</option>
                        <option value="未开始" ${filterStatus === '未开始' ? 'selected' : ''}>未开始</option>
                        <option value="已结束" ${filterStatus === '已结束' ? 'selected' : ''}>已结束</option>
                    </select>
                </div>
                <div class="table-actions">
                    <button class="btn btn-primary" id="btn-add-activity"><i class="fas fa-plus"></i> 新建活动</button>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>活动编号</th>
                            <th>活动名称</th>
                            <th>关联项目</th>
                            <th>报名学校</th>
                            <th>报名时间</th>
                            <th>报名进度</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${pageData.length === 0 ? `<tr><td colspan="8"><div class="empty-state"><i class="fas fa-inbox"></i><p>暂无活动数据</p></div></td></tr>` :
                        pageData.map(a => `
                            <tr>
                                <td><span class="font-mono text-xs text-gray-500">${a.id}</span></td>
                                <td><span class="font-medium text-gray-900">${a.name}</span></td>
                                <td><span class="text-sm text-gray-600">${a.project}</span></td>
                                <td>${a.school}</td>
                                <td><span class="text-sm text-gray-500">${a.startDate} ~ ${a.endDate}</span></td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <div class="w-20 bg-gray-100 rounded-full h-2 overflow-hidden">
                                            <div class="h-full rounded-full ${a.enrolled >= a.quota ? 'bg-green-500' : a.enrolled >= a.quota * 0.7 ? 'bg-blue-500' : 'bg-orange-400'}" style="width:${Math.min(100, Math.round(a.enrolled / a.quota * 100))}%"></div>
                                        </div>
                                        <span class="text-xs text-gray-500">${a.enrolled}/${a.quota}</span>
                                    </div>
                                </td>
                                <td>${getActivityStatusTag(a.status)}</td>
                                <td>
                                    <div class="flex gap-1">
                                        <button class="btn btn-sm btn-outline btn-view-activity" data-id="${a.id}" title="查看"><i class="fas fa-eye"></i></button>
                                        <button class="btn btn-sm btn-outline btn-edit-activity" data-id="${a.id}" title="编辑"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-outline btn-del-activity" data-id="${a.id}" title="删除" style="color:#ef4444;border-color:#fca5a5;"><i class="fas fa-trash"></i></button>
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

function getActivityStatusTag(status) {
    const map = { '报名中': 'tag-green', '已满员': 'tag-blue', '未开始': 'tag-yellow', '已结束': 'tag-gray' };
    return `<span class="tag ${map[status] || 'tag-gray'}">${status}</span>`;
}

function bindEvents() {
    const container = document.getElementById('activity-table-container');

    document.getElementById('activity-search').addEventListener('input', (e) => {
        searchKeyword = e.target.value.trim();
        currentPage = 1;
        render();
    });

    document.getElementById('activity-filter-status').addEventListener('change', (e) => {
        filterStatus = e.target.value;
        currentPage = 1;
        render();
    });

    document.getElementById('btn-add-activity').addEventListener('click', () => showActivityForm());

    container.addEventListener('click', (e) => {
        const viewBtn = e.target.closest('.btn-view-activity');
        const editBtn = e.target.closest('.btn-edit-activity');
        const delBtn = e.target.closest('.btn-del-activity');

        if (viewBtn) {
            const a = activities.find(x => x.id === viewBtn.dataset.id);
            if (a) showActivityDetail(a);
        }
        if (editBtn) {
            const a = activities.find(x => x.id === editBtn.dataset.id);
            if (a) showActivityForm(a);
        }
        if (delBtn) {
            const id = delBtn.dataset.id;
            showConfirm('确定要删除该报名活动吗？此操作不可恢复。', () => {
                activities = activities.filter(x => x.id !== id);
                showToast('活动删除成功', 'success');
                render();
            });
        }
    });

    bindPaginationEvents(container, (page) => { currentPage = page; render(); });
}

function showActivityDetail(a) {
    const progress = a.quota > 0 ? Math.round(a.enrolled / a.quota * 100) : 0;
    const body = `
        <div class="grid grid-cols-2 gap-4">
            <div class="form-group"><label class="form-label">活动编号</label><p class="text-gray-700">${a.id}</p></div>
            <div class="form-group"><label class="form-label">活动名称</label><p class="text-gray-700">${a.name}</p></div>
            <div class="form-group"><label class="form-label">关联项目</label><p class="text-gray-700">${a.project}</p></div>
            <div class="form-group"><label class="form-label">报名学校</label><p class="text-gray-700">${a.school}</p></div>
            <div class="form-group"><label class="form-label">报名开始</label><p class="text-gray-700">${a.startDate}</p></div>
            <div class="form-group"><label class="form-label">报名截止</label><p class="text-gray-700">${a.endDate}</p></div>
            <div class="form-group"><label class="form-label">名额</label><p class="text-gray-700">${a.quota}人</p></div>
            <div class="form-group"><label class="form-label">已报名</label><p class="text-gray-700 font-bold">${a.enrolled}人 (${progress}%)</p></div>
            <div class="form-group"><label class="form-label">联系人</label><p class="text-gray-700">${a.contact}</p></div>
            <div class="form-group"><label class="form-label">联系电话</label><p class="text-gray-700">${a.contactPhone}</p></div>
            <div class="form-group"><label class="form-label">状态</label><p>${getActivityStatusTag(a.status)}</p></div>
            <div class="form-group"><label class="form-label">创建日期</label><p class="text-gray-700">${a.createDate}</p></div>
            <div class="form-group col-span-2"><label class="form-label">备注</label><p class="text-gray-700">${a.remark || '无'}</p></div>
        </div>
        <div class="mt-4 p-3 bg-gray-50 rounded-lg">
            <label class="form-label mb-2">报名进度</label>
            <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div class="h-full rounded-full transition-all ${progress >= 100 ? 'bg-green-500' : progress >= 70 ? 'bg-blue-500' : 'bg-orange-400'}" style="width:${Math.min(100, progress)}%"></div>
            </div>
            <p class="text-sm text-gray-500 mt-1">${a.enrolled} / ${a.quota} 人 (${progress}%)</p>
        </div>
    `;
    showModal('活动详情 - ' + a.name, body, '', { maxWidth: '700px' });
}

function showActivityForm(a = null) {
    const isEdit = !!a;
    const title = isEdit ? '编辑活动' : '新建报名活动';
    const body = `
        <form id="activity-form">
            <div class="grid grid-cols-2 gap-4">
                <div class="form-group col-span-2">
                    <label class="form-label">活动名称 <span class="required">*</span></label>
                    <input type="text" class="form-input" id="af-name" value="${a ? a.name : ''}" placeholder="请输入活动名称">
                </div>
                <div class="form-group">
                    <label class="form-label">关联项目 <span class="required">*</span></label>
                    <input type="text" class="form-input" id="af-project" value="${a ? a.project : ''}" placeholder="请输入关联项目名称">
                </div>
                <div class="form-group">
                    <label class="form-label">报名学校 <span class="required">*</span></label>
                    <input type="text" class="form-input" id="af-school" value="${a ? a.school : ''}" placeholder="请输入报名学校">
                </div>
                <div class="form-group">
                    <label class="form-label">报名开始日期</label>
                    <input type="date" class="form-input" id="af-start" value="${a ? a.startDate : ''}">
                </div>
                <div class="form-group">
                    <label class="form-label">报名截止日期</label>
                    <input type="date" class="form-input" id="af-end" value="${a ? a.endDate : ''}">
                </div>
                <div class="form-group">
                    <label class="form-label">名额</label>
                    <input type="number" class="form-input" id="af-quota" value="${a ? a.quota : '50'}" min="1">
                </div>
                <div class="form-group">
                    <label class="form-label">已报名人数</label>
                    <input type="number" class="form-input" id="af-enrolled" value="${a ? a.enrolled : '0'}" min="0">
                </div>
                <div class="form-group">
                    <label class="form-label">联系人</label>
                    <input type="text" class="form-input" id="af-contact" value="${a ? a.contact : ''}" placeholder="请输入联系人">
                </div>
                <div class="form-group">
                    <label class="form-label">联系电话</label>
                    <input type="text" class="form-input" id="af-phone" value="${a ? a.contactPhone : ''}" placeholder="请输入联系电话">
                </div>
                <div class="form-group">
                    <label class="form-label">状态</label>
                    <select class="form-select" id="af-status">
                        ${['未开始', '报名中', '已满员', '已结束'].map(s => `<option value="${s}" ${a && a.status === s ? 'selected' : ''}>${s}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">&nbsp;</label>
                </div>
                <div class="form-group col-span-2">
                    <label class="form-label">备注</label>
                    <textarea class="form-input" id="af-remark" placeholder="请输入备注信息">${a ? a.remark : ''}</textarea>
                </div>
            </div>
        </form>
    `;
    const footer = `<button class="btn btn-outline" id="af-cancel">取消</button><button class="btn btn-primary" id="af-save">保存</button>`;
    showModal(title, body, footer, { maxWidth: '720px' });

    document.getElementById('af-cancel').addEventListener('click', closeModal);
    document.getElementById('af-save').addEventListener('click', () => {
        const name = document.getElementById('af-name').value.trim();
        const project = document.getElementById('af-project').value.trim();
        const school = document.getElementById('af-school').value.trim();
        if (!name || !project || !school) { showToast('请填写必填项', 'warning'); return; }

        const data = {
            name,
            project,
            school,
            startDate: document.getElementById('af-start').value,
            endDate: document.getElementById('af-end').value,
            quota: parseInt(document.getElementById('af-quota').value) || 50,
            enrolled: parseInt(document.getElementById('af-enrolled').value) || 0,
            contact: document.getElementById('af-contact').value.trim(),
            contactPhone: document.getElementById('af-phone').value.trim(),
            status: document.getElementById('af-status').value,
            remark: document.getElementById('af-remark').value.trim(),
        };

        if (isEdit) {
            Object.assign(a, data);
            showToast('活动更新成功', 'success');
        } else {
            data.id = 'ACT' + String(activities.length + 1).padStart(3, '0');
            data.createDate = new Date().toISOString().split('T')[0];
            activities.push(data);
            showToast('活动创建成功', 'success');
        }
        closeModal();
        render();
    });
}
