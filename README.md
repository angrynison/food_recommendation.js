# 랜덤 음식 레시피 추천 웹 서비스
사용자가 입력한 재료를 기반으로 만개의 레시피에서 랜덤한 레시피를 추천해주는 Node.js 기반 프로젝트입니다.

## 기능
재료 입력 → 랜덤 레시피 추천
레시피 상세 정보 제공:
요리 이름, 이미지
필요한 재료 및 양
단계별 조리 방법

## 필수 구성 요소
- Node.js (v14 이상)
- npm 또는 yarn

설치 방법 
- 저장소 복제
```
git clone https://github.com/angrynison/food_recommendation.js.git
```
```
cd food_recommendation.js  
```
-의존성 설치
```
npm install

## 실행 방법

- 서버 시작
```
node app.js  

-API 테스트:
브라우저 또는 Postman으로 다음 URL 요청:
```
http://localhost:8080/recipe/getRecipe?ingredient=감자&myCallback=callback

# 만개의 레시피 공개 API 사용
# 외부 API 변경 시 스크래핑 로직 업데이트가 필요할 수 있습니다.
# 프로젝트 구조
food_recommendation.js/
├── bin/                # 서버 실행 스크립트 (확인되지 않음)
├── node_modules/       # 의존성 패키지
├── routes/
│   └── recipe.js       # 레시피 API 엔드포인트 (Express 라우터)
├── src/
│   ├── apis.js         # 외부 사이트 스크래핑 로직
│   └── launch.json     # VS Code 디버그 설정
├── .babelrc            # Babel 설정 파일
├── app.js              # Express 앱 메인 파일
├── package.json        # 프로젝트 의존성 및 스크립트
└── package-lock.json   # 패키지 버전 고정
