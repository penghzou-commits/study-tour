// documentary.js - 纪实管理模块
import { showToast, showModal, closeModal, showConfirm, renderPagination, bindPaginationEvents } from './layout.js';

// 模拟纪实数据
let documentaries = [
    { id: 'DOC001', title: '春季自然探索营纪实', project: '春季自然探索营', activity: '2025春季第一期', type: '图文纪实', author: '王老师', date: '2025-03-20', coverUrl: '', photos: 12, videos: 2, content: '同学们在导师的带领下，深入自然保护区，观察了多种珍稀植物和鸟类，完成了自然笔记的创作。', status: '已发布', views: 356 },
    { id: 'DOC002', title: '科技创新实验室参观记录', project: '科技创新夏令营', activity: '2025暑期科技营', type: '视频纪实', author: '李老师', date: '2025-07-15', coverUrl: '', photos: 8, videos: 5, content: '学生们参观了国家重点实验室，亲手操作了3D打印设备，体验了VR虚拟现实技术。', status: '已发布', views: 528 },
    { id: 'DOC003', title: '红色文化研学之旅', project: '红色文化教育营', activity: '2025国庆红色之旅', type: '图文纪实', author: '张老师', date: '2025-10-03', coverUrl: '', photos: 20, videos: 3, content: '师生一行前往革命纪念馆，聆听革命故事，感受红色精神，同学们深受教育和鼓舞。', status: '已发布', views: 892 },
    { id: 'DOC004', title: '农耕文化体验日', project: '乡村振兴研学营', activity: '2025秋季农耕体验', type: '图文纪实', author: '赵老师', date: '2025-09-28', coverUrl: '', photos: 15, videos: 1, content: '同学们走进田间地头，体验了插秧、收割等农耕活动，了解了传统农业文化。', status: '草稿', views: 0 },
    { id: 'DOC005', title: '海洋生态探索纪实', project: '海洋科学探索营', activity: '2025暑期海洋营', type: '视频纪实', author: '陈老师', date: '2025-08-10', coverUrl: '', photos: 18, videos: 8, content: '在海洋生物专家的指导下，同学们近距离观察了海洋生物，学习了海洋保护知识。', status: '已发布', views: 1203 },
    { id: 'DOC006', title: '古建筑测绘实践', project: '文化遗产保护营', activity: '2025暑期文化营', type: '图文纪实', author: '孙老师', date: '2025-07-22', coverUrl: '', photos: 25, videos: 2, content: '同学们在古建筑专家的带领下，学习了古建筑测绘技术，完成了一座古亭的测绘报告。', status: '已发布', views: 467 },
    { id: 'DOC007', title: '航天科普教育活动', project: '航天科技研学营', activity: '2025航天日特别活动', type: '图文纪实', author: '周老师', date: '2025-04-24', coverUrl: '', photos: 10, videos: 4, content: '在中国航天日之际，同学们参观了航天展览馆，聆听了航天员的分享，点燃了航天梦想。', status: '已发布', views: 756 },
    { id: 'DOC008', title: '非遗手工艺体验', project: '非遗文化传承营', activity: '2025非遗体验周', type: '视频纪实', author: '吴老师', date: '2025-06-15', coverUrl: '', photos: 14, videos: 6, content: '同学们跟随非遗传承人学习了剪纸、泥塑等传统手工艺，感受了中华传统文化的魅力。', status: '审核中', views: 0 },
    { id: 'DOC009', title: '生态农场一日游', project: '生态环保研学营', activity: '2025春季生态营', type: '图文纪实', author: '郑老师', date: '2025-04-12', coverUrl: '', photos: 9, videos: 1, content: '同学们参观了有机农场，了解了生态种植技术，亲手采摘了新鲜蔬果。', status: '已发布', views: 321 },
    { id: 'DOC010', title: '天文观测夜活动', project: '天文科学探索营', activity: '2025秋季天文营', type: '视频纪实', author: '钱老师', date: '2025-11-08', coverUrl: '', photos: 6, videos: 3, content: '在专业天文望远镜的帮助下，同学们观测了木星、土星等行星，记录了星空的壮丽。', status: '草稿', views: 0 },
];

let currentPage = 1;
const pageSize = 8;
let searchKeyword = '';
let filterType = '';
let filterStatus = '';

