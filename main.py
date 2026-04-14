"""
研学管理后台 - FastAPI 静态文件服务
"""
import os
import shutil
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse

app = FastAPI(title="研学管理后台", version="1.0.0")

# 静态文件目录
STATIC_DIR = "static"


def prepare_static_files():
    """
    将根目录下的前端文件复制到 static 目录中，
    确保所有资源都可以通过 /static/ 路径访问。
    """
    # 需要复制到 static 目录的前端文件
    frontend_files = [
        "index.html",
        "mobile.html",
        "style.css",
        "mobile-style.css",
        "main.js",
        "layout.js",
        "student.js",
        "base.js",
        "school.js",
        "project.js",
        "activity.js",
        "surrounding.js",
        "documentary.js",
        "finance.js",
        "verification.js",
        "graduation.js",
        "announcement.js",
        "grade.js",
        "mobile-app.js",
    ]

    os.makedirs(STATIC_DIR, exist_ok=True)

    for filename in frontend_files:
        src = os.path.join(os.path.dirname(__file__) or ".", filename)
        dst = os.path.join(STATIC_DIR, filename)
        if os.path.exists(src):
            shutil.copy2(src, dst)


# 启动时准备静态文件
prepare_static_files()


@app.get("/")
async def root():
    """根路径重定向到静态页面"""
    return RedirectResponse(url="/static/index.html")


# 挂载静态文件目录 - 必须放在最后
app.mount("/static", StaticFiles(directory=STATIC_DIR, html=True), name="static")
