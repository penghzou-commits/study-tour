// layout.js - 侧边栏导航和顶部栏布局模块

// ===== 角色配置 =====
const roles = [
    { id: 'coop', label: '供销社管理员', icon: 'fa-landmark', color: '#8b5cf6', desc: '综合管理' },
    { id: 'school', label: '学校管理员', icon: 'fa-school', color: '#3b82f6', desc: '学校管理' },
    { id: 'base', label: '基地管理员', icon: 'fa-campground', color: '#22c55e', desc: '基地核验' },
];

// 各角色可见的菜单ID
const roleMenuAccess = {
    coop: ['base', 'school', 'project', 'activity', 'announcement', 'surrounding', 'documentary'],
    school: ['student', 'grade', 'finance'],
    base: ['verification', 'graduation'],
};

// 各角色的默认首页
const roleDefaultPage = {
    coop: 'base',
    school: 'student',
    base: 'verification',
};

// 完整导航菜单配置
const menuConfig = [
    { section: '基础管理' },
    { id: 'student', icon: 'fa-user-graduate', label: '学生管理' },
    { id: 'grade', icon: 'fa-layer-group', label: '年级班级管理' },
    { id: 'base', icon: 'fa-building', label: '基地账号管理' },
    { id: 'school', icon: 'fa-school', label: '学校账号管理' },
    { section: '研学业务' },
    { id: 'project', icon: 'fa-project-diagram', label: '研学项目' },
    { id: 'activity', icon: 'fa-calendar-check', label: '研学报名活动' },
    { section: '运营管理' },
    { id: 'announcement', icon: 'fa-bullhorn', label: '公告管理' },
    { id: 'surrounding', icon: 'fa-store', label: '周边管理' },
    { id: 'documentary', icon: 'fa-camera-retro', label: '纪实管理' },
    { id: 'finance', icon: 'fa-money-bill-wave', label: '费用管理' },
    { section: '核验中心' },
    { id: 'verification', icon: 'fa-sign-in-alt', label: '入营核验' },
    { id: 'graduation', icon: 'fa-graduation-cap', label: '结营核验' },
];

let currentRole = 'coop'; // 默认供销社角色
let currentPage = 'base';
let onPageChange = null;
let roleDropdownOpen = false;

// 获取当前角色可见的菜单
function getVisibleMenu() {
    const access = roleMenuAccess[currentRole] || [];
    const result = [];
    let lastWasSection = false;

    menuConfig.forEach(item => {
        if (item.section) {
            // 暂存分组标题，后面判断是否有可见子项
            result.push({ ...item, _pending: true });
        } else if (access.includes(item.id)) {
            // 如果前面有待定的分组标题，确认它
            for (let i = result.length - 1; i >= 0; i--) {
                if (result[i]._pending) {
                    delete result[i]._pending;
                    break;
                }
            }
            result.push(item);
        }
    });

    // 移除没有子项的分组标题
    return result.filter(item => !item._pending);
}

// 初始化侧边栏
export function initSidebar(callback) {
    onPageChange = callback;
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = renderSidebar();
    bindSidebarEvents();
}

// 渲染侧边栏
function renderSidebar() {
    const visibleMenu = getVisibleMenu();
    let navHtml = '';
    visibleMenu.forEach(item => {
        if (item.section) {
            navHtml += `<div class="nav-section">${item.section}</div>`;
        } else {
            navHtml += `
                <div class="nav-item ${item.id === currentPage ? 'active' : ''}" data-page="${item.id}">
                    <i class="fas ${item.icon}"></i>
                    <span>${item.label}</span>
                </div>`;
        }
    });

    const role = roles.find(r => r.id === currentRole);

    return `
        <div class="sidebar-logo">
            <i class="fas fa-graduation-cap"></i>
            <span>研学管理后台</span>
        </div>
        <div class="sidebar-role-badge">
            <i class="fas ${role.icon}"></i>
            <span>${role.label}</span>
        </div>
        <nav class="sidebar-nav">${navHtml}</nav>
    `;
}

// 绑定侧边栏事件
function bindSidebarEvents() {
    const sidebar = document.getElementById('sidebar');
    sidebar.addEventListener('click', (e) => {
        const navItem = e.target.closest('.nav-item');
        if (!navItem) return;
        const page = navItem.dataset.page;
        if (page && page !== currentPage) {
            navigateTo(page);
        }
    });
}

