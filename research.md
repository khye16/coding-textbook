# research.md

작성일: 2026-05-18 KST  
범위: VitePress, GitHub Pages Actions 배포, GitHub Codespaces용 devcontainer, Codespaces 배지  
프로젝트 기준: Python & C 디지털 교재 v1.0. 콘텐츠 운영이 본체이고, 웹사이트는 GitHub Pages에 올리는 VitePress 교재 전달 도구로만 유지한다.

## 0. AGENTS.md 정독 후 작업 기준

이 프로젝트는 새 앱 개발이 아니라 교육 콘텐츠 운영 프로젝트다. v1.0에서 확정된 선택은 VitePress, GitHub Pages, GitHub Codespaces, `.devcontainer/devcontainer.json`, Markdown 콘텐츠이며, 인증, DB, 사이트 내 코드 실행기, 자동 채점, 대시보드, 진도 시스템, AI 튜터 등은 만들지 않는다.

이번 요청은 Research 단계이므로 `research.md`만 작성한다. 이후 사용자가 명시적으로 구현을 요청하기 전까지 `package.json`, `docs/`, `.github/workflows/deploy.yml`, `.devcontainer/devcontainer.json` 등 실제 구현 파일은 만들지 않는다.

## 1. VitePress 최신 설치/초기화 방법

### 1.1 공식 전제 조건

VitePress 공식 Getting Started 기준으로 현재 요구 사항은 다음과 같다.

- Node.js: 20 이상
- 터미널
- Markdown 편집기
- VS Code와 Vue 공식 확장은 권장 사항

출처:
- VitePress Getting Started: https://vitepress.dev/guide/getting-started.html

### 1.2 설치 명령

공식 문서는 2026년 현재 설치 예시로 `vitepress@next`를 사용한다. npm 기준:

```bash
npm add -D vitepress@next
```

다른 패키지 매니저 공식 예시는 다음 계열이다.

```bash
pnpm add -D vitepress@next
yarn add -D vitepress@next vue
bun add -D vitepress@next
```

이 프로젝트 v1.0에서는 단순성을 위해 npm을 기본으로 보는 것이 가장 낫다. 학생에게 추가 패키지 매니저를 설명할 필요가 없고, GitHub Actions에서도 `npm ci` 흐름이 가장 직관적이다.

### 1.3 ESM 주의사항

VitePress는 ESM-only 패키지다. 따라서 구현 시 `package.json`에 아래 설정을 넣는 편이 안전하다.

```json
{
  "type": "module"
}
```

대안은 `.vitepress/config.js` 대신 `.mjs` 또는 `.mts`를 쓰는 방식이지만, 이 프로젝트의 확정 구조가 `docs/.vitepress/config.ts`이므로 TypeScript config와 `"type": "module"` 조합이 자연스럽다.

### 1.4 초기화 마법사

설치 후 공식 초기화 명령:

```bash
npx vitepress init
```

이 프로젝트에 맞는 응답값:

| 질문 | 응답 |
|---|---|
| Where should VitePress initialize the config? | `./docs` |
| Where should VitePress look for your markdown files? | `./docs` |
| Site title | `Python & C 디지털 교재` |
| Site description | `Python과 C를 처음 배우는 학생을 위한 실습형 디지털 교재` |
| Theme | `Default Theme` |
| Use TypeScript for config and theme files? | `Yes` |
| Add VitePress npm scripts to package.json? | `Yes` |
| Add a prefix for VitePress npm scripts? | `Yes` |
| Prefix | `docs` |

초기화 마법사는 예시 파일을 만들 수 있다. 실제 구현 단계에서는 AGENTS.md의 확정 폴더 구조에 맞게 예시 파일을 정리해야 한다. 단, 지금은 구현하지 않는다.

### 1.5 예상 `package.json` 핵심

초기화 후 필요한 핵심 스크립트는 다음 형태다.

```json
{
  "type": "module",
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  "devDependencies": {
    "vitepress": "..."
  }
}
```

공식 문서의 기본 스크립트도 `vitepress dev docs`, `vitepress build docs`, `vitepress preview docs` 형태다.

