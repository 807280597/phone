@echo off
chcp 65001

echo 正在切换到项目目录...
cd /d "D:\生财有术\手机网站新版"

echo 正在取消代理设置...
git config --global --unset http.proxy
git config --global --unset https.proxy

echo 正在推送代码到GitHub...
git add .
git commit -m "更新手机网站: %date% %time%"
git push -f origin main

echo 推送完成！
pause