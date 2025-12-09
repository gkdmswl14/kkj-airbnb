# Colina Hotel Template

호텔 웹사이트 HTML 템플릿입니다.

## GitHub 연결하기

### 1. Git 설치 (필수)

Git이 설치되어 있지 않다면 다음 중 하나를 설치하세요:

**방법 A: Git 공식 사이트에서 설치**
- https://git-scm.com/download/win 에서 다운로드
- 설치 후 터미널을 재시작하세요

**방법 B: GitHub Desktop 설치 (권장 - 더 쉬움)**
- https://desktop.github.com/ 에서 다운로드
- GitHub Desktop을 통해 저장소를 관리할 수 있습니다

### 2. Git 설치 확인

터미널에서 다음 명령어로 확인:
```powershell
git --version
```

### 3. GitHub 저장소 연결

Git 설치 후 다음 명령어를 실행하세요:

```powershell
# Git 저장소 초기화
git init

# 원격 저장소 추가
git remote add origin https://github.com/gkdmswl14/kkj-airbnb.git

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit: Colina Hotel Template"

# 메인 브랜치 설정
git branch -M main

# GitHub에 푸시
git push -u origin main
```

**토큰 사용 시 주의사항:**
- 토큰이 URL에 포함되면 보안상 위험할 수 있습니다
- 대신 Git Credential Manager를 사용하거나, 푸시 시 토큰을 입력하는 것을 권장합니다

## 로컬에서 실행하기

### 방법 1: npm을 사용 (권장)

1. Node.js가 설치되어 있어야 합니다.
2. 다음 명령어를 실행하세요:

```bash
npm start
```

또는

```bash
npm run dev
```

브라우저가 자동으로 열리고 `http://localhost:8080`에서 템플릿을 볼 수 있습니다.

### 방법 2: Python을 사용

Python이 설치되어 있다면:

```bash
cd template
python -m http.server 8080
```

그 다음 브라우저에서 `http://localhost:8080`으로 접속하세요.

### 방법 3: 직접 파일 열기

`template/index.html` 파일을 브라우저에서 직접 열 수도 있지만, 일부 기능이 제대로 작동하지 않을 수 있습니다.

## 주요 페이지

- 메인 페이지: `template/index.html`
- 예약 페이지: `template/reservation-1.html`, `reservation-2.html`, `reservation-3.html`
- 객실 페이지: `template/rooms-category.html`, `room-overview.html`
- 블로그: `template/blog-category.html`, `blog-item.html`
- 기타: `about.html`, `contact.html`, `facility.html`
