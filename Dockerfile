FROM python:3.11-slim

# 设置时区为中国上海
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 设置工作目录
WORKDIR /app

# 复制依赖文件并安装
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

# 复制所有项目文件
COPY index.html .
COPY mobile.html .
COPY style.css .
COPY mobile-style.css .
COPY main.js .
COPY layout.js .
COPY student.js .
COPY base.js .
COPY school.js .
COPY project.js .
COPY activity.js .
COPY surrounding.js .
COPY documentary.js .
COPY finance.js .
COPY verification.js .
COPY graduation.js .
COPY announcement.js .
COPY grade.js .
COPY mobile-app.js .

# 复制 static 目录
COPY static/ static/

# 复制 Python 主程序
COPY main.py .

# 暴露 8000 端口
EXPOSE 8000

# 启动 FastAPI 应用
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
