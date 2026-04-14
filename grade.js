// grade.js - 年级和班级管理模块
import { showToast, showModal, closeModal, showConfirm, renderPagination, bindPaginationEvents } from './layout.js';

// 模拟年级数据
let grades = [
    { id: 'GRD001', name: '一年级', level: '小学', studentCount: 180, classCount: 4, status: '正常', createDate: '2024-09-01' },
    { id: 'GRD002', name: '二年级', level: '小学', studentCount: 175, classCount: 4, status: '正常', createDate: '2024-09-01' },
    { id: 'GRD003', name: '三年级', level: '小学', studentCount: 190, classCount: 5, status: '正常', createDate: '2024-09-01' },
    { id: 'GRD004', name: '四年级', level: '小学', studentCount: 168, classCount: 4, status: '正常', createDate: '2024-09-01' },
    { id: 'GRD005', name: '五年级', level: '小学', studentCount: 172, classCount: 4, status: '正常', createDate: '2024-09-01' },
    { id: 'GRD006', name: '六年级', level: '小学', studentCount: 165, classCount: 4, status: '正常', createDate: '2024-09-01' },
    { id: 'GRD007', name: '初一', level: '初中', studentCount: 240, classCount: 6, status: '正常', createDate: '2024-09-01' },
    { id: 'GRD008', name: '初二', level: '初中', studentCount: 235, classCount: 6, status: '正常', createDate: '2024-09-01' },
    { id: 'GRD009', name: '初三', level: '初中', studentCount: 228, classCount: 6, status: '正常', createDate: '2024-09-01' },
    { id: 'GRD010', name: '高一', level: '高中', studentCount: 200, classCount: 5, status: '正常', createDate: '2025-09-01' },
    { id: 'GRD011', name: '高二', level: '高中', studentCount: 195, classCount: 5, status: '正常', createDate: '2025-09-01' },
    { id: 'GRD012', name: '高三', level: '高中', studentCount: 188, classCount: 5, status: '停用', createDate: '2025-09-01' },
];

// 模拟班级数据
let classes = [
    { id: 'CLS001', name: '一年级1班', gradeId: 'GRD001', gradeName: '一年级', teacher: '张老师', studentCount: 45, room: '101教室', status: '正常' },
    { id: 'CLS002', name: '一年级2班', gradeId: 'GRD001', gradeName: '一年级', teacher: '李老师', studentCount: 44, room: '102教室', status: '正常' },
    { id: 'CLS003', name: '一年级3班', gradeId: 'GRD001', gradeName: '一年级', teacher: '王老师', studentCount: 46, room: '103教室', status: '正常' },
    { id: 'CLS004', name: '一年级4班', gradeId: 'GRD001', gradeName: '一年级', teacher: '赵老师', studentCount: 45, room: '104教室', status: '正常' },
    { id: 'CLS005', name: '初一1班', gradeId: 'GRD007', gradeName: '初一', teacher: '刘老师', studentCount: 40, room: '201教室', status: '正常' },
    { id: 'CLS006', name: '初一2班', gradeId: 'GRD007', gradeName: '初一', teacher: '陈老师', studentCount: 40, room: '202教室', status: '正常' },
    { id: 'CLS007', name: '初一3班', gradeId: 'GRD007', gradeName: '初一', teacher: '杨老师', studentCount: 40, room: '203教室', status: '正常' },
    { id: 'CLS008', name: '初一4班', gradeId: 'GRD007', gradeName: '初一', teacher: '吴老师', studentCount: 40, room: '204教室', status: '正常' },
    { id: 'CLS009', name: '初一5班', gradeId: 'GRD007', gradeName: '初一', teacher: '黄老师', studentCount: 40, room: '205教室', status: '正常' },
    { id: 'CLS010', name: '初一6班', gradeId: 'GRD007', gradeName: '初一', teacher: '周老师', studentCount: 40, room: '206教室', status: '正常' },
    { id: 'CLS011', name: '初二1班', gradeId: 'GRD008', gradeName: '初二', teacher: '孙老师', studentCount: 39, room: '301教室', status: '正常' },
    { id: 'CLS012', name: '初二2班', gradeId: 'GRD008', gradeName: '初二', teacher: '马老师', studentCount: 40, room: '302教室', status: '正常' },
    { id: 'CLS013', name: '初二3班', gradeId: 'GRD008', gradeName: '初二', teacher: '朱老师', studentCount: 38, room: '303教室', status: '正常' },
    { id: 'CLS014', name: '初二4班', gradeId: 'GRD008', gradeName: '初二', teacher: '胡老师', studentCount: 39, room: '304教室', status: '正常' },
    { id: 'CLS015', name: '初二5班', gradeId: 'GRD008', gradeName: '初二', teacher: '林老师', studentCount: 40, room: '305教室', status: '正常' },
    { id: 'CLS016', name: '初二6班', gradeId: 'GRD008', gradeName: '初二', teacher: '郭老师', studentCount: 39, room: '306教室', status: '正常' },
    { id: 'CLS017', name: '高一1班', gradeId: 'GRD010', gradeName: '高一', teacher: '何老师', studentCount: 40, room: '401教室', status: '正常' },
    { id: 'CLS018', name: '高一2班', gradeId: 'GRD010', gradeName: '高一', teacher: '罗老师', studentCount: 40, room: '402教室', status: '正常' },
    { id: 'CLS019', name: '高一3班', gradeId: 'GRD010', gradeName: '高一', teacher: '梁老师', studentCount: 40, room: '403教室', status: '正常' },
    { id: 'CLS020', name: '高一4班', gradeId: 'GRD010', gradeName: '高一', teacher: '宋老师', studentCount: 40, room: '404教室', status: '正常' },
    { id: 'CLS021', name: '高一5班', gradeId: 'GRD010', gradeName: '高一', teacher: '唐老师', studentCount: 40, room: '405教室', status: '正常' },
];

