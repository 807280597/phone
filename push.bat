@echo off
chcp 65001

echo 正在设置仓库地址...
git remote set-url origin https://github.com/807280597/phone.git

echo 正在取消代理设置...
git config --global --unset http.proxy
git config --global --unset https.proxy

echo 正在推送手机网站代码到GitHub...
git add .
git commit -m "更新手机网站: %date% %time%"
git push
echo 推送完成！
pause