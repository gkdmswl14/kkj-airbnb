# GitHub 저장소 연결 스크립트
# Git이 설치되어 있어야 합니다

Write-Host "=== GitHub 저장소 연결 ===" -ForegroundColor Green
Write-Host ""

# Git 설치 확인
try {
    $gitVersion = git --version 2>&1
    Write-Host "Git 설치 확인: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "오류: Git이 설치되어 있지 않습니다!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Git을 설치해주세요:" -ForegroundColor Yellow
    Write-Host "1. https://git-scm.com/download/win 에서 다운로드" -ForegroundColor Cyan
    Write-Host "2. 또는 GitHub Desktop: https://desktop.github.com/" -ForegroundColor Cyan
    Write-Host ""
    exit 1
}

Write-Host ""
Write-Host "Git 저장소 초기화 중..." -ForegroundColor Yellow
git init

Write-Host ""
Write-Host "원격 저장소 추가 중..." -ForegroundColor Yellow
# 기존 원격 저장소가 있으면 제거
git remote remove origin 2>$null
git remote add origin https://github.com/gkdmswl14/kkj-airbnb.git

Write-Host ""
Write-Host "파일 추가 중..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "커밋 중..." -ForegroundColor Yellow
git commit -m "Initial commit: Colina Hotel Template"

Write-Host ""
Write-Host "메인 브랜치 설정 중..." -ForegroundColor Yellow
git branch -M main

Write-Host ""
Write-Host "=== GitHub에 푸시 ===" -ForegroundColor Green
Write-Host "토큰을 사용하여 인증합니다..." -ForegroundColor Yellow
Write-Host ""
Write-Host "사용자 이름: gkdmswl14" -ForegroundColor Cyan
Write-Host "비밀번호(토큰): 푸시 시 토큰을 입력하세요" -ForegroundColor Cyan
Write-Host ""

# 토큰을 사용한 푸시
$env:GIT_TERMINAL_PROMPT = 0
git push -u origin main

Write-Host ""
Write-Host "=== 완료! ===" -ForegroundColor Green
Write-Host "저장소 주소: https://github.com/gkdmswl14/kkj-airbnb" -ForegroundColor Cyan

