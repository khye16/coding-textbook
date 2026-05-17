# plan.md

작성일: 2026-05-18 KST  
단계: Day 1 인프라 셋업 계획  
상태: 계획만 작성. 아직 구현하지 않음.

## 1. 목표

Day 1의 목표는 "교재 내용 작성 전, 최소 인프라가 실제로 끝까지 연결되는지" 확인하는 것이다.

- GitHub Pages에 빈 VitePress 사이트가 뜬다.
- GitHub Actions가 `main` push 또는 수동 실행으로 VitePress를 빌드하고 Pages에 배포한다.
- GitHub Codespaces로 repository를 열 수 있다.
- Codespaces 터미널에서 `python3`가 동작한다.
- Codespaces 터미널에서 `gcc`로 C 파일을 컴파일하고 실행할 수 있다.
- 이후 단원 Markdown과 exercises 폴더를 채울 수 있는 최소 구조가 생긴다.

## 2. 비목표 (Non-Goals)

Day 1에서는 인프라 관통 확인만 한다. 다음은 만들지 않는다.

- Python/C 단원 본문 작성
- 실습 문제 세트 작성
- 학생 로그인, 회원가입, 진도 체크, 강사 대시보드
- 사이트 내 코드 에디터, Python 실행기, C 실행기
- 자동 채점, 제출 시스템, 학습 분석
- DB, CMS, 외부 백엔드 서비스
- AI 튜터, 챗봇, 알림, 결제
- VitePress 커스텀 테마 또는 복잡한 UI
- 동영상 호스팅, 이미지 대량 추가

## 3. 컨텍스트

### 현재 상태

현재 루트에는 `.git`을 제외하면 다음 파일만 있다.

```text
AGENTS.md
README.md
research.md
```

`AGENTS.md` 기준 이 프로젝트는 교육 콘텐츠 운영 프로젝트이며, 사이트는 교재 전달용 최소 도구다. 이번 계획도 기능 욕심을 내지 않고 "빈 사이트 배포 + Codespaces 언어 도구 확인"까지만 다룬다.

### 영향 받는 기존 파일

| 파일 | 변경 이유 |
|---|---|
| `README.md` | 학생용 시작 안내, Codespaces 배지, Codespaces 사용 규칙 추가 |

### 새로 만들 파일 전체 목록

| 파일 | 목적 |
|---|---|
| `package.json` | npm 프로젝트 정의, VitePress scripts |
| `package-lock.json` | `npm ci` 재현성을 위한 lockfile |
| `.gitignore` | `node_modules`, VitePress cache/dist 등 제외 |
| `docs/index.md` | 빈 VitePress 사이트의 첫 화면 |
| `docs/.vitepress/config.ts` | VitePress 사이트 설정 |
| `.github/workflows/deploy.yml` | GitHub Pages 자동 배포 workflow |
| `.devcontainer/devcontainer.json` | Codespaces 개발 환경 최소 설정 |

### 새로 만들 폴더 전체 목록

| 폴더 | 목적 |
|---|---|
| `docs/` | VitePress Markdown source root |
| `docs/.vitepress/` | VitePress config 위치 |
| `.github/workflows/` | GitHub Actions workflow 위치 |
| `.devcontainer/` | Codespaces devcontainer 위치 |

Day 1에서는 `docs/python/`, `docs/c/`, `exercises/python/`, `exercises/c/`를 만들지 않는다. 단원 작성 단계에서 실제 파일과 함께 만든다.

## 4. 설계 결정

`research.md`에서 확정한 내용을 Day 1에 다음처럼 적용한다.

고정 repository 값:

- `GITHUB_USERNAME = khye16`
- `REPO_NAME = coding-textbook`
- GitHub Pages URL: `https://khye16.github.io/coding-textbook/`
- Codespaces URL: `https://codespaces.new/khye16/coding-textbook?quickstart=1`
- VitePress `base`: `/coding-textbook/`

1. 패키지 매니저는 `npm`을 사용한다.
   - 학생과 GitHub Actions 모두에게 가장 설명이 짧다.
   - CI는 `npm ci`를 사용하므로 `package-lock.json`을 commit한다.

2. VitePress는 `vitepress@next`를 devDependency로 설치한다.
   - 2026년 공식 Getting Started 기준 설치 예시다.
   - Node.js는 로컬/학생 환경에서 20 이상, Actions에서는 24를 사용한다.

3. VitePress root는 `docs`다.
   - config 위치는 `docs/.vitepress/config.ts`.
   - build output은 기본값 `docs/.vitepress/dist`.

