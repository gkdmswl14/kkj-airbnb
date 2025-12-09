# Git 설치 및 GitHub 연결 가이드

## ⚠️ Git 설치가 필요합니다

현재 시스템에 Git이 설치되어 있지 않습니다. GitHub에 연결하려면 먼저 Git을 설치해야 합니다.

## 빠른 설치 방법

### 방법 1: Git 공식 사이트 (권장 - 5분 소요)
1. 브라우저에서 https://git-scm.com/download/win 접속
2. "Download for Windows" 클릭
3. 다운로드된 설치 파일 실행
4. 설치 중 **모든 기본 옵션을 그대로 사용** (Next 클릭)
5. 설치 완료 후 **터미널을 완전히 종료하고 다시 열기**

### 방법 2: GitHub Desktop (더 쉬움)
1. 브라우저에서 https://desktop.github.com/ 접속
2. "Download for Windows" 클릭
3. 설치 후 GitHub Desktop 실행
4. GitHub 계정으로 로그인
5. "File" > "Add Local Repository" 선택
6. 현재 프로젝트 폴더 선택

## Git 설치 확인

터미널을 다시 연 후 다음 명령어 실행:
```powershell
git --version
```

`git version 2.x.x` 같은 메시지가 나오면 설치 완료입니다!

## 설치 후 자동 연결

Git 설치가 완료되면 다음 명령어 중 하나를 실행하세요:

**PowerShell:**
```powershell
.\setup-github.ps1
```

**또는 배치 파일:**
```cmd
setup-github.bat
```

## 수동 연결 방법

Git 설치 후 다음 명령어를 순서대로 실행:

```powershell
# 1. 저장소 초기화
git init

# 2. 원격 저장소 추가
git remote add origin https://github.com/gkdmswl14/kkj-airbnb.git

# 3. 모든 파일 추가
git add .

# 4. 커밋
git commit -m "Initial commit: Colina Hotel Template"

# 5. 메인 브랜치 설정
git branch -M main

# 6. GitHub에 푸시
git push -u origin main
```

**푸시 시 인증 정보:**
- 사용자 이름: `gkdmswl14`
- 비밀번호(토큰): 푸시 시 토큰을 입력하세요

## 문제 해결

### "git 명령어를 찾을 수 없습니다" 오류
- 터미널을 완전히 종료하고 다시 열어보세요
- Git 설치가 완료되었는지 확인하세요
- 시스템 환경 변수 PATH에 Git이 추가되었는지 확인하세요

### 인증 오류
- 토큰이 올바른지 확인하세요
- 토큰에 저장소 접근 권한이 있는지 확인하세요

