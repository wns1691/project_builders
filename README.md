# project_builders

버튼을 누르면 1~45 중 중복 없는 로또 번호 6개를 추천하는 웹페이지입니다.

## 실행

브라우저에서 `index.html`을 열면 됩니다. 별도 설치가 필요하지 않습니다.

## 기능

- 무작위 번호 6개 추천 및 오름차순 표시
- 최근 추천 5개 기록 및 삭제
- 모바일 화면 지원

모든 번호 조합의 당첨 확률은 같습니다.

## 자동 빌드 및 배포

`main` 브랜치에 코드를 올리면 GitHub Actions가 HTML과 JavaScript를 검사하고
`_site/`에 배포 파일을 생성한 뒤 GitHub Pages에 자동 배포합니다.
Pull Request에서는 빌드 검사만 실행합니다.
Actions 탭에서 수동 실행도 가능합니다.

- 웹사이트: https://wns1691.github.io/project_builders/
- 실행 기록: https://github.com/wns1691/project_builders/actions
- 로컬 빌드: Node.js 22 이상에서 `npm run build`

외부 패키지 설치는 필요하지 않습니다.