### 1.6 폴더 구조와 VitePress root

공식 문서는 기존 프로젝트에 VitePress를 넣을 때 `./docs` 같은 하위 디렉터리에 스캐폴딩하는 방식을 권장한다. 이 프로젝트의 확정 구조도 동일하다.

구현 후 목표 구조:

```text
coding-textbook/
├── docs/
│   ├── .vitepress/
│   │   └── config.ts
│   ├── index.md
│   ├── python/
│   │   ├── 01-hello-world.md
│   │   └── 02-variables.md
│   └── c/
│       └── 01-hello-world.md
├── exercises/
├── package.json
└── README.md
```

VitePress 관점에서 `docs`가 project root가 된다. 따라서 config 파일은 `<root>/.vitepress/config.[ext]`, 즉 이 프로젝트에서는 `docs/.vitepress/config.ts`에 위치한다.

### 1.7 중요한 VitePress config 키

출처:
- VitePress Site Config: https://vitepress.dev/reference/site-config
- VitePress CLI: https://vitepress.dev/reference/cli
- VitePress Deploy: https://vitepress.dev/guide/deploy

이 프로젝트에 직접 관련되는 키:

| 키 | 타입/기본값 | 의미 | v1.0 판단 |
|---|---|---|---|
| `lang` | string, 기본 `en-US` | HTML `lang` 속성 | `ko-KR` |
| `title` | string | 사이트 제목, 기본 테마 nav에 표시 | `Python & C 디지털 교재` |
| `description` | string | 메타 설명 | 짧은 교재 설명 |
| `base` | string, 기본 `/` | 배포 기준 경로 | repo Pages면 `/<REPO>/`, 사용자/조직 Pages면 `/` |
| `cleanUrls` | boolean, 기본 `false` | `.html` 없는 URL 생성 | GitHub Pages 최소 운영에서는 `false` 유지 권장 |
| `srcDir` | string, 기본 `.` | Markdown source 위치 | `docs` 자체가 root라 별도 설정 불필요 |
| `srcExclude` | string[] | source에서 제외할 md glob | 필요 시 `**/TODO.md` 정도만 |
| `outDir` | string, 기본 `./.vitepress/dist` | 빌드 결과물 위치 | 기본값 유지, Actions에서 `docs/.vitepress/dist` 업로드 |
| `assetsDir` | string, 기본 `assets` | 빌드 asset 하위 폴더 | 기본값 유지 |
| `cacheDir` | string, 기본 `./.vitepress/cache` | dev/build cache | 기본값 유지, `.gitignore`에 추가 |
| `themeConfig` | object | 기본 테마 설정 | nav/sidebar는 교재 목차에 맞춰 최소 구성 |

GitHub Pages에서 repository site로 배포하면 보통 URL이 `https://OWNER.github.io/REPO/`가 되므로 `base: '/REPO/'`가 필요하다. repository 이름이 아직 확정되지 않았다면 구현 단계에서 `REPO` 값을 실제 이름으로 바꾸는 결정을 해야 한다.

### 1.8 CLI 옵션

VitePress CLI 공식 기준:

```bash
vitepress dev [root]
vitepress build [root]
vitepress preview [root]
vitepress init
```

이 프로젝트 기준:

```bash
npm run docs:dev      # vitepress dev docs
npm run docs:build    # vitepress build docs
npm run docs:preview  # vitepress preview docs
```

관련 옵션:

| 명령 | 옵션 | 의미 |
|---|---|---|
| `vitepress dev` | `--open [path]` | 시작 시 브라우저 열기 |
| `vitepress dev` | `--port <port>` | 개발 서버 포트 지정 |
| `vitepress dev` | `--base <path>` | 임시 base path 지정 |
| `vitepress dev` | `--strictPort` | 포트 사용 중이면 실패 |
| `vitepress dev` | `--force` | optimizer cache 무시 |
| `vitepress build` | `--base <path>` | 빌드 시 base override |
| `vitepress build` | `--outDir <dir>` | 출력 폴더 override |
| `vitepress preview` | `--port <port>` | preview 포트 지정 |

