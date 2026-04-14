FROM nginx:alpine

# 设置时区为中国上海
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 移除默认的nginx配置
RUN rm /etc/nginx/conf.d/default.conf

# 添加自定义nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 将项目文件复制到nginx的html目录
COPY index.html /usr/share/nginx/html/
COPY mobile.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY mobile-style.css /usr/share/nginx/html/
COPY main.js /usr/share/nginx/html/
COPY layout.js /usr/share/nginx/html/
COPY student.js /usr/share/nginx/html/
COPY base.js /usr/share/nginx/html/
COPY school.js /usr/share/nginx/html/
COPY project.js /usr/share/nginx/html/
COPY activity.js /usr/share/nginx/html/
COPY surrounding.js /usr/share/nginx/html/
COPY documentary.js /usr/share/nginx/html/
COPY finance.js /usr/share/nginx/html/
COPY verification.js /usr/share/nginx/html/
COPY graduation.js /usr/share/nginx/html/
COPY announcement.js /usr/share/nginx/html/
COPY grade.js /usr/share/nginx/html/
COPY mobile-app.js /usr/share/nginx/html/

# 复制static目录
COPY static/ /usr/share/nginx/html/static/

# 暴露8000端口
EXPOSE 8000

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
