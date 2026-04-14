// school.js - 学校账号管理模块
import { showToast, showModal, closeModal, showConfirm, renderPagination, bindPaginationEvents } from './layout.js';

// 模拟学校数据
let schools = [
    { id: 'SCH001', name: '北京市第一中学', type: '初中', district: '东城区', contact: '张校长', phone: '010-65001001', address: '北京市东城区东四北大街2号', studentCount: 1200, account: 'sch_bjyz', status: '正常', createDate: '2024-03-01', desc: '北京市重点中学' },
    { id: 'SCH002', name: '北京市实验中学', type: '完全中学', district: '西城区', contact: '李副校长', phone: '010-66001002', address: '北京市西城区西单北大街127号', studentCount: 2400, account: 'sch_bjsy', status: '正常', createDate: '2024-03-15', desc: '北京市示范性高中' },
    { id: 'SCH003', name: '清华附中', type: '完全中学', district: '海淀区', contact: '王主任', phone: '010-62001003', address: '北京市海淀区中关村北路', studentCount: 3000, account: 'sch_qhfz', status: '正常', createDate: '2024-02-20', desc: '全国知名中学' },
    { id: 'SCH004', name: '北京市海淀小学', type: '小学', district: '海淀区', contact: '赵校长', phone: '010-62001004', address: '北京市海淀区海淀路12号', studentCount: 800, account: 'sch_hdxx', status: '正常', createDate: '2024-04-10', desc: '海淀区重点小学' },
    { id: 'SCH005', name: '人大附中', type: '完全中学', district: '海淀区', contact: '陈主任', phone: '010-62001005', address: '北京市海淀区中关村大街37号', studentCount: 3500, account: 'sch_rdfz', status: '正常', createDate: '2024-01-15', desc: '全国顶尖中学' },
    { id: 'SCH006', name: '北京四中', type: '高中', district: '西城区', contact: '刘校长', phone: '010-66001006', address: '北京市西城区西黄城根北街甲2号', studentCount: 1800, account: 'sch_bjsz', status: '正常', createDate: '2024-05-08', desc: '百年名校' },
    { id: 'SCH007', name: '北师大附中', type: '完全中学', district: '西城区', contact: '杨副校长', phone: '010-66001007', address: '北京市西城区南新华街18号', studentCount: 2200, account: 'sch_bsdfz', status: '停用', createDate: '2024-06-20', desc: '师范类附属中学' },
    { id: 'SCH008', name: '北京市朝阳小学', type: '小学', district: '朝阳区', contact: '吴校长', phone: '010-85001008', address: '北京市朝阳区朝阳路15号', studentCount: 600, account: 'sch_cyxx', status: '正常', createDate: '2024-07-12', desc: '朝阳区优质小学' },
    { id: 'SCH009', name: '北京十一学校', type: '完全中学', district: '海淀区', contact: '马主任', phone: '010-68001009', address: '北京市海淀区玉泉路66号', studentCount: 4000, account: 'sch_syxx', status: '正常', createDate: '2024-08-01', desc: '国家级示范校' },
    { id: 'SCH010', name: '景山学校', type: '九年一贯制', district: '东城区', contact: '孙校长', phone: '010-65001010', address: '北京市东城区灯市口大街53号', studentCount: 1500, account: 'sch_jsxx', status: '正常', createDate: '2025-01-10', desc: '教育改革实验学校' },
];

let currentPage = 1;
const pageSize = 8;
let searchKeyword = '';
let filterType = '';
let filterDistrict = '';

function getFilteredData() {
    return schools.filter(s => {
        const matchSearch = !searchKeyword || s.name.includes(searchKeyword) || s.contact.includes(searchKeyword) || s.account.includes(searchKeyword);
        const matchType = !filterType || s.type === filterType;
        const matchDistrict = !filterDistrict || s.district === filterDistrict;
        return matchSearch && matchType && matchDistrict;
    });
}