v1.0에서는 config 중심으로 고정하고 CLI override는 최소화한다. 개발 서버 포트만 필요하면 나중에 `vitepress dev docs --host 0.0.0.0`이 필요한지 Codespaces에서 확인한다. VitePress 공식 CLI 표에는 `--host`가 보이지 않지만, Vite 기반 서버에서 자주 필요한 설정이므로 구현 전 실제 동작 확인이 필요하다.

## 2. GitHub Pages 자동 배포

### 2.1 배포 방식 선택

GitHub Pages는 branch/folder에서 바로 publish하거나 GitHub Actions workflow로 publish할 수 있다. VitePress는 빌드 과정이 필요하므로 이 프로젝트는 GitHub Actions workflow 방식이 맞다.

GitHub 저장소 설정에서 필요한 선택:

```text
Settings → Pages → Build and deployment → Source → GitHub Actions
```

출처:
- GitHub Pages publishing source: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- GitHub Pages custom workflows: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

### 2.2 Actions 흐름

GitHub Docs가 설명하는 custom workflow의 일반 흐름:

1. default branch push 또는 manual dispatch로 workflow 시작
2. `actions/checkout`으로 repository checkout
3. 필요한 경우 static site build
4. `actions/upload-pages-artifact`로 정적 파일 artifact 업로드
5. push가 default branch에서 발생했다면 `actions/deploy-pages`로 배포

VitePress 공식 배포 문서도 `.github/workflows/deploy.yml` 생성, `docs/.vitepress/dist` 업로드, Pages source를 GitHub Actions로 설정하는 흐름을 제시한다.

### 2.3 2026년 기준 action 버전 조사

공식 문서와 action 저장소가 완전히 같은 속도로 갱신되지는 않는다. 현재 조사 기준으로 정리하면 다음과 같다.

| action | GitHub Pages docs 예시 | action 저장소/공식 repo 확인 | 판단 |
|---|---:|---:|---|
| `actions/checkout` | `@v6` | `@v6` 최신으로 표시 | `@v6` 사용 가능 |
| `actions/setup-node` | 별도 Pages 문서에는 없음 | `@v6`, Node 24 예시 | `@v6` 사용 |
| `actions/configure-pages` | `@v5` | `@v5` latest | `@v5` 사용 |
| `actions/upload-pages-artifact` | `@v4` | 저장소에는 `v5.0.0 Latest Apr 10, 2026` 표시 | 구현 시 `@v4` 보수 선택 또는 `@v5` 최신 선택 결정 필요 |
| `actions/deploy-pages` | `@v4` | `@v4` | `@v4` 사용 |

주의할 점:

- VitePress 공식 deploy 문서 예시는 일부 action을 `configure-pages@v4`, `upload-pages-artifact@v3`로 보여준다. GitHub Pages 공식 custom workflow 문서가 더 최신이므로 deploy workflow 작성 시 GitHub Pages 문서를 우선한다.
- `upload-pages-artifact`는 GitHub Pages docs가 `@v4`를 예시로 들지만, 저장소 최신 릴리스는 `v5.0.0`으로 표시된다. 안정성을 우선하면 docs와 맞는 `@v4`, 최신성을 엄격히 우선하면 `@v5`다. v1.0 교재 프로젝트에서는 예측 가능성이 더 중요하므로 구현 계획에서 보수 선택을 명시하는 편이 좋다.

출처:
- GitHub custom workflows: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- actions/upload-pages-artifact: https://github.com/actions/upload-pages-artifact
- actions/deploy-pages: https://github.com/actions/deploy-pages
- actions/setup-node: https://github.com/actions/setup-node
- actions/checkout: https://github.com/actions/checkout

### 2.4 권장 `deploy.yml` 구조

구현 단계의 기준 형태:

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

`upload-pages-artifact@v4`는 GitHub Pages 문서 기준 보수 선택이다. 최신 태그만 기준으로 하면 `@v5` 후보도 존재한다.

### 2.5 권한과 environment

`deploy-pages`에 필요한 최소 권한:

```yaml
permissions:
  pages: write
  id-token: write
```

