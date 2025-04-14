@echo off
chcp 65001 >nul
echo ===== 开始一键推送到GitHub =====
echo.

REM 切换到项目目录
cd /d "D:\生财有术\手机网站新版"

REM 设置Git编码
git config --local core.quotepath false
git config --local gui.encoding utf-8
git config --local i18n.commit.encoding utf-8
git config --local i18n.logoutputencoding utf-8

REM 添加所有更改
git add .
if %errorlevel% neq 0 (
    echo 添加文件失败，请检查错误信息
    pause
    exit /b %errorlevel%
)
echo 已添加所有文件到暂存区

REM 获取提交信息
set /p commit_msg=请输入提交信息(默认为"更新网站内容"): 
if "%commit_msg%"=="" set commit_msg=更新网站内容

REM 提交更改
git commit -m "%commit_msg%"
if %errorlevel% neq 0 (
    echo 提交更改失败，请检查错误信息
    pause
    exit /b %errorlevel%
)
echo 已提交更改

REM 推送到GitHub
git push
if %errorlevel% neq 0 (
    echo 推送到GitHub失败，请检查错误信息
    pause
    exit /b %errorlevel%
)
echo 已成功推送到GitHub

echo.
echo ===== 推送完成 =====
pause