4. VitePress config는 TypeScript로 작성한다.
   - `package.json`에 `"type": "module"`을 둔다.
   - `defineConfig`를 사용해 config 구조를 명확하게 한다.

5. GitHub Pages는 branch publish가 아니라 GitHub Actions로 배포한다.
   - VitePress는 build step이 필요하다.
   - GitHub repository settings에서 Pages source를 `GitHub Actions`로 바꾼다.

6. Actions 버전은 보수적으로 선택한다.
   - `actions/checkout@v6`
   - `actions/setup-node@v6`
   - `actions/configure-pages@v5`
   - `actions/upload-pages-artifact@v4`
   - `actions/deploy-pages@v4`

7. `.devcontainer/devcontainer.json`은 처음에 `image`를 생략한다.
   - GitHub Codespaces default Linux image에 Python, Node, C++ 계열 도구가 포함된다는 공식 설명에 기대어 먼저 검증한다.
   - Day 1 검증에서 `gcc`가 없다면 다음 계획에서 image 또는 feature 추가를 검토한다.

8. Codespaces 배지는 `quickstart=1`을 붙인다.
   - 기존 codespace가 있으면 재개하고, 없으면 새 codespace를 만들 수 있다.

9. GitHub repository 값은 `khye16/coding-textbook`으로 확정한다.
   - VitePress `base`는 `/coding-textbook/`으로 고정한다.
   - README의 Codespaces 배지 URL은 `https://codespaces.new/khye16/coding-textbook?quickstart=1`로 고정한다.
   - README와 검증 기준의 Pages URL은 `https://khye16.github.io/coding-textbook/`로 고정한다.

## 5. 단계별 작업

각 Step은 30분 이내에 끝나도록 자른다.

### [x] Step 1. npm 프로젝트와 VitePress 의존성 준비

예상 시간: 10분

만드는 파일:

- `package.json`
- `package-lock.json`

실행할 명령어:

```bash
npm init -y
npm add -D vitepress@next
```

이후 `package.json`을 아래 형태로 정리한다.

```json
{
  "name": "coding-textbook",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  "devDependencies": {
    "vitepress": "next"
  }
}
```

메모:

- `package-lock.json`이 `vitepress@next`의 실제 resolved 버전을 고정한다.
- `private: true`는 실수로 npm publish하는 일을 막는 안전장치다.

### [x] Step 2. VitePress 최소 사이트 생성

예상 시간: 20분

만드는 파일:

- `docs/index.md`
- `docs/.vitepress/config.ts`

실행할 명령어:

```powershell
New-Item -ItemType Directory -Path docs/.vitepress -Force
```

`docs/index.md` 내용:

```markdown
# Python & C 디지털 교재

Python과 C를 처음 배우는 학생을 위한 실습형 디지털 교재입니다.

이 사이트는 현재 Day 1 인프라 검증용 빈 VitePress 사이트입니다.
```

`docs/.vitepress/config.ts` 내용:

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'ko-KR',
  title: 'Python & C 디지털 교재',
  description: 'Python과 C를 처음 배우는 학생을 위한 실습형 디지털 교재',
  base: '/coding-textbook/',
  cleanUrls: false,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' }
    ],
    sidebar: []
  }
})
```

메모:

- `REPO_NAME`이 `coding-textbook`으로 확정되어 있으므로 `base`는 `/coding-textbook/`이다.
- Day 1은 빈 사이트 확인이 목표이므로 sidebar는 비워 둔다.

### [x] Step 3. `.gitignore` 작성

예상 시간: 5분

만드는 파일:

- `.gitignore`

실행할 명령어:

```powershell
New-Item -ItemType File -Path .gitignore -Force
```

`.gitignore` 내용:

```gitignore
node_modules/

docs/.vitepress/cache/
docs/.vitepress/dist/

.DS_Store
Thumbs.db
```

메모:

- `docs/.vitepress/dist`는 GitHub Actions에서 매번 빌드해 artifact로 올린다.
- build 결과물을 repository에 commit하지 않는다.

### [x] Step 4. GitHub Pages workflow 작성

예상 시간: 20분

만드는 파일:

- `.github/workflows/deploy.yml`

실행할 명령어:

```powershell
New-Item -ItemType Directory -Path .github/workflows -Force
```

`.github/workflows/deploy.yml` 내용:

```yaml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Setup Node
        uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: npm

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Install dependencies
        run: npm ci

      - name: Build with VitePress
        run: npm run docs:build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v4
        with:
          path: docs/.vitepress/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

GitHub repository 설정에서 할 일:

```text
Settings → Pages → Build and deployment → Source → GitHub Actions
```

메모:

- `upload-pages-artifact@v4`는 GitHub Pages 공식 문서 기준 보수 선택이다.
- GitHub Actions 실행 전 `package-lock.json`이 반드시 commit되어 있어야 `npm ci`가 성공한다.

### [x] Step 5. Codespaces devcontainer 작성

예상 시간: 15분

만드는 파일:

- `.devcontainer/devcontainer.json`

실행할 명령어:

```powershell
New-Item -ItemType Directory -Path .devcontainer -Force
```

`.devcontainer/devcontainer.json` 내용:

```jsonc
{
  "name": "Python & C Textbook",
  "forwardPorts": [5173],
  "portsAttributes": {
    "5173": {
      "label": "VitePress",
      "onAutoForward": "openPreview"
    }
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "ms-python.python",
        "ms-vscode.cpptools"
      ]
    }
  }
}
```

메모:

- 일부러 `image`를 넣지 않는다.
- 일부러 `postCreateCommand`도 넣지 않는다. Day 1에서는 먼저 default image와 수동 `npm install`/`npm ci` 흐름을 검증한다.
- dev server 자동 실행은 하지 않는다. 학생에게 명령어를 명확히 안내하는 방식이 프로젝트 원칙에 맞다.

### [x] Step 6. README.md를 학생용 시작 안내로 교체

예상 시간: 20분

변경 파일:

- `README.md`

실행할 명령어:

```text
README.md 파일 내용을 아래로 교체
```

새 `README.md` 전체 본문:

````markdown
# Python & C 디지털 교재

Python과 C를 처음 배우는 학생을 위한 실습형 디지털 교재입니다.  
GitHub Pages로 교재를 읽고, GitHub Codespaces에서 실습 코드를 실행합니다.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/khye16/coding-textbook?quickstart=1)

## 시작 방법

1. 위의 `Open in GitHub Codespaces` 버튼을 클릭합니다.
2. Codespaces가 열리면 터미널에서 필요한 실습 폴더로 이동합니다.
3. 교재 사이트에서 단원을 읽고, 안내된 파일명과 명령어대로 실습합니다.

교재 사이트:

```text
https://khye16.github.io/coding-textbook/
```

## Codespaces 사용 규칙

- 수업이 끝나면 왼쪽 아래 메뉴에서 `Stop Current Codespace`를 누릅니다.
- 더 이상 쓰지 않을 Codespace는 GitHub의 `Your codespaces` 페이지에서 `Delete`합니다.
- 무료 한도는 월 120 core-hours입니다. 2-core 기준 약 60시간입니다.
- 결제수단을 등록하지 않으면 무료 한도 초과 시 과금되지 않고 사용만 막힙니다.
````

메모:

- README에는 확정값 `khye16/coding-textbook`만 사용한다.

### [x] Step 7. 로컬 빌드 검증

예상 시간: 15분

만드는 파일:

- 없음

실행할 명령어:

```bash
npm run docs:build
npm run docs:preview
```

확인할 것:

- `npm run docs:build`가 성공한다.
- build output이 `docs/.vitepress/dist`에 생긴다.
- preview 서버가 뜬다.
- 브라우저에서 빈 VitePress 첫 화면이 보인다.

검증 후 할 일:

```bash
git status --short
```

메모:

- `docs/.vitepress/dist`는 `.gitignore` 대상이어야 한다.
- preview 서버는 확인 후 종료한다.

### [x] Step 8. commit 후 GitHub에 push

예상 시간: 10분

만드는 파일:

- 없음

실행할 명령어:

```bash
git status --short
git add README.md package.json package-lock.json .gitignore docs .github .devcontainer
git commit -m "Set up Day 1 VitePress infrastructure"
git push
```

확인할 것:

- GitHub Actions 탭에서 `Deploy VitePress site to Pages` workflow가 실행된다.
- build job이 성공한다.
- deploy job이 성공한다.
- deployment URL이 표시된다.

메모:

- 이 단계 전에 GitHub repository remote가 설정되어 있어야 한다.
- default branch가 `main`이 아니라면 `deploy.yml`의 branch도 맞춰야 한다.

### [ ] Step 9. GitHub Pages 접속 확인

예상 시간: 10분

만드는 파일:

- 없음

실행할 명령어:

```bash
# 명령어 없음. 브라우저에서 확인.
```

확인 URL:

```text
https://khye16.github.io/coding-textbook/
```

확인할 것:

- 404가 아니다.
- CSS가 깨지지 않는다.
- `Python & C 디지털 교재` 제목이 보인다.
- README에 적은 교재 사이트 URL과 실제 Pages URL이 일치한다.

문제가 있으면 먼저 볼 것:

- `docs/.vitepress/config.ts`의 `base`
- GitHub repository Settings → Pages source
- GitHub Actions deploy job log

### [ ] Step 10. Codespaces에서 언어 도구 검증

예상 시간: 20분

만드는 파일:

- repository 파일 없음
- 임시 검증 파일은 `/tmp`에만 생성

실행할 명령어:

```bash
python3 --version
python3 -c "print('python ok')"
```

예상 출력:

```text
Python 3.x.x
python ok
```

C 컴파일 검증:

```bash
cat > /tmp/day1.c <<'EOF'
#include <stdio.h>

int main(void) {
    puts("c ok");
    return 0;
}
EOF

gcc /tmp/day1.c -o /tmp/day1
/tmp/day1
```

예상 출력:

```text
c ok
```

VitePress 개발 서버 검증:

```bash
npm ci
npm run docs:dev
```

확인할 것:

- Codespaces Ports 탭에서 `5173` 포트가 forward된다.
- preview 또는 forwarded URL에서 VitePress 사이트가 보인다.
- 확인 후 dev server를 `Ctrl+C`로 종료한다.

## 6. 검증 기준

Day 1 완료 체크리스트 6가지:

1. `npm run docs:build`가 로컬에서 성공한다.
2. `docs/.vitepress/dist`가 생성되지만 git에는 tracked되지 않는다.
3. GitHub Actions의 `Deploy VitePress site to Pages` workflow가 build/deploy 모두 성공한다.
4. `https://khye16.github.io/coding-textbook/`에서 빈 VitePress 사이트가 정상 표시된다.
5. Codespaces에서 `python3 -c "print('python ok')"` 실행 결과가 `python ok`이다.
6. Codespaces에서 `/tmp/day1.c`를 `gcc`로 컴파일하고 실행했을 때 `c ok`가 출력된다.

보너스 확인:

- README의 Codespaces badge를 눌렀을 때 `https://codespaces.new/khye16/coding-textbook?quickstart=1`로 이동한다.
- Codespaces에서 `npm ci && npm run docs:dev` 후 5173 포트 preview가 열린다.

## 7. 트레이드오프 / 고려사항

### `npx vitepress init` 대신 수동 스캐폴딩

공식 초기화 마법사를 써도 되지만, Day 1에서는 수동으로 최소 파일만 만드는 편이 낫다.

- 장점: 예시 페이지가 섞이지 않고 AGENTS.md의 확정 구조에 맞추기 쉽다.
- 단점: 공식 wizard가 자동으로 넣어주는 기본값을 직접 챙겨야 한다.

### `upload-pages-artifact@v4` 선택

`research.md` 기준 action 저장소에는 더 최신 major가 보이지만, GitHub Pages 공식 workflow 문서는 `@v4`를 안내한다.

- 장점: GitHub Pages 문서와 맞아 예측 가능하다.
- 단점: 최신 major의 개선 사항은 바로 쓰지 않는다.

### `image` 없는 devcontainer

AGENTS.md 결정대로 처음에는 `image`를 생략한다.

- 장점: 설정이 짧고 Codespaces default image의 무료 storage 이점을 기대할 수 있다.
- 단점: `gcc`나 특정 버전 도구가 기대와 다르면 다시 계획을 수정해야 한다.

### `postCreateCommand` 생략

Day 1에서는 `postCreateCommand`로 `npm install`을 자동 실행하지 않는다.

- 장점: Codespaces 생성 실패 원인을 줄이고, 언어 도구 검증과 npm 설치 검증을 분리할 수 있다.
- 단점: 학생이 처음 열었을 때 `npm ci`를 직접 실행해야 할 수 있다.

### `base: '/coding-textbook/'` 확정

repository 값을 `khye16/coding-textbook`으로 고정했기 때문에 VitePress `base`도 `/coding-textbook/`으로 고정한다.

- 장점: GitHub Pages repository site의 일반 구조에 바로 맞는다.
- 단점: GitHub repository를 다른 이름으로 만들면 CSS/asset 경로가 깨지므로 repo 이름을 바꾸면 안 된다.

## 8. 막히면 멈출 지점

다음 상황에서는 임의로 우회하지 않고 사용자에게 확인한다.

- GitHub remote가 `khye16/coding-textbook`이 아닌 경우
- GitHub Pages가 organization 정책 때문에 Actions 배포를 막는 경우
- Codespaces default image에서 `gcc`가 없어서 `image` 또는 `features` 추가가 필요한 경우
- `vitepress@next` 설치가 실패하거나 Node 버전 요구사항이 현재 환경과 맞지 않는 경우
- 외부 유료 서비스나 추가 호스팅을 검토해야 하는 경우