function getFilteredData() {
    return documentaries.filter(d => {
        const matchSearch = !searchKeyword || d.title.includes(searchKeyword) || d.project.includes(searchKeyword) || d.author.includes(searchKeyword);
        const matchType = !filterType || d.type === filterType;
        const matchStatus = !filterStatus || d.status === filterStatus;
        return matchSearch && matchType && matchStatus;
    });
}

export function render() {
    const container = document.getElementById('main-content');
    const filtered = getFilteredData();
    const total = filtered.length;
    const start = (currentPage - 1) * pageSize;
    const pageData = filtered.slice(start, start + pageSize);

    const counts = {
        total: documentaries.length,
        published: documentaries.filter(d => d.status === '已发布').length,
        draft: documentaries.filter(d => d.status === '草稿').length,
        reviewing: documentaries.filter(d => d.status === '审核中').length,
    };

    container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">纪实管理</h1>
            <p class="page-desc">管理研学活动的图文、视频纪实记录</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="stat-card">
                <div class="stat-icon bg-blue-50 text-blue-500"><i class="fas fa-camera-retro"></i></div>
                <div class="stat-info"><h3>${counts.total}</h3><p>纪实总数</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-green-50 text-green-500"><i class="fas fa-check-circle"></i></div>
                <div class="stat-info"><h3>${counts.published}</h3><p>已发布</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-yellow-50 text-yellow-500"><i class="fas fa-file-alt"></i></div>
                <div class="stat-info"><h3>${counts.draft}</h3><p>草稿</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon bg-purple-50 text-purple-500"><i class="fas fa-hourglass-half"></i></div>
                <div class="stat-info"><h3>${counts.reviewing}</h3><p>审核中</p></div>
            </div>
        </div>

        <div class="table-container" id="doc-table-container">
            <div class="table-toolbar">
                <div class="flex items-center gap-3 flex-wrap">
                    <div class="table-search">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="搜索标题/项目/作者..." id="doc-search" value="${searchKeyword}">
                    </div>
                    <select class="form-select" style="width:auto;min-width:120px;padding:8px 32px 8px 12px;" id="doc-filter-type">
                        <option value="">全部类型</option>
                        <option value="图文纪实" ${filterType === '图文纪实' ? 'selected' : ''}>图文纪实</option>
                        <option value="视频纪实" ${filterType === '视频纪实' ? 'selected' : ''}>视频纪实</option>
                    </select>
                    <select class="form-select" style="width:auto;min-width:120px;padding:8px 32px 8px 12px;" id="doc-filter-status">
                        <option value="">全部状态</option>
                        <option value="已发布" ${filterStatus === '已发布' ? 'selected' : ''}>已发布</option>
                        <option value="草稿" ${filterStatus === '草稿' ? 'selected' : ''}>草稿</option>
                        <option value="审核中" ${filterStatus === '审核中' ? 'selected' : ''}>审核中</option>
                    </select>
                </div>
                <div class="table-actions">
                    <button class="btn btn-primary" id="btn-add-doc"><i class="fas fa-plus"></i> 新建纪实</button>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>编号</th>
                            <th>标题</th>
                            <th>所属项目</th>
                            <th>类型</th>
                            <th>作者</th>
                            <th>图片/视频</th>
                            <th>浏览量</th>
                            <th>日期</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${pageData.length === 0 ? `<tr><td colspan="10"><div class="empty-state"><i class="fas fa-inbox"></i><p>暂无纪实数据</p></div></td></tr>` :
                        pageData.map(d => `
                            <tr>
                                <td><span class="font-mono text-xs text-gray-500">${d.id}</span></td>
                                <td><span class="font-medium text-gray-900 cursor-pointer hover:text-blue-600 btn-view-doc" data-id="${d.id}">${d.title}</span></td>
                                <td><span class="text-sm text-gray-600">${d.project}</span></td>
                                <td>${d.type === '图文纪实' ? '<span class="tag tag-blue"><i class="fas fa-images mr-1"></i>图文</span>' : '<span class="tag tag-purple"><i class="fas fa-video mr-1"></i>视频</span>'}</td>
                                <td>${d.author}</td>
                                <td><span class="text-sm"><i class="fas fa-image text-blue-400 mr-1"></i>${d.photos} <i class="fas fa-video text-purple-400 ml-2 mr-1"></i>${d.videos}</span></td>
                                <td><span class="text-sm text-gray-500">${d.views > 0 ? d.views : '-'}</span></td>
                                <td><span class="text-sm text-gray-500">${d.date}</span></td>
                                <td>${getDocStatusTag(d.status)}</td>
                                <td>
                                    <div class="flex gap-1">
                                        <button class="btn btn-sm btn-outline btn-view-doc" data-id="${d.id}" title="查看"><i class="fas fa-eye"></i></button>
                                        <button class="btn btn-sm btn-outline btn-edit-doc" data-id="${d.id}" title="编辑"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-outline btn-del-doc" data-id="${d.id}" title="删除" style="color:#ef4444;border-color:#fca5a5;"><i class="fas fa-trash"></i></button>
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

function getDocStatusTag(status) {
    const map = { '已发布': 'tag-green', '草稿': 'tag-gray', '审核中': 'tag-yellow' };
    return `<span class="tag ${map[status] || 'tag-gray'}">${status}</span>`;
}

function bindEvents() {
    const container = document.getElementById('doc-table-container');

    document.getElementById('doc-search').addEventListener('input', (e) => {
        searchKeyword = e.target.value.trim();
        currentPage = 1;
        render();
    });

    document.getElementById('doc-filter-type').addEventListener('change', (e) => {
        filterType = e.target.value;
        currentPage = 1;
        render();
    });

    document.getElementById('doc-filter-status').addEventListener('change', (e) => {
        filterStatus = e.target.value;
        currentPage = 1;
        render();
    });

    document.getElementById('btn-add-doc').addEventListener('click', () => showDocForm());

    container.addEventListener('click', (e) => {
        const viewBtn = e.target.closest('.btn-view-doc');
        const editBtn = e.target.closest('.btn-edit-doc');
        const delBtn = e.target.closest('.btn-del-doc');

        if (viewBtn) {
            const doc = documentaries.find(d => d.id === viewBtn.dataset.id);
            if (doc) showDocDetail(doc);
        }
        if (editBtn) {
            const doc = documentaries.find(d => d.id === editBtn.dataset.id);
            if (doc) showDocForm(doc);
        }
        if (delBtn) {
            const id = delBtn.dataset.id;
            showConfirm('确定要删除该纪实记录吗？此操作不可恢复。', () => {
                documentaries = documentaries.filter(d => d.id !== id);
                showToast('删除成功', 'success');
                render();
            });
        }
    });

    bindPaginationEvents(container, (page) => { currentPage = page; render(); });
}

function showDocDetail(doc) {
    const body = `
        <div class="mb-4">
            <h4 class="text-lg font-semibold text-gray-900 mb-2">${doc.title}</h4>
            <div class="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span><i class="fas fa-project-diagram mr-1"></i>${doc.project}</span>
                <span><i class="fas fa-user mr-1"></i>${doc.author}</span>
                <span><i class="fas fa-calendar mr-1"></i>${doc.date}</span>
                ${getDocStatusTag(doc.status)}
            </div>
        </div>
        <div class="bg-gray-50 rounded-lg p-4 mb-4">
            <p class="text-gray-700 leading-relaxed">${doc.content}</p>
        </div>
        <div class="grid grid-cols-3 gap-4 mb-4">
            <div class="text-center p-3 bg-blue-50 rounded-lg">
                <div class="text-2xl font-bold text-blue-600">${doc.photos}</div>
                <div class="text-xs text-gray-500 mt-1">图片数量</div>
            </div>
            <div class="text-center p-3 bg-purple-50 rounded-lg">
                <div class="text-2xl font-bold text-purple-600">${doc.videos}</div>
                <div class="text-xs text-gray-500 mt-1">视频数量</div>
            </div>
            <div class="text-center p-3 bg-green-50 rounded-lg">
                <div class="text-2xl font-bold text-green-600">${doc.views}</div>
                <div class="text-xs text-gray-500 mt-1">浏览量</div>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div class="form-group"><label class="form-label">所属活动</label><p class="text-gray-700">${doc.activity}</p></div>
            <div class="form-group"><label class="form-label">纪实类型</label><p>${doc.type === '图文纪实' ? '<span class="tag tag-blue">图文纪实</span>' : '<span class="tag tag-purple">视频纪实</span>'}</p></div>
        </div>
    `;
    showModal('纪实详情', body, '', { maxWidth: '700px' });
}

function showDocForm(doc = null) {
    const isEdit = !!doc;
    const title = isEdit ? '编辑纪实' : '新建纪实';
    const body = `
        <form id="doc-form">
            <div class="grid grid-cols-2 gap-4">
                <div class="form-group col-span-2">
                    <label class="form-label">标题 <span class="required">*</span></label>
                    <input type="text" class="form-input" id="df-title" value="${doc ? doc.title : ''}" placeholder="请输入纪实标题">
                </div>
                <div class="form-group">
                    <label class="form-label">所属项目 <span class="required">*</span></label>
                    <select class="form-select" id="df-project">
                        <option value="">请选择项目</option>
                        ${['春季自然探索营','科技创新夏令营','红色文化教育营','乡村振兴研学营','海洋科学探索营','文化遗产保护营','航天科技研学营','非遗文化传承营','生态环保研学营','天文科学探索营'].map(p => `<option value="${p}" ${doc && doc.project === p ? 'selected' : ''}>${p}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">所属活动</label>
                    <input type="text" class="form-input" id="df-activity" value="${doc ? doc.activity : ''}" placeholder="请输入所属活动名称">
                </div>
                <div class="form-group">
                    <label class="form-label">纪实类型 <span class="required">*</span></label>
                    <select class="form-select" id="df-type">
                        <option value="图文纪实" ${doc && doc.type === '图文纪实' ? 'selected' : ''}>图文纪实</option>
                        <option value="视频纪实" ${doc && doc.type === '视频纪实' ? 'selected' : ''}>视频纪实</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">作者</label>
                    <input type="text" class="form-input" id="df-author" value="${doc ? doc.author : ''}" placeholder="请输入作者姓名">
                </div>
                <div class="form-group">
                    <label class="form-label">图片数量</label>
                    <input type="number" class="form-input" id="df-photos" value="${doc ? doc.photos : 0}" min="0">
                </div>
                <div class="form-group">
                    <label class="form-label">视频数量</label>
                    <input type="number" class="form-input" id="df-videos" value="${doc ? doc.videos : 0}" min="0">
                </div>
                <div class="form-group">
                    <label class="form-label">日期</label>
                    <input type="date" class="form-input" id="df-date" value="${doc ? doc.date : new Date().toISOString().split('T')[0]}">
                </div>
                <div class="form-group">
                    <label class="form-label">状态</label>
                    <select class="form-select" id="df-status">
                        <option value="草稿" ${doc && doc.status === '草稿' ? 'selected' : ''}>草稿</option>
                        <option value="审核中" ${doc && doc.status === '审核中' ? 'selected' : ''}>审核中</option>
                        <option value="已发布" ${doc && doc.status === '已发布' ? 'selected' : ''}>已发布</option>
                    </select>
                </div>
                <div class="form-group col-span-2">
                    <label class="form-label">纪实内容 <span class="required">*</span></label>
                    <textarea class="form-input" id="df-content" rows="4" placeholder="请输入纪实内容描述">${doc ? doc.content : ''}</textarea>
                </div>
            </div>
        </form>
    `;
    const footer = `<button class="btn btn-outline" id="df-cancel">取消</button><button class="btn btn-primary" id="df-save">保存</button>`;
    showModal(title, body, footer, { maxWidth: '720px' });

    document.getElementById('df-cancel').addEventListener('click', closeModal);
    document.getElementById('df-save').addEventListener('click', () => {
        const titleVal = document.getElementById('df-title').value.trim();
        const project = document.getElementById('df-project').value;
        const content = document.getElementById('df-content').value.trim();
        if (!titleVal || !project || !content) { showToast('请填写必填项', 'warning'); return; }

        const data = {
            title: titleVal,
            project,
            activity: document.getElementById('df-activity').value.trim(),
            type: document.getElementById('df-type').value,
            author: document.getElementById('df-author').value.trim(),
            photos: parseInt(document.getElementById('df-photos').value) || 0,
            videos: parseInt(document.getElementById('df-videos').value) || 0,
            date: document.getElementById('df-date').value,
            status: document.getElementById('df-status').value,
            content,
        };

        if (isEdit) {
            Object.assign(doc, data);
            showToast('纪实更新成功', 'success');
        } else {
            data.id = 'DOC' + String(documentaries.length + 1).padStart(3, '0');
            data.coverUrl = '';
            data.views = 0;
            documentaries.push(data);
            showToast('纪实创建成功', 'success');
        }
        closeModal();
        render();
    });
}