export function render() {
    const container = document.getElementById('main-content');
    const filtered = getFilteredData();
    const total = filtered.length;
    const start = (currentPage - 1) * pageSize;
    const pageData = filtered.slice(start, start + pageSize);

    const types = [...new Set(schools.map(s => s.type))];
    const districts = [...new Set(schools.map(s => s.district))];

    container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">学校账号管理</h1>
            <p class="page-desc">管理合作学校的账号信息与基本资料</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="stat-card">
                <div class="stat-icon bg-blue-50 text-blue-500"><i class="fas fa-school"></i></div>
                <div class="stat-info"><h3>${schools.length}</h3><p>学校总数</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-green-50 text-green-500"><i class="fas fa-check-circle"></i></div>
                <div class="stat-info"><h3>${schools.filter(s => s.status === '正常').length}</h3><p>正常合作</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-purple-50 text-purple-500"><i class="fas fa-user-graduate"></i></div>
                <div class="stat-info"><h3>${(schools.reduce((sum, s) => sum + s.studentCount, 0) / 1000).toFixed(1)}k</h3><p>覆盖学生</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-yellow-50 text-yellow-500"><i class="fas fa-map-marked-alt"></i></div>
                <div class="stat-info"><h3>${districts.length}</h3><p>覆盖区域</p></div>
            </div>
        </div>

        <div class="table-container" id="school-table-container">
            <div class="table-toolbar">
                <div class="flex items-center gap-3 flex-wrap">
                    <div class="table-search">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="搜索学校名称/联系人/账号..." id="school-search" value="${searchKeyword}">
                    </div>
                    <select class="form-select" style="width:auto;min-width:120px;padding:8px 32px 8px 12px;" id="school-filter-type">
                        <option value="">全部类型</option>
                        ${types.map(t => `<option value="${t}" ${filterType === t ? 'selected' : ''}>${t}</option>`).join('')}
                    </select>
                    <select class="form-select" style="width:auto;min-width:120px;padding:8px 32px 8px 12px;" id="school-filter-district">
                        <option value="">全部区域</option>
                        ${districts.map(d => `<option value="${d}" ${filterDistrict === d ? 'selected' : ''}>${d}</option>`).join('')}
                    </select>
                </div>
                <div class="table-actions">
                    <button class="btn btn-primary" id="btn-add-school"><i class="fas fa-plus"></i> 添加学校</button>
                    <button class="btn btn-outline" id="btn-export-school"><i class="fas fa-file-export"></i> 导出</button>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>学校编号</th>
                            <th>学校名称</th>
                            <th>类型</th>
                            <th>所在区域</th>
                            <th>联系人</th>
                            <th>联系电话</th>
                            <th>学生人数</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${pageData.length === 0 ? `<tr><td colspan="9"><div class="empty-state"><i class="fas fa-inbox"></i><p>暂无学校数据</p></div></td></tr>` :
                        pageData.map(s => `
                            <tr>
                                <td><span class="font-mono text-xs text-gray-500">${s.id}</span></td>
                                <td><span class="font-medium text-gray-900">${s.name}</span></td>
                                <td>${getSchoolTypeTag(s.type)}</td>
                                <td>${s.district}</td>
                                <td>${s.contact}</td>
                                <td>${s.phone}</td>
                                <td>${s.studentCount}</td>
                                <td>${s.status === '正常' ? '<span class="tag tag-green">正常</span>' : '<span class="tag tag-red">停用</span>'}</td>
                                <td>
                                    <div class="flex gap-1">
                                        <button class="btn btn-sm btn-outline btn-view-school" data-id="${s.id}" title="查看"><i class="fas fa-eye"></i></button>
                                        <button class="btn btn-sm btn-outline btn-edit-school" data-id="${s.id}" title="编辑"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-outline btn-toggle-school" data-id="${s.id}" title="${s.status === '正常' ? '停用' : '启用'}" style="color:${s.status === '正常' ? '#f59e0b' : '#22c55e'};border-color:${s.status === '正常' ? '#fcd34d' : '#86efac'};">
                                            <i class="fas ${s.status === '正常' ? 'fa-ban' : 'fa-check'}"></i>
                                        </button>
                                        <button class="btn btn-sm btn-outline btn-del-school" data-id="${s.id}" title="删除" style="color:#ef4444;border-color:#fca5a5;"><i class="fas fa-trash"></i></button>
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

function getSchoolTypeTag(type) {
    const map = { '小学': 'tag-green', '初中': 'tag-blue', '高中': 'tag-purple', '完全中学': 'tag-yellow', '九年一贯制': 'tag-red' };
    return `<span class="tag ${map[type] || 'tag-gray'}">${type}</span>`;
}

function bindEvents() {
    const container = document.getElementById('school-table-container');

    document.getElementById('school-search').addEventListener('input', (e) => {
        searchKeyword = e.target.value.trim();
        currentPage = 1;
        render();
    });

    document.getElementById('school-filter-type').addEventListener('change', (e) => {
        filterType = e.target.value;
        currentPage = 1;
        render();
    });

    document.getElementById('school-filter-district').addEventListener('change', (e) => {
        filterDistrict = e.target.value;
        currentPage = 1;
        render();
    });

    document.getElementById('btn-add-school').addEventListener('click', () => showSchoolForm());
    document.getElementById('btn-export-school').addEventListener('click', () => showToast('学校数据导出成功', 'success'));

    container.addEventListener('click', (e) => {
        const viewBtn = e.target.closest('.btn-view-school');
        const editBtn = e.target.closest('.btn-edit-school');
        const toggleBtn = e.target.closest('.btn-toggle-school');
        const delBtn = e.target.closest('.btn-del-school');

        if (viewBtn) {
            const s = schools.find(x => x.id === viewBtn.dataset.id);
            if (s) showSchoolDetail(s);
        }
        if (editBtn) {
            const s = schools.find(x => x.id === editBtn.dataset.id);
            if (s) showSchoolForm(s);
        }
        if (toggleBtn) {
            const s = schools.find(x => x.id === toggleBtn.dataset.id);
            if (s) {
                const action = s.status === '正常' ? '停用' : '启用';
                showConfirm(`确定要${action}学校"${s.name}"的账号吗？`, () => {
                    s.status = s.status === '正常' ? '停用' : '正常';
                    showToast(`学校账号已${action}`, 'success');
                    render();
                });
            }
        }
        if (delBtn) {
            showConfirm('确定要删除该学校吗？此操作不可恢复。', () => {
                schools = schools.filter(x => x.id !== delBtn.dataset.id);
                showToast('删除成功', 'success');
                render();
            });
        }
    });

    bindPaginationEvents(container, (page) => { currentPage = page; render(); });
}

function showSchoolDetail(s) {
    const body = `
        <div class="grid grid-cols-2 gap-4">
            <div class="form-group"><label class="form-label">学校编号</label><p class="text-gray-700">${s.id}</p></div>
            <div class="form-group"><label class="form-label">学校名称</label><p class="text-gray-700">${s.name}</p></div>
            <div class="form-group"><label class="form-label">类型</label><p>${getSchoolTypeTag(s.type)}</p></div>
            <div class="form-group"><label class="form-label">所在区域</label><p class="text-gray-700">${s.district}</p></div>
            <div class="form-group"><label class="form-label">联系人</label><p class="text-gray-700">${s.contact}</p></div>
            <div class="form-group"><label class="form-label">联系电话</label><p class="text-gray-700">${s.phone}</p></div>
            <div class="form-group"><label class="form-label">学生人数</label><p class="text-gray-700">${s.studentCount}</p></div>
            <div class="form-group"><label class="form-label">账号</label><p class="font-mono text-blue-600">${s.account}</p></div>
            <div class="form-group col-span-2"><label class="form-label">地址</label><p class="text-gray-700">${s.address}</p></div>
            <div class="form-group col-span-2"><label class="form-label">简介</label><p class="text-gray-700">${s.desc || '无'}</p></div>
            <div class="form-group"><label class="form-label">状态</label><p>${s.status === '正常' ? '<span class="tag tag-green">正常</span>' : '<span class="tag tag-red">停用</span>'}</p></div>
            <div class="form-group"><label class="form-label">创建日期</label><p class="text-gray-700">${s.createDate}</p></div>
        </div>
    `;
    showModal('学校详情 - ' + s.name, body, '', { maxWidth: '680px' });
}

function showSchoolForm(s = null) {
    const isEdit = !!s;
    const body = `
        <form id="school-form">
            <div class="grid grid-cols-2 gap-4">
                <div class="form-group col-span-2">
                    <label class="form-label">学校名称 <span class="required">*</span></label>
                    <input type="text" class="form-input" id="schf-name" value="${s ? s.name : ''}" placeholder="请输入学校名称">
                </div>
                <div class="form-group">
                    <label class="form-label">类型 <span class="required">*</span></label>
                    <select class="form-select" id="schf-type">
                        ${['小学','初中','高中','完全中学','九年一贯制'].map(t => `<option value="${t}" ${s && s.type === t ? 'selected' : ''}>${t}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">所在区域 <span class="required">*</span></label>
                    <select class="form-select" id="schf-district">
                        ${['东城区','西城区','海淀区','朝阳区','丰台区','石景山区','通州区','大兴区','昌平区','顺义区'].map(d => `<option value="${d}" ${s && s.district === d ? 'selected' : ''}>${d}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">联系人 <span class="required">*</span></label>
                    <input type="text" class="form-input" id="schf-contact" value="${s ? s.contact : ''}" placeholder="请输入联系人">
                </div>
                <div class="form-group">
                    <label class="form-label">联系电话 <span class="required">*</span></label>
                    <input type="text" class="form-input" id="schf-phone" value="${s ? s.phone : ''}" placeholder="请输入联系电话">
                </div>
                <div class="form-group">
                    <label class="form-label">学生人数</label>
                    <input type="number" class="form-input" id="schf-student-count" value="${s ? s.studentCount : ''}" placeholder="请输入学生人数">
                </div>
                <div class="form-group">
                    <label class="form-label">登录账号</label>
                    <input type="text" class="form-input" id="schf-account" value="${s ? s.account : ''}" placeholder="请输入登录账号">
                </div>
                <div class="form-group col-span-2">
                    <label class="form-label">地址</label>
                    <input type="text" class="form-input" id="schf-address" value="${s ? s.address : ''}" placeholder="请输入学校地址">
                </div>
                <div class="form-group col-span-2">
                    <label class="form-label">简介</label>
                    <textarea class="form-input" id="schf-desc" placeholder="请输入学校简介">${s ? s.desc : ''}</textarea>
                </div>
            </div>
        </form>
    `;
    const footer = `<button class="btn btn-outline" id="schf-cancel">取消</button><button class="btn btn-primary" id="schf-save">保存</button>`;
    showModal(isEdit ? '编辑学校' : '添加学校', body, footer, { maxWidth: '680px' });

    document.getElementById('schf-cancel').addEventListener('click', closeModal);
    document.getElementById('schf-save').addEventListener('click', () => {
        const name = document.getElementById('schf-name').value.trim();
        const contact = document.getElementById('schf-contact').value.trim();
        const phone = document.getElementById('schf-phone').value.trim();
        if (!name || !contact || !phone) { showToast('请填写必填项', 'warning'); return; }

        const data = {
            name,
            type: document.getElementById('schf-type').value,
            district: document.getElementById('schf-district').value,
            contact,
            phone,
            studentCount: parseInt(document.getElementById('schf-student-count').value) || 0,
            account: document.getElementById('schf-account').value.trim(),
            address: document.getElementById('schf-address').value.trim(),
            desc: document.getElementById('schf-desc').value.trim(),
        };

        if (isEdit) {
            Object.assign(s, data);
            showToast('学校信息更新成功', 'success');
        } else {
            data.id = 'SCH' + String(schools.length + 1).padStart(3, '0');
            data.status = '正常';
            data.createDate = new Date().toISOString().split('T')[0];
            schools.push(data);
            showToast('学校添加成功', 'success');
        }
        closeModal();
        render();
    });
}
