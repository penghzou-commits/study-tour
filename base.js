// base.js - 基地账号管理模块
import { showToast, showModal, closeModal, showConfirm, renderPagination, bindPaginationEvents } from './layout.js';

// 模拟基地数据
let bases = [
    { id: 'BASE001', name: '北京科技研学基地', contact: '王建华', phone: '010-88001001', address: '北京市海淀区中关村南大街5号', type: '科技类', capacity: 200, status: '正常', account: 'base_bjkj', createDate: '2024-06-15', desc: '以科技创新为主题的综合性研学基地' },
    { id: 'BASE002', name: '长城文化研学营地', contact: '李国强', phone: '010-69001002', address: '北京市延庆区八达岭镇', type: '历史文化', capacity: 300, status: '正常', account: 'base_ccwh', createDate: '2024-03-20', desc: '依托长城文化资源开展历史研学' },
    { id: 'BASE003', name: '密云生态农业基地', contact: '张秀英', phone: '010-69001003', address: '北京市密云区溪翁庄镇', type: '自然生态', capacity: 150, status: '正常', account: 'base_mysn', createDate: '2024-08-10', desc: '农业体验与生态教育研学基地' },
    { id: 'BASE004', name: '故宫博物院研学中心', contact: '陈文博', phone: '010-85001004', address: '北京市东城区景山前街4号', type: '历史文化', capacity: 100, status: '正常', account: 'base_ggby', createDate: '2024-01-08', desc: '故宫文化深度研学体验' },
    { id: 'BASE005', name: '中科院科学探索营', contact: '刘明辉', phone: '010-82001005', address: '北京市海淀区中关村北一条15号', type: '科技类', capacity: 120, status: '停用', account: 'base_zkyk', createDate: '2024-05-22', desc: '中科院科研资源开放研学' },
    { id: 'BASE006', name: '怀柔户外拓展基地', contact: '赵志远', phone: '010-69001006', address: '北京市怀柔区雁栖湖镇', type: '户外拓展', capacity: 250, status: '正常', account: 'base_hrhw', createDate: '2024-07-01', desc: '户外拓展与团队建设研学基地' },
    { id: 'BASE007', name: '国家植物园研学点', contact: '孙丽华', phone: '010-62001007', address: '北京市海淀区香山路', type: '自然生态', capacity: 180, status: '正常', account: 'base_gjzw', createDate: '2025-01-15', desc: '植物科学与生态保护研学' },
    { id: 'BASE008', name: '航天科普教育基地', contact: '周航', phone: '010-68001008', address: '北京市丰台区东高地', type: '科技类', capacity: 160, status: '正常', account: 'base_htkp', createDate: '2025-02-20', desc: '航天科技主题研学教育基地' },
];

let currentPage = 1;
const pageSize = 8;
let searchKeyword = '';
let filterType = '';

function getFilteredData() {
    return bases.filter(b => {
        const matchSearch = !searchKeyword || b.name.includes(searchKeyword) || b.contact.includes(searchKeyword) || b.account.includes(searchKeyword);
        const matchType = !filterType || b.type === filterType;
        return matchSearch && matchType;
    });
}

