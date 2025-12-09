# 404 NOT_FOUND 오류 해결 방법

## 현재 상태 확인

Git 명령어로는 저장소에 접근이 가능합니다:
- 원격 저장소 연결: ✅ 정상
- 저장소 존재 확인: ✅ 정상
- 파일 푸시: ✅ 완료

## 404 오류 원인

웹 브라우저에서 저장소를 볼 때 404 오류가 발생하는 경우:

### 원인 1: 저장소가 비공개(Private)로 설정됨

**해결 방법:**

1. **저장소 설정 페이지 열기**
   - https://github.com/gkdmswl14/kkj-airbnb/settings
   - 방금 브라우저에서 열었습니다

2. **공개 설정 변경**
   - 페이지 하단의 "Danger Zone" 섹션으로 스크롤
   - "Change visibility" 클릭
   - "Make public" 선택
   - 저장소 이름(`kkj-airbnb`)을 입력하여 확인
   - "I understand, change repository visibility" 클릭

### 원인 2: 저장소가 실제로 존재하지 않음

**해결 방법:**

1. **저장소 생성**
   - https://github.com/new 접속
   - Repository name: `kkj-airbnb`
   - Public 선택
   - "Initialize this repository with" 체크박스 모두 해제
   - "Create repository" 클릭

2. **로컬 저장소와 연결**
   ```powershell
   git remote remove origin
   git remote add origin https://github.com/gkdmswl14/kkj-airbnb.git
   git push -u origin main
   ```

### 원인 3: 권한 문제

**해결 방법:**

1. **토큰 권한 확인**
   - https://github.com/settings/tokens 접속
   - 토큰에 `repo` 권한이 있는지 확인
   - 없다면 새 토큰 생성

2. **계정 권한 확인**
   - `gkdmswl14` 계정으로 로그인되어 있는지 확인
   - 저장소 소유권 확인

## 빠른 확인 방법

### 1. 저장소 URL 직접 접속
```
https://github.com/gkdmswl14/kkj-airbnb
```

### 2. Git 명령어로 확인
```powershell
# 원격 저장소 확인
git remote -v

# 저장소 연결 테스트
git ls-remote origin

# 현재 상태 확인
git status
```

### 3. 저장소 목록 확인
```
https://github.com/gkdmswl14?tab=repositories
```

## 추가 도움말

- GitHub 문서: https://docs.github.com
- 저장소 설정: https://github.com/gkdmswl14/kkj-airbnb/settings
- 토큰 관리: https://github.com/settings/tokens