전체 workflow에서는 checkout과 build까지 고려해 다음이 일반적이다.

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

배포 job에는 environment를 둔다.

```yaml
environment:
  name: github-pages
  url: ${{ steps.deployment.outputs.page_url }}
```

`github-pages` environment는 GitHub Pages workflow template에서 기본적으로 쓰는 이름이다.

### 2.6 artifact 조건

GitHub Pages artifact는 정적 파일 폴더를 압축해 배포한다. `actions/upload-pages-artifact`를 쓰면 형식을 맞춰준다.

중요 조건:

- artifact 이름 기본값: `github-pages`
- `path` 기본값은 `_site/`이므로 VitePress에서는 반드시 `docs/.vitepress/dist`로 지정
- artifact 내부 tar는 hard link나 symbolic link를 포함하면 안 됨
- Pages 공식 지원 크기는 1GB 수준으로 보는 것이 안전
- action repo 기준 `include-hidden-files` 기본값은 `false`; `.git`, `.github`는 어차피 제외

이 프로젝트는 교재 정적 사이트라 artifact 크기 문제는 거의 없지만, 큰 이미지나 동영상 파일을 repo에 넣지 않는 원칙은 유지해야 한다.

### 2.7 VitePress `base`와 GitHub Pages URL

GitHub Pages repository site:

```text
https://OWNER.github.io/REPO/
```

VitePress config:

```ts
export default {
  base: '/REPO/'
}
```

사용자/조직 site:

```text
https://OWNER.github.io/
```

VitePress config:

```ts
export default {
  base: '/'
}
```

custom domain을 쓰는 경우도 보통 `/`다. v1.0은 무료 운영 원칙상 custom domain을 전제로 하지 않는다.

### 2.8 `npm ci` 주의사항

CI에서 `npm ci`를 쓰려면 `package-lock.json`이 있어야 한다. 구현 단계에서 VitePress 설치 후 lockfile을 commit해야 Actions가 안정적으로 동작한다.

## 3. `.devcontainer/devcontainer.json` 최소 설정

### 3.1 위치와 형식

GitHub Codespaces와 Dev Container Spec은 다음 위치를 인식한다.

우선순위:

1. `.devcontainer/devcontainer.json`
2. `.devcontainer.json`
3. `.devcontainer/<folder>/devcontainer.json`

이 프로젝트 확정 구조는 `.devcontainer/devcontainer.json`이다. 파일 형식은 JSONC라서 주석을 쓸 수 있지만, 학생용 교재 repo에서는 주석도 최소화하는 편이 낫다.

출처:
- GitHub Codespaces dev container intro: https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/adding-a-dev-container-configuration/introduction-to-dev-containers
- Dev Container Spec reference: https://github.com/devcontainers/spec/blob/main/docs/specs/devcontainer-reference.md
- Dev Container metadata reference: https://github.com/devcontainers/spec/blob/main/docs/specs/devcontainerjson-reference.md

### 3.2 image 필드 생략 전략

AGENTS.md 결정사항: `.devcontainer/devcontainer.json`의 `image` 필드는 처음에 생략 시도.

GitHub Codespaces 문서에 따르면 repository에 devcontainer 설정이 없거나 base image를 지정하지 않으면 GitHub가 default Linux image를 사용한다. 이 default image에는 Python, Node, PHP, Java, Go, C++, Ruby, .NET 계열 런타임과 Git, GitHub CLI, yarn, openssh, vim 등이 포함된다.

따라서 v1.0 최소 전략:

- `image` 생략
- Dockerfile 생략
- Docker Compose 생략
- 필요한 공통 편집기 확장과 포트 정보만 devcontainer에 둠
- 첫 Codespaces 생성 후 `python3`, `node`, `npm`, `gcc` 확인

확인 명령:

```bash
python3 --version
node --version
npm --version
gcc --version
```

만약 `gcc`가 없거나 버전 문제가 있으면 그때 plan.md에서 `image` 추가 또는 feature 추가를 검토한다. 현재 Research 단계에서는 추가하지 않는다.

### 3.3 devcontainer 핵심 키