// 导航到指定页面
export function navigateTo(page) {
    currentPage = page;
    // 更新侧边栏激活状态
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.page === page);
    });
    // 更新顶部栏
    updateHeader();
    // 触发页面切换回调
    if (onPageChange) onPageChange(page);
}

// 切换角色
export function switchRole(roleId) {
    if (roleId === currentRole) return;
    currentRole = roleId;
    roleDropdownOpen = false;
    // 重新渲染侧边栏
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = renderSidebar();
    bindSidebarEvents();
    // 导航到该角色的默认页面
    const defaultPage = roleDefaultPage[roleId] || 'student';
    currentPage = defaultPage;
    updateHeader();
    if (onPageChange) onPageChange(currentPage);
}

// 获取当前页面标题
function getPageTitle(page) {
    const item = menuConfig.find(m => m.id === page);
    return item ? item.label : '研学管理后台';
}

// 初始化顶部栏
export function initHeader() {
    updateHeader();
}

// 更新顶部栏
function updateHeader() {
    const header = document.getElementById('header');
    const title = getPageTitle(currentPage);
    const role = roles.find(r => r.id === currentRole);

    // 角色切换下拉
    const roleOptions = roles.map(r => `
        <div class="role-option ${r.id === currentRole ? 'active' : ''}" data-role="${r.id}">
            <div class="role-option-icon" style="background:${r.color}15;color:${r.color};">
                <i class="fas ${r.icon}"></i>
            </div>
            <div class="role-option-info">
                <div class="role-option-name">${r.label}</div>
                <div class="role-option-desc">${r.desc}</div>
            </div>
            ${r.id === currentRole ? '<i class="fas fa-check role-option-check"></i>' : ''}
        </div>
    `).join('');

    header.innerHTML = `
        <div class="header-left">
            <div class="breadcrumb">
                <a href="javascript:void(0)"><i class="fas fa-home"></i></a>
                <span>/</span>
                <span>${title}</span>
            </div>
        </div>
        <div class="header-right">
            <div class="role-switcher" id="role-switcher">
                <button class="role-switcher-btn" id="role-switcher-btn">
                    <div class="role-switcher-icon" style="background:${role.color}15;color:${role.color};">
                        <i class="fas ${role.icon}"></i>
                    </div>
                    <span class="role-switcher-label">${role.label}</span>
                    <i class="fas fa-chevron-down role-switcher-arrow ${roleDropdownOpen ? 'open' : ''}"></i>
                </button>
                <div class="role-dropdown ${roleDropdownOpen ? 'show' : ''}" id="role-dropdown">
                    <div class="role-dropdown-title">切换角色</div>
                    ${roleOptions}
                </div>
            </div>
            <button class="btn btn-outline btn-sm" title="刷新" id="btn-refresh">
                <i class="fas fa-sync-alt"></i>
            </button>
            <a href="mobile.html" target="_blank" class="btn btn-sm" id="btn-mobile-entry" title="打开家长移动端" style="background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;border:none;gap:4px;padding:6px 12px;border-radius:20px;font-size:12px;text-decoration:none;display:inline-flex;align-items:center;">
                <i class="fas fa-mobile-alt"></i>
                <span>家长端</span>
            </a>
            <div class="header-user" id="header-user">
                <div class="header-user-avatar" id="user-avatar"><i class="fas fa-user"></i></div>
                <span id="user-name">清风</span>
                <i class="fas fa-chevron-down text-xs text-gray-400"></i>
            </div>
        </div>
    `;
    bindHeaderEvents();
    loadUserInfo();
}

// 加载用户信息
async function loadUserInfo() {
    // 昵称固定为"清风"，头像使用图标
    document.getElementById('user-name').textContent = '清风';
}

