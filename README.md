# Random Music Picker

Short description
- Random Music Picker recommends a random track from cached genre lists fetched from the Last.fm API. Backend: Node.js + Express. Frontend: static HTML + vanilla JS.

Quick start (Windows PowerShell)
1. cd to the project folder:

```powershell
cd "C:\path\to\random-music-picker"
```

2. Create `.env` from `.env.example` and set your Last.fm API key:

```powershell
Copy-Item .env.example .env
# then edit .env and set LASTFM_API_KEY=your_key_here
notepad .env
```

3. Install dependencies and fetch cached data:

```powershell
npm install
npm run fetch-genres
```

4. Start the server:

```powershell
npm start
# open http://localhost:3000
```

Security notes
- Do not commit `.env` or other secret files. This release folder is sanitized and does not contain your keys or cached data.

License: MIT

---

# Random Music Picker (Korean)

간단 설명
- 이 프로젝트는 Last.fm API에서 장르별 상위 트랙을 가져와 로컬에 캐시한 뒤, 장르를 선택하면 랜덤으로 곡을 추천합니다. 백엔드: Node.js + Express, 프론트: 정적 HTML/vanilla JS.

빠른 시작 (Windows PowerShell)
1. 프로젝트 폴더로 이동

```powershell
cd "C:\path\to\random-music-picker"
```

2. `.env` 생성 및 API 키 설정 (예시)

```powershell
Copy-Item .env.example .env
notepad .env
```

3. 의존성 설치 및 장르 데이터 가져오기

```powershell
npm install
npm run fetch-genres
```

4. 서버 실행

```powershell
npm start
# 브라우저에서 http://localhost:3000 접속
```

보안 안내
- `.env` 파일과 캐시(`data/`)는 커밋하지 마세요. 이 `github-release` 디렉터리는 민감정보를 포함하지 않습니다.