Dev Container metadata reference 기준 주요 키:

| 키 | 타입 | 의미 | 이 프로젝트 판단 |
|---|---|---|---|
| `name` | string | UI에 표시될 dev container 이름 | 사용 |
| `image` | string | registry image 직접 사용 | 처음에는 생략 |
| `build.dockerfile` | string | Dockerfile 기반 build | 생략 |
| `features` | object | Feature ID와 옵션 | 처음에는 생략 가능, 필요 시 Node/C toolchain 고정에 사용 |
| `customizations` | object | VS Code 등 도구별 설정 | 사용 가능 |
| `customizations.vscode.extensions` | string[] | Codespaces VS Code 확장 | Python/C/Markdown 중심 최소 |
| `forwardPorts` | array | 항상 forwarding할 포트 | VitePress dev server용 5173 후보 |
| `portsAttributes` | object | 포트 label, 자동 open 방식 | 5173 label 지정 후보 |
| `postCreateCommand` | string/array/object | container 생성 후 1회 실행 | package 생성 후 `npm install` 후보 |
| `postStartCommand` | string/array/object | container 시작마다 실행 | dev server 자동 시작은 피함 |
| `postAttachCommand` | string/array/object | editor attach 후 실행 | 불필요 |
| `remoteUser` | string | tool/lifecycle command 실행 사용자 | 기본값 유지 |
| `containerEnv` | object | container 전체 환경변수 | 불필요 |
| `remoteEnv` | object | editor/terminal 등 remote process env | 불필요 |
| `hostRequirements` | object | CPU/RAM/storage minimum | 무료 사용량 고려해 처음에는 생략 |

### 3.4 최소 devcontainer 후보