let activeTab = 'grade'; // 'grade' | 'class'
let gradeCurrentPage = 1;
let classCurrentPage = 1;
const pageSize = 8;
let gradeSearch = '';
let classSearch = '';
let filterLevel = '';
let filterGrade = '';

function getFilteredGrades() {
    return grades.filter(g => {
        const matchSearch = !gradeSearch || g.name.includes(gradeSearch) || g.id.includes(gradeSearch);
        const matchLevel = !filterLevel || g.level === filterLevel;
        return matchSearch && matchLevel;
    });
}

function getFilteredClasses() {
    return classes.filter(c => {
        const matchSearch = !classSearch || c.name.includes(classSearch) || c.teacher.includes(classSearch);
        const matchGrade = !filterGrade || c.gradeId === filterGrade;
        return matchSearch && matchGrade;
    });
}

export function render() {
    const container = document.getElementById('main-content');

    const totalStudents = grades.reduce((s, g) => s + g.studentCount, 0);
    const totalClasses = classes.length;
    const activeGrades = grades.filter(g => g.status === '正常').length;

    container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">年级班级管理</h1>
            <p class="page-desc">管理学校年级和班级的组织架构</p>
        </div>

        <!-- 统计卡片 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="stat-card">
                <div class="stat-icon bg-blue-50 text-blue-500"><i class="fas fa-layer-group"></i></div>
                <div class="stat-info"><h3>${grades.length}</h3><p>年级总数</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-green-50 text-green-500"><i class="fas fa-chalkboard"></i></div>
                <div class="stat-info"><h3>${totalClasses}</h3><p>班级总数</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-purple-50 text-purple-500"><i class="fas fa-user-graduate"></i></div>
                <div class="stat-info"><h3>${totalStudents}</h3><p>学生总数</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-yellow-50 text-yellow-500"><i class="fas fa-check-circle"></i></div>
                <div class="stat-info"><h3>${activeGrades}</h3><p>在用年级</p></div>
            </div>
        </div>

        <!-- Tab切换 -->
        <div class="tabs mb-0" id="grade-tabs" style="margin-bottom:0;">
            <div class="tab-item ${activeTab === 'grade' ? 'active' : ''}" data-tab="grade">年级管理</div>
            <div class="tab-item ${activeTab === 'class' ? 'active' : ''}" data-tab="class">班级管理</div>
        </div>

        <!-- 内容区 -->
        <div id="grade-tab-content"></div>
    `;

    if (activeTab === 'grade') {
        renderGradeTab();
    } else {
        renderClassTab();
    }
    bindTabEvents();
}

function renderGradeTab() {
    const contentEl = document.getElementById('grade-tab-content');
    const filtered = getFilteredGrades();
    const total = filtered.length;
    const start = (gradeCurrentPage - 1) * pageSize;
    const pageData = filtered.slice(start, start + pageSize);

    contentEl.innerHTML = `
        <div class="table-container" id="grade-table-container" style="border-top-left-radius:0;border-top-right-radius:0;">
            <div class="table-toolbar">
                <div class="flex items-center gap-3 flex-wrap">
                    <div class="table-search">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="搜索年级名称/编号..." id="grade-search" value="${gradeSearch}">
                    </div>
                    <select class="form-select" style="width:auto;min-width:120px;padding:8px 32px 8px 12px;" id="grade-filter-level">
                        <option value="">全部学段</option>
                        <option value="小学" ${filterLevel === '小学' ? 'selected' : ''}>小学</option>
                        <option value="初中" ${filterLevel === '初中' ? 'selected' : ''}>初中</option>
                        <option value="高中" ${filterLevel === '高中' ? 'selected' : ''}>高中</option>
                    </select>
                </div>
                <div class="table-actions">
                    <button class="btn btn-primary" id="btn-add-grade"><i class="fas fa-plus"></i> 添加年级</button>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>编号</th>
                            <th>年级名称</th>
                            <th>学段</th>
                            <th>班级数</th>
                            <th>学生数</th>
                            <th>状态</th>
                            <th>创建日期</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${pageData.length === 0 ? `<tr><td colspan="8"><div class="empty-state"><i class="fas fa-inbox"></i><p>暂无年级数据</p></div></td></tr>` :
                        pageData.map(g => `
                            <tr>
                                <td><span class="font-mono text-xs text-gray-500">${g.id}</span></td>
                                <td><span class="font-medium text-gray-900">${g.name}</span></td>
                                <td>${getLevelTag(g.level)}</td>
                                <td>${g.classCount}个</td>
                                <td>${g.studentCount}人</td>
                                <td>${g.status === '正常' ? '<span class="tag tag-green">正常</span>' : '<span class="tag tag-red">停用</span>'}</td>
                                <td>${g.createDate}</td>
                                <td>
                                    <div class="flex gap-1">
                                        <button class="btn btn-sm btn-outline btn-edit-grade" data-id="${g.id}" title="编辑"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-outline btn-toggle-grade" data-id="${g.id}" title="${g.status === '正常' ? '停用' : '启用'}" style="color:${g.status === '正常' ? '#f59e0b' : '#22c55e'};border-color:${g.status === '正常' ? '#fcd34d' : '#86efac'};">
                                            <i class="fas ${g.status === '正常' ? 'fa-ban' : 'fa-check'}"></i>
                                        </button>
                                        <button class="btn btn-sm btn-outline btn-del-grade" data-id="${g.id}" title="删除" style="color:#ef4444;border-color:#fca5a5;"><i class="fas fa-trash"></i></button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            ${renderPagination(gradeCurrentPage, total, pageSize)}
        </div>
    `;
    bindGradeEvents();
}

function renderClassTab() {
    const contentEl = document.getElementById('grade-tab-content');
    const filtered = getFilteredClasses();
    const total = filtered.length;
    const start = (classCurrentPage - 1) * pageSize;
    const pageData = filtered.slice(start, start + pageSize);

    contentEl.innerHTML = `
        <div class="table-container" id="class-table-container" style="border-top-left-radius:0;border-top-right-radius:0;">
            <div class="table-toolbar">
                <div class="flex items-center gap-3 flex-wrap">
                    <div class="table-search">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="搜索班级名称/班主任..." id="class-search" value="${classSearch}">
                    </div>
                    <select class="form-select" style="width:auto;min-width:140px;padding:8px 32px 8px 12px;" id="class-filter-grade">
                        <option value="">全部年级</option>
                        ${grades.map(g => `<option value="${g.id}" ${filterGrade === g.id ? 'selected' : ''}>${g.name}</option>`).join('')}
                    </select>
                </div>
                <div class="table-actions">
                    <button class="btn btn-primary" id="btn-add-class"><i class="fas fa-plus"></i> 添加班级</button>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>编号</th>
                            <th>班级名称</th>
                            <th>所属年级</th>
                            <th>班主任</th>
                            <th>学生数</th>
                            <th>教室</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${pageData.length === 0 ? `<tr><td colspan="8"><div class="empty-state"><i class="fas fa-inbox"></i><p>暂无班级数据</p></div></td></tr>` :
                        pageData.map(c => `
                            <tr>
                                <td><span class="font-mono text-xs text-gray-500">${c.id}</span></td>
                                <td><span class="font-medium text-gray-900">${c.name}</span></td>
                                <td><span class="tag tag-blue">${c.gradeName}</span></td>
                                <td>${c.teacher}</td>
                                <td>${c.studentCount}人</td>
                                <td>${c.room}</td>
                                <td>${c.status === '正常' ? '<span class="tag tag-green">正常</span>' : '<span class="tag tag-red">停用</span>'}</td>
                                <td>
                                    <div class="flex gap-1">
                                        <button class="btn btn-sm btn-outline btn-edit-class" data-id="${c.id}" title="编辑"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-outline btn-del-class" data-id="${c.id}" title="删除" style="color:#ef4444;border-color:#fca5a5;"><i class="fas fa-trash"></i></button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            ${renderPagination(classCurrentPage, total, pageSize)}
        </div>
    `;
    bindClassEvents();
}

function getLevelTag(level) {
    const map = { '小学': 'tag-green', '初中': 'tag-blue', '高中': 'tag-purple' };
    return `<span class="tag ${map[level] || 'tag-gray'}">${level}</span>`;
}

function bindTabEvents() {
    document.getElementById('grade-tabs').addEventListener('click', (e) => {
        const tab = e.target.closest('.tab-item');
        if (tab) {
            activeTab = tab.dataset.tab;
            render();
        }
    });
}

function bindGradeEvents() {
    const container = document.getElementById('grade-table-container');

    document.getElementById('grade-search').addEventListener('input', (e) => {
        gradeSearch = e.target.value.trim();
        gradeCurrentPage = 1;
        render();
    });

    document.getElementById('grade-filter-level').addEventListener('change', (e) => {
        filterLevel = e.target.value;
        gradeCurrentPage = 1;
        render();
    });

    document.getElementById('btn-add-grade').addEventListener('click', () => showGradeForm());

    container.addEventListener('click', (e) => {
        const editBtn = e.target.closest('.btn-edit-grade');
        const toggleBtn = e.target.closest('.btn-toggle-grade');
        const delBtn = e.target.closest('.btn-del-grade');

        if (editBtn) {
            const g = grades.find(x => x.id === editBtn.dataset.id);
            if (g) showGradeForm(g);
        }
        if (toggleBtn) {
            const g = grades.find(x => x.id === toggleBtn.dataset.id);
            if (g) {
                const action = g.status === '正常' ? '停用' : '启用';
                showConfirm(`确定要${action}年级"${g.name}"吗？`, () => {
                    g.status = g.status === '正常' ? '停用' : '正常';
                    showToast(`年级已${action}`, 'success');
                    render();
                });
            }
        }
        if (delBtn) {
            showConfirm('确定要删除该年级吗？此操作不可恢复。', () => {
                grades = grades.filter(x => x.id !== delBtn.dataset.id);
                showToast('删除成功', 'success');
                render();
            });
        }
    });

    bindPaginationEvents(container, (page) => { gradeCurrentPage = page; render(); });
}

function bindClassEvents() {
    const container = document.getElementById('class-table-container');

    document.getElementById('class-search').addEventListener('input', (e) => {
        classSearch = e.target.value.trim();
        classCurrentPage = 1;
        render();
    });

    document.getElementById('class-filter-grade').addEventListener('change', (e) => {
        filterGrade = e.target.value;
        classCurrentPage = 1;
        render();
    });

    document.getElementById('btn-add-class').addEventListener('click', () => showClassForm());

    container.addEventListener('click', (e) => {
        const editBtn = e.target.closest('.btn-edit-class');
        const delBtn = e.target.closest('.btn-del-class');

        if (editBtn) {
            const c = classes.find(x => x.id === editBtn.dataset.id);
            if (c) showClassForm(c);
        }
        if (delBtn) {
            showConfirm('确定要删除该班级吗？此操作不可恢复。', () => {
                classes = classes.filter(x => x.id !== delBtn.dataset.id);
                showToast('删除成功', 'success');
                render();
            });
        }
    });

    bindPaginationEvents(container, (page) => { classCurrentPage = page; render(); });
}

function showGradeForm(g = null) {
    const isEdit = !!g;
    const body = `
        <form id="grade-form">
            <div class="grid grid-cols-2 gap-4">
                <div class="form-group col-span-2">
                    <label class="form-label">年级名称 <span class="required">*</span></label>
                    <input type="text" class="form-input" id="gf-name" value="${g ? g.name : ''}" placeholder="请输入年级名称，如：初一">
                </div>
                <div class="form-group">
                    <label class="form-label">学段 <span class="required">*</span></label>
                    <select class="form-select" id="gf-level">
                        ${['小学', '初中', '高中'].map(l => `<option value="${l}" ${g && g.level === l ? 'selected' : ''}>${l}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">班级数</label>
                    <input type="number" class="form-input" id="gf-classcount" value="${g ? g.classCount : 4}" placeholder="班级数量" min="1">
                </div>
            </div>
        </form>
    `;
    const footer = `<button class="btn btn-outline" id="gf-cancel">取消</button><button class="btn btn-primary" id="gf-save">保存</button>`;
    showModal(isEdit ? '编辑年级' : '添加年级', body, footer);

    document.getElementById('gf-cancel').addEventListener('click', closeModal);
    document.getElementById('gf-save').addEventListener('click', () => {
        const name = document.getElementById('gf-name').value.trim();
        if (!name) { showToast('请填写年级名称', 'warning'); return; }

        const data = {
            name,
            level: document.getElementById('gf-level').value,
            classCount: parseInt(document.getElementById('gf-classcount').value) || 4,
        };

        if (isEdit) {
            Object.assign(g, data);
            showToast('年级信息更新成功', 'success');
        } else {
            data.id = 'GRD' + String(grades.length + 1).padStart(3, '0');
            data.studentCount = 0;
            data.status = '正常';
            data.createDate = new Date().toISOString().split('T')[0];
            grades.push(data);
            showToast('年级添加成功', 'success');
        }
        closeModal();
        render();
    });
}

function showClassForm(c = null) {
    const isEdit = !!c;
    const body = `
        <form id="class-form">
            <div class="grid grid-cols-2 gap-4">
                <div class="form-group col-span-2">
                    <label class="form-label">班级名称 <span class="required">*</span></label>
                    <input type="text" class="form-input" id="cf-name" value="${c ? c.name : ''}" placeholder="请输入班级名称，如：初一1班">
                </div>
                <div class="form-group">
                    <label class="form-label">所属年级 <span class="required">*</span></label>
                    <select class="form-select" id="cf-grade">
                        ${grades.map(g => `<option value="${g.id}" ${c && c.gradeId === g.id ? 'selected' : ''}>${g.name}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">班主任 <span class="required">*</span></label>
                    <input type="text" class="form-input" id="cf-teacher" value="${c ? c.teacher : ''}" placeholder="请输入班主任姓名">
                </div>
                <div class="form-group">
                    <label class="form-label">教室</label>
                    <input type="text" class="form-input" id="cf-room" value="${c ? c.room : ''}" placeholder="请输入教室编号">
                </div>
                <div class="form-group">
                    <label class="form-label">学生数</label>
                    <input type="number" class="form-input" id="cf-studentcount" value="${c ? c.studentCount : 0}" placeholder="学生人数" min="0">
                </div>
            </div>
        </form>
    `;
    const footer = `<button class="btn btn-outline" id="cf-cancel">取消</button><button class="btn btn-primary" id="cf-save">保存</button>`;
    showModal(isEdit ? '编辑班级' : '添加班级', body, footer);

    document.getElementById('cf-cancel').addEventListener('click', closeModal);
    document.getElementById('cf-save').addEventListener('click', () => {
        const name = document.getElementById('cf-name').value.trim();
        const teacher = document.getElementById('cf-teacher').value.trim();
        if (!name || !teacher) { showToast('请填写必填项', 'warning'); return; }

        const gradeId = document.getElementById('cf-grade').value;
        const grade = grades.find(g => g.id === gradeId);

        const data = {
            name,
            gradeId,
            gradeName: grade ? grade.name : '',
            teacher,
            room: document.getElementById('cf-room').value.trim(),
            studentCount: parseInt(document.getElementById('cf-studentcount').value) || 0,
        };

        if (isEdit) {
            Object.assign(c, data);
            showToast('班级信息更新成功', 'success');
        } else {
            data.id = 'CLS' + String(classes.length + 1).padStart(3, '0');
            data.status = '正常';
            classes.push(data);
            showToast('班级添加成功', 'success');
        }
        closeModal();
        render();
    });
}