// 绑定顶部栏事件
function bindHeaderEvents() {
    // 刷新按钮
    const refreshBtn = document.getElementById('btn-refresh');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            if (onPageChange) onPageChange(currentPage);
            showToast('页面已刷新', 'success');
        });
    }

    // 角色切换按钮
    const roleSwitcherBtn = document.getElementById('role-switcher-btn');
    const roleDropdown = document.getElementById('role-dropdown');
    if (roleSwitcherBtn && roleDropdown) {
        roleSwitcherBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            roleDropdownOpen = !roleDropdownOpen;
            roleDropdown.classList.toggle('show', roleDropdownOpen);
            roleSwitcherBtn.querySelector('.role-switcher-arrow').classList.toggle('open', roleDropdownOpen);
        });

        // 角色选项点击
        roleDropdown.addEventListener('click', (e) => {
            const option = e.target.closest('.role-option');
            if (option) {
                const roleId = option.dataset.role;
                switchRole(roleId);
            }
        });

        // 点击外部关闭下拉
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#role-switcher')) {
                roleDropdownOpen = false;
                const dd = document.getElementById('role-dropdown');
                const arrow = document.querySelector('.role-switcher-arrow');
                if (dd) dd.classList.remove('show');
                if (arrow) arrow.classList.remove('open');
            }
        });
    }
}

// Toast 消息提示
export function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    const icons = { success: 'fa-check-circle', error: 'fa-times-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100px)';
        toast.style.transition = 'all 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// 模态框
export function showModal(title, bodyHtml, footerHtml, options = {}) {
    const container = document.getElementById('modal-container');
    const maxWidth = options.maxWidth || '600px';
    container.innerHTML = `
        <div class="modal-overlay" id="modal-overlay">
            <div class="modal" style="max-width:${maxWidth}">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" id="modal-close-btn"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">${bodyHtml}</div>
                ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}
            </div>
        </div>
    `;
    // 关闭事件
    document.getElementById('modal-close-btn').addEventListener('click', closeModal);
    document.getElementById('modal-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal();
    });
}

export function closeModal() {
    const container = document.getElementById('modal-container');
    const overlay = container.querySelector('.modal-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => { container.innerHTML = ''; }, 200);
    }
}

// 确认对话框
export function showConfirm(message, onConfirm) {
    const body = `<div class="text-center py-4"><i class="fas fa-exclamation-circle text-4xl text-yellow-500 mb-4 block"></i><p class="text-gray-700 text-base">${message}</p></div>`;
    const footer = `<button class="btn btn-outline" id="confirm-cancel">取消</button><button class="btn btn-danger" id="confirm-ok">确认</button>`;
    showModal('操作确认', body, footer);
    document.getElementById('confirm-cancel').addEventListener('click', closeModal);
    document.getElementById('confirm-ok').addEventListener('click', () => { closeModal(); onConfirm(); });
}

// 分页组件
export function renderPagination(current, total, pageSize, onChange) {
    const totalPages = Math.ceil(total / pageSize);
    if (totalPages <= 1) return `<div class="table-pagination"><span>共 ${total} 条记录</span><span></span></div>`;
    
    let pages = '';
    const start = Math.max(1, current - 2);
    const end = Math.min(totalPages, current + 2);
    
    pages += `<button class="page-btn" data-page="${current - 1}" ${current === 1 ? 'disabled' : ''}><i class="fas fa-chevron-left"></i></button>`;
    if (start > 1) { pages += `<button class="page-btn" data-page="1">1</button>`; if (start > 2) pages += `<span class="px-1 text-gray-400">...</span>`; }
    for (let i = start; i <= end; i++) {
        pages += `<button class="page-btn ${i === current ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    if (end < totalPages) { if (end < totalPages - 1) pages += `<span class="px-1 text-gray-400">...</span>`; pages += `<button class="page-btn" data-page="${totalPages}">${totalPages}</button>`; }
    pages += `<button class="page-btn" data-page="${current + 1}" ${current === totalPages ? 'disabled' : ''}><i class="fas fa-chevron-right"></i></button>`;

    return `<div class="table-pagination"><span>共 ${total} 条记录，第 ${current}/${totalPages} 页</span><div class="flex items-center gap-1">${pages}</div></div>`;
}

// 绑定分页事件
export function bindPaginationEvents(container, onChange) {
    container.addEventListener('click', (e) => {
        const btn = e.target.closest('.page-btn');
        if (btn && !btn.disabled) {
            const page = parseInt(btn.dataset.page);
            if (!isNaN(page)) onChange(page);
        }
    });
}

export function getCurrentPage() { return currentPage; }
export function getCurrentRole() { return currentRole; }