구현 단계 후보:

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
        "ms-vscode.cpptools",
        "bierner.markdown-mermaid"
      ]
    }
  }
}
```

검토:

- `image` 없음: AGENTS.md 결정과 일치
- `postCreateCommand` 없음: `package.json`이 생긴 뒤에 넣는 편이 안전
- `forwardPorts` 5173: Vite/VitePress 기본 개발 서버 포트
- 확장: Python, C/C++, Markdown 보조 정도만. 과한 확장 설치는 생성 시간을 늘릴 수 있다.

### 3.5 `postCreateCommand` 사용 시점

`postCreateCommand`는 workspace가 mount된 뒤 container 내부에서 실행된다. package 파일이 생긴 뒤에는 다음 후보가 가능하다.

```jsonc
{
  "postCreateCommand": "npm install"
}
```

단, 다음은 피한다.

```jsonc
{
  "postCreateCommand": "npm run docs:dev"
}
```

이유:

- lifecycle command는 종료되어야 container 준비가 정상적으로 끝난다.
- dev server는 학생이 단원 실습 때 직접 실행하거나, 문서에 명령어로 안내하는 편이 교육적으로 명확하다.

### 3.6 string / array / object command 형식

Dev Container lifecycle command는 세 형식이 가능하다.

```jsonc
{
  "postCreateCommand": "npm install"
}
```

```jsonc
{
  "postCreateCommand": ["npm", "install"]
}
```

```jsonc
{
  "postCreateCommand": {
    "deps": "npm install",
    "check-python": "python3 --version"
  }
}
```

string은 shell을 통해 실행되므로 `&&` 같은 shell 문법을 사용할 수 있다. array는 shell 없이 직접 실행된다. object는 같은 lifecycle 단계에서 병렬 실행된다. 이 프로젝트는 단순성을 위해 string 하나가 가장 읽기 쉽다.

## 4. README에 Open in Codespaces 배지 임베드

### 4.1 공식 Markdown 형식

GitHub Codespaces 공식 문서의 badge 형식:

```markdown
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](URL)
```

이 프로젝트 기본 후보:

```markdown
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/OWNER/REPO?quickstart=1)
```

출처:
- Facilitating quick creation and resumption of codespaces: https://docs.github.com/en/enterprise-cloud@latest/codespaces/setting-up-your-project-for-codespaces/setting-up-your-repository/facilitating-quick-creation-and-resumption-of-codespaces

### 4.2 Codespaces deep link 형식

기본 branch:

```text
https://codespaces.new/OWNER/REPO
```

특정 branch:

```text
https://codespaces.new/OWNER/REPO/tree/BRANCH-NAME
```

PR topic branch:

```text
https://codespaces.new/OWNER/REPO/pull/PR-SHA
```

최근 codespace 재개 우선:

```text
https://codespaces.new/OWNER/REPO?quickstart=1
```

이미 query string이 있으면:

```text
https://codespaces.new/OWNER/REPO?param=value&quickstart=1
```

`quickstart=1`은 학생이 이미 만든 codespace가 있으면 재개 화면으로 보내고, 없으면 새 codespace 생성 화면으로 보낸다. README와 각 단원의 "직접 풀어보기" 버튼에는 이 옵션이 가장 학생 친화적이다.

### 4.3 GitHub UI에서 badge 생성

GitHub 문서는 repository의 Code 버튼 → Codespaces tab → Share a deep link 메뉴에서 URL, Markdown snippet, HTML snippet을 만들 수 있다고 설명한다. 이 방법은 다음 옵션을 UI로 고를 수 있어 실수 방지에 좋다.

- branch
- dev container configuration file
- quick start 여부
- URL / Markdown / HTML snippet 복사

이 프로젝트는 devcontainer를 하나만 둘 예정이므로 손으로 쓰는 Markdown도 충분하지만, 최종 README 작성 전 실제 OWNER/REPO가 확정되면 UI로 한번 확인하는 것이 안전하다.

### 4.4 단원별 배지 사용

AGENTS.md의 단원 표준 구조상 각 단원 `직접 풀어보기` 섹션에도 Codespaces 배지가 들어간다.

단원에서는 badge 아래에 반드시 다음을 붙인다.

````markdown
Codespaces가 열리면 아래 폴더로 이동하세요:

```bash
cd exercises/python/01-hello-world
```
````

그리고 각 문제마다 다음을 명시한다.

- 파일명
- 실행 명령어
- 예상 출력

예:

````markdown
문제 1: `hello.py` 파일을 열고 아래 명령어로 실행하세요.

```bash
python3 hello.py
```

예상 출력:

```text
Hello, Python!
```
````

주의: 위 예시는 구조 설명용이다. 실제 단원 콘텐츠는 구현/작성 요청이 있을 때 별도로 만든다.

## 5. v1.0 구현 전 의사결정 체크리스트

지금은 research.md만 작성했으므로, 다음 항목은 plan.md 또는 구현 요청 이후에 결정한다.

1. GitHub repository 이름
   - `base: '/REPO/'`
   - Codespaces badge URL
   - GitHub Pages 최종 URL에 직접 영향

2. `actions/upload-pages-artifact` 버전
   - GitHub Pages docs 기준 보수 선택: `@v4`
   - action repo 최신 태그 기준: `@v5`
   - v1.0에서는 보수 선택이 더 어울림

3. devcontainer에서 `image` 생략 유지 여부
   - 첫 Codespaces 생성 후 Python/Node/npm/gcc 확인
   - 부족하면 feature 또는 image 추가를 plan에서 검토

4. VitePress sidebar 구성 방식
   - Python, C를 top-level nav로 나눌지
   - 단원 번호를 sidebar에 수동 배열로 관리할지
   - v1.0 소규모 교재라 수동 sidebar가 가장 단순

5. README Codespaces 운영 안내
   - Stop Current Codespace
   - Your codespaces에서 Delete
   - 무료 한도 월 120 core-hours
   - 결제수단 없으면 한도 초과 시 과금 대신 사용 제한

## 6. 결론

현재 v1.0에 가장 맞는 방향은 다음과 같다.

- npm + VitePress `@next` + `docs` root + TypeScript config
- GitHub Pages는 branch publish가 아니라 GitHub Actions workflow
- VitePress build output은 기본값 `docs/.vitepress/dist`
- devcontainer는 처음에 `image` 없이 default Codespaces image 사용
- README와 단원에는 `codespaces.new/OWNER/REPO?quickstart=1` 배지 사용
