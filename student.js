// student.js - 学生管理模块
import { showToast, showModal, closeModal, showConfirm, renderPagination, bindPaginationEvents } from './layout.js';

// 模拟学生数据
let students = [
    { id: 'STU001', name: '张明远', gender: '男', age: 14, grade: '初二', school: '北京市第一中学', phone: '13800001001', parentName: '张建国', parentPhone: '13900001001', status: '正常', joinDate: '2025-09-01', remark: '' },
    { id: 'STU002', name: '李思涵', gender: '女', age: 13, grade: '初一', school: '北京市实验中学', phone: '13800001002', parentName: '李伟', parentPhone: '13900001002', status: '正常', joinDate: '2025-09-01', remark: '' },
    { id: 'STU003', name: '王浩然', gender: '男', age: 15, grade: '初三', school: '清华附中', phone: '13800001003', parentName: '王强', parentPhone: '13900001003', status: '正常', joinDate: '2025-08-15', remark: '特长生' },
    { id: 'STU004', name: '赵雨萱', gender: '女', age: 12, grade: '六年级', school: '北京市海淀小学', phone: '13800001004', parentName: '赵磊', parentPhone: '13900001004', status: '正常', joinDate: '2025-09-05', remark: '' },
    { id: 'STU005', name: '刘子轩', gender: '男', age: 14, grade: '初二', school: '人大附中', phone: '13800001005', parentName: '刘洋', parentPhone: '13900001005', status: '已毕业', joinDate: '2024-09-01', remark: '' },
    { id: 'STU006', name: '陈思琪', gender: '女', age: 13, grade: '初一', school: '北京四中', phone: '13800001006', parentName: '陈刚', parentPhone: '13900001006', status: '正常', joinDate: '2025-09-01', remark: '' },
    { id: 'STU007', name: '杨博文', gender: '男', age: 15, grade: '初三', school: '北师大附中', phone: '13800001007', parentName: '杨帆', parentPhone: '13900001007', status: '正常', joinDate: '2025-03-10', remark: '班长' },
    { id: 'STU008', name: '吴佳怡', gender: '女', age: 14, grade: '初二', school: '北京市第一中学', phone: '13800001008', parentName: '吴鹏', parentPhone: '13900001008', status: '休学', joinDate: '2025-09-01', remark: '因病休学' },
    { id: 'STU009', name: '黄梓涵', gender: '男', age: 12, grade: '六年级', school: '北京市朝阳小学', phone: '13800001009', parentName: '黄勇', parentPhone: '13900001009', status: '正常', joinDate: '2025-09-01', remark: '' },
    { id: 'STU010', name: '周雅琪', gender: '女', age: 13, grade: '初一', school: '北京市实验中学', phone: '13800001010', parentName: '周明', parentPhone: '13900001010', status: '正常', joinDate: '2025-09-01', remark: '' },
    { id: 'STU011', name: '孙宇航', gender: '男', age: 14, grade: '初二', school: '清华附中', phone: '13800001011', parentName: '孙涛', parentPhone: '13900001011', status: '正常', joinDate: '2025-09-01', remark: '' },
    { id: 'STU012', name: '马晓彤', gender: '女', age: 15, grade: '初三', school: '人大附中', phone: '13800001012', parentName: '马超', parentPhone: '13900001012', status: '正常', joinDate: '2024-09-01', remark: '学习委员' },
];

let currentPage = 1;
const pageSize = 8;
let searchKeyword = '';
let filterStatus = '';

// 获取过滤后的数据
function getFilteredData() {
    return students.filter(s => {
        const matchSearch = !searchKeyword || s.name.includes(searchKeyword) || s.id.includes(searchKeyword) || s.school.includes(searchKeyword) || s.phone.includes(searchKeyword);
        const matchStatus = !filterStatus || s.status === filterStatus;
        return matchSearch && matchStatus;
    });
}

