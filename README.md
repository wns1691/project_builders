# project_builders

버튼을 누르면 1~45 중 중복 없는 로또 번호 6개를 추천하는 웹페이지입니다.

## 실행

브라우저에서 `index.html`을 열면 됩니다. 별도 설치가 필요하지 않습니다.

## 기능

- 무작위 번호 6개 추천 및 오름차순 표시
- 최근 추천 5개 기록 및 삭제
- 모바일 화면 지원
- 다크/화이트 모드 전환 및 선택 저장 (첫 방문에는 시스템 테마 적용)

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

## 제휴 문의

페이지 하단의 제휴 문의 폼은 Formspree `https://formspree.io/f/xljgnzzd`로 전송합니다.
이름, 이메일, 문의 내용은 필수이고 회사/브랜드는 선택입니다.
접수 내역과 수신 이메일 설정은 Formspree 대시보드에서 관리합니다.
전송 중 중복 제출을 방지하고, 성공 및 오류 메시지를 표시합니다.

## 강의 52:09~1:12:12 설정

영상 본문/자막에 직접 접근하지 못해 공개 목차의 범위인 외부 서비스와
AdSense 중 현재 로또 사이트에 적용 가능한 연결을 준비했습니다.

| 항목 | 현재 상태 | 필요한 정보 또는 계정 작업 |
| --- | --- | --- |
| Formspree 문의 폼 | 연결·배포 완료 | 실제 수신 메일과 접수 내역은 Formspree에서 확인 |
| Disqus 댓글 | 코드 준비 완료 | 본인 사이트의 shortname |
| AdSense | 설치 코드 및 ads.txt 자동 생성 준비 | 본인 게시자 ID, 사이트 등록 및 Google 심사 |
| AI 학습/추론 | 사용자 요청으로 제외 | 추가하지 않음 |

### 댓글 연결

`site-services.js`의 `disqusShortname`에 Disqus 사이트 shortname을 입력한 뒤
푸시하면 페이지 하단에 댓글이 표시됩니다. 설정 전에는 댓글 영역을 숨깁니다.
페이지 식별자를 고정해 번호 추천이나 모드 전환으로 댓글이 분리되지 않게 했습니다.
댓글 관리와 사용자 권한은 Disqus 관리자 화면에서 설정합니다.

### AdSense 연결

`site-services.js`의 `adsenseClient`에 본인 계정의 `ca-pub-`로 시작하는
16자리 게시자 ID를 입력하면 빌드 시 공식 광고 스크립트와 계정 메타 태그를
HTML head에 삽입하고 `_site/ads.txt`를 생성합니다. 빈 값이면 광고 코드를 넣지 않습니다.
AdSense 사이트 등록, 계정 정보 입력, 심사 요청과 자동 광고 설정은 계정 소유자가 진행해야 합니다.
코드 설치만으로 심사 승인이나 광고 노출이 보장되지 않습니다.

현재 주소는 프로젝트 하위 경로이므로 생성된 ads.txt 주소는
`https://wns1691.github.io/project_builders/ads.txt`입니다.
Google은 도메인 루트의 `/ads.txt`를 확인하므로 도메인을 연결하거나
`wns1691.github.io` 루트 사이트에 같은 ads.txt를 제공해야 합니다.
AdSense 가입 URL에는 경로를 넣을 수 없으므로 사용할 도메인도 먼저 확인해야 합니다.
임의 도메인이나 다른 사람의 게시자 ID는 사용하지 않습니다.

- Disqus 설치: https://help.disqus.com/en/articles/1717112-universal-embed-code
- AdSense 사이트 연결: https://support.google.com/adsense/answer/7584263
- ads.txt: https://support.google.com/adsense/answer/12171612

식별자는 공개 설정입니다. API 비밀 키나 비밀번호는 이 파일에 넣지 마세요.
