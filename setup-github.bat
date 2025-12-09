@echo off
echo === GitHub 저장소 연결 ===
echo.

REM Git 설치 확인
git --version >nul 2>&1
if errorlevel 1 (
    echo 오류: Git이 설치되어 있지 않습니다!
    echo.
    echo Git을 설치해주세요:
    echo 1. https://git-scm.com/download/win 에서 다운로드
    echo 2. 또는 GitHub Desktop: https://desktop.github.com/
    echo.
    pause
    exit /b 1
)

echo Git 설치 확인 완료
echo.

echo Git 저장소 초기화 중...
git init

echo.
echo 원격 저장소 추가 중...
git remote remove origin 2>nul
git remote add origin https://github.com/gkdmswl14/kkj-airbnb.git

echo.
echo 파일 추가 중...
git add .

echo.
echo 커밋 중...
git commit -m "Initial commit: Colina Hotel Template"

echo.
echo 메인 브랜치 설정 중...
git branch -M main

echo.
echo === GitHub에 푸시 ===
echo 토큰을 사용하여 인증합니다...
echo.
echo 사용자 이름: gkdmswl14
echo 비밀번호(토큰): 푸시 시 토큰을 입력하세요
echo.

git push -u origin main

echo.
echo === 완료! ===
echo 저장소 주소: https://github.com/gkdmswl14/kkj-airbnb
echo.
pause