// 渲染页面
export function render() {
    const container = document.getElementById('main-content');
    const filtered = getFilteredData();
    const total = filtered.length;
    const start = (currentPage - 1) * pageSize;
    const pageData = filtered.slice(start, start + pageSize);

    const statusCounts = {
        total: students.length,
        normal: students.filter(s => s.status === '正常').length,
        graduated: students.filter(s => s.status === '已毕业').length,
        suspended: students.filter(s => s.status === '休学').length,
    };

    container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">学生管理</h1>
            <p class="page-desc">管理研学活动参与学生的基本信息</p>
        </div>

        <!-- 统计卡片 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="stat-card">
                <div class="stat-icon bg-blue-50 text-blue-500"><i class="fas fa-users"></i></div>
                <div class="stat-info"><h3>${statusCounts.total}</h3><p>学生总数</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-green-50 text-green-500"><i class="fas fa-user-check"></i></div>
                <div class="stat-info"><h3>${statusCounts.normal}</h3><p>正常在读</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-purple-50 text-purple-500"><i class="fas fa-user-graduate"></i></div>
                <div class="stat-info"><h3>${statusCounts.graduated}</h3><p>已毕业</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-yellow-50 text-yellow-500"><i class="fas fa-user-clock"></i></div>
                <div class="stat-info"><h3>${statusCounts.suspended}</h3><p>休学中</p></div>
            </div>
        </div>

        <!-- 表格 -->
        <div class="table-container" id="student-table-container">
            <div class="table-toolbar">
                <div class="flex items-center gap-3 flex-wrap">
                    <div class="table-search">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="搜索姓名/学号/学校/手机号..." id="student-search" value="${searchKeyword}">
                    </div>
                    <select class="form-select" style="width:auto;min-width:120px;padding:8px 32px 8px 12px;" id="student-filter-status">
                        <option value="">全部状态</option>
                        <option value="正常" ${filterStatus === '正常' ? 'selected' : ''}>正常</option>
                        <option value="已毕业" ${filterStatus === '已毕业' ? 'selected' : ''}>已毕业</option>
                        <option value="休学" ${filterStatus === '休学' ? 'selected' : ''}>休学</option>
                    </select>
                </div>
                <div class="table-actions">
                    <button class="btn btn-primary" id="btn-add-student"><i class="fas fa-plus"></i> 添加学生</button>
                    <button class="btn btn-outline" id="btn-export-student"><i class="fas fa-file-export"></i> 导出</button>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>学号</th>
                            <th>姓名</th>
                            <th>性别</th>
                            <th>年龄</th>
                            <th>年级</th>
                            <th>所属学校</th>
                            <th>联系电话</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${pageData.length === 0 ? `<tr><td colspan="9"><div class="empty-state"><i class="fas fa-inbox"></i><p>暂无学生数据</p></div></td></tr>` :
                        pageData.map(s => `
                            <tr>
                                <td><span class="font-mono text-xs text-gray-500">${s.id}</span></td>
                                <td><span class="font-medium text-gray-900">${s.name}</span></td>
                                <td>${s.gender === '男' ? '<span class="tag tag-blue">男</span>' : '<span class="tag tag-red">女</span>'}</td>
                                <td>${s.age}</td>
                                <td>${s.grade}</td>
                                <td>${s.school}</td>
                                <td>${s.phone}</td>
                                <td>${getStatusTag(s.status)}</td>
                                <td>
                                    <div class="flex gap-1">
                                        <button class="btn btn-sm btn-outline btn-view-student" data-id="${s.id}" title="查看"><i class="fas fa-eye"></i></button>
                                        <button class="btn btn-sm btn-outline btn-edit-student" data-id="${s.id}" title="编辑"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-outline btn-del-student" data-id="${s.id}" title="删除" style="color:#ef4444;border-color:#fca5a5;"><i class="fas fa-trash"></i></button>
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

function getStatusTag(status) {
    const map = { '正常': 'tag-green', '已毕业': 'tag-purple', '休学': 'tag-yellow' };
    return `<span class="tag ${map[status] || 'tag-gray'}">${status}</span>`;
}

function bindEvents() {
    const container = document.getElementById('student-table-container');

    // 搜索
    document.getElementById('student-search').addEventListener('input', (e) => {
        searchKeyword = e.target.value.trim();
        currentPage = 1;
        render();
    });

    // 状态筛选
    document.getElementById('student-filter-status').addEventListener('change', (e) => {
        filterStatus = e.target.value;
        currentPage = 1;
        render();
    });

    // 添加
    document.getElementById('btn-add-student').addEventListener('click', () => showStudentForm());

    // 导出
    document.getElementById('btn-export-student').addEventListener('click', () => {
        showToast('学生数据导出成功', 'success');
    });

    // 查看/编辑/删除
    container.addEventListener('click', (e) => {
        const viewBtn = e.target.closest('.btn-view-student');
        const editBtn = e.target.closest('.btn-edit-student');
        const delBtn = e.target.closest('.btn-del-student');

        if (viewBtn) {
            const stu = students.find(s => s.id === viewBtn.dataset.id);
            if (stu) showStudentDetail(stu);
        }
        if (editBtn) {
            const stu = students.find(s => s.id === editBtn.dataset.id);
            if (stu) showStudentForm(stu);
        }
        if (delBtn) {
            const id = delBtn.dataset.id;
            showConfirm('确定要删除该学生信息吗？此操作不可恢复。', () => {
                students = students.filter(s => s.id !== id);
                showToast('删除成功', 'success');
                render();
            });
        }
    });

    // 分页
    bindPaginationEvents(container, (page) => { currentPage = page; render(); });
}

// 查看学生详情
function showStudentDetail(stu) {
    const body = `
        <div class="grid grid-cols-2 gap-4">
            <div class="form-group"><label class="form-label">学号</label><p class="text-gray-700">${stu.id}</p></div>
            <div class="form-group"><label class="form-label">姓名</label><p class="text-gray-700">${stu.name}</p></div>
            <div class="form-group"><label class="form-label">性别</label><p class="text-gray-700">${stu.gender}</p></div>
            <div class="form-group"><label class="form-label">年龄</label><p class="text-gray-700">${stu.age}</p></div>
            <div class="form-group"><label class="form-label">年级</label><p class="text-gray-700">${stu.grade}</p></div>
            <div class="form-group"><label class="form-label">所属学校</label><p class="text-gray-700">${stu.school}</p></div>
            <div class="form-group"><label class="form-label">联系电话</label><p class="text-gray-700">${stu.phone}</p></div>
            <div class="form-group"><label class="form-label">状态</label><p>${getStatusTag(stu.status)}</p></div>
            <div class="form-group"><label class="form-label">家长姓名</label><p class="text-gray-700">${stu.parentName}</p></div>
            <div class="form-group"><label class="form-label">家长电话</label><p class="text-gray-700">${stu.parentPhone}</p></div>
            <div class="form-group"><label class="form-label">入学日期</label><p class="text-gray-700">${stu.joinDate}</p></div>
            <div class="form-group"><label class="form-label">备注</label><p class="text-gray-700">${stu.remark || '无'}</p></div>
        </div>
    `;
    showModal('学生详情 - ' + stu.name, body, '');
}

// 添加/编辑学生表单
function showStudentForm(stu = null) {
    const isEdit = !!stu;
    const title = isEdit ? '编辑学生' : '添加学生';
    const body = `
        <form id="student-form">
            <div class="grid grid-cols-2 gap-4">
                <div class="form-group">
                    <label class="form-label">姓名 <span class="required">*</span></label>
                    <input type="text" class="form-input" id="sf-name" value="${stu ? stu.name : ''}" placeholder="请输入学生姓名">
                </div>
                <div class="form-group">
                    <label class="form-label">性别 <span class="required">*</span></label>
                    <select class="form-select" id="sf-gender">
                        <option value="男" ${stu && stu.gender === '男' ? 'selected' : ''}>男</option>
                        <option value="女" ${stu && stu.gender === '女' ? 'selected' : ''}>女</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">年龄 <span class="required">*</span></label>
                    <input type="number" class="form-input" id="sf-age" value="${stu ? stu.age : ''}" placeholder="请输入年龄" min="6" max="20">
                </div>
                <div class="form-group">
                    <label class="form-label">年级 <span class="required">*</span></label>
                    <select class="form-select" id="sf-grade">
                        ${['四年级','五年级','六年级','初一','初二','初三','高一','高二','高三'].map(g => `<option value="${g}" ${stu && stu.grade === g ? 'selected' : ''}>${g}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group col-span-2">
                    <label class="form-label">所属学校 <span class="required">*</span></label>
                    <input type="text" class="form-input" id="sf-school" value="${stu ? stu.school : ''}" placeholder="请输入所属学校">
                </div>
                <div class="form-group">
                    <label class="form-label">联系电话</label>
                    <input type="text" class="form-input" id="sf-phone" value="${stu ? stu.phone : ''}" placeholder="请输入联系电话">
                </div>
                <div class="form-group">
                    <label class="form-label">状态</label>
                    <select class="form-select" id="sf-status">
                        <option value="正常" ${stu && stu.status === '正常' ? 'selected' : ''}>正常</option>
                        <option value="已毕业" ${stu && stu.status === '已毕业' ? 'selected' : ''}>已毕业</option>
                        <option value="休学" ${stu && stu.status === '休学' ? 'selected' : ''}>休学</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">家长姓名</label>
                    <input type="text" class="form-input" id="sf-parent-name" value="${stu ? stu.parentName : ''}" placeholder="请输入家长姓名">
                </div>
                <div class="form-group">
                    <label class="form-label">家长电话</label>
                    <input type="text" class="form-input" id="sf-parent-phone" value="${stu ? stu.parentPhone : ''}" placeholder="请输入家长电话">
                </div>
                <div class="form-group col-span-2">
                    <label class="form-label">备注</label>
                    <textarea class="form-input" id="sf-remark" placeholder="请输入备注信息">${stu ? stu.remark : ''}</textarea>
                </div>
            </div>
        </form>
    `;
    const footer = `<button class="btn btn-outline" id="sf-cancel">取消</button><button class="btn btn-primary" id="sf-save">保存</button>`;
    showModal(title, body, footer, { maxWidth: '680px' });

    document.getElementById('sf-cancel').addEventListener('click', closeModal);
    document.getElementById('sf-save').addEventListener('click', () => {
        const name = document.getElementById('sf-name').value.trim();
        const school = document.getElementById('sf-school').value.trim();
        const age = document.getElementById('sf-age').value;
        if (!name || !school || !age) { showToast('请填写必填项', 'warning'); return; }

        const data = {
            name,
            gender: document.getElementById('sf-gender').value,
            age: parseInt(age),
            grade: document.getElementById('sf-grade').value,
            school,
            phone: document.getElementById('sf-phone').value.trim(),
            status: document.getElementById('sf-status').value,
            parentName: document.getElementById('sf-parent-name').value.trim(),
            parentPhone: document.getElementById('sf-parent-phone').value.trim(),
            remark: document.getElementById('sf-remark').value.trim(),
        };

        if (isEdit) {
            Object.assign(stu, data);
            showToast('学生信息更新成功', 'success');
        } else {
            data.id = 'STU' + String(students.length + 1).padStart(3, '0');
            data.joinDate = new Date().toISOString().split('T')[0];
            students.push(data);
            showToast('学生添加成功', 'success');
        }
        closeModal();
        render();
    });
}
