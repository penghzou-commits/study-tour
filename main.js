// main.js - 研学管理后台主入口
import { initSidebar, initHeader, navigateTo } from './layout.js';
import { render as renderStudent } from './student.js';
import { render as renderBase } from './base.js';
import { render as renderSchool } from './school.js';
import { render as renderProject } from './project.js';
import { render as renderActivity } from './activity.js';
import { render as renderSurrounding } from './surrounding.js';
import { render as renderDocumentary } from './documentary.js';
import { render as renderFinance } from './finance.js';
import { render as renderVerification } from './verification.js';
import { render as renderAnnouncement } from './announcement.js';
import { render as renderGraduation } from './graduation.js';
import { render as renderGrade } from './grade.js';

// 页面路由映射
const pageRenderers = {
    student: renderStudent,
    base: renderBase,
    school: renderSchool,
    project: renderProject,
    activity: renderActivity,
    announcement: renderAnnouncement,
    surrounding: renderSurrounding,
    documentary: renderDocumentary,
    finance: renderFinance,
    verification: renderVerification,
    graduation: renderGraduation,
    grade: renderGrade,
};

// 页面切换回调
function onPageChange(page) {
    const renderer = pageRenderers[page];
    if (renderer) {
        renderer();
    } else {
        const main = document.getElementById('main-content');
        main.innerHTML = `
            <div class="flex items-center justify-center h-64">
                <div class="text-center text-gray-400">
                    <i class="fas fa-tools text-5xl mb-4 block"></i>
                    <p class="text-lg">页面开发中...</p>
                </div>
            </div>
        `;
    }
}

// 初始化应用
function initApp() {
    initSidebar(onPageChange);
    initHeader();
    // 默认加载供销社角色的第一个页面（基地账号管理）
    onPageChange('base');
}

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', initApp);