export function render() {
    const container = document.getElementById('main-content');
    const filtered = getFilteredData();
    const total = filtered.length;
    const start = (currentPage - 1) * pageSize;
    const pageData = filtered.slice(start, start + pageSize);

    const types = [...new Set(bases.map(b => b.type))];

    container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">基地账号管理</h1>
            <p class="page-desc">管理研学基地的账号信息与基本资料</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="stat-card">
                <div class="stat-icon bg-blue-50 text-blue-500"><i class="fas fa-building"></i></div>
                <div class="stat-info"><h3>${bases.length}</h3><p>基地总数</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-green-50 text-green-500"><i class="fas fa-check-circle"></i></div>
                <div class="stat-info"><h3>${bases.filter(b => b.status === '正常').length}</h3><p>正常运营</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-red-50 text-red-500"><i class="fas fa-ban"></i></div>
                <div class="stat-info"><h3>${bases.filter(b => b.status === '停用').length}</h3><p>已停用</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-purple-50 text-purple-500"><i class="fas fa-users"></i></div>
                <div class="stat-info"><h3>${bases.reduce((sum, b) => sum + b.capacity, 0)}</h3><p>总容纳人数</p></div>
            </div>
        </div>

        <div class="table-container" id="base-table-container">
            <div class="table-toolbar">
                <div class="flex items-center gap-3 flex-wrap">
                    <div class="table-search">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="搜索基地名称/联系人/账号..." id="base-search" value="${searchKeyword}">
                    </div>
                    <select class="form-select" style="width:auto;min-width:120px;padding:8px 32px 8px 12px;" id="base-filter-type">
                        <option value="">全部类型</option>
                        ${types.map(t => `<option value="${t}" ${filterType === t ? 'selected' : ''}>${t}</option>`).join('')}
                    </select>
                </div>
                <div class="table-actions">
                    <button class="btn btn-primary" id="btn-add-base"><i class="fas fa-plus"></i> 添加基地</button>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>基地编号</th>
                            <th>基地名称</th>
                            <th>类型</th>
                            <th>联系人</th>
                            <th>联系电话</th>
                            <th>容纳人数</th>
                            <th>账号</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${pageData.length === 0 ? `<tr><td colspan="9"><div class="empty-state"><i class="fas fa-inbox"></i><p>暂无基地数据</p></div></td></tr>` :
                        pageData.map(b => `
                            <tr>
                                <td><span class="font-mono text-xs text-gray-500">${b.id}</span></td>
                                <td><span class="font-medium text-gray-900">${b.name}</span></td>
                                <td>${getTypeTag(b.type)}</td>
                                <td>${b.contact}</td>
                                <td>${b.phone}</td>
                                <td>${b.capacity}人</td>
                                <td><span class="font-mono text-xs text-blue-600">${b.account}</span></td>
                                <td>${b.status === '正常' ? '<span class="tag tag-green">正常</span>' : '<span class="tag tag-red">停用</span>'}</td>
                                <td>
                                    <div class="flex gap-1">
                                        <button class="btn btn-sm btn-outline btn-view-base" data-id="${b.id}" title="查看"><i class="fas fa-eye"></i></button>
                                        <button class="btn btn-sm btn-outline btn-edit-base" data-id="${b.id}" title="编辑"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-outline btn-toggle-base" data-id="${b.id}" title="${b.status === '正常' ? '停用' : '启用'}" style="color:${b.status === '正常' ? '#f59e0b' : '#22c55e'};border-color:${b.status === '正常' ? '#fcd34d' : '#86efac'};">
                                            <i class="fas ${b.status === '正常' ? 'fa-ban' : 'fa-check'}"></i>
                                        </button>
                                        <button class="btn btn-sm btn-outline btn-del-base" data-id="${b.id}" title="删除" style="color:#ef4444;border-color:#fca5a5;"><i class="fas fa-trash"></i></button>
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

function getTypeTag(type) {
    const map = { '科技类': 'tag-blue', '历史文化': 'tag-purple', '自然生态': 'tag-green', '户外拓展': 'tag-yellow' };
    return `<span class="tag ${map[type] || 'tag-gray'}">${type}</span>`;
}

function bindEvents() {
    const container = document.getElementById('base-table-container');

    document.getElementById('base-search').addEventListener('input', (e) => {
        searchKeyword = e.target.value.trim();
        currentPage = 1;
        render();
    });

    document.getElementById('base-filter-type').addEventListener('change', (e) => {
        filterType = e.target.value;
        currentPage = 1;
        render();
    });

    document.getElementById('btn-add-base').addEventListener('click', () => showBaseForm());

    container.addEventListener('click', (e) => {
        const viewBtn = e.target.closest('.btn-view-base');
        const editBtn = e.target.closest('.btn-edit-base');
        const toggleBtn = e.target.closest('.btn-toggle-base');
        const delBtn = e.target.closest('.btn-del-base');

        if (viewBtn) {
            const b = bases.find(x => x.id === viewBtn.dataset.id);
            if (b) showBaseDetail(b);
        }
        if (editBtn) {
            const b = bases.find(x => x.id === editBtn.dataset.id);
            if (b) showBaseForm(b);
        }
        if (toggleBtn) {
            const b = bases.find(x => x.id === toggleBtn.dataset.id);
            if (b) {
                const action = b.status === '正常' ? '停用' : '启用';
                showConfirm(`确定要${action}基地"${b.name}"吗？`, () => {
                    b.status = b.status === '正常' ? '停用' : '正常';
                    showToast(`基地已${action}`, 'success');
                    render();
                });
            }
        }
        if (delBtn) {
            showConfirm('确定要删除该基地吗？此操作不可恢复。', () => {
                bases = bases.filter(x => x.id !== delBtn.dataset.id);
                showToast('删除成功', 'success');
                render();
            });
        }
    });

    bindPaginationEvents(container, (page) => { currentPage = page; render(); });
}

function showBaseDetail(b) {
    const body = `
        <div class="grid grid-cols-2 gap-4">
            <div class="form-group"><label class="form-label">基地编号</label><p class="text-gray-700">${b.id}</p></div>
            <div class="form-group"><label class="form-label">基地名称</label><p class="text-gray-700">${b.name}</p></div>
            <div class="form-group"><label class="form-label">类型</label><p>${getTypeTag(b.type)}</p></div>
            <div class="form-group"><label class="form-label">联系人</label><p class="text-gray-700">${b.contact}</p></div>
            <div class="form-group"><label class="form-label">联系电话</label><p class="text-gray-700">${b.phone}</p></div>
            <div class="form-group"><label class="form-label">容纳人数</label><p class="text-gray-700">${b.capacity}人</p></div>
            <div class="form-group"><label class="form-label">账号</label><p class="font-mono text-blue-600">${b.account}</p></div>
            <div class="form-group"><label class="form-label">状态</label><p>${b.status === '正常' ? '<span class="tag tag-green">正常</span>' : '<span class="tag tag-red">停用</span>'}</p></div>
            <div class="form-group col-span-2"><label class="form-label">地址</label><p class="text-gray-700">${b.address}</p></div>
            <div class="form-group col-span-2"><label class="form-label">简介</label><p class="text-gray-700">${b.desc || '无'}</p></div>
            <div class="form-group"><label class="form-label">创建日期</label><p class="text-gray-700">${b.createDate}</p></div>
        </div>
    `;
    showModal('基地详情 - ' + b.name, body, '', { maxWidth: '680px' });
}

function showBaseForm(b = null) {
    const isEdit = !!b;
    const body = `
        <form id="base-form">
            <div class="grid grid-cols-2 gap-4">
                <div class="form-group col-span-2">
                    <label class="form-label">基地名称 <span class="required">*</span></label>
                    <input type="text" class="form-input" id="bf-name" value="${b ? b.name : ''}" placeholder="请输入基地名称">
                </div>
                <div class="form-group">
                    <label class="form-label">类型 <span class="required">*</span></label>
                    <select class="form-select" id="bf-type">
                        ${['科技类','历史文化','自然生态','户外拓展','艺术体验','军事国防'].map(t => `<option value="${t}" ${b && b.type === t ? 'selected' : ''}>${t}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">容纳人数 <span class="required">*</span></label>
                    <input type="number" class="form-input" id="bf-capacity" value="${b ? b.capacity : ''}" placeholder="请输入容纳人数">
                </div>
                <div class="form-group">
                    <label class="form-label">联系人 <span class="required">*</span></label>
                    <input type="text" class="form-input" id="bf-contact" value="${b ? b.contact : ''}" placeholder="请输入联系人">
                </div>
                <div class="form-group">
                    <label class="form-label">联系电话 <span class="required">*</span></label>
                    <input type="text" class="form-input" id="bf-phone" value="${b ? b.phone : ''}" placeholder="请输入联系电话">
                </div>
                <div class="form-group col-span-2">
                    <label class="form-label">地址 <span class="required">*</span></label>
                    <input type="text" class="form-input" id="bf-address" value="${b ? b.address : ''}" placeholder="请输入基地地址">
                </div>
                <div class="form-group col-span-2">
                    <label class="form-label">登录账号</label>
                    <input type="text" class="form-input" id="bf-account" value="${b ? b.account : ''}" placeholder="请输入登录账号">
                </div>
                <div class="form-group col-span-2">
                    <label class="form-label">简介</label>
                    <textarea class="form-input" id="bf-desc" placeholder="请输入基地简介">${b ? b.desc : ''}</textarea>
                </div>
            </div>
        </form>
    `;
    const footer = `<button class="btn btn-outline" id="bf-cancel">取消</button><button class="btn btn-primary" id="bf-save">保存</button>`;
    showModal(isEdit ? '编辑基地' : '添加基地', body, footer, { maxWidth: '680px' });

    document.getElementById('bf-cancel').addEventListener('click', closeModal);
    document.getElementById('bf-save').addEventListener('click', () => {
        const name = document.getElementById('bf-name').value.trim();
        const contact = document.getElementById('bf-contact').value.trim();
        const phone = document.getElementById('bf-phone').value.trim();
        const address = document.getElementById('bf-address').value.trim();
        const capacity = document.getElementById('bf-capacity').value;
        if (!name || !contact || !phone || !address || !capacity) { showToast('请填写必填项', 'warning'); return; }

        const data = {
            name,
            type: document.getElementById('bf-type').value,
            capacity: parseInt(capacity),
            contact,
            phone,
            address,
            account: document.getElementById('bf-account').value.trim(),
            desc: document.getElementById('bf-desc').value.trim(),
        };

        if (isEdit) {
            Object.assign(b, data);
            showToast('基地信息更新成功', 'success');
        } else {
            data.id = 'BASE' + String(bases.length + 1).padStart(3, '0');
            data.status = '正常';
            data.createDate = new Date().toISOString().split('T')[0];
            bases.push(data);
            showToast('基地添加成功', 'success');
        }
        closeModal();
        render();
    });
}
