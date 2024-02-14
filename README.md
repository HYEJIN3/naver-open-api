# Naver Open API Project

---

## Technology Stack

- React.js + Typescript
- antd
- styled-components
- axios

---


- 프로젝트 설명: 네이버 오픈 API를 활용하여 Input에 대한 반환 결과를 그래프 형태로 출력

- Naver Open API CORS 이슈 해결 방법

  1. 원인 - 프론트엔드에서 프록시 서버 없이 외부 API 서버로 요청하기 때문


  2. 해결 방법


  - Proxy 설정

    package.json
    `"proxy": "https://openapi.naver.com"` 추가


  - Proxy에 입력한 주소 제외 나머지 주소로 API 호출


- 빌드 방법:

---

### 1. `npm install`

---

### 2. `npm start`

    [http://localhost:3000]로 로컬에서 실행 시작